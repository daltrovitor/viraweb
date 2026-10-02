// Hello World
import type { CSSProperties } from 'react';
import { MARK_POLYGONS, MARK_VECTORS, MARK_VIEWBOX } from '@/components/brand/brand-mark';

/**
 * First-visit intro: the ViraWeb mark assembles from scattered shards, the
 * wordmark rises, then the curtain wipes up. Rendered on the server and driven
 * entirely by CSS (see `.intro*` in globals.css) — hidden unless the inline
 * layout script flags html[data-intro="play"].
 */
export function IntroOverlay() {
  const word = Array.from('ViraWeb');

  return (
    <div className="intro" aria-hidden="true">
      <div className="flex flex-col items-center gap-7">
        <svg
          viewBox={`0 0 ${MARK_VIEWBOX.width} ${MARK_VIEWBOX.height}`}
          className="w-24 overflow-visible sm:w-32"
          focusable="false"
        >
          {MARK_POLYGONS.map((polygon, i) => {
            const vector = MARK_VECTORS[i];
            const style = {
              '--dx': `${vector.x * 900}px`,
              '--dy': `${vector.y * 900}px`,
              '--rot': `${(i % 2 === 0 ? -1 : 1) * (60 + i * 11)}deg`,
              '--delay': `${i * 38}ms`,
            } as CSSProperties;
            return (
              <polygon
                key={polygon.points}
                className="intro-poly"
                style={style}
                points={polygon.points}
                fill={polygon.fill}
                stroke={polygon.fill}
                strokeWidth={1}
                strokeLinejoin="round"
              />
            );
          })}
        </svg>

        <p className="intro-word overflow-hidden font-brand text-2xl tracking-[-0.02em] text-ink sm:text-3xl">
          {word.map((char, i) => (
            <span key={i} className={i < 4 ? 'font-bold' : 'font-light'} style={{ '--i': i } as CSSProperties}>
              {char}
            </span>
          ))}
        </p>

        <div className="h-px w-40 bg-line">
          <div className="intro-progress h-px w-full bg-ink" />
        </div>
      </div>
    </div>
  );
}
