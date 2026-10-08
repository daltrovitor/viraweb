// Hello World
import { afterEach, describe, expect, it } from 'vitest';
import { envReport, isStripeConfigured, isStripeWebhookConfigured, stripeSecretKey } from '@/lib/env';

const ORIGINAL = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL };
});

describe('stripe env', () => {
  it('enables checkout with only the secret key (webhook secret optional)', () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_51AbcDEF123';
    delete process.env.STRIPE_WEBHOOK_SECRET;
    expect(isStripeConfigured()).toBe(true);
    expect(isStripeWebhookConfigured()).toBe(false);
  });

  it('tolerates whitespace and quotes pasted into the dashboard', () => {
    process.env.STRIPE_SECRET_KEY = '  "sk_live_51AbcDEF123"\n';
    expect(isStripeConfigured()).toBe(true);
    expect(stripeSecretKey()).toBe('sk_live_51AbcDEF123');
    expect(envReport().stripeMode).toBe('live');
  });

  it('accepts restricted keys and rejects publishable keys', () => {
    process.env.STRIPE_SECRET_KEY = 'rk_test_51AbcDEF123';
    expect(isStripeConfigured()).toBe(true);
    process.env.STRIPE_SECRET_KEY = 'pk_test_51AbcDEF123';
    expect(isStripeConfigured()).toBe(false);
    expect(envReport().stripeSecretPresentButInvalid).toBe(true);
  });

  it('requires both secrets for the webhook', () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_51AbcDEF123';
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_abc123';
    expect(isStripeWebhookConfigured()).toBe(true);
  });
});
