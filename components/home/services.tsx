// Hello World
'use client';

import { Fragment, useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation, type Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { EXTERNAL_LINK_PROPS, whatsappLink, type Copy } from '@/lib/site';
import { getServices, type ServiceInfo, type ServiceKey } from '@/lib/home/services';
import { trackContact } from '@/lib/analytics';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';
import { ActionLink } from '@/components/ui/action-link';
import { ProductPreview } from '@/components/home/previews';
import { MapVisual } from '@/components/home/service-visuals';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ServicesCopy {
  eyebrow: string;
  titleA: string;
  titleEm: string;
  lede: string;
}

const COPY: Copy<ServicesCopy> = {
  pt: {
    eyebrow: 'Serviços',
    titleA: 'Um time só para site, sistema, automação e',
    titleEm: 'marketing.',
    lede: 'Quatro serviços que funcionam sozinhos e rendem mais juntos. Em todos, você fala direto com quem constrói.',
  },
  en: {
    eyebrow: 'Services',
    titleA: 'One team for your website, system, automation and',
    titleEm: 'marketing.',
    lede: 'Four services that work on their own and deliver more together. In all of them you talk straight to the people who build.',
  },
  es: {
    eyebrow: 'Servicios',
    titleA: 'Un solo equipo para sitio, sistema, automatización y',
    titleEm: 'marketing.',
    lede: 'Cuatro servicios que funcionan solos y rinden más juntos. En todos, usted habla directo con quien construye.',
  },
};

const STAGE_TONE: Record<ServiceKey, string> = {
  sites: 'bg-surface',
  systems: 'bg-ink',
  automation: 'bg-brand',
  marketing: 'bg-surface-2',
};

function visualFor(key: ServiceKey, language: Language): ReactNode {
  if (key === 'sites') return <ProductPreview kind="site" animate="inView" />;
  if (key === 'systems') return <ProductPreview kind="system" animate="inView" />;
  if (key === 'automation') return <ProductPreview kind="whatsapp" animate="inView" />;
  return (
    <div className="flex h-full items-center">
      <div className="mx-auto w-full max-w-md">
        <MapVisual language={language} />
      </div>
    </div>
  );
}

/** Framed stage whose content drifts slightly against the scroll for depth. */
function Stage({ service, language }: { service: ServiceInfo; language: Language }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [22, -22]);

  return (
    <div ref={ref} className="bezel bezel-lg">
      <div className={cn('bezel-core aspect-[4/3] w-full p-5 sm:p-8', STAGE_TONE[service.key])}>
        <motion.div style={{ y }} className="h-full w-full">
          {visualFor(service.key, language)}
        </motion.div>
      </div>
    </div>
  );
}

function ServiceRow({ service, index, language }: { service: ServiceInfo; index: number; language: Language }) {
  const flip = index % 2 === 1;

  return (
    <article
      id={service.anchor}
      className="grid scroll-mt-[calc(var(--nav-h)+1rem)] grid-cols-12 items-center gap-x-4 gap-y-8 py-10 lg:gap-x-10 lg:py-6"
    >
      <div className={cn('col-span-12 lg:col-span-5', flip && 'lg:order-2 lg:col-start-8')}>
        <SplitWords
          as="h3"
          className="text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink"
          parts={[
            { text: `0${index + 1}`, className: 'mr-2 align-top font-mono text-[0.72rem] font-normal tracking-normal text-mute' },
            service.name,
          ]}
        />
        <Reveal delay={0.05}>
          <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-ink-soft sm:text-lg">{service.summary}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-6 space-y-2.5">
            {service.deliverables.map((item) => (
              <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink">
                <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <dl className="mt-7 grid grid-cols-1 gap-x-6 border-t border-line sm:grid-cols-2">
            {service.facts.map((fact) => (
              <div key={fact.label} className="border-b border-line py-3">
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mute">{fact.label}</dt>
                <dd className="mt-1 text-[0.95rem] font-medium leading-snug text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <ActionLink
            href={whatsappLink(service.message)}
            {...EXTERNAL_LINK_PROPS}
            label={service.cta}
            size="md"
            onClick={() => trackContact('service', service.key)}
            className="mt-8 w-full sm:w-auto"
          />
        </Reveal>
      </div>

      <div className={cn('col-span-12 lg:col-span-6', flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7')}>
        <Reveal y={36}>
          <Stage service={service} language={language} />
        </Reveal>
      </div>
    </article>
  );
}

/**
 * Hairline that carries the eye from one visual to the next, completing the Z
 * between rows. It is drawn by the scroll itself (transform only).
 */
function ZConnector({ toLeft }: { toLeft: boolean }) {
  return (
    <div aria-hidden="true" className="hidden h-20 lg:block xl:h-28">
      {/* The origin sits on the line's starting point, so it grows out of the visual above. */}
      <div className={cn('z-connector size-full', toLeft ? 'origin-[75%_0%]' : 'origin-[25%_0%]')}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false" className="size-full">
          <line
            x1={toLeft ? 75 : 25}
            y1="0"
            x2={toLeft ? 25 : 75}
            y2="100"
            stroke="var(--line-strong)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}

/** Services in a Z: copy and demonstration swap sides on every row. */
export function Services() {
  const { language } = useTranslation();
  const copy = COPY[language];
  const services = getServices(language);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.z-connector').forEach((line) => {
          gsap.fromTo(
            line,
            { scale: 0 },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: line, start: 'top 92%', end: 'bottom 62%', scrub: 0.6 } },
          );
        });
      });
    },
    { scope: container },
  );

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-4 bg-white pb-16 pt-24 sm:pb-24 sm:pt-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-8 px-4 sm:px-8 lg:gap-x-10 lg:px-12">
        <div className="col-span-12 lg:col-span-8">
          <Reveal y={14}>
            <p className="eyebrow">{copy.eyebrow}</p>
          </Reveal>
          <SplitWords
            id="services-title"
            className="mt-6 text-[clamp(2.1rem,4.8vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink"
            parts={[copy.titleA, { text: copy.titleEm, className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' }]}
          />
        </div>
        <Reveal className="col-span-12 self-end md:col-span-7 lg:col-span-4">
          <p className="text-base leading-relaxed text-ink-soft sm:text-lg">{copy.lede}</p>
        </Reveal>
      </div>

      <div ref={container} className="mx-auto mt-10 max-w-[1440px] px-4 sm:px-8 lg:mt-16 lg:px-12">
        {services.map((service, index) => (
          <Fragment key={service.key}>
            <ServiceRow service={service} index={index} language={language} />
            {index < services.length - 1 ? <ZConnector toLeft={index % 2 === 0} /> : null}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
