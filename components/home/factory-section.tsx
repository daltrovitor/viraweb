// Hello World
'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { useTranslation } from '@/lib/i18n';
import { SITE, type Copy } from '@/lib/site';
import type { PreviewKind } from '@/lib/factory/types';
import { ProductPreview } from '@/components/factory/previews';
import { ActionLink } from '@/components/ui/action-link';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';

interface FactoryCopy {
  label: string;
  headline: string;
  accent: string;
  body: string;
  cta: string;
  becomes: string;
  pause: string;
  play: string;
  ideas: Array<{ phrase: string; output: string; preview: PreviewKind }>;
}

const COPY: Copy<FactoryCopy> = {
  pt: {
    label: 'ViraWeb Factory',
    headline: 'Você explica.',
    accent: 'A gente constrói.',
    body: 'Sites, automações, bots e sistemas personalizados, prontos em até 2 dias úteis.',
    cta: 'Conheça a ViraWeb Factory',
    becomes: 'vira',
    pause: 'Pausar animação',
    play: 'Retomar animação',
    ideas: [
      { phrase: 'Preciso de uma página.', output: 'Landing page', preview: 'landing' },
      { phrase: 'Preciso de um bot.', output: 'Chatbot', preview: 'bot' },
      { phrase: 'Preciso automatizar meus leads.', output: 'Automação', preview: 'automation' },
      { phrase: 'Preciso ver meus números.', output: 'Dashboard', preview: 'dashboard' },
      { phrase: 'Preciso de um sistema.', output: 'Web app', preview: 'app' },
    ],
  },
  en: {
    label: 'ViraWeb Factory',
    headline: 'You explain.',
    accent: 'We build.',
    body: 'Websites, automations, bots and custom systems, ready in up to 2 business days.',
    cta: 'Discover ViraWeb Factory',
    becomes: 'becomes',
    pause: 'Pause animation',
    play: 'Resume animation',
    ideas: [
      { phrase: 'I need a page.', output: 'Landing page', preview: 'landing' },
      { phrase: 'I need a bot.', output: 'Chatbot', preview: 'bot' },
      { phrase: 'I need to automate my leads.', output: 'Automation', preview: 'automation' },
      { phrase: 'I need to see my numbers.', output: 'Dashboard', preview: 'dashboard' },
      { phrase: 'I need a system.', output: 'Web app', preview: 'app' },
    ],
  },
  es: {
    label: 'ViraWeb Factory',
    headline: 'Usted explica.',
    accent: 'Nosotros construimos.',
    body: 'Sitios, automatizaciones, bots y sistemas a medida, listos en hasta 2 días hábiles.',
    cta: 'Conozca ViraWeb Factory',
    becomes: 'se vuelve',
    pause: 'Pausar animación',
    play: 'Reanudar animación',
    ideas: [
      { phrase: 'Necesito una página.', output: 'Landing page', preview: 'landing' },
      { phrase: 'Necesito un bot.', output: 'Chatbot', preview: 'bot' },
      { phrase: 'Necesito automatizar mis leads.', output: 'Automatización', preview: 'automation' },
      { phrase: 'Necesito ver mis números.', output: 'Dashboard', preview: 'dashboard' },
      { phrase: 'Necesito un sistema.', output: 'Web app', preview: 'app' },
    ],
  },
};

const STEP_MS = 3400;

/** IDEIA → PRODUTO: spoken needs morph into the interfaces the Factory ships. */
export function FactorySection() {
  const { language } = useTranslation();
  const copy = COPY[language];
  const reduceMotion = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { amount: 0.4 });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const idea = copy.ideas[index % copy.ideas.length];

  useEffect(() => {
    if (!inView || paused || reduceMotion) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % copy.ideas.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [inView, paused, reduceMotion, index, copy.ideas.length]);

  return (
    <section id="factory" aria-labelledby="factory-title" className="relative overflow-x-clip border-t border-ink bg-white py-24 sm:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-14 px-4 sm:px-8 lg:px-12">
        <div className="col-span-12 flex items-center justify-between gap-4 border-b border-line pb-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">
          <span>{copy.label}</span>
          <a href={SITE.factoryUrl} className="inline-flex min-h-12 items-center normal-case tracking-normal text-ink-soft hover:text-brand hover:underline">
            {SITE.factoryUrl.replace(/^https?:\/\//, '')} ↗
          </a>
        </div>

        {/* IDEA → PRODUCT stage */}
        <div
          ref={stage}
          className="col-span-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1.1fr] lg:gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative min-h-[9.5rem] sm:min-h-[12rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${language}-${index}`}
                className="text-[clamp(2rem,5.6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink"
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -18, filter: 'blur(4px)', transition: { duration: 0.35 } }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              >
                <span className="sr-only">{idea.phrase}</span>
                <span aria-hidden="true">
                  <span className="mr-2 font-serif font-normal italic text-mute">“</span>
                  {idea.phrase.split(' ').map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
                      <motion.span
                        className="inline-block"
                        variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { type: 'spring', stiffness: 300, damping: 28 } } }}
                      >
                        {word}&nbsp;
                      </motion.span>
                    </span>
                  ))}
                  <span className="font-serif font-normal italic text-mute">”</span>
                </span>
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute lg:flex-col">
            <span aria-hidden="true" className="h-px w-10 bg-ink lg:h-16 lg:w-px" />
            <span>{copy.becomes}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`${language}-out-${index}`}
                className="text-ink"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                {idea.output}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative aspect-[4/3] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`preview-${index}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ type: 'spring', stiffness: 240, damping: 30 }}
              >
                <ProductPreview kind={idea.preview} animate={!reduceMotion} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="col-span-12 flex items-center gap-2" role="group" aria-label={copy.label}>
          {copy.ideas.map((item, i) => (
            <button
              key={item.output}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={item.phrase}
              aria-current={i === index ? 'true' : undefined}
              className="group grid h-12 flex-1 cursor-pointer items-center"
            >
              <span className="relative block h-[2px] w-full overflow-hidden bg-line">
                {i === index ? (
                  <motion.span
                    key={`bar-${index}-${paused}`}
                    className="absolute inset-0 origin-left bg-ink"
                    initial={{ scaleX: reduceMotion || paused ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: reduceMotion || paused ? 0 : STEP_MS / 1000, ease: 'linear' }}
                  />
                ) : i < index ? (
                  <span className="absolute inset-0 bg-ink/40" />
                ) : null}
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="ml-2 min-h-12 shrink-0 cursor-pointer px-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute hover:text-ink"
          >
            {paused ? copy.play : copy.pause}
          </button>
        </div>

        <div className="col-span-12 grid grid-cols-12 items-end gap-x-4 gap-y-8 border-t border-line pt-10 lg:pt-14">
          <SplitWords
            id="factory-title"
            className="col-span-12 text-[clamp(2.6rem,8vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-ink lg:col-span-8"
            parts={[copy.headline, { br: true }, { text: copy.accent, className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' }]}
          />
          <Reveal className="col-span-12 flex flex-col gap-6 lg:col-span-4">
            <p className="max-w-[36ch] text-lg leading-relaxed text-ink-soft">{copy.body}</p>
            <ActionLink href={SITE.factoryUrl} label={copy.cta} className="w-full sm:w-auto" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
