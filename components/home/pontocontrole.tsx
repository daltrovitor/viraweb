// Hello World
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ScanFace } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { EXTERNAL_LINK_PROPS, SITE, whatsappLink, type Copy } from '@/lib/site';
import { getPontoControle, PONTO_PLANS, brl } from '@/lib/home/products';
import { trackContact } from '@/lib/analytics';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';
import { ActionLink } from '@/components/ui/action-link';

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
  titleA: string;
  titleEm: string;
  titleB: string;
  primary: string;
  secondary: string;
  whatsapp: string;
  trial: string;
  features: Array<{ title: string; body: string }>;
  audienceTitle: string;
  audiences: Array<{ title: string; body: string }>;
  plansTitle: string;
  perMonth: string;
  onRequest: string;
  law: string;
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

// Features, audiences, plans and legal references mirror pontocontrole.com.br.
const COPY: Copy<PontoCopy> = {
  pt: {
    titleA: 'Controle de ponto pelo celular, com',
    titleEm: 'reconhecimento facial',
    titleB: 'e GPS.',
    primary: 'Testar grátis por 14 dias',
    secondary: 'Falar no WhatsApp',
    whatsapp: 'Olá ViraWeb! Tenho interesse no PontoControle para controle de ponto e banco de horas.',
    trial: '14 dias grátis com todos os recursos. Sem cartão de crédito, sem taxa de adesão e sem fidelidade.',
    features: [
      { title: 'Reconhecimento facial', body: 'Cada batida confere o rosto do funcionário. Ninguém bate o ponto pelo colega.' },
      { title: 'GPS em cada marcação', body: 'Veja onde o ponto foi registrado: na empresa, na casa ou no cliente.' },
      { title: 'Painel em tempo real', body: 'Horários e status de todos os funcionários, no momento em que acontecem.' },
      { title: 'Horas extras e banco de horas', body: 'Atrasos, faltas, extras e saldo calculados automaticamente a partir da jornada.' },
      { title: 'Espelho de ponto em PDF', body: 'Relatório mensal por funcionário em 1 clique, pronto para a contabilidade e o eSocial.' },
      { title: 'Funciona sem internet', body: 'Sem sinal, a marcação fica salva no celular e sincroniza quando a conexão volta.' },
    ],
    audienceTitle: 'Para quem é',
    audiences: [
      { title: 'Pequenas empresas', body: 'Comércios, clínicas, escritórios, restaurantes, salões e equipes externas.' },
      { title: 'Empregador doméstico', body: 'Empregada doméstica, babá, cuidador de idosos, caseiro ou motorista.' },
    ],
    plansTitle: 'Planos',
    perMonth: '/mês',
    onRequest: 'Sob consulta',
    law: 'Para empregados domésticos, o registro do horário é obrigatório (Lei Complementar 150/2015, art. 12). Para empresas, é obrigatório nos estabelecimentos com mais de 20 trabalhadores (CLT, art. 74, § 2º).',
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
    titleA: 'Time tracking on the phone, with',
    titleEm: 'facial recognition',
    titleB: 'and GPS.',
    primary: 'Try it free for 14 days',
    secondary: 'Talk on WhatsApp',
    whatsapp: 'Hello ViraWeb! I am interested in PontoControle for employee time tracking.',
    trial: '14 days free with every feature. No credit card, no setup fee and no lock-in.',
    features: [
      { title: 'Facial recognition', body: 'Every clock-in checks the employee’s face. Nobody clocks in for a colleague.' },
      { title: 'GPS on every record', body: 'See where the clock-in happened: at the company, at home or at the client.' },
      { title: 'Real-time panel', body: 'Schedules and status of every employee, as they happen.' },
      { title: 'Overtime and hour bank', body: 'Late arrivals, absences, overtime and balance calculated automatically from the schedule.' },
      { title: 'Timesheet in PDF', body: 'Monthly report per employee in one click, ready for accounting and eSocial.' },
      { title: 'Works offline', body: 'With no signal, the record is saved on the phone and syncs when the connection returns.' },
    ],
    audienceTitle: 'Who it is for',
    audiences: [
      { title: 'Small businesses', body: 'Shops, clinics, offices, restaurants, salons and field teams.' },
      { title: 'Household employers', body: 'Housekeeper, nanny, elderly caregiver, caretaker or driver.' },
    ],
    plansTitle: 'Plans',
    perMonth: '/month',
    onRequest: 'On request',
    law: 'For household employees in Brazil, recording working hours is mandatory (Complementary Law 150/2015, article 12). For companies, it is mandatory in establishments with more than 20 workers (CLT, article 74, paragraph 2).',
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
    titleA: 'Control de asistencia en el celular, con',
    titleEm: 'reconocimiento facial',
    titleB: 'y GPS.',
    primary: 'Probar gratis por 14 días',
    secondary: 'Hablar por WhatsApp',
    whatsapp: '¡Hola ViraWeb! Tengo interés en PontoControle para control de asistencia.',
    trial: '14 días gratis con todas las funciones. Sin tarjeta de crédito, sin costo de alta y sin permanencia.',
    features: [
      { title: 'Reconocimiento facial', body: 'Cada registro verifica el rostro del empleado. Nadie registra por un compañero.' },
      { title: 'GPS en cada registro', body: 'Vea dónde se hizo el registro: en la empresa, en la casa o con el cliente.' },
      { title: 'Panel en tiempo real', body: 'Horarios y estado de todos los empleados, en el momento en que ocurren.' },
      { title: 'Horas extra y banco de horas', body: 'Atrasos, faltas, extras y saldo calculados automáticamente a partir de la jornada.' },
      { title: 'Planilla en PDF', body: 'Reporte mensual por empleado en 1 clic, listo para la contabilidad y el eSocial.' },
      { title: 'Funciona sin internet', body: 'Sin señal, el registro queda guardado en el celular y se sincroniza al volver la conexión.' },
    ],
    audienceTitle: 'Para quién es',
    audiences: [
      { title: 'Pequeñas empresas', body: 'Comercios, clínicas, oficinas, restaurantes, salones y equipos externos.' },
      { title: 'Empleador doméstico', body: 'Empleada doméstica, niñera, cuidador de adultos mayores, casero o chofer.' },
    ],
    plansTitle: 'Planes',
    perMonth: '/mes',
    onRequest: 'Bajo consulta',
    law: 'Para empleados domésticos en Brasil, registrar el horario es obligatorio (Ley Complementaria 150/2015, art. 12). Para empresas, es obligatorio en establecimientos con más de 20 trabajadores (CLT, art. 74, § 2).',
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

/** Interactive demo: scan a face, watch the clock-in land in the live log. */
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
      <div className="flex flex-col border-b border-line p-5 sm:p-6 md:border-b-0 md:border-r">
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
  const plans = PONTO_PLANS[language];
  const definition = getPontoControle(language).definition;

  return (
    <section id="pontocontrole" aria-labelledby="pontocontrole-title" className="scroll-mt-4 border-t border-line bg-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-14 px-4 py-20 sm:px-8 sm:py-28 lg:gap-x-10 lg:px-12">
        {/* Copy — right column on large screens, so this chapter mirrors the previous one */}
        <div className="col-span-12 lg:order-2 lg:col-span-5 lg:col-start-8">
          <Reveal y={16}>
            <Image src="/logo.png" alt="PontoControle" width={2195} height={514} sizes="200px" className="h-9 w-auto sm:h-10" />
          </Reveal>
          <SplitWords
            id="pontocontrole-title"
            className="mt-10 text-[clamp(2.1rem,3.8vw,3.75rem)] font-semibold leading-[1] tracking-[-0.045em] text-ink"
            parts={[
              copy.titleA,
              { text: copy.titleEm, className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' },
              copy.titleB,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-ink-soft sm:text-lg">{definition}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ActionLink href={SITE.pontoControleUrl} {...EXTERNAL_LINK_PROPS} label={copy.primary} />
            <ActionLink
              href={whatsappLink(copy.whatsapp)}
              {...EXTERNAL_LINK_PROPS}
              label={copy.secondary}
              variant="outline"
              onClick={() => trackContact('product', 'pontocontrole')}
            />
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-[50ch] text-sm leading-relaxed text-mute">{copy.trial}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-12 font-mono text-[0.72rem] font-normal uppercase tracking-[0.14em] text-mute">{copy.audienceTitle}</h3>
            <dl className="mt-3 border-t border-line">
              {copy.audiences.map((audience) => (
                <div key={audience.title} className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="text-[0.95rem] font-semibold text-ink">{audience.title}</dt>
                  <dd className="text-[0.92rem] leading-relaxed text-ink-soft">{audience.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-10 font-mono text-[0.72rem] font-normal uppercase tracking-[0.14em] text-mute">{copy.plansTitle}</h3>
            <ul className="mt-3 border-t border-line">
              {plans.map((plan) => (
                <li key={plan.name} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
                  <span>
                    <span className="block text-[0.95rem] font-semibold text-ink">{plan.name}</span>
                    <span className="block text-[0.85rem] text-mute">{plan.limit}</span>
                  </span>
                  <span className="shrink-0 text-right text-[0.95rem] font-semibold tabular-nums text-ink">
                    {plan.price === null ? (
                      copy.onRequest
                    ) : (
                      <>
                        {brl(plan.price)}
                        <span className="font-normal text-mute">{copy.perMonth}</span>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[56ch] text-[0.85rem] leading-relaxed text-mute">{copy.law}</p>
          </Reveal>
        </div>

        {/* Demo and features — left column on large screens */}
        <div className="col-span-12 lg:order-1 lg:col-span-6 lg:col-start-1">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
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
      </div>
    </section>
  );
}
