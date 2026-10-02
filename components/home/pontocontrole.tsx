// Hello World
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ScanFace } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { EXTERNAL_LINK_PROPS, SITE, whatsappLink, type Copy } from '@/lib/site';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';
import { ActionLink } from '@/components/ui/action-link';
import { ChapterBar } from '@/components/home/chapter-bar';

type Presence = 'present' | 'break';
type Role = 'housekeeper' | 'driver' | 'caregiver' | 'team';

interface Punch {
  id: number;
  name: string;
  role: Role;
  time: string;
  kind: 'in' | 'lunch' | 'out';
  presence: Presence;
  place: string;
}

interface PontoCopy {
  chapter: string;
  titleA: string;
  titleEm: string;
  titleB: string;
  lede: string;
  primary: string;
  secondary: string;
  whatsapp: string;
  features: Array<{ title: string; body: string }>;
  sim: {
    title: string;
    idle: string;
    scanning: string;
    success: string;
    button: string;
    log: string;
    kinds: Record<Punch['kind'], string>;
    presence: Record<Presence, string>;
    roles: Record<Role, string>;
  };
}

const COPY: Copy<PontoCopy> = {
  pt: {
    chapter: 'Produto 02',
    titleA: 'Tecnologia que',
    titleEm: 'simplifica',
    titleB: 'o controle de ponto.',
    lede: 'Ponto eletrônico com biometria facial, geolocalização por GPS e conformidade com a Portaria 671 do MTE — construído com o que há de mais moderno para garantir precisão e facilidade no dia a dia.',
    primary: 'Conhecer o PontoControle',
    secondary: 'Falar no WhatsApp',
    whatsapp: 'Olá ViraWeb! Estou interessado no PontoControle para controle de ponto e banco de horas.',
    features: [
      { title: 'Reconhecimento facial', body: 'Biometria facial que valida a identidade em cada registro de ponto com alta precisão.' },
      { title: 'Geolocalização', body: 'Captura automática da localização GPS em cada batida de ponto.' },
      { title: 'Segurança total', body: 'Criptografia de dados, auditoria completa e conformidade com a LGPD.' },
      { title: 'Gestão para o lar', body: 'Ideal para funcionários domésticos, cuidadores e pequenas equipes.' },
      { title: 'Relatórios em PDF', body: 'Frequência, horas trabalhadas e atrasos exportáveis em PDF.' },
      { title: 'Gestão de equipe', body: 'Painel com horários e status de todos os funcionários em tempo real.' },
    ],
    sim: {
      title: 'Registro de ponto',
      idle: 'Posicione o rosto no quadro',
      scanning: 'Verificando biometria…',
      success: 'Ponto registrado',
      button: 'Registrar ponto',
      log: 'Últimos registros',
      kinds: { in: 'Entrada', lunch: 'Almoço', out: 'Saída' },
      presence: { present: 'Presente', break: 'Intervalo' },
      roles: { housekeeper: 'Doméstica', driver: 'Motorista', caregiver: 'Cuidadora', team: 'Equipe PME' },
    },
  },
  en: {
    chapter: 'Product 02',
    titleA: 'Technology that',
    titleEm: 'simplifies',
    titleB: 'time tracking.',
    lede: 'Digital time clock with facial biometrics, GPS geolocation and compliance with Brazil’s MTE Ordinance 671 — built with modern tools for accuracy and ease every day.',
    primary: 'Discover PontoControle',
    secondary: 'Talk on WhatsApp',
    whatsapp: 'Hello ViraWeb! I am interested in PontoControle for employee attendance.',
    features: [
      { title: 'Facial recognition', body: 'Facial biometrics that validates identity on every clock-in with high precision.' },
      { title: 'Geolocation', body: 'Automatic GPS capture with every clock-in.' },
      { title: 'Total security', body: 'Data encryption, full audit trail and LGPD compliance.' },
      { title: 'Household management', body: 'Ideal for domestic workers, caregivers and small teams.' },
      { title: 'PDF reports', body: 'Attendance, hours worked and late arrivals exportable to PDF.' },
      { title: 'Team management', body: 'Live panel with every employee’s schedule and status.' },
    ],
    sim: {
      title: 'Clock-in',
      idle: 'Place your face in the frame',
      scanning: 'Checking biometrics…',
      success: 'Clock-in recorded',
      button: 'Clock in',
      log: 'Latest records',
      kinds: { in: 'Check-in', lunch: 'Lunch', out: 'Check-out' },
      presence: { present: 'Present', break: 'Break' },
      roles: { housekeeper: 'Housekeeper', driver: 'Driver', caregiver: 'Caregiver', team: 'SMB team' },
    },
  },
  es: {
    chapter: 'Producto 02',
    titleA: 'Tecnología que',
    titleEm: 'simplifica',
    titleB: 'el control de asistencia.',
    lede: 'Reloj de asistencia digital con biometría facial, geolocalización GPS y cumplimiento de la Portaria 671 del MTE — construido con lo más moderno para garantizar precisión y facilidad en el día a día.',
    primary: 'Conocer PontoControle',
    secondary: 'Hablar por WhatsApp',
    whatsapp: '¡Hola ViraWeb! Estoy interesado en la herramienta PontoControle.',
    features: [
      { title: 'Reconocimiento facial', body: 'Biometría facial que valida la identidad en cada registro con alta precisión.' },
      { title: 'Geolocalización', body: 'Captura automática de la ubicación GPS en cada registro.' },
      { title: 'Seguridad total', body: 'Cifrado de datos, auditoría completa y cumplimiento de la LGPD.' },
      { title: 'Gestión del hogar', body: 'Ideal para empleados domésticos, cuidadores y pequeños equipos.' },
      { title: 'Reportes en PDF', body: 'Asistencia, horas trabajadas y atrasos exportables en PDF.' },
      { title: 'Gestión de equipos', body: 'Panel con horarios y estado de todos los empleados en tiempo real.' },
    ],
    sim: {
      title: 'Registro de asistencia',
      idle: 'Ubique el rostro en el cuadro',
      scanning: 'Verificando biometría…',
      success: 'Registro realizado',
      button: 'Registrar asistencia',
      log: 'Últimos registros',
      kinds: { in: 'Entrada', lunch: 'Almuerzo', out: 'Salida' },
      presence: { present: 'Presente', break: 'Receso' },
      roles: { housekeeper: 'Doméstica', driver: 'Chofer', caregiver: 'Cuidadora', team: 'Equipo PyME' },
    },
  },
};

