// Hello World
'use client';

import { useId, useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { EXTERNAL_LINK_PROPS, whatsappLink, type Copy } from '@/lib/site';
import { getFaq } from '@/lib/home/faq';
import { trackContact } from '@/lib/analytics';
import { SplitWords } from '@/components/motion/split-words';
import { ActionLink } from '@/components/ui/action-link';

const COPY: Copy<{ title: string; lede: string; more: string; cta: string; whatsapp: string }> = {
  pt: {
    title: 'Dúvidas respondidas.',
    lede: 'Preços, prazos e como funciona cada serviço, sem letras miúdas.',
    more: 'Ficou alguma dúvida? Um engenheiro responde pessoalmente.',
    cta: 'Perguntar no WhatsApp',
    whatsapp: 'Olá ViraWeb! Tenho uma dúvida sobre os serviços de vocês.',
  },
  en: {
    title: 'Questions answered.',
    lede: 'Prices, timelines and how each service works, with no fine print.',
    more: 'Still have a question? An engineer answers personally.',
    cta: 'Ask on WhatsApp',
    whatsapp: 'Hello ViraWeb! I have a question about your services.',
  },
  es: {
    title: 'Dudas respondidas.',
    lede: 'Precios, plazos y cómo funciona cada servicio, sin letra pequeña.',
    more: '¿Le quedó alguna duda? Un ingeniero responde personalmente.',
    cta: 'Preguntar por WhatsApp',
    whatsapp: '¡Hola ViraWeb! Tengo una duda sobre sus servicios.',
  },
};

export function Faq() {
  const { language } = useTranslation();
  const copy = COPY[language];
  const items = getFaq(language);
  const baseId = useId();
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-4 border-t border-line bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-12 px-4 sm:px-8 lg:gap-x-10 lg:px-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <SplitWords
              id="faq-title"
              className="text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink"
              parts={[copy.title]}
            />
            <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-ink-soft">{copy.lede}</p>
            <div className="mt-10 border-t border-line pt-6">
              <p className="max-w-[40ch] text-sm text-mute">{copy.more}</p>
              <ActionLink
                href={whatsappLink(copy.whatsapp)}
                {...EXTERNAL_LINK_PROPS}
                label={copy.cta}
                variant="outline"
                size="md"
                onClick={() => trackContact('faq')}
                className="mt-5"
              />
            </div>
          </div>
        </div>

        <ul className="col-span-12 border-t border-line lg:col-span-7">
          {items.map((item, index) => {
            const isOpen = open === item.id;
            const buttonId = `${baseId}-q-${item.id}`;
            const panelId = `${baseId}-a-${item.id}`;
            return (
              <li key={item.id} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    className="group flex min-h-16 w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex gap-5">
                      <span className="pt-1 font-mono text-[0.72rem] text-mute">{String(index + 1).padStart(2, '0')}</span>
                      <span
                        className={cn(
                          'text-lg font-medium leading-snug tracking-[-0.015em] transition-colors duration-300 sm:text-xl',
                          isOpen ? 'text-ink' : 'text-ink-soft group-hover:text-ink',
                        )}
                      >
                        {item.question}
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
                {/* Always mounted: answers stay in the HTML for crawlers and aria-controls. */}
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
                  <p className="max-w-[62ch] pb-7 pl-10 text-[0.98rem] leading-relaxed text-ink-soft">{item.answer}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
