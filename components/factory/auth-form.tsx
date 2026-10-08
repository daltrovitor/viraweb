// Hello World
'use client';

import { useActionState, useId, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { signIn, signUp, type AuthState } from '@/app/sites/factory/login/actions';
import { Field, FormMessage, SubmitButton, inputClass } from '@/components/factory/ui/form';

type Mode = 'signin' | 'signup';

const MODES: Array<{ id: Mode; label: string }> = [
  { id: 'signin', label: 'Entrar' },
  { id: 'signup', label: 'Criar conta' },
];

const INITIAL: AuthState = {};

export function AuthForm({ next, initialMode = 'signin' }: { next: string; initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const indicatorId = useId();
  const uid = useId();
  const [signInState, signInAction] = useActionState(signIn, INITIAL);
  const [signUpState, signUpAction] = useActionState(signUp, INITIAL);

  const state = mode === 'signin' ? signInState : signUpState;
  const action = mode === 'signin' ? signInAction : signUpAction;

  return (
    <div>
      <div role="tablist" aria-label="Forma de acesso" className="flex border-b border-line">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => setMode(m.id)}
            className={cn('relative min-h-12 flex-1 cursor-pointer px-2 text-sm font-medium transition-colors', mode === m.id ? 'text-ink' : 'text-mute hover:text-ink')}
          >
            {m.label}
            {mode === m.id ? (
              <motion.span layoutId={indicatorId} className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-brand" transition={{ type: 'spring', stiffness: 300, damping: 28 }} />
            ) : null}
          </button>
        ))}
      </div>

      <form key={mode} action={action} className="mt-8 flex flex-col gap-5" noValidate>
        <input type="hidden" name="next" value={next} />
        {mode === 'signup' ? (
          <Field id={`${uid}-name`} label="Nome" required>
            <input id={`${uid}-name`} name="name" autoComplete="name" required className={inputClass} />
          </Field>
        ) : null}
        <Field id={`${uid}-email`} label="E-mail" required>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" required className={inputClass} />
        </Field>
        <Field id={`${uid}-password`} label="Senha" required help={mode === 'signup' ? 'Mínimo de 8 caracteres.' : undefined}>
          <input
            id={`${uid}-password`}
            name="password"
            type="password"
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            required
            minLength={mode === 'signup' ? 8 : undefined}
            className={inputClass}
          />
        </Field>

        {state.error ? <FormMessage>{state.error}</FormMessage> : null}
        {state.message ? <FormMessage tone="success">{state.message}</FormMessage> : null}

        <SubmitButton
          label={mode === 'signin' ? 'Entrar' : 'Criar conta e continuar'}
          pendingLabel="Aguarde…"
          className="w-full"
        />
      </form>
    </div>
  );
}
