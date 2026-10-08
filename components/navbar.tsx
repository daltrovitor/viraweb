// Hello World
'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useLenis } from 'lenis/react';
import { useTranslation, type Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { EXTERNAL_LINK_PROPS, SITE, whatsappLink, type Copy } from '@/lib/site';
import { Wordmark } from '@/components/brand/brand-mark';
import { RollText } from '@/components/motion/roll-text';
import { ActionLink } from '@/components/ui/action-link';

interface NavCopy {
  skip: string;
  home: string;
  primaryNav: string;
  menuOpen: string;
  menuClose: string;
  language: string;
  links: Array<{ label: string; href: string }>;
  cta: string;
  whatsapp: string;
}

const COPY: Copy<NavCopy> = {
  pt: {
    skip: 'Pular para o conteúdo',
    home: 'ViraWeb — início',
    primaryNav: 'Navegação principal',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    language: 'Idioma',
    links: [
      { label: 'Factory', href: SITE.factoryUrl },
      { label: 'Soluções', href: '/#services' },
      { label: 'Odonto', href: '/#odonto' },
      { label: 'PontoControle', href: '/#pontocontrole' },
      { label: 'LeadScrap', href: '/#leadscrap' },
      { label: 'Pacote', href: '/propostas' },
      { label: 'FAQ', href: '/#faq' },
    ],
    cta: 'Falar com a ViraWeb',
    whatsapp: 'Olá ViraWeb! Gostaria de agendar um diagnóstico digital gratuito para a minha empresa.',
  },
  en: {
    skip: 'Skip to content',
    home: 'ViraWeb — home',
    primaryNav: 'Main navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: 'Language',
    links: [
      { label: 'Factory', href: SITE.factoryUrl },
      { label: 'Solutions', href: '/#services' },
      { label: 'Odonto', href: '/#odonto' },
      { label: 'PontoControle', href: '/#pontocontrole' },
      { label: 'LeadScrap', href: '/#leadscrap' },
      { label: 'Package', href: '/propostas' },
      { label: 'FAQ', href: '/#faq' },
    ],
    cta: 'Talk to ViraWeb',
    whatsapp: 'Hello ViraWeb! I would like to schedule a digital assessment for my business.',
  },
  es: {
    skip: 'Saltar al contenido',
    home: 'ViraWeb — inicio',
    primaryNav: 'Navegación principal',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    language: 'Idioma',
    links: [
      { label: 'Factory', href: SITE.factoryUrl },
      { label: 'Soluciones', href: '/#services' },
      { label: 'Odonto', href: '/#odonto' },
      { label: 'PontoControle', href: '/#pontocontrole' },
      { label: 'LeadScrap', href: '/#leadscrap' },
      { label: 'Paquete', href: '/propostas' },
      { label: 'FAQ', href: '/#faq' },
    ],
    cta: 'Hablar con ViraWeb',
    whatsapp: '¡Hola ViraWeb! Me gustaría agendar un diagnóstico digital para mi empresa.',
  },
};

const LANGUAGES: Language[] = ['pt', 'en', 'es'];

function LanguageSwitch({ label, size = 'sm' }: { label: string; size?: 'sm' | 'lg' }) {
  const { language, setLanguage } = useTranslation();
  const pillId = useId();

  return (
    <div role="group" aria-label={label} className="flex items-center rounded-sm border border-line bg-white p-0.5">
      {LANGUAGES.map((code) => {
        const active = language === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={active}
            lang={code}
            className={cn(
              'relative cursor-pointer font-mono font-medium uppercase transition-colors duration-300',
              size === 'sm' ? 'h-9 min-w-10 px-2 text-[0.7rem]' : 'h-12 min-w-14 px-3 text-sm',
              active ? 'text-white' : 'text-ink-soft hover:text-ink',
            )}
          >
            {active ? (
              <motion.span
                layoutId={pillId}
                className="absolute inset-0 rounded-[2px] bg-ink"
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              />
            ) : null}
            <span className="relative">{code}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const { language } = useTranslation();
  const copy = COPY[language];
  const lenis = useLenis();
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > previous && latest > 200);
  });

  // Lock scrolling and close on Escape while the full-screen menu is open.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    return () => {
      lenis?.start();
      root.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lenis]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#conteudo"
        className="sr-only rounded-sm bg-ink px-4 py-3 text-sm text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        {copy.skip}
      </a>

      <motion.div
        initial={false}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 34 }}
        className={cn(
          'border-b transition-colors duration-500',
          scrolled || open ? 'border-line bg-white/90 backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-[var(--nav-h)] max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
          <a href="/" aria-label={copy.home} className="inline-flex min-h-12 shrink-0 items-center" onClick={() => setOpen(false)}>
            <Wordmark />
          </a>

          <nav aria-label={copy.primaryNav} className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {copy.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="roll-trigger inline-flex min-h-12 items-center text-[0.9rem] font-medium text-ink-soft transition-colors hover:text-ink">
                    <RollText text={link.label} stagger />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitch label={copy.language} />
            </div>
            <ActionLink
              href={whatsappLink(copy.whatsapp)}
              {...EXTERNAL_LINK_PROPS}
              label={copy.cta}
              size="md"
              icon={false}
              className="hidden md:inline-flex lg:hidden xl:inline-flex"
            />
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? copy.menuClose : copy.menuOpen}
              onClick={() => setOpen((value) => !value)}
              className="relative grid size-12 cursor-pointer place-items-center rounded-sm border border-line bg-white lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 top-0 block h-[1.5px] w-5 bg-ink"
                  animate={open ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 block h-[1.5px] w-5 bg-ink"
                  animate={open ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 top-[var(--nav-h)] overflow-hidden lg:hidden">
        <AnimatePresence>
          {open ? (
            <motion.div
              id={menuId}
              ref={menuRef}
              key="menu"
              className="pointer-events-auto absolute inset-0 overflow-y-auto bg-white"
              initial={{ y: '-100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              data-lenis-prevent
            >
              <nav aria-label={copy.primaryNav} className="flex min-h-full flex-col justify-between px-4 pb-10 pt-6 sm:px-8">
                <ul>
                  {copy.links.map((link, i) => (
                    <li key={link.href} className="overflow-hidden border-b border-line">
                      <motion.a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-16 items-baseline gap-4 py-3 text-[clamp(2rem,9vw,3.5rem)] font-semibold leading-none tracking-[-0.045em] text-ink"
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '110%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.15 + i * 0.05 }}
                      >
                        <span className="font-mono text-[0.72rem] font-normal tracking-normal text-mute">0{i + 1}</span>
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
                <motion.div
                  className="mt-10 flex flex-col gap-4"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  <LanguageSwitch label={copy.language} size="lg" />
                  <ActionLink
                    href={whatsappLink(copy.whatsapp)}
                    {...EXTERNAL_LINK_PROPS}
                    label={copy.cta}
                    className="w-full"
                  />
                </motion.div>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
