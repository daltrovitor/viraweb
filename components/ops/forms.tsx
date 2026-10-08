// Hello World
'use client';

import { useActionState, type ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import type { OpsFormState } from '@/app/sites/ops/(panel)/actions';
import { cn } from '@/lib/utils';
import { opsButton, opsButtonVariant } from './ui';

type Variant = keyof typeof opsButtonVariant;

export function OpsSubmit({ label, pending, variant = 'primary', className, confirm }: { label: string; pending?: string; variant?: Variant; className?: string; confirm?: string }) {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      disabled={status.pending}
      onClick={(event) => {
        if (confirm && !window.confirm(confirm)) event.preventDefault();
      }}
      className={cn(opsButton, opsButtonVariant[variant], className)}
    >
      {status.pending ? (pending ?? 'Salvando…') : label}
    </button>
  );
}

/** Form bound to an Operations server action that returns { error | message }. */
export function OpsForm({
  action,
  children,
  submit,
  pending,
  variant,
  className,
  confirm,
}: {
  action: (prev: OpsFormState, form: FormData) => Promise<OpsFormState>;
  children?: ReactNode;
  submit: string;
  pending?: string;
  variant?: Variant;
  className?: string;
  confirm?: string;
}) {
  const [state, formAction] = useActionState(action, {});
  return (
    <form action={formAction} className={cn('flex flex-col gap-3', className)}>
      {children}
      {state.error ? <p role="alert" className="text-sm text-[#912018]">{state.error}</p> : null}
      {state.message ? <p role="status" className="text-sm text-[#14532d]">{state.message}</p> : null}
      <div>
        <OpsSubmit label={submit} pending={pending} variant={variant} confirm={confirm} />
      </div>
    </form>
  );
}

/** One-click transition (server action without a return value). */
export function OpsActionButton({ action, label, variant = 'secondary', confirm }: { action: () => Promise<void>; label: string; variant?: Variant; confirm?: string }) {
  return (
    <form action={action}>
      <OpsSubmit label={label} pending="…" variant={variant} confirm={confirm} />
    </form>
  );
}
