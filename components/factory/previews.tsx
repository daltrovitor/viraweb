// Hello World
'use client';

import type { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import type { PreviewKind } from '@/lib/factory/types';
import { cn } from '@/lib/utils';

/**
 * Product previews drawn as real interface fragments (no images, no extra bytes).
 * Every block carries the `item` variant: a parent that sets
 * `initial="hidden" animate="show"` assembles the interface piece by piece.
 */

const SPRING = { type: 'spring', stiffness: 300, damping: 28 } as const;

export const assemble: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: SPRING },
};

function B({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

const bar = 'rounded-[2px] bg-line-strong/70';

function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-sm border border-line-strong bg-white shadow-[0_24px_60px_-32px_rgba(15,31,51,0.35)]">
      <div className="flex items-center gap-3 border-b border-line bg-surface px-3 py-2">
        <span className="flex gap-1" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-line-strong" />
          <span className="size-1.5 rounded-full bg-line-strong" />
          <span className="size-1.5 rounded-full bg-line-strong" />
        </span>
        <span className="truncate rounded-[2px] bg-white px-2 py-0.5 font-mono text-[9px] text-mute">{url}</span>
      </div>
      <motion.div variants={assemble} className="relative flex-1 overflow-hidden p-3 sm:p-4">
        {children}
      </motion.div>
    </div>
  );
}

function PhoneFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto flex h-full w-[min(100%,15rem)] flex-col overflow-hidden rounded-md border border-line-strong bg-white shadow-[0_24px_60px_-32px_rgba(15,31,51,0.35)]">
      <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-2.5">
        <span className="grid size-5 place-items-center rounded-[2px] bg-ink font-mono text-[8px] font-semibold text-white">VW</span>
        <span className="text-[10px] font-medium text-ink">{title}</span>
      </div>
      <motion.div variants={assemble} className="flex flex-1 flex-col gap-2 overflow-hidden p-3">
        {children}
      </motion.div>
    </div>
  );
}

function Bubble({ from, children }: { from: 'bot' | 'user'; children: ReactNode }) {
  return (
    <B
      className={cn(
        'max-w-[82%] rounded-sm px-2.5 py-1.5 text-[10px] leading-snug',
        from === 'bot' ? 'self-start bg-surface-2 text-ink' : 'self-end bg-ink text-white',
      )}
    >
      {children}
    </B>
  );
}

