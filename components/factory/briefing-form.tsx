// Hello World
'use client';

import { useActionState, useId, useState } from 'react';
import type { BriefingField, Tier } from '@/lib/factory/types';
import { cn } from '@/lib/utils';
import type { OrderFormState } from '@/app/sites/factory/order/[slug]/actions';
import { Field, FormMessage, SubmitButton, inputClass } from '@/components/factory/ui/form';

interface BriefingFormProps {
  action: (prev: OrderFormState, form: FormData) => Promise<OrderFormState>;
  fields: BriefingField[];
  tier: Tier;
  priceSummary: { setup: string; monthly: string; delivery: string };
  termsUrl: string;
}

const INITIAL: OrderFormState = {};

function Control({ field, id, value, error }: { field: BriefingField; id: string; value?: string; error?: string }) {
  const shared = {
    id,
    name: field.name,
    required: field.required,
    defaultValue: value,
    placeholder: field.placeholder,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : field.help ? `${id}-help` : undefined,
    className: inputClass,
  } as const;

  if (field.type === 'textarea') return <textarea {...shared} rows={4} className={cn(inputClass, 'resize-y')} />;
  if (field.type === 'select') {
    return (
      <select {...shared} defaultValue={value ?? ''} className={cn(inputClass, 'appearance-none')}>
        <option value="">Selecione…</option>
        {field.options?.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    );
  }
  const type = field.type === 'tel' ? 'tel' : field.type === 'url' ? 'url' : field.type === 'email' ? 'email' : 'text';
  const autoComplete = field.name === 'name' ? 'name' : field.name === 'company' ? 'organization' : field.type === 'tel' ? 'tel' : undefined;
  return <input {...shared} type={type} autoComplete={autoComplete} inputMode={field.type === 'tel' ? 'tel' : undefined} />;
}

/** Configuração → Briefing → Pagamento, in one form. The idea field leads. */
export function BriefingForm({ action, fields, tier, priceSummary, termsUrl }: BriefingFormProps) {
  const [state, formAction] = useActionState(action, INITIAL);
  const [customize, setCustomize] = useState(state.values?.customize === 'on');
  const uid = useId();
  const [idea, ...rest] = fields;
  const willPay = tier === 'standard' && !customize;
  const error = (name: string) => state.fieldErrors?.[name];

  return (
    <form action={formAction} className="flex flex-col gap-14" noValidate>
      <fieldset className="grid gap-6">
        <legend className="mb-6 flex items-baseline gap-4 text-[1.5rem] font-semibold tracking-[-0.04em] text-ink">
          <span className="font-mono text-[0.72rem] font-normal tracking-[0.12em] text-mute">02</span>
          Configuração
        </legend>
        <dl className="grid grid-cols-1 border-t border-ink sm:grid-cols-3">
          {[
            ['Para construir', priceSummary.setup],
            ['Para manter', priceSummary.monthly],
            ['Prazo', priceSummary.delivery],
          ].map(([term, value]) => (
            <div key={term} className="border-b border-line py-4 sm:pr-4">
              <dt className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">{term}</dt>
              <dd className="mt-1 text-lg font-semibold tracking-[-0.03em] text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        {tier === 'standard' ? (
          <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-sm border border-line p-4 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="customize"
              checked={customize}
              onChange={(event) => setCustomize(event.target.checked)}
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--brand)]"
            />
            <span>
              <span className="block font-medium text-ink">Preciso de personalização além do padrão</span>
              O pedido vira <strong className="font-semibold text-ink">Custom</strong>: você não paga agora, recebe escopo, preço e prazo após análise.
            </span>
          </label>
        ) : (
          <FormMessage tone="info">
            Este produto é <strong className="font-semibold text-ink">{tier === 'enterprise' ? 'Enterprise' : 'Custom'}</strong>. Você não paga agora:
            analisamos o briefing e enviamos escopo, preço final e prazo para sua aprovação.
          </FormMessage>
        )}
      </fieldset>

      <fieldset className="grid gap-6">
        <legend className="mb-6 flex items-baseline gap-4 text-[1.5rem] font-semibold tracking-[-0.04em] text-ink">
          <span className="font-mono text-[0.72rem] font-normal tracking-[0.12em] text-mute">03</span>
          Conte o que você quer.
        </legend>

        <div className="flex flex-col gap-3">
          <label htmlFor={`${uid}-${idea.name}`} className="text-[clamp(1.35rem,2.6vw,2rem)] font-semibold tracking-[-0.04em] text-ink">
            {idea.label}
          </label>
          <textarea
            id={`${uid}-${idea.name}`}
            name={idea.name}
            required
            rows={7}
            defaultValue={state.values?.[idea.name]}
            placeholder={idea.placeholder}
            aria-invalid={error(idea.name) ? true : undefined}
            aria-describedby={error(idea.name) ? `${uid}-${idea.name}-error` : `${uid}-${idea.name}-help`}
            className={cn(inputClass, 'resize-y border-ink px-5 py-4 text-[1.05rem] leading-relaxed')}
          />
          {error(idea.name) ? (
            <p id={`${uid}-${idea.name}-error`} className="text-sm text-[#b42318]">{error(idea.name)}</p>
          ) : (
            <p id={`${uid}-${idea.name}-help`} className="text-sm text-mute">{idea.help}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {rest.map((field) => {
            const id = `${uid}-${field.name}`;
            return (
              <Field
                key={field.name}
                id={id}
                label={field.label}
                required={field.required}
                help={field.help}
                error={error(field.name)}
                className={field.type === 'textarea' ? 'sm:col-span-2' : undefined}
              >
                <Control field={field} id={id} value={state.values?.[field.name]} error={error(field.name)} />
              </Field>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="grid gap-6">
        <legend className="mb-6 flex items-baseline gap-4 text-[1.5rem] font-semibold tracking-[-0.04em] text-ink">
          <span className="font-mono text-[0.72rem] font-normal tracking-[0.12em] text-mute">04</span>
          {willPay ? 'Pagamento' : 'Envio'}
        </legend>
        <label className="flex min-h-12 cursor-pointer items-start gap-3 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="accept_terms"
            required
            defaultChecked={state.values?.accept_terms === 'on'}
            aria-invalid={error('accept_terms') ? true : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--brand)]"
          />
          <span>
            Li e concordo com os{' '}
            <a href={termsUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline underline-offset-4">
              termos de uso
            </a>
            {willPay ? ' e com a cobrança do setup agora e da mensalidade recorrente.' : '.'}
          </span>
        </label>

        {state.error ? <FormMessage>{state.error}</FormMessage> : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <SubmitButton
            label={willPay ? 'Ir para o pagamento' : 'Enviar para análise'}
            pendingLabel={willPay ? 'Abrindo pagamento seguro…' : 'Enviando…'}
            className="w-full sm:w-auto"
          />
          <p className="text-sm text-mute">
            {willPay ? 'Você será levado ao checkout seguro do Stripe. Não armazenamos dados de cartão.' : 'Respondemos com a proposta pela sua área de cliente.'}
          </p>
        </div>
      </fieldset>
    </form>
  );
}
