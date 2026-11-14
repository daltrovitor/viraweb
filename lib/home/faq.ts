// Hello World
// Frequently asked questions for the home page. The visible accordion, the
// FAQPage JSON-LD and llms-full.txt are all generated from this one list, so a
// machine never reads an answer a visitor cannot see.
import type { Language } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import { SERVICES_CONFIG } from '@/lib/pricing';
import { getPackageOffer, money } from '@/lib/home/services';
import { PONTO_PLANS, PONTO_TRIAL_DAYS, brl } from '@/lib/home/products';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const service = (id: (typeof SERVICES_CONFIG)[number]['id']) => {
  const found = SERVICES_CONFIG.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown service: ${id}`);
  return found;
};

export function getFaq(language: Language): FaqItem[] {
  const site = service('website');
  const bot = service('virabot');
  const ads = service('ads');
  const gmn = service('gmn');
  const offer = getPackageOffer(language);
  const [basic, premium] = PONTO_PLANS.pt;
  const m = (value: number) => money(value, language);

  if (language === 'en') {
    return [
      {
        id: 'what',
        question: 'What does ViraWeb do?',
        answer: `ViraWeb is a software engineering company from ${SITE.city}, Brazil. We build websites and landing pages, custom systems, AI automations on WhatsApp and paid-traffic campaigns, and we maintain our own product, PontoControle, a time-tracking system.`,
      },
      {
        id: 'price',
        question: 'How much does a website cost at ViraWeb?',
        answer: `A website or landing page in Next.js costs ${m(site.setupBRL)} for setup plus ${m(site.monthlyBRL)} per month. The complete ViraWeb Package (website, Google Business Profile, paid traffic and ViraBot) gets ${offer.setupDiscountPercent}% off the setup and ${offer.monthlyDiscountPercent}% off the monthly fee: ${offer.setup} setup and ${offer.monthly} per month. You can simulate your own proposal at ${SITE.url}/propostas.`,
      },
      {
        id: 'timeline',
        question: 'How long does it take?',
        answer: 'Landing pages are usually delivered in 10 to 15 business days. Custom systems and more complex portals take 20 to 30 business days, with active follow-up.',
      },
      {
        id: 'ownership',
        question: 'Will the website be mine? Will I have access to the code?',
        answer: 'Yes, 100% yours. After development you have full ownership of the domain, the source code and the access keys.',
      },
      {
        id: 'systems',
        question: 'How does custom system development work?',
        answer: 'We map the manual processes in your company and build tailor-made software (such as an ERP, a CRM or an internal tool) integrated with the APIs and databases you already use, removing operational errors.',
      },
      {
        id: 'whatsapp',
        question: 'How does WhatsApp automation work?',
        answer: `ViraBot is an AI assistant connected to your WhatsApp and to your CRM or database. It screens and qualifies leads, books appointments, sends quotes and reminders, and answers 24 hours a day. It costs ${m(bot.setupBRL)} for setup plus ${m(bot.monthlyBRL)} per month.`,
      },
      {
        id: 'marketing',
        question: 'Do you run paid traffic and Google Business Profile?',
        answer: `Yes. We create and continuously optimize Google Ads and Meta Ads campaigns (${m(ads.setupBRL)} setup plus ${m(ads.monthlyBRL)} per month) and manage your Google Business Profile, including the service catalogue, the review strategy and your position on the map (${m(gmn.setupBRL)} setup plus ${m(gmn.monthlyBRL)} per month). The ad budget is paid by you directly to the platforms.`,
      },
      {
        id: 'design',
        question: 'Is the design custom?',
        answer: 'Yes. We do not use ready-made templates. Every layout is designed from scratch for your brand, with a focus on conversion and user experience.',
      },
      {
        id: 'support',
        question: 'Do you offer support after delivery?',
        answer: 'Yes. We provide active technical support after delivery to keep the servers online, the APIs working and your team comfortable with the tools we built.',
      },
      {
        id: 'integration',
        question: 'Can you integrate with the systems I already use?',
        answer: 'Yes. We build custom API connectors that sync your data in real time with external platforms such as ERPs, payment gateways, CRMs and external databases.',
      },
      {
        id: 'pontocontrole',
        question: 'What is PontoControle?',
        answer: `PontoControle is ViraWeb's time-tracking system for small businesses and household employers in Brazil. The employee clocks in on the phone with facial recognition and GPS, and the employer follows schedules, overtime and the hour bank in real time and exports the monthly timesheet in PDF. Plans start at ${brl(basic.price ?? 0)} per month for up to 3 employees (${brl(premium.price ?? 0)} for up to 5), with ${PONTO_TRIAL_DAYS} days free and no credit card.`,
      },
      {
        id: 'timeclock-law',
        question: 'Am I required to track my employees’ working hours in Brazil?',
        answer: 'For household employees, yes: Complementary Law 150/2015 (article 12) requires the working hours to be recorded by any reliable manual, mechanical or electronic means, regardless of how many employees you have. For companies, the CLT (article 74, paragraph 2) requires clock-in and clock-out records in establishments with more than 20 workers. Ordinance MTP 671/2021 regulates electronic time records, including those made by software.',
      },
      {
        id: 'hire',
        question: 'How do I hire ViraWeb?',
        answer: `Message us on WhatsApp at ${SITE.whatsappDisplay}. A software engineer runs a free 15-minute assessment, aligns the requirements and sends you a tailored technical proposal.`,
      },
    ];
  }

  if (language === 'es') {
    return [
      {
        id: 'what',
        question: '¿Qué hace ViraWeb?',
        answer: `ViraWeb es una empresa de ingeniería de software de ${SITE.city}, Brasil. Creamos sitios web y landing pages, sistemas a medida, automatizaciones con IA en WhatsApp y campañas de tráfico pago, y mantenemos un producto propio, PontoControle, un sistema de control de asistencia.`,
      },
      {
        id: 'price',
        question: '¿Cuánto cuesta un sitio web en ViraWeb?',
        answer: `Un sitio web o landing page en Next.js cuesta ${m(site.setupBRL)} de setup más ${m(site.monthlyBRL)} al mes. El Paquete ViraWeb completo (sitio, Google Mi Negocio, tráfico pago y ViraBot) tiene ${offer.setupDiscountPercent}% de descuento en el setup y ${offer.monthlyDiscountPercent}% en la mensualidad: ${offer.setup} de setup y ${offer.monthly} al mes. Puede simular su propuesta en ${SITE.url}/propostas.`,
      },
      {
        id: 'timeline',
        question: '¿En cuánto tiempo queda listo?',
        answer: 'Las landing pages suelen entregarse en 10 a 15 días hábiles. Los sistemas a medida y los portales más complejos llevan de 20 a 30 días hábiles, con seguimiento activo.',
      },
      {
        id: 'ownership',
        question: '¿El sitio será mío? ¿Tendré acceso al código?',
        answer: 'Sí, 100% suyo. Tras el desarrollo usted tiene propiedad total sobre el dominio, el código fuente y las claves de acceso.',
      },
      {
        id: 'systems',
        question: '¿Cómo funciona el desarrollo de sistemas a medida?',
        answer: 'Mapeamos los procesos manuales de su empresa y creamos un software a medida (como un ERP, un CRM o una herramienta interna) integrado con las APIs y bases de datos que ya utiliza, eliminando errores operativos.',
      },
      {
        id: 'whatsapp',
        question: '¿Cómo funciona la automatización de WhatsApp?',
        answer: `ViraBot es un asistente con IA conectado a su WhatsApp y a su CRM o base de datos. Califica leads, agenda citas, envía presupuestos y recordatorios, y atiende las 24 horas. Cuesta ${m(bot.setupBRL)} de setup más ${m(bot.monthlyBRL)} al mes.`,
      },
      {
        id: 'marketing',
        question: '¿Hacen tráfico pago y Google Mi Negocio?',
        answer: `Sí. Creamos y optimizamos de forma continua campañas en Google Ads y Meta Ads (${m(ads.setupBRL)} de setup más ${m(ads.monthlyBRL)} al mes) y gestionamos su ficha de Google Mi Negocio, con catálogo de servicios, estrategia de reseñas y posicionamiento en el mapa (${m(gmn.setupBRL)} de setup más ${m(gmn.monthlyBRL)} al mes). La inversión publicitaria la paga usted directamente a las plataformas.`,
      },
      {
        id: 'design',
        question: '¿El diseño es personalizado?',
        answer: 'Sí. No usamos plantillas. Cada diseño se crea desde cero para su marca, con foco en conversión y experiencia de usuario.',
      },
      {
        id: 'support',
        question: '¿Ofrecen soporte después de la entrega?',
        answer: 'Sí. Ofrecemos soporte técnico activo después de la entrega para mantener los servidores en línea, las APIs funcionando y a su equipo cómodo con las herramientas creadas.',
      },
      {
        id: 'integration',
        question: '¿Se integran con los sistemas que ya uso?',
        answer: 'Sí. Desarrollamos conectores de API a medida que sincronizan sus datos en tiempo real con plataformas externas como ERPs, pasarelas de pago, CRMs y bases de datos externas.',
      },
      {
        id: 'pontocontrole',
        question: '¿Qué es PontoControle?',
        answer: `PontoControle es el sistema de control de asistencia de ViraWeb para pequeñas empresas y empleadores domésticos en Brasil. El empleado registra en el celular con reconocimiento facial y GPS, y el empleador acompaña horarios, horas extra y banco de horas en tiempo real y exporta la planilla mensual en PDF. Los planes empiezan en ${brl(basic.price ?? 0)} al mes para hasta 3 empleados (${brl(premium.price ?? 0)} para hasta 5), con ${PONTO_TRIAL_DAYS} días gratis y sin tarjeta de crédito.`,
      },
      {
        id: 'timeclock-law',
        question: '¿Estoy obligado a registrar la jornada de mis empleados en Brasil?',
        answer: 'Para empleados domésticos, sí: la Ley Complementaria 150/2015 (artículo 12) exige registrar el horario de trabajo por cualquier medio manual, mecánico o electrónico idóneo, sin importar cuántos empleados tenga. Para empresas, la CLT (artículo 74, párrafo 2) exige el registro de entrada y salida en establecimientos con más de 20 trabajadores. La Portaria MTP 671/2021 regula el registro electrónico, incluido el hecho por software.',
      },
      {
        id: 'hire',
        question: '¿Cómo contrato a ViraWeb?',
        answer: `Escríbanos por WhatsApp al ${SITE.whatsappDisplay}. Un ingeniero de software hace un diagnóstico gratuito de 15 minutos, alinea los requisitos y le envía una propuesta técnica personalizada.`,
      },
    ];
  }

  return [
    {
      id: 'what',
      question: 'O que a ViraWeb faz?',
      answer: `A ViraWeb é uma empresa de engenharia de software de ${SITE.city} (${SITE.region}). Criamos sites e landing pages, sistemas sob medida, automações com IA no WhatsApp e campanhas de tráfego pago, e mantemos um produto próprio, o PontoControle, um sistema de controle de ponto.`,
    },
    {
      id: 'price',
      question: 'Quanto custa um site na ViraWeb?',
      answer: `Um site ou landing page em Next.js custa ${m(site.setupBRL)} de setup mais ${m(site.monthlyBRL)} por mês. O Pacote ViraWeb completo (site, Google Meu Negócio, tráfego pago e ViraBot) tem ${offer.setupDiscountPercent}% de desconto no setup e ${offer.monthlyDiscountPercent}% na mensalidade: ${offer.setup} de setup e ${offer.monthly} por mês. Você simula a sua proposta em ${SITE.url}/propostas.`,
    },
    {
      id: 'timeline',
      question: 'Em quanto tempo fica pronto?',
      answer: 'Landing pages costumam ser entregues em 10 a 15 dias úteis. Sistemas sob medida e portais mais complexos levam de 20 a 30 dias úteis, com acompanhamento ativo.',
    },
    {
      id: 'ownership',
      question: 'O site será meu? Terei acesso ao código?',
      answer: 'Sim, 100% seu. Após o desenvolvimento, você tem propriedade total sobre o domínio, o código-fonte e as chaves de acesso.',
    },
    {
      id: 'systems',
      question: 'Como funciona o desenvolvimento de sistemas sob medida?',
      answer: 'Mapeamos os processos manuais da sua empresa e criamos um software sob medida (como um ERP, um CRM ou uma ferramenta interna) integrado às APIs e aos bancos de dados que você já utiliza, eliminando erros operacionais.',
    },
    {
      id: 'whatsapp',
      question: 'Como funciona a automação do WhatsApp?',
      answer: `O ViraBot é um assistente com IA ligado ao seu WhatsApp e ao seu CRM ou banco de dados. Ele faz a triagem e a qualificação dos leads, agenda horários, envia orçamentos e lembretes e atende 24 horas por dia. Custa ${m(bot.setupBRL)} de setup mais ${m(bot.monthlyBRL)} por mês.`,
    },
    {
      id: 'marketing',
      question: 'Vocês fazem tráfego pago e Google Meu Negócio?',
      answer: `Sim. Criamos e otimizamos continuamente campanhas no Google Ads e no Meta Ads (${m(ads.setupBRL)} de setup mais ${m(ads.monthlyBRL)} por mês) e cuidamos da sua ficha no Google Meu Negócio, com catálogo de serviços, estratégia de avaliações e posicionamento no mapa (${m(gmn.setupBRL)} de setup mais ${m(gmn.monthlyBRL)} por mês). A verba dos anúncios é paga por você diretamente às plataformas.`,
    },
    {
      id: 'design',
      question: 'O design é personalizado?',
      answer: 'Sim. Não usamos templates prontos. Cada layout é desenhado do zero para a sua marca, com foco em conversão e experiência do usuário.',
    },
    {
      id: 'support',
      question: 'Vocês oferecem suporte depois da entrega?',
      answer: 'Sim. Oferecemos suporte técnico ativo depois da entrega para manter os servidores no ar, as APIs funcionando e a sua equipe à vontade com as ferramentas criadas.',
    },
    {
      id: 'integration',
      question: 'Vocês integram com os sistemas que eu já uso?',
      answer: 'Sim. Desenvolvemos conectores de API sob medida que sincronizam os seus dados em tempo real com plataformas externas, como ERPs, gateways de pagamento, CRMs e bancos de dados externos.',
    },
    {
      id: 'pontocontrole',
      question: 'O que é o PontoControle?',
      answer: `O PontoControle é o sistema de controle de ponto da ViraWeb para pequenas empresas e empregadores domésticos. O funcionário bate o ponto pelo celular com reconhecimento facial e GPS, e o empregador acompanha horários, horas extras e banco de horas em tempo real e exporta o espelho de ponto em PDF. Os planos começam em ${brl(basic.price ?? 0)} por mês para até 3 funcionários (${brl(premium.price ?? 0)} para até 5), com ${PONTO_TRIAL_DAYS} dias grátis e sem cartão de crédito.`,
    },
    {
      id: 'timeclock-law',
      question: 'Sou obrigado a controlar o ponto dos meus funcionários?',
      answer: 'Para empregados domésticos, sim: a Lei Complementar 150/2015 (art. 12) obriga o registro do horário de trabalho por qualquer meio manual, mecânico ou eletrônico, desde que idôneo, seja qual for o número de empregados. Para empresas, a CLT (art. 74, § 2º) exige o registro de entrada e saída nos estabelecimentos com mais de 20 trabalhadores. A Portaria MTP 671/2021 regulamenta o ponto eletrônico, incluindo o registro feito por programa (software).',
    },
    {
      id: 'hire',
      question: 'Como eu contrato a ViraWeb?',
      answer: `Chame no WhatsApp ${SITE.whatsappDisplay}. Um engenheiro de software faz um diagnóstico gratuito de 15 minutos, alinha os requisitos e envia uma proposta técnica personalizada.`,
    },
  ];
}
