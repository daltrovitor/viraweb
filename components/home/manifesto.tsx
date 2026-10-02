// Hello World
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useTranslation } from '@/lib/i18n';
import { Counter } from '@/components/motion/counter';
import { Reveal } from '@/components/motion/reveal';
import type { Copy } from '@/lib/site';

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

interface ManifestoCopy {
  label: string;
  statement: string;
  stats: Stat[];
}

const COPY: Copy<ManifestoCopy> = {
  pt: {
    label: 'Manifesto',
    statement:
      'Desenvolvemos códigos rápidos, arquiteturas indestrutíveis e sistemas sob medida para marcas que exigem liderança e performance absoluta no digital.',
    stats: [
      { value: 50, prefix: '+', label: 'negócios escalados no digital' },
      { value: 100, suffix: '%', label: 'do código-fonte é seu, sem amarras' },
      { value: 24, suffix: '/7', label: 'ViraBot atendendo no WhatsApp' },
    ],
  },
  en: {
    label: 'Manifesto',
    statement:
      'We build fast code, indestructible architectures and tailor-made systems for brands that demand leadership and absolute digital performance.',
    stats: [
      { value: 50, prefix: '+', label: 'businesses scaled online' },
      { value: 100, suffix: '%', label: 'of the source code is yours, no lock-in' },
      { value: 24, suffix: '/7', label: 'ViraBot answering on WhatsApp' },
    ],
  },
  es: {
    label: 'Manifiesto',
    statement:
      'Desarrollamos código rápido, arquitecturas indestructibles y sistemas a la medida para marcas que exigen liderazgo y rendimiento absoluto en lo digital.',
    stats: [
      { value: 50, prefix: '+', label: 'negocios escalados en lo digital' },
      { value: 100, suffix: '%', label: 'del código fuente es suyo, sin ataduras' },
      { value: 24, suffix: '/7', label: 'ViraBot atendiendo en WhatsApp' },
    ],
  },
};

function ScrubWord({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  // Floor of 0.55 keeps even the dimmed words above WCAG large-text contrast.
  const opacity = useTransform(progress, range, [0.55, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{word}</motion.span>{' '}
    </>
  );
}

export function Manifesto() {
  const { language } = useTranslation();
  const copy = COPY[language];
  const statementRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: statementRef, offset: ['start 0.85', 'end 0.45'] });
  const words = copy.statement.split(' ');

  return (
    <section aria-labelledby="manifesto-title" className="bg-white py-24 sm:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-10 px-4 sm:px-8 lg:px-12">
        <p className="col-span-12 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute lg:col-span-2 lg:pt-4">
          ({copy.label})
        </p>

        <h2
          id="manifesto-title"
          ref={statementRef}
          className="col-span-12 text-[clamp(1.85rem,4.4vw,4.4rem)] font-medium leading-[1.04] tracking-[-0.04em] text-ink lg:col-span-10"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return <ScrubWord key={`${word}-${i}`} word={word} range={[start, end]} progress={scrollYProgress} />;
          })}
        </h2>

        <dl className="col-span-12 mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-3 lg:col-span-10 lg:col-start-3">
          {copy.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="flex flex-col-reverse border-b border-line py-8 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt className="mt-4 max-w-[24ch] text-sm leading-relaxed text-mute">{stat.label}</dt>
              <dd className="text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] text-ink">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
