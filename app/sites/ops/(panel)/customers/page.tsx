// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { requirePermission } from '@/lib/auth/guards';
import { createClient } from '@/lib/supabase/server';
import { formatBRL, formatDate } from '@/lib/factory/format';
import type { OrderStatus, SubscriptionStatus } from '@/lib/factory/types';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/factory/status-badge';
import { Empty, PageHeader, opsButton, opsButtonVariant, opsInput, tableClass, tableWrap, tdClass, thClass } from '@/components/ops/ui';

export const metadata: Metadata = { title: 'Clientes' };
export const dynamic = 'force-dynamic';

interface CustomerRow {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
  created_at: string;
  orders: Array<{ id: string; status: OrderStatus; monthly_price: number | null; subscriptions: Array<{ status: SubscriptionStatus }> }>;
}

const LIVE_SUB: SubscriptionStatus[] = ['active', 'trialing', 'past_due'];

export default async function CustomersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  await requirePermission('customers:read');
  const { q = '' } = await searchParams;
  const supabase = await createClient();
  let query = supabase
    .from('users')
    .select('id, name, email, company, created_at, orders!orders_user_id_fkey(id, status, monthly_price, subscriptions(status))')
    .eq('role', 'customer')
    .order('created_at', { ascending: false })
    .limit(300);
  const term = q.trim().slice(0, 80).replace(/[%,()]/g, '');
  if (term) query = query.or(`name.ilike.%${term}%,email.ilike.%${term}%,company.ilike.%${term}%`);
  const { data } = await query;
  const customers = (data ?? []) as unknown as CustomerRow[];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Clientes" description={`${customers.length} cliente(s)`} />
      <form role="search" action="/customers" className="flex gap-2">
        <label htmlFor="customers-q" className="sr-only">Buscar clientes</label>
        <input id="customers-q" name="q" defaultValue={q} placeholder="Nome, e-mail ou empresa  ( / )" data-ops-search className={cn(opsInput, 'max-w-sm')} />
        <button type="submit" className={cn(opsButton, opsButtonVariant.secondary)}>Buscar</button>
      </form>
      <div className={tableWrap}>
        {customers.length === 0 ? (
          <Empty>Nenhum cliente encontrado.</Empty>
        ) : (
          <table className={tableClass}>
            <thead>
              <tr>
                {['Nome', 'E-mail', 'Empresa', 'Produtos', 'Assinatura', 'MRR', 'Pedidos', 'Status', 'Desde'].map((h) => (
                  <th key={h} scope="col" className={thClass}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => {
                const live = c.orders.filter((o) => o.subscriptions.some((s) => LIVE_SUB.includes(s.status)));
                const mrr = live.reduce((sum, o) => sum + (o.monthly_price ?? 0), 0);
                const delivered = c.orders.filter((o) => o.status === 'ready').length;
                const pastDue = c.orders.some((o) => o.subscriptions.some((s) => s.status === 'past_due' || s.status === 'unpaid'));
                return (
                  <tr key={c.id} className="hover:bg-surface">
                    <td className={tdClass}><Link href={`/customers/${c.id}`} className="font-medium hover:text-brand hover:underline">{c.name ?? '—'}</Link></td>
                    <td className={cn(tdClass, 'text-xs')}>{c.email}</td>
                    <td className={tdClass}>{c.company ?? '—'}</td>
                    <td className={cn(tdClass, 'tabular-nums')}>{delivered}</td>
                    <td className={tdClass}>{live.length ? `${live.length} ativa(s)` : '—'}</td>
                    <td className={cn(tdClass, 'tabular-nums')}>{mrr ? formatBRL(mrr) : '—'}</td>
                    <td className={cn(tdClass, 'tabular-nums')}>{c.orders.length}</td>
                    <td className={tdClass}>
                      <StatusBadge tone={pastDue ? 'danger' : live.length ? 'success' : 'neutral'}>{pastDue ? 'Inadimplente' : live.length ? 'Ativo' : 'Sem assinatura'}</StatusBadge>
                    </td>
                    <td className={cn(tdClass, 'whitespace-nowrap text-xs text-ink-soft')}>{formatDate(c.created_at)}</td>
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
