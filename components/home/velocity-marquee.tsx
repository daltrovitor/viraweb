// Hello World
'use client';

import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { useTranslation } from '@/lib/i18n';
import { BrandMark } from '@/components/brand/brand-mark';
import type { Copy } from '@/lib/site';

const WORDS: Copy<string[]> = {
  pt: ['Sites premium', 'Sistemas sob medida', 'IA no WhatsApp', 'SEO local', 'Software próprio'],
  en: ['Premium websites', 'Custom systems', 'WhatsApp AI', 'Local SEO', 'Proprietary software'],
  es: ['Sitios premium', 'Sistemas a medida', 'IA en WhatsApp', 'SEO local', 'Software propio'],
};

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

/**
 * Kinetic band between chapters: drifts on its own and accelerates / flips
 * direction with scroll velocity.
 */
export function VelocityMarquee({ baseVelocity = -2.2 }: { baseVelocity?: number }) {
  const { language } = useTranslation();
  const words = WORDS[language];
  const reduceMotion = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    moveBy += direction.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  const sequence = (copyIndex: number) => (
    <div className="flex shrink-0 items-center" aria-hidden={copyIndex > 0 || undefined}>
      {[...words, ...words].map((word, i) => (
        <span key={`${copyIndex}-${i}`} className="flex items-center">
          <span
            className={
              i % 2 === 1
                ? 'font-serif text-[clamp(2.5rem,7vw,6.5rem)] italic leading-none tracking-[-0.02em] text-brand'
                : 'text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-none tracking-[-0.045em] text-ink'
            }
          >
            {word}
          </span>
          <BrandMark className="mx-6 w-7 sm:mx-10 sm:w-10" />
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label={words.join(', ')} className="overflow-hidden border-y border-line bg-white py-8 sm:py-12">
      <motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
        {sequence(0)}
        {sequence(1)}
      </motion.div>
    </section>
  );
}
