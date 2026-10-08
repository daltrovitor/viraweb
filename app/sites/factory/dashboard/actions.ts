// Hello World
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { isStripeConfigured } from '@/lib/env';
import { getSessionUser } from '@/lib/auth/guards';
import { createAdminClient } from '@/lib/supabase/admin';
import { getStripe } from '@/lib/stripe';
import { logAudit } from '@/lib/audit';
import { rateLimit } from '@/lib/rate-limit';
import { createCheckoutForOrder } from '@/lib/factory/orders';
import { getMyOrder } from '@/lib/factory/customer';
import { requestOrigin } from '@/lib/factory/request';

export interface RevisionState {
  error?: string;
  message?: string;
}

const orderId = z.string().uuid();

async function currentUser() {
  const user = await getSessionUser();
  if (!user) redirect('/login?next=/dashboard');
  return user;
}

/** Checkout for an order awaiting payment (standard or an accepted quote). */
export async function payOrder(id: string): Promise<void> {
  const user = await currentUser();
  if (!orderId.safeParse(id).success || !isStripeConfigured()) redirect('/dashboard');
  let url: string;
  try {
    url = await createCheckoutForOrder(id, user.id, await requestOrigin());
  } catch (error) {
    console.error('checkout_failed', error instanceof Error ? error.message : error);
    redirect(`/dashboard/orders/${id}?checkout=erro`);
  }
  redirect(url);
}

export async function openBillingPortal(returnOrderId?: string): Promise<void> {
  const user = await currentUser();
  if (!isStripeConfigured()) redirect('/dashboard');
  const { data } = await createAdminClient().from('users').select('stripe_customer_id').eq('id', user.id).single();
  const customer = data?.stripe_customer_id as string | undefined;
  if (!customer) redirect('/dashboard');
  const origin = await requestOrigin();
  const back = returnOrderId && orderId.safeParse(returnOrderId).success ? `/dashboard/orders/${returnOrderId}` : '/dashboard';
  const portal = await getStripe().billingPortal.sessions.create({ customer, return_url: `${origin}${back}`, locale: 'pt-BR' });
  redirect(portal.url);
}

export async function requestRevision(id: string, _prev: RevisionState, form: FormData): Promise<RevisionState> {
  const user = await currentUser();
  if (!rateLimit(`revision:${user.id}`, 5, 10 * 60_000).ok) return { error: 'Muitas solicitações seguidas. Aguarde alguns minutos.' };
  const parsed = z
    .string()
    .trim()
    .min(10, 'Descreva a alteração com pelo menos 10 caracteres.')
    .max(3000, 'Máximo de 3.000 caracteres.')
    .safeParse(form.get('description'));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  // Ownership is checked through RLS before writing with the service role.
  const order = await getMyOrder(user.id, id);
  if (!order) return { error: 'Pedido não encontrado.' };
  if (!['ready', 'in_review', 'in_production', 'received'].includes(order.status)) {
    return { error: 'Este pedido não aceita alterações no momento.' };
  }

  const admin = createAdminClient();
  const { error } = await admin.from('revisions').insert({ order_id: order.id, description: parsed.data, created_by: user.id });
  if (error) return { error: 'Não foi possível registrar a solicitação.' };
  await admin.from('notifications').insert({
    user_id: null,
    type: 'revision.new',
    title: 'Nova solicitação de alteração',
    message: `${order.code} · ${order.products?.name ?? ''}`,
    link: `/orders/${order.id}`,
  });
  await logAudit({ userId: user.id, action: 'order.update', entity: 'order', entityId: order.code, metadata: { revision: 'requested' } });
  revalidatePath('/sites/factory/dashboard', 'layout');
  return { message: 'Solicitação enviada. A equipe responde por aqui.' };
}

export async function markNotificationsRead(): Promise<void> {
  const user = await currentUser();
  await createAdminClient().from('notifications').update({ read: true }).eq('user_id', user.id).eq('read', false);
  revalidatePath('/sites/factory/dashboard', 'layout');
}
