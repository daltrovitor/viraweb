// Hello World
'use client';

import { useTranslation } from '@/lib/i18n';
import type { Copy } from '@/lib/site';
import { Counter } from '@/components/motion/counter';
import { Reveal } from '@/components/motion/reveal';

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const COPY: Copy<{ label: string; stats: Stat[] }> = {
  pt: {
    label: 'A ViraWeb em números',
    stats: [
      { value: 50, prefix: '+', label: 'negócios escalados no digital' },
      { value: 100, suffix: '%', label: 'do código-fonte é seu, sem amarras' },
      { value: 15, label: 'dias úteis, no máximo, para uma landing page' },
      { value: 24, suffix: '/7', label: 'ViraBot atendendo no WhatsApp' },
    ],
  },
  en: {
    label: 'ViraWeb in numbers',
    stats: [
      { value: 50, prefix: '+', label: 'businesses scaled online' },
      { value: 100, suffix: '%', label: 'of the source code is yours, no lock-in' },
      { value: 15, label: 'business days, at most, for a landing page' },
      { value: 24, suffix: '/7', label: 'ViraBot answering on WhatsApp' },
    ],
  },
  es: {
    label: 'ViraWeb en números',
    stats: [
      { value: 50, prefix: '+', label: 'negocios escalados en lo digital' },
      { value: 100, suffix: '%', label: 'del código fuente es suyo, sin ataduras' },
      { value: 15, label: 'días hábiles, como máximo, para una landing page' },
      { value: 24, suffix: '/7', label: 'ViraBot atendiendo en WhatsApp' },
    ],
  },
};

/** Four facts right under the hero: the numbers count up as they enter the viewport. */
export function ProofStrip() {
  const { language } = useTranslation();
  const copy = COPY[language];

  return (
    <section aria-label={copy.label} className="border-y border-line bg-white">
      <dl className="mx-auto grid max-w-[1440px] grid-cols-2 px-4 sm:px-8 lg:grid-cols-4 lg:px-12">
        {copy.stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.06}
            y={18}
            className="flex flex-col-reverse justify-end border-line py-8 pr-4 odd:border-r max-lg:[&:nth-child(-n+2)]:border-b sm:py-10 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
          >
            <dt className="mt-3 max-w-[24ch] text-sm leading-relaxed text-mute">{stat.label}</dt>
            <dd className="text-[clamp(2.5rem,5.4vw,4.75rem)] font-semibold leading-none tracking-[-0.05em] text-ink">
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
