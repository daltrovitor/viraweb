// Hello World
'use client';

import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { EXTERNAL_LINK_PROPS, odontoLink } from '@/lib/site';
import { Wordmark } from '@/components/brand/brand-mark';
import { ChapterBar } from '@/components/home/chapter-bar';
import { ActionLink } from '@/components/ui/action-link';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';
import { Counter } from '@/components/motion/counter';
import { ODONTO_COPY, brl } from '@/components/odonto/odonto-copy';
import { OdontogramBuilder } from '@/components/odonto/odontogram-builder';
import { FlowStory } from '@/components/odonto/flow-story';

/**
 * Vira Web Odonto — replaces the former GDC spotlight. Mirrors the product
 * site (odonto.viraweb.online): Montserrat headings, sky-700 accent, 2px radii.
 */
export function OdontoSection() {
  const { language } = useTranslation();
  const copy = ODONTO_COPY[language];
  const appUrl = odontoLink(language);
  const demoUrl = odontoLink(language, '/demo');

  return (
    <section id="odonto" aria-labelledby="odonto-title" className="relative border-t border-line bg-white">
      <ChapterBar label={copy.chapter} href={appUrl} host="odonto.viraweb.online" accent="odonto" />

      {/* Intro + interactive odontogram */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 items-center gap-x-4 gap-y-14 px-4 py-20 sm:px-8 sm:py-28 lg:gap-x-10 lg:px-12">
        <div className="col-span-12 lg:col-span-6">
          <Reveal y={16}>
            <Wordmark product={copy.product} />
          </Reveal>
          <SplitWords
            id="odonto-title"
            className="mt-10 font-brand text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[1.02] tracking-[-0.035em]"
            parts={[
              { text: copy.titleA, className: 'font-bold text-ink' },
              { br: true },
              { text: copy.titleB, className: 'font-light text-odonto' },
            ]}
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-ink-soft sm:text-lg">{copy.lede}</p>
          </Reveal>
          <Reveal delay={0.18} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ActionLink href={appUrl} {...EXTERNAL_LINK_PROPS} label={copy.primary} variant="odonto" />
            <ActionLink href={demoUrl} {...EXTERNAL_LINK_PROPS} label={copy.secondary} variant="odonto-outline" />
          </Reveal>
          <Reveal delay={0.26}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-brand text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-mute">
              {copy.chips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative col-span-12 lg:col-span-6">
          <div aria-hidden="true" className="absolute -inset-x-4 -top-8 bottom-10 rounded-sm bg-surface sm:-inset-x-8 lg:-right-12 lg:left-16" />
          <Reveal className="relative mx-auto max-w-[540px] lg:mr-0" y={40}>
            <OdontogramBuilder copy={copy.builder} />
          </Reveal>
        </div>
      </div>

      {/* Vocabulary counters */}
      <div className="border-y border-line">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
          <h3 className="font-brand text-[clamp(1.5rem,2.4vw,2.25rem)] font-bold tracking-[-0.025em] text-ink">
            {copy.vocabulary.title}
          </h3>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {copy.vocabulary.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse border-t border-line pt-6">
                <dt className="mt-3 max-w-[30ch] text-sm leading-relaxed text-mute">{stat.label}</dt>
                <dd className="font-brand text-[clamp(2.75rem,5vw,4.5rem)] font-bold leading-none tracking-[-0.04em] text-ink">
                  <Counter value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Pinned flow story */}
      <FlowStory copy={copy.flow} />

      {/* Modules */}
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-10 px-4 py-20 sm:px-8 sm:py-28 lg:gap-x-10 lg:px-12">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <h3 className="font-brand text-[clamp(2rem,3.2vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.035em] text-ink">
                {copy.modules.title}
              </h3>
              <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-ink-soft">{copy.modules.lede}</p>
            </div>
          </div>
          <ol className="col-span-12 border-t border-line lg:col-span-8">
            {copy.modules.items.map((item, i) => (
              <motion.li
                key={item.title}
                className="group relative grid grid-cols-12 items-baseline gap-x-4 gap-y-1 overflow-hidden border-b border-line py-6"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: 'spring', stiffness: 160, damping: 24, delay: (i % 3) * 0.05 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-0 origin-left scale-x-0 bg-odonto-tint transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                />
                <span className="relative col-span-2 font-mono text-[0.72rem] text-mute sm:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="relative col-span-10 font-brand text-lg font-semibold tracking-[-0.015em] text-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-2 sm:col-span-4 sm:text-xl">
                  {item.title}
                </h4>
                <p className="relative col-span-10 col-start-3 text-[0.92rem] leading-relaxed text-ink-soft sm:col-span-7 sm:col-start-auto">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      {/* Plans */}
      <div className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="grid grid-cols-12 gap-x-4 gap-y-4">
            <h3 className="col-span-12 font-brand text-[clamp(2.4rem,4.4vw,4.4rem)] font-bold leading-none tracking-[-0.04em] text-ink lg:col-span-6">
              {copy.plans.title}
            </h3>
            <p className="col-span-12 self-end text-base text-ink-soft sm:text-lg lg:col-span-5 lg:col-start-8">{copy.plans.lede}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {copy.plans.items.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.08} className="h-full">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className={cn(
                    'flex h-full flex-col rounded-sm border bg-white p-6 sm:p-8',
                    plan.featured ? 'border-odonto shadow-[0_30px_70px_-45px_rgba(3,105,161,0.55)]' : 'border-line',
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-brand text-xl font-bold tracking-[-0.02em] text-ink">{plan.name}</h4>
                    {plan.featured ? (
                      <span className="rounded-[2px] bg-odonto px-2 py-1 font-brand text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white">
                        {copy.plans.featured}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 text-sm text-mute">{plan.tagline}</p>
                  <p className="mt-8 flex items-baseline gap-1.5">
                    <span className="font-brand text-[2.4rem] font-bold leading-none tracking-[-0.04em] text-ink">{brl(plan.price)}</span>
                    <span className="text-sm text-mute">{copy.plans.perMonth}</span>
                  </p>
                  <ul className="mt-8 space-y-3 border-t border-line pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-[0.92rem] text-ink-soft">
                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-odonto" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-10">
                    <ActionLink
                      href={appUrl}
                      {...EXTERNAL_LINK_PROPS}
                      label={copy.plans.cta}
                      variant={plan.featured ? 'odonto' : 'odonto-outline'}
                      size="md"
                      className="w-full"
                    />
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
