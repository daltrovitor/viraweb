// Hello World
import { NextResponse, type NextRequest } from 'next/server';
import { isServiceRoleConfigured, isStripeConfigured, isStripeWebhookConfigured, isSupabaseConfigured, stripeWebhookSecret } from '@/lib/env';
import { getStripe } from '@/lib/stripe';
import { handleStripeEvent } from '@/lib/factory/stripe-webhook';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Stripe → ViraWeb Factory. Signature-verified; the browser never confirms a payment. */
export async function POST(request: NextRequest) {
  const missing = [
    !isStripeConfigured() && 'STRIPE_SECRET_KEY',
    !isStripeWebhookConfigured() && 'STRIPE_WEBHOOK_SECRET',
    !isSupabaseConfigured() && 'NEXT_PUBLIC_SUPABASE_URL/ANON_KEY',
    !isServiceRoleConfigured() && 'SUPABASE_SERVICE_ROLE_KEY',
  ].filter(Boolean);
  if (missing.length) {
    console.error('stripe_webhook_not_configured', missing.join(', '));
    return NextResponse.json({ error: 'not_configured', missing }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'missing_signature' }, { status: 400 });

  const payload = await request.text();
  let event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, stripeWebhookSecret());
  } catch {
    return NextResponse.json({ error: 'invalid_signature' }, { status: 400 });
  }

  try {
    await handleStripeEvent(event);
  } catch (error) {
    console.error('stripe_webhook_failed', event.type, error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'processing_failed' }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
