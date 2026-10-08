// Hello World
import type { ReactNode } from 'react';
import { SplitWords, type SplitPart } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';

interface SectionHeadProps {
  id: string;
  index: string;
  title: SplitPart[];
  lede?: ReactNode;
}

/** Editorial section head: index in the margin, headline across, lede in the narrow column. */
export function SectionHead({ id, index, title, lede }: SectionHeadProps) {
  return (
    <div className="grid grid-cols-12 gap-x-4 gap-y-6">
      <p aria-hidden="true" className="col-span-12 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute lg:col-span-2 lg:pt-3">
        ({index})
      </p>
      <SplitWords
        id={id}
        className="col-span-12 text-[clamp(2.1rem,5.4vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink lg:col-span-7"
        parts={title}
      />
      {lede ? (
        <Reveal className="col-span-12 md:col-span-7 lg:col-span-3 lg:pt-3">
          <div className="text-base leading-relaxed text-ink-soft">{lede}</div>
        </Reveal>
      ) : null}
    </div>
  );
}

export const accent = (text: string): SplitPart => ({
  text,
  className: 'font-serif font-normal italic tracking-[-0.02em] text-brand',
});
