// Hello World
'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';

const STEPS = [
  { time: '09:00', title: 'Você envia sua ideia', note: 'Briefing guiado, em linguagem natural.' },
  { time: '09:10', title: 'Pedido confirmado', note: 'Pagamento validado pelo Stripe, prazo calculado na hora.' },
  { time: 'Produção', title: 'A fábrica constrói', note: 'Especificação, interface, código e testes.' },
  { time: 'Entrega', title: '≤ 2 dias úteis', note: 'Publicado, revisado e com o link na sua área.' },
];

export function SpeedTimeline() {
  const list = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 55%'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 1 : 0, 1]);

  return (
    <section aria-labelledby="speed-title" className="border-t border-line bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-14 px-4 sm:px-8 lg:px-12">
        <div className="col-span-12 lg:col-span-6">
          <p aria-hidden="true" className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">(03)</p>
          <SplitWords
            id="speed-title"
            className="mt-6 text-[clamp(2rem,4.6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink"
            parts={[
              'Enquanto outros ainda estão fazendo orçamento,',
              { text: 'o seu já está sendo construído.', className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' },
            ]}
          />
          <Reveal className="mt-8 max-w-[42ch]">
            <p className="text-ink-soft">
              O prazo de até 2 dias úteis vale para produtos <strong className="font-semibold text-ink">Standard</strong> do catálogo,
              contado a partir do pagamento confirmado e do briefing completo, em horário de Brasília. Projetos Custom e Enterprise têm
              prazo definido após análise.
            </p>
          </Reveal>
        </div>

        <ol ref={list} className="relative col-span-12 lg:col-span-5 lg:col-start-8">
          <span aria-hidden="true" className="absolute bottom-3 left-[5.5rem] top-3 w-px bg-line sm:left-[7rem]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute bottom-3 left-[5.5rem] top-3 w-px origin-top bg-ink sm:left-[7rem]"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[5.5rem_1fr] gap-x-6 pb-12 last:pb-0 sm:grid-cols-[7rem_1fr]">
              <span className="pt-1 font-mono text-[0.8rem] tabular-nums text-mute">{step.time}</span>
              <span
                aria-hidden="true"
                className="absolute left-[5.5rem] top-2 size-2.5 -translate-x-1/2 rounded-[2px] border border-ink bg-white sm:left-[7rem]"
              />
              <Reveal delay={i * 0.05} y={16}>
                <p className="text-[clamp(1.35rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.04em] text-ink">{step.title}</p>
                <p className="mt-2 text-ink-soft">{step.note}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
