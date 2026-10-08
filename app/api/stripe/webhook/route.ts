// Hello World
import { NextResponse, type NextRequest } from 'next/server';
import { isStripeConfigured, isSupabaseConfigured, stripeEnv } from '@/lib/env';
import { getStripe } from '@/lib/stripe';
import { handleStripeEvent } from '@/lib/factory/stripe-webhook';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Stripe → ViraWeb Factory. Payments are only ever confirmed here, never by the browser. */
export async function POST(request: NextRequest) {
  if (!isStripeConfigured() || !isSupabaseConfigured()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }
  const signature = request.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'missing_signature' }, { status: 400 });

  const payload = await request.text();
  let event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, stripeEnv().STRIPE_WEBHOOK_SECRET);
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
