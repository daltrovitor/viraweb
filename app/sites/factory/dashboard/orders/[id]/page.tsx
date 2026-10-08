// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { isStripeConfigured, isSupabaseConfigured } from '@/lib/env';
import { requireUser } from '@/lib/auth/guards';
import { getMyOrder, nextCharge } from '@/lib/factory/customer';
import { formatBRL, formatDate, formatDateTime, TIER_LABEL } from '@/lib/factory/format';
import { STATUS_HINT, STATUS_LABEL, STATUS_TONE, SUBSCRIPTION_LABEL } from '@/lib/factory/workflow';
import { EXTERNAL_LINK_PROPS } from '@/lib/site';
import { openBillingPortal, payOrder, requestRevision } from '../../actions';
import { StatusBadge } from '@/components/factory/status-badge';
import { RevisionForm } from '@/components/factory/revision-form';
import { FormMessage, SubmitButton } from '@/components/factory/ui/form';
import { ActionLink } from '@/components/ui/action-link';

export const metadata: Metadata = { title: 'Pedido', robots: { index: false, follow: false } };

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ enviado?: string; checkout?: string }>;
}

const TRACK = ['received', 'in_production', 'in_review', 'ready'] as const;

const REVISION_LABEL = { open: 'Aberta', in_progress: 'Em andamento', done: 'Concluída' } as const;

