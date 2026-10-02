// Hello World
'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';
import { brl, type OdontoCopy } from '@/components/odonto/odonto-copy';
import { Tooth, UPPER_TEETH, type ToothId } from '@/components/odonto/tooth';

interface QuoteLine {
  tooth: ToothId;
  procedureId: string;
}

const INITIAL_LINES: QuoteLine[] = [
  { tooth: 12, procedureId: 'emax' },
  { tooth: 11, procedureId: 'emax' },
  { tooth: 21, procedureId: 'emax' },
];

const byArchOrder = (a: QuoteLine, b: QuoteLine) => UPPER_TEETH.indexOf(a.tooth) - UPPER_TEETH.indexOf(b.tooth);

/** Interactive quote builder: pick a procedure, tap teeth, watch the total settle. */
export function OdontogramBuilder({ copy }: { copy: OdontoCopy['builder'] }) {
  const groupName = useId();
  const [procedureId, setProcedureId] = useState(copy.procedures[0].id);
  const [lines, setLines] = useState<QuoteLine[]>(INITIAL_LINES);

  const priceOf = useMemo(() => {
    const table = new Map(copy.procedures.map((procedure) => [procedure.id, procedure]));
    return (id: string) => table.get(id) ?? copy.procedures[0];
  }, [copy.procedures]);

  const total = lines.reduce((sum, line) => sum + priceOf(line.procedureId).price, 0);
  const animatedTotal = useMotionValue(total);
  const totalLabel = useTransform(animatedTotal, (value) => brl(value));

  useEffect(() => {
    const controls = animate(animatedTotal, total, { duration: 0.7, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [animatedTotal, total]);

  const toggleTooth = (tooth: ToothId) => {
    setLines((current) =>
      current.some((line) => line.tooth === tooth)
        ? current.filter((line) => line.tooth !== tooth)
        : [...current, { tooth, procedureId }].sort(byArchOrder),
    );
  };

  return (
    <div className="relative rounded-sm border border-line bg-white shadow-[0_40px_90px_-50px_rgba(15,31,51,0.45)]">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <p className="font-brand text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink">{copy.title}</p>
        <p className="text-[0.75rem] text-mute">{copy.arch}</p>
      </div>

      <fieldset className="border-b border-line px-5 py-4">
        <legend className="sr-only">{copy.procedureLabel}</legend>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
          {copy.procedures.map((procedure) => (
            <label
              key={procedure.id}
              className={cn(
                'relative flex min-h-12 cursor-pointer flex-col justify-center rounded-sm border px-3 py-2 transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-odonto',
                procedureId === procedure.id ? 'border-odonto bg-odonto-tint' : 'border-line hover:border-line-strong',
              )}
            >
              <input
                type="radio"
                name={groupName}
                value={procedure.id}
                checked={procedureId === procedure.id}
                onChange={() => setProcedureId(procedure.id)}
                className="sr-only"
              />
              <span className="text-[0.78rem] font-medium leading-tight text-ink">{procedure.name}</span>
              <span className="mt-0.5 font-mono text-[0.68rem] text-mute">{brl(procedure.price)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="px-5 pt-5 pb-3">
        <ul className="grid grid-cols-5 gap-x-1 gap-y-3 sm:grid-cols-10">
          {UPPER_TEETH.map((tooth) => {
            const selected = lines.some((line) => line.tooth === tooth);
            return (
              <li key={tooth}>
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-label={copy.tooth(tooth)}
                  onClick={() => toggleTooth(tooth)}
                  className="group flex min-h-12 w-full cursor-pointer flex-col items-center gap-1.5 rounded-sm py-1 transition-colors hover:bg-surface"
                >
                  <motion.span
                    className="block w-6 sm:w-7"
                    animate={{ y: selected ? -3 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  >
                    <Tooth id={tooth} selected={selected} />
                  </motion.span>
                  <span
                    className={cn(
                      'font-mono text-[0.68rem] tabular-nums transition-colors',
                      selected ? 'font-semibold text-odonto' : 'text-mute',
                    )}
                  >
                    {tooth}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-center text-[0.72rem] text-mute">{copy.hint}</p>
      </div>

      <div className="max-h-52 overflow-y-auto border-t border-line px-5 py-3" data-lenis-prevent>
        {lines.length === 0 ? (
          <p className="py-3 text-sm text-mute">{copy.empty}</p>
        ) : (
          <ul aria-live="polite">
            <AnimatePresence initial={false}>
              {lines.map((line) => {
                const procedure = priceOf(line.procedureId);
                return (
                  <motion.li
                    key={line.tooth}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    className="flex items-center gap-3 py-1.5 text-[0.8rem]"
                  >
                    <span className="grid h-6 min-w-8 place-items-center rounded-[2px] bg-surface font-mono text-[0.68rem] text-ink-soft">
                      {line.tooth}
                    </span>
                    <span className="flex-1 truncate text-ink">{procedure.name}</span>
                    <span className="font-mono text-[0.72rem] tabular-nums text-ink-soft">{brl(procedure.price)}</span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>

      <div className="flex items-end justify-between gap-4 border-t border-line px-5 py-4">
        <div>
          <p className="font-brand text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-mute">{copy.total}</p>
          <motion.p className="font-brand text-2xl font-bold tabular-nums tracking-[-0.02em] text-ink sm:text-[1.7rem]">
            {totalLabel}
          </motion.p>
          <p className="mt-0.5 text-[0.72rem] text-odonto">{copy.installments(brl(total / 10))}</p>
        </div>
        <button
          type="button"
          onClick={() => setLines([])}
          disabled={lines.length === 0}
          className="min-h-12 cursor-pointer rounded-sm px-3 text-[0.8rem] font-medium text-mute underline-offset-4 transition-colors hover:text-ink hover:underline disabled:cursor-not-allowed disabled:opacity-60"
        >
          {copy.clear}
        </button>
      </div>
    </div>
  );
}
