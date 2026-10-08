// Hello World
'use client';

import { useActionState, useId } from 'react';
import type { RevisionState } from '@/app/sites/factory/dashboard/actions';
import { FormMessage, SubmitButton, inputClass } from '@/components/factory/ui/form';

export function RevisionForm({ action }: { action: (prev: RevisionState, form: FormData) => Promise<RevisionState> }) {
  const [state, formAction] = useActionState(action, {});
  const id = useId();
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label htmlFor={id} className="text-sm font-medium text-ink">O que você quer alterar?</label>
      <textarea
        id={id}
        name="description"
        rows={4}
        required
        minLength={10}
        placeholder="Ex.: trocar o texto do botão para “Agendar agora” e incluir o endereço no rodapé."
        className={inputClass}
      />
      {state.error ? <FormMessage>{state.error}</FormMessage> : null}
      {state.message ? <FormMessage tone="success">{state.message}</FormMessage> : null}
      <SubmitButton label="Solicitar alteração" pendingLabel="Enviando…" size="md" className="w-full sm:w-auto" />
    </form>
  );
}
