// Hello World
import type { Metadata } from 'next';
import { isServiceRoleConfigured, isStripeConfigured, isSupabaseConfigured } from '@/lib/env';
import { getSessionUser } from '@/lib/auth/guards';
import { reconcileCheckoutSession } from '@/lib/factory/stripe-webhook';
import { ActionNavLink } from '@/components/factory/action-nav-link';

export const metadata: Metadata = { title: 'Pedido confirmado', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

/**
 * Return page from Stripe Checkout. The session is verified server-side against
 * Stripe's API (and the webhook does the same), so the order is confirmed even
 * if the webhook is delayed — never on the browser's word alone.
 */
export default async function OrderSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;
  let orderId: string | null = null;
  let code: string | null = null;
  let paid = false;

  const ready = isStripeConfigured() && isSupabaseConfigured() && isServiceRoleConfigured();
  if (sessionId && /^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId) && ready) {
    const user = await getSessionUser();
    if (user) {
      try {
        ({ orderId, code, paid } = await reconcileCheckoutSession(sessionId, user.id));
      } catch (error) {
        console.error('checkout_reconcile_failed', error instanceof Error ? error.message : error);
      }
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
            ? 'Recebemos seu pagamento e seu briefing. O prazo de entrega já aparece na sua área.'
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
