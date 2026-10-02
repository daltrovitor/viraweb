// Hello World
import { cn } from '@/lib/utils';

export const MARK_VIEWBOX = { width: 766, height: 621 } as const;

interface MarkPolygon {
  points: string;
  fill: string;
}

/** The ViraWeb "V" mark, polygon by polygon, as drawn in the official logo. */
export const MARK_POLYGONS: readonly MarkPolygon[] = [
  { points: '2,93.5 84.7,239.5 223.5,92.5', fill: '#132a46' },
  { points: '307,243.5 223.5,92.5 84.7,239.5', fill: '#113f73' },
  { points: '84.7,239.5 200.5,446 307,243.5', fill: '#2965ae' },
  { points: '307,243.5 200.5,446 245,527.5 184,527.5 299,616.5 415,525.5 352,524 386.7,465.5 409,421.5', fill: '#132a46' },
  { points: '489,286.5 409,421.5 386.7,465.5 474,465 529,377', fill: '#f2bf12' },
  { points: '386.7,465.5 430.5,534 474,465', fill: '#e4a009' },
  { points: '529,377 474,465 568.3,465.2', fill: '#edb00e' },
  { points: '386.7,465.5 352,524 415,525.5 299,616.5 480.5,619 430.5,534', fill: '#edb00e' },
  { points: '568.3,465.2 474,465 430.5,534 480.5,619', fill: '#e39907' },
  { points: '585.5,286.2 489,286.5 529,377', fill: '#3aa7d4' },
  { points: '585.5,286.2 529,377 568.3,465.2 637,344', fill: '#246ba6' },
  { points: '763,2 493,99.5 567,151.5 489,286.5 585.5,286.2', fill: '#266ca6' },
  { points: '763,2 585.5,286.2 637,344 696,242.5 764,291.5', fill: '#1958a5' },
];

/** Unit vector (and distance) from the mark centre to each polygon centroid. */
export const MARK_VECTORS = MARK_POLYGONS.map(({ points }) => {
  const coords = points.split(' ').map((pair) => pair.split(',').map(Number) as [number, number]);
  const cx = coords.reduce((sum, [x]) => sum + x, 0) / coords.length;
  const cy = coords.reduce((sum, [, y]) => sum + y, 0) / coords.length;
  const dx = cx - MARK_VIEWBOX.width / 2;
  const dy = cy - MARK_VIEWBOX.height / 2;
  const length = Math.hypot(dx, dy) || 1;
  return { x: dx / length, y: dy / length, distance: length };
});

// On dark grounds the two navy shards would vanish; they flip to light tones.
const INVERSE_FILL: Record<string, string> = {
  '#132a46': '#ffffff',
  '#113f73': '#c9d8ea',
};

interface BrandMarkProps {
  className?: string;
  title?: string;
  inverse?: boolean;
}

export function BrandMark({ className, title, inverse = false }: BrandMarkProps) {
  return (
    <svg
      viewBox={`0 0 ${MARK_VIEWBOX.width} ${MARK_VIEWBOX.height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={cn('block h-auto shrink-0 overflow-visible', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {MARK_POLYGONS.map((polygon) => {
        const fill = inverse ? (INVERSE_FILL[polygon.fill] ?? polygon.fill) : polygon.fill;
        return (
          <polygon
            key={polygon.points}
            points={polygon.points}
            fill={fill}
            stroke={fill}
            strokeWidth={1}
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}

interface WordmarkProps {
  className?: string;
  /** Product line rendered under the wordmark, e.g. "Odonto". */
  product?: string;
  tone?: 'ink' | 'light';
}

/** Mark + "ViraWeb" set in the brand typeface (bold "Vira", light "Web"). */
export function Wordmark({ className, product, tone = 'ink' }: WordmarkProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 font-brand', className)}>
      <BrandMark className="w-8 sm:w-9" inverse={tone === 'light'} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[1.15rem] sm:text-[1.3rem] tracking-[-0.02em]',
            tone === 'ink' ? 'text-ink' : 'text-white',
          )}
        >
          <span className="font-bold">Vira</span>
          <span className="font-light">Web</span>
        </span>
        {product ? (
          <span
            className={cn(
              'mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em]',
              tone === 'ink' ? 'text-mute' : 'text-white/70',
            )}
          >
            {product}
          </span>
        ) : null}
      </span>
    </span>
  );
}
