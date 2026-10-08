// Hello World
'use client';

import { useActionState } from 'react';
import { signInOps, type OpsLoginState } from '@/app/sites/ops/login/actions';
import { FormMessage, SubmitButton, inputClass, labelClass } from '@/components/factory/ui/form';

export function OpsLoginForm({ next }: { next: string }) {
  const [state, action] = useActionState<OpsLoginState, FormData>(signInOps, {});
  return (
    <form action={action} className="flex flex-col gap-5">
      <input type="hidden" name="next" value={next} />
      <div className="flex flex-col gap-2">
        <label htmlFor="ops-email" className={labelClass}>E-mail</label>
        <input id="ops-email" name="email" type="email" autoComplete="username" required className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="ops-password" className={labelClass}>Senha</label>
        <input id="ops-password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      {state.error ? <FormMessage>{state.error}</FormMessage> : null}
      <SubmitButton label="Entrar" pendingLabel="Verificando…" className="w-full" />
    </form>
  );
}
