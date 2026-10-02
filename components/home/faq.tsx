// Hello World
'use client';

import { useId, useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { EXTERNAL_LINK_PROPS, whatsappLink, type Copy } from '@/lib/site';
import { SplitWords } from '@/components/motion/split-words';
import { ActionLink } from '@/components/ui/action-link';

const QUESTIONS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

const COPY: Copy<{ label: string; more: string; cta: string; whatsapp: string }> = {
  pt: {
    label: 'FAQ',
    more: 'Ficou alguma dúvida? Um engenheiro responde pessoalmente.',
    cta: 'Perguntar no WhatsApp',
    whatsapp: 'Olá ViraWeb! Tenho uma dúvida sobre os serviços de vocês.',
  },
  en: {
    label: 'FAQ',
    more: 'Still have a question? An engineer answers personally.',
    cta: 'Ask on WhatsApp',
    whatsapp: 'Hello ViraWeb! I have a question about your services.',
  },
  es: {
    label: 'FAQ',
    more: '¿Le quedó alguna duda? Un ingeniero responde personalmente.',
    cta: 'Preguntar por WhatsApp',
    whatsapp: '¡Hola ViraWeb! Tengo una duda sobre sus servicios.',
  },
};

export function Faq() {
  const { t, language } = useTranslation();
  const copy = COPY[language];
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-white py-24 sm:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-12 px-4 sm:px-8 lg:gap-x-10 lg:px-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">({copy.label})</p>
            <SplitWords
              id="faq-title"
              className="mt-6 text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink"
              parts={[t('faq.title')]}
            />
            <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-ink-soft">{t('faq.subtitle')}</p>
            <div className="mt-10 border-t border-line pt-6">
              <p className="max-w-[40ch] text-sm text-mute">{copy.more}</p>
              <ActionLink
                href={whatsappLink(copy.whatsapp)}
                {...EXTERNAL_LINK_PROPS}
                label={copy.cta}
                variant="outline"
                size="md"
                className="mt-5"
              />
            </div>
          </div>
        </div>

        <ul className="col-span-12 border-t border-line lg:col-span-7">
          {QUESTIONS.map((n) => {
            const isOpen = open === n;
            const buttonId = `${baseId}-q${n}`;
            const panelId = `${baseId}-a${n}`;
            return (
              <li key={n} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : n)}
                    className="group flex min-h-16 w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex gap-5">
                      <span className="pt-1 font-mono text-[0.72rem] text-mute">{String(n).padStart(2, '0')}</span>
                      <span
                        className={cn(
                          'text-lg font-medium leading-snug tracking-[-0.015em] transition-colors duration-300 sm:text-xl',
                          isOpen ? 'text-ink' : 'text-ink-soft group-hover:text-ink',
                        )}
                      >
                        {t(`faq.q${n}`)}
                      </span>
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className={cn(
                        'grid size-9 shrink-0 place-items-center rounded-sm border transition-colors duration-300',
                        isOpen ? 'border-ink bg-ink text-white' : 'border-line-strong text-ink group-hover:border-ink',
                      )}
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                </h3>
                {/* Always mounted: answers stay in the DOM for crawlers and aria-controls. */}
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 32 }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[62ch] pb-7 pl-10 text-[0.98rem] leading-relaxed text-ink-soft">{t(`faq.a${n}`)}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
