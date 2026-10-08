// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { requireRole } from '@/lib/auth/guards';
import { can } from '@/lib/auth/roles';
import { dashboardMetrics } from '@/lib/ops/queries';
import { formatBRL, formatDateTime } from '@/lib/factory/format';
import { StatusBadge } from '@/components/factory/status-badge';
import { Empty, Metric, PageHeader, Panel } from '@/components/ops/ui';

export const metadata: Metadata = { title: 'Dashboard' };
export const dynamic = 'force-dynamic';

const SLA_TONE = { on_time: 'success', near: 'warning', overdue: 'danger' } as const;

function hours(value: number | null) {
  if (value === null) return '—';
  return value < 48 ? `${value.toFixed(1)} h` : `${(value / 24).toFixed(1)} dias`;
}

export default async function OpsDashboard() {
  const user = await requireRole();
  const finance = can(user.role, 'payments:read');
  const m = await dashboardMetrics(finance);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description={`Olá, ${user.name ?? user.email}. ${user.role === 'production' ? 'Você vê os pedidos atribuídos a você.' : 'Visão geral da fábrica.'}`}
      />

      <section aria-label="Métricas" className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 xl:grid-cols-6">
        {finance ? <Metric label="MRR" value={formatBRL(m.mrr)} tone="brand" /> : null}
        {finance && m.revenue !== null ? <Metric label="Receita total" value={formatBRL(m.revenue)} /> : null}
        <Metric label="Pedidos novos" value={m.newOrders} hint="pagos, aguardando aceite" />
        <Metric label="Em produção" value={m.inProduction} />
        <Metric label="Atrasados" value={m.late} tone={m.late ? 'danger' : 'ink'} />
        <Metric label="Entregues" value={m.delivered} />
        {m.activeSubscriptions !== null && user.role !== 'production' ? <Metric label="Assinaturas ativas" value={m.activeSubscriptions} /> : null}
        {finance && m.failedPayments !== null ? <Metric label="Pagamentos falhos" value={m.failedPayments} hint="últimos 30 dias" tone={m.failedPayments ? 'danger' : 'ink'} /> : null}
        <Metric label="Cancelamentos" value={m.cancellations30d} hint="últimos 30 dias" />
        {finance ? <Metric label="Churn" value={m.churn30d === null ? '—' : `${(m.churn30d * 100).toFixed(1)}%`} hint="30 dias" /> : null}
        <Metric label="Tempo médio de entrega" value={hours(m.avgDeliveryHours)} hint="pagamento → entrega" />
      </section>

      <Panel
        title="SLA"
        actions={
          <Link href="/orders?filtro=late" className="text-xs font-medium text-brand hover:underline">
            Ver atrasados →
          </Link>
        }
      >
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              ['on_time', 'Dentro do prazo'],
              ['near', 'Próximos do prazo'],
              ['overdue', 'Atrasados'],
            ] as const
          ).map(([state, label]) => (
            <div key={state} className="rounded-sm border border-line p-3">
              <StatusBadge tone={SLA_TONE[state]}>{label}</StatusBadge>
              <p className="mt-2 text-[1.75rem] font-semibold tabular-nums tracking-[-0.035em] text-ink">{m.sla[state]}</p>
            </div>
          ))}
        </div>
        {m.slaOrders.length === 0 ? (
          <Empty>Nenhum pedido em produção com prazo.</Empty>
        ) : (
          <ul className="mt-4 divide-y divide-line border-t border-line">
            {m.slaOrders.slice(0, 12).map((o) => (
              <li key={o.id}>
                <Link href={`/orders/${o.id}`} className="grid min-h-11 grid-cols-[5rem_1fr_auto] items-center gap-3 text-sm hover:bg-surface sm:grid-cols-[5rem_1fr_9rem_auto]">
                  <span className="font-mono text-xs text-mute">{o.code}</span>
                  <span className="truncate text-ink">{o.product}</span>
                  <span className="hidden text-xs text-mute sm:block">{formatDateTime(o.deadline)}</span>
                  <StatusBadge tone={SLA_TONE[o.state]}>{o.label}</StatusBadge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
