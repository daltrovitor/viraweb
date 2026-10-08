// Hello World
import type { Tier } from '@/lib/factory/types';
import { TIER_LABEL } from '@/lib/factory/format';
import { cn } from '@/lib/utils';

const TONE: Record<Tier, string> = {
  standard: 'border-brand/30 bg-brand-tint text-brand-strong',
  custom: 'border-line-strong bg-surface text-ink-soft',
  enterprise: 'border-ink bg-ink text-white',
};

export function TierBadge({ tier, className }: { tier: Tier; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-[2px] border px-1.5 py-0.5 font-mono text-[0.66rem] uppercase tracking-[0.1em]', TONE[tier], className)}>
      {TIER_LABEL[tier]}
    </span>
  );
}
