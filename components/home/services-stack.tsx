// Hello World
'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useTranslation, type Language } from '@/lib/i18n';
import { whatsappLink, EXTERNAL_LINK_PROPS, type Copy } from '@/lib/site';
import { cn } from '@/lib/utils';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';
import { ActionLink } from '@/components/ui/action-link';
import { ChatVisual, CodeVisual, MapVisual, SystemVisual } from '@/components/home/service-visuals';

type Theme = 'surface' | 'ink' | 'brand' | 'paper';

interface ServiceDef {
  key: 'creation' | 'traffic' | 'assistant' | 'gmn';
  theme: Theme;
  tags: Copy<string[]>;
  visual: (language: Language) => ReactNode;
}

const SERVICES: ServiceDef[] = [
  {
    key: 'creation',
    theme: 'surface',
    tags: {
      pt: ['Next.js', 'SEO técnico', 'Core Web Vitals', 'CMS'],
      en: ['Next.js', 'Technical SEO', 'Core Web Vitals', 'CMS'],
      es: ['Next.js', 'SEO técnico', 'Core Web Vitals', 'CMS'],
    },
    visual: () => <CodeVisual />,
  },
  {
    key: 'traffic',
    theme: 'ink',
    tags: {
      pt: ['ERP', 'CRM', 'APIs', 'Dashboards'],
      en: ['ERP', 'CRM', 'APIs', 'Dashboards'],
      es: ['ERP', 'CRM', 'APIs', 'Dashboards'],
    },
    visual: (language) => <SystemVisual language={language} />,
  },
  {
    key: 'assistant',
    theme: 'brand',
    tags: {
      pt: ['WhatsApp API', 'IA', 'Agendamento', 'CRM'],
      en: ['WhatsApp API', 'AI', 'Scheduling', 'CRM'],
      es: ['WhatsApp API', 'IA', 'Agendamiento', 'CRM'],
    },
    visual: (language) => <ChatVisual language={language} />,
  },
  {
    key: 'gmn',
    theme: 'paper',
    tags: {
      pt: ['Google Meu Negócio', 'Google Maps', 'Avaliações', 'SEO local'],
      en: ['Google Business Profile', 'Google Maps', 'Reviews', 'Local SEO'],
      es: ['Google Mi Negocio', 'Google Maps', 'Reseñas', 'SEO local'],
    },
    visual: (language) => <MapVisual language={language} />,
  },
];

const THEME_CLASS: Record<Theme, string> = {
  surface: 'bg-surface text-ink',
  ink: 'bg-ink text-white',
  brand: 'bg-brand text-white',
  paper: 'bg-white text-ink border border-line',
};

interface StackCopy {
  label: string;
  cta: string;
  message: (service: string) => string;
}

const COPY: Copy<StackCopy> = {
  pt: {
    label: 'Soluções',
    cta: 'Falar com um engenheiro',
    message: (service) => `Olá ViraWeb! Estou interessado na solução de ${service} e gostaria de conversar com um engenheiro de software.`,
  },
  en: {
    label: 'Solutions',
    cta: 'Talk to an engineer',
    message: (service) => `Hello ViraWeb! I am interested in your ${service} solutions and would like to talk to a software engineer.`,
  },
  es: {
    label: 'Soluciones',
    cta: 'Hablar con un ingeniero',
    message: (service) => `¡Hola ViraWeb! Estoy interesado en sus soluciones de ${service} y me gustaría hablar con un ingeniero de software.`,
  },
};

interface CardProps {
  service: ServiceDef;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function ServiceCard({ service, index, total, progress }: CardProps) {
  const { t, language } = useTranslation();
  const copy = COPY[language];
  const title = t(`services.${service.key}`);
  const dark = service.theme === 'ink' || service.theme === 'brand';

  // Cards underneath shrink and settle back as the next one slides over them.
  const targetScale = 1 - (total - index) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-[100svh] items-start justify-center pt-[calc(var(--nav-h)+0.5rem)] lg:items-center lg:pt-[var(--nav-h)]">
      <motion.article
        style={{ scale, top: `${index * 14}px` }}
        className={cn(
          'relative flex w-full origin-top flex-col gap-6 overflow-hidden rounded-sm p-5 sm:p-8 lg:grid lg:min-h-[min(74svh,640px)] lg:grid-cols-12 lg:gap-8 lg:p-12',
          THEME_CLASS[service.theme],
        )}
      >
        <div className="flex flex-col lg:col-span-7">
          <div
            className={cn(
              'flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.14em]',
              dark ? 'text-white/75' : 'text-mute',
            )}
          >
            <span>
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          <h3 className="mt-4 text-[clamp(1.9rem,4.4vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.045em] sm:mt-8">
            {title}
          </h3>
          <p className={cn('mt-4 max-w-[52ch] text-[0.95rem] leading-relaxed sm:mt-6 sm:text-lg', dark ? 'text-white/85' : 'text-ink-soft')}>
            {t(`services.${service.key}.desc`)}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2 sm:mt-8">
            {service.tags[language].map((tag) => (
              <li
                key={tag}
                className={cn(
                  'rounded-sm border px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.08em]',
                  dark ? 'border-white/25 text-white/85' : 'border-line-strong text-ink-soft',
                )}
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-6 lg:mt-auto lg:pt-10">
            <ActionLink
              href={whatsappLink(copy.message(title))}
              {...EXTERNAL_LINK_PROPS}
              label={copy.cta}
              variant={dark ? 'light' : 'primary'}
              size="md"
            />
          </div>
        </div>

        <div className="hidden min-[400px]:block lg:col-span-5 lg:self-center">{service.visual(language)}</div>
      </motion.article>
    </div>
  );
}

export function ServicesStack() {
  const { t, language } = useTranslation();
  const copy = COPY[language];
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-4 bg-white pt-20 pb-10 sm:pt-28">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-8 px-4 sm:px-8 lg:px-12">
        <p className="col-span-12 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute lg:col-span-2 lg:pt-4">
          ({copy.label})
        </p>
        <SplitWords
          id="services-title"
          className="col-span-12 text-[clamp(2.2rem,5.4vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink lg:col-span-10"
          parts={[
            `${t('services.title1')} ${t('services.title2')}`,
            { text: t('services.title3'), className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' },
          ]}
        />
        <Reveal className="col-span-12 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">
          <p className="text-base leading-relaxed text-ink-soft sm:text-lg">{t('services.subtitle')}</p>
        </Reveal>
      </div>

      <div ref={container} className="mx-auto mt-6 max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.key}
            service={service}
            index={index}
            total={SERVICES.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