export default async function CustomerOrderPage({ params, searchParams }: Props) {
  if (!isSupabaseConfigured()) notFound();
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const user = await requireUser(`/login?next=/dashboard/orders/${encodeURIComponent(id)}`);
  const order = await getMyOrder(user.id, id);
  if (!order) notFound();

  const step = TRACK.indexOf(order.status as (typeof TRACK)[number]);
  const payable = order.status === 'awaiting_payment' && order.setup_price !== null && order.monthly_price !== null;
  const subscription = order.subscriptions[0];
  const charge = nextCharge(order);
  const latest = order.deliveries[0];
  const briefing = order.briefings?.data ?? {};

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-[calc(var(--nav-h)+2.5rem)] sm:px-8 sm:pb-32 lg:px-12">
      <Link href="/dashboard" className="inline-flex min-h-12 items-center gap-2 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft aria-hidden="true" className="size-4" />
        Meus produtos
      </Link>

      <header className="mt-6 grid grid-cols-12 items-end gap-x-4 gap-y-4 border-b border-ink pb-8">
        <div className="col-span-12 md:col-span-8">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">{order.code} · {TIER_LABEL[order.tier]}</p>
          <h1 className="mt-2 text-[clamp(2.25rem,6vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink">{order.products?.name}</h1>
        </div>
        <div className="col-span-12 md:col-span-4 md:text-right">
          <StatusBadge tone={STATUS_TONE[order.status]}>{STATUS_LABEL[order.status]}</StatusBadge>
          <p className="mt-2 text-sm text-ink-soft">{STATUS_HINT[order.status]}</p>
        </div>
      </header>

      <div className="mt-8 flex flex-col gap-4">
        {query.enviado ? <FormMessage tone="success">Recebemos seu briefing. A proposta com escopo, preço e prazo chega por aqui.</FormMessage> : null}
        {query.checkout === 'cancelado' ? <FormMessage tone="info">O pagamento não foi concluído. Você pode tentar de novo quando quiser.</FormMessage> : null}
        {query.checkout === 'erro' ? <FormMessage>Não conseguimos abrir o pagamento. Tente novamente em instantes.</FormMessage> : null}
      </div>

      <div className="mt-10 grid grid-cols-12 gap-x-4 gap-y-14">
        <div className="col-span-12 flex flex-col gap-14 lg:col-span-7">
          {step >= 0 ? (
            <section aria-labelledby="track-title">
              <h2 id="track-title" className="text-[1.5rem] font-semibold tracking-[-0.04em] text-ink">Produção</h2>
              <ol className="mt-5 grid grid-cols-2 border-t border-line sm:grid-cols-4">
                {TRACK.map((status, i) => (
                  <li key={status} aria-current={i === step ? 'step' : undefined} className="border-b border-line py-4 pr-3">
                    <span aria-hidden="true" className={i <= step ? 'block h-[3px] w-full bg-brand' : 'block h-[3px] w-full bg-line'} />
                    <span className={i <= step ? 'mt-3 block text-sm font-medium text-ink' : 'mt-3 block text-sm text-mute'}>{STATUS_LABEL[status]}</span>
                  </li>
                ))}
              </ol>
              {order.deadline && order.status !== 'ready' ? (
                <p className="mt-4 text-sm text-ink-soft">Entrega prevista até <strong className="font-semibold text-ink">{formatDateTime(order.deadline)}</strong> (horário de Brasília).</p>
              ) : null}
            </section>
          ) : null}

          {latest ? (
            <section aria-labelledby="delivery-title" className="border border-ink p-6 sm:p-8">
              <h2 id="delivery-title" className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-semibold tracking-[-0.045em] text-ink">Seu produto está pronto.</h2>
              <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">
                Versão {latest.version ?? '1.0'} · {formatDate(latest.delivered_at)}
              </p>
              {latest.notes ? <p className="mt-4 whitespace-pre-line text-ink-soft">{latest.notes}</p> : null}
              {latest.instructions ? (
                <div className="mt-4 rounded-sm bg-surface p-4">
                  <h3 className="text-sm font-semibold text-ink">Instruções</h3>
                  <p className="mt-1 whitespace-pre-line text-sm text-ink-soft">{latest.instructions}</p>
                </div>
              ) : null}
              <div className="mt-6">
                <ActionLink href={latest.url} {...EXTERNAL_LINK_PROPS} label="Acessar meu produto" />
              </div>
            </section>
          ) : null}

          <section id="alteracao" aria-labelledby="revisions-title" className="scroll-mt-28">
            <h2 id="revisions-title" className="text-[1.5rem] font-semibold tracking-[-0.04em] text-ink">Alterações</h2>
            {order.revisions.length > 0 ? (
              <ul className="mt-5 border-t border-line">
                {order.revisions.map((revision) => (
                  <li key={revision.id} className="border-b border-line py-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[0.72rem] text-mute">{formatDateTime(revision.created_at)}</span>
                      <StatusBadge tone={revision.status === 'done' ? 'success' : revision.status === 'in_progress' ? 'progress' : 'warning'}>
                        {REVISION_LABEL[revision.status]}
                      </StatusBadge>
                    </div>
                    <p className="mt-2 whitespace-pre-line text-ink">{revision.description}</p>
                    {revision.response ? <p className="mt-2 border-l-2 border-brand pl-3 text-sm text-ink-soft">{revision.response}</p> : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-ink-soft">Nenhuma alteração solicitada.</p>
            )}
            {['ready', 'in_review', 'in_production', 'received'].includes(order.status) ? (
              <div className="mt-8 max-w-xl">
                <RevisionForm action={requestRevision.bind(null, order.id)} />
              </div>
            ) : null}
          </section>
        </div>

        <aside className="col-span-12 flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
          <section aria-labelledby="plan-title">
            <h2 id="plan-title" className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">Plano</h2>
            <dl className="mt-3 border-t border-line text-sm">
              {[
                ['Setup', order.setup_price === null ? 'Em análise' : formatBRL(order.setup_price)],
                ['Mensalidade', order.monthly_price === null ? 'Em análise' : `${formatBRL(order.monthly_price)}/mês`],
                ['Assinatura', subscription ? SUBSCRIPTION_LABEL[subscription.status] : '—'],
                ['Próxima cobrança', charge ? formatDate(charge) : '—'],
              ].map(([term, value]) => (
                <div key={term} className="flex min-h-11 items-center justify-between gap-4 border-b border-line">
                  <dt className="text-ink-soft">{term}</dt>
                  <dd className="font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-col gap-3">
              {payable && isStripeConfigured() ? (
                <form action={payOrder.bind(null, order.id)}>
                  <SubmitButton label="Pagar e iniciar produção" pendingLabel="Abrindo pagamento…" className="w-full" />
                </form>
              ) : null}
              {subscription && isStripeConfigured() ? (
                <form action={openBillingPortal.bind(null, order.id)}>
                  <SubmitButton label="Gerenciar assinatura" pendingLabel="Abrindo…" variant="outline" size="md" className="w-full" />
                </form>
              ) : null}
            </div>
          </section>

          <section aria-labelledby="briefing-title">
            <h2 id="briefing-title" className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">Seu briefing</h2>
            <dl className="mt-3 border-t border-line">
              {Object.entries(briefing)
                .filter(([, value]) => value)
                .map(([key, value]) => (
                  <div key={key} className="border-b border-line py-3">
                    <dt className="text-xs uppercase tracking-[0.08em] text-mute">{key === 'idea' ? 'Ideia' : key}</dt>
                    <dd className="mt-1 whitespace-pre-line break-words text-sm text-ink">{value}</dd>
                  </div>
                ))}
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}
