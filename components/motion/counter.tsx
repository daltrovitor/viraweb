// Hello World
'use client';

import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react';

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  /** Thousands separator, e.g. '.' for pt-BR. Omit for none. */
  separator?: string;
}

const group = (n: number, separator?: string) =>
  separator ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, separator) : String(n);

/**
 * Server-renders the final value (crawlers and no-JS readers see real numbers),
 * then counts up from zero the first time it scrolls into view.
 */
export function Counter({ value, prefix = '', suffix = '', className, duration = 1.6, separator }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const primed = useRef(false);
  const count = useMotionValue(value);
  const display = useTransform(count, (latest) => `${prefix}${group(Math.round(latest), separator)}${suffix}`);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion) return;
    const rect = node.getBoundingClientRect();
    const visibleAtMount = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visibleAtMount) {
      count.set(0);
      primed.current = true;
    }
  }, [count, reduceMotion]);

  useEffect(() => {
    if (!inView || !primed.current) return;
    const controls = animate(count, value, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, count, value, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
