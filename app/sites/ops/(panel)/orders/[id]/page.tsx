// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { requirePermission } from '@/lib/auth/guards';
import { can } from '@/lib/auth/roles';
import { getOrder, listOperators } from '@/lib/ops/queries';
import { getProduct, loadHolidays } from '@/lib/factory/repo';
import { briefingFieldsFor } from '@/lib/factory/briefing';
import { formatBRL, formatDateTime, TIER_LABEL } from '@/lib/factory/format';
import { ACTION_LABEL, allowedActions, STATUS_LABEL, STATUS_TONE, SUBSCRIPTION_LABEL, type OpsAction } from '@/lib/factory/workflow';
import { stripeDashboardUrl } from '@/lib/stripe';
import { slaStatus } from '@/lib/sla';
import { StatusBadge } from '@/components/factory/status-badge';
import { OpsActionButton, OpsForm } from '@/components/ops/forms';
import { DefinitionList, Panel, opsInput } from '@/components/ops/ui';
import { assignOrder, deliverOrder, quoteOrder, recalcDeadline, respondRevision, runOrderAction } from '../../actions';

export const metadata: Metadata = { title: 'Pedido' };
export const dynamic = 'force-dynamic';

const SIMPLE: OpsAction[] = ['accept', 'start', 'review', 'rework', 'approve', 'reopen', 'suspend', 'reactivate', 'cancel'];
const PRODUCTION = { queued: 'Na fila', in_progress: 'Em andamento', in_review: 'Em revisão', done: 'Pronto (QA ok)' } as const;
const REVISION = { open: 'Aberta', in_progress: 'Em andamento', done: 'Concluída' } as const;

function StripeLink({ kind, id }: { kind: Parameters<typeof stripeDashboardUrl>[0]; id: string | null | undefined }) {
  if (!id) return <span className="text-mute">—</span>;
  return (
    <a href={stripeDashboardUrl(kind, id)} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-brand hover:underline">
      {id} ↗
    </a>
  );
}

