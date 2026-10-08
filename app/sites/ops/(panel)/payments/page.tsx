// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { requirePermission } from '@/lib/auth/guards';
import { createClient } from '@/lib/supabase/server';
import { stripeDashboardUrl } from '@/lib/stripe';
import { formatBRL, formatDateTime } from '@/lib/factory/format';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/factory/status-badge';
import { Empty, PageHeader, tableClass, tableWrap, tdClass, thClass } from '@/components/ops/ui';

export const metadata: Metadata = { title: 'Pagamentos' };
export const dynamic = 'force-dynamic';

interface Row {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  stripe_invoice_id: string | null;
  stripe_payment_intent_id: string | null;
  orders: { id: string; code: string; customer: { id: string; name: string | null; email: string } | null; products: { name: string } | null } | null;
}

/** Card data never touches this database: only Stripe identifiers and amounts. */
export default async function PaymentsPage() {
  await requirePermission('payments:read');
  const supabase = await createClient();
  const { data } = await supabase
    .from('payments')
    .select('id, amount, currency, status, created_at, stripe_invoice_id, stripe_payment_intent_id, orders(id, code, customer:users!orders_user_id_fkey(id, name, email), products(name))')
    .order('created_at', { ascending: false })
    .limit(500);
  const rows = (data ?? []) as unknown as Row[];
  const paid = rows.filter((r) => r.status === 'paid').reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Pagamentos" description={`${rows.length} cobrança(s) · ${formatBRL(paid)} recebidos nas últimas 500`} />
      <div className={tableWrap}>
        {rows.length === 0 ? <Empty>Nenhum pagamento registrado.</Empty> : (
          <table className={tableClass}>
            <thead>
              <tr>{['Cliente', 'Pedido', 'Valor', 'Stripe', 'Status', 'Data'].map((h) => <th key={h} scope="col" className={thClass}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const stripeId = r.stripe_invoice_id ?? r.stripe_payment_intent_id;
                return (
                  <tr key={r.id} className="hover:bg-surface">
                    <td className={tdClass}>
                      {r.orders?.customer ? <Link href={`/customers/${r.orders.customer.id}`} className="hover:text-brand hover:underline">{r.orders.customer.name ?? r.orders.customer.email}</Link> : '—'}
                    </td>
                    <td className={tdClass}>
                      {r.orders ? <Link href={`/orders/${r.orders.id}`} className="font-mono text-xs text-brand hover:underline">{r.orders.code}</Link> : '—'}
                      <span className="block text-xs text-mute">{r.orders?.products?.name}</span>
                    </td>
                    <td className={cn(tdClass, 'tabular-nums')}>{formatBRL(r.amount)}</td>
                    <td className={tdClass}>
                      {stripeId ? (
                        <a
                          href={stripeDashboardUrl(r.stripe_invoice_id ? 'invoices' : 'payments', stripeId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-brand hover:underline"
                        >
                          {stripeId.slice(0, 18)}… ↗
                        </a>
                      ) : '—'}
                    </td>
                    <td className={tdClass}><StatusBadge tone={r.status === 'paid' ? 'success' : r.status === 'failed' ? 'danger' : 'neutral'}>{r.status === 'paid' ? 'Pago' : r.status === 'failed' ? 'Falhou' : r.status}</StatusBadge></td>
                    <td className={cn(tdClass, 'whitespace-nowrap text-xs text-ink-soft')}>{formatDateTime(r.created_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
