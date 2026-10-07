// Hello World
import 'server-only';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { can, isOpsRole, type Permission, type Role } from '@/lib/auth/roles';

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: Role;
}

/** Resolves the verified user (getUser hits Supabase Auth, never trusts the cookie alone). */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;
  const { data: profile } = await supabase
    .from('users')
    .select('id,email,name,role')
    .eq('id', auth.user.id)
    .single();
  return (profile as SessionUser | null) ?? null;
}

export async function requireUser(loginPath = '/login'): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect(loginPath);
  return user;
}

/** Operations access: authenticated AND holding one of the allowed roles (none given = any ops role). */
export async function requireRole(...roles: Role[]): Promise<SessionUser> {
  const user = await requireUser();
  if (!isOpsRole(user.role) || (roles.length > 0 && !roles.includes(user.role))) notFound();
  return user;
}

export async function requirePermission(permission: Permission): Promise<SessionUser> {
  const user = await requireUser();
  if (!can(user.role, permission)) notFound();
  return user;
}
