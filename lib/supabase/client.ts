// Hello World
'use client';
import { createBrowserClient } from '@supabase/ssr';
import { publicSupabaseEnv } from '@/lib/env';

export function createClient() {
  const env = publicSupabaseEnv();
  return createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