const INITIAL_PUNCHES: Punch[] = [
  { id: 3, name: 'Maria Silva', role: 'housekeeper', time: '08:00', kind: 'in', presence: 'present', place: 'Setor Bueno' },
  { id: 2, name: 'João Santos', role: 'driver', time: '09:12', kind: 'in', presence: 'present', place: 'Setor Marista' },
  { id: 1, name: 'Ana Souza', role: 'caregiver', time: '12:00', kind: 'lunch', presence: 'break', place: 'Setor Oeste' },
];

type ScanState = 'idle' | 'scanning' | 'success';

function FaceScanSimulator({ copy }: { copy: PontoCopy['sim'] }) {
  const [state, setState] = useState<ScanState>('idle');
  const [punches, setPunches] = useState<Punch[]>(INITIAL_PUNCHES);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const scan = () => {
    if (state !== 'idle') return;
    setState('scanning');
    timers.current.push(
      window.setTimeout(() => {
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setState('success');
        setPunches((current) =>
          [
            { id: Date.now(), name: 'Roberto Souza', role: 'team' as const, time, kind: 'out' as const, presence: 'present' as const, place: 'Setor Sul' },
            ...current,
          ].slice(0, 4),
        );
        timers.current.push(window.setTimeout(() => setState('idle'), 2200));
      }, 1600),
    );
  };

  const status = state === 'idle' ? copy.idle : state === 'scanning' ? copy.scanning : copy.success;

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-sm border border-line bg-white shadow-[0_40px_90px_-55px_rgba(15,31,51,0.5)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col border-b border-line p-5 md:border-r md:border-b-0 sm:p-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">{copy.title}</p>
        <div className="relative mx-auto mt-5 aspect-square w-full max-w-[260px] overflow-hidden rounded-sm bg-surface">
          {/* Corner brackets */}
          {['left-3 top-3 border-l-2 border-t-2', 'right-3 top-3 border-r-2 border-t-2', 'left-3 bottom-3 border-l-2 border-b-2', 'right-3 bottom-3 border-r-2 border-b-2'].map((pos) => (
            <span
              key={pos}
              aria-hidden="true"
              className={cn('absolute size-6 transition-colors duration-500', pos, state === 'success' ? 'border-[#15803d]' : 'border-brand')}
            />
          ))}
          <svg viewBox="0 0 120 120" className="absolute inset-0 m-auto w-[62%] text-ink-soft" aria-hidden="true">
            <ellipse cx="60" cy="50" rx="24" ry="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M24 116 C26 92 42 82 60 82 C78 82 94 92 96 116" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M50 46 h0.01 M70 46 h0.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M52 62 Q60 67 68 62" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <AnimatePresence>
            {state === 'scanning' ? (
              <motion.span
                key="scan"
                aria-hidden="true"
                className="absolute inset-x-4 top-4 h-0.5 bg-brand"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: [0, 210, 0] }}
                exit={{ opacity: 0 }}
                transition={{ y: { duration: 1.6, ease: 'easeInOut' }, opacity: { duration: 0.2 } }}
              />
            ) : null}
            {state === 'success' ? (
              <motion.span
                key="ok"
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center bg-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.span
                  className="grid size-14 place-items-center rounded-sm bg-[#15803d] text-white"
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <Check className="size-7" />
                </motion.span>
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
        <p className="mt-4 text-center text-sm text-ink-soft" aria-live="polite">
          {status}
        </p>
        <button
          type="button"
          onClick={scan}
          disabled={state !== 'idle'}
          className="mt-4 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-sm bg-ink px-5 text-sm font-medium text-white transition-colors hover:bg-brand disabled:cursor-wait disabled:bg-ink-soft"
        >
          <ScanFace aria-hidden="true" className="size-4" />
          {copy.button}
        </button>
      </div>

      <div className="p-5 sm:p-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">{copy.log}</p>
        <ul className="mt-4">
          <AnimatePresence initial={false}>
            {punches.map((punch) => (
              <motion.li
                key={punch.id}
                layout
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="flex items-center justify-between gap-3 border-b border-line py-3.5 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{punch.name}</p>
                  <p className="truncate text-[0.75rem] text-mute">
                    {copy.roles[punch.role]} · {punch.place}, Goiânia
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-[0.78rem] tabular-nums text-ink">
                    {punch.time} <span className="text-mute">{copy.kinds[punch.kind]}</span>
                  </p>
                  <p
                    className={cn(
                      'mt-0.5 text-[0.66rem] font-semibold uppercase tracking-[0.1em]',
                      punch.presence === 'present' ? 'text-[#15803d]' : 'text-[#9a5b06]',
                    )}
                  >
                    {copy.presence[punch.presence]}
                  </p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

export function PontoControle() {
  const { language } = useTranslation();
  const copy = COPY[language];

  return (
    <section id="pontocontrole" aria-labelledby="pontocontrole-title" className="border-t border-line bg-white">
      <ChapterBar label={copy.chapter} href={SITE.pontoControleUrl} host="pontocontrole.com.br" />
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-14 px-4 py-20 sm:px-8 sm:py-28 lg:gap-x-10 lg:px-12">
        <div className="col-span-12 lg:col-span-5">
          <Reveal y={16}>
            <Image src="/logo.png" alt="PontoControle" width={2195} height={514} sizes="200px" className="h-9 w-auto sm:h-10" />
          </Reveal>
          <SplitWords
            id="pontocontrole-title"
            className="mt-10 text-[clamp(2.3rem,4.4vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink"
            parts={[
              copy.titleA,
              { text: copy.titleEm, className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' },
              copy.titleB,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-ink-soft sm:text-lg">{copy.lede}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ActionLink href={SITE.pontoControleUrl} {...EXTERNAL_LINK_PROPS} label={copy.primary} />
            <ActionLink href={whatsappLink(copy.whatsapp)} {...EXTERNAL_LINK_PROPS} label={copy.secondary} variant="outline" />
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <Reveal y={40}>
            <FaceScanSimulator copy={copy.sim} />
          </Reveal>
          <ol className="mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-2">
            {copy.features.map((feature, i) => (
              <li key={feature.title} className="border-b border-line py-5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
                <Reveal y={14} delay={(i % 2) * 0.06}>
                  <h3 className="flex items-baseline gap-3 text-base font-semibold tracking-[-0.01em] text-ink">
                    <span className="font-mono text-[0.72rem] font-normal text-mute">{String(i + 1).padStart(2, '0')}</span>
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 pl-8 text-[0.92rem] leading-relaxed text-ink-soft">{feature.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
