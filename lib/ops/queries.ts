// Hello World
import 'server-only';
import { createClient } from '@/lib/supabase/server';
import { slaStatus, type SlaState } from '@/lib/sla';
import { loadHolidays } from '@/lib/factory/repo';
import type { OrderFilter } from '@/lib/factory/workflow';
import type {
  BriefingStatus, OrderStatus, PaymentStatus, ProductionStatus, SubscriptionStatus, Tier,
} from '@/lib/factory/types';

/** All reads here use the operator's own session: RLS scopes rows per role. */

export interface Person {
  id?: string;
  name: string | null;
  email: string;
  company?: string | null;
}

export interface OpsOrderRow {
  id: string;
  code: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  briefing_status: BriefingStatus;
  production_status: ProductionStatus;
  tier: Tier;
  setup_price: number | null;
  monthly_price: number | null;
  delivery_url: string | null;
  deadline: string | null;
  accepted_at: string | null;
  assigned_to: string | null;
  created_at: string;
  customer: Person | null;
  assignee: Person | null;
  products: { name: string; slug: string } | null;
}

const ORDER_LIST =
  'id, code, status, payment_status, briefing_status, production_status, tier, setup_price, monthly_price, delivery_url, deadline, accepted_at, assigned_to, created_at, customer:users!orders_user_id_fkey(name, email, company), assignee:users!orders_assigned_to_fkey(name, email), products(name, slug)';

const CLOSED: OrderStatus[] = ['ready', 'canceled', 'suspended'];

export async function listOrders(filter: OrderFilter, search: string, limit = 100): Promise<OpsOrderRow[]> {
  const supabase = await createClient();
  let query = supabase.from('orders').select(ORDER_LIST).order('created_at', { ascending: false }).limit(limit);
  const now = new Date().toISOString();
  switch (filter) {
    case 'new': query = query.eq('status', 'received').is('accepted_at', null); break;
    case 'paid': query = query.eq('payment_status', 'paid'); break;
    case 'briefing': query = query.eq('status', 'briefing_pending'); break;
    case 'production': query = query.eq('status', 'in_production'); break;
    case 'review': query = query.eq('status', 'in_review'); break;
    case 'ready': query = query.eq('status', 'ready'); break;
    case 'canceled': query = query.eq('status', 'canceled'); break;
    case 'late': query = query.lt('deadline', now).not('status', 'in', `(${CLOSED.join(',')})`); break;
    default: break;
  }
  const term = search.trim();
  const byCode = /^VF-\d{1,10}$/i.test(term);
  if (byCode) query = query.eq('code', term.toUpperCase());
  const { data } = await query;
  const rows = (data ?? []) as unknown as OpsOrderRow[];
  if (!term || byCode) return rows;
  const needle = term.toLowerCase();
  return rows.filter((o) =>
    [o.customer?.name, o.customer?.email, o.customer?.company, o.products?.name]
      .some((value) => value?.toLowerCase().includes(needle)),
  );
}

export interface OpsOrderDetail extends OpsOrderRow {
  user_id: string;
  paid_at: string | null;
  started_at: string | null;
  delivered_at: string | null;
  delivery_days: number | null;
  briefing_completed_at: string | null;
  stripe_checkout_session_id: string | null;
  customer: (Person & { id: string; stripe_customer_id: string | null }) | null;
  briefings: { data: Record<string, string>; notes: string | null } | null;
  subscriptions: Array<{ stripe_subscription_id: string; stripe_customer_id: string; status: SubscriptionStatus; current_period_end: string | null }>;
  payments: Array<{ id: string; stripe_invoice_id: string | null; stripe_payment_intent_id: string | null; amount: number; currency: string; status: string; created_at: string }>;
  deliveries: Array<{ id: string; url: string; version: string | null; notes: string | null; instructions: string | null; delivered_at: string }>;
  revisions: Array<{ id: string; description: string; status: 'open' | 'in_progress' | 'done'; response: string | null; created_at: string }>;
}

export async function getOrder(id: string): Promise<OpsOrderDetail | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from('orders')
    .select(
      `${ORDER_LIST.replace('customer:users!orders_user_id_fkey(name, email, company)', 'customer:users!orders_user_id_fkey(id, name, email, company, stripe_customer_id)')}, user_id, paid_at, started_at, delivered_at, delivery_days, briefing_completed_at, stripe_checkout_session_id, briefings(data, notes), subscriptions(stripe_subscription_id, stripe_customer_id, status, current_period_end), payments(id, stripe_invoice_id, stripe_payment_intent_id, amount, currency, status, created_at), deliveries(id, url, version, notes, instructions, delivered_at), revisions(id, description, status, response, created_at)`,
    )
    .eq('id', id)
    .maybeSingle();
  if (!data) return null;
  const order = data as unknown as OpsOrderDetail;
  order.deliveries = [...(order.deliveries ?? [])].sort((a, b) => b.delivered_at.localeCompare(a.delivered_at));
  order.revisions = [...(order.revisions ?? [])].sort((a, b) => b.created_at.localeCompare(a.created_at));
  order.payments = [...(order.payments ?? [])].sort((a, b) => b.created_at.localeCompare(a.created_at));
  return order;
}

