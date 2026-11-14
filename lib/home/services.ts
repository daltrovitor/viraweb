// Hello World
// Service catalogue for the home page. Prices come from lib/pricing.ts (the same
// table the /propostas simulator uses), so the landing, the JSON-LD and the
// llms.txt files always quote the same numbers.
import type { Language } from '@/lib/i18n';
import { SERVICES_CONFIG, getPriceInCurrency, quoteTotals, PACKAGE_IDS, type ServiceId } from '@/lib/pricing';

export type ServiceKey = 'sites' | 'systems' | 'automation' | 'marketing';

export const SERVICE_KEYS: readonly ServiceKey[] = ['sites', 'systems', 'automation', 'marketing'];

/** Section anchor of each service row on the home page. */
export const SERVICE_ANCHOR: Record<ServiceKey, string> = {
  sites: 'servico-sites',
  systems: 'servico-sistemas',
  automation: 'servico-automacao',
  marketing: 'servico-marketing',
};

export interface ServiceFact {
  label: string;
  value: string;
}

export interface ServiceInfo {
  key: ServiceKey;
  anchor: string;
  /** Full name, used as the row heading. */
  name: string;
  /** Short label for the brief builder toggle and the hero steps. */
  chip: string;
  /** How the need reads inside the WhatsApp message ("um site"). */
  need: string;
  summary: string;
  deliverables: readonly [string, string, string];
  facts: readonly ServiceFact[];
  cta: string;
  /** Pre-filled WhatsApp message for this service's own button. */
  message: string;
}

/** Deterministic whole-number money formatting (identical on server and client). */
export function money(brl: number, language: Language): string {
  const value = getPriceInCurrency(brl, language);
  const grouped = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, language === 'en' ? ',' : '.');
  if (language === 'en') return `$${grouped}`;
  if (language === 'es') return `${grouped} €`;
  return `R$ ${grouped}`;
}

