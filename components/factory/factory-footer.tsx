// Hello World
import Link from 'next/link';
import { Wordmark } from '@/components/brand/brand-mark';
import { EXTERNAL_LINK_PROPS, SITE, whatsappLink } from '@/lib/site';
import { FACTORY, FACTORY_NAV } from '@/lib/factory/site';

const linkClass = 'inline-flex min-h-12 items-center text-[0.95rem] text-ink-soft transition-colors hover:text-ink';

export function FactoryFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-10 px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="col-span-12 lg:col-span-5">
          <Wordmark product="Factory" />
          <p className="mt-6 max-w-[32ch] text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
            {FACTORY.slogan}
          </p>
        </div>
        <nav aria-label="Factory" className="col-span-6 md:col-span-4 lg:col-span-2 lg:col-start-7">
          <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">Factory</h2>
          <ul className="mt-3">
            {FACTORY_NAV.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/dashboard" className={linkClass}>Meus produtos</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="ViraWeb" className="col-span-6 md:col-span-4 lg:col-span-2">
          <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">ViraWeb</h2>
          <ul className="mt-3">
            <li><a href={FACTORY.mainUrl} className={linkClass}>viraweb.dev.br</a></li>
            <li><a href={`${FACTORY.mainUrl}/termos`} className={linkClass}>Termos de uso</a></li>
          </ul>
        </nav>
        <div className="col-span-12 md:col-span-4 lg:col-span-2">
          <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">Contato</h2>
          <ul className="mt-3">
            <li>
              <a href={whatsappLink('Olá! Tenho uma dúvida sobre a ViraWeb Factory.')} {...EXTERNAL_LINK_PROPS} className={linkClass}>
                WhatsApp {SITE.whatsappDisplay}
              </a>
            </li>
            <li><a href={`mailto:${SITE.email}`} className={linkClass}>{SITE.email}</a></li>
          </ul>
        </div>
        <p className="col-span-12 border-t border-line pt-6 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">
          © {new Date().getFullYear()} ViraWeb · Prazos de até 2 dias úteis valem para produtos Standard do catálogo.
        </p>
      </div>
    </footer>
  );
}
