// Hello World
'use client';

import { useEffect, type CSSProperties } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { MARK_POLYGONS, MARK_VECTORS, MARK_VIEWBOX } from '@/components/brand/brand-mark';
import { cn } from '@/lib/utils';

const POINTER_SPRING = { stiffness: 90, damping: 18, mass: 0.7 };

interface PieceProps {
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  spread: MotionValue<number>;
}

function MarkPiece({ index, pointerX, pointerY, spread }: PieceProps) {
  const polygon = MARK_POLYGONS[index];
  const vector = MARK_VECTORS[index];
  // Farther shards sit "closer" to the viewer and travel more.
  const depth = 0.35 + (vector.distance / 420) * 0.9 + (index % 3) * 0.12;
  const turn = (index % 2 === 0 ? -1 : 1) * (18 + index * 4);

  const x = useTransform(() => pointerX.get() * 46 * depth + vector.x * spread.get() * 340 * depth);
  const y = useTransform(() => pointerY.get() * 46 * depth + vector.y * spread.get() * 340 * depth);
  const rotate = useTransform(() => spread.get() * turn + pointerX.get() * 6 * depth);

  const enter = {
    '--dx': `${vector.x * 520}px`,
    '--dy': `${vector.y * 520}px`,
    '--rot': `${turn * 3}deg`,
    '--delay': `${index * 45}ms`,
  } as CSSProperties;

  return (
    <g className="mark-enter" style={enter}>
      <motion.polygon
        points={polygon.points}
        fill={polygon.fill}
        stroke={polygon.fill}
        strokeWidth={1}
        strokeLinejoin="round"
        style={{ x, y, rotate, transformBox: 'fill-box', transformOrigin: 'center' }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      />
    </g>
  );
}

interface InteractiveMarkProps {
  className?: string;
}

/**
 * The ViraWeb mark as a living object: shards drift with the cursor at
 * different depths and break apart as the hero scrolls away.
 */
export function InteractiveMark({ className }: InteractiveMarkProps) {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, POINTER_SPRING);
  const pointerY = useSpring(rawY, POINTER_SPRING);

  const { scrollY } = useScroll();
  const scrollSpread = useTransform(scrollY, [0, 900], [0, 1], { clamp: true });
  const stillSpread = useMotionValue(0);
  const spread = reduceMotion ? stillSpread : scrollSpread;

  useEffect(() => {
    if (reduceMotion) return;
    const finePointer = window.matchMedia('(pointer: fine)');
    if (!finePointer.matches) return;

    const handleMove = (event: PointerEvent) => {
      rawX.set(event.clientX / window.innerWidth - 0.5);
      rawY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [rawX, rawY, reduceMotion]);

  return (
    <svg
      viewBox={`0 0 ${MARK_VIEWBOX.width} ${MARK_VIEWBOX.height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={cn('block h-auto w-full overflow-visible', className)}
      role="img"
      aria-label="ViraWeb"
      focusable="false"
    >
      {MARK_POLYGONS.map((polygon, index) => (
        <MarkPiece key={polygon.points} index={index} pointerX={pointerX} pointerY={pointerY} spread={spread} />
      ))}
    </svg>
  );
}
