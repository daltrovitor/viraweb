// Hello World
import { describe, expect, it } from 'vitest';
import { calcDeadline, slaStatus } from '@/lib/sla';

// São Paulo is UTC-3 (no DST since 2019): 12:00Z = 09:00 local.
const at = (iso: string) => new Date(iso);

describe('calcDeadline', () => {
  it('adds 2 business days on a weekday', () => {
    // Mon 2026-03-02 09:00 → Wed 2026-03-04 09:00
    expect(calcDeadline(at('2026-03-02T12:00:00Z'), 2).toISOString()).toBe('2026-03-04T12:00:00.000Z');
  });

  it('skips the weekend', () => {
    // Thu 2026-03-05 → Mon 2026-03-09
    expect(calcDeadline(at('2026-03-05T12:00:00Z'), 2).toISOString()).toBe('2026-03-09T12:00:00.000Z');
  });

  it('starts counting from Monday when paid on Saturday', () => {
    // Sat 2026-03-07 15:00 → Mon 00:00 start → Wed 2026-03-11 00:00 local
    expect(calcDeadline(at('2026-03-07T18:00:00Z'), 2).toISOString()).toBe('2026-03-11T03:00:00.000Z');
  });

  it('skips configured holidays', () => {
    // Mon 2026-03-02 with Tue 03-03 holiday → Thu 2026-03-05
    const holidays = new Set(['2026-03-03']);
    expect(calcDeadline(at('2026-03-02T12:00:00Z'), 2, holidays).toISOString()).toBe('2026-03-05T12:00:00.000Z');
  });
});

describe('slaStatus', () => {
  it('flags overdue orders', () => {
    expect(slaStatus(at('2026-03-04T12:00:00Z'), at('2026-03-05T12:00:00Z')).state).toBe('overdue');
  });

  it('says "Entrega hoje" on the deadline day', () => {
    expect(slaStatus(at('2026-03-04T20:00:00Z'), at('2026-03-04T12:00:00Z')).label).toBe('Entrega hoje');
  });

  it('labels 1 business day', () => {
    expect(slaStatus(at('2026-03-04T12:00:00Z'), at('2026-03-03T12:00:00Z')).label).toBe('Entrega em 1 dia útil');
  });
});
