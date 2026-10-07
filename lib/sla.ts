// Hello World
import { TZDate } from '@date-fns/tz';

export const SLA_TIMEZONE = 'America/Sao_Paulo';

/** Holidays as 'YYYY-MM-DD' strings (São Paulo calendar), configured in Operations. */
export type HolidaySet = ReadonlySet<string>;

function ymd(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function isBusinessDay(d: Date, holidays: HolidaySet): boolean {
  const day = d.getDay();
  return day !== 0 && day !== 6 && !holidays.has(ymd(d));
}

/**
 * Deadline = `days` business days after `start`, keeping the time of day.
 * A start that falls on a non-business day counts from the next business day's
 * start of day, so weekend/holiday orders never get an artificially short SLA.
 */
export function calcDeadline(start: Date, days: number, holidays: HolidaySet = new Set()): Date {
  const cursor = new TZDate(start.getTime(), SLA_TIMEZONE);
  if (!isBusinessDay(cursor, holidays)) {
    while (!isBusinessDay(cursor, holidays)) cursor.setDate(cursor.getDate() + 1);
    cursor.setHours(0, 0, 0, 0);
  }
  let remaining = days;
  while (remaining > 0) {
    cursor.setDate(cursor.getDate() + 1);
    if (isBusinessDay(cursor, holidays)) remaining -= 1;
  }
  return new Date(cursor.getTime());
}

/** Business days from `now` until `deadline` (0 = today, negative = overdue). */
export function businessDaysUntil(deadline: Date, now: Date, holidays: HolidaySet = new Set()): number {
  const a = new TZDate(now.getTime(), SLA_TIMEZONE);
  const b = new TZDate(deadline.getTime(), SLA_TIMEZONE);
  if (b.getTime() < a.getTime()) return -1;
  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);
  let count = 0;
  while (a.getTime() < b.getTime()) {
    a.setDate(a.getDate() + 1);
    if (isBusinessDay(a, holidays)) count += 1;
  }
  return count;
}

export type SlaState = 'on_time' | 'near' | 'overdue';

export function slaStatus(deadline: Date, now: Date, holidays: HolidaySet = new Set()) {
  if (deadline.getTime() < now.getTime()) {
    return { state: 'overdue' as SlaState, label: 'Atrasado' };
  }
  const left = businessDaysUntil(deadline, now, holidays);
  if (left === 0) return { state: 'near' as SlaState, label: 'Entrega hoje' };
  return {
    state: (left <= 1 ? 'near' : 'on_time') as SlaState,
    label: `Entrega em ${left} dia${left > 1 ? 's' : ''} útil${left > 1 ? 'eis' : ''}`.replace('útileis', 'úteis'),
  };
}
