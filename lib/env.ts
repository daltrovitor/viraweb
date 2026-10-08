// Hello World
import { z } from 'zod';

/** Pasted dashboard values often carry spaces, newlines or quotes: normalize before validating. */
const clean = (value: string | undefined) => value?.trim().replace(/^["']|["']$/g, '') || undefined;

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const serviceRoleSchema = z.string().min(20);
const stripeSecretSchema = z.string().regex(/^(sk|rk)_(test|live)_[A-Za-z0-9]+$/, 'STRIPE_SECRET_KEY inválida');
const stripeWebhookSchema = z.string().regex(/^whsec_[A-Za-z0-9]+$/, 'STRIPE_WEBHOOK_SECRET inválida');

/** NEXT_PUBLIC_* must be referenced statically to be inlined in client bundles. */
function publicValues() {
  return {
    NEXT_PUBLIC_SUPABASE_URL: clean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  };
}

/** True once the Supabase project keys are present. Pages degrade gracefully otherwise. */
export function isSupabaseConfigured(): boolean {
  return publicSchema.safeParse(publicValues()).success;
}

export function isServiceRoleConfigured(): boolean {
  return serviceRoleSchema.safeParse(clean(process.env.SUPABASE_SERVICE_ROLE_KEY)).success;
}

/** Checkout, billing portal and price sync only need the secret key. */
export function isStripeConfigured(): boolean {
  return stripeSecretSchema.safeParse(clean(process.env.STRIPE_SECRET_KEY)).success;
}

/** The webhook additionally needs its signing secret. */
export function isStripeWebhookConfigured(): boolean {
  return isStripeConfigured() && stripeWebhookSchema.safeParse(clean(process.env.STRIPE_WEBHOOK_SECRET)).success;
}

/** Validated lazily so builds without env still succeed. */
export function publicSupabaseEnv() {
  return publicSchema.parse(publicValues());
}

export function serverEnv() {
  return {
    ...publicSupabaseEnv(),
    SUPABASE_SERVICE_ROLE_KEY: serviceRoleSchema.parse(clean(process.env.SUPABASE_SERVICE_ROLE_KEY)),
  };
}

export function stripeSecretKey(): string {
  return stripeSecretSchema.parse(clean(process.env.STRIPE_SECRET_KEY));
}

export function stripeWebhookSecret(): string {
  return stripeWebhookSchema.parse(clean(process.env.STRIPE_WEBHOOK_SECRET));
}

/** Presence report for Operations → Configurações (never exposes values). */
export function envReport() {
  const key = clean(process.env.STRIPE_SECRET_KEY);
  return {
    supabaseUrl: !!clean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabaseAnon: !!clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    supabaseServiceRole: isServiceRoleConfigured(),
    stripeSecret: isStripeConfigured(),
    stripeSecretPresentButInvalid: !!key && !isStripeConfigured(),
    stripeMode: key?.includes('_live_') ? 'live' : key?.includes('_test_') ? 'test' : null,
    stripeWebhook: isStripeWebhookConfigured(),
  } as const;
}
