// Hello World
'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/i18n';

const VIEW = { once: true, amount: 0.4 } as const;
const EASE = [0.16, 1, 0.3, 1] as const;

/** Marketing: a map search where your pin drops in and your business tops the list. */
export function MapVisual({ language }: { language: Language }) {
  const labels = {
    pt: { query: 'dentista perto de mim', you: 'Sua empresa', other: ['Concorrente A', 'Concorrente B'] },
    en: { query: 'dentist near me', you: 'Your business', other: ['Competitor A', 'Competitor B'] },
    es: { query: 'dentista cerca de mí', you: 'Su empresa', other: ['Competidor A', 'Competidor B'] },
  }[language];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-sm border border-line-strong bg-white shadow-[0_24px_60px_-32px_rgba(15,31,51,0.35)]"
    >
      <div className="border-b border-line px-4 py-2.5 font-mono text-[0.7rem] text-mute">⌕ {labels.query}</div>
      <div
        className="relative h-28 sm:h-36"
        style={{
          backgroundImage:
            'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        {[
          { left: '22%', top: '58%', active: false },
          { left: '68%', top: '30%', active: false },
          { left: '46%', top: '42%', active: true },
        ].map((pin, i) => (
          <motion.span
            key={i}
            className={cn(
              'absolute block size-3.5 -translate-x-1/2 -translate-y-full rotate-45 rounded-[2px_2px_2px_0] border-2 border-white',
              pin.active ? 'bg-brand' : 'bg-line-strong',
            )}
            style={{ left: pin.left, top: pin.top }}
            initial={{ y: -24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={VIEW}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 + i * 0.15 }}
          />
        ))}
      </div>
      <ol className="divide-y divide-line text-[0.8rem]">
        {[labels.you, ...labels.other].map((name, i) => (
          <motion.li
            key={name}
            className="flex items-center justify-between px-4 py-2.5"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 + i * 0.1 }}
          >
            <span className={i === 0 ? 'font-semibold text-ink' : 'text-ink-soft'}>
              {i + 1}. {name}
            </span>
            <span className="font-mono text-[0.68rem] text-mute">{['0,4 km', '1,2 km', '2,8 km'][i]}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
