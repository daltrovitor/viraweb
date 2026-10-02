// Hello World
'use client';

import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { brl, type AppointmentStatus, type OdontoCopy } from '@/components/odonto/odonto-copy';
import { Tooth, UPPER_TEETH } from '@/components/odonto/tooth';

type FlowCopy = OdontoCopy['flow'];

const STATUS_STYLE: Record<AppointmentStatus, string> = {
  scheduled: 'bg-[#f1f3f6] text-[#334155] border-[#94a3b8]',
  confirmed: 'bg-[#e0f0fa] text-[#075985] border-[#0369a1]',
  arrived: 'bg-[#fdf3dc] text-[#7c4a03] border-[#b7791f]',
  inTreatment: 'bg-[#ece9fb] text-[#4c1d95] border-[#6d28d9]',
  finished: 'bg-[#e3f4ea] text-[#14532d] border-[#15803d]',
  missed: 'bg-[#fbe7e7] text-[#7f1d1d] border-[#b91c1c]',
  cancelled: 'bg-[#f4f4f5] text-[#52525b] border-[#a1a1aa] line-through',
};

const DOT_STYLE: Record<AppointmentStatus, string> = {
  scheduled: 'bg-[#94a3b8]',
  confirmed: 'bg-[#0369a1]',
  arrived: 'bg-[#b7791f]',
  inTreatment: 'bg-[#6d28d9]',
  finished: 'bg-[#15803d]',
  missed: 'bg-[#b91c1c]',
  cancelled: 'bg-[#a1a1aa]',
};

interface Appointment {
  name: string;
  day: number;
  /** Half-hour slot index from 08:00. */
  slot: number;
  span: number;
  status: AppointmentStatus;
}

const APPOINTMENTS: Appointment[] = [
  { name: 'Beatriz V.', day: 0, slot: 0, span: 2, status: 'finished' },
  { name: 'Otávio R.', day: 0, slot: 4, span: 2, status: 'finished' },
  { name: 'Caio B.', day: 1, slot: 1, span: 2, status: 'inTreatment' },
  { name: 'Marina T.', day: 1, slot: 4, span: 2, status: 'cancelled' },
  { name: 'Henrique S.', day: 2, slot: 0, span: 2, status: 'arrived' },
  { name: 'Beatriz V.', day: 2, slot: 2, span: 1, status: 'confirmed' },
  { name: 'Otávio R.', day: 2, slot: 5, span: 2, status: 'missed' },
  { name: 'Luíza F.', day: 3, slot: 1, span: 2, status: 'confirmed' },
  { name: 'Caio B.', day: 3, slot: 4, span: 2, status: 'scheduled' },
  { name: 'Marina T.', day: 4, slot: 0, span: 3, status: 'scheduled' },
  { name: 'Henrique S.', day: 4, slot: 5, span: 2, status: 'confirmed' },
];

const HOURS = ['08h', '09h', '10h', '11h'];
const EASE = [0.16, 1, 0.3, 1] as const;

