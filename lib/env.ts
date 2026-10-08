// Hello World
import { z } from 'zod';

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const serverSchema = publicSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
});

const stripeSchema = z.object({
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
});

/** NEXT_PUBLIC_* must be referenced statically to be inlined in client bundles. */
function publicValues() {
  return {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

/** True once the Supabase project keys are present. Pages degrade gracefully otherwise. */
export function isSupabaseConfigured(): boolean {
  return publicSchema.safeParse(publicValues()).success;
}

export function isStripeConfigured(): boolean {
  return stripeSchema.safeParse(process.env).success;
}

/** Validated lazily so builds without env still succeed. */
export function publicSupabaseEnv() {
  return publicSchema.parse(publicValues());
}

export function serverEnv() {
  return serverSchema.parse(process.env);
}

export function stripeEnv() {
  return stripeSchema.parse(process.env);
}
