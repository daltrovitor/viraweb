// Hello World
import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { publicSupabaseEnv } from '@/lib/env';

/** Session-bound client (anon key + user JWT): RLS applies. */
export async function createClient() {
  // Reading cookies first opts the route into dynamic rendering before any env checks.
  const cookieStore = await cookies();
  const env = publicSupabaseEnv();
  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component: cookies are read-only there.
        }
      },
    },
  });
}
