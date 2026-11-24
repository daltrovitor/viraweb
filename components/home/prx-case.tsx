// Hello World
'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { ArrowDownLeft, CreditCard, QrCode, ReceiptText, Sparkles, Ticket, Users, Wallet, Zap } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { EXTERNAL_LINK_PROPS, whatsappLink, type Copy } from '@/lib/site';
import { getPrx, type PrxModuleKey } from '@/lib/home/products';
import { trackContact } from '@/lib/analytics';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';
import { ActionLink } from '@/components/ui/action-link';

interface CaseCopy {
  eyebrow: string;
  titleA: string;
  titleEm: string;
  titleB: string;
  lede: string;
  caseLabel: string;
  scopeLabel: string;
  scope: string;
  audienceLabel: string;
  audience: string;
  visit: string;
  want: string;
  whatsapp: string;
  illustrative: string;
  modulesLabel: string;
  screen: {
    balance: string;
    pix: string;
    card: string;
    statement: string;
    tx: [string, string, string];
    perks: string;
    perkItems: [string, string, string];
    redeem: string;
    wallet: string;
    eventName: string;
    eventWhen: string;
    level: string;
    coins: string;
    earned: string;
    next: string;
    meetup: string;
    investors: string;
    founders: string;
  };
}

const COPY: Copy<CaseCopy> = {
  pt: {
    eyebrow: 'Trabalhos',
    titleA: 'Não fazemos só sites. Construímos',
    titleEm: 'produtos',
    titleB: 'que as pessoas usam todo dia.',
    lede: 'O mesmo time que desenha a sua landing page projetou e desenvolveu um banco digital do zero. É esse nível de cuidado com interface, performance e detalhe que entra em cada projeto.',
    caseLabel: 'Case · Projetado e desenvolvido pela ViraWeb',
    scopeLabel: 'Escopo',
    scope: 'Produto, interface, site e desenvolvimento',
    audienceLabel: 'Público',
    audience: 'Geração Z, Geração Alpha e universitários',
    visit: 'Conhecer a PRX',
    want: 'Quero um produto assim',
    whatsapp: 'Olá ViraWeb! Vi o case da PRX e quero construir um produto digital com vocês.',
    illustrative: 'Telas ilustrativas da interface',
    modulesLabel: 'Módulos do app',
    screen: {
      balance: 'Saldo disponível',
      pix: 'Pix',
      card: 'Cartão',
      statement: 'Extrato',
      tx: ['Pix recebido', 'Benefício PRX PASS', 'Ingresso PRX LIVE'],
      perks: 'Benefícios para você',
      perkItems: ['Hamburgueria', 'Cinema', 'Academia'],
      redeem: 'Resgate por QR Code',
      wallet: 'Ingresso na carteira',
      eventName: 'Next Fest',
      eventWhen: 'SÁB · 22:00',
      level: 'Nível',
      coins: 'PRX Coins',
      earned: 'compra em parceiro',
      next: 'para o próximo nível',
      meetup: 'Próximo encontro',
      investors: 'Pitch night com investidores',
      founders: 'jovens empreendedores',
    },
  },
  en: {
    eyebrow: 'Work',
    titleA: 'We don’t just make websites. We build',
    titleEm: 'products',
    titleB: 'people use every day.',
    lede: 'The same team that designs your landing page designed and built a digital bank from scratch. That level of care for interface, performance and detail goes into every project.',
    caseLabel: 'Case · Designed and built by ViraWeb',
    scopeLabel: 'Scope',
    scope: 'Product, interface, website and development',
    audienceLabel: 'Audience',
    audience: 'Gen Z, Gen Alpha and university students',
    visit: 'Visit PRX',
    want: 'I want a product like this',
    whatsapp: 'Hello ViraWeb! I saw the PRX case and want to build a digital product with you.',
    illustrative: 'Illustrative interface screens',
    modulesLabel: 'App modules',
    screen: {
      balance: 'Available balance',
      pix: 'Pix',
      card: 'Card',
      statement: 'Statement',
      tx: ['Pix received', 'PRX PASS perk', 'PRX LIVE ticket'],
      perks: 'Perks for you',
      perkItems: ['Burger bar', 'Cinema', 'Gym'],
      redeem: 'Redeem by QR Code',
      wallet: 'Ticket in your wallet',
      eventName: 'Next Fest',
      eventWhen: 'SAT · 10 PM',
      level: 'Level',
      coins: 'PRX Coins',
      earned: 'partner purchase',
      next: 'to the next level',
      meetup: 'Next meetup',
      investors: 'Pitch night with investors',
      founders: 'young founders',
    },
  },
  es: {
    eyebrow: 'Trabajos',
    titleA: 'No hacemos solo sitios. Construimos',
    titleEm: 'productos',
    titleB: 'que la gente usa todos los días.',
    lede: 'El mismo equipo que diseña su landing page proyectó y desarrolló un banco digital desde cero. Ese nivel de cuidado con la interfaz, el rendimiento y el detalle entra en cada proyecto.',
    caseLabel: 'Caso · Diseñado y desarrollado por ViraWeb',
    scopeLabel: 'Alcance',
    scope: 'Producto, interfaz, sitio y desarrollo',
    audienceLabel: 'Público',
    audience: 'Generación Z, Generación Alpha y universitarios',
    visit: 'Conocer PRX',
    want: 'Quiero un producto así',
    whatsapp: '¡Hola ViraWeb! Vi el caso de PRX y quiero construir un producto digital con ustedes.',
    illustrative: 'Pantallas ilustrativas de la interfaz',
    modulesLabel: 'Módulos de la app',
    screen: {
      balance: 'Saldo disponible',
      pix: 'Pix',
      card: 'Tarjeta',
      statement: 'Extracto',
      tx: ['Pix recibido', 'Beneficio PRX PASS', 'Entrada PRX LIVE'],
      perks: 'Beneficios para ti',
      perkItems: ['Hamburguesería', 'Cine', 'Gimnasio'],
      redeem: 'Canje por código QR',
      wallet: 'Entrada en la billetera',
      eventName: 'Next Fest',
      eventWhen: 'SÁB · 22:00',
      level: 'Nivel',
      coins: 'PRX Coins',
      earned: 'compra en aliado',
      next: 'para el próximo nivel',
      meetup: 'Próximo encuentro',
      investors: 'Pitch night con inversores',
      founders: 'jóvenes emprendedores',
    },
  },
};

