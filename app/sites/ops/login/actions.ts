// Hello World
'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { isSupabaseConfigured } from '@/lib/env';
import { createClient } from '@/lib/supabase/server';
import { isOpsRole, type Role } from '@/lib/auth/roles';
import { getSessionUser } from '@/lib/auth/guards';
import { rateLimit } from '@/lib/rate-limit';
import { logAudit } from '@/lib/audit';
import { clientIp } from '@/lib/factory/request';
import { safeNextPath } from '@/lib/factory/site';

export interface OpsLoginState {
  error?: string;
}

export async function signInOps(_prev: OpsLoginState, form: FormData): Promise<OpsLoginState> {
  if (!isSupabaseConfigured()) return { error: 'Supabase não configurado.' };
  const ip = await clientIp();
  if (!rateLimit(`ops-login:${ip}`, 5, 15 * 60_000).ok) return { error: 'Muitas tentativas. Aguarde 15 minutos.' };

  const parsed = z
    .object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1).max(200) })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: 'Informe e-mail e senha.' };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { error: 'Credenciais inválidas.' };

  const { data: profile } = await supabase.from('users').select('role').eq('id', data.user.id).single();
  if (!isOpsRole((profile?.role as Role | undefined) ?? null)) {
    await supabase.auth.signOut();
    await logAudit({ userId: data.user.id, action: 'login', entity: 'ops', metadata: { denied: true, ip } });
    return { error: 'Esta conta não tem acesso ao Operations.' };
  }

  await logAudit({ userId: data.user.id, action: 'login', entity: 'ops', metadata: { ip } });
  redirect(safeNextPath(form.get('next'), '/'));
}

export async function signOutOps(): Promise<void> {
  if (isSupabaseConfigured()) {
    const user = await getSessionUser();
    const supabase = await createClient();
    await supabase.auth.signOut();
    if (user) await logAudit({ userId: user.id, action: 'logout', entity: 'ops' });
  }
  redirect('/login');
}
