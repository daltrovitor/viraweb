// Hello World
import type { Metadata } from 'next';
import { isStripeConfigured, isSupabaseConfigured } from '@/lib/env';
import { getSessionUser } from '@/lib/auth/guards';
import { getStripe } from '@/lib/stripe';
import { ActionNavLink } from '@/components/factory/action-nav-link';

export const metadata: Metadata = { title: 'Pedido confirmado', robots: { index: false, follow: false } };

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

/**
 * Return page from Stripe Checkout. It only reads the session to show a receipt;
 * the order is confirmed exclusively by the webhook.
 */
export default async function OrderSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;
  let orderId: string | null = null;
  let code: string | null = null;
  let paid = false;

  if (sessionId && /^cs_[A-Za-z0-9_]+$/.test(sessionId) && isStripeConfigured() && isSupabaseConfigured()) {
    const user = await getSessionUser();
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      if (user && session.metadata?.user_id === user.id) {
        orderId = session.metadata.order_id ?? null;
        code = session.metadata.order_code ?? null;
        paid = session.payment_status === 'paid' || session.payment_status === 'no_payment_required';
      }
    } catch {
      // Unknown or foreign session: show the generic confirmation.
    }
  }

  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 px-4 pb-24 pt-[calc(var(--nav-h)+5rem)] sm:px-8 lg:px-12">
      <div className="col-span-12 lg:col-span-8 lg:col-start-3">
        {code ? <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">Pedido {code}</p> : null}
        <h1 className="mt-4 text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-ink">
          {paid ? 'Pedido confirmado.' : 'Pagamento em processamento.'}
          <br />
          <span className="font-serif font-normal italic tracking-[-0.02em] text-brand">A fábrica já começou.</span>
        </h1>
        <p className="mt-8 max-w-[52ch] text-lg text-ink-soft">
          {paid
            ? 'Recebemos seu pagamento e seu briefing. O prazo de entrega aparece na sua área assim que o pedido entra na fila de produção.'
            : 'Assim que o Stripe confirmar o pagamento, seu pedido entra automaticamente na fila de produção.'}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ActionNavLink href={orderId ? `/dashboard/orders/${orderId}` : '/dashboard'} label="Acompanhar meu pedido" />
          <ActionNavLink href="/products" label="Criar outro produto" variant="outline" />
        </div>
      </div>
    </div>
  );
}
