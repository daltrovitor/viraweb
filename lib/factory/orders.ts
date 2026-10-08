// Hello World
import 'server-only';
import type Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { getStripe } from '@/lib/stripe';
import { logAudit } from '@/lib/audit';
import type { SessionUser } from '@/lib/auth/guards';
import type { Product, Tier } from './types';

export interface NewOrderInput {
  user: SessionUser;
  product: Product;
  tier: Tier;
  briefing: Record<string, string>;
}

export interface CreatedOrder {
  id: string;
  code: string;
}

/** Inserts order + briefing with server-computed prices. Never trusts client amounts. */
export async function createOrderWithBriefing({ user, product, tier, briefing }: NewOrderInput): Promise<CreatedOrder> {
  if (!product.id) throw new Error('product_without_id');
  const admin = createAdminClient();
  const standard = tier === 'standard';
  const now = new Date().toISOString();

  const { data: order, error } = await admin
    .from('orders')
    .insert({
      user_id: user.id,
      product_id: product.id,
      tier,
      status: standard ? 'awaiting_payment' : 'received',
      payment_status: 'unpaid',
      briefing_status: 'complete',
      briefing_completed_at: now,
      setup_price: standard ? product.setupPrice : null,
      monthly_price: standard ? product.monthlyPrice : null,
      delivery_days: standard ? (product.deliveryDays ?? 2) : null,
    })
    .select('id, code')
    .single();
  if (error || !order) throw new Error(`order_insert_failed: ${error?.message}`);

  const { error: briefingError } = await admin.from('briefings').insert({ order_id: order.id, data: briefing });
  if (briefingError) {
    await admin.from('orders').delete().eq('id', order.id);
    throw new Error(`briefing_insert_failed: ${briefingError.message}`);
  }

  await logAudit({
    userId: user.id,
    action: 'order.create',
    entity: 'order',
    entityId: order.code,
    metadata: { product: product.slug, tier },
  });

  if (!standard) {
    await admin.from('notifications').insert({
      user_id: null,
      type: 'order.analysis',
      title: 'Nova solicitação de análise',
      message: `${user.name ?? user.email} · ${product.name} (${tier})`,
      link: `/orders/${order.id}`,
    });
  }
  return order as CreatedOrder;
}

/** Reuses the user's Stripe customer or creates one and remembers it. */
export async function ensureStripeCustomer(userId: string): Promise<string> {
  const admin = createAdminClient();
  const { data: profile } = await admin.from('users').select('email, name, stripe_customer_id').eq('id', userId).single();
  if (!profile) throw new Error('profile_not_found');
  if (profile.stripe_customer_id) return profile.stripe_customer_id as string;

  const customer = await getStripe().customers.create(
    { email: profile.email as string, name: (profile.name as string | null) ?? undefined, metadata: { user_id: userId } },
    { idempotencyKey: `customer-${userId}` },
  );
  await admin.from('users').update({ stripe_customer_id: customer.id }).eq('id', userId);
  return customer.id;
}

interface CheckoutOrderRow {
  id: string;
  code: string;
  user_id: string;
  status: string;
  payment_status: string;
  setup_price: number | null;
  monthly_price: number | null;
  products: { name: string; setup_price: number | null; monthly_price: number | null; stripe_setup_price_id: string | null; stripe_monthly_price_id: string | null } | null;
}

/**
 * Stripe Checkout for an order awaiting payment: setup as a one-time line,
 * maintenance as a monthly subscription. Returns the hosted checkout URL.
 */
export async function createCheckoutForOrder(orderId: string, userId: string, origin: string): Promise<string> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('orders')
    .select('id, code, user_id, status, payment_status, setup_price, monthly_price, products(name, setup_price, monthly_price, stripe_setup_price_id, stripe_monthly_price_id)')
    .eq('id', orderId)
    .single();
  const order = data as unknown as CheckoutOrderRow | null;
  if (!order || order.user_id !== userId) throw new Error('order_not_found');
  if (order.status !== 'awaiting_payment' || order.payment_status === 'paid') throw new Error('order_not_payable');
  if (order.setup_price === null || order.monthly_price === null || !order.products) throw new Error('order_not_priced');

  const product = order.products;
  const samePrices = product.setup_price === order.setup_price && product.monthly_price === order.monthly_price;
  const lines: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  if (order.monthly_price > 0) {
    lines.push(
      samePrices && product.stripe_monthly_price_id
        ? { price: product.stripe_monthly_price_id, quantity: 1 }
        : {
            price_data: {
              currency: 'brl',
              unit_amount: order.monthly_price,
              recurring: { interval: 'month' },
              product_data: { name: `${product.name} — manutenção mensal` },
            },
            quantity: 1,
          },
    );
  }
  if (order.setup_price > 0) {
    lines.push(
      samePrices && product.stripe_setup_price_id
        ? { price: product.stripe_setup_price_id, quantity: 1 }
        : {
            price_data: { currency: 'brl', unit_amount: order.setup_price, product_data: { name: `${product.name} — construção (setup)` } },
            quantity: 1,
          },
    );
  }
  if (lines.length === 0) throw new Error('order_zero_amount');

  const customer = await ensureStripeCustomer(userId);
  const metadata = { order_id: order.id, order_code: order.code, user_id: userId };
  const subscription = order.monthly_price > 0;

  const session = await getStripe().checkout.sessions.create(
    {
      mode: subscription ? 'subscription' : 'payment',
      customer,
      client_reference_id: order.id,
      metadata,
      ...(subscription ? { subscription_data: { metadata } } : { payment_intent_data: { metadata } }),
      line_items: lines,
      locale: 'pt-BR',
      billing_address_collection: 'auto',
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/orders/${order.id}?checkout=cancelado`,
    },
    { idempotencyKey: `checkout-${order.id}-${order.setup_price}-${order.monthly_price}-${new Date().toISOString().slice(0, 10)}` },
  );

  await admin.from('orders').update({ stripe_checkout_session_id: session.id }).eq('id', order.id);
  if (!session.url) throw new Error('checkout_without_url');
  return session.url;
}
