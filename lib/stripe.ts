// Hello World
import 'server-only';
import Stripe from 'stripe';
import { stripeEnv } from '@/lib/env';

let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) client = new Stripe(stripeEnv().STRIPE_SECRET_KEY, { typescript: true });
  return client;
}

/** Dashboard deep links; IDs are opaque Stripe identifiers, never card data. */
export function stripeDashboardUrl(kind: 'customers' | 'subscriptions' | 'invoices' | 'payments' | 'products', id: string): string {
  const live = process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ?? false;
  return `https://dashboard.stripe.com${live ? '' : '/test'}/${kind}/${encodeURIComponent(id)}`;
}

/** API 2025+: the billing period lives on subscription items. */
export function subscriptionPeriodEnd(subscription: Stripe.Subscription): string | null {
  const ends = subscription.items.data.map((item) => item.current_period_end).filter((n): n is number => typeof n === 'number');
  return ends.length ? new Date(Math.min(...ends) * 1000).toISOString() : null;
}

/** API 2025+: an invoice points at its subscription through `parent.subscription_details`. */
export function invoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  const sub = invoice.parent?.subscription_details?.subscription;
  if (!sub) return null;
  return typeof sub === 'string' ? sub : sub.id;
}

export function idOf(value: string | { id: string } | null | undefined): string | null {
  if (!value) return null;
  return typeof value === 'string' ? value : value.id;
}