const config = (id: ServiceId) => {
  const service = SERVICES_CONFIG.find((item) => item.id === id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return service;
};

/** "R$ 1.600 de setup + R$ 180/mês" in the visitor's language. */
function setupPlusMonthly(id: ServiceId, language: Language): string {
  const { setupBRL, monthlyBRL } = config(id);
  const setup = money(setupBRL, language);
  const monthly = money(monthlyBRL, language);
  if (language === 'en') return `${setup} setup + ${monthly}/month`;
  if (language === 'es') return `${setup} de setup + ${monthly}/mes`;
  return `${setup} de setup + ${monthly}/mês`;
}

export function getServices(language: Language): ServiceInfo[] {
  const base = (key: ServiceKey) => ({ key, anchor: SERVICE_ANCHOR[key] });

  if (language === 'en') {
    return [
      {
        ...base('sites'),
        name: 'Websites and landing pages',
        chip: 'Website',
        need: 'a website',
        summary: 'A fast, bespoke website built to turn visits into conversations, with technical SEO in place from the first deploy.',
        deliverables: [
          'Custom design, no ready-made templates',
          'Next.js with technical SEO and PageSpeed 90+',
          'Domain, source code and access keys are 100% yours',
        ],
        facts: [
          { label: 'Investment', value: setupPlusMonthly('website', language) },
          { label: 'Timeline', value: '10 to 15 business days for a landing page' },
        ],
        cta: 'I want a website',
        message: 'Hello ViraWeb! I need a website or landing page and would like a free assessment.',
      },
      {
        ...base('systems'),
        name: 'Custom systems',
        chip: 'System',
        need: 'a custom system',
        summary: 'We map the manual work in your company and replace it with software made for it: ERP, CRM, internal tools and integrations.',
        deliverables: [
          'Your processes mapped before any code is written',
          'Integrated with the APIs and databases you already use',
          'The source code is 100% yours',
        ],
        facts: [
          { label: 'Investment', value: 'Quoted per project, with its own technical scope' },
          { label: 'Timeline', value: '20 to 30 business days for systems and portals' },
        ],
        cta: 'I want a system',
        message: 'Hello ViraWeb! I need a custom system (ERP, CRM or internal tool) and would like a free assessment.',
      },
      {
        ...base('automation'),
        name: 'Automation and AI on WhatsApp',
        chip: 'AI automation',
        need: 'AI automation on WhatsApp',
        summary: 'ViraBot answers on WhatsApp around the clock: it qualifies leads, books appointments and sends reminders without manual work.',
        deliverables: [
          'Automatic lead screening and qualification',
          'Bookings, quotes and reminders sent on their own',
          'Synced with your CRM or database',
        ],
        facts: [
          { label: 'Investment', value: setupPlusMonthly('virabot', language) },
          { label: 'Availability', value: '24 hours a day, 7 days a week' },
        ],
        cta: 'I want to automate',
        message: 'Hello ViraWeb! I want to automate my WhatsApp service with AI and would like a free assessment.',
      },
      {
        ...base('marketing'),
        name: 'Marketing: paid traffic and Google Business Profile',
        chip: 'Marketing',
        need: 'marketing and paid traffic',
        summary: 'Google Ads and Meta Ads campaigns, plus a Google Business Profile that puts your company on the map when people search nearby.',
        deliverables: [
          'Campaigns created and optimized continuously',
          'Complete profile, service catalogue and review strategy',
          'Ad spend is paid by you directly to the platforms',
        ],
        facts: [
          { label: 'Paid traffic', value: setupPlusMonthly('ads', language) },
          { label: 'Google Business Profile', value: setupPlusMonthly('gmn', language) },
        ],
        cta: 'I want more customers',
        message: 'Hello ViraWeb! I want to invest in paid traffic and Google Business Profile and would like a free assessment.',
      },
    ];
  }

  if (language === 'es') {
    return [
      {
        ...base('sites'),
        name: 'Sitios web y landing pages',
        chip: 'Sitio web',
        need: 'un sitio web',
        summary: 'Un sitio rápido y a medida, hecho para convertir visitas en conversaciones, con SEO técnico desde el primer despliegue.',
        deliverables: [
          'Diseño exclusivo, sin plantillas',
          'Next.js con SEO técnico y PageSpeed 90+',
          'Dominio, código fuente y accesos 100% suyos',
        ],
        facts: [
          { label: 'Inversión', value: setupPlusMonthly('website', language) },
          { label: 'Plazo', value: '10 a 15 días hábiles para una landing page' },
        ],
        cta: 'Quiero un sitio',
        message: '¡Hola ViraWeb! Necesito un sitio web o landing page y quiero un diagnóstico gratuito.',
      },
      {
        ...base('systems'),
        name: 'Sistemas a medida',
        chip: 'Sistema',
        need: 'un sistema a medida',
        summary: 'Mapeamos el trabajo manual de su empresa y lo reemplazamos por software hecho para ella: ERP, CRM, herramientas internas e integraciones.',
        deliverables: [
          'Sus procesos mapeados antes de escribir código',
          'Integrado a las APIs y bases de datos que ya usa',
          'El código fuente es 100% suyo',
        ],
        facts: [
          { label: 'Inversión', value: 'Presupuesto por proyecto, con alcance técnico propio' },
          { label: 'Plazo', value: '20 a 30 días hábiles para sistemas y portales' },
        ],
        cta: 'Quiero un sistema',
        message: '¡Hola ViraWeb! Necesito un sistema a medida (ERP, CRM o herramienta interna) y quiero un diagnóstico gratuito.',
      },
      {
        ...base('automation'),
        name: 'Automatización e IA en WhatsApp',
        chip: 'Automatización con IA',
        need: 'automatización con IA en WhatsApp',
        summary: 'ViraBot atiende en WhatsApp las 24 horas: califica leads, agenda citas y envía recordatorios sin trabajo manual.',
        deliverables: [
          'Triaje y calificación automática de leads',
          'Citas, presupuestos y recordatorios enviados solos',
          'Sincronizado con su CRM o base de datos',
        ],
        facts: [
          { label: 'Inversión', value: setupPlusMonthly('virabot', language) },
          { label: 'Atención', value: '24 horas al día, 7 días a la semana' },
        ],
        cta: 'Quiero automatizar',
        message: '¡Hola ViraWeb! Quiero automatizar mi atención en WhatsApp con IA y quiero un diagnóstico gratuito.',
      },
      {
        ...base('marketing'),
        name: 'Marketing: tráfico pago y Google Mi Negocio',
        chip: 'Marketing',
        need: 'marketing y tráfico pago',
        summary: 'Campañas en Google Ads y Meta Ads, y una ficha de Google Mi Negocio que pone su empresa en el mapa cuando buscan cerca.',
        deliverables: [
          'Campañas creadas y optimizadas de forma continua',
          'Ficha completa, catálogo de servicios y estrategia de reseñas',
          'La inversión publicitaria la paga usted directo a las plataformas',
        ],
        facts: [
          { label: 'Tráfico pago', value: setupPlusMonthly('ads', language) },
          { label: 'Google Mi Negocio', value: setupPlusMonthly('gmn', language) },
        ],
        cta: 'Quiero más clientes',
        message: '¡Hola ViraWeb! Quiero invertir en tráfico pago y Google Mi Negocio y quiero un diagnóstico gratuito.',
      },
    ];
  }

  return [
    {
      ...base('sites'),
      name: 'Sites e landing pages',
      chip: 'Site',
      need: 'um site',
      summary: 'Um site rápido e sob medida, feito para transformar visita em conversa, com SEO técnico pronto desde o primeiro deploy.',
      deliverables: [
        'Design exclusivo, sem template pronto',
        'Next.js com SEO técnico e PageSpeed 90+',
        'Domínio, código-fonte e acessos 100% seus',
      ],
      facts: [
        { label: 'Investimento', value: setupPlusMonthly('website', language) },
        { label: 'Prazo', value: '10 a 15 dias úteis para uma landing page' },
      ],
      cta: 'Quero um site',
      message: 'Olá ViraWeb! Preciso de um site ou landing page e quero um diagnóstico gratuito.',
    },
    {
      ...base('systems'),
      name: 'Sistemas sob medida',
      chip: 'Sistema',
      need: 'um sistema sob medida',
      summary: 'Mapeamos o trabalho manual da sua empresa e trocamos por um software feito para ela: ERP, CRM, ferramentas internas e integrações.',
      deliverables: [
        'Seus processos mapeados antes de qualquer código',
        'Integrado às APIs e aos bancos de dados que você já usa',
        'O código-fonte é 100% seu',
      ],
      facts: [
        { label: 'Investimento', value: 'Orçamento por projeto, com escopo técnico próprio' },
        { label: 'Prazo', value: '20 a 30 dias úteis para sistemas e portais' },
      ],
      cta: 'Quero um sistema',
      message: 'Olá ViraWeb! Preciso de um sistema sob medida (ERP, CRM ou ferramenta interna) e quero um diagnóstico gratuito.',
    },
    {
      ...base('automation'),
      name: 'Automação e IA no WhatsApp',
      chip: 'Automação com IA',
      need: 'automação com IA no WhatsApp',
      summary: 'O ViraBot atende no WhatsApp 24 horas: qualifica leads, agenda horários e envia lembretes sem trabalho manual.',
      deliverables: [
        'Triagem e qualificação automática de leads',
        'Agendamentos, orçamentos e lembretes enviados sozinhos',
        'Sincronizado com o seu CRM ou banco de dados',
      ],
      facts: [
        { label: 'Investimento', value: setupPlusMonthly('virabot', language) },
        { label: 'Atendimento', value: '24 horas por dia, 7 dias por semana' },
      ],
      cta: 'Quero automatizar',
      message: 'Olá ViraWeb! Quero automatizar meu atendimento no WhatsApp com IA e quero um diagnóstico gratuito.',
    },
    {
      ...base('marketing'),
      name: 'Marketing: tráfego pago e Google Meu Negócio',
      chip: 'Marketing',
      need: 'marketing e tráfego pago',
      summary: 'Campanhas no Google Ads e no Meta Ads, e uma ficha no Google Meu Negócio que coloca a sua empresa no mapa de quem procura por perto.',
      deliverables: [
        'Campanhas criadas e otimizadas continuamente',
        'Ficha completa, catálogo de serviços e estratégia de avaliações',
        'A verba dos anúncios é paga por você direto às plataformas',
      ],
      facts: [
        { label: 'Tráfego pago', value: setupPlusMonthly('ads', language) },
        { label: 'Google Meu Negócio', value: setupPlusMonthly('gmn', language) },
      ],
      cta: 'Quero mais clientes',
      message: 'Olá ViraWeb! Quero investir em tráfego pago e Google Meu Negócio e quero um diagnóstico gratuito.',
    },
  ];
}

/** "a, b e c" without Intl.ListFormat, so server and client always agree. */
function joinList(items: string[], language: Language): string {
  if (items.length <= 1) return items.join('');
  const conjunction = language === 'en' ? 'and' : language === 'es' ? 'y' : 'e';
  return `${items.slice(0, -1).join(', ')} ${conjunction} ${items[items.length - 1]}`;
}

/** WhatsApp message composed by the brief builder from the selected needs. */
export function briefMessage(language: Language, selected: readonly ServiceKey[]): string {
  const needs = getServices(language)
    .filter((service) => selected.includes(service.key))
    .map((service) => service.need);

  if (language === 'en') {
    return needs.length === 0
      ? 'Hello ViraWeb! I would like to book a free assessment for my business.'
      : `Hello ViraWeb! I need ${joinList(needs, language)}. I would like to book a free assessment.`;
  }
  if (language === 'es') {
    return needs.length === 0
      ? '¡Hola ViraWeb! Quiero agendar un diagnóstico gratuito para mi empresa.'
      : `¡Hola ViraWeb! Necesito ${joinList(needs, language)}. Quiero agendar un diagnóstico gratuito.`;
  }
  return needs.length === 0
    ? 'Olá ViraWeb! Quero agendar um diagnóstico gratuito para a minha empresa.'
    : `Olá ViraWeb! Preciso de ${joinList(needs, language)}. Quero agendar um diagnóstico gratuito.`;
}

export interface PackageOffer {
  setupGross: string;
  setup: string;
  monthlyGross: string;
  monthly: string;
  setupDiscountPercent: number;
  monthlyDiscountPercent: number;
  /** Raw BRL values for the animated counters. */
  raw: { setupGross: number; setup: number; monthlyGross: number; monthly: number };
}

/** The full ViraWeb Package, computed by the same rules as the simulator. */
export function getPackageOffer(language: Language): PackageOffer {
  const totals = quoteTotals(PACKAGE_IDS, language);
  return {
    setupGross: money(totals.setupGross, language),
    setup: money(totals.setup, language),
    monthlyGross: money(totals.monthlyGross, language),
    monthly: money(totals.monthly, language),
    setupDiscountPercent: Math.round(totals.setupDiscountRate * 100),
    monthlyDiscountPercent: Math.round(totals.monthlyDiscountRate * 100),
    raw: {
      setupGross: getPriceInCurrency(totals.setupGross, language),
      setup: getPriceInCurrency(totals.setup, language),
      monthlyGross: getPriceInCurrency(totals.monthlyGross, language),
      monthly: getPriceInCurrency(totals.monthly, language),
    },
  };
}
