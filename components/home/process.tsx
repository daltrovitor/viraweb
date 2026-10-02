// Hello World
'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useTranslation } from '@/lib/i18n';
import type { Copy } from '@/lib/site';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';

const LABEL: Copy<string> = { pt: 'Método', en: 'Method', es: 'Método' };
const STEPS = [1, 2, 3, 4] as const;

/** Four-step method; the rail draws itself as the section scrolls through. */
export function Process() {
  const { t, language } = useTranslation();
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 0.8', 'end 0.55'] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section aria-labelledby="process-title" className="border-t border-line bg-white py-24 sm:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-8 px-4 sm:px-8 lg:px-12">
        <p className="col-span-12 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute lg:col-span-2 lg:pt-4">
          ({LABEL[language]})
        </p>
        <SplitWords
          id="process-title"
          className="col-span-12 text-[clamp(2.2rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink lg:col-span-7"
          parts={[t('process.title')]}
        />
        <Reveal className="col-span-12 md:col-span-6 lg:col-span-3 lg:pt-4">
          <p className="text-base leading-relaxed text-ink-soft">{t('process.subtitle')}</p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div ref={railRef} className="relative pl-8 md:pl-0 md:pt-10">
          {/* Rail: vertical on mobile, horizontal from md up */}
          <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-line md:h-px md:w-full" />
          <motion.span
            aria-hidden="true"
            className="absolute left-0 top-0 hidden h-px w-full origin-left bg-ink md:block"
            style={{ scaleX }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-px origin-top bg-ink md:hidden"
            style={{ scaleY: scaleX }}
          />
          <ol className="grid grid-cols-1 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {STEPS.map((step, i) => (
            <li key={step} className="relative">
              <Reveal delay={i * 0.08} y={20}>
                <p className="font-mono text-[0.72rem] text-mute">{t(`process.step${step}.num`)}</p>
                <h3 className="mt-4 text-[clamp(1.4rem,2vw,1.85rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                  {t(`process.step${step}.title`)}
                </h3>
                <p className="mt-3 max-w-[36ch] text-[0.95rem] leading-relaxed text-ink-soft">{t(`process.step${step}.desc`)}</p>
              </Reveal>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
