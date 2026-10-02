// Hello World
import { cn } from '@/lib/utils';

/** Upper-arch teeth shown in the builder, FDI numbering, patient's right to left. */
export const UPPER_TEETH = [15, 14, 13, 12, 11, 21, 22, 23, 24, 25] as const;
export type ToothId = (typeof UPPER_TEETH)[number];

type ToothKind = 'incisor' | 'canine' | 'premolar';

const kindOf = (id: number): ToothKind => {
  const position = id % 10;
  if (position <= 2) return 'incisor';
  if (position === 3) return 'canine';
  return 'premolar';
};

// Root up, crown down (upper arch). Crown sits below the CEJ line at y = 44.
const SHAPES: Record<ToothKind, { outline: string; crown: string; width: number }> = {
  incisor: {
    outline: 'M14 3 C11.6 12 10 26 9.4 44 C7 50 6.6 59 8 65 C9.4 70 18.6 70 20 65 C21.4 59 21 50 18.6 44 C18 26 16.4 12 14 3 Z',
    crown: 'M9.4 44 C7 50 6.6 59 8 65 C9.4 70 18.6 70 20 65 C21.4 59 21 50 18.6 44 Z',
    width: 28,
  },
  canine: {
    outline: 'M14 1 C11.4 12 9.6 28 9 44 C6.6 51 6.8 60 9.6 66 C11.2 70 16.8 70 18.4 66 C21.2 60 21.4 51 19 44 C18.4 28 16.6 12 14 1 Z',
    crown: 'M9 44 C6.6 51 6.8 60 9.6 66 C11.2 70 16.8 70 18.4 66 C21.2 60 21.4 51 19 44 Z',
    width: 28,
  },
  premolar: {
    outline: 'M11 6 C9.6 16 8.8 30 8 44 C5.4 50 5.2 59 7 64.5 C9 70 19 70 21 64.5 C22.8 59 22.6 50 20 44 C19.2 30 18.4 16 17 6 C15.6 12 12.4 12 11 6 Z',
    crown: 'M8 44 C5.4 50 5.2 59 7 64.5 C9 70 19 70 21 64.5 C22.8 59 22.6 50 20 44 Z',
    width: 28,
  },
};

interface ToothProps {
  id: number;
  selected?: boolean;
  className?: string;
}

export function Tooth({ id, selected = false, className }: ToothProps) {
  const shape = SHAPES[kindOf(id)];
  return (
    <svg
      viewBox={`0 0 ${shape.width} 72`}
      className={cn('block h-auto w-full overflow-visible', className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={shape.crown}
        className={cn('transition-[fill] duration-300', selected ? 'fill-odonto/25' : 'fill-transparent')}
      />
      <path
        d={shape.outline}
        fill="none"
        strokeWidth={1.4}
        strokeLinejoin="round"
        className={cn('transition-[stroke] duration-300', selected ? 'stroke-odonto' : 'stroke-[#9aa3b2]')}
      />
      <path d="M9.2 44 H18.8" strokeWidth={1} className={selected ? 'stroke-odonto/60' : 'stroke-[#c4cad4]'} />
    </svg>
  );
}
