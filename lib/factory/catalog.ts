// Hello World
import type { CategoryId, PreviewKind, Product, Tier } from './types';

/**
 * Static catalog: the source for the database seed and the fallback when no
 * database is configured. Once Supabase is live, Operations owns these values.
 */

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  description: string;
  preview: PreviewKind;
}

export const CATEGORIES: readonly CategoryMeta[] = [
  { id: 'websites', label: 'Websites', description: 'Páginas que apresentam, vendem e convertem.', preview: 'landing' },
  { id: 'automacao', label: 'Automação', description: 'Fluxos que tiram o trabalho repetitivo da sua equipe.', preview: 'automation' },
  { id: 'bots', label: 'Bots', description: 'Atendimento e qualificação que não dormem.', preview: 'bot' },
  { id: 'sistemas', label: 'Sistemas', description: 'Ferramentas internas feitas para o seu processo.', preview: 'dashboard' },
  { id: 'ferramentas', label: 'Ferramentas', description: 'Utilitários que resolvem uma tarefa muito bem.', preview: 'tool' },
  { id: 'apps', label: 'Apps', description: 'Aplicativos web instaláveis, prontos para o dia a dia.', preview: 'app' },
];

export function categoryMeta(id: CategoryId): CategoryMeta {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

interface Seed {
  slug: string;
  name: string;
  category: CategoryId;
  tier: Tier;
  summary: string;
  description: string;
  setup: number | null;
  monthly: number | null;
  from?: boolean;
  preview: PreviewKind;
  features: string[];
  note?: string;
  featured?: boolean;
}

const WHATSAPP_NOTE = 'Custos da API oficial do WhatsApp são cobrados à parte, direto pelo provedor.';
const AI_NOTE = 'Custos de uso de modelos de IA são cobrados à parte, conforme consumo.';

const SEEDS: Seed[] = [
  // Websites -------------------------------------------------------------------
  {
    slug: 'landing-page', name: 'Landing Page', category: 'websites', tier: 'standard', featured: true,
    summary: 'Uma página com um único objetivo: captar, agendar ou vender.',
    description: 'Página única, rápida e responsiva, desenhada em torno de uma ação principal — WhatsApp, formulário ou link de compra.',
    setup: 29700, monthly: 4900, preview: 'landing',
    features: ['Design exclusivo e responsivo', 'Botão de WhatsApp ou formulário', 'SEO técnico e Open Graph', 'Domínio e SSL configurados', 'Métricas de acesso instaladas'],
  },
  {
    slug: 'pagina-de-vendas', name: 'Página de Vendas', category: 'websites', tier: 'standard', featured: true,
    summary: 'Página longa que conduz o visitante até a compra.',
    description: 'Estrutura de vendas completa: promessa, prova, oferta, garantia e perguntas frequentes, integrada ao seu checkout.',
    setup: 49700, monthly: 7900, preview: 'sales',
    features: ['Estrutura persuasiva por seções', 'Depoimentos e prova social', 'Integração com seu checkout', 'FAQ e garantia', 'Eventos de conversão configurados'],
  },
  {
    slug: 'site-institucional', name: 'Site Institucional', category: 'websites', tier: 'standard', featured: true,
    summary: 'Site completo para apresentar sua empresa com autoridade.',
    description: 'Até cinco páginas — início, sobre, serviços, contato e mais uma — com navegação clara e SEO por página.',
    setup: 79700, monthly: 9900, preview: 'site',
    features: ['Até 5 páginas', 'SEO por página', 'Formulário de contato', 'Mapa e dados da empresa', 'Painel de métricas'],
  },
  {
    slug: 'link-in-bio', name: 'Link-in-Bio', category: 'websites', tier: 'standard',
    summary: 'Sua página de links com a cara da sua marca.',
    description: 'Uma página leve para o link da bio, com seus canais, ofertas e destaques organizados.',
    setup: 29700, monthly: 4900, preview: 'landing',
    features: ['Links e destaques ilimitados', 'Identidade da sua marca', 'Métricas de cliques', 'Domínio próprio'],
  },
  {
    slug: 'pagina-de-evento', name: 'Página de Evento', category: 'websites', tier: 'standard',
    summary: 'Programação, inscrição e local em uma página só.',
    description: 'Página para eventos, lançamentos e workshops, com agenda, palestrantes e inscrição.',
    setup: 29700, monthly: 4900, preview: 'landing',
    features: ['Agenda e palestrantes', 'Inscrição ou venda de ingresso', 'Contagem regressiva', 'Mapa do local'],
  },
  // Automação ------------------------------------------------------------------
  {
    slug: 'automacao-de-leads', name: 'Automação de Leads', category: 'automacao', tier: 'standard', featured: true,
    summary: 'Cada lead registrado, distribuído e respondido sozinho.',
    description: 'Captura de leads de formulários e anúncios, com registro, distribuição para a equipe e primeira resposta automática.',
    setup: 69700, monthly: 14900, preview: 'automation',
    features: ['Captura de formulários e anúncios', 'Registro em planilha ou CRM', 'Distribuição para a equipe', 'Resposta automática'],
  },
  {
    slug: 'automacao-de-email', name: 'Automação de E-mail', category: 'automacao', tier: 'standard',
    summary: 'Sequências de e-mail disparadas pelo comportamento do cliente.',
    description: 'Boas-vindas, recuperação e nutrição de leads com sequências automáticas.',
    setup: 69700, monthly: 14900, preview: 'automation',
    features: ['Sequências automáticas', 'Gatilhos por evento', 'Modelos com sua marca', 'Relatório de envios'],
  },
  {
    slug: 'automacao-de-crm', name: 'Automação de CRM', category: 'automacao', tier: 'standard',
    summary: 'Seu funil se atualiza sozinho.',
    description: 'Movimentação de etapas, tarefas e lembretes automáticos no CRM que você já usa.',
    setup: 69700, monthly: 14900, preview: 'automation',
    features: ['Etapas automáticas', 'Tarefas e lembretes', 'Alertas para a equipe', 'Integração com seu CRM'],
  },
  {
    slug: 'integracoes', name: 'Integrações', category: 'automacao', tier: 'standard',
    summary: 'Suas ferramentas conversando entre si.',
    description: 'Conexão entre sistemas, planilhas e plataformas para os dados circularem sem copiar e colar.',
    setup: 69700, monthly: 14900, preview: 'integration',
    features: ['Conexão entre plataformas', 'Sincronização de dados', 'Tratamento de erros', 'Registro de execuções'],
  },
  {
    slug: 'fluxos-personalizados', name: 'Fluxos Personalizados', category: 'automacao', tier: 'custom',
    summary: 'Automação desenhada para um processo único.',
    description: 'Para processos com várias etapas, regras ou sistemas. Prazo e escopo definidos após análise.',
    setup: 69700, monthly: 14900, from: true, preview: 'automation',
    features: ['Mapeamento do processo', 'Regras de negócio', 'Múltiplas integrações', 'Monitoramento'],
  },
  // Bots -----------------------------------------------------------------------
  {
    slug: 'bot-de-atendimento', name: 'Bot de Atendimento', category: 'bots', tier: 'standard', featured: true,
    summary: 'Respostas imediatas no seu site, a qualquer hora.',
    description: 'Bot treinado com as informações do seu negócio, que responde e encaminha para um humano quando precisa.',
    setup: 49700, monthly: 14900, preview: 'bot',
    features: ['Treinado com seu conteúdo', 'Encaminhamento para humano', 'Horário de atendimento', 'Histórico de conversas'],
  },
  {
    slug: 'bot-de-whatsapp', name: 'Bot de WhatsApp', category: 'bots', tier: 'standard', featured: true,
    summary: 'Atendimento automático no canal que seu cliente já usa.',
    description: 'Bot na API oficial do WhatsApp para responder, qualificar e agendar.',
    setup: 79700, monthly: 19900, preview: 'whatsapp', note: WHATSAPP_NOTE,
    features: ['API oficial do WhatsApp', 'Menu e respostas automáticas', 'Encaminhamento para a equipe', 'Relatório de atendimentos'],
  },
  {
    slug: 'faq-inteligente', name: 'FAQ Inteligente', category: 'bots', tier: 'standard',
    summary: 'As perguntas de sempre, respondidas sem a sua equipe.',
    description: 'Central de dúvidas que entende a pergunta escrita do jeito do cliente.',
    setup: 49700, monthly: 14900, preview: 'bot',
    features: ['Base de perguntas e respostas', 'Busca por linguagem natural', 'Atualização simples', 'Métricas de dúvidas'],
  },
  {
    slug: 'qualificador-de-leads', name: 'Qualificador de Leads', category: 'bots', tier: 'standard',
    summary: 'Perguntas certas antes do lead chegar no comercial.',
    description: 'Bot que faz a triagem, pontua e entrega ao comercial só quem está pronto para comprar.',
    setup: 49700, monthly: 14900, preview: 'bot',
    features: ['Roteiro de qualificação', 'Pontuação de leads', 'Envio ao comercial', 'Registro no CRM'],
  },
  {
    slug: 'ai-assistant', name: 'AI Assistant', category: 'bots', tier: 'custom',
    summary: 'Assistente de IA treinado com o conhecimento da sua empresa.',
    description: 'Assistente para equipe ou clientes, conectado aos seus documentos e sistemas. Escopo definido após análise.',
    setup: 49700, monthly: 14900, from: true, preview: 'bot', note: AI_NOTE,
    features: ['Base de conhecimento própria', 'Integração com seus sistemas', 'Controle de acesso', 'Registro de uso'],
  },
  // Sistemas -------------------------------------------------------------------
  {
    slug: 'dashboard', name: 'Dashboard', category: 'sistemas', tier: 'standard', featured: true,
    summary: 'Seus números em um painel, atualizado sozinho.',
    description: 'Painel com os indicadores do seu negócio, conectado às suas fontes de dados.',
    setup: 99700, monthly: 14900, preview: 'dashboard',
    features: ['Indicadores principais', 'Gráficos e filtros', 'Conexão com suas fontes', 'Acesso por usuário'],
  },
  {
    slug: 'mini-sistema', name: 'Mini Sistema', category: 'sistemas', tier: 'custom', featured: true,
    summary: 'Um sistema enxuto, feito para o seu processo.',
    description: 'Cadastros, fluxos e relatórios sob medida para uma operação específica.',
    setup: 149700, monthly: 19900, from: true, preview: 'system',
    features: ['Cadastros sob medida', 'Fluxos e permissões', 'Relatórios', 'Acesso por usuário'],
  },
  {
    slug: 'crm', name: 'CRM', category: 'sistemas', tier: 'custom',
    summary: 'Funil, contatos e tarefas do jeito que seu comercial trabalha.',
    description: 'CRM sob medida com funil visual, histórico de contatos e tarefas.',
    setup: 149700, monthly: 19900, from: true, preview: 'system',
    features: ['Funil visual', 'Histórico de contatos', 'Tarefas e lembretes', 'Relatórios de vendas'],
  },
  {
    slug: 'agendamento', name: 'Agendamento', category: 'sistemas', tier: 'custom',
    summary: 'Agenda online com confirmação e lembretes.',
    description: 'Sistema de agendamento com horários, profissionais, confirmações e lembretes.',
    setup: 149700, monthly: 19900, from: true, preview: 'system',
    features: ['Agenda por profissional', 'Confirmação automática', 'Lembretes', 'Painel administrativo'],
  },
  {
    slug: 'orcamento', name: 'Orçamento', category: 'sistemas', tier: 'custom',
    summary: 'Orçamentos montados e enviados em minutos.',
    description: 'Sistema para montar, enviar e acompanhar orçamentos com a sua tabela de preços.',
    setup: 149700, monthly: 19900, from: true, preview: 'system',
    features: ['Tabela de preços', 'PDF com sua marca', 'Envio e aprovação', 'Histórico'],
  },
  {
    slug: 'portal-do-cliente', name: 'Portal do Cliente', category: 'sistemas', tier: 'custom',
    summary: 'Uma área para seus clientes acompanharem tudo.',
    description: 'Portal com login onde seus clientes veem pedidos, documentos e status.',
    setup: 149700, monthly: 19900, from: true, preview: 'system',
    features: ['Login de clientes', 'Documentos e arquivos', 'Status de pedidos', 'Mensagens'],
  },
  {
    slug: 'area-de-membros', name: 'Área de Membros', category: 'sistemas', tier: 'custom',
    summary: 'Conteúdo exclusivo para quem é assinante.',
    description: 'Área restrita com aulas, materiais e controle de acesso.',
    setup: 149700, monthly: 19900, from: true, preview: 'system',
    features: ['Controle de acesso', 'Aulas e materiais', 'Progresso do aluno', 'Integração com pagamento'],
  },
  {
    slug: 'sistema-de-pedidos', name: 'Sistema de Pedidos', category: 'sistemas', tier: 'custom',
    summary: 'Pedidos recebidos, organizados e acompanhados.',
    description: 'Recebimento e gestão de pedidos com status, notificações e relatórios.',
    setup: 149700, monthly: 19900, from: true, preview: 'system',
    features: ['Recebimento de pedidos', 'Status e notificações', 'Gestão de estoque simples', 'Relatórios'],
  },
  {
    slug: 'mini-saas', name: 'Mini SaaS', category: 'sistemas', tier: 'custom',
    summary: 'Seu produto digital por assinatura.',
    description: 'Software com cadastro de clientes, planos e cobrança recorrente.',
    setup: 199700, monthly: 24900, from: true, preview: 'app',
    features: ['Cadastro e login', 'Planos e assinaturas', 'Painel do cliente', 'Painel administrativo'],
  },
  // Ferramentas ----------------------------------------------------------------
  {
    slug: 'calculadoras', name: 'Calculadoras', category: 'ferramentas', tier: 'custom',
    summary: 'Simuladores que entregam a resposta e capturam o lead.',
    description: 'Calculadoras e simuladores para seu site, com captura de contato no resultado.',
    setup: null, monthly: null, preview: 'tool',
    features: ['Fórmulas do seu negócio', 'Resultado visual', 'Captura de lead', 'Incorporável no site'],
  },
  {
    slug: 'geradores-de-pdf', name: 'Geradores de PDF', category: 'ferramentas', tier: 'custom',
    summary: 'Documentos com sua marca, gerados a partir de dados.',
    description: 'Propostas, relatórios e certificados gerados automaticamente.',
    setup: null, monthly: null, preview: 'tool',
    features: ['Modelos com sua marca', 'Dados dinâmicos', 'Download e envio', 'Histórico'],
  },
  {
    slug: 'formularios-inteligentes', name: 'Formulários Inteligentes', category: 'ferramentas', tier: 'custom',
    summary: 'Formulários que mudam conforme a resposta.',
    description: 'Formulários com lógica condicional, validação e envio para onde você precisa.',
    setup: null, monthly: null, preview: 'tool',
    features: ['Lógica condicional', 'Validação de dados', 'Envio para planilha ou CRM', 'Notificações'],
  },
  {
    slug: 'catalogos', name: 'Catálogos', category: 'ferramentas', tier: 'custom',
    summary: 'Seus produtos organizados e fáceis de pedir.',
    description: 'Catálogo digital com busca, categorias e pedido pelo WhatsApp.',
    setup: null, monthly: null, preview: 'tool',
    features: ['Categorias e busca', 'Fotos e preços', 'Pedido pelo WhatsApp', 'Atualização simples'],
  },
  {
    slug: 'menus-digitais', name: 'Menus Digitais', category: 'ferramentas', tier: 'custom',
    summary: 'Cardápio por QR Code, sempre atualizado.',
    description: 'Cardápio digital para restaurantes e cafés, com QR Code e edição rápida.',
    setup: null, monthly: null, preview: 'tool',
    features: ['QR Code por mesa', 'Fotos e descrições', 'Edição rápida de preços', 'Itens esgotados'],
  },
  {
    slug: 'trackers', name: 'Trackers', category: 'ferramentas', tier: 'custom',
    summary: 'Acompanhamento de pedidos, metas ou hábitos.',
    description: 'Ferramentas para acompanhar status e progresso, com visual claro.',
    setup: null, monthly: null, preview: 'tool',
    features: ['Status em tempo real', 'Linha do tempo', 'Notificações', 'Link compartilhável'],
  },
  // Apps -----------------------------------------------------------------------
  {
    slug: 'pwa', name: 'PWA', category: 'apps', tier: 'custom',
    summary: 'App instalável no celular, sem loja de aplicativos.',
    description: 'Aplicativo web progressivo que funciona como app nativo e é instalado direto do navegador.',
    setup: 199700, monthly: 24900, from: true, preview: 'app',
    features: ['Instalável no celular', 'Funciona offline', 'Notificações', 'Atualização instantânea'],
  },
  {
    slug: 'web-app', name: 'Web App', category: 'apps', tier: 'custom', featured: true,
    summary: 'Aplicação completa no navegador.',
    description: 'Aplicação web com contas, dados e regras de negócio, pronta para crescer.',
    setup: 199700, monthly: 24900, from: true, preview: 'app',
    features: ['Contas e permissões', 'Banco de dados', 'Painel administrativo', 'Infraestrutura escalável'],
  },
  {
    slug: 'aplicativos-internos', name: 'Aplicativos Internos', category: 'apps', tier: 'custom',
    summary: 'Ferramentas para sua equipe trabalhar melhor.',
    description: 'Apps de uso interno para checklists, inspeções, estoque ou rotinas da operação.',
    setup: 199700, monthly: 24900, from: true, preview: 'app',
    features: ['Uso no celular ou desktop', 'Login da equipe', 'Relatórios', 'Funciona offline'],
  },
];

export const STATIC_CATALOG: readonly Product[] = SEEDS.map((seed, index) => ({
  id: null,
  slug: seed.slug,
  name: seed.name,
  category: seed.category,
  tier: seed.tier,
  summary: seed.summary,
  description: seed.description,
  setupPrice: seed.setup,
  monthlyPrice: seed.monthly,
  priceFrom: seed.from ?? false,
  deliveryDays: seed.tier === 'standard' ? 2 : null,
  features: seed.features,
  preview: seed.preview,
  briefing: [],
  externalCostsNote: seed.note ?? null,
  featured: seed.featured ?? false,
  sortOrder: (index + 1) * 10,
  active: true,
  imageUrl: null,
  seoTitle: null,
  seoDescription: null,
}));

/** Order of the price lines shown on the Factory home (matches the commercial table). */
export const FEATURED_ORDER = [
  'landing-page', 'pagina-de-vendas', 'site-institucional', 'bot-de-atendimento',
  'automacao-de-leads', 'bot-de-whatsapp', 'dashboard', 'mini-sistema', 'web-app',
] as const;