function PanelFrame({ title, aside, children, className }: { title: string; aside?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-sm border border-line bg-white shadow-[0_40px_90px_-55px_rgba(15,31,51,0.5)]', className)}>
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <p className="font-brand text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink">{title}</p>
        {aside ? <p className="font-mono text-[0.68rem] text-mute">{aside}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function AgendaPanel({ copy }: { copy: FlowCopy['agenda'] }) {
  const legend: AppointmentStatus[] = ['confirmed', 'arrived', 'inTreatment', 'finished', 'missed', 'cancelled'];

  return (
    <PanelFrame title={copy.title}>
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-[2.25rem_repeat(5,minmax(0,1fr))] gap-x-1.5">
          <span aria-hidden="true" />
          {copy.days.map((day, i) => (
            <span
              key={day}
              className={cn(
                'pb-2 text-center font-brand text-[0.66rem] font-semibold uppercase tracking-[0.1em]',
                i === 2 ? 'text-odonto' : 'text-mute',
              )}
            >
              {day}
            </span>
          ))}
        </div>
        <div className="relative grid grid-cols-[2.25rem_repeat(5,minmax(0,1fr))] grid-rows-[repeat(8,1.9rem)] gap-x-1.5 gap-y-1 sm:grid-rows-[repeat(8,2.2rem)]">
          {HOURS.map((hour, i) => (
            <span
              key={hour}
              className="font-mono text-[0.62rem] text-mute"
              style={{ gridColumn: 1, gridRow: `${i * 2 + 1} / span 2` }}
            >
              {hour}
            </span>
          ))}
          {Array.from({ length: 5 }, (_, day) => (
            <span
              key={`col-${day}`}
              aria-hidden="true"
              className={cn('rounded-[2px]', day === 2 ? 'bg-odonto-tint/70' : 'bg-surface')}
              style={{ gridColumn: day + 2, gridRow: '1 / span 8' }}
            />
          ))}
          {APPOINTMENTS.map((appointment, i) => (
            <motion.div
              key={`${appointment.name}-${appointment.day}-${appointment.slot}`}
              className={cn(
                'z-[1] overflow-hidden rounded-[2px] border-l-2 px-1.5 py-1 text-[0.62rem] leading-tight sm:text-[0.68rem]',
                STATUS_STYLE[appointment.status],
              )}
              style={
                {
                  gridColumn: appointment.day + 2,
                  gridRow: `${appointment.slot + 1} / span ${appointment.span}`,
                } as CSSProperties
              }
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.04 }}
            >
              <span className="block truncate font-medium">{appointment.name}</span>
              {appointment.span > 1 ? (
                <span className="hidden truncate opacity-90 sm:block">{copy.statuses[appointment.status]}</span>
              ) : null}
            </motion.div>
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-3">
          {legend.map((status) => (
            <li key={status} className="flex items-center gap-1.5 text-[0.66rem] text-ink-soft">
              <span aria-hidden="true" className={cn('size-2 rounded-[1px]', DOT_STYLE[status])} />
              {copy.statuses[status]}
            </li>
          ))}
        </ul>
      </div>
    </PanelFrame>
  );
}

const QUOTE_TEETH = [12, 11, 21, 22];

export function BudgetPanel({ copy }: { copy: FlowCopy['budget'] }) {
  const lines = [
    ...QUOTE_TEETH.map((tooth) => ({ key: String(tooth), tag: String(tooth), name: copy.procedure, price: 3850 })),
    { key: 'none', tag: '—', name: `${copy.prophylaxis} · ${copy.noRegion}`, price: 300 },
  ];
  const total = lines.reduce((sum, line) => sum + line.price, 0);

  return (
    <PanelFrame title={copy.title}>
      <div className="px-4 pt-5 pb-2 sm:px-5">
        <div className="grid grid-cols-10 gap-1">
          {UPPER_TEETH.map((tooth) => {
            const selected = QUOTE_TEETH.includes(tooth);
            return (
              <div key={tooth} className="flex flex-col items-center gap-1.5">
                <span className="block w-5 sm:w-6">
                  <Tooth id={tooth} selected={selected} />
                </span>
                <span className={cn('font-mono text-[0.62rem]', selected ? 'font-semibold text-odonto' : 'text-mute')}>
                  {tooth}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t border-line px-4 py-3 sm:px-5">
        <p className="mb-2 font-brand text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-mute">{copy.linked}</p>
        <ul>
          {lines.map((line, i) => (
            <motion.li
              key={line.key}
              className="flex items-center gap-3 border-b border-line/70 py-2 text-[0.78rem] last:border-b-0"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.07 }}
            >
              <span className="grid h-6 min-w-8 place-items-center rounded-[2px] bg-surface font-mono text-[0.66rem] text-ink-soft">
                {line.tag}
              </span>
              <span className="flex-1 truncate text-ink">{line.name}</span>
              <span className="font-mono text-[0.72rem] tabular-nums text-ink-soft">{brl(line.price)}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-4 sm:px-5">
        <span className="font-brand text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-mute">{copy.total}</span>
        <span className="font-brand text-xl font-bold tabular-nums text-ink">{brl(total)}</span>
      </div>
    </PanelFrame>
  );
}

export function InstallmentsPanel({ copy }: { copy: FlowCopy['installments'] }) {
  const count = 12;
  const total = 15700;
  const value = Math.floor((total / count) * 100) / 100;
  const paidCount = 2;
  const received = total - value * (count - paidCount);
  const receivable = total - received;

  const rows = [
    { n: 1, status: 'paid' as const },
    { n: 2, status: 'paid' as const },
    ...copy.dueDates.map((date, i) => ({ n: i + 3, status: 'due' as const, date })),
  ];

  return (
    <PanelFrame title={copy.title} aside={`${count} × ${brl(value)}`}>
      <div className="px-4 pt-4 sm:px-5">
        <div className="h-1 w-full overflow-hidden rounded-[1px] bg-surface-2">
          <motion.div
            className="h-full origin-left bg-odonto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: paidCount / count }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          />
        </div>
        <ul className="mt-3">
          {rows.map((row, i) => (
            <motion.li
              key={row.n}
              className="flex items-center gap-4 border-b border-line/70 py-2.5 text-[0.78rem]"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
            >
              <span className="w-6 font-mono text-[0.68rem] text-mute">{row.n}ª</span>
              <span className="flex-1 tabular-nums text-ink">{brl(i === 0 ? received - value * (paidCount - 1) : value)}</span>
              {row.status === 'paid' ? (
                <span className="rounded-[2px] bg-[#e3f4ea] px-2 py-0.5 text-[0.66rem] font-semibold text-[#14532d]">{copy.paid}</span>
              ) : (
                <span className="text-[0.68rem] text-mute">{copy.due(row.date)}</span>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
      <dl className="grid grid-cols-3 gap-2 px-4 py-4 sm:px-5">
        {[
          { label: copy.received, amount: received, tone: 'text-[#14532d]' },
          { label: copy.receivable, amount: receivable, tone: 'text-odonto' },
          { label: copy.overdue, amount: 0, tone: 'text-ink-soft' },
        ].map((item) => (
          <div key={item.label} className="flex flex-col-reverse">
            <dt className="mt-1 font-brand text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-mute">{item.label}</dt>
            <dd className={cn('font-brand text-[0.92rem] font-bold tabular-nums sm:text-base', item.tone)}>{brl(item.amount)}</dd>
          </div>
        ))}
      </dl>
    </PanelFrame>
  );
}
