import Image from 'next/image';
import type { CaseSlug } from '@/lib/home/cases';
import type { Copy } from '@/lib/site';
import { SignalCanvas } from '@/components/motion/signal-canvas';

const labels = {
  pt: {
    coursePage: 'Página do curso',
    course: 'Conhecer o curso',
    question: 'Tem horário amanhã?',
    answer: 'Posso te agendar às 11h.',
    confirmation: 'Fechado, 11h!',
    stages: ['Contatos', 'Propostas', 'Vendas'],
  },
  en: {
    coursePage: 'Course page',
    course: 'Explore the course',
    question: 'Any openings tomorrow?',
    answer: 'I can book you for 11.',
    confirmation: '11 works!',
    stages: ['Contacts', 'Proposals', 'Sales'],
  },
  es: {
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
          {/* Artwork from the homepage at https://www.prx.app.br/ */}
          <div className="case-prx-crystal">
            <Image src="/cases/prx-crystal.webp" fill sizes="(min-width: 1000px) 34vw, 55vw" alt="" />
          </div>
          <div className="case-prx-card">
            <Image src="/cases/prx-bank-card.webp" fill sizes="(min-width: 1000px) 34vw, 55vw" alt="" />
          </div>
          <SignalCanvas mode="spotlight" />
        </div>
      );
    case 'pontocontrole':
      return (
        <div className="case-art case-art--ponto" aria-hidden="true">
          {/* Captured from the public demo at https://www.pontocontrole.com.br/ */}
          <Image
            src="/cases/pontocontrole-demo.webp"
            fill
            sizes="(min-width: 1000px) 32vw, (min-width: 640px) 48vw, 95vw"
            alt=""
          />
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
