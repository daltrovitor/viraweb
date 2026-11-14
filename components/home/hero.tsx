// Hello World
'use client';

import type { CSSProperties } from 'react';
import { useTranslation } from '@/lib/i18n';
import type { Copy } from '@/lib/site';
import { getServices } from '@/lib/home/services';
import { RollText } from '@/components/motion/roll-text';
import { BriefBuilder } from '@/components/home/brief-builder';

interface HeroCopy {
  line1: string;
  lead: string;
  em: string;
  tail: string;
  lede: string;
  steps: string;
  secondary: string;
}

const COPY: Copy<HeroCopy> = {
  pt: {
    line1: 'Sites, sistemas e automações',
    lead: 'que',
    em: 'viram',
    tail: 'clientes.',
    lede: 'A ViraWeb projeta, desenvolve e divulga a sua operação digital: site, sistema sob medida, IA no WhatsApp e tráfego pago. O código-fonte é 100% seu.',
    steps: 'Serviços',
    secondary: 'Ver os serviços',
  },
  en: {
    line1: 'Websites, systems and automations',
    lead: 'that',
    em: 'turn into',
    tail: 'customers.',
    lede: 'ViraWeb designs, builds and promotes your digital operation: website, custom system, AI on WhatsApp and paid traffic. The source code is 100% yours.',
    steps: 'Services',
    secondary: 'See the services',
  },
  es: {
    line1: 'Sitios, sistemas y automatizaciones',
    lead: 'que',
    em: 'generan',
    tail: 'clientes.',
    lede: 'ViraWeb diseña, desarrolla y promueve su operación digital: sitio, sistema a medida, IA en WhatsApp y tráfico pago. El código fuente es 100% suyo.',
    steps: 'Servicios',
    secondary: 'Ver los servicios',
  },
};

const vars = (values: Record<string, string | number>) => values as CSSProperties;

/**
 * Z-pattern hero. The eye enters at the brand (top left), crosses to the contact
 * button (top right), slides down the diagonal past the four services, lands on
 * the headline and ends at the conversion anchor in the bottom right corner.
 */
export function Hero() {
  const { language } = useTranslation();
  const copy = COPY[language];
  const services = getServices(language);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-x-clip bg-white pt-[var(--nav-h)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Top stroke of the Z: from the brand to the contact button */}
        <div aria-hidden="true" className="z-rule hidden h-px bg-line-strong lg:block" />

        {/* Diagonal stroke with the four services as steps (large screens only) */}
        <div className="relative hidden h-[clamp(9rem,26svh,17rem)] lg:block">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="z-diagonal absolute inset-0 size-full"
          >
            <line x1="100" y1="0" x2="0" y2="100" stroke="var(--line-strong)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>

          <nav aria-label={copy.steps}>
            <ol>
              {services.map((service, index) => {
                // Each step ends exactly on the diagonal, like a stair resting on it.
                const x = 26 + index * 20;
                return (
                  <li
                    key={service.key}
                    className="z-step absolute"
                    style={vars({ right: `${100 - x}%`, bottom: `${x}%`, '--order': services.length - 1 - index })}
                  >
                    <a
                      href={`/#${service.anchor}`}
                      className="roll-trigger group relative flex min-h-12 items-center gap-3 pb-1 pr-4 text-[0.95rem] font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
                    >
                      <span className="font-mono text-[0.72rem] font-normal text-mute">0{index + 1}</span>
                      <RollText text={service.chip} />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 right-0 size-[7px] translate-x-1/2 translate-y-1/2 bg-ink transition-[transform,background-color] duration-500 ease-out-expo group-hover:scale-[1.8] group-hover:bg-brand group-focus-visible:scale-[1.8] group-focus-visible:bg-brand"
                      />
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        <h1
          id="hero-title"
          className="pt-10 text-[clamp(2.125rem,10vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink [overflow-wrap:anywhere] lg:pt-2 lg:text-[clamp(3.5rem,5.9vw,6.25rem)] lg:leading-[0.94]"
        >
          <span className="mask-line">
            <span className="mask-inner" style={vars({ '--i': 0 })}>
              {copy.line1}
            </span>
          </span>
          <span className="mask-line">
            <span className="mask-inner" style={vars({ '--i': 1 })}>
              {copy.lead}{' '}
              <em className="font-serif font-normal italic tracking-[-0.02em] text-brand">{copy.em}</em> {copy.tail}
            </span>
          </span>
        </h1>

        {/* Base stroke of the Z: leads the eye to the conversion anchor */}
        <div aria-hidden="true" className="z-rule mt-8 h-px bg-ink lg:mt-10" style={vars({ '--delay': '0.85s' })} />

        <div className="grid grid-cols-12 gap-x-4 gap-y-10 pb-14 pt-8 sm:pb-20 lg:gap-x-10 lg:pt-10">
          <div className="fade-up col-span-12 lg:col-span-5" style={vars({ '--i': 0 })}>
            <p className="max-w-[46ch] text-base leading-relaxed text-ink-soft sm:text-lg">{copy.lede}</p>
            <a
              href="/#services"
              className="roll-trigger group mt-6 inline-flex min-h-12 items-center gap-2 text-[0.95rem] font-medium text-ink"
            >
              <span className="relative">
                <RollText text={copy.secondary} />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left bg-ink transition-transform duration-500 ease-out-expo group-hover:scale-x-0"
                />
              </span>
            </a>
          </div>

          <div className="fade-up col-span-12 lg:col-span-6 lg:col-start-7" style={vars({ '--i': 1 })}>
            <BriefBuilder location="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
