// Hello World
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/env';
import { getSessionUser } from '@/lib/auth/guards';
import { isOpsRole } from '@/lib/auth/roles';
import { safeNextPath } from '@/lib/factory/site';
import { BrandMark } from '@/components/brand/brand-mark';
import { OpsLoginForm } from '@/components/ops/login-form';
import { FormMessage } from '@/components/factory/ui/form';

export const metadata: Metadata = { title: 'Acesso' };

interface Props {
  searchParams: Promise<{ next?: string }>;
}

export default async function OpsLogin({ searchParams }: Props) {
  const { next: rawNext } = await searchParams;
  const next = safeNextPath(rawNext, '/');
  const configured = isSupabaseConfigured();
  if (configured) {
    const user = await getSessionUser();
    if (user && isOpsRole(user.role)) redirect(next);
  }

  return (
    <main id="conteudo" className="grid min-h-svh place-items-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3">
          <BrandMark className="w-9" />
          <div>
            <p className="text-sm font-semibold text-ink">ViraWeb Factory</p>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mute">Operations</p>
          </div>
        </div>
        <h1 className="mt-10 text-[2rem] font-semibold tracking-[-0.04em] text-ink">Acesso restrito</h1>
        <p className="mt-2 text-sm text-ink-soft">Somente a equipe da ViraWeb. Todo acesso é registrado.</p>
        <div className="mt-8">
          {configured ? <OpsLoginForm next={next} /> : <FormMessage tone="info">Configure o Supabase (variáveis de ambiente) para habilitar o acesso.</FormMessage>}
        </div>
      </div>
    </main>
  );
}
