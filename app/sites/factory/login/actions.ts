// Hello World
'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { isSupabaseConfigured } from '@/lib/env';
import { createClient } from '@/lib/supabase/server';
import { signInWithPassword, signUpConfirmed } from '@/lib/auth/password';
import { rateLimit } from '@/lib/rate-limit';
import { clientIp } from '@/lib/factory/request';
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

  const result = await signInWithPassword(parsed.data.email, parsed.data.password);
  if (!result.ok) {
    return { error: result.reason === 'error' ? 'Não foi possível entrar agora. Tente novamente.' : 'E-mail ou senha incorretos.' };
  }
  redirect(safeNextPath(form.get('next')));
}

export async function signUp(_prev: AuthState, form: FormData): Promise<AuthState> {
  const blocked = await guard('signup');
  if (blocked) return { error: blocked };
  const parsed = z
    .object({ name: z.string().trim().min(2, 'Informe seu nome.').max(120), email, password })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const result = await signUpConfirmed(parsed.data.name, parsed.data.email, parsed.data.password);
  if (!result.ok) {
    return {
      error:
        result.reason === 'exists'
          ? 'Este e-mail já tem conta. Use a aba Entrar com a sua senha.'
          : 'Não foi possível criar a conta agora. Tente novamente em instantes.',
    };
  }
  redirect(safeNextPath(form.get('next')));
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect('/');
}
