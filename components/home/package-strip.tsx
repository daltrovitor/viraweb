// Hello World
'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import type { Copy } from '@/lib/site';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';

interface PackageCopy {
  label: string;
  question: string;
  answer: string;
  items: string[];
  note: string;
}

const COPY: Copy<PackageCopy> = {
  pt: {
    label: 'Pacote',
    question: 'Quer acelerar rápido?',
    answer: 'Conheça o Pacote ViraWeb.',
    items: ['Website Next.js + SEO nativo', 'Google Meu Negócio & Maps', 'Google Ads & Meta Ads', 'ViraBot WhatsApp 24/7'],
    note: 'Simulador em tempo real com desconto progressivo',
  },
  en: {
    label: 'Package',
    question: 'Want to move fast?',
    answer: 'Meet the ViraWeb Package.',
    items: ['Next.js website + native SEO', 'Google Business Profile & Maps', 'Google Ads & Meta Ads', 'ViraBot on WhatsApp 24/7'],
    note: 'Real-time simulator with progressive discount',
  },
  es: {
    label: 'Paquete',
    question: '¿Quiere acelerar rápido?',
    answer: 'Conozca el Paquete ViraWeb.',
    items: ['Sitio Next.js + SEO nativo', 'Google Mi Negocio y Maps', 'Google Ads y Meta Ads', 'ViraBot en WhatsApp 24/7'],
    note: 'Simulador en tiempo real con descuento progresivo',
  },
};

export function PackageStrip() {
  const { t, language } = useTranslation();
  const copy = COPY[language];

  return (
    <section aria-labelledby="package-title" className="bg-white pt-16 pb-24 sm:pt-24 sm:pb-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-8 px-4 sm:px-8 lg:px-12">
        <p className="col-span-12 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute lg:col-span-2 lg:pt-3">
          ({copy.label})
        </p>
        <SplitWords
          id="package-title"
          className="col-span-12 text-[clamp(2.1rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink lg:col-span-7"
          parts={[
            copy.question,
            { br: true },
            { text: copy.answer, className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' },
          ]}
        />
        <Reveal className="col-span-12 md:col-span-7 lg:col-span-3 lg:pt-3">
          <p className="text-base leading-relaxed text-ink-soft">{t('home.package.subtitle')}</p>
        </Reveal>

        <ol className="col-span-12 mt-6 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:col-span-10 lg:col-start-3 lg:grid-cols-4">
          {copy.items.map((item, i) => (
            <li key={item} className="flex gap-4 border-b border-line py-5 pr-4 text-[0.95rem] text-ink lg:border-b-0">
              <span className="font-mono text-[0.72rem] text-mute">0{i + 1}</span>
              <Reveal delay={i * 0.06} y={12}>
                {item}
              </Reveal>
            </li>
          ))}
        </ol>

        <a
          href="/propostas"
          className="group relative col-span-12 mt-10 flex min-h-24 items-center justify-between gap-6 overflow-hidden border-y border-ink px-1 py-6 text-ink sm:px-4 lg:mt-16"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
          />
          <span className="relative flex flex-col gap-2 transition-colors duration-500 group-hover:text-white">
            <span className="text-[clamp(1.35rem,3.2vw,3rem)] font-semibold leading-tight tracking-[-0.04em]">
              {t('home.package.cta')}
            </span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute transition-colors duration-500 group-hover:text-white/75">
              {copy.note}
            </span>
          </span>
          <span className="relative grid size-12 shrink-0 place-items-center rounded-sm border border-ink transition-colors duration-500 group-hover:border-white group-hover:bg-white sm:size-16">
            <ArrowRight
              aria-hidden="true"
              className="size-5 -rotate-45 transition-transform duration-500 ease-out-expo group-hover:rotate-0"
            />
          </span>
        </a>
      </div>
    </section>
  );
}
