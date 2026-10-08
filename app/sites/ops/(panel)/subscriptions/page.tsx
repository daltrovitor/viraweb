// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { requirePermission } from '@/lib/auth/guards';
import { can } from '@/lib/auth/roles';
import { createClient } from '@/lib/supabase/server';
import { stripeDashboardUrl } from '@/lib/stripe';
import { formatBRL, formatDate } from '@/lib/factory/format';
import { SUBSCRIPTION_LABEL, SUBSCRIPTION_TONE } from '@/lib/factory/workflow';
import { SUBSCRIPTION_STATUSES, type SubscriptionStatus } from '@/lib/factory/types';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/factory/status-badge';
import { Empty, PageHeader, tableClass, tableWrap, tdClass, thClass } from '@/components/ops/ui';

export const metadata: Metadata = { title: 'Assinaturas' };
export const dynamic = 'force-dynamic';

interface Row {
  id: string;
  status: SubscriptionStatus;
  stripe_subscription_id: string;
  current_period_end: string | null;
  users: { id: string; name: string | null; email: string } | null;
  orders: { id: string; code: string; monthly_price: number | null; products: { name: string } | null } | null;
}

export default async function SubscriptionsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const user = await requirePermission('subscriptions:read');
  const { status } = await searchParams;
  const filter = SUBSCRIPTION_STATUSES.find((s) => s === status);
  const supabase = await createClient();
  let query = supabase
    .from('subscriptions')
    .select('id, status, stripe_subscription_id, current_period_end, users(id, name, email), orders(id, code, monthly_price, products(name))')
    .order('created_at', { ascending: false })
    .limit(500);
  if (filter) query = query.eq('status', filter);
  const { data } = await query;
  const rows = (data ?? []) as unknown as Row[];
  const finance = can(user.role, 'payments:read');

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Assinaturas" description={`${rows.length} assinatura(s)`} />
      <nav aria-label="Status" className="scrollbar-none flex gap-1 overflow-x-auto">
        {[undefined, ...SUBSCRIPTION_STATUSES].map((s) => (
          <Link
            key={s ?? 'all'}
            href={s ? `/subscriptions?status=${s}` : '/subscriptions'}
            aria-current={filter === s ? 'page' : undefined}
            className={cn('inline-flex min-h-10 shrink-0 items-center rounded-sm border px-3 text-sm', filter === s ? 'border-ink bg-ink text-white' : 'border-line text-ink-soft hover:border-ink')}
          >
            {s ? SUBSCRIPTION_LABEL[s] : 'Todas'}
          </Link>
        ))}
      </nav>
      <div className={tableWrap}>
        {rows.length === 0 ? <Empty>Nenhuma assinatura.</Empty> : (
          <table className={tableClass}>
            <thead>
              <tr>{['Cliente', 'Produto', 'Plano', 'Valor', 'Status', 'Próxima cobrança', 'Stripe'].map((h) => <th key={h} scope="col" className={thClass}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-surface">
                  <td className={tdClass}>
                    {r.users ? <Link href={`/customers/${r.users.id}`} className="hover:text-brand hover:underline">{r.users.name ?? r.users.email}</Link> : '—'}
                  </td>
                  <td className={tdClass}>{r.orders?.products?.name}</td>
                  <td className={tdClass}>{r.orders ? <Link href={`/orders/${r.orders.id}`} className="font-mono text-xs text-brand hover:underline">{r.orders.code}</Link> : '—'}</td>
                  <td className={cn(tdClass, 'tabular-nums')}>{r.orders?.monthly_price ? `${formatBRL(r.orders.monthly_price)}/mês` : '—'}</td>
                  <td className={tdClass}><StatusBadge tone={SUBSCRIPTION_TONE[r.status]}>{SUBSCRIPTION_LABEL[r.status]}</StatusBadge></td>
                  <td className={cn(tdClass, 'text-xs')}>{formatDate(r.current_period_end)}</td>
                  <td className={tdClass}>
                    {finance ? (
                      <a href={stripeDashboardUrl('subscriptions', r.stripe_subscription_id)} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-brand hover:underline">
                        {r.stripe_subscription_id.slice(0, 18)}… ↗
                      </a>
                    ) : <span className="font-mono text-xs text-mute">{r.stripe_subscription_id.slice(0, 14)}…</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
