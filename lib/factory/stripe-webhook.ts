// Hello World
import 'server-only';
import type Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { getStripe, idOf, invoiceSubscriptionId, subscriptionPeriodEnd } from '@/lib/stripe';
import { logAudit } from '@/lib/audit';
import { calcDeadline } from '@/lib/sla';
import { loadHolidays } from './repo';
import { SUBSCRIPTION_STATUSES, type SubscriptionStatus } from './types';

type Admin = ReturnType<typeof createAdminClient>;

interface OrderRow {
  id: string;
  code: string;
  user_id: string;
  status: string;
  tier: string;
  briefing_status: string;
  payment_status: string;
  delivery_days: number | null;
  delivery_url: string | null;
  deadline: string | null;
  products: { name: string } | null;
}

const ORDER_SELECT = 'id, code, user_id, status, tier, briefing_status, payment_status, delivery_days, delivery_url, deadline, products(name)';
const LIVE = new Set(['received', 'in_production', 'in_review', 'ready', 'briefing_pending']);

async function loadOrder(admin: Admin, orderId: string | null | undefined): Promise<OrderRow | null> {
  if (!orderId) return null;
  const { data } = await admin.from('orders').select(ORDER_SELECT).eq('id', orderId).maybeSingle();
  return (data as unknown as OrderRow | null) ?? null;
}

async function orderIdForSubscription(admin: Admin, subscription: Stripe.Subscription | null, subscriptionId: string | null) {
  const fromMetadata = subscription?.metadata?.order_id;
  if (fromMetadata) return fromMetadata;
  if (!subscriptionId) return null;
  const { data } = await admin.from('subscriptions').select('order_id').eq('stripe_subscription_id', subscriptionId).maybeSingle();
  return (data?.order_id as string | undefined) ?? null;
}

function toStatus(status: string): SubscriptionStatus {
  if (status === 'incomplete_expired') return 'canceled';
  return (SUBSCRIPTION_STATUSES as readonly string[]).includes(status) ? (status as SubscriptionStatus) : 'incomplete';
}

async function syncSubscription(admin: Admin, subscription: Stripe.Subscription, order: OrderRow) {
  const recurring = subscription.items.data.find((item) => item.price.recurring) ?? subscription.items.data[0];
  await admin.from('subscriptions').upsert(
    {
      user_id: order.user_id,
      order_id: order.id,
      stripe_customer_id: idOf(subscription.customer) ?? '',
      stripe_subscription_id: subscription.id,
      stripe_price_id: recurring?.price.id ?? null,
      status: toStatus(subscription.status),
      current_period_end: subscriptionPeriodEnd(subscription),
    },
    { onConflict: 'stripe_subscription_id' },
  );
}

async function notify(admin: Admin, rows: Array<{ user_id: string | null; type: string; title: string; message?: string; link?: string }>) {
  if (rows.length) await admin.from('notifications').insert(rows);
}

/** Payment confirmed: the order enters production and the SLA clock starts (if the briefing is complete). */
async function confirmPayment(admin: Admin, order: OrderRow, session: Stripe.Checkout.Session) {
  if (order.payment_status === 'paid') return;
  const now = new Date();
  const briefingDone = order.briefing_status === 'complete';
  const days = order.delivery_days ?? (order.tier === 'standard' ? 2 : null);
  const deadline = briefingDone && days ? calcDeadline(now, days, await loadHolidays()).toISOString() : null;

  // Conditional update = lock: when the webhook and the return page race, only one wins.
  const { data: claimed } = await admin
    .from('orders')
    .update({
      payment_status: 'paid',
      paid_at: now.toISOString(),
      status: briefingDone ? 'received' : 'briefing_pending',
      deadline,
    })
    .eq('id', order.id)
    .neq('payment_status', 'paid')
    .select('id');
  if (!claimed?.length) return;

  const customerId = idOf(session.customer);
  if (customerId) {
    await admin.from('users').update({ stripe_customer_id: customerId }).eq('id', order.user_id).is('stripe_customer_id', null);
  }

  if (session.mode === 'payment') {
    await admin.from('payments').insert({
      order_id: order.id,
      stripe_payment_intent_id: idOf(session.payment_intent),
      stripe_invoice_id: idOf(session.invoice),
      amount: session.amount_total ?? 0,
      currency: session.currency ?? 'brl',
      status: 'paid',
    });
  }

  const subscriptionId = idOf(session.subscription);
  if (subscriptionId) await syncSubscription(admin, await getStripe().subscriptions.retrieve(subscriptionId), order);

  // First invoice (setup + first month) — also recorded by invoice.paid; upsert keeps one row.
  const invoiceId = session.mode === 'subscription' ? idOf(session.invoice) : null;
  if (invoiceId) {
    const invoice = await getStripe().invoices.retrieve(invoiceId);
    if (invoice.status === 'paid') {
      await admin.from('payments').upsert(
        { order_id: order.id, stripe_invoice_id: invoice.id, amount: invoice.amount_paid, currency: invoice.currency, status: 'paid' },
        { onConflict: 'stripe_invoice_id' },
      );
    }
  }

  const product = order.products?.name ?? 'Produto';
  await notify(admin, [
    { user_id: null, type: 'order.new', title: 'Novo pedido recebido', message: `${order.code} · ${product}`, link: `/orders/${order.id}` },
    { user_id: order.user_id, type: 'order.paid', title: 'Pagamento confirmado', message: `${order.code} · ${product} entrou na fila de produção.`, link: `/dashboard/orders/${order.id}` },
  ]);
  await logAudit({ userId: null, action: 'order.status', entity: 'order', entityId: order.code, metadata: { from: order.status, to: briefingDone ? 'received' : 'briefing_pending', via: 'stripe' } });
}

