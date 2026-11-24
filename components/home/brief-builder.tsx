// Hello World
'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { EXTERNAL_LINK_PROPS, whatsappLink, type Copy } from '@/lib/site';
import { trackContact, type ContactLocation } from '@/lib/analytics';
import { ActionLink } from '@/components/ui/action-link';

type Need = 'platform' | 'product' | 'automation' | 'integration';

interface BriefCopy {
  legend: string;
  preview: string;
  send: string;
  note: string;
  greeting: string;
  request: string;
  options: Record<Need, string>;
}

const COPY: Copy<BriefCopy> = {
  pt: {
    legend: 'O que você precisa?',
    preview: 'Sua mensagem',
    send: 'Enviar no WhatsApp',
    note: 'Diagnóstico gratuito de 15 minutos com um engenheiro.',
    greeting: 'Olá ViraWeb! Quero um diagnóstico para meu projeto.',
    request: 'Tenho interesse em',
    options: { platform: 'Sistema interno ou portal', product: 'Produto digital por assinatura', automation: 'Automação de processos', integration: 'Integração de ferramentas' },
  },
  en: {
    legend: 'What do you need?',
    preview: 'Your message',
    send: 'Send on WhatsApp',
    note: 'Free 15-minute assessment with an engineer.',
    greeting: 'Hello ViraWeb! I would like an assessment for my project.',
    request: 'I am interested in',
    options: { platform: 'Internal system or portal', product: 'Subscription product', automation: 'Process automation', integration: 'Connecting tools' },
  },
  es: {
    legend: '¿Qué necesita?',
    preview: 'Su mensaje',
    send: 'Enviar por WhatsApp',
    note: 'Diagnóstico gratuito de 15 minutos con un ingeniero.',
    greeting: '¡Hola ViraWeb! Quisiera un diagnóstico para mi proyecto.',
    request: 'Me interesa',
    options: { platform: 'Sistema interno o portal', product: 'Producto por suscripción', automation: 'Automatización de procesos', integration: 'Integración de herramientas' },
  },
};

const TAP = { type: 'spring', stiffness: 450, damping: 32, mass: 0.6 } as const;

interface BriefBuilderProps {
  /** Reported with the click so each placement can be measured on its own. */
  location: ContactLocation;
  className?: string;
}

/**
 * The page's conversion anchor: the visitor marks what they need and the
 * WhatsApp message writes itself. One tap sends a brief an engineer can act on,
 * so nobody has to face an empty chat box.
 */
export function BriefBuilder({ location, className }: BriefBuilderProps) {
  const { language } = useTranslation();
  const copy = COPY[language];
  const legendId = useId();
  const [selected, setSelected] = useState<Need[]>([]);
  const interests = selected.map((need) => copy.options[need]);
  const message = interests.length ? `${copy.greeting}
${copy.request}: ${interests.join(', ')}.` : copy.greeting;

  const toggle = (key: Need) =>
    setSelected((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));

  return (
    <div
      role="group"
      aria-labelledby={legendId}
      className={cn(
        'rounded-[1.75rem] bg-white p-5 shadow-[var(--shadow-float)] ring-1 ring-black/[0.06] sm:p-7',
        className,
      )}
    >
      <p id={legendId} className="text-lg font-semibold tracking-[-0.02em] text-ink">
        {copy.legend}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(Object.keys(copy.options) as Need[]).map((need) => {
          const active = selected.includes(need);
          return (
            <motion.button
              key={need}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(need)}
              whileTap={{ scale: 0.96 }}
              transition={TAP}
              className={cn(
                'inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-sm border px-4 text-[0.92rem] font-medium transition-colors duration-300',
                active ? 'border-ink bg-ink text-white' : 'border-line-strong bg-white text-ink hover:border-ink',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'grid size-4 shrink-0 place-items-center rounded-[2px] border transition-colors duration-300',
                  active ? 'border-white bg-white text-ink' : 'border-line-strong',
                )}
              >
                {active ? (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={TAP}>
                    <Check className="size-3" strokeWidth={3} />
                  </motion.span>
                ) : null}
              </span>
              {copy.options[need]}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 rounded-sm bg-surface p-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mute">{copy.preview}</p>
        <div className="mt-2 min-h-[4.75rem]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={message}
              className="text-[0.95rem] leading-relaxed text-ink"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {message}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <ActionLink
          href={whatsappLink(message)}
          {...EXTERNAL_LINK_PROPS}
          label={copy.send}
          onClick={() => trackContact(location, selected.length > 0 ? selected.join('+') : 'none')}
          className="w-full sm:w-auto"
        />
        <p className="text-[0.82rem] leading-snug text-mute sm:max-w-[24ch] sm:text-right">{copy.note}</p>
      </div>
    </div>
  );
}
