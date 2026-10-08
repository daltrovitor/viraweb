// Hello World
import 'server-only';
import { isServiceRoleConfigured } from '@/lib/env';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

type SessionClient = Awaited<ReturnType<typeof createClient>>;

export type PasswordResult =
  | { ok: true; userId: string; client: SessionClient }
  | { ok: false; reason: 'invalid' | 'unconfirmed' | 'error' };

/** Marks an account's e-mail as confirmed (accounts are not gated by e-mail confirmation). */
async function confirmEmail(email: string): Promise<boolean> {
  if (!isServiceRoleConfigured()) return false;
  const admin = createAdminClient();
  const { data } = await admin.from('users').select('id').eq('email', email).maybeSingle();
  if (!data?.id) return false;
  const { error } = await admin.auth.admin.updateUserById(data.id as string, { email_confirm: true });
  return !error;
}

/** Password sign-in that transparently confirms accounts created before confirmation was disabled. */
export async function signInWithPassword(email: string, password: string): Promise<PasswordResult> {
  const supabase = await createClient();
  let { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error?.code === 'email_not_confirmed' && (await confirmEmail(email))) {
    ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
  }
  if (error || !data.user) {
    if (error?.code === 'email_not_confirmed') return { ok: false, reason: 'unconfirmed' };
    if (error?.code === 'invalid_credentials') return { ok: false, reason: 'invalid' };
    if (error) console.error('sign_in_failed', error.code, error.message);
    return { ok: false, reason: error?.status === 400 ? 'invalid' : 'error' };
  }
  return { ok: true, userId: data.user.id, client: supabase };
}

export type SignUpResult = { ok: true } | { ok: false; reason: 'exists' | 'error'; detail?: string };

/**
 * Creates an already-confirmed account (no confirmation e-mail) and opens the session.
 * Falls back to the regular sign-up when the service role key is not configured.
 */
export async function signUpConfirmed(name: string, email: string, password: string): Promise<SignUpResult> {
  if (isServiceRoleConfigured()) {
    const { error } = await createAdminClient().auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });
    if (error) {
      const exists = error.code === 'email_exists' || /already|registered|exists/i.test(error.message);
      if (!exists) {
        console.error('sign_up_failed', error.code, error.message);
        return { ok: false, reason: 'error', detail: error.message };
      }
      // Existing account: entering with the same password is a normal sign-in.
      const login = await signInWithPassword(email, password);
      return login.ok ? { ok: true } : { ok: false, reason: 'exists' };
    }
    const login = await signInWithPassword(email, password);
    return login.ok ? { ok: true } : { ok: false, reason: 'error', detail: 'sign_in_after_create' };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
  if (error) {
    console.error('sign_up_failed', error.code, error.message);
    return { ok: false, reason: /already|registered|exists/i.test(error.message) ? 'exists' : 'error', detail: error.message };
  }
  return data.session ? { ok: true } : { ok: false, reason: 'error', detail: 'confirmation_required' };
}
