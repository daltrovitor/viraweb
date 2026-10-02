// Hello World
'use client';

import { useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
import { cn } from '@/lib/utils';
import type { OdontoCopy } from '@/components/odonto/odonto-copy';
import { AgendaPanel, BudgetPanel, InstallmentsPanel } from '@/components/odonto/flow-panels';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PIN_LENGTH = 2.4; // viewport heights of scroll the story stays pinned for

/**
 * "One flow" story. Desktop: the block pins while scrolling advances the step
 * and morphs the product panel. Mobile / reduced space: steps stack, each with
 * its own panel.
 */
export function FlowStory({ copy }: { copy: OdontoCopy['flow'] }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const total = copy.steps.length;

  const panels: ReactNode[] = [
    <AgendaPanel key="agenda" copy={copy.agenda} />,
    <BudgetPanel key="budget" copy={copy.budget} />,
    <InstallmentsPanel key="installments" copy={copy.installments} />,
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * PIN_LENGTH}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = Math.min(total - 1, Math.floor(self.progress * total));
              setActive((current) => (current === next ? current : next));
            },
          },
        });
        timeline.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, ease: 'none' });
        triggerRef.current = timeline.scrollTrigger ?? null;

        return () => {
          triggerRef.current = null;
          setActive(0);
        };
      });
    },
    { scope: pinRef, dependencies: [total] },
  );

  const goTo = (index: number) => {
    const trigger = triggerRef.current;
    if (trigger) {
      const target = trigger.start + ((index + 0.5) / total) * (trigger.end - trigger.start);
      if (lenis) lenis.scrollTo(target, { duration: 1.2 });
      else window.scrollTo({ top: target, behavior: 'smooth' });
      return;
    }
    const panel = document.getElementById(`odonto-flow-panel-${index}`);
    if (panel) {
      if (lenis) lenis.scrollTo(panel, { offset: -96, duration: 1.2 });
      else panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <div
        ref={pinRef}
        className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-12 px-4 py-20 sm:px-8 lg:min-h-[100svh] lg:items-center lg:gap-x-10 lg:px-12 lg:py-[calc(var(--nav-h)+1.5rem)]"
      >
        <div className="col-span-12 lg:col-span-5">
          <h3 className="font-brand text-[clamp(2rem,3.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
            {copy.title}
          </h3>
          <p className="mt-4 text-base text-ink-soft sm:text-lg">{copy.lede}</p>

          <div className="mt-8 hidden h-px w-full bg-line lg:block" aria-hidden="true">
            <div ref={barRef} className="h-px w-full origin-left scale-x-0 bg-odonto" />
          </div>

          <ol className="mt-6 space-y-2 lg:mt-4">
            {copy.steps.map((step, index) => {
              const isActive = active === index;
              return (
                <li key={step.title} className={cn('border-l-2 pl-5 transition-colors duration-500', isActive ? 'border-odonto' : 'border-line')}>
                  <h4>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={isActive ? 'step' : undefined}
                      className="group flex min-h-12 w-full cursor-pointer items-baseline gap-4 py-2 text-left"
                    >
                      <span className={cn('font-mono text-[0.72rem] transition-colors duration-500', isActive ? 'text-odonto' : 'text-mute')}>
                        0{index + 1}
                      </span>
                      <span
                        className={cn(
                          'font-brand text-lg font-semibold tracking-[-0.015em] transition-colors duration-500 sm:text-xl',
                          isActive ? 'text-ink' : 'text-ink lg:text-mute lg:group-hover:text-ink',
                        )}
                      >
                        {step.title}
                      </span>
                    </button>
                  </h4>
                  <div
                    className={cn(
                      'grid transition-[grid-template-rows] duration-700 ease-out-expo',
                      isActive ? 'grid-rows-[1fr]' : 'grid-rows-[1fr] lg:grid-rows-[0fr]',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[48ch] pb-4 pl-9 text-[0.95rem] leading-relaxed text-ink-soft">{step.body}</p>
                    </div>
                  </div>
                  <div id={`odonto-flow-panel-${index}`} className="mb-8 lg:hidden">
                    {panels[index]}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="relative hidden lg:col-span-7 lg:block">
          <div className="relative min-h-[520px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                className="absolute inset-x-0 top-1/2"
                initial={{ opacity: 0, y: '-42%', scale: 0.97 }}
                animate={{ opacity: 1, y: '-50%', scale: 1 }}
                exit={{ opacity: 0, y: '-58%', scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 170, damping: 26 }}
              >
                {panels[active]}
              </motion.div>
            </AnimatePresence>
            <p className="absolute -bottom-2 right-0 font-mono text-[0.72rem] text-mute" aria-hidden="true">
              0{active + 1} / 0{total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
