// Hello World
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { ArrowUp } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { EXTERNAL_LINK_PROPS, SITE, whatsappLink, type Copy } from '@/lib/site';
import { Wordmark } from '@/components/brand/brand-mark';
import { ActionLink } from '@/components/ui/action-link';
import { RollText } from '@/components/motion/roll-text';

interface FooterCopy {
  navigation: string;
  products: string;
  contact: string;
  links: Array<{ label: string; href: string }>;
  localTime: string;
  rights: string;
  top: string;
  whatsapp: string;
  terms: string;
}

const COPY: Copy<FooterCopy> = {
  pt: {
    navigation: 'Navegação',
    products: 'Produtos',
    contact: 'Contato',
    links: [
      { label: 'Soluções', href: '/#services' },
      { label: 'Pacote ViraWeb', href: '/propostas' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Contato', href: '/#contato' },
    ],
    localTime: 'Goiânia, BR',
    rights: 'Todos os direitos reservados.',
    top: 'Voltar ao topo',
    whatsapp: 'Olá ViraWeb! Gostaria de falar sobre escala digital.',
    terms: 'Termos de uso',
  },
  en: {
    navigation: 'Navigation',
    products: 'Products',
    contact: 'Contact',
    links: [
      { label: 'Solutions', href: '/#services' },
      { label: 'ViraWeb Package', href: '/propostas' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Contact', href: '/#contato' },
    ],
    localTime: 'Goiânia, BR',
    rights: 'All rights reserved.',
    top: 'Back to top',
    whatsapp: 'Hello ViraWeb! I would like to talk about digital scaling.',
    terms: 'Terms of use',
  },
  es: {
    navigation: 'Navegación',
    products: 'Productos',
    contact: 'Contacto',
    links: [
      { label: 'Soluciones', href: '/#services' },
      { label: 'Paquete ViraWeb', href: '/propostas' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Contacto', href: '/#contato' },
    ],
    localTime: 'Goiânia, BR',
    rights: 'Todos los derechos reservados.',
    top: 'Volver arriba',
    whatsapp: '¡Hola ViraWeb! Me gustaría hablar sobre escala digital.',
    terms: 'Términos de uso',
  },
};

const PRODUCTS = [
  { label: 'Vira Web Odonto', href: SITE.odontoUrl },
  { label: 'PontoControle', href: SITE.pontoControleUrl },
  { label: 'LeadScrap', href: SITE.leadScrapUrl },
];

const TIME_FORMAT = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  hour: '2-digit',
  minute: '2-digit',
});

/** Goiânia wall clock — rendered client-side only to keep SSR deterministic. */
function useLocalTime() {
  const [time, setTime] = useState('--:--');
  useEffect(() => {
    const tick = () => setTime(TIME_FORMAT.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

const linkClass = 'roll-trigger inline-flex min-h-10 items-center text-[0.95rem] text-white/85 transition-colors hover:text-white';
const headingClass = 'font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/60';

export function Footer() {
  const { t, language } = useTranslation();
  const copy = COPY[language];
  const lenis = useLenis();
  const time = useLocalTime();
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const scrollTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const giant = Array.from('ViraWeb');

  return (
    // Large, tall viewports: the footer sits fixed underneath and is uncovered as the page ends.
    <div className="relative reveal:h-[720px]" style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}>
      <footer className="w-full overflow-hidden bg-ink text-white reveal:fixed reveal:bottom-0 reveal:h-[720px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-12 px-4 pt-20 sm:px-8 lg:px-12">
          <div className="col-span-12 lg:col-span-5">
            <Wordmark tone="light" />
            <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-white/75">{t('footer.description')}</p>
            <ActionLink
              href={whatsappLink(copy.whatsapp)}
              {...EXTERNAL_LINK_PROPS}
              label={t('footer.cta')}
              variant="light"
              size="md"
              className="mt-8"
            />
          </div>

          <nav aria-label={copy.navigation} className="col-span-6 sm:col-span-4 lg:col-span-2 lg:col-start-7">
            <p className={headingClass}>{copy.navigation}</p>
            <ul className="mt-4 space-y-1">
              {copy.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    <RollText text={link.label} />
                  </a>
                </li>
              ))}
              <li>
                <a href="/termos" className={linkClass}>
                  <RollText text={copy.terms} />
                </a>
              </li>
            </ul>
          </nav>

          <div className="col-span-6 sm:col-span-4 lg:col-span-2">
            <p className={headingClass}>{copy.products}</p>
            <ul className="mt-4 space-y-1">
              {PRODUCTS.map((product) => (
                <li key={product.href}>
                  <a href={product.href} {...EXTERNAL_LINK_PROPS} className={linkClass}>
                    <RollText text={product.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-4 lg:col-span-2">
            <p className={headingClass}>{copy.contact}</p>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={whatsappLink()} {...EXTERNAL_LINK_PROPS} className={linkClass}>
                  <RollText text={SITE.whatsappDisplay} />
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={linkClass}>
                  <RollText text={SITE.email} />
                </a>
              </li>
              <li>
                <a href={SITE.instagramUrl} {...EXTERNAL_LINK_PROPS} className={linkClass}>
                  <RollText text={SITE.instagramHandle} />
                </a>
              </li>
            </ul>
            <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-white/60">
              {copy.localTime} — <span className="tabular-nums text-white/85">{time}</span>
            </p>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-[1440px] overflow-hidden px-4 sm:px-8 lg:mt-10 lg:px-12" aria-hidden="true">
          <motion.p
            className="flex font-brand text-[clamp(5rem,21vw,20rem)] leading-[0.8] tracking-[-0.05em] text-white"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.05 }}
          >
            {giant.map((char, i) => (
              <motion.span
                key={i}
                className={i < 4 ? 'font-bold' : 'font-light'}
                variants={{ hidden: { y: '100%' }, show: { y: '0%', transition: { type: 'spring', stiffness: 160, damping: 22 } } }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </div>

        <div className="mx-auto flex max-w-[1440px] flex-col-reverse gap-4 border-t border-white/15 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p className="text-[0.8rem] text-white/60">
            © {year} ViraWeb. {copy.rights}
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="roll-trigger group inline-flex min-h-12 cursor-pointer items-center gap-3 self-start text-[0.9rem] text-white/85 transition-colors hover:text-white sm:self-auto"
          >
            <RollText text={copy.top} />
            <span className="grid size-9 place-items-center rounded-sm border border-white/30 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-ink">
              <ArrowUp aria-hidden="true" className="size-4" />
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
