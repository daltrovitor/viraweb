// Hello World
'use server';

import { redirect } from 'next/navigation';
import { isStripeConfigured, isSupabaseConfigured } from '@/lib/env';
import { getSessionUser } from '@/lib/auth/guards';
import { rateLimit } from '@/lib/rate-limit';
import { briefingFieldsFor, buildBriefingSchema } from '@/lib/factory/briefing';
import { getProduct } from '@/lib/factory/repo';
import { createCheckoutForOrder, createOrderWithBriefing } from '@/lib/factory/orders';
import { requestOrigin } from '@/lib/factory/request';
import type { Tier } from '@/lib/factory/types';

export interface OrderFormState {
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
}

export async function submitOrder(slug: string, _prev: OrderFormState, form: FormData): Promise<OrderFormState> {
  const values = Object.fromEntries(
    [...form.entries()].filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
  );

  if (!isSupabaseConfigured()) return { error: 'Pedidos online ainda não estão disponíveis.', values };
  const user = await getSessionUser();
  if (!user) return { error: 'Sua sessão expirou. Entre novamente para continuar.', values };
  if (!rateLimit(`order:${user.id}`, 6, 10 * 60_000).ok) {
    return { error: 'Muitos pedidos em sequência. Aguarde alguns minutos.', values };
  }

  const product = await getProduct(slug);
  if (!product || !product.id || !product.active) return { error: 'Produto indisponível no momento.', values };
  if (values.accept_terms !== 'on') {
    return { error: 'Confirme que leu os termos para continuar.', fieldErrors: { accept_terms: 'Obrigatório.' }, values };
  }

  const fields = briefingFieldsFor(product);
  const parsed = buildBriefingSchema(fields).safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? '');
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { error: 'Revise os campos destacados.', fieldErrors, values };
  }

  const customize = values.customize === 'on';
  const tier: Tier = product.tier === 'standard' && !customize ? 'standard' : product.tier === 'enterprise' ? 'enterprise' : 'custom';
  if (tier === 'standard' && !isStripeConfigured()) {
    return { error: 'O pagamento online está temporariamente indisponível. Tente novamente em breve.', values };
  }

  let destination: string;
  try {
    const order = await createOrderWithBriefing({ user, product, tier, briefing: parsed.data });
    destination =
      tier === 'standard'
        ? await createCheckoutForOrder(order.id, user.id, await requestOrigin())
        : `/dashboard/orders/${order.id}?enviado=1`;
  } catch (error) {
    console.error('order_submit_failed', error instanceof Error ? error.message : error);
    return { error: 'Não conseguimos registrar o pedido agora. Tente novamente em instantes.', values };
  }
  redirect(destination);
}
