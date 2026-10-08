// Hello World
import { createServerClient } from '@supabase/ssr';
import type { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, publicSupabaseEnv } from '@/lib/env';

/**
 * Refreshes the Supabase session inside the proxy and forwards rotated cookies to
 * both the browser and the server components rendering this request.
 * `build` must return a fresh response (rewrite/next) each time it is called.
 */
export async function refreshSession(
  request: NextRequest,
  build: () => NextResponse,
): Promise<{ response: NextResponse; userId: string | null }> {
  let response = build();
  if (!isSupabaseConfigured()) return { response, userId: null };

  const env = publicSupabaseEnv();
  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = build();
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  return { response, userId: data.user?.id ?? null };
}
