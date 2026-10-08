// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { requirePermission } from '@/lib/auth/guards';
import { can } from '@/lib/auth/roles';
import { createClient } from '@/lib/supabase/server';
import { stripeDashboardUrl } from '@/lib/stripe';
import { formatBRL, formatDate, formatDateTime } from '@/lib/factory/format';
import { STATUS_LABEL, STATUS_TONE, SUBSCRIPTION_LABEL, SUBSCRIPTION_TONE } from '@/lib/factory/workflow';
import type { OrderStatus, SubscriptionStatus } from '@/lib/factory/types';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/factory/status-badge';
import { DefinitionList, Empty, PageHeader, Panel, tableClass, tableWrap, tdClass, thClass } from '@/components/ops/ui';

export const metadata: Metadata = { title: 'Cliente' };
export const dynamic = 'force-dynamic';

interface Detail {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  orders: Array<{
    id: string;
    code: string;
    status: OrderStatus;
    setup_price: number | null;
    monthly_price: number | null;
    created_at: string;
    delivery_url: string | null;
    products: { name: string } | null;
    subscriptions: Array<{ stripe_subscription_id: string; status: SubscriptionStatus; current_period_end: string | null }>;
    payments: Array<{ id: string; amount: number; status: string; created_at: string; stripe_invoice_id: string | null }>;
    revisions: Array<{ id: string; description: string; status: string; created_at: string }>;
  }>;
}

export default async function CustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requirePermission('customers:read');
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const supabase = await createClient();
  const { data } = await supabase
    .from('users')
    .select(
      'id, name, email, company, stripe_customer_id, created_at, orders!orders_user_id_fkey(id, code, status, setup_price, monthly_price, created_at, delivery_url, products(name), subscriptions(stripe_subscription_id, status, current_period_end), payments(id, amount, status, created_at, stripe_invoice_id), revisions(id, description, status, created_at))',
    )
    .eq('id', id)
    .maybeSingle();
  if (!data) notFound();
  const customer = data as unknown as Detail;
  const finance = can(user.role, 'payments:read');
  const subs = customer.orders.flatMap((o) => o.subscriptions.map((s) => ({ ...s, order: o })));
  const payments = customer.orders.flatMap((o) => o.payments.map((p) => ({ ...p, code: o.code }))).sort((a, b) => b.created_at.localeCompare(a.created_at));
  const revisions = customer.orders.flatMap((o) => o.revisions.map((r) => ({ ...r, code: o.code, orderId: o.id }))).sort((a, b) => b.created_at.localeCompare(a.created_at));
  const mrr = subs.filter((s) => ['active', 'trialing', 'past_due'].includes(s.status)).reduce((sum, s) => sum + (s.order.monthly_price ?? 0), 0);
  const orders = [...customer.orders].sort((a, b) => b.created_at.localeCompare(a.created_at));

  return (
    <div className="flex flex-col gap-6">
      <Link href="/customers" className="inline-flex min-h-10 w-fit items-center gap-2 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft aria-hidden="true" className="size-4" /> Clientes
      </Link>
      <PageHeader title={customer.name ?? customer.email} description={customer.company ?? undefined} />

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Dados">
          <DefinitionList
            items={[
              ['E-mail', <a key="e" href={`mailto:${customer.email}`} className="text-brand hover:underline">{customer.email}</a>],
              ['Empresa', customer.company],
              ['Cliente desde', formatDate(customer.created_at)],
              ['MRR', formatBRL(mrr)],
              ['Stripe', finance && customer.stripe_customer_id ? (
                <a key="s" href={stripeDashboardUrl('customers', customer.stripe_customer_id)} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-brand hover:underline">{customer.stripe_customer_id} ↗</a>
              ) : '—'],
            ]}
          />
        </Panel>
        <Panel title="Assinaturas">
          {subs.length === 0 ? <p className="text-sm text-mute">Nenhuma assinatura.</p> : (
            <ul className="divide-y divide-line text-sm">
              {subs.map((s) => (
                <li key={s.stripe_subscription_id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                  <span>{s.order.products?.name} <span className="font-mono text-xs text-mute">{s.order.code}</span></span>
                  <StatusBadge tone={SUBSCRIPTION_TONE[s.status]}>{SUBSCRIPTION_LABEL[s.status]}</StatusBadge>
                  <span className="text-xs text-mute">renova {formatDate(s.current_period_end)}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <section aria-labelledby="hist-orders">
        <h2 id="hist-orders" className="mb-3 text-sm font-semibold text-ink">Pedidos</h2>
        <div className={tableWrap}>
          {orders.length === 0 ? <Empty>Sem pedidos.</Empty> : (
            <table className={tableClass}>
              <thead>
                <tr>{['ID', 'Produto', 'Plano', 'Status', 'URL', 'Data'].map((h) => <th key={h} scope="col" className={thClass}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-surface">
                    <td className={tdClass}><Link href={`/orders/${o.id}`} className="font-mono text-xs text-brand hover:underline">{o.code}</Link></td>
                    <td className={tdClass}>{o.products?.name}</td>
                    <td className={cn(tdClass, 'tabular-nums text-xs')}>{o.setup_price === null ? 'Orçamento' : `${formatBRL(o.setup_price)} + ${formatBRL(o.monthly_price ?? 0)}/mês`}</td>
                    <td className={tdClass}><StatusBadge tone={STATUS_TONE[o.status]}>{STATUS_LABEL[o.status]}</StatusBadge></td>
                    <td className={cn(tdClass, 'max-w-[12rem] truncate text-xs')}>{o.delivery_url ? <a href={o.delivery_url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">{o.delivery_url}</a> : '—'}</td>
                    <td className={cn(tdClass, 'text-xs text-ink-soft')}>{formatDate(o.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        {finance ? (
          <Panel title="Pagamentos">
            {payments.length === 0 ? <p className="text-sm text-mute">Sem pagamentos.</p> : (
              <ul className="divide-y divide-line text-sm">
                {payments.map((p) => (
                  <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                    <span className="tabular-nums">{formatBRL(p.amount)} <span className="font-mono text-xs text-mute">{p.code}</span></span>
                    <StatusBadge tone={p.status === 'paid' ? 'success' : 'danger'}>{p.status}</StatusBadge>
                    <span className="text-xs text-mute">{formatDateTime(p.created_at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        ) : null}
        <Panel title="Solicitações">
          {revisions.length === 0 ? <p className="text-sm text-mute">Sem solicitações.</p> : (
            <ul className="divide-y divide-line text-sm">
              {revisions.map((r) => (
                <li key={r.id} className="py-2">
                  <Link href={`/orders/${r.orderId}`} className="font-mono text-xs text-brand hover:underline">{r.code}</Link>
                  <span className="ml-2 text-xs text-mute">{formatDateTime(r.created_at)} · {r.status}</span>
                  <p className="mt-1 line-clamp-2 text-ink">{r.description}</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
