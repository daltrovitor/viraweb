// Hello World
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface RollTextProps {
  text: string;
  className?: string;
  /**
   * Roll letter by letter. Costs two spans per character, so it is reserved
   * for a handful of prominent links; everything else rolls the label whole.
   */
  stagger?: boolean;
}

/**
 * Label rolls up on hover/focus of the closest `.roll-trigger` ancestor.
 * The visual rows are aria-hidden; screen readers get the plain text once.
 */
export function RollText({ text, className, stagger = false }: RollTextProps) {
  const row = (variant: 'roll-a' | 'roll-b') => (
    <span className={variant} aria-hidden="true">
      {stagger ? (
        Array.from(text).map((char, i) => (
          <span key={i} className="roll-char" style={{ '--i': i } as CSSProperties}>
            {char === ' ' ? ' ' : char}
          </span>
        ))
      ) : (
        <span className="roll-char">{text}</span>
      )}
    </span>
  );

  return (
    <span className={cn('roll', className)}>
      <span className="sr-only">{text}</span>
      {row('roll-a')}
      {row('roll-b')}
    </span>
  );
}
