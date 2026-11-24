import { SITE } from '@/lib/site';
import { getPontoControle, getPrx } from '@/lib/home/products';

export type TopicSlug =
  | 'sobre'
  | 'desenvolvimento-de-software'
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

/** "O banco da Geração Z" → "o banco da Geração Z" (keeps proper nouns). */
const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

const STEPS: TopicBlock[] = [
  {
    title: 'Diagnóstico gratuito',
    body: 'Uma conversa de 15 minutos no WhatsApp com um engenheiro de software para entender o problema, o prazo e o orçamento.',
  },
  {
    title: 'Proposta personalizada',
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
  const ponto = getPontoControle('pt');
  const prx = getPrx('pt');
  const ownership = 'O código-fonte, o domínio e os acessos ficam com você.';
  const systemsSummary = 'Reunimos os dados da operação, conectamos as ferramentas da equipe e automatizamos o trabalho repetitivo.';

  return [
    {
      slug: 'sobre',
      kind: 'about',
      label: 'O que é a ViraWeb',
      title: 'O que é a ViraWeb? Empresa de software de Goiânia (GO)',
      description:
        'A ViraWeb é uma empresa especializada em sistemas sob medida de Goiânia (GO) que desenvolve plataformas web, produtos digitais e automações para empresas de todo o Brasil.',
      eyebrow: 'Sobre a ViraWeb',
      h1: 'O que é a',
      h1Em: 'ViraWeb?',
      definition: `A ViraWeb (viraweb.dev.br) é uma empresa especializada em sistemas sob medida de ${SITE.city} (GO), Brasil, que desenvolve plataformas web, produtos digitais e automações para empresas de todo o país.`,
      lede: `Além de atender clientes, a ViraWeb projetou e desenvolveu a ${prx.name}, ${lowerFirst(prx.tagline)}, e mantém o ${ponto.name}, sistema próprio de controle de ponto com reconhecimento facial e GPS.`,
      facts: [
        { label: 'Nome', value: `${SITE.name} (${SITE.legalName})` },
        { label: 'Sede', value: `${SITE.city} (${SITE.region}), Brasil` },
        { label: 'Atendimento', value: 'Todo o Brasil, em português, inglês e espanhol' },
        { label: 'Contato', value: `WhatsApp ${SITE.whatsappDisplay} · ${SITE.email}` },
      ],
      includedTitle: 'O que a ViraWeb faz',
      included: [
        { title: 'Desenvolvimento de software', body: systemsSummary },
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
          answer: `A ViraWeb é uma empresa especializada em sistemas sob medida de ${SITE.city} (GO) que desenvolve plataformas web, produtos digitais e automações, e mantém o ${ponto.name}. O site oficial é ${SITE.url}.`,
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
      related: ['desenvolvimento-de-software'],
      topics: ['Sistemas sob medida', 'Plataformas web', 'Automação de processos'],
    },
    {
      slug: 'desenvolvimento-de-software',
      kind: 'service',
      label: 'Desenvolvimento de software',
      title: 'Desenvolvimento de software sob medida | ViraWeb',
      description:
        'Desenvolvimento de software sob medida: sistemas, painéis de operação, portais, aplicativos web e integrações. A ViraWeb, de Goiânia (GO), atende empresas de todo o Brasil. Código-fonte 100% seu.',
      eyebrow: 'Desenvolvimento de software',
      h1: 'Desenvolvimento de software',
      h1Em: 'sob medida.',
      definition: `A ViraWeb é uma empresa de desenvolvimento de software de ${SITE.city} (GO) que cria sistemas sob medida, painéis de operação, portais, aplicativos web e integrações para empresas de todo o Brasil, com o código-fonte 100% do cliente.`,
      lede: `${systemsSummary} É o mesmo time que projetou e desenvolveu a ${prx.name} e mantém o ${ponto.name}.`,
      facts: [{ label: 'Propriedade', value: ownership }],
      includedTitle: 'O que desenvolvemos',
      included: [
        { title: 'Gestão da operação', body: 'Estoque, financeiro, pedidos, produção e relatórios no mesmo lugar, do jeito que a sua empresa trabalha.' },
        { title: 'Gestão comercial', body: 'Contatos, propostas e retornos organizados, com integração ao WhatsApp e ao site.' },
        { title: 'Aplicativos web e portais', body: 'Áreas do cliente, portais de parceiros e painéis que funcionam no navegador do celular e do computador.' },
        { title: 'Ferramentas conectadas', body: 'Conectamos pagamentos, planilhas e sistemas de gestão para evitar que sua equipe digite os mesmos dados duas vezes.' },
        { title: 'Produtos digitais e plataformas por assinatura', body: `Do zero ao lançamento, como fizemos com a ${prx.name} e com o ${ponto.name}.` },
        { title: 'Automação de processos', body: 'Tarefas repetitivas viram rotinas automáticas, com menos erro operacional e mais tempo para a equipe.' },
      ],
      audienceTitle: 'Para quem é',
      audience: [
        'Empresas que controlam a operação em planilhas e mensagens soltas',
        'Negócios que pagam por vários sistemas que não conversam entre si',
        'Fundadores que precisam lançar um produto digital ou uma plataforma por assinatura',
        'Equipes que querem conectar atendimento, vendas e financeiro',
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
          answer: 'Sim. Conectamos as ferramentas de gestão, vendas e pagamentos que você já usa para manter os dados em dia.',
        },
        {
          question: 'A ViraWeb atende empresas fora de Goiânia?',
          answer: 'Sim. A sede é em Goiânia (GO), mas o atendimento é online e a ViraWeb desenvolve software para empresas de todo o Brasil.',
        },
      ],
      cta: { label: 'Solicitar diagnóstico do projeto', message: 'Olá ViraWeb! Quero um diagnóstico para desenvolver um sistema sob medida.' },
      related: ['sobre', 'empresa-de-software-goiania'],
      topics: ['Desenvolvimento de software', 'Software sob medida', 'Aplicativos web', 'Integração de sistemas'],
    },
    {
      slug: 'empresa-de-software-goiania',
      kind: 'local',
      label: 'Empresa de software em Goiânia',
      title: 'Empresa de software em Goiânia (GO) | ViraWeb',
      description:
        'A ViraWeb é uma empresa de software de Goiânia (GO): desenvolvimento de sistemas sob medida, plataformas web e automações para empresas de Goiás e de todo o Brasil.',
      eyebrow: 'Goiânia · Goiás',
      h1: 'Empresa de software em',
      h1Em: 'Goiânia.',
      definition: `A ViraWeb é uma empresa de desenvolvimento de software com sede em ${SITE.city} (GO) que cria sistemas sob medida, plataformas web e automações para empresas de Goiás e de todo o Brasil.`,
      lede: `Dois produtos goianos saíram daqui: a ${prx.name}, ${lowerFirst(prx.tagline)}, também de Goiânia, e o ${ponto.name}, usado por pequenas empresas e empregadores domésticos. Você fala direto com quem constrói, no mesmo fuso e no mesmo sotaque.`,
      facts: [
        { label: 'Sede', value: `${SITE.city} (${SITE.region})` },
        { label: 'Atendimento', value: 'Goiânia, Aparecida de Goiânia, Anápolis e todo o Brasil (online)' },
        { label: 'Contato', value: `WhatsApp ${SITE.whatsappDisplay}` },
      ],
      includedTitle: 'O que a ViraWeb faz em Goiânia',
      included: [
        { title: 'Desenvolvimento de software', body: systemsSummary },
        { title: `${prx.name}`, body: `Case goiano projetado e desenvolvido pela ViraWeb. ${prx.definition}` },
        { title: `${ponto.name}`, body: ponto.definition },
      ],
      audienceTitle: 'Para quem atendemos em Goiás',
      audience: [
        'Comércios, clínicas e escritórios de Goiânia e região',
        'Indústrias e distribuidoras com processos manuais',
        'Startups goianas que precisam lançar um produto',
        'Empresas que precisam reunir dados e ferramentas em uma só operação',
      ],
      steps: STEPS,
      faq: [
        {
          question: 'Qual empresa de software em Goiânia desenvolve sistemas sob medida?',
          answer: `A ViraWeb, com sede em ${SITE.city} (GO), desenvolve sistemas sob medida para organizar a operação, conectar ferramentas e automatizar rotinas. Contato: WhatsApp ${SITE.whatsappDisplay}.`,
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
          question: 'Como recebo um orçamento para meu sistema?',
          answer: 'Depois de entender sua operação e o que precisa ser construído, enviamos uma proposta personalizada com escopo e prazo.',
        },
      ],
      cta: { label: 'Falar com a ViraWeb', message: 'Olá ViraWeb! Sou de Goiás e quero um diagnóstico gratuito para a minha empresa.' },
      related: ['desenvolvimento-de-software', 'sobre'],
      topics: ['Empresa de software em Goiânia', 'Desenvolvimento de software em Goiás', 'Sistemas sob medida em Goiânia'],
    },
  ];
}

export function getTopicPage(slug: string): TopicPage | undefined {
  return getTopicPages().find((page) => page.slug === slug);
}

export const TOPIC_SLUGS: readonly TopicSlug[] = getTopicPages().map((page) => page.slug);
