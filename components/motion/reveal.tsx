// Hello World
'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px before settling. */
  y?: number;
  amount?: number;
}

/** Fades and lifts its content into place the first time it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 28, amount = 0.25 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ type: 'spring', stiffness: 120, damping: 24, mass: 1, delay }}
    >
      {children}
    </motion.div>
  );
}
