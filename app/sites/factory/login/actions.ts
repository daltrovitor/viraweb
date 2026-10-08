// Hello World
'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { isSupabaseConfigured } from '@/lib/env';
import { createClient } from '@/lib/supabase/server';
import { rateLimit } from '@/lib/rate-limit';
import { clientIp, requestOrigin } from '@/lib/factory/request';
import { safeNextPath } from '@/lib/factory/site';

export interface AuthState {
  error?: string;
  message?: string;
}

const email = z.string().trim().toLowerCase().email('Informe um e-mail válido.');
const password = z.string().min(8, 'A senha precisa de pelo menos 8 caracteres.').max(72);

async function guard(scope: string): Promise<string | null> {
  if (!isSupabaseConfigured()) return 'O login está em configuração. Fale com a gente pelo WhatsApp.';
  const limit = rateLimit(`${scope}:${await clientIp()}`, 8, 10 * 60_000);
  return limit.ok ? null : 'Muitas tentativas. Aguarde alguns minutos e tente de novo.';
}

export async function signIn(_prev: AuthState, form: FormData): Promise<AuthState> {
  const blocked = await guard('signin');
  if (blocked) return { error: blocked };
  const parsed = z.object({ email, password: z.string().min(1, 'Informe a senha.') }).safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: 'E-mail ou senha incorretos.' };
  redirect(safeNextPath(form.get('next')));
}

export async function signUp(_prev: AuthState, form: FormData): Promise<AuthState> {
  const blocked = await guard('signup');
  if (blocked) return { error: blocked };
  const parsed = z
    .object({ name: z.string().trim().min(2, 'Informe seu nome.').max(120), email, password })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const next = safeNextPath(form.get('next'));
  const origin = await requestOrigin();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { name: parsed.data.name },
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });
  if (error) return { error: 'Não foi possível criar a conta. Verifique os dados ou entre com sua conta existente.' };
  if (data.session) redirect(next);
  return { message: 'Conta criada. Enviamos um link de confirmação para o seu e-mail.' };
}

export async function sendMagicLink(_prev: AuthState, form: FormData): Promise<AuthState> {
  const blocked = await guard('magic');
  if (blocked) return { error: blocked };
  const parsed = email.safeParse(form.get('email'));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const next = safeNextPath(form.get('next'));
  const origin = await requestOrigin();
  const supabase = await createClient();
  await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: { emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`, shouldCreateUser: true },
  });
  // Same answer whether or not the e-mail exists (no account enumeration).
  return { message: 'Se o e-mail estiver correto, você receberá um link de acesso em instantes.' };
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect('/');
}
