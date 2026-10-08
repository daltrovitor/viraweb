// Hello World
'use client';

import type { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { ActionInner, actionClassName, type ActionSize, type ActionVariant } from '@/components/ui/action-link';
import { cn } from '@/lib/utils';

export const inputClass =
  'block w-full rounded-sm border border-line-strong bg-white px-3.5 py-3 text-[0.95rem] text-ink placeholder:text-mute/80 transition-colors focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-brand aria-[invalid=true]:border-[#b42318]';

export const labelClass = 'block text-sm font-medium text-ink';

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ id, label, required, help, error, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? <span className="text-mute"> *</span> : <span className="font-normal text-mute"> (opcional)</span>}
      </label>
      {children}
      {help && !error ? <p id={`${id}-help`} className="text-sm text-mute">{help}</p> : null}
      {error ? <p id={`${id}-error`} className="text-sm text-[#b42318]">{error}</p> : null}
    </div>
  );
}

export function FormMessage({ tone = 'error', children }: { tone?: 'error' | 'success' | 'info'; children: ReactNode }) {
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'rounded-sm border px-4 py-3 text-sm',
        tone === 'error' && 'border-[#f4c7c3] bg-[#fef3f2] text-[#912018]',
        tone === 'success' && 'border-[#b7e0c4] bg-[#f0f9f3] text-[#14532d]',
        tone === 'info' && 'border-line bg-surface text-ink-soft',
      )}
    >
      {children}
    </p>
  );
}

interface SubmitProps {
  label: string;
  pendingLabel?: string;
  variant?: ActionVariant;
  size?: ActionSize;
  className?: string;
  name?: string;
  value?: string;
  icon?: boolean;
}

/** Submit button that reflects the parent form's pending state. */
export function SubmitButton({ label, pendingLabel, variant = 'primary', size = 'lg', className, name, value, icon = true }: SubmitProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      name={name}
      value={value}
      disabled={pending}
      aria-disabled={pending}
      className={actionClassName(variant, size, className)}
    >
      <ActionInner label={pending ? (pendingLabel ?? 'Enviando…') : label} variant={variant} icon={icon && !pending} />
    </button>
  );
}
