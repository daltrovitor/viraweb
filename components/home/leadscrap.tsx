// Hello World
'use client';

import { motion } from 'motion/react';
import { Check, Search } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { EXTERNAL_LINK_PROPS, SITE, whatsappLink, type Copy } from '@/lib/site';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';
import { Counter } from '@/components/motion/counter';
import { ActionLink } from '@/components/ui/action-link';
import { ChapterBar } from '@/components/home/chapter-bar';

interface LeadScrapCopy {
  chapter: string;
  titleA: string;
  titleEm: string;
  titleB: string;
  lede: string;
  primary: string;
  secondary: string;
  whatsapp: string;
  perks: string[];
  visual: {
    query: string;
    category: string;
    neighborhoods: string[];
    selected: string;
    campaign: string;
    sent: string;
    leads: string;
    message: string;
  };
}

const COPY: Copy<LeadScrapCopy> = {
  pt: {
    chapter: 'Produto 03',
    titleA: 'Sua máquina de',
    titleEm: 'vendas automatizada',
    titleB: 'no WhatsApp.',
    lede: 'Extraia contatos qualificados do Google Maps, dispare campanhas em massa com proteção anti-ban e automatize todo o seu funil de vendas. Pare de perder tempo com tarefas manuais.',
    primary: 'Garantir acesso',
    secondary: 'Falar no WhatsApp',
    whatsapp: 'Olá ViraWeb! Estou interessado no LeadScrap (LS) para automação de prospecção e disparos.',
    perks: ['Sem cartão de crédito', 'Ativação imediata', 'Suporte VIP'],
    visual: {
      query: 'clínicas odontológicas em Goiânia',
      category: 'Clínica odontológica',
      neighborhoods: ['Setor Bueno', 'Setor Marista', 'Setor Oeste', 'Jardim Goiás'],
      selected: 'selecionado',
      campaign: 'Campanha ativa',
      sent: 'disparos enviados',
      leads: 'leads extraídos',
      message: 'Olá! Vi que sua clínica está no Setor Bueno. Posso te mostrar como dobrar as avaliações no Google?',
    },
  },
  en: {
    chapter: 'Product 03',
    titleA: 'Your automated',
    titleEm: 'sales machine',
    titleB: 'on WhatsApp.',
    lede: 'Extract qualified leads from Google Maps, send bulk campaigns with anti-ban protection and automate your entire sales funnel. Stop wasting time on manual tasks.',
    primary: 'Get access',
    secondary: 'Talk on WhatsApp',
    whatsapp: 'Hello ViraWeb! I am interested in LeadScrap (LS) active prospecting tool.',
    perks: ['No credit card', 'Immediate activation', 'VIP support'],
    visual: {
      query: 'dental clinics in Goiânia',
      category: 'Dental clinic',
      neighborhoods: ['Setor Bueno', 'Setor Marista', 'Setor Oeste', 'Jardim Goiás'],
      selected: 'selected',
      campaign: 'Active campaign',
      sent: 'messages sent',
      leads: 'leads extracted',
      message: 'Hi! I saw your clinic is in Setor Bueno. Can I show you how to double your Google reviews?',
    },
  },
  es: {
    chapter: 'Producto 03',
    titleA: 'Su máquina de',
    titleEm: 'ventas automatizada',
    titleB: 'en WhatsApp.',
    lede: 'Extraiga contactos calificados de Google Maps, envíe campañas masivas con protección anti-ban y automatice todo su embudo de ventas. Deje de perder tiempo en tareas manuales.',
    primary: 'Garantizar acceso',
    secondary: 'Hablar por WhatsApp',
    whatsapp: '¡Hola ViraWeb! Estoy interesado en la herramienta de prospección LeadScrap (LS).',
    perks: ['Sin tarjeta de crédito', 'Activación inmediata', 'Soporte VIP'],
    visual: {
      query: 'clínicas odontológicas en Goiânia',
      category: 'Clínica odontológica',
      neighborhoods: ['Setor Bueno', 'Setor Marista', 'Setor Oeste', 'Jardim Goiás'],
      selected: 'seleccionado',
      campaign: 'Campaña activa',
      sent: 'mensajes enviados',
      leads: 'leads extraídos',
      message: '¡Hola! Vi que su clínica está en Setor Bueno. ¿Le muestro cómo duplicar sus reseñas en Google?',
    },
  },
};

const VIEW = { once: true, amount: 0.35 } as const;
const EASE = [0.16, 1, 0.3, 1] as const;

