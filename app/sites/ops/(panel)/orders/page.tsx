// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { requirePermission } from '@/lib/auth/guards';
import { listOrders } from '@/lib/ops/queries';
import { loadHolidays } from '@/lib/factory/repo';
import { formatDate, TIER_LABEL } from '@/lib/factory/format';
import { ORDER_FILTERS, STATUS_LABEL, STATUS_TONE, isOrderFilter } from '@/lib/factory/workflow';
import { slaStatus } from '@/lib/sla';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/factory/status-badge';
import { Empty, PageHeader, opsButton, opsButtonVariant, opsInput, tableClass, tableWrap, tdClass, thClass } from '@/components/ops/ui';

export const metadata: Metadata = { title: 'Pedidos' };
export const dynamic = 'force-dynamic';

const PAYMENT = { unpaid: ['Não pago', 'warning'], paid: ['Pago', 'success'], failed: ['Falhou', 'danger'], refunded: ['Reembolsado', 'neutral'] } as const;

interface Props {
  searchParams: Promise<{ filtro?: string; q?: string }>;
}

export default async function OrdersPage({ searchParams }: Props) {
  await requirePermission('orders:read');
  const { filtro, q = '' } = await searchParams;
  const filter = isOrderFilter(filtro) ? filtro : 'all';
  const [orders, holidays] = await Promise.all([listOrders(filter, q.slice(0, 80)), loadHolidays()]);
  const now = new Date();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Central de pedidos" description={`${orders.length} pedido(s) ${filter === 'all' ? '' : `· ${ORDER_FILTERS.find((f) => f.id === filter)?.label}`}`} />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Filtros" className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-1">
          {ORDER_FILTERS.map((f) => {
            const active = f.id === filter;
            const params = new URLSearchParams({ ...(f.id === 'all' ? {} : { filtro: f.id }), ...(q ? { q } : {}) });
            return (
              <Link
                key={f.id}
                href={`/orders${params.size ? `?${params}` : ''}`}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-10 shrink-0 items-center rounded-sm border px-3 text-sm transition-colors',
                  active ? 'border-ink bg-ink text-white' : 'border-line text-ink-soft hover:border-ink hover:text-ink',
                )}
              >
                {f.label}
              </Link>
            );
          })}
        </nav>
        <form role="search" className="flex gap-2" action="/orders">
          {filter !== 'all' ? <input type="hidden" name="filtro" value={filter} /> : null}
          <label htmlFor="orders-q" className="sr-only">Buscar pedidos</label>
          <input id="orders-q" name="q" defaultValue={q} placeholder="VF-1024, cliente, produto…  ( / )" data-ops-search className={cn(opsInput, 'w-full lg:w-72')} />
          <button type="submit" className={cn(opsButton, opsButtonVariant.secondary)}>Buscar</button>
        </form>
      </div>

      <div className={tableWrap}>
        {orders.length === 0 ? (
          <Empty>Nenhum pedido neste filtro.</Empty>
        ) : (
          <table className={tableClass}>
            <thead>
              <tr>
                {['ID', 'Cliente', 'Produto', 'Pagamento', 'Data', 'Deadline', 'Status', 'Responsável', 'URL'].map((h) => (
                  <th key={h} scope="col" className={thClass}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const sla = o.deadline && !['ready', 'canceled', 'suspended'].includes(o.status) ? slaStatus(new Date(o.deadline), now, holidays) : null;
                return (
                  <tr key={o.id} className="hover:bg-surface">
                    <td className={tdClass}>
                      <Link href={`/orders/${o.id}`} className="font-mono text-xs font-medium text-brand hover:underline">{o.code}</Link>
                      {!o.accepted_at && o.status === 'received' && o.payment_status === 'paid' ? (
                        <span className="ml-2 rounded-[2px] bg-brand px-1 font-mono text-[0.6rem] uppercase text-white">novo</span>
                      ) : null}
                    </td>
                    <td className={tdClass}>
                      <span className="block max-w-[14rem] truncate">{o.customer?.name ?? o.customer?.email ?? '—'}</span>
                      {o.customer?.company ? <span className="block max-w-[14rem] truncate text-xs text-mute">{o.customer.company}</span> : null}
                    </td>
                    <td className={tdClass}>
                      {o.products?.name}
                      <span className="block font-mono text-[0.65rem] uppercase text-mute">{TIER_LABEL[o.tier]}</span>
                    </td>
                    <td className={tdClass}><StatusBadge tone={PAYMENT[o.payment_status][1]}>{PAYMENT[o.payment_status][0]}</StatusBadge></td>
                    <td className={cn(tdClass, 'whitespace-nowrap text-xs text-ink-soft')}>{formatDate(o.created_at)}</td>
                    <td className={cn(tdClass, 'whitespace-nowrap')}>
                      {sla ? <StatusBadge tone={sla.state === 'overdue' ? 'danger' : sla.state === 'near' ? 'warning' : 'success'}>{sla.label}</StatusBadge> : <span className="text-xs text-mute">{o.deadline ? formatDate(o.deadline) : '—'}</span>}
                    </td>
                    <td className={tdClass}><StatusBadge tone={STATUS_TONE[o.status]}>{STATUS_LABEL[o.status]}</StatusBadge></td>
                    <td className={cn(tdClass, 'text-xs')}>{o.assignee?.name ?? o.assignee?.email ?? <span className="text-mute">—</span>}</td>
                    <td className={cn(tdClass, 'max-w-[10rem] truncate text-xs')}>
                      {o.delivery_url ? (
                        <a href={o.delivery_url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">{o.delivery_url.replace(/^https?:\/\//, '')}</a>
                      ) : <span className="text-mute">—</span>}
                    </td>
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
