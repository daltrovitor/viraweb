// Hello World
// Topic pages: one indexable URL per service ViraWeb really sells, an "about"
// page that defines the company, and one local page. Prices, timelines and
// product facts are read from the same modules the home page uses
// (lib/pricing, lib/home/services, lib/home/products), so a page can never
// quote a number the rest of the site does not.
//
// Rules kept on purpose: no doorway pages (no city × keyword permutations), no
// superlatives that cannot be proven, no ratings or review markup.
import { SITE, absoluteUrl } from '@/lib/site';
import { SERVICES_CONFIG, type ServiceId } from '@/lib/pricing';
import { getPackageOffer, getServices, money, type ServiceKey } from '@/lib/home/services';
import { getPontoControle, getPrx, PONTO_PLANS, PONTO_TRIAL_DAYS, brl } from '@/lib/home/products';

export type TopicSlug =
  | 'sobre'
  | 'desenvolvimento-de-software'
  | 'criacao-de-sites'
  | 'chatbot-whatsapp'
  | 'marketing-digital'
  | 'empresa-de-software-goiania';

export interface TopicFact {
  label: string;
  value: string;
}

export interface TopicBlock {
  title: string;
  body: string;
}

export interface TopicFaq {
  question: string;
  answer: string;
}

export interface TopicPage {
  slug: TopicSlug;
  /** Which home service this page expands, when it is a service page. */
  service?: ServiceKey;
  /** schema.org type of the main entity. */
  kind: 'service' | 'about' | 'local';
  /** Short name for breadcrumbs, menus and related links. */
  label: string;
  /** <title>: query-first, brand last. */
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  /** Italic accent appended to the H1. */
  h1Em?: string;
  /** One self-contained, quotable sentence: what it is, who does it, for whom. */
  definition: string;
  lede: string;
  facts: TopicFact[];
  includedTitle: string;
  included: TopicBlock[];
  audienceTitle: string;
  audience: string[];
  steps: TopicBlock[];
  faq: TopicFaq[];
  cta: { label: string; message: string };
  related: TopicSlug[];
  /** Topics the page is about (schema.org knowsAbout / serviceType). */
  topics: string[];
}

