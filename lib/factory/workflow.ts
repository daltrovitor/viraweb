// Hello World
import type { Role } from '@/lib/auth/roles';
import type { OrderState, OrderStatus, SubscriptionStatus } from './types';

export const STATUS_LABEL: Record<OrderStatus, string> = {
  awaiting_payment: 'Aguardando pagamento',
  briefing_pending: 'Briefing pendente',
  received: 'Recebido',
  in_production: 'Em produção',
  in_review: 'Em revisão',
  ready: 'Pronto',
  suspended: 'Suspenso',
  canceled: 'Cancelado',
};

export type Tone = 'neutral' | 'brand' | 'progress' | 'success' | 'warning' | 'danger';

export const STATUS_TONE: Record<OrderStatus, Tone> = {
  awaiting_payment: 'warning',
  briefing_pending: 'warning',
  received: 'brand',
  in_production: 'progress',
  in_review: 'progress',
  ready: 'success',
  suspended: 'danger',
  canceled: 'neutral',
};

export const SUBSCRIPTION_LABEL: Record<SubscriptionStatus, string> = {
  active: 'Ativa',
  trialing: 'Em teste',
  past_due: 'Pagamento atrasado',
  canceled: 'Cancelada',
  unpaid: 'Não paga',
  paused: 'Pausada',
  incomplete: 'Incompleta',
};

export const SUBSCRIPTION_TONE: Record<SubscriptionStatus, Tone> = {
  active: 'success',
  trialing: 'brand',
  past_due: 'warning',
  canceled: 'neutral',
  unpaid: 'danger',
  paused: 'neutral',
  incomplete: 'warning',
};

export const OPS_ACTIONS = [
  'quote', 'accept', 'assign', 'start', 'review', 'rework', 'approve', 'deliver',
  'reopen', 'suspend', 'reactivate', 'cancel',
] as const;
export type OpsAction = (typeof OPS_ACTIONS)[number];

export const ACTION_LABEL: Record<OpsAction, string> = {
  quote: 'Definir orçamento',
  accept: 'Aceitar pedido',
  assign: 'Atribuir produção',
  start: 'Iniciar produção',
  review: 'Enviar para revisão',
  rework: 'Voltar para produção',
  approve: 'Marcar como pronto',
  deliver: 'Enviar entrega',
  reopen: 'Reabrir para alteração',
  suspend: 'Suspender',
  reactivate: 'Reativar',
  cancel: 'Cancelar pedido',
};

const LIVE: readonly OrderStatus[] = ['received', 'in_production', 'in_review', 'ready'];

/**
 * Which actions a given operator may take on an order right now.
 * The same function guards the buttons (UI) and the server actions.
 */
export function allowedActions(order: OrderState, role: Role, userId: string): OpsAction[] {
  if (role === 'customer' || role === 'support') return [];
  const admin = role === 'admin';
  const owner = admin || order.assigned_to === userId;
  const paid = order.payment_status === 'paid';
  const actions: OpsAction[] = [];

  if (admin && order.tier !== 'standard' && !paid && (order.status === 'received' || order.status === 'awaiting_payment')) {
    actions.push('quote');
  }
  if (admin && order.status === 'received' && paid && !order.accepted_at) actions.push('accept');
  if (admin && order.accepted_at && ['received', 'in_production', 'in_review'].includes(order.status)) actions.push('assign');
  if (owner && order.status === 'received' && order.accepted_at && order.assigned_to && order.briefing_status === 'complete') {
    actions.push('start');
  }
  if (owner && order.status === 'in_production') actions.push('review');
  if (owner && order.status === 'in_review') {
    actions.push('rework');
    if (order.production_status !== 'done') actions.push('approve');
  }
  if (owner && order.production_status === 'done' && (order.status === 'in_review' || order.status === 'ready')) {
    actions.push('deliver');
  }
  if (owner && order.status === 'ready') actions.push('reopen');
  if (admin && LIVE.includes(order.status)) actions.push('suspend');
  if (admin && order.status === 'suspended') actions.push('reactivate');
  if (admin && order.status !== 'canceled') actions.push('cancel');
  return actions;
}

export interface OrderPatch {
  status?: OrderStatus;
  production_status?: OrderState['production_status'];
  accepted_at?: string;
  started_at?: string;
}

/** Status changes for the simple (form-less) transitions. */
export function transitionPatch(action: OpsAction, order: OrderState, now: Date): OrderPatch | null {
  const iso = now.toISOString();
  switch (action) {
    case 'accept':
      return { accepted_at: iso };
    case 'start':
      return { status: 'in_production', production_status: 'in_progress', started_at: iso };
    case 'review':
      return { status: 'in_review', production_status: 'in_review' };
    case 'rework':
    case 'reopen':
      return { status: 'in_production', production_status: 'in_progress' };
    case 'approve':
      return { production_status: 'done' };
    case 'suspend':
      return { status: 'suspended' };
    case 'reactivate':
      return { status: order.delivery_url ? 'ready' : 'received' };
    case 'cancel':
      return { status: 'canceled' };
    default:
      return null;
  }
}

/** Filters of the Operations order center. */
export const ORDER_FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'new', label: 'Novo' },
  { id: 'paid', label: 'Pago' },
  { id: 'briefing', label: 'Briefing' },
  { id: 'production', label: 'Produção' },
  { id: 'review', label: 'Revisão' },
  { id: 'ready', label: 'Pronto' },
  { id: 'canceled', label: 'Cancelado' },
  { id: 'late', label: 'Atrasado' },
] as const;
export type OrderFilter = (typeof ORDER_FILTERS)[number]['id'];

export function isOrderFilter(value: string | undefined): value is OrderFilter {
  return ORDER_FILTERS.some((f) => f.id === value);
}

/** Customer-facing explanation of each state. */
export const STATUS_HINT: Record<OrderStatus, string> = {
  awaiting_payment: 'Conclua o pagamento para o pedido entrar na fila de produção.',
  briefing_pending: 'Precisamos do seu briefing completo para começar.',
  received: 'Recebemos seu pedido. A equipe já está organizando a produção.',
  in_production: 'Seu produto está sendo construído.',
  in_review: 'Estamos revisando cada detalhe antes da entrega.',
  ready: 'Seu produto está pronto.',
  suspended: 'Produto suspenso. Regularize a assinatura para reativar.',
  canceled: 'Pedido cancelado.',
};
