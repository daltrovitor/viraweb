// Hello World
'use client';

import { useTranslation, type Language } from '@/lib/i18n';
import type { Copy } from '@/lib/site';
import { getPackageOffer } from '@/lib/home/services';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';
import { Counter } from '@/components/motion/counter';
import { ActionLink } from '@/components/ui/action-link';

interface PackageCopy {
  titleA: string;
  titleEm: string;
  lede: (setupPercent: number, monthlyPercent: number) => string;
  setup: string;
  monthly: string;
  perMonth: string;
  instead: (value: string) => string;
  cta: string;
}

const COPY: Copy<PackageCopy> = {
  pt: {
    titleA: 'Precisa de tudo?',
    titleEm: 'Leve o pacote.',
    lede: (setup, monthly) =>
      `Site, Google Meu Negócio, tráfego pago e ViraBot contratados juntos têm ${setup}% de desconto no setup e ${monthly}% na mensalidade.`,
    setup: 'Setup',
    monthly: 'Mensalidade',
    perMonth: '/mês',
    instead: (value) => `em vez de ${value}`,
    cta: 'Simular minha proposta',
  },
  en: {
    titleA: 'Need it all?',
    titleEm: 'Take the package.',
    lede: (setup, monthly) =>
      `Website, Google Business Profile, paid traffic and ViraBot hired together get ${setup}% off the setup and ${monthly}% off the monthly fee.`,
    setup: 'Setup',
    monthly: 'Monthly fee',
    perMonth: '/month',
    instead: (value) => `instead of ${value}`,
    cta: 'Simulate my proposal',
  },
  es: {
    titleA: '¿Lo necesita todo?',
    titleEm: 'Lleve el paquete.',
    lede: (setup, monthly) =>
      `Sitio, Google Mi Negocio, tráfico pago y ViraBot contratados juntos tienen ${setup}% de descuento en el setup y ${monthly}% en la mensualidad.`,
    setup: 'Setup',
    monthly: 'Mensualidad',
    perMonth: '/mes',
    instead: (value) => `en lugar de ${value}`,
    cta: 'Simular mi propuesta',
  },
};

/** Currency affixes matching `money()` in lib/home/services.ts. */
const AFFIX: Record<Language, { prefix: string; suffix: string; separator: string }> = {
  pt: { prefix: 'R$ ', suffix: '', separator: '.' },
  en: { prefix: '$', suffix: '', separator: ',' },
  es: { prefix: '', suffix: ' €', separator: '.' },
};

/** The full package, priced by the same rules as the /propostas simulator. */
export function PackageBand() {
  const { language } = useTranslation();
  const copy = COPY[language];
  const offer = getPackageOffer(language);
  const affix = AFFIX[language];

  const prices = [
    { label: copy.setup, value: offer.raw.setup, gross: offer.setupGross, unit: '' },
    { label: copy.monthly, value: offer.raw.monthly, gross: offer.monthlyGross, unit: copy.perMonth },
  ];

  return (
    <section aria-labelledby="package-title" className="bg-white px-4 py-10 sm:px-8 sm:py-16 lg:px-12">
      <Reveal y={40} className="bezel bezel-lg mx-auto max-w-[1440px]">
      <div className="bezel-core relative bg-ink text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_70%_at_90%_10%,rgba(25,88,165,0.55),transparent_70%),radial-gradient(35%_60%_at_0%_100%,rgba(242,191,18,0.16),transparent_70%)]" />
      <div className="relative grid grid-cols-12 items-end gap-x-4 gap-y-10 px-5 py-12 sm:px-10 sm:py-16 lg:gap-x-10 lg:px-14 lg:py-20">
        <div className="col-span-12 lg:col-span-6">
          <SplitWords
            id="package-title"
            className="text-[clamp(2.1rem,4.8vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white"
            parts={[
              copy.titleA,
              { br: true },
              { text: copy.titleEm, className: 'font-serif font-normal italic tracking-[-0.02em] text-sun' },
            ]}
          />
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-white/70 sm:text-lg">
              {copy.lede(offer.setupDiscountPercent, offer.monthlyDiscountPercent)}
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
          <dl className="grid grid-cols-1 border-t border-white/15 sm:grid-cols-2">
            {prices.map((price, i) => (
              <Reveal
                key={price.label}
                delay={i * 0.08}
                y={18}
                className="flex flex-col border-b border-white/15 py-5 sm:pr-6 sm:odd:border-r sm:even:pl-6"
              >
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/50">{price.label}</dt>
                <dd className="mt-2">
                  <span className="block whitespace-nowrap text-[clamp(1.9rem,2.7vw,2.6rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                    <Counter value={price.value} prefix={affix.prefix} suffix={affix.suffix} separator={affix.separator} />
                    {price.unit ? <span className="text-base font-medium tracking-normal text-white/50">{price.unit}</span> : null}
                  </span>
                  <span className="mt-2 block text-sm text-white/50">{copy.instead(price.gross)}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
          <Reveal delay={0.16}>
            <ActionLink href="/propostas" label={copy.cta} variant="light" className="mt-8 w-full sm:w-auto" />
          </Reveal>
        </div>
      </div>
      </div>
      </Reveal>
    </section>
  );
}