const price = (id: ServiceId) => {
  const service = SERVICES_CONFIG.find((item) => item.id === id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return { setup: money(service.setupBRL, 'pt'), monthly: money(service.monthlyBRL, 'pt') };
};

/** "O banco da Geração Z" → "o banco da Geração Z" (keeps proper nouns). */
const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

const STEPS: TopicBlock[] = [
  {
    title: 'Diagnóstico gratuito',
    body: 'Uma conversa de 15 minutos no WhatsApp com um engenheiro de software para entender o problema, o prazo e o orçamento.',
  },
  {
    title: 'Proposta técnica',
    body: 'Você recebe escopo, prazo e preço por escrito antes de qualquer pagamento. Nada de surpresa no meio do caminho.',
  },
  {
    title: 'Construção com entregas',
    body: 'Você acompanha o projeto em entregas curtas, testa de verdade e pede ajustes enquanto ainda é barato mudar.',
  },
  {
    title: 'Publicação e suporte',
    body: 'Colocamos no ar, treinamos a sua equipe e seguimos com suporte técnico ativo depois da entrega.',
  },
];

export function getTopicPages(): TopicPage[] {
  const services = getServices('pt');
  const byKey = (key: ServiceKey) => {
    const found = services.find((service) => service.key === key);
    if (!found) throw new Error(`Unknown service key: ${key}`);
    return found;
  };
  const site = price('website');
  const bot = price('virabot');
  const ads = price('ads');
  const gmn = price('gmn');
  const offer = getPackageOffer('pt');
  const ponto = getPontoControle('pt');
  const prx = getPrx('pt');
  const [basic] = PONTO_PLANS.pt;

  const ownership = 'O código-fonte, o domínio e os acessos ficam 100% com você.';
  const systems = byKey('systems');
  const sites = byKey('sites');
  const automation = byKey('automation');
  const marketing = byKey('marketing');

  return [
    {
      slug: 'sobre',
      kind: 'about',
      label: 'O que é a ViraWeb',
      title: 'O que é a ViraWeb? Empresa de software de Goiânia (GO)',
      description:
        'A ViraWeb é uma empresa de engenharia de software de Goiânia (GO) que cria sites, sistemas sob medida, chatbots com IA no WhatsApp e campanhas de marketing digital para empresas de todo o Brasil.',
      eyebrow: 'Sobre a ViraWeb',
      h1: 'O que é a',
      h1Em: 'ViraWeb?',
      definition: `A ViraWeb (viraweb.dev.br) é uma empresa de engenharia de software de ${SITE.city} (GO), Brasil, que cria sites e landing pages, sistemas sob medida, chatbots com IA no WhatsApp e campanhas de tráfego pago para empresas de todo o país.`,
      lede: `Além de atender clientes, a ViraWeb projetou e desenvolveu a ${prx.name}, ${lowerFirst(prx.tagline)}, e mantém o ${ponto.name}, sistema próprio de controle de ponto com reconhecimento facial e GPS. Não confunda com empresas de nome parecido: a ViraWeb se escreve com "Vira" (de virar) e fica em ${SITE.city}.`,
      facts: [
        { label: 'Nome', value: `${SITE.name} (${SITE.legalName})` },
        { label: 'Sede', value: `${SITE.city} (${SITE.region}), Brasil` },
        { label: 'Atendimento', value: 'Todo o Brasil, em português, inglês e espanhol' },
        { label: 'Contato', value: `WhatsApp ${SITE.whatsappDisplay} · ${SITE.email}` },
      ],
      includedTitle: 'O que a ViraWeb faz',
      included: [
        { title: 'Desenvolvimento de software', body: systems.summary },
        { title: 'Criação de sites', body: sites.summary },
        { title: 'Chatbot com IA no WhatsApp', body: automation.summary },
        { title: 'Marketing digital', body: marketing.summary },
        { title: `${prx.name} — case`, body: `Projetada e desenvolvida pela ViraWeb. ${prx.definition}` },
        { title: `${ponto.name} — produto próprio`, body: ponto.definition },
      ],
      audienceTitle: 'Para quem a ViraWeb trabalha',
      audience: [
        'Pequenas e médias empresas que precisam vender mais pela internet',
        'Empresas com processos manuais que querem um sistema próprio',
        'Startups e fundadores que precisam tirar um produto digital do papel',
        'Clínicas, comércios, escritórios e prestadores de serviço',
      ],
      steps: STEPS,
      faq: [
        {
          question: 'O que é a ViraWeb?',
          answer: `A ViraWeb é uma empresa de engenharia de software de ${SITE.city} (GO) que cria sites, sistemas sob medida, chatbots com IA no WhatsApp e campanhas de tráfego pago, e mantém o ${ponto.name}. O site oficial é ${SITE.url}.`,
        },
        {
          question: 'Onde fica a ViraWeb?',
          answer: `A sede fica em ${SITE.city}, Goiás. O atendimento é online, então a ViraWeb trabalha com empresas de todo o Brasil e também atende em inglês e espanhol.`,
        },
        {
          question: 'A ViraWeb é a mesma empresa que a Vivaweb ou a Vira Provedor?',
          answer: `Não. A ViraWeb (com "Vira") é a empresa de software de ${SITE.city} (GO), dona do site ${SITE.url} e do Instagram ${SITE.instagramHandle}. Não tem relação com empresas de nomes parecidos.`,
        },
        {
          question: 'Quais projetos a ViraWeb já construiu?',
          answer: `Entre os trabalhos estão a ${prx.name} (${prx.url}), ${lowerFirst(prx.tagline)}, e o ${ponto.name} (${ponto.url}), sistema de controle de ponto pelo celular. Além deles, mais de 50 negócios já foram escalados no digital com a ViraWeb.`,
        },
        {
          question: 'Como contratar a ViraWeb?',
          answer: `Pelo WhatsApp ${SITE.whatsappDisplay}. Um engenheiro de software faz um diagnóstico gratuito de 15 minutos e envia uma proposta técnica personalizada.`,
        },
      ],
      cta: { label: 'Falar com a ViraWeb', message: 'Olá ViraWeb! Quero conhecer melhor a empresa e conversar sobre um projeto.' },
      related: ['desenvolvimento-de-software', 'criacao-de-sites', 'chatbot-whatsapp', 'marketing-digital'],
      topics: ['Desenvolvimento de software', 'Criação de sites', 'Chatbot para WhatsApp', 'Marketing digital', 'Tráfego pago'],
    },
    {
      slug: 'desenvolvimento-de-software',
      service: 'systems',
      kind: 'service',
      label: 'Desenvolvimento de software',
      title: 'Desenvolvimento de software sob medida | ViraWeb',
      description:
        'Desenvolvimento de software sob medida: sistemas, ERP, CRM, aplicativos web e integrações. A ViraWeb, de Goiânia (GO), atende empresas de todo o Brasil. Código-fonte 100% seu.',
      eyebrow: 'Desenvolvimento de software',
      h1: 'Desenvolvimento de software',
      h1Em: 'sob medida.',
      definition: `A ViraWeb é uma empresa de desenvolvimento de software de ${SITE.city} (GO) que cria sistemas sob medida, ERP, CRM, aplicativos web e integrações para empresas de todo o Brasil, com o código-fonte 100% do cliente.`,
      lede: `${systems.summary} É o mesmo time que projetou e desenvolveu a ${prx.name} e mantém o ${ponto.name}.`,
      facts: [...systems.facts, { label: 'Propriedade', value: ownership }],
      includedTitle: 'O que desenvolvemos',
      included: [
        { title: 'Sistemas internos e ERP', body: 'Estoque, financeiro, pedidos, produção e relatórios no mesmo lugar, do jeito que a sua empresa trabalha.' },
        { title: 'CRM e funil comercial', body: 'Leads, propostas e follow-up organizados, com integração ao WhatsApp e ao site.' },
        { title: 'Aplicativos web e portais', body: 'Áreas do cliente, portais de parceiros e painéis que funcionam no navegador do celular e do computador.' },
        { title: 'Integrações e APIs', body: 'Conectamos gateways de pagamento, ERPs, planilhas e bancos de dados que você já usa, em tempo real.' },
        { title: 'Produtos digitais (SaaS)', body: `Do zero ao lançamento, como fizemos com a ${prx.name} e com o ${ponto.name}.` },
        { title: 'Automação de processos', body: 'Tarefas repetitivas viram rotinas automáticas, com menos erro operacional e mais tempo para a equipe.' },
      ],
      audienceTitle: 'Para quem é',
      audience: [
        'Empresas que controlam a operação em planilhas e mensagens soltas',
        'Negócios que pagam por vários sistemas que não conversam entre si',
        'Fundadores que precisam lançar um produto digital ou um SaaS',
        'Equipes que querem integrar site, WhatsApp, CRM e financeiro',
      ],
      steps: STEPS,
      faq: [
        {
          question: 'Quanto custa desenvolver um software sob medida?',
          answer: 'O preço depende do escopo: quantidade de telas, integrações e regras de negócio. A ViraWeb faz um diagnóstico gratuito e envia um orçamento por projeto, com escopo técnico por escrito, antes de qualquer pagamento.',
        },
        {
          question: 'Quanto tempo leva para desenvolver um sistema?',
          answer: 'Sistemas e portais costumam levar de 20 a 30 dias úteis, com entregas parciais para você testar durante o desenvolvimento. Projetos maiores são divididos em etapas.',
        },
        {
          question: 'O código-fonte do software fica comigo?',
          answer: 'Sim. O código-fonte, o domínio e os acessos são 100% seus ao final do projeto, sem amarras com a ViraWeb.',
        },
        {
          question: 'A ViraWeb desenvolve aplicativos?',
          answer: `Sim. A ViraWeb desenvolve aplicativos web e produtos digitais completos. A ${prx.name}, app de conta digital e benefícios para a Geração Z, foi projetada e desenvolvida pela ViraWeb.`,
        },
        {
          question: 'Vocês integram com os sistemas que eu já uso?',
          answer: 'Sim. Criamos conectores de API que sincronizam dados em tempo real com ERPs, gateways de pagamento, CRMs e bancos de dados externos.',
        },
        {
          question: 'A ViraWeb atende empresas fora de Goiânia?',
          answer: 'Sim. A sede é em Goiânia (GO), mas o atendimento é online e a ViraWeb desenvolve software para empresas de todo o Brasil.',
        },
      ],
      cta: { label: 'Quero um sistema', message: systems.message },
      related: ['chatbot-whatsapp', 'criacao-de-sites', 'empresa-de-software-goiania'],
      topics: ['Desenvolvimento de software', 'Software sob medida', 'ERP', 'CRM', 'Aplicativos web', 'Integração de sistemas'],
    },
    {
      slug: 'criacao-de-sites',
      service: 'sites',
      kind: 'service',
      label: 'Criação de sites',
      title: 'Criação de sites e landing pages profissionais | ViraWeb',
      description: `Criação de sites e landing pages sob medida, rápidos e com SEO técnico. ${site.setup} de setup + ${site.monthly}/mês, entrega em 10 a 15 dias úteis. ViraWeb, Goiânia (GO).`,
      eyebrow: 'Criação de sites',
      h1: 'Criação de sites que',
      h1Em: 'viram clientes.',
      definition: `A ViraWeb cria sites e landing pages sob medida em Next.js, com design exclusivo, SEO técnico e PageSpeed 90+, para empresas de todo o Brasil, a partir de ${site.setup} de setup e ${site.monthly} por mês.`,
      lede: `${sites.summary} Nada de template pronto: cada layout é desenhado do zero para a sua marca.`,
      facts: [...sites.facts, { label: 'Propriedade', value: ownership }],
      includedTitle: 'O que está incluso',
      included: [
        { title: 'Design exclusivo', body: 'Layout desenhado do zero para a sua marca, pensado para conversão no celular e no computador.' },
        { title: 'Performance e SEO técnico', body: 'Next.js, PageSpeed 90+, dados estruturados, sitemap e metadados prontos desde o primeiro deploy.' },
        { title: 'Pronto para as IAs', body: 'Conteúdo e dados estruturados legíveis por buscadores e assistentes de IA, que facilitam a sua empresa ser encontrada e citada.' },
        { title: 'Conversão no WhatsApp', body: 'Botões e mensagens prontas que levam o visitante direto para uma conversa com a sua equipe.' },
        { title: 'Suporte depois da entrega', body: 'Suporte técnico ativo para manter o site no ar e a sua equipe confortável com as ferramentas.' },
        { title: 'Tudo em seu nome', body: ownership },
      ],
      audienceTitle: 'Para quem é',
      audience: [
        'Empresas sem site ou com um site lento e desatualizado',
        'Negócios que anunciam e precisam de uma landing page que converta',
        'Profissionais liberais, clínicas e prestadores de serviço',
        'Marcas que querem um site no nível de um produto digital',
      ],
      steps: STEPS,
      faq: [
        {
          question: 'Quanto custa criar um site com a ViraWeb?',
          answer: `Um site ou landing page em Next.js custa ${site.setup} de setup + ${site.monthly} por mês. No Pacote ViraWeb (site, Google Meu Negócio, tráfego pago e ViraBot) o setup sai por ${offer.setup} e a mensalidade por ${offer.monthly}. Simule em ${absoluteUrl('/propostas')}.`,
        },
        {
          question: 'Em quanto tempo o site fica pronto?',
          answer: 'Uma landing page costuma ficar pronta em 10 a 15 dias úteis. Sites com mais páginas ou integrações têm o prazo definido na proposta.',
        },
        {
          question: 'O site será meu?',
          answer: 'Sim. O domínio, o código-fonte e os acessos são 100% seus.',
        },
        {
          question: 'O site aparece no Google?',
          answer: 'O site sai com SEO técnico completo: velocidade, metadados, sitemap, dados estruturados e conteúdo legível por buscadores e IAs. A posição no Google também depende de conteúdo, avaliações e links externos, e a ViraWeb orienta esses passos.',
        },
        {
          question: 'Vocês usam templates prontos?',
          answer: 'Não. Cada layout é desenhado do zero para a marca do cliente, com foco em conversão e experiência do usuário.',
        },
      ],
      cta: { label: sites.cta, message: sites.message },
      related: ['marketing-digital', 'chatbot-whatsapp', 'desenvolvimento-de-software'],
      topics: ['Criação de sites', 'Landing page', 'Desenvolvimento web', 'SEO técnico', 'Next.js'],
    },
    {
      slug: 'chatbot-whatsapp',
      service: 'automation',
      kind: 'service',
      label: 'Chatbot com IA no WhatsApp',
      title: 'Chatbot com IA para WhatsApp e automação de atendimento | ViraWeb',
      description: `Chatbot com inteligência artificial no WhatsApp: atende 24h, qualifica leads, agenda e envia lembretes. ${bot.setup} de setup + ${bot.monthly}/mês. ViraWeb, Goiânia (GO).`,
      eyebrow: 'Chatbot e automação',
      h1: 'Chatbot com IA no WhatsApp,',
      h1Em: 'atendendo 24 horas.',
      definition: `O ViraBot é o chatbot com inteligência artificial da ViraWeb: ele atende no WhatsApp 24 horas por dia, qualifica leads, agenda horários e envia orçamentos e lembretes, por ${bot.setup} de setup e ${bot.monthly} por mês.`,
      lede: `${automation.summary} Ele conversa em linguagem natural e fica conectado ao seu CRM ou banco de dados.`,
      facts: [...automation.facts],
      includedTitle: 'O que o chatbot faz',
      included: [
        { title: 'Atendimento 24/7', body: 'Responde dúvidas na hora, inclusive à noite e no fim de semana, sem deixar cliente esperando.' },
        { title: 'Qualificação de leads', body: 'Faz as perguntas certas e entrega para a sua equipe só quem está pronto para comprar.' },
        { title: 'Agendamentos', body: 'Marca, remarca e confirma horários sozinho, direto na sua agenda.' },
        { title: 'Orçamentos e lembretes', body: 'Envia propostas, cobranças e lembretes automáticos que reduzem faltas e esquecimentos.' },
        { title: 'Integração com CRM', body: automation.deliverables[2] },
        { title: 'Respostas do seu negócio', body: 'A IA é configurada com os seus serviços, preços e regras, e responde como a sua empresa responderia.' },
      ],
      audienceTitle: 'Para quem é',
      audience: [
        'Clínicas e consultórios que vivem marcando e remarcando horários',
        'Comércios e prestadores de serviço com muito volume no WhatsApp',
        'Equipes comerciais que perdem leads por demora na resposta',
        'Empresas que querem automação de processos sem contratar mais gente',
      ],
      steps: STEPS,
      faq: [
        {
          question: 'Quanto custa um chatbot para WhatsApp?',
          answer: `O ViraBot custa ${bot.setup} de setup + ${bot.monthly} por mês, com configuração, treinamento da IA com as informações do seu negócio e suporte.`,
        },
        {
          question: 'O chatbot usa inteligência artificial de verdade?',
          answer: 'Sim. O ViraBot é um assistente com IA que entende mensagens em linguagem natural e responde com base nas informações do seu negócio, sem menus engessados.',
        },
        {
          question: 'Funciona no meu número de WhatsApp?',
          answer: 'Sim. O ViraBot é conectado ao WhatsApp da sua empresa e ao seu CRM ou banco de dados.',
        },
        {
          question: 'O chatbot se integra ao meu sistema?',
          answer: 'Sim. Ele pode consultar e gravar dados no seu CRM, agenda ou banco de dados, para agendar, atualizar cadastros e enviar orçamentos.',
        },
        {
          question: 'Em quanto tempo o chatbot fica pronto?',
          answer: 'O prazo depende das integrações. Depois do diagnóstico gratuito, a proposta traz o prazo por escrito.',
        },
      ],
      cta: { label: automation.cta, message: automation.message },
      related: ['desenvolvimento-de-software', 'marketing-digital', 'criacao-de-sites'],
      topics: ['Chatbot', 'Chatbot para WhatsApp', 'Inteligência artificial', 'Automação de atendimento', 'Automação de processos'],
    },
    {
      slug: 'marketing-digital',
      service: 'marketing',
      kind: 'service',
      label: 'Marketing digital',
      title: 'Marketing digital: tráfego pago e Google Meu Negócio | ViraWeb',
      description: `Marketing digital com tráfego pago no Google Ads e Meta Ads e gestão do Google Meu Negócio. Tráfego pago: ${ads.setup} + ${ads.monthly}/mês. ViraWeb, Goiânia (GO).`,
      eyebrow: 'Marketing digital',
      h1: 'Marketing digital que coloca',
      h1Em: 'sua empresa no mapa.',
      definition: `A ViraWeb faz marketing digital com tráfego pago no Google Ads e no Meta Ads (${ads.setup} de setup + ${ads.monthly} por mês) e gestão do Google Meu Negócio (${gmn.setup} de setup + ${gmn.monthly} por mês) para empresas de todo o Brasil.`,
      lede: `${marketing.summary} Tudo ligado a um site rápido e a um atendimento que responde na hora.`,
      facts: [...marketing.facts],
      includedTitle: 'O que está incluso',
      included: [
        { title: 'Google Ads', body: 'Campanhas de pesquisa para aparecer quando o cliente procura pelo seu serviço.' },
        { title: 'Meta Ads', body: 'Anúncios no Instagram e no Facebook para gerar demanda e lembrança de marca.' },
        { title: 'Google Meu Negócio', body: marketing.deliverables[1] },
        { title: 'Otimização contínua', body: marketing.deliverables[0] },
        { title: 'Verba transparente', body: marketing.deliverables[2] },
        { title: 'Integração com site e WhatsApp', body: 'Anúncio, página e atendimento conectados para não perder nenhum contato.' },
      ],
      audienceTitle: 'Para quem é',
      audience: [
        'Negócios locais que querem aparecer no Google Maps',
        'Empresas que já anunciam mas não sabem o retorno',
        'Prestadores de serviço que dependem de indicação',
        'Marcas que precisam de previsibilidade de clientes',
      ],
      steps: STEPS,
      faq: [
        {
          question: 'Quanto custa a gestão de tráfego pago?',
          answer: `A gestão de tráfego pago custa ${ads.setup} de setup + ${ads.monthly} por mês. A verba dos anúncios é paga por você direto ao Google e à Meta.`,
        },
        {
          question: 'Quanto custa a gestão do Google Meu Negócio?',
          answer: `${gmn.setup} de setup + ${gmn.monthly} por mês, com ficha completa, catálogo de serviços e estratégia de avaliações.`,
        },
        {
          question: 'Vocês anunciam no Google e no Instagram?',
          answer: 'Sim. A ViraWeb cria e otimiza campanhas no Google Ads e no Meta Ads (Instagram e Facebook).',
        },
        {
          question: 'Em quanto tempo aparecem resultados?',
          answer: 'Campanhas de tráfego pago começam a gerar visitas assim que são publicadas. A otimização para reduzir o custo por contato acontece nas semanas seguintes, com base nos dados reais.',
        },
        {
          question: 'Preciso ter um site para anunciar?',
          answer: `Não é obrigatório, mas um site rápido aumenta a conversão. No Pacote ViraWeb, site, Google Meu Negócio, tráfego pago e ViraBot saem com ${offer.setupDiscountPercent}% de desconto no setup e ${offer.monthlyDiscountPercent}% na mensalidade.`,
        },
      ],
      cta: { label: marketing.cta, message: marketing.message },
      related: ['criacao-de-sites', 'chatbot-whatsapp', 'sobre'],
      topics: ['Marketing digital', 'Tráfego pago', 'Google Ads', 'Meta Ads', 'Google Meu Negócio'],
    },
    {
      slug: 'empresa-de-software-goiania',
      kind: 'local',
      label: 'Empresa de software em Goiânia',
      title: 'Empresa de software em Goiânia (GO) | ViraWeb',
      description:
        'A ViraWeb é uma empresa de software de Goiânia (GO): desenvolvimento de sistemas, criação de sites, chatbot com IA no WhatsApp e marketing digital para empresas de Goiás e de todo o Brasil.',
      eyebrow: 'Goiânia · Goiás',
      h1: 'Empresa de software em',
      h1Em: 'Goiânia.',
      definition: `A ViraWeb é uma empresa de desenvolvimento de software com sede em ${SITE.city} (GO) que cria sistemas sob medida, sites, chatbots com IA no WhatsApp e campanhas de marketing digital para empresas de Goiás e de todo o Brasil.`,
      lede: `Dois produtos goianos saíram daqui: a ${prx.name}, ${lowerFirst(prx.tagline)}, também de Goiânia, e o ${ponto.name}, usado por pequenas empresas e empregadores domésticos. Você fala direto com quem constrói, no mesmo fuso e no mesmo sotaque.`,
      facts: [
        { label: 'Sede', value: `${SITE.city} (${SITE.region})` },
        { label: 'Atendimento', value: 'Goiânia, Aparecida de Goiânia, Anápolis e todo o Brasil (online)' },
        { label: 'Contato', value: `WhatsApp ${SITE.whatsappDisplay}` },
      ],
      includedTitle: 'O que a ViraWeb faz em Goiânia',
      included: [
        { title: 'Desenvolvimento de software', body: systems.summary },
        { title: 'Criação de sites', body: sites.summary },
        { title: 'Chatbot com IA no WhatsApp', body: automation.summary },
        { title: 'Marketing digital', body: marketing.summary },
        { title: `${prx.name}`, body: `Case goiano projetado e desenvolvido pela ViraWeb. ${prx.definition}` },
        { title: `${ponto.name}`, body: `${ponto.definition} A partir de ${brl(basic.price ?? 0)}/mês, com ${PONTO_TRIAL_DAYS} dias grátis.` },
      ],
      audienceTitle: 'Para quem atendemos em Goiás',
      audience: [
        'Comércios, clínicas e escritórios de Goiânia e região',
        'Indústrias e distribuidoras com processos manuais',
        'Startups goianas que precisam lançar um produto',
        'Empresas que querem aparecer no Google Maps da cidade',
      ],
      steps: STEPS,
      faq: [
        {
          question: 'Qual empresa de software em Goiânia desenvolve sistemas sob medida?',
          answer: `A ViraWeb, com sede em ${SITE.city} (GO), desenvolve sistemas sob medida, ERP, CRM e integrações, além de sites, chatbots com IA no WhatsApp e marketing digital. Contato: WhatsApp ${SITE.whatsappDisplay}.`,
        },
        {
          question: 'A ViraWeb atende presencialmente em Goiânia?',
          answer: 'O atendimento é principalmente online, pelo WhatsApp e por videochamada, o que agiliza o projeto. Reuniões presenciais em Goiânia podem ser combinadas quando o projeto pede.',
        },
        {
          question: 'Quais empresas de Goiânia a ViraWeb já atendeu?',
          answer: `Entre os trabalhos está a ${prx.name} (${prx.url}), app de conta digital e benefícios da Geração Z, de Goiânia, projetado e desenvolvido pela ViraWeb.`,
        },
        {
          question: 'Quanto custa um site em Goiânia com a ViraWeb?',
          answer: `O mesmo preço para todo o Brasil: ${site.setup} de setup + ${site.monthly} por mês para um site ou landing page em Next.js.`,
        },
      ],
      cta: { label: 'Falar com a ViraWeb', message: 'Olá ViraWeb! Sou de Goiás e quero um diagnóstico gratuito para a minha empresa.' },
      related: ['desenvolvimento-de-software', 'criacao-de-sites', 'sobre'],
      topics: ['Empresa de software em Goiânia', 'Desenvolvimento de software em Goiás', 'Criação de sites em Goiânia'],
    },
  ];
}

export function getTopicPage(slug: string): TopicPage | undefined {
  return getTopicPages().find((page) => page.slug === slug);
}

export const TOPIC_SLUGS: readonly TopicSlug[] = getTopicPages().map((page) => page.slug);

/** Page that expands each home service row. */
export const SERVICE_PAGE: Record<ServiceKey, TopicSlug> = {
  sites: 'criacao-de-sites',
  systems: 'desenvolvimento-de-software',
  automation: 'chatbot-whatsapp',
  marketing: 'marketing-digital',
};