function Landing({ sales = false }: { sales?: boolean }) {
  return (
    <BrowserFrame url={sales ? 'seucurso.com.br/oferta' : 'suamarca.com.br'}>
      <B className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-ink">Fluent.</span>
        <span className="flex gap-2">
          <span className={cn(bar, 'h-1 w-6')} />
          <span className={cn(bar, 'h-1 w-6')} />
        </span>
      </B>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-3 flex flex-col gap-2">
          <B className="text-[clamp(0.85rem,2.4vw,1.25rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            Inglês fluente em 6 meses.
          </B>
          <B className="text-[9px] leading-snug text-mute">Aulas ao vivo, método próprio e certificado.</B>
          <B className="mt-1 inline-flex w-fit items-center rounded-[2px] bg-brand px-2.5 py-1.5 text-[9px] font-medium text-white">
            {sales ? 'Garantir minha vaga — R$ 497' : 'Falar no WhatsApp'}
          </B>
        </div>
        <B className="col-span-2 aspect-[4/5] rounded-sm bg-brand-tint" />
      </div>
      {sales ? (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {['“Mudou minha carreira.”', '“Aulas incríveis.”', '“Recomendo demais.”'].map((quote) => (
            <B key={quote} className="rounded-[2px] border border-line p-1.5 text-[8px] leading-snug text-ink-soft">
              {quote}
              <span className="mt-1 block text-[#b7791f]" aria-hidden="true">★★★★★</span>
            </B>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex gap-2">
          {[0, 1, 2].map((i) => (
            <B key={i} className="h-8 flex-1 rounded-[2px] bg-surface" />
          ))}
        </div>
      )}
    </BrowserFrame>
  );
}

function Site() {
  return (
    <BrowserFrame url="construtoraaurora.com.br">
      <B className="mb-3 flex items-center justify-between border-b border-line pb-2">
        <span className="text-[10px] font-semibold tracking-[0.12em] text-ink">AURORA</span>
        <span className="flex gap-2 text-[8px] text-mute">
          <span>Sobre</span>
          <span>Obras</span>
          <span>Serviços</span>
          <span>Contato</span>
        </span>
      </B>
      <B className="mb-3 grid grid-cols-2 items-end gap-3">
        <span className="text-[clamp(0.8rem,2.2vw,1.15rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
          Construímos o que permanece.
        </span>
        <span className="h-12 rounded-sm bg-surface-2" />
      </B>
      <div className="grid grid-cols-3 gap-2">
        {['Residencial', 'Comercial', 'Reformas'].map((label) => (
          <B key={label} className="border-t border-ink pt-1.5 text-[9px] font-medium text-ink">
            {label}
            <span className={cn(bar, 'mt-1.5 block h-1 w-4/5')} />
            <span className={cn(bar, 'mt-1 block h-1 w-3/5')} />
          </B>
        ))}
      </div>
    </BrowserFrame>
  );
}

function Bot() {
  return (
    <BrowserFrame url="suaclinica.com.br">
      <div className="flex h-full flex-col justify-end">
        <B className="ml-auto flex w-[min(100%,14rem)] flex-col gap-2 rounded-sm border border-line bg-white p-2.5 shadow-sm">
          <span className="flex items-center justify-between border-b border-line pb-1.5 text-[9px] font-semibold text-ink">
            Assistente
            <span className="font-mono text-[8px] font-normal text-mute">online</span>
          </span>
          <Bubble from="bot">Olá! Posso ajudar com horários e valores.</Bubble>
          <Bubble from="user">Quanto custa uma limpeza?</Bubble>
          <Bubble from="bot">R$ 180. Quer agendar para amanhã às 10h?</Bubble>
          <B className="flex gap-1.5">
            <span className="rounded-[2px] border border-line px-2 py-1 text-[8px] text-ink">Agendar</span>
            <span className="rounded-[2px] border border-line px-2 py-1 text-[8px] text-ink">Outro horário</span>
          </B>
        </B>
      </div>
    </BrowserFrame>
  );
}

function WhatsApp() {
  return (
    <PhoneFrame title="Studio Bela · WhatsApp">
      <Bubble from="user">Oi! Tem horário sábado?</Bubble>
      <Bubble from="bot">Oi, Júlia! Sábado temos 9h, 11h e 14h. Qual prefere?</Bubble>
      <Bubble from="user">11h</Bubble>
      <Bubble from="bot">Pronto ✓ Sábado, 11h. Te lembro na sexta.</Bubble>
      <B className="mt-auto flex items-center gap-2 rounded-[2px] border border-line px-2 py-1.5 text-[9px] text-mute">
        Mensagem
      </B>
    </PhoneFrame>
  );
}

function FlowNode({ label, meta, accent = false }: { label: string; meta: string; accent?: boolean }) {
  return (
    <B
      className={cn(
        'relative z-10 flex flex-col gap-0.5 rounded-sm border px-2.5 py-2',
        accent ? 'border-brand bg-brand text-white' : 'border-line-strong bg-white text-ink',
      )}
    >
      <span className="text-[10px] font-semibold">{label}</span>
      <span className={cn('font-mono text-[8px]', accent ? 'text-white/75' : 'text-mute')}>{meta}</span>
    </B>
  );
}

function Automation() {
  return (
    <BrowserFrame url="automacoes / leads">
      <div className="relative grid h-full grid-cols-3 items-center gap-4">
        <span aria-hidden="true" className="absolute left-[12%] right-[12%] top-1/2 h-px bg-line-strong" />
        <FlowNode label="Formulário" meta="novo lead" />
        <FlowNode label="Qualifica" meta="score 82" accent />
        <div className="flex flex-col gap-2">
          <FlowNode label="CRM" meta="etapa: contato" />
          <FlowNode label="WhatsApp" meta="mensagem enviada" />
        </div>
      </div>
      <B className="absolute inset-x-4 bottom-3 flex justify-between font-mono text-[8px] text-mute">
        <span>142 execuções hoje</span>
        <span>0 erros</span>
      </B>
    </BrowserFrame>
  );
}

function Integration() {
  return (
    <BrowserFrame url="integracoes">
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex flex-col gap-2">
          <FlowNode label="Loja" meta="pedidos" />
          <FlowNode label="Planilha" meta="estoque" />
        </div>
        <B className="flex flex-col items-center gap-1 font-mono text-[9px] text-brand" >
          <span aria-hidden="true">⇄</span>
          <span className="text-mute">sync 1 min</span>
        </B>
        <div className="flex flex-col gap-2">
          <FlowNode label="ERP" meta="notas" accent />
          <FlowNode label="E-mail" meta="avisos" />
        </div>
      </div>
    </BrowserFrame>
  );
}

const BARS = [38, 52, 46, 64, 58, 72, 68, 84, 79, 92];

function Dashboard() {
  return (
    <BrowserFrame url="painel.suaempresa.com.br">
      <div className="grid grid-cols-3 gap-2">
        {[
          ['Receita', 'R$ 84,2 mil', '+12%'],
          ['Pedidos', '1.284', '+8%'],
          ['Ticket', 'R$ 65,60', '+3%'],
        ].map(([label, value, delta]) => (
          <B key={label} className="rounded-[2px] border border-line p-2">
            <span className="block font-mono text-[8px] uppercase tracking-[0.1em] text-mute">{label}</span>
            <span className="mt-1 block text-[clamp(0.7rem,1.8vw,0.95rem)] font-semibold tracking-[-0.03em] text-ink">{value}</span>
            <span className="font-mono text-[8px] text-[#15803d]">{delta}</span>
          </B>
        ))}
      </div>
      <B className="mt-3 flex h-[42%] items-end gap-1.5 border-b border-line pb-1">
        {BARS.map((h, i) => (
          <span key={i} className={cn('flex-1 rounded-t-[2px]', i === BARS.length - 1 ? 'bg-brand' : 'bg-brand-tint')} style={{ height: `${h}%` }} />
        ))}
      </B>
      <B className="mt-1.5 flex justify-between font-mono text-[8px] text-mute">
        <span>jan</span>
        <span>out</span>
      </B>
    </BrowserFrame>
  );
}

function System() {
  const rows = [
    ['#1042', 'Marina Costa', 'Aprovado'],
    ['#1041', 'Grupo Lume', 'Em análise'],
    ['#1040', 'Rafael Dias', 'Enviado'],
    ['#1039', 'Ótica Prisma', 'Aprovado'],
  ];
  return (
    <BrowserFrame url="sistema.suaempresa.com.br">
      <div className="grid h-full grid-cols-[22%_1fr] gap-3">
        <B className="flex flex-col gap-1.5 border-r border-line pr-2 text-[9px] text-mute">
          <span className="font-semibold text-ink">Orçamentos</span>
          <span>Clientes</span>
          <span>Produtos</span>
          <span>Relatórios</span>
        </B>
        <div className="flex flex-col">
          <B className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-ink">Orçamentos</span>
            <span className="rounded-[2px] bg-ink px-2 py-0.5 text-[8px] text-white">Novo</span>
          </B>
          {rows.map(([id, client, status]) => (
            <B key={id} className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-2 border-t border-line py-1.5 text-[9px]">
              <span className="font-mono text-mute">{id}</span>
              <span className="truncate text-ink">{client}</span>
              <span className={cn('rounded-[2px] px-1.5 py-0.5 text-[8px]', status === 'Aprovado' ? 'bg-[#e8f5ec] text-[#166534]' : 'bg-surface-2 text-ink-soft')}>
                {status}
              </span>
            </B>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function Tool() {
  return (
    <BrowserFrame url="simulador.suaempresa.com.br">
      <div className="grid h-full grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {[
            ['Valor do imóvel', 'R$ 420.000'],
            ['Entrada', 'R$ 84.000'],
            ['Prazo', '30 anos'],
          ].map(([label, value]) => (
            <B key={label} className="flex flex-col gap-0.5">
              <span className="text-[8px] text-mute">{label}</span>
              <span className="rounded-[2px] border border-line px-2 py-1 text-[9px] text-ink">{value}</span>
            </B>
          ))}
        </div>
        <B className="flex flex-col justify-between rounded-sm bg-ink p-3 text-white">
          <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/70">Parcela estimada</span>
          <span className="text-[clamp(0.9rem,2.4vw,1.35rem)] font-semibold tracking-[-0.04em]">R$ 3.184</span>
          <span className="rounded-[2px] bg-white px-2 py-1 text-center text-[8px] font-medium text-ink">Receber simulação</span>
        </B>
      </div>
    </BrowserFrame>
  );
}

function App() {
  return (
    <PhoneFrame title="Rotas · Equipe">
      <B className="text-[11px] font-semibold tracking-[-0.02em] text-ink">Hoje, 3 visitas</B>
      {[
        ['09:00', 'Inspeção — Bloco A', 'Concluída'],
        ['11:30', 'Entrega — Centro', 'A caminho'],
        ['15:00', 'Manutenção — Loja 4', 'Agendada'],
      ].map(([time, title, status]) => (
        <B key={time} className="flex items-center gap-2 rounded-[2px] border border-line p-2">
          <span className="font-mono text-[8px] text-mute">{time}</span>
          <span className="flex-1 truncate text-[9px] text-ink">{title}</span>
          <span className="text-[8px] text-brand">{status}</span>
        </B>
      ))}
      <B className="mt-auto grid grid-cols-3 border-t border-line pt-2 text-center text-[8px] text-mute">
        <span className="font-semibold text-ink">Agenda</span>
        <span>Mapa</span>
        <span>Perfil</span>
      </B>
    </PhoneFrame>
  );
}

const RENDER: Record<PreviewKind, () => ReactNode> = {
  landing: () => <Landing />,
  sales: () => <Landing sales />,
  site: () => <Site />,
  bot: () => <Bot />,
  whatsapp: () => <WhatsApp />,
  automation: () => <Automation />,
  integration: () => <Integration />,
  dashboard: () => <Dashboard />,
  system: () => <System />,
  tool: () => <Tool />,
  app: () => <App />,
};

interface ProductPreviewProps {
  kind: PreviewKind;
  className?: string;
  /** Assemble the interface piece by piece on mount. */
  animate?: boolean;
}

/** Decorative interface preview; the surrounding copy names the product for assistive tech. */
export function ProductPreview({ kind, className, animate = false }: ProductPreviewProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn('h-full w-full select-none', className)}
      variants={assemble}
      initial={animate ? 'hidden' : false}
      animate={animate ? 'show' : undefined}
    >
      {RENDER[kind]()}
    </motion.div>
  );
}
