// Hello World
'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ActionNavLink } from '@/components/factory/action-nav-link';
import { RollText } from '@/components/motion/roll-text';

const OUTPUTS = ['Sites.', 'Bots.', 'Automações.', 'Sistemas.'] as const;

const line = (i: number) => ({ '--i': i }) as CSSProperties;

/** Composition 5 — monumental type left, technical micro-metadata right. */
export function FactoryHero() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : -120]);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % OUTPUTS.length), 1800);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section
      aria-labelledby="factory-hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-x-clip bg-white pt-[calc(var(--nav-h)+3rem)] pb-8 sm:pb-10"
    >
      <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-12 gap-x-4 px-4 sm:px-8 lg:px-12">
        <motion.div style={{ y }} className="col-span-12 self-center lg:col-span-10">
          <h1
            id="factory-hero-title"
            className="text-[clamp(3rem,15vw,5rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-ink sm:text-[clamp(4rem,10.5vw,11.5rem)]"
          >
            <span className="mask-line">
              <span className="mask-inner" style={line(0)}>Você explica.</span>
            </span>
            <span className="mask-line sm:pl-[0.75em]">
              <span className="mask-inner" style={line(1)}>
                A gente <em className="font-serif font-normal italic tracking-[-0.02em] text-brand">constrói.</em>
              </span>
            </span>
          </h1>
        </motion.div>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-[1440px] grid-cols-12 items-end gap-x-4 gap-y-10 px-4 sm:px-8 lg:px-12">
        <div className="fade-up col-span-12 md:col-span-7 lg:col-span-6" style={line(0)}>
          <p className="flex flex-wrap items-baseline gap-x-3 text-[clamp(1.5rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
            {OUTPUTS.map((word, i) => (
              <span
                key={word}
                className={
                  i === active
                    ? 'text-ink underline decoration-brand decoration-[3px] underline-offset-[0.18em] transition-colors duration-500'
                    : 'text-mute transition-colors duration-500'
                }
              >
                {word}
              </span>
            ))}
          </p>
          <p className="mt-4 text-lg text-ink-soft">
            Prontos em até <strong className="font-semibold text-ink">2 dias úteis</strong>.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <ActionNavLink href="/products" label="Criar meu produto" className="w-full sm:w-auto" />
            <a
              href="#como-funciona"
              className="roll-trigger group inline-flex min-h-12 items-center justify-center gap-2 text-[0.95rem] font-medium text-ink sm:justify-start"
            >
              <span className="relative">
                <RollText text="Como funciona" />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left bg-ink transition-transform duration-500 ease-out-expo group-hover:scale-x-0"
                />
              </span>
            </a>
          </div>
        </div>

        <dl
          className="fade-up col-span-12 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-6 font-mono text-[0.72rem] uppercase tracking-[0.12em] md:col-span-5 md:col-start-8 xl:col-span-4 xl:col-start-9"
          style={line(1)}
        >
          {[
            ['Prazo Standard', '≤ 2 dias úteis'],
            ['Modelo', 'Setup + mensalidade'],
            ['Pagamento', 'Stripe · cartão'],
            ['Operação', 'Hospedagem inclusa'],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="text-mute">{term}</dt>
              <dd className="mt-1 normal-case tracking-normal text-[0.9rem] text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

    </section>
  );
}
