// Hello World
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Operations primitives: dense, quiet, built on the same tokens as the public Factory. */

export function PageHeader({ title, description, actions }: { title: string; description?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.035em] text-ink">{title}</h1>
        {description ? <p className="mt-1 text-sm text-ink-soft">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function Panel({ title, actions, children, className }: { title?: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn('rounded-sm border border-line bg-white', className)}>
      {title || actions ? (
        <div className="flex min-h-12 items-center justify-between gap-4 border-b border-line px-4">
          {title ? <h2 className="text-sm font-semibold text-ink">{title}</h2> : <span />}
          {actions}
        </div>
      ) : null}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function Metric({ label, value, hint, tone = 'ink' }: { label: string; value: ReactNode; hint?: ReactNode; tone?: 'ink' | 'danger' | 'brand' }) {
  return (
    <div className="flex flex-col gap-1 border-b border-r border-line p-4">
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mute">{label}</span>
      <span
        className={cn(
          'text-[1.6rem] font-semibold tabular-nums tracking-[-0.035em]',
          tone === 'danger' && 'text-[#b42318]',
          tone === 'brand' && 'text-brand',
          tone === 'ink' && 'text-ink',
        )}
      >
        {value}
      </span>
      {hint ? <span className="text-xs text-mute">{hint}</span> : null}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="px-4 py-10 text-center text-sm text-mute">{children}</p>;
}

export const tableWrap = 'overflow-x-auto rounded-sm border border-line bg-white';
export const tableClass = 'w-full min-w-[720px] border-collapse text-left text-sm';
export const thClass = 'border-b border-line bg-surface px-3 py-2.5 font-mono text-[0.68rem] font-normal uppercase tracking-[0.1em] text-mute';
export const tdClass = 'border-b border-line px-3 py-2.5 align-middle text-ink';

export function DefinitionList({ items }: { items: Array<[string, ReactNode]> }) {
  return (
    <dl className="divide-y divide-line text-sm">
      {items.map(([term, value]) => (
        <div key={term} className="grid grid-cols-[9rem_1fr] gap-3 py-2">
          <dt className="text-mute">{term}</dt>
          <dd className="min-w-0 break-words text-ink">{value ?? '—'}</dd>
        </div>
      ))}
    </dl>
  );
}

export const opsInput =
  'block w-full rounded-sm border border-line-strong bg-white px-3 py-2 text-sm text-ink placeholder:text-mute/80 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-brand';

export const opsButton =
  'inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-sm border px-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60';

export const opsButtonVariant = {
  primary: 'border-ink bg-ink text-white hover:bg-brand hover:border-brand',
  secondary: 'border-line-strong bg-white text-ink hover:border-ink',
  danger: 'border-[#f4c7c3] bg-white text-[#912018] hover:bg-[#fef3f2]',
} as const;
