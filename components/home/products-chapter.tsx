// Hello World
'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from '@/lib/i18n';
import type { Copy } from '@/lib/site';

const COPY: Copy<{ word: string; em: string; names: string }> = {
  pt: { word: 'Produtos', em: 'próprios', names: 'Vira Web Odonto · PontoControle · LeadScrap' },
  en: { word: 'Our own', em: 'products', names: 'Vira Web Odonto · PontoControle · LeadScrap' },
  es: { word: 'Productos', em: 'propios', names: 'Vira Web Odonto · PontoControle · LeadScrap' },
};

/** Oversized chapter title that slides sideways as it crosses the viewport. */
export function ProductsChapter() {
  const { language } = useTranslation();
  const copy = COPY[language];
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['12%', '-22%']);

  return (
    <div ref={ref} className="overflow-hidden border-t border-line bg-white pt-16 pb-10 sm:pt-24">
      <motion.p
        style={{ x }}
        className="whitespace-nowrap px-4 text-[clamp(4.5rem,17vw,17rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-ink sm:px-8 lg:px-12"
      >
        {copy.word} <span className="font-serif font-normal italic tracking-[-0.03em] text-brand">{copy.em}</span>
      </motion.p>
      <p className="mx-auto mt-8 max-w-[1440px] px-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute sm:px-8 lg:px-12">
        {copy.names}
      </p>
    </div>
  );
}
