// Hello World
'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { PreviewKind } from '@/lib/factory/types';
import { cn } from '@/lib/utils';
import { ProductPreview } from '@/components/factory/previews';

interface Want {
  id: string;
  label: string;
  preview: PreviewKind;
  product: string;
  href: string;
  detail: string;
}

const WANTS: Want[] = [
  { id: 'sales', label: 'uma página de vendas', preview: 'sales', product: 'Página de Vendas', href: '/products/pagina-de-vendas', detail: 'Oferta, prova social e checkout em uma página que conduz até a compra.' },
  { id: 'bot', label: 'um bot', preview: 'bot', product: 'Bot de Atendimento', href: '/products/bot-de-atendimento', detail: 'Respostas imediatas, a qualquer hora, com encaminhamento para a sua equipe.' },
  { id: 'automation', label: 'uma automação', preview: 'automation', product: 'Automação de Leads', href: '/products/automacao-de-leads', detail: 'Cada lead registrado, qualificado e respondido sem ninguém copiar e colar.' },
  { id: 'dashboard', label: 'um dashboard', preview: 'dashboard', product: 'Dashboard', href: '/products/dashboard', detail: 'Os números do negócio em um painel que se atualiza sozinho.' },
  { id: 'system', label: 'um sistema', preview: 'system', product: 'Mini Sistema', href: '/products/mini-sistema', detail: 'Cadastros, fluxos e relatórios desenhados para o seu processo.' },
  { id: 'app', label: 'um aplicativo', preview: 'app', product: 'Web App', href: '/products/web-app', detail: 'Um app instalável para sua equipe ou seus clientes usarem todo dia.' },
];

/** "Eu quero…" — pick an intent, watch the product assemble. */
export function WantPicker() {
  const [active, setActive] = useState(WANTS[0]);
  const pillId = useId();
  const panelId = useId();

  return (
    <section aria-labelledby="want-title" className="border-t border-line bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-12 px-4 sm:px-8 lg:px-12">
        <div className="col-span-12 lg:col-span-5">
          <h2 id="want-title" className="text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-ink">
            Eu quero…
          </h2>
          <div
            role="tablist"
            aria-label="O que você quer construir"
            aria-orientation="vertical"
            className="mt-8 flex flex-col"
            onKeyDown={(event) => {
              if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
              event.preventDefault();
              const index = WANTS.findIndex((w) => w.id === active.id);
              const next = WANTS[(index + (event.key === 'ArrowDown' ? 1 : WANTS.length - 1)) % WANTS.length];
              setActive(next);
              event.currentTarget.querySelector<HTMLButtonElement>(`[data-want="${next.id}"]`)?.focus();
            }}
          >
            {WANTS.map((want) => {
              const selected = want.id === active.id;
              return (
                <button
                  key={want.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  data-want={want.id}
                  onClick={() => setActive(want)}
                  className={cn(
                    'group relative flex min-h-14 cursor-pointer items-center justify-between gap-4 border-b border-line py-3 text-left text-[clamp(1.25rem,2.6vw,2rem)] font-semibold tracking-[-0.04em] transition-colors duration-300',
                    selected ? 'text-ink' : 'text-mute hover:text-ink',
                  )}
                >
                  <span>{want.label}</span>
                  {selected ? (
                    <motion.span
                      layoutId={pillId}
                      className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-brand"
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    />
                  ) : null}
                  <ArrowRight
                    aria-hidden="true"
                    className={cn('size-5 shrink-0 transition-transform duration-500 ease-out-expo', selected ? 'translate-x-0 text-brand' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100')}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div id={panelId} role="tabpanel" aria-live="polite" className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="relative aspect-[4/3] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              >
                <ProductPreview kind={active.preview} animate />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">{active.product}</p>
              <p className="mt-2 max-w-[44ch] text-ink-soft">{active.detail}</p>
            </div>
            <Link
              href={active.href}
              className="inline-flex min-h-12 items-center gap-2 text-[0.95rem] font-medium text-ink underline-offset-4 hover:underline"
            >
              Ver {active.product}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <p className="col-span-12 border-t border-ink pt-6 text-[clamp(1.6rem,4vw,3.5rem)] font-semibold leading-[1] tracking-[-0.05em] text-ink lg:col-span-10 lg:col-start-3">
          É só explicar. <span className="font-serif font-normal italic tracking-[-0.02em] text-brand">A gente constrói.</span>
        </p>
      </div>
    </section>
  );
}