export default async function OpsOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requirePermission('orders:read');
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  const finance = can(user.role, 'payments:read');
  const actions = allowedActions(order, user.role, user.id);
  const [operators, holidays, product] = await Promise.all([
    actions.includes('assign') ? listOperators() : Promise.resolve([]),
    loadHolidays(),
    order.products ? getProduct(order.products.slug) : Promise.resolve(null),
  ]);
  const sla = order.deadline && !['ready', 'canceled', 'suspended'].includes(order.status) ? slaStatus(new Date(order.deadline), new Date(), holidays) : null;
  const subscription = order.subscriptions[0];
  const briefing = order.briefings?.data ?? {};
  const catalogFields = product ? briefingFieldsFor(product) : [];
  const labelFor = (key: string) => catalogFields.find((f) => f.name === key)?.label ?? key;
  const latest = order.deliveries[0];

  return (
    <div className="flex flex-col gap-6">
      <Link href="/orders" className="inline-flex min-h-10 w-fit items-center gap-2 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft aria-hidden="true" className="size-4" /> Pedidos
      </Link>

      <header className="flex flex-col gap-3 border-b border-line pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs text-mute">{order.code} · {TIER_LABEL[order.tier]}</p>
          <h1 className="mt-1 text-[1.75rem] font-semibold tracking-[-0.035em] text-ink">{order.products?.name}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={STATUS_TONE[order.status]}>{STATUS_LABEL[order.status]}</StatusBadge>
          {sla ? <StatusBadge tone={sla.state === 'overdue' ? 'danger' : sla.state === 'near' ? 'warning' : 'success'}>{sla.label}</StatusBadge> : null}
        </div>
      </header>

      {actions.length > 0 ? (
        <Panel title="Ações">
          <div className="flex flex-wrap gap-2">
            {actions
              .filter((a) => SIMPLE.includes(a))
              .map((action) => (
                <OpsActionButton
                  key={action}
                  action={runOrderAction.bind(null, order.id, action)}
                  label={ACTION_LABEL[action]}
                  variant={action === 'cancel' || action === 'suspend' ? 'danger' : action === 'accept' || action === 'start' ? 'primary' : 'secondary'}
                  confirm={action === 'cancel' ? 'Cancelar o pedido e a assinatura no Stripe?' : action === 'suspend' ? 'Suspender este produto?' : undefined}
                />
              ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {actions.includes('assign') ? (
              <div className="rounded-sm border border-line p-3">
                <h3 className="mb-2 text-sm font-semibold">{ACTION_LABEL.assign}</h3>
                <OpsForm action={assignOrder.bind(null, order.id)} submit="Atribuir">
                  <label htmlFor="assignee" className="sr-only">Responsável</label>
                  <select id="assignee" name="assignee" defaultValue={order.assigned_to ?? ''} className={opsInput}>
                    <option value="">Selecione…</option>
                    {operators
                      .filter((o) => o.role === 'production' || o.role === 'admin')
                      .map((o) => (
                        <option key={o.id} value={o.id}>{o.name ?? o.email} · {o.role}</option>
                      ))}
                  </select>
                </OpsForm>
              </div>
            ) : null}

            {actions.includes('deliver') ? (
              <div className="rounded-sm border border-line p-3">
                <h3 className="mb-2 text-sm font-semibold">{ACTION_LABEL.deliver}</h3>
                <OpsForm action={deliverOrder.bind(null, order.id)} submit="Enviar entrega ao cliente" pending="Enviando…">
                  <label className="text-xs text-mute" htmlFor="d-url">URL</label>
                  <input id="d-url" name="url" type="url" required placeholder="https://" defaultValue={order.delivery_url ?? ''} className={opsInput} />
                  <label className="text-xs text-mute" htmlFor="d-version">Versão</label>
                  <input id="d-version" name="version" placeholder="1.0" className={opsInput} />
                  <label className="text-xs text-mute" htmlFor="d-notes">Observações</label>
                  <textarea id="d-notes" name="notes" rows={2} className={opsInput} />
                  <label className="text-xs text-mute" htmlFor="d-instr">Instruções ao cliente</label>
                  <textarea id="d-instr" name="instructions" rows={2} className={opsInput} />
                </OpsForm>
              </div>
            ) : null}

            {actions.includes('quote') ? (
              <div className="rounded-sm border border-line p-3">
                <h3 className="mb-2 text-sm font-semibold">{ACTION_LABEL.quote}</h3>
                <OpsForm action={quoteOrder.bind(null, order.id)} submit="Enviar proposta ao cliente">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-mute" htmlFor="q-setup">Setup (R$)</label>
                      <input id="q-setup" name="setup" inputMode="decimal" required className={opsInput} />
                    </div>
                    <div>
                      <label className="text-xs text-mute" htmlFor="q-monthly">Mensal (R$)</label>
                      <input id="q-monthly" name="monthly" inputMode="decimal" required className={opsInput} />
                    </div>
                    <div>
                      <label className="text-xs text-mute" htmlFor="q-days">Prazo (dias úteis)</label>
                      <input id="q-days" name="delivery_days" type="number" min={1} max={180} required className={opsInput} />
                    </div>
                  </div>
                  <label className="text-xs text-mute" htmlFor="q-note">Escopo / observações</label>
                  <textarea id="q-note" name="note" rows={3} className={opsInput} />
                </OpsForm>
              </div>
            ) : null}
          </div>
        </Panel>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Cliente">
          <DefinitionList
            items={[
              ['Nome', order.customer?.name],
              ['E-mail', order.customer?.email ? <a href={`mailto:${order.customer.email}`} className="text-brand hover:underline">{order.customer.email}</a> : null],
              ['Empresa', order.customer?.company ?? briefing.company],
              ['WhatsApp', briefing.whatsapp],
              ['Perfil', order.customer?.id && can(user.role, 'customers:read') ? <Link href={`/customers/${order.customer.id}`} className="text-brand hover:underline">Ver histórico →</Link> : null],
            ]}
          />
        </Panel>

        <Panel title="Produto">
          <DefinitionList
            items={[
              ['Produto', order.products?.name],
              ['Tipo', TIER_LABEL[order.tier]],
              ['Setup', order.setup_price === null ? 'Aguardando orçamento' : formatBRL(order.setup_price)],
              ['Mensalidade', order.monthly_price === null ? 'Aguardando orçamento' : `${formatBRL(order.monthly_price)}/mês`],
              ['Prazo contratado', order.delivery_days ? `${order.delivery_days} dia(s) útil(eis)` : '—'],
            ]}
          />
        </Panel>

        <Panel title="Pagamento">
          <DefinitionList
            items={[
              ['Status', <StatusBadge key="p" tone={order.payment_status === 'paid' ? 'success' : order.payment_status === 'failed' ? 'danger' : 'warning'}>{order.payment_status}</StatusBadge>],
              ['Pago em', formatDateTime(order.paid_at)],
              ['Stripe Customer', finance ? <StripeLink key="c" kind="customers" id={subscription?.stripe_customer_id ?? order.customer?.stripe_customer_id} /> : 'restrito'],
              ['Subscription', finance ? <StripeLink key="s" kind="subscriptions" id={subscription?.stripe_subscription_id} /> : subscription ? SUBSCRIPTION_LABEL[subscription.status] : '—'],
              ['Assinatura', subscription ? `${SUBSCRIPTION_LABEL[subscription.status]} · renova ${formatDateTime(subscription.current_period_end)}` : '—'],
              ['Invoice', finance ? <StripeLink key="i" kind="invoices" id={order.payments[0]?.stripe_invoice_id} /> : '—'],
            ]}
          />
        </Panel>

        <Panel
          title="Produção"
          actions={
            can(user.role, 'orders:write') && order.paid_at ? (
              <OpsActionButton action={recalcDeadline.bind(null, order.id)} label="Recalcular prazo" />
            ) : null
          }
        >
          <DefinitionList
            items={[
              ['Responsável', order.assignee?.name ?? order.assignee?.email ?? 'Não atribuído'],
              ['Aceito em', formatDateTime(order.accepted_at)],
              ['Início', formatDateTime(order.started_at)],
              ['Deadline', order.deadline ? `${formatDateTime(order.deadline)} (Brasília)` : '—'],
              ['Etapa', PRODUCTION[order.production_status]],
              ['Briefing', order.briefing_status === 'complete' ? `Completo · ${formatDateTime(order.briefing_completed_at)}` : 'Pendente'],
            ]}
          />
        </Panel>
      </div>

      <Panel title="Briefing">
        {Object.keys(briefing).length === 0 ? (
          <p className="text-sm text-mute">Sem briefing.</p>
        ) : (
          <dl className="divide-y divide-line">
            {Object.entries(briefing).map(([key, value]) => (
              <div key={key} className={key === 'idea' ? 'pb-4' : 'grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-4'}>
                <dt className={key === 'idea' ? 'font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mute' : 'text-sm text-mute'}>{labelFor(key)}</dt>
                <dd className={key === 'idea' ? 'mt-2 whitespace-pre-line text-[1.05rem] leading-relaxed text-ink' : 'whitespace-pre-line break-words text-sm text-ink'}>
                  {value || <span className="text-mute">—</span>}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Panel>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Entrega">
          {latest ? (
            <DefinitionList
              items={[
                ['URL', <a key="u" href={latest.url} target="_blank" rel="noopener noreferrer" className="break-all text-brand hover:underline">{latest.url}</a>],
                ['Versão', latest.version],
                ['Observações', latest.notes],
                ['Instruções', latest.instructions],
                ['Entregue em', formatDateTime(latest.delivered_at)],
                ['Histórico', `${order.deliveries.length} entrega(s)`],
              ]}
            />
          ) : (
            <p className="text-sm text-mute">Ainda não entregue.</p>
          )}
        </Panel>

        <Panel title={`Alterações (${order.revisions.length})`}>
          {order.revisions.length === 0 ? <p className="text-sm text-mute">Nenhuma solicitação.</p> : null}
          <ul className="divide-y divide-line">
            {order.revisions.map((revision) => (
              <li key={revision.id} className="py-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-mute">{formatDateTime(revision.created_at)}</span>
                  <StatusBadge tone={revision.status === 'done' ? 'success' : revision.status === 'in_progress' ? 'progress' : 'warning'}>{REVISION[revision.status]}</StatusBadge>
                </div>
                <p className="mt-1 whitespace-pre-line text-sm text-ink">{revision.description}</p>
                <details className="mt-2">
                  <summary className="min-h-10 cursor-pointer py-2 text-xs font-medium text-brand">Responder</summary>
                  <OpsForm action={respondRevision.bind(null, revision.id)} submit="Salvar resposta">
                    <label className="sr-only" htmlFor={`r-status-${revision.id}`}>Status</label>
                    <select id={`r-status-${revision.id}`} name="status" defaultValue={revision.status} className={opsInput}>
                      <option value="open">Aberta</option>
                      <option value="in_progress">Em andamento</option>
                      <option value="done">Concluída</option>
                    </select>
                    <label className="sr-only" htmlFor={`r-resp-${revision.id}`}>Resposta</label>
                    <textarea id={`r-resp-${revision.id}`} name="response" rows={2} defaultValue={revision.response ?? ''} placeholder="Resposta ao cliente" className={opsInput} />
                  </OpsForm>
                </details>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {finance && order.payments.length > 0 ? (
        <Panel title="Cobranças">
          <ul className="divide-y divide-line text-sm">
            {order.payments.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                <span className="tabular-nums">{formatBRL(p.amount)}</span>
                <StatusBadge tone={p.status === 'paid' ? 'success' : 'danger'}>{p.status}</StatusBadge>
                <span className="text-xs text-mute">{formatDateTime(p.created_at)}</span>
                <StripeLink kind="invoices" id={p.stripe_invoice_id} />
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}
    </div>
  );
}
