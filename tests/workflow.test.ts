// Hello World
import { describe, expect, it } from 'vitest';
import { allowedActions, transitionPatch } from '@/lib/factory/workflow';
import type { OrderState } from '@/lib/factory/types';

const base: OrderState = {
  status: 'received',
  payment_status: 'paid',
  briefing_status: 'complete',
  production_status: 'queued',
  tier: 'standard',
  accepted_at: null,
  assigned_to: null,
  setup_price: 29700,
  delivery_url: null,
};

describe('allowedActions', () => {
  it('lets only admins accept a paid order', () => {
    expect(allowedActions(base, 'admin', 'a')).toContain('accept');
    expect(allowedActions(base, 'production', 'p')).not.toContain('accept');
    expect(allowedActions(base, 'support', 's')).toEqual([]);
  });

  it('never accepts unpaid standard orders', () => {
    expect(allowedActions({ ...base, payment_status: 'unpaid' }, 'admin', 'a')).not.toContain('accept');
  });

  it('lets the assigned producer start, review and deliver', () => {
    const accepted = { ...base, accepted_at: '2026-01-01', assigned_to: 'p' };
    expect(allowedActions(accepted, 'production', 'p')).toContain('start');
    expect(allowedActions(accepted, 'production', 'other')).not.toContain('start');
    const inReview = { ...accepted, status: 'in_review' as const, production_status: 'done' as const };
    expect(allowedActions(inReview, 'production', 'p')).toEqual(expect.arrayContaining(['deliver', 'rework']));
    expect(allowedActions(inReview, 'production', 'p')).not.toContain('approve');
  });

  it('offers a quote only for unpaid custom orders', () => {
    const custom = { ...base, tier: 'custom' as const, payment_status: 'unpaid' as const, setup_price: null };
    expect(allowedActions(custom, 'admin', 'a')).toContain('quote');
    expect(allowedActions(base, 'admin', 'a')).not.toContain('quote');
  });

  it('blocks start while the briefing is pending', () => {
    const pending = { ...base, accepted_at: 'x', assigned_to: 'p', briefing_status: 'pending' as const };
    expect(allowedActions(pending, 'admin', 'a')).not.toContain('start');
  });
});

describe('transitionPatch', () => {
  it('reactivates delivered orders as ready', () => {
    expect(transitionPatch('reactivate', { ...base, delivery_url: 'https://x' }, new Date())).toEqual({ status: 'ready' });
    expect(transitionPatch('reactivate', base, new Date())).toEqual({ status: 'received' });
  });

  it('records the start time', () => {
    const now = new Date('2026-03-02T12:00:00Z');
    expect(transitionPatch('start', base, now)).toMatchObject({ status: 'in_production', started_at: now.toISOString() });
  });
});
