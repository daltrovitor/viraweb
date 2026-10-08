// Hello World
import { NextResponse, type NextRequest } from 'next/server';
import { isSupabaseConfigured } from '@/lib/env';
import { createClient } from '@/lib/supabase/server';
import { requestOrigin } from '@/lib/factory/request';
import { safeNextPath } from '@/lib/factory/site';

/** Email confirmation / magic-link landing: exchanges the one-time code for a session. */
export async function GET(request: NextRequest) {
  const origin = await requestOrigin();
  const code = request.nextUrl.searchParams.get('code');
  const next = safeNextPath(request.nextUrl.searchParams.get('next'));

  if (code && isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, origin));
  }
  return NextResponse.redirect(new URL('/login?erro=link', origin));
}
