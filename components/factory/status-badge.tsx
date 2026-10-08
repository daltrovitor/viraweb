// Hello World
import type { Tone } from '@/lib/factory/workflow';
import { cn } from '@/lib/utils';

const TONES: Record<Tone, string> = {
  neutral: 'border-line-strong bg-surface text-ink-soft',
  brand: 'border-brand/30 bg-brand-tint text-brand-strong',
  progress: 'border-[#c7d7ee] bg-[#f3f7fc] text-[#1e3a5f]',
  success: 'border-[#b7e0c4] bg-[#f0f9f3] text-[#14532d]',
  warning: 'border-[#f2d9a6] bg-[#fdf8ec] text-[#7a4d06]',
  danger: 'border-[#f4c7c3] bg-[#fef3f2] text-[#912018]',
};

/** Square-cornered status label; color is never the only signal (text is always present). */
export function StatusBadge({ tone, children, className }: { tone: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center whitespace-nowrap rounded-[2px] border px-2 py-0.5 text-[0.75rem] font-medium', TONES[tone], className)}>
      {children}
    </span>
  );
}
