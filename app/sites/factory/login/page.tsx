// Hello World
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/env';
import { getSessionUser } from '@/lib/auth/guards';
import { safeNextPath } from '@/lib/factory/site';
import { whatsappLink, EXTERNAL_LINK_PROPS } from '@/lib/site';
import { AuthForm } from '@/components/factory/auth-form';
import { FormMessage } from '@/components/factory/ui/form';

export const metadata: Metadata = {
  title: 'Entrar',
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ next?: string; mode?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { next: rawNext, mode } = await searchParams;
  const next = safeNextPath(rawNext);
  const configured = isSupabaseConfigured();
  if (configured && (await getSessionUser())) redirect(next);

  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-12 px-4 pb-24 pt-[calc(var(--nav-h)+4rem)] sm:px-8 lg:px-12">
      <div className="col-span-12 lg:col-span-6">
        <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-ink">
          Sua conta
          <br />
          <span className="font-serif font-normal italic tracking-[-0.02em] text-brand">na fábrica.</span>
        </h1>
        <p className="mt-6 max-w-[40ch] text-ink-soft">
          Acompanhe pedidos, acesse seus produtos e gerencie assinaturas em um só lugar.
        </p>
      </div>
      <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-8">
        {configured ? (
          <AuthForm next={next} initialMode={mode === 'signup' ? 'signup' : 'signin'} />
        ) : (
          <FormMessage tone="info">
            O acesso online está sendo configurado.{' '}
            <a href={whatsappLink('Olá! Quero criar um produto na ViraWeb Factory.')} {...EXTERNAL_LINK_PROPS} className="font-medium text-ink underline underline-offset-4">
              Fale com a gente pelo WhatsApp
            </a>
            .
          </FormMessage>
        )}
      </div>
    </div>
  );
}
