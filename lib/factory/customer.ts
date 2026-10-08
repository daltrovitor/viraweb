// Hello World
import 'server-only';
import { createClient } from '@/lib/supabase/server';
import { isServiceRoleConfigured, isStripeConfigured } from '@/lib/env';
import { reconcileCheckoutSession } from './stripe-webhook';
import type { OrderStatus, PaymentStatus, PreviewKind, SubscriptionStatus, Tier } from './types';

export interface CustomerOrder {
  id: string;
  code: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  tier: Tier;
  setup_price: number | null;
  monthly_price: number | null;
  delivery_url: string | null;
  deadline: string | null;
  created_at: string;
  stripe_checkout_session_id: string | null;
  products: { name: string; slug: string; preview: PreviewKind } | null;
  subscriptions: Array<{ status: SubscriptionStatus; current_period_end: string | null }>;
}

export interface CustomerOrderDetail extends CustomerOrder {
  briefing_status: 'pending' | 'complete';
  briefings: { data: Record<string, string> } | null;
  deliveries: Array<{ id: string; url: string; version: string | null; notes: string | null; instructions: string | null; delivered_at: string }>;
  revisions: Array<{ id: string; description: string; status: 'open' | 'in_progress' | 'done'; response: string | null; created_at: string }>;
}

export interface CustomerNotification {
  id: string;
  title: string;
  message: string | null;
  link: string | null;
  read: boolean;
  created_at: string;
}

const ORDER_FIELDS =
  'id, code, status, payment_status, tier, setup_price, monthly_price, delivery_url, deadline, created_at, stripe_checkout_session_id, products(name, slug, preview), subscriptions(status, current_period_end)';

/** RLS limits every query here to the signed-in customer's own rows. */
export async function listMyOrders(userId: string): Promise<CustomerOrder[]> {
  const supabase = await createClient();
  const { data } = await supabase.from('orders').select(ORDER_FIELDS).eq('user_id', userId).order('created_at', { ascending: false });
  return (data ?? []) as unknown as CustomerOrder[];
}

export async function getMyOrder(userId: string, orderId: string): Promise<CustomerOrderDetail | null> {
  if (!/^[0-9a-f-]{36}$/i.test(orderId)) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from('orders')
    .select(
      `${ORDER_FIELDS}, briefing_status, briefings(data), deliveries(id, url, version, notes, instructions, delivered_at), revisions(id, description, status, response, created_at)`,
    )
    .eq('id', orderId)
    .eq('user_id', userId)
    .maybeSingle();
  if (!data) return null;
  const order = data as unknown as CustomerOrderDetail;
  order.deliveries = [...(order.deliveries ?? [])].sort((a, b) => b.delivered_at.localeCompare(a.delivered_at));
  order.revisions = [...(order.revisions ?? [])].sort((a, b) => b.created_at.localeCompare(a.created_at));
  return order;
}

export async function myNotifications(userId: string, limit = 6): Promise<CustomerNotification[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('notifications')
    .select('id, title, message, link, read, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data ?? []) as CustomerNotification[];
}

/** Next charge date: the soonest period end among live subscriptions. */
export function nextCharge(order: CustomerOrder): string | null {
  const live = order.subscriptions.filter((s) => s.status === 'active' || s.status === 'trialing' || s.status === 'past_due');
  const dates = live.map((s) => s.current_period_end).filter((d): d is string => !!d).sort();
  return dates[0] ?? null;
}

/**
 * Orders still marked "awaiting payment" whose Checkout already completed (webhook
 * late or not configured) are confirmed against Stripe's API. Returns true if any changed.
 */
export async function reconcilePendingPayments(userId: string, orders: Array<Pick<CustomerOrder, 'status' | 'payment_status' | 'stripe_checkout_session_id'>>): Promise<boolean> {
  if (!isStripeConfigured() || !isServiceRoleConfigured()) return false;
  const pending = orders
    .filter((o) => o.status === 'awaiting_payment' && o.payment_status !== 'paid' && o.stripe_checkout_session_id)
    .slice(0, 3);
  let changed = false;
  for (const order of pending) {
    try {
      const result = await reconcileCheckoutSession(order.stripe_checkout_session_id as string, userId);
      changed ||= result.paid;
    } catch (error) {
      console.error('reconcile_pending_failed', error instanceof Error ? error.message : error);
    }
  }
  return changed;
}