export interface Metrics {
  mrr: number;
  revenue: number | null;
  newOrders: number;
  inProduction: number;
  late: number;
  delivered: number;
  activeSubscriptions: number | null;
  failedPayments: number | null;
  cancellations30d: number;
  churn30d: number | null;
  avgDeliveryHours: number | null;
  sla: Record<SlaState, number>;
  slaOrders: Array<{ id: string; code: string; product: string; deadline: string; state: SlaState; label: string }>;
}

interface MetricOrder {
  id: string;
  code: string;
  status: OrderStatus;
  monthly_price: number | null;
  deadline: string | null;
  accepted_at: string | null;
  paid_at: string | null;
  delivered_at: string | null;
  updated_at: string;
  products: { name: string } | null;
}

export async function dashboardMetrics(includeFinance: boolean): Promise<Metrics> {
  const supabase = await createClient();
  const [ordersRes, subsRes, paymentsRes, holidays] = await Promise.all([
    supabase.from('orders').select('id, code, status, monthly_price, deadline, accepted_at, paid_at, delivered_at, updated_at, products(name)').limit(5000),
    supabase.from('subscriptions').select('status, order_id, updated_at').limit(5000),
    includeFinance ? supabase.from('payments').select('amount, status, created_at').limit(10000) : Promise.resolve({ data: null }),
    loadHolidays(),
  ]);
  const orders = (ordersRes.data ?? []) as unknown as MetricOrder[];
  const subs = (subsRes.data ?? []) as Array<{ status: SubscriptionStatus; order_id: string; updated_at: string }>;
  const payments = (paymentsRes.data ?? null) as Array<{ amount: number; status: string; created_at: string }> | null;

  const now = new Date();
  const monthAgo = now.getTime() - 30 * 86_400_000;
  const byId = new Map(orders.map((o) => [o.id, o]));
  const live = subs.filter((s) => s.status === 'active' || s.status === 'trialing' || s.status === 'past_due');
  const canceled30 = subs.filter((s) => s.status === 'canceled' && new Date(s.updated_at).getTime() >= monthAgo).length;

  const open = orders.filter((o) => o.deadline && !CLOSED.includes(o.status));
  const sla: Record<SlaState, number> = { on_time: 0, near: 0, overdue: 0 };
  const slaOrders = open
    .map((o) => {
      const status = slaStatus(new Date(o.deadline as string), now, holidays);
      sla[status.state] += 1;
      return { id: o.id, code: o.code, product: o.products?.name ?? '', deadline: o.deadline as string, ...status };
    })
    .sort((a, b) => a.deadline.localeCompare(b.deadline));

  const deliveries = orders.filter((o) => o.paid_at && o.delivered_at);
  const avgDeliveryHours = deliveries.length
    ? deliveries.reduce((sum, o) => sum + (new Date(o.delivered_at as string).getTime() - new Date(o.paid_at as string).getTime()), 0) / deliveries.length / 3_600_000
    : null;

  return {
    mrr: live.reduce((sum, s) => sum + (byId.get(s.order_id)?.monthly_price ?? 0), 0),
    revenue: payments ? payments.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0) : null,
    newOrders: orders.filter((o) => o.status === 'received' && !o.accepted_at).length,
    inProduction: orders.filter((o) => o.status === 'in_production' || o.status === 'in_review').length,
    late: sla.overdue,
    delivered: orders.filter((o) => o.status === 'ready').length,
    activeSubscriptions: includeFinance || subs.length ? live.length : null,
    failedPayments: payments ? payments.filter((p) => p.status === 'failed' && new Date(p.created_at).getTime() >= monthAgo).length : null,
    cancellations30d: orders.filter((o) => o.status === 'canceled' && new Date(o.updated_at).getTime() >= monthAgo).length,
    churn30d: live.length + canceled30 > 0 ? canceled30 / (live.length + canceled30) : null,
    avgDeliveryHours,
    sla,
    slaOrders,
  };
}

export async function listOperators(): Promise<Array<{ id: string; name: string | null; email: string; role: string }>> {
  const supabase = await createClient();
  const { data } = await supabase.from('users').select('id, name, email, role').in('role', ['admin', 'production', 'support']).order('name');
  return (data ?? []) as Array<{ id: string; name: string | null; email: string; role: string }>;
}

export interface OpsNotification {
  id: string;
  type: string;
  title: string;
  message: string | null;
  link: string | null;
  read: boolean;
  created_at: string;
}

export async function opsNotifications(limit = 15): Promise<OpsNotification[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('notifications')
    .select('id, type, title, message, link, read, created_at')
    .is('user_id', null)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data ?? []) as OpsNotification[];
}