function ProspectingVisual({ copy, separator }: { copy: LeadScrapCopy['visual']; separator: string }) {
  const ratings = ['4,9', '4,8', '4,7', '4,9'];
  const phones = ['(62) 9 ••••-••12', '(62) 9 ••••-••48', '(62) 3 •••-••07', '(62) 9 ••••-••91'];

  return (
    <div className="overflow-hidden rounded-sm border border-line bg-white shadow-[0_40px_90px_-55px_rgba(15,31,51,0.5)]">
      <motion.div
        className="flex items-center gap-3 border-b border-line px-5 py-4"
        initial="hidden"
        whileInView="show"
        viewport={VIEW}
      >
        <Search aria-hidden="true" className="size-4 shrink-0 text-mute" />
        <p className="relative truncate font-mono text-[0.8rem] text-ink">
          {copy.query}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 origin-right bg-white"
            variants={{
              hidden: { scaleX: 1 },
              show: { scaleX: 0, transition: { duration: 1.1, ease: 'linear', delay: 0.2 } },
            }}
          />
        </p>
      </motion.div>

      <ul>
        {copy.neighborhoods.map((neighborhood, i) => (
          <motion.li
            key={neighborhood}
            className="flex items-center gap-4 border-b border-line px-5 py-3.5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.6, ease: EASE, delay: 1.1 + i * 0.12 }}
          >
            <motion.span
              className="grid size-5 shrink-0 place-items-center rounded-[2px] border border-brand bg-brand text-white"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={VIEW}
              transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 1.5 + i * 0.12 }}
            >
              <Check aria-hidden="true" className="size-3" />
              <span className="sr-only">{copy.selected}</span>
            </motion.span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {copy.category} · {neighborhood}
              </p>
              <p className="font-mono text-[0.7rem] text-mute">{phones[i]}</p>
            </div>
            <span className="shrink-0 font-mono text-[0.72rem] text-ink-soft">★ {ratings[i]}</span>
          </motion.li>
        ))}
      </ul>

      <div className="grid grid-cols-1 gap-5 bg-surface p-5 sm:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mute">{copy.campaign}</p>
          <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink">
            <Counter value={4582} prefix="+" separator={separator} />
          </p>
          <p className="text-[0.75rem] text-mute">{copy.leads}</p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-[1px] bg-line">
            <motion.div
              className="h-full origin-left bg-brand"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 0.64 }}
              viewport={VIEW}
              transition={{ duration: 1.6, ease: EASE, delay: 1.8 }}
            />
          </div>
          <p className="mt-2 font-mono text-[0.7rem] text-mute">320 / 500 {copy.sent}</p>
        </div>
        <motion.p
          className="self-center rounded-sm bg-ink px-4 py-3 text-[0.8rem] leading-snug text-white"
          initial={{ opacity: 0, y: 14, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VIEW}
          transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 2.1 }}
        >
          {copy.message}
        </motion.p>
      </div>
    </div>
  );
}

export function LeadScrap() {
  const { language } = useTranslation();
  const copy = COPY[language];

  return (
    <section id="leadscrap" aria-labelledby="leadscrap-title" className="border-t border-line bg-white">
      <ChapterBar label={copy.chapter} href={SITE.leadScrapUrl} host="ls.viraweb.online" />
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 items-center gap-x-4 gap-y-14 px-4 py-20 sm:px-8 sm:py-28 lg:gap-x-10 lg:px-12">
        <div className="order-2 col-span-12 lg:order-1 lg:col-span-7">
          <Reveal y={40}>
            <ProspectingVisual copy={copy.visual} separator={language === 'en' ? ',' : '.'} />
          </Reveal>
        </div>

        <div className="order-1 col-span-12 lg:order-2 lg:col-span-5">
          <SplitWords
            id="leadscrap-title"
            className="text-[clamp(2.3rem,4.4vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink"
            parts={[
              copy.titleA,
              { text: copy.titleEm, className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' },
              copy.titleB,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-ink-soft sm:text-lg">{copy.lede}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <ul className="mt-8 space-y-2.5 border-t border-line pt-6">
              {copy.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-[0.95rem] text-ink">
                  <Check aria-hidden="true" className="size-4 text-brand" />
                  {perk}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.22} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ActionLink href={SITE.leadScrapUrl} {...EXTERNAL_LINK_PROPS} label={copy.primary} />
            <ActionLink href={whatsappLink(copy.whatsapp)} {...EXTERNAL_LINK_PROPS} label={copy.secondary} variant="outline" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
