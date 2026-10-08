// Hello World
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { PreviewKind } from '@/lib/factory/types';
import { cn } from '@/lib/utils';
import { ProductPreview } from '@/components/factory/previews';
import { SectionHead, accent } from '@/components/factory/section-head';
import { ActionNavLink } from '@/components/factory/action-nav-link';

interface Buildable {
  name: string;
  line: string;
  preview: PreviewKind;
}

const ITEMS: Buildable[] = [
  { name: 'Landing Pages', line: 'Uma página, um objetivo, muita conversão.', preview: 'landing' },
  { name: 'Bots', line: 'Atendimento que responde em segundos.', preview: 'bot' },
  { name: 'Automações', line: 'Processos que rodam sozinhos.', preview: 'automation' },
  { name: 'Dashboards', line: 'Seus números, sempre atualizados.', preview: 'dashboard' },
  { name: 'Sistemas', line: 'Ferramentas internas sob medida.', preview: 'system' },
  { name: 'Web Apps', line: 'Aplicações completas no navegador.', preview: 'app' },
  { name: 'Ferramentas', line: 'Calculadoras, PDFs, catálogos.', preview: 'tool' },
  { name: 'Integrações', line: 'Seus sistemas conversando.', preview: 'integration' },
];

export function BuildIndex() {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="build-title" className="border-t border-line bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <SectionHead
          id="build-title"
          index="01"
          title={['O que podemos', { br: true }, accent('construir?')]}
          lede="Passe o cursor ou toque em cada linha para ver o tipo de interface que sai da fábrica."
        />

        <div className="mt-14 grid grid-cols-12 gap-x-4 lg:mt-20">
          <ol className="col-span-12 border-t border-line lg:col-span-6 lg:col-start-3">
            {ITEMS.map((item, i) => {
              const selected = active === i;
              return (
                <li key={item.name} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={selected}
                    onPointerEnter={(event) => event.pointerType === 'mouse' && setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group grid min-h-16 w-full cursor-pointer grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-4 text-left sm:grid-cols-[3rem_1fr_auto]"
                  >
                    <span className="font-mono text-[0.72rem] text-mute">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      className={cn(
                        'text-[clamp(1.5rem,3.4vw,2.75rem)] font-semibold leading-none tracking-[-0.045em] transition-[color,transform] duration-500 ease-out-expo',
                        selected ? 'translate-x-2 text-ink' : 'text-ink-soft group-hover:text-ink',
                      )}
                    >
                      {item.name}
                    </span>
                    <span className="col-start-2 mt-2 text-sm text-mute sm:col-start-3 sm:mt-0 sm:text-right">{item.line}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {selected ? (
                      <motion.div
                        key="inline"
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 32 }}
                      >
                        <div className="aspect-[4/3] w-full pb-5">
                          <ProductPreview kind={item.preview} animate />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          <div className="relative hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+2rem)] aspect-[4/5] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={ITEMS[active].name}
                  className="absolute inset-0 flex items-center"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                >
                  <div className="aspect-[4/3] w-full">
                    <ProductPreview kind={ITEMS[active].preview} animate />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:ml-[calc(2/12*100%)]">
          <ActionNavLink href="/products" label="Ver todos os produtos" variant="outline" />
        </div>
      </div>
    </section>
  );
}
