// Hello World
'use client';

import { Fragment, type ElementType } from 'react';
import { motion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';

export type SplitPart = string | { text: string; className?: string } | { br: true };

interface SplitWordsProps {
  parts: SplitPart[];
  as?: ElementType;
  className?: string;
  id?: string;
  /** Seconds before the first word starts rising. */
  delay?: number;
  stagger?: number;
}

const SPRING = { type: 'spring', stiffness: 300, damping: 28, mass: 1 } as const;

const wordVariants: Variants = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: SPRING },
};

/** Kinetic masked typography: every word rises from its own clipping mask. */
export function SplitWords({
  parts,
  as: Tag = 'h2',
  className,
  id,
  delay = 0,
  stagger = 0.045,
}: SplitWordsProps) {
  let wordIndex = 0;

  return (
    <Tag className={className} id={id}>
      <motion.span
        className="block"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ delayChildren: delay, staggerChildren: stagger }}
      >
        {parts.map((part, partIndex) => {
          if (typeof part === 'object' && 'br' in part) return <br key={`br-${partIndex}`} />;
          const text = typeof part === 'string' ? part : part.text;
          const partClass = typeof part === 'string' ? undefined : part.className;

          return (
            <Fragment key={`part-${partIndex}`}>
              {text
                .split(' ')
                .filter(Boolean)
                .map((word) => {
                  const key = `w-${wordIndex++}`;
                  return (
                    <Fragment key={key}>
                      <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top">
                        <motion.span className={cn('inline-block', partClass)} variants={wordVariants}>
                          {word}
                        </motion.span>
                      </span>{' '}
                    </Fragment>
                  );
                })}
            </Fragment>
          );
        })}
      </motion.span>
    </Tag>
  );
}