async function recordInvoice(admin: Admin, invoice: Stripe.Invoice, status: 'paid' | 'failed') {
  const subscriptionId = invoiceSubscriptionId(invoice);
  const snapshot = invoice.parent?.subscription_details?.metadata?.order_id ?? null;
  const subscription = subscriptionId ? await getStripe().subscriptions.retrieve(subscriptionId) : null;
  const order = await loadOrder(admin, snapshot ?? (await orderIdForSubscription(admin, subscription, subscriptionId)));
  if (!order) return;

  const paymentIntent = invoice.payments?.data.find((p) => p.payment.payment_intent)?.payment.payment_intent;
  await admin.from('payments').upsert(
    {
      order_id: order.id,
      stripe_invoice_id: invoice.id,
      stripe_payment_intent_id: idOf(paymentIntent ?? null),
      amount: status === 'paid' ? invoice.amount_paid : invoice.amount_due,
      currency: invoice.currency,
      status,
    },
    { onConflict: 'stripe_invoice_id' },
  );
  if (subscription) await syncSubscription(admin, subscription, order);

  if (status === 'paid' && order.status === 'suspended') {
    await admin.from('orders').update({ status: order.delivery_url ? 'ready' : 'received' }).eq('id', order.id);
    await logAudit({ userId: null, action: 'order.status', entity: 'order', entityId: order.code, metadata: { from: 'suspended', via: 'invoice.paid' } });
  }
  if (status === 'failed') {
    await notify(admin, [
      { user_id: null, type: 'payment.failed', title: 'Pagamento falhou', message: `${order.code} · ${order.products?.name ?? ''}`, link: `/orders/${order.id}` },
      { user_id: order.user_id, type: 'payment.failed', title: 'Não conseguimos cobrar sua mensalidade', message: 'Atualize a forma de pagamento para manter o produto no ar.', link: `/dashboard/orders/${order.id}` },
    ]);
  }
}

async function subscriptionChanged(admin: Admin, subscription: Stripe.Subscription, deleted: boolean) {
  const order = await loadOrder(admin, await orderIdForSubscription(admin, subscription, subscription.id));
  if (!order) return;
  await syncSubscription(admin, subscription, order);
  const status = toStatus(subscription.status);

  let next: string | null = null;
  if (deleted || status === 'canceled') next = order.status === 'canceled' ? null : 'canceled';
  else if ((status === 'unpaid' || status === 'paused') && LIVE.has(order.status)) next = 'suspended';
  else if (status === 'active' && order.status === 'suspended') next = order.delivery_url ? 'ready' : 'received';

  if (next) await admin.from('orders').update({ status: next }).eq('id', order.id);
  await logAudit({
    userId: null,
    action: next === 'canceled' ? 'order.cancel' : 'subscription.update',
    entity: 'subscription',
    entityId: subscription.id,
    metadata: { order: order.code, status, orderStatus: next ?? order.status },
  });
}

/**
 * Server-side reconciliation used by the return page and the customer area:
 * the session is fetched from Stripe's API (never trusted from the browser),
 * must belong to the signed-in user and be paid. Idempotent with the webhook.
 */
export async function reconcileCheckoutSession(sessionId: string, userId: string): Promise<{ orderId: string | null; code: string | null; paid: boolean }> {
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  const orderId = session.metadata?.order_id ?? session.client_reference_id ?? null;
  if (session.metadata?.user_id !== userId || !orderId) return { orderId: null, code: null, paid: false };
  const paid = session.status === 'complete' && (session.payment_status === 'paid' || session.payment_status === 'no_payment_required');
  if (paid) {
    const admin = createAdminClient();
    const order = await loadOrder(admin, orderId);
    if (order && order.user_id === userId) await confirmPayment(admin, order, session);
  }
  return { orderId, code: session.metadata?.order_code ?? null, paid };
}

/**
 * Applies one verified Stripe event. Idempotent: each event id is recorded once;
 * on failure the record is removed so Stripe's retry reprocesses it.
 */
export async function handleStripeEvent(event: Stripe.Event): Promise<void> {
  const admin = createAdminClient();
  const { error: seen } = await admin.from('stripe_events').insert({ id: event.id, type: event.type });
  if (seen) {
    if (seen.code === '23505') return; // duplicate delivery
    throw new Error(`stripe_event_log_failed: ${seen.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object;
        if (session.payment_status === 'unpaid') break; // async method still pending
        const order = await loadOrder(admin, session.metadata?.order_id ?? session.client_reference_id);
        if (order) await confirmPayment(admin, order, session);
        break;
      }
      case 'invoice.paid':
        await recordInvoice(admin, event.data.object, 'paid');
        break;
      case 'invoice.payment_failed':
        await recordInvoice(admin, event.data.object, 'failed');
        break;
      case 'customer.subscription.updated':
        await subscriptionChanged(admin, event.data.object, false);
        break;
      case 'customer.subscription.deleted':
        await subscriptionChanged(admin, event.data.object, true);
        break;
      default:
        break;
    }
  } catch (error) {
    await admin.from('stripe_events').delete().eq('id', event.id);
    throw error;
  }
}
