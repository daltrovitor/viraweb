// Hello World
import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { publicSupabaseEnv } from '@/lib/env';

/** Cookie-less anon client for public, cacheable reads (catalog). RLS applies as `anon`. */
export function createPublicClient() {
  const env = publicSupabaseEnv();
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