const GRADIENT = 'bg-gradient-to-br from-prx-violet via-[#4f80fe] to-prx-cyan';
const GRADIENT_TEXT = 'bg-gradient-to-r from-[#a066ff] to-prx-cyan bg-clip-text text-transparent';

const TAB_ICON: Record<PrxModuleKey, ReactNode> = {
  bank: <Wallet className="size-4" strokeWidth={1.5} />,
  pass: <QrCode className="size-4" strokeWidth={1.5} />,
  live: <Ticket className="size-4" strokeWidth={1.5} />,
  coins: <Sparkles className="size-4" strokeWidth={1.5} />,
  founders: <Users className="size-4" strokeWidth={1.5} />,
};

/** Deterministic QR-like pattern (identical on server and client). */
const QR_CELLS = Array.from({ length: 81 }, (_, i) => {
  const x = i % 9;
  const y = Math.floor(i / 9);
  const finder = (x < 3 && y < 3) || (x > 5 && y < 3) || (x < 3 && y > 5);
  return finder ? !(x % 2 === 1 && y % 2 === 1 && (x === 1 || x === 7) && (y === 1 || y === 7)) : (x * 7 + y * 13 + x * y) % 3 === 0;
});

function ScreenBank({ s }: { s: CaseCopy['screen'] }) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-[0.68rem] text-white/50">{s.balance}</p>
      <p className="mt-1 text-[1.65rem] font-semibold tracking-[-0.04em] tabular-nums">R$ 1.248,90</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: s.pix, icon: <Zap className="size-4" strokeWidth={1.5} /> },
          { label: s.card, icon: <CreditCard className="size-4" strokeWidth={1.5} /> },
          { label: s.statement, icon: <ReceiptText className="size-4" strokeWidth={1.5} /> },
        ].map((action) => (
          <span key={action.label} className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/[0.06] py-2.5 text-[0.62rem] text-white/80 ring-1 ring-white/10">
            {action.icon}
            {action.label}
          </span>
        ))}
      </div>
      <div className={cn('relative mt-4 overflow-hidden rounded-2xl p-3.5', GRADIENT)}>
        <div className="absolute -right-6 -top-8 size-24 rounded-full bg-white/20" />
        <p className="relative text-[0.7rem] font-semibold tracking-[0.18em]">PRX BANK</p>
        <p className="relative mt-6 font-mono text-[0.72rem] tracking-[0.2em] text-white/90">•••• 4821</p>
      </div>
      <ul className="mt-3 space-y-1.5">
        {[
          { label: s.tx[0], value: '+ R$ 50,00', positive: true },
          { label: s.tx[1], value: '- R$ 12,00', positive: false },
          { label: s.tx[2], value: '- R$ 60,00', positive: false },
        ].map((tx) => (
          <li key={tx.label} className="flex items-center justify-between rounded-xl bg-white/[0.04] px-2.5 py-2 text-[0.64rem]">
            <span className="flex items-center gap-2 text-white/80">
              <span className="grid size-5 place-items-center rounded-full bg-white/10">
                <ArrowDownLeft className={cn('size-3', !tx.positive && 'rotate-180')} strokeWidth={1.75} />
              </span>
              {tx.label}
            </span>
            <span className={cn('font-mono tabular-nums', tx.positive ? 'text-prx-cyan' : 'text-white/60')}>{tx.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScreenPass({ s }: { s: CaseCopy['screen'] }) {
  const deals = ['15% OFF', '2x1', '10% OFF'];
  return (
    <div className="flex h-full flex-col">
      <p className="text-sm font-semibold tracking-[-0.02em]">{s.perks}</p>
      <ul className="mt-3 space-y-2">
        {s.perkItems.map((item, i) => (
          <li key={item} className="flex items-center justify-between rounded-2xl bg-white/[0.05] p-2.5 ring-1 ring-white/10">
            <span className="flex items-center gap-2.5">
              <span className={cn('size-8 rounded-xl', i === 0 ? GRADIENT : i === 1 ? 'bg-[#4f80fe]' : 'bg-prx-violet')} />
              <span className="text-[0.7rem] text-white/85">{item}</span>
            </span>
            <span className={cn('text-[0.72rem] font-bold', GRADIENT_TEXT)}>{deals[i]}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center gap-3 rounded-2xl bg-white p-3 text-prx-ink">
        <div className="grid size-16 shrink-0 grid-cols-9 gap-[1.5px]">
          {QR_CELLS.map((on, i) => (
            <span key={i} className={cn('rounded-[1px]', on ? 'bg-prx-ink' : 'bg-transparent')} />
          ))}
        </div>
        <p className="text-[0.68rem] font-semibold leading-tight">{s.redeem}</p>
      </div>
    </div>
  );
}

function ScreenLive({ s }: { s: CaseCopy['screen'] }) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-sm font-semibold tracking-[-0.02em]">{s.wallet}</p>
      <div className={cn('relative mt-3 overflow-hidden rounded-[1.4rem] p-4', GRADIENT)}>
        <div className="absolute -bottom-10 -left-6 size-32 rounded-full bg-black/15" />
        <p className="relative text-[0.62rem] font-semibold tracking-[0.2em] text-white/80">PRX LIVE</p>
        <p className="relative mt-8 text-2xl font-bold tracking-[-0.05em]">{s.eventName}</p>
        <p className="relative mt-1 font-mono text-[0.68rem] text-white/85">{s.eventWhen}</p>
      </div>
      <div className="relative -mt-px rounded-b-[1.4rem] border-t border-dashed border-white/25 bg-white/[0.06] px-4 pb-4 pt-3">
        <div className="flex h-10 items-end gap-[3px]">
          {Array.from({ length: 34 }, (_, i) => (
            <span key={i} className="w-[2px] bg-white/80" style={{ height: `${40 + ((i * 37) % 60)}%` }} />
          ))}
        </div>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-2">
        {['PRX LIVE', 'PRX Coins +60'].map((chip) => (
          <span key={chip} className="rounded-2xl bg-white/[0.05] px-3 py-2.5 text-center text-[0.62rem] font-medium text-white/75 ring-1 ring-white/10">
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

function ScreenCoins({ s }: { s: CaseCopy['screen'] }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex h-full flex-col items-center">
      <div className="relative mt-2 size-40">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
          <defs>
            <linearGradient id="prx-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7607fd" />
              <stop offset="100%" stopColor="#0bd9fd" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
          <circle cx="60" cy="60" r={r} fill="none" stroke="url(#prx-ring)" strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * 0.32} />
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/50">{s.level}</p>
          <p className="text-4xl font-bold tracking-[-0.05em]">3</p>
        </div>
      </div>
      <p className="mt-3 text-xl font-semibold tabular-nums tracking-[-0.03em]">
        1.280 <span className={GRADIENT_TEXT}>{s.coins}</span>
      </p>
      <p className="mt-1 text-[0.62rem] text-white/50">720 {s.next}</p>
      <div className="mt-auto flex w-full items-center justify-between rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10">
        <span className="text-[0.66rem] text-white/75">{s.earned}</span>
        <span className="font-mono text-[0.72rem] font-semibold text-prx-cyan">+40</span>
      </div>
    </div>
  );
}

function ScreenFounders({ s }: { s: CaseCopy['screen'] }) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-sm font-semibold tracking-[-0.02em]">PRX Founders</p>
      <div className="mt-3 rounded-[1.4rem] bg-white/[0.05] p-4 ring-1 ring-white/10">
        <p className="text-[0.62rem] uppercase tracking-[0.18em] text-white/45">{s.meetup}</p>
        <p className="mt-2 text-lg font-semibold leading-tight tracking-[-0.03em]">{s.investors}</p>
        <div className="mt-4 flex items-center">
          {['#7607fd', '#4f80fe', '#0bd9fd', '#6420f9'].map((color, i) => (
            <span key={color} className="-ml-2 size-8 rounded-full ring-2 ring-prx-ink first:ml-0" style={{ background: color, zIndex: 4 - i }} />
          ))}
          <span className="ml-3 text-[0.64rem] text-white/60">+40 {s.founders}</span>
        </div>
      </div>
      <div className={cn('mt-auto rounded-2xl p-3 text-center text-[0.72rem] font-semibold', GRADIENT)}>Next is Yours</div>
    </div>
  );
}

function PhoneScreen({ module, s }: { module: PrxModuleKey; s: CaseCopy['screen'] }) {
  if (module === 'bank') return <ScreenBank s={s} />;
  if (module === 'pass') return <ScreenPass s={s} />;
  if (module === 'live') return <ScreenLive s={s} />;
  if (module === 'coins') return <ScreenCoins s={s} />;
  return <ScreenFounders s={s} />;
}

function Phone({ active, onSelect, copy }: { active: number; onSelect: (i: number) => void; copy: CaseCopy }) {
  const { language } = useTranslation();
  const prx = getPrx(language);
  const activeModule = prx.modules[active];
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-[min(78vw,19rem)] pin:w-[min(19rem,calc((100dvh-14rem)*0.47))]">
      <div className="rounded-[3rem] bg-[#16161d] p-[0.55rem] shadow-[0_2px_0_rgba(255,255,255,0.08)_inset,0_40px_80px_-30px_rgba(5,5,8,0.55),0_80px_120px_-60px_rgba(118,7,253,0.45)] ring-1 ring-black/40">
        <div className="relative aspect-[9/18.5] overflow-hidden rounded-[2.5rem] bg-prx-ink text-white">
          <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(118,7,253,0.35),transparent)]" />
          <div className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          <div className="relative flex h-full flex-col px-4 pb-3 pt-11">
            <div className="flex items-center justify-between">
              <span className={cn('text-lg font-bold tracking-[-0.05em]', GRADIENT_TEXT)}>PRX</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.56rem] font-semibold tracking-[0.14em] text-white/80">{activeModule.name}</span>
            </div>

            <div className="relative mt-4 min-h-0 flex-1">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeModule.key}
                  className="absolute inset-0"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18, filter: 'blur(6px)' }}
                  transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                >
                  <PhoneScreen module={activeModule.key} s={copy.screen} />
                </motion.div>
              </AnimatePresence>
            </div>

            <nav aria-label={copy.modulesLabel} className="mt-3 grid grid-cols-5 rounded-2xl bg-white/[0.06] p-1 ring-1 ring-white/10">
              {prx.modules.map((item, i) => (
                <button
                  key={item.key}
                  type="button"
                  aria-label={item.name}
                  aria-pressed={i === active}
                  onClick={() => onSelect(i)}
                  className={cn(
                    'relative grid h-9 place-items-center rounded-xl transition-colors duration-300',
                    i === active ? 'text-white' : 'text-white/40 hover:text-white/70',
                  )}
                >
                  {i === active ? (
                    <motion.span layoutId="prx-tab" className={cn('absolute inset-0 rounded-xl', GRADIENT)} transition={{ type: 'spring', stiffness: 320, damping: 30 }} />
                  ) : null}
                  <span className="relative">{TAB_ICON[item.key]}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleList({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const { language } = useTranslation();
  const prx = getPrx(language);

  return (
    <ol className="mt-7 border-t border-line">
      {prx.modules.map((module, i) => {
        const on = i === active;
        return (
          <li key={module.key} className="border-b border-line">
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={on}
              className="group relative flex w-full items-start gap-4 py-4 text-left pin:py-3"
            >
              <span className={cn('mt-0.5 font-mono text-[0.7rem] transition-colors duration-300', on ? 'text-prx-violet' : 'text-mute')}>
                0{i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn('block text-base font-semibold tracking-[-0.02em] transition-colors duration-300 sm:text-lg', on ? 'text-ink' : 'text-ink-soft group-hover:text-ink')}>
                  {module.name}
                </span>
                <span
                  className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                    on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <span className="overflow-hidden">
                    <span className="block pt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{module.body}</span>
                  </span>
                </span>
              </span>
              <span aria-hidden="true" className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-gradient-to-r from-prx-violet to-prx-cyan transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" style={{ transform: `scaleX(${on ? 1 : 0})` }} />
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * PRX case. On large screens the phone is pinned while the scroll walks
 * through the five modules; on smaller screens the modules auto-advance while
 * in view and can be tapped.
 */
export function PrxCase() {
  const { language } = useTranslation();
  const copy = COPY[language];
  const prx = getPrx(language);
  const count = prx.modules.length;

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const inView = useInView(stageRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px) and (min-height: 860px)');
    const update = () => setPinned(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!pinned) return;
    setActive(Math.min(count - 1, Math.max(0, Math.floor(progress * count))));
  });

  // Small screens: walk through the modules on a timer while the phone is visible.
  useEffect(() => {
    if (pinned || !inView || reduceMotion) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % count), 3200);
    return () => window.clearInterval(timer);
  }, [pinned, inView, reduceMotion, count]);

  return (
    <section id="trabalhos" aria-labelledby="work-title" className="scroll-mt-4 bg-white pt-24 sm:pt-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-8 px-4 sm:px-8 lg:gap-x-10 lg:px-12">
        <div className="col-span-12 lg:col-span-8">
          <Reveal y={14}>
            <p className="eyebrow">{copy.eyebrow}</p>
          </Reveal>
          <SplitWords
            id="work-title"
            className="mt-6 text-[clamp(2.2rem,5.2vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-ink"
            parts={[copy.titleA, { text: copy.titleEm, className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' }, copy.titleB]}
          />
        </div>
        <Reveal className="col-span-12 self-end md:col-span-7 lg:col-span-4">
          <p className="text-base leading-relaxed text-ink-soft sm:text-lg">{copy.lede}</p>
        </Reveal>
      </div>

      <div ref={trackRef} className="relative mt-14 lg:mt-20 pin:h-[340vh]">
        <div className="pin:sticky pin:top-0 pin:flex pin:h-[100dvh] pin:items-center pin:pb-4 pin:pt-[calc(var(--nav-h)+0.25rem)]">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
            <div className="bezel bezel-lg">
              <div className="bezel-core relative">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_60%_at_78%_45%,rgba(118,7,253,0.10),transparent_70%),radial-gradient(35%_45%_at_95%_90%,rgba(11,217,253,0.12),transparent_70%)]" />
                <div className="relative grid grid-cols-12 items-center gap-x-6 gap-y-12 p-5 sm:p-10 lg:gap-x-10 lg:p-12 pin:py-9">
                  <div className="col-span-12 lg:col-span-6 xl:col-span-5">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mute">{copy.caseLabel}</p>
                    <h3 className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className={cn('text-[clamp(3rem,6vw,5rem)] font-bold leading-none tracking-[-0.06em]', 'bg-gradient-to-r from-prx-violet to-prx-cyan bg-clip-text text-transparent')}>
                        PRX
                      </span>
                      <span className="text-[clamp(1.4rem,2.4vw,2.1rem)] font-semibold leading-tight tracking-[-0.04em] text-ink">{prx.tagline}</span>
                    </h3>
                    <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-ink-soft">{prx.definition}</p>

                    <dl className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2 [@media(min-width:1024px)_and_(max-height:959px)]:hidden">
                      <div className="border-t border-line py-3">
                        <dt className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-mute">{copy.scopeLabel}</dt>
                        <dd className="mt-1 text-[0.92rem] font-medium leading-snug text-ink">{copy.scope}</dd>
                      </div>
                      <div className="border-t border-line py-3">
                        <dt className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-mute">{copy.audienceLabel}</dt>
                        <dd className="mt-1 text-[0.92rem] font-medium leading-snug text-ink">{copy.audience}</dd>
                      </div>
                    </dl>

                    <ModuleList active={active} onSelect={setActive} />

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <ActionLink href={prx.url} {...EXTERNAL_LINK_PROPS} label={copy.visit} className="w-full sm:w-auto" />
                      <ActionLink
                        href={whatsappLink(copy.whatsapp)}
                        {...EXTERNAL_LINK_PROPS}
                        label={copy.want}
                        variant="outline"
                        onClick={() => trackContact('product', 'prx')}
                        className="w-full sm:w-auto"
                      />
                    </div>
                  </div>

                  <div ref={stageRef} className="order-first col-span-12 lg:order-none lg:col-span-6 xl:col-span-6 xl:col-start-7">
                    <div className="relative">
                      <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[min(90vw,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line-strong/70" />
                      <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[min(70vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-prx-violet/15 to-prx-cyan/15" />
                      <Phone active={active} onSelect={setActive} copy={copy} />
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-1.5" aria-hidden="true">
                      {prx.modules.map((module, i) => (
                        <span key={module.key} className={cn('h-1 rounded-full transition-all duration-500', i === active ? 'w-8 bg-ink' : 'w-2 bg-line-strong')} />
                      ))}
                    </div>
                    <p className="mt-3 text-center text-[0.72rem] text-mute">{copy.illustrative}</p>
                  </div>
                </div>
                <p className="relative border-t border-line px-5 py-4 text-[0.75rem] leading-relaxed text-mute sm:px-10 lg:px-12 pin:py-3">{prx.disclaimer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
