// Hello World
'use client';

import { useEffect, useId, useState } from 'react';
import { motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { cn } from '@/lib/utils';

interface CategoryRailProps {
  categories: Array<{ id: string; label: string; count: number }>;
}

/** Sticky category index that follows the reader through the catalog. */
export function CategoryRail({ categories }: CategoryRailProps) {
  const [active, setActive] = useState(categories[0]?.id ?? '');
  const lenis = useLenis();
  const indicatorId = useId();

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <nav aria-label="Categorias" className="sticky top-[var(--nav-h)] z-30 -mx-4 border-b border-line bg-white/95 backdrop-blur-md sm:-mx-8 lg:-mx-12">
      <ul className="scrollbar-none flex gap-1 overflow-x-auto px-4 sm:px-8 lg:px-12" data-lenis-prevent>
        {categories.map((category) => {
          const selected = active === category.id;
          return (
            <li key={category.id} className="shrink-0">
              <a
                href={`#${category.id}`}
                aria-current={selected ? 'true' : undefined}
                onClick={(event) => {
                  if (!lenis) return;
                  event.preventDefault();
                  lenis.scrollTo(`#${category.id}`, { offset: -140 });
                  history.replaceState(null, '', `#${category.id}`);
                }}
                className={cn(
                  'relative flex min-h-12 items-center gap-2 px-3 text-[0.9rem] font-medium transition-colors',
                  selected ? 'text-ink' : 'text-mute hover:text-ink',
                )}
              >
                {category.label}
                <span className="font-mono text-[0.68rem] text-mute">{category.count}</span>
                {selected ? (
                  <motion.span
                    layoutId={indicatorId}
                    className="absolute inset-x-3 bottom-0 h-[2px] bg-brand"
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  />
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
