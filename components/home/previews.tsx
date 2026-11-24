// Hello World
'use client';

import type { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';

export type PreviewKind = 'landing' | 'whatsapp' | 'dashboard';

/**
 * Product previews drawn as real interface fragments (no images, no extra bytes).
 * Every block carries the `item` variant: a parent that sets
 * `initial="hidden" animate="show"` assembles the interface piece by piece.
 */

const SPRING = { type: 'spring', stiffness: 300, damping: 28 } as const;

export const assemble: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: SPRING },
};

function B({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

const bar = 'rounded-[2px] bg-line-strong/70';

function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-sm border border-line-strong bg-white shadow-[0_24px_60px_-32px_rgba(15,31,51,0.35)]">
      <div className="flex items-center gap-3 border-b border-line bg-surface px-3 py-2">
        <span className="flex gap-1" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-line-strong" />
          <span className="size-1.5 rounded-full bg-line-strong" />
          <span className="size-1.5 rounded-full bg-line-strong" />
        </span>
        <span className="truncate rounded-[2px] bg-white px-2 py-0.5 font-mono text-[9px] text-mute">{url}</span>
      </div>
      <motion.div variants={assemble} className="relative flex-1 overflow-hidden p-3 sm:p-4">
        {children}
      </motion.div>
    </div>
  );
}

function PhoneFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto flex h-full w-[min(100%,15rem)] flex-col overflow-hidden rounded-md border border-line-strong bg-white shadow-[0_24px_60px_-32px_rgba(15,31,51,0.35)]">
      <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-2.5">
        <span className="grid size-5 place-items-center rounded-[2px] bg-ink font-mono text-[8px] font-semibold text-white">VW</span>
        <span className="text-[10px] font-medium text-ink">{title}</span>
      </div>
      <motion.div variants={assemble} className="flex flex-1 flex-col gap-2 overflow-hidden p-3">
        {children}
      </motion.div>
    </div>
  );
}

function Bubble({ from, children }: { from: 'bot' | 'user'; children: ReactNode }) {
  return (
    <B
      className={cn(
        'max-w-[82%] rounded-sm px-2.5 py-1.5 text-[10px] leading-snug',
        from === 'bot' ? 'self-start bg-surface-2 text-ink' : 'self-end bg-ink text-white',
      )}
    >
      {children}
    </B>
  );
}

function Landing() {
  return (
    <BrowserFrame url="Página do curso">
      <B className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-ink">Lançamento</span>
        <span className="flex gap-2">
          <span className={cn(bar, 'h-1 w-6')} />
          <span className={cn(bar, 'h-1 w-6')} />
        </span>
      </B>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-3 flex flex-col gap-2">
          <B className="text-[clamp(0.85rem,2.4vw,1.25rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            Aprenda no seu ritmo.
          </B>
          <B className="text-[9px] leading-snug text-mute">Aulas ao vivo, método próprio e certificado.</B>
          <B className="mt-1 inline-flex w-fit items-center rounded-[2px] bg-brand px-2.5 py-1.5 text-[9px] font-medium text-white">
            Conhecer o curso
          </B>
        </div>
        <B className="col-span-2 aspect-[4/5] rounded-sm bg-brand-tint" />
      </div>
      <div className="mt-4 flex gap-2">
        {[0, 1, 2].map((i) => (
          <B key={i} className="h-8 flex-1 rounded-[2px] bg-surface" />
        ))}
      </div>
    </BrowserFrame>
  );
}

function WhatsApp() {
  return (
    <PhoneFrame title="ViraBot · WhatsApp">
      <Bubble from="user">Oi! Tem horário sábado?</Bubble>
      <Bubble from="bot">Oi, Júlia! Sábado temos 9h, 11h e 14h. Qual prefere?</Bubble>
      <Bubble from="user">11h</Bubble>
      <Bubble from="bot">Pronto ✓ Sábado, 11h. Te lembro na sexta.</Bubble>
      <B className="mt-auto flex items-center gap-2 rounded-[2px] border border-line px-2 py-1.5 text-[9px] text-mute">
        Mensagem
      </B>
    </PhoneFrame>
  );
}

const BARS = [38, 52, 46, 64, 58, 72, 68, 84, 79, 92];

function Dashboard() {
  return (
    <BrowserFrame url="Acompanhamento comercial">
      <div className="grid grid-cols-3 gap-2">
        {[
          ['Contatos', '128', '+12%'],
          ['Propostas', '42', '+8%'],
          ['Vendas', '15', '+3%'],
        ].map(([label, value, delta]) => (
          <B key={label} className="rounded-[2px] border border-line p-2">
            <span className="block font-mono text-[8px] uppercase tracking-[0.1em] text-mute">{label}</span>
            <span className="mt-1 block text-[clamp(0.7rem,1.8vw,0.95rem)] font-semibold tracking-[-0.03em] text-ink">{value}</span>
            <span className="font-mono text-[8px] text-[#15803d]">{delta}</span>
          </B>
        ))}
      </div>
      <B className="mt-3 flex h-24 items-end gap-1.5 border-b border-line pb-1">
        {BARS.map((h, i) => (
          <span key={i} className={cn('flex-1 rounded-t-[2px]', i === BARS.length - 1 ? 'bg-brand' : 'bg-brand-tint')} style={{ height: `${h}%` }} />
        ))}
      </B>
      <B className="mt-1.5 flex justify-between font-mono text-[8px] text-mute">
        <span>jan</span>
        <span>out</span>
      </B>
    </BrowserFrame>
  );
}

const RENDER: Record<PreviewKind, () => ReactNode> = {
  landing: () => <Landing />,
  whatsapp: () => <WhatsApp />,
  dashboard: () => <Dashboard />,
};

interface ProductPreviewProps {
  kind: PreviewKind;
  className?: string;
  /**
   * Assemble the interface piece by piece: `true` on mount, `'inView'` the
   * first time it scrolls into the viewport.
   */
  animate?: boolean | 'inView';
}

/** Decorative interface preview; the surrounding copy names the product for assistive tech. */
export function ProductPreview({ kind, className, animate = false }: ProductPreviewProps) {
  const onView = animate === 'inView';
  return (
    <motion.div
      aria-hidden="true"
      className={cn('h-full w-full select-none', className)}
      variants={assemble}
      initial={animate ? 'hidden' : false}
      animate={animate === true ? 'show' : undefined}
      whileInView={onView ? 'show' : undefined}
      viewport={onView ? { once: true, amount: 0.4 } : undefined}
    >
      {RENDER[kind]()}
    </motion.div>
  );
}
