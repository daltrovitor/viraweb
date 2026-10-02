// Hello World
'use client';

import { motion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/i18n';

const VIEW = { once: true, amount: 0.4 } as const;
const EASE = [0.16, 1, 0.3, 1] as const;

// A paper-coloured cover shrinks toward the right edge, "typing" each line in.
const TYPE_LINE: Variants = {
  hidden: { scaleX: 1 },
  show: (i: number) => ({
    scaleX: 0,
    transition: { duration: 0.6, ease: EASE, delay: 0.15 + i * 0.12 },
  }),
};

/** 01 — Premium websites: a code editor whose lines type themselves in. */
export function CodeVisual() {
  const lines: Array<Array<[string, string]>> = [
    [['text-brand', 'export default'], ['text-ink', ' function '], ['text-brand', 'Home'], ['text-ink', '() {']],
    [['text-ink', '  const '], ['text-brand', 'leads'], ['text-ink', ' = '], ['text-brand', 'await'], ['text-ink', ' getLeads();']],
    [['text-ink', '  return (']],
    [['text-mute', '    <'], ['text-ink font-semibold', 'Hero'], ['text-mute', ' priority />']],
    [['text-mute', '    <'], ['text-ink font-semibold', 'Conversion'], ['text-mute', ' data={'], ['text-brand', 'leads'], ['text-mute', '} />']],
    [['text-ink', '  );']],
    [['text-ink', '}']],
  ];

  return (
    <div className="overflow-hidden rounded-sm border border-line bg-white font-mono text-[0.7rem] leading-6 sm:text-xs sm:leading-7">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-mute">
        <span>app/page.tsx</span>
        <span>TypeScript</span>
      </div>
            <motion.div className="px-4 py-3" initial="hidden" whileInView="show" viewport={VIEW}>
        {lines.map((tokens, i) => (
          <div key={i} className="relative flex whitespace-pre">
            <span className="mr-4 w-4 select-none text-right text-mute">{i + 1}</span>
            {tokens.map(([color, text], j) => (
              <span key={j} className={color}>
                {text}
              </span>
            ))}
            <motion.span aria-hidden="true" className="absolute inset-0 origin-right bg-white" custom={i} variants={TYPE_LINE} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/** 02 — Custom systems: an ERP board with bars that grow into place. */
export function SystemVisual({ language }: { language: Language }) {
  const labels = {
    pt: { title: 'Operação — semana', orders: 'Pedidos', revenue: 'Receita', rows: ['Pedido #1042', 'Pedido #1041', 'Pedido #1040'], status: ['Faturado', 'Em produção', 'Aprovado'] },
    en: { title: 'Operations — week', orders: 'Orders', revenue: 'Revenue', rows: ['Order #1042', 'Order #1041', 'Order #1040'], status: ['Invoiced', 'In production', 'Approved'] },
    es: { title: 'Operación — semana', orders: 'Pedidos', revenue: 'Ingresos', rows: ['Pedido #1042', 'Pedido #1041', 'Pedido #1040'], status: ['Facturado', 'En producción', 'Aprobado'] },
  }[language];
  const bars = [42, 64, 51, 78, 69, 88, 96];

  return (
    <div className="rounded-sm border border-white/10 bg-white/[0.04] p-4 text-white sm:p-5">
      <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/70">
        <span>{labels.title}</span>
        <span>{labels.revenue}</span>
      </div>
      <div className="mt-4 flex h-24 items-end gap-2 sm:h-28">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className={cn('flex-1 origin-bottom rounded-[2px]', i === bars.length - 1 ? 'bg-white' : 'bg-white/25')}
            style={{ height: `${height}%` }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={VIEW}
            transition={{ type: 'spring', stiffness: 140, damping: 20, delay: 0.1 + i * 0.06 }}
          />
        ))}
      </div>
      <ul className="mt-4 divide-y divide-white/10 border-t border-white/10 text-[0.78rem]">
        {labels.rows.map((row, i) => (
          <li key={row} className="flex items-center justify-between py-2">
            <span className="text-white/85">{row}</span>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/70">{labels.status[i]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 03 — WhatsApp AI: a short conversation that plays out in sequence. */
export function ChatVisual({ language }: { language: Language }) {
  const messages = {
    pt: [
      { from: 'client', text: 'Oi! Vocês atendem sábado?' },
      { from: 'bot', text: 'Atendemos sim, das 8h às 12h. Quer que eu reserve um horário?' },
      { from: 'client', text: 'Quero, às 9h.' },
      { from: 'bot', text: 'Pronto! Sábado, 9h, confirmado. Te lembro na sexta.' },
    ],
    en: [
      { from: 'client', text: 'Hi! Are you open on Saturday?' },
      { from: 'bot', text: 'We are, from 8am to noon. Shall I book a slot for you?' },
      { from: 'client', text: 'Yes, 9am please.' },
      { from: 'bot', text: 'Done! Saturday, 9am, confirmed. I will remind you on Friday.' },
    ],
    es: [
      { from: 'client', text: '¡Hola! ¿Atienden el sábado?' },
      { from: 'bot', text: 'Sí, de 8h a 12h. ¿Quiere que le reserve un horario?' },
      { from: 'client', text: 'Sí, a las 9h.' },
      { from: 'bot', text: '¡Listo! Sábado, 9h, confirmado. Le recuerdo el viernes.' },
    ],
  }[language];

  return (
    <div className="flex flex-col gap-2.5 rounded-sm border border-white/15 bg-white/[0.06] p-4 sm:p-5">
      {messages.map((message, i) => (
        <motion.p
          key={message.text}
          className={cn(
            'max-w-[85%] rounded-sm px-3.5 py-2.5 text-[0.8rem] leading-snug sm:text-sm',
            message.from === 'client' ? 'self-end bg-white text-ink' : 'self-start bg-ink text-white',
          )}
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VIEW}
          transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.2 + i * 0.45 }}
        >
          {message.text}
        </motion.p>
      ))}
    </div>
  );
}

/** 04 — Local SEO: a map grid with your pin climbing to the top of the list. */
export function MapVisual({ language }: { language: Language }) {
  const labels = {
    pt: { query: 'dentista perto de mim', you: 'Sua empresa', other: ['Concorrente A', 'Concorrente B'] },
    en: { query: 'dentist near me', you: 'Your business', other: ['Competitor A', 'Competitor B'] },
    es: { query: 'dentista cerca de mí', you: 'Su empresa', other: ['Competidor A', 'Competidor B'] },
  }[language];

  return (
    <div className="overflow-hidden rounded-sm border border-line bg-white">
      <div className="border-b border-line px-4 py-2.5 font-mono text-[0.7rem] text-mute">
        <span aria-hidden="true">⌕ </span>
        {labels.query}
      </div>
      <div
        className="relative h-28 sm:h-32"
        style={{
          backgroundImage:
            'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        {[
          { left: '22%', top: '58%', active: false },
          { left: '68%', top: '30%', active: false },
          { left: '46%', top: '42%', active: true },
        ].map((pin, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className={cn(
              'absolute block size-3.5 -translate-x-1/2 -translate-y-full rotate-45 rounded-[2px_2px_2px_0] border-2 border-white',
              pin.active ? 'bg-brand' : 'bg-line-strong',
            )}
            style={{ left: pin.left, top: pin.top }}
            initial={{ y: -24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={VIEW}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 + i * 0.15 }}
          />
        ))}
      </div>
      <ol className="divide-y divide-line text-[0.8rem]">
        {[labels.you, ...labels.other].map((name, i) => (
          <motion.li
            key={name}
            className="flex items-center justify-between px-4 py-2"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 + i * 0.1 }}
          >
            <span className={i === 0 ? 'font-semibold text-ink' : 'text-ink-soft'}>
              {i + 1}. {name}
            </span>
            <span className="font-mono text-[0.68rem] text-mute">{['0,4 km', '1,2 km', '2,8 km'][i]}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
