import type { CaseSlug } from '@/lib/home/cases';
import type { Copy } from '@/lib/site';
import { SignalCanvas } from '@/components/motion/signal-canvas';

const labels = {
  pt: {
    account: 'Conta digital',
    perks: 'Benefícios',
    events: 'Eventos',
    clockIn: 'Entrada registrada',
    gps: 'Localização confirmada',
    monthly: 'Espelho mensal',
    coursePage: 'Página do curso',
    course: 'Conhecer o curso',
    question: 'Tem horário amanhã?',
    answer: 'Posso te agendar às 11h.',
    confirmation: 'Fechado, 11h!',
    stages: ['Contatos', 'Propostas', 'Vendas'],
  },
  en: {
    account: 'Digital account',
    perks: 'Perks',
    events: 'Events',
    clockIn: 'Clock-in recorded',
    gps: 'Location confirmed',
    monthly: 'Monthly timesheet',
    coursePage: 'Course page',
    course: 'Explore the course',
    question: 'Any openings tomorrow?',
    answer: 'I can book you for 11.',
    confirmation: '11 works!',
    stages: ['Contacts', 'Proposals', 'Sales'],
  },
  es: {
    account: 'Cuenta digital',
    perks: 'Beneficios',
    events: 'Eventos',
    clockIn: 'Entrada registrada',
    gps: 'Ubicación confirmada',
    monthly: 'Planilla mensual',
    coursePage: 'Página del curso',
    course: 'Conocer el curso',
    question: '¿Hay horario mañana?',
    answer: 'Puedo agendarte a las 11.',
    confirmation: '¡A las 11!',
    stages: ['Contactos', 'Propuestas', 'Ventas'],
  },
} satisfies Copy<Record<string, string | string[]>>;

export function CaseArtwork({ slug, language }: { slug: CaseSlug; language: keyof typeof labels }) {
  const text = labels[language];

  switch (slug) {
    case 'prx':
      return (
        <div className="case-art case-art--prx" aria-hidden="true">
          <div className="case-prx-phone">
            <b>PRX</b>
            <span>{text.account}</span>
            <div className="case-prx-app-row"><i />{text.perks}</div>
            <div className="case-prx-app-row"><i />{text.events}</div>
          </div>
          <div className="case-prx-card"><b>PRX</b><span>PRX BANK</span></div>
          <SignalCanvas mode="spotlight" />
        </div>
      );
    case 'pontocontrole':
      return (
        <div className="case-art case-art--ponto" aria-hidden="true">
          <div className="case-ponto-sheet">
            <span>{text.monthly}</span>
            <strong>PDF</strong>
            <i /><i /><i />
          </div>
          <div className="case-ponto-record">
            <span>{text.clockIn}</span>
            <strong>08:00</strong>
            <small>{text.gps}</small>
          </div>
        </div>
      );
    case 'pagina-de-lancamento':
      return (
        <div className="case-art case-art--launch" aria-hidden="true">
          <div className="case-launch-page">
            <span>{text.coursePage}</span>
            <strong>Beatriz<br />Lopes</strong>
            <small>{text.course} ↗</small>
          </div>
        </div>
      );
    case 'virabot':
      return (
        <div className="case-art case-art--bot" aria-hidden="true">
          <div className="case-bot-chat">
            <strong>ViraBot <span>WhatsApp</span></strong>
            <div>{text.question}</div>
            <div>{text.answer}</div>
            <div>{text.confirmation}</div>
          </div>
        </div>
      );
    case 'painel-de-aquisicao':
      return (
        <div className="case-art case-art--funnel" aria-hidden="true">
          <div className="case-funnel-plot">
            {text.stages.map((stage) => <div key={stage}><span>{stage}</span><i /></div>)}
          </div>
        </div>
      );
  }
}
