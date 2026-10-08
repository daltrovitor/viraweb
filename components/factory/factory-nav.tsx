// Hello World
'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useLenis } from 'lenis/react';
import { cn } from '@/lib/utils';
import { FACTORY_NAV } from '@/lib/factory/site';
import { Wordmark } from '@/components/brand/brand-mark';
import { RollText } from '@/components/motion/roll-text';
import { ActionNavLink } from '@/components/factory/action-nav-link';

const LINKS = [...FACTORY_NAV, { label: 'Meus produtos', href: '/dashboard' }];

export function FactoryNav() {
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
    setHidden(latest > previous && latest > 240);
  });

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
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
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
        Pular para o conteúdo
      </a>
      <motion.div
        initial={false}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 34 }}
        className={cn(
          'border-b transition-colors duration-500',
          scrolled || open ? 'border-line bg-white/90 backdrop-blur-md' : 'border-transparent bg-white/0',
        )}
      >
        <div className="mx-auto flex h-[var(--nav-h)] max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
          <Link href="/" className="inline-flex min-h-12 shrink-0 items-center" onClick={() => setOpen(false)}>
            <Wordmark product="Factory" />
          </Link>

          <nav aria-label="Navegação da Factory" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="roll-trigger inline-flex min-h-12 items-center text-[0.9rem] font-medium text-ink-soft transition-colors hover:text-ink">
                    <RollText text={link.label} stagger />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ActionNavLink href="/products" label="Criar meu produto" size="md" className="hidden sm:inline-flex" />
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
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
              <nav aria-label="Navegação da Factory" className="flex min-h-full flex-col justify-between px-4 pb-10 pt-6 sm:px-8">
                <ul>
                  {LINKS.map((link, i) => (
                    <li key={link.href} className="overflow-hidden border-b border-line">
                      <motion.div
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '110%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.15 + i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-16 items-baseline gap-4 py-3 text-[clamp(2rem,9vw,3.5rem)] font-semibold leading-none tracking-[-0.045em] text-ink"
                        >
                          <span className="font-mono text-[0.72rem] font-normal tracking-normal text-mute">0{i + 1}</span>
                          {link.label}
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
                <div className="mt-10" onClick={() => setOpen(false)}>
                  <ActionNavLink href="/products" label="Criar meu produto" className="w-full" />
                </div>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
