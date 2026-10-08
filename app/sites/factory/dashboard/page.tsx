// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/env';
import { requireUser } from '@/lib/auth/guards';
import { listMyOrders, myNotifications, nextCharge } from '@/lib/factory/customer';
import { formatBRL, formatDate } from '@/lib/factory/format';
import { STATUS_LABEL, STATUS_TONE } from '@/lib/factory/workflow';
import { EXTERNAL_LINK_PROPS } from '@/lib/site';
import { signOut } from '@/app/sites/factory/login/actions';
import { markNotificationsRead, payOrder } from './actions';
import { StatusBadge } from '@/components/factory/status-badge';
import { ActionNavLink } from '@/components/factory/action-nav-link';
import { FormMessage, SubmitButton } from '@/components/factory/ui/form';
import { ActionLink } from '@/components/ui/action-link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Meus produtos',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-[calc(var(--nav-h)+4rem)] sm:px-8 lg:px-12">
        <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-[-0.055em] text-ink">Meus produtos</h1>
        <div className="mt-8 max-w-xl"><FormMessage tone="info">A área do cliente está sendo ativada.</FormMessage></div>
      </div>
    );
  }

  const user = await requireUser('/login?next=/dashboard');
  const [orders, notifications] = await Promise.all([listMyOrders(user.id), myNotifications(user.id)]);
  const unread = notifications.filter((n) => !n.read);
  const ready = orders.filter((o) => o.status === 'ready' && o.delivery_url);

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-[calc(var(--nav-h)+3rem)] sm:px-8 sm:pb-32 lg:px-12">
      <header className="grid grid-cols-12 items-end gap-x-4 gap-y-6 border-b border-ink pb-8">
        <div className="col-span-12 md:col-span-8">
          <p className="text-ink-soft">Olá, {user.name ?? user.email}.</p>
          <h1 className="mt-2 text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-ink">Meus produtos</h1>
        </div>
        <div className="col-span-12 flex flex-wrap items-center gap-3 md:col-span-4 md:justify-end">
          <ActionNavLink href="/products" label="Criar novo produto" size="md" />
          <form action={signOut}>
            <SubmitButton label="Sair" pendingLabel="Saindo…" variant="outline" size="md" icon={false} />
          </form>
        </div>
      </header>

      {ready.map((order) => (
        <section key={`ready-${order.id}`} aria-label="Produto pronto" className="mt-10 grid grid-cols-12 items-center gap-x-4 gap-y-6 border border-ink p-6 sm:p-8">
          <div className="col-span-12 md:col-span-8">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">{order.code} · {order.products?.name}</p>
            <p className="mt-2 text-[clamp(1.6rem,3.6vw,2.75rem)] font-semibold tracking-[-0.045em] text-ink">Seu produto está pronto.</p>
          </div>
          <div className="col-span-12 md:col-span-4 md:justify-self-end">
            <ActionLink href={order.delivery_url ?? '#'} {...EXTERNAL_LINK_PROPS} label="Acessar meu produto" />
          </div>
        </section>
      ))}

      {unread.length > 0 ? (
        <section aria-labelledby="notif-title" className="mt-10 border-b border-line pb-6">
          <div className="flex items-center justify-between gap-4">
            <h2 id="notif-title" className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">Novidades ({unread.length})</h2>
            <form action={markNotificationsRead}>
              <button type="submit" className="min-h-12 cursor-pointer text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline">
                Marcar como lidas
              </button>
            </form>
          </div>
          <ul className="mt-2">
            {unread.map((n) => (
              <li key={n.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line py-3">
                <span className="text-ink">
                  <strong className="font-semibold">{n.title}</strong> {n.message ? <span className="text-ink-soft">— {n.message}</span> : null}
                </span>
                {n.link ? (
                  <Link href={n.link} className="inline-flex min-h-11 items-center text-sm font-medium text-brand hover:underline">Abrir</Link>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {orders.length === 0 ? (
        <section className="grid grid-cols-12 gap-x-4 py-24">
          <div className="col-span-12 lg:col-span-6 lg:col-start-4">
            <p className="text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.045em] text-ink">
              Você ainda não tem produtos. <span className="font-serif font-normal italic text-brand">Que tal o primeiro?</span>
            </p>
            <div className="mt-8"><ActionNavLink href="/products" label="Criar meu produto" /></div>
          </div>
        </section>
      ) : (
        <section aria-label="Pedidos" className="mt-10">
          <div aria-hidden="true" className="hidden grid-cols-[1.6fr_1fr_1.2fr_1fr_auto] gap-4 border-b border-line pb-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute lg:grid">
            <span>Produto</span>
            <span>Status</span>
            <span>Plano</span>
            <span>Próxima cobrança</span>
            <span className="w-56 text-right">Ações</span>
          </div>
          <ul>
            {orders.map((order) => {
              const charge = nextCharge(order);
              const payable = order.status === 'awaiting_payment' && order.setup_price !== null && order.monthly_price !== null;
              return (
                <li key={order.id} className="grid grid-cols-1 gap-x-4 gap-y-3 border-b border-line py-6 lg:grid-cols-[1.6fr_1fr_1.2fr_1fr_auto] lg:items-center">
                  <div>
                    <Link href={`/dashboard/orders/${order.id}`} className="text-[1.25rem] font-semibold tracking-[-0.035em] text-ink hover:underline">
                      {order.products?.name ?? 'Produto'}
                    </Link>
                    <p className="font-mono text-[0.72rem] text-mute">{order.code} · {formatDate(order.created_at)}</p>
                    {order.delivery_url ? (
                      <a href={order.delivery_url} {...EXTERNAL_LINK_PROPS} className="mt-1 inline-flex min-h-11 items-center gap-1 break-all text-sm text-brand hover:underline">
                        {order.delivery_url.replace(/^https?:\/\//, '')}
                        <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
                      </a>
                    ) : null}
                  </div>
                  <div><StatusBadge tone={STATUS_TONE[order.status]}>{STATUS_LABEL[order.status]}</StatusBadge></div>
                  <p className="text-sm text-ink-soft">
                    <span className="lg:sr-only">Plano: </span>
                    {order.setup_price === null ? 'Orçamento em análise' : `${formatBRL(order.setup_price)} + ${formatBRL(order.monthly_price ?? 0)}/mês`}
                  </p>
                  <p className="text-sm text-ink-soft">
                    <span className="lg:sr-only">Próxima cobrança: </span>
                    {charge ? formatDate(charge) : '—'}
                  </p>
                  <div className="flex flex-wrap gap-2 lg:w-56 lg:justify-end">
                    {payable ? (
                      <form action={payOrder.bind(null, order.id)}>
                        <SubmitButton label="Pagar" pendingLabel="Abrindo…" size="md" />
                      </form>
                    ) : null}
                    {order.delivery_url ? (
                      <ActionLink href={order.delivery_url} {...EXTERNAL_LINK_PROPS} label="Acessar" size="md" variant="outline" />
                    ) : null}
                    <Link
                      href={`/dashboard/orders/${order.id}${order.status === 'ready' ? '#alteracao' : ''}`}
                      className="inline-flex min-h-12 items-center gap-1 px-2 text-sm font-medium text-ink hover:underline"
                    >
                      {order.status === 'ready' ? 'Solicitar alteração' : 'Detalhes'}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
