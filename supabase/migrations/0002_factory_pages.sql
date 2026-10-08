-- ViraWeb Factory — columns used by the Factory/Operations pages, realtime,
-- holidays and the full catalog seed (generated from lib/factory/catalog.ts).

-- Products --------------------------------------------------------------------
alter table products
  alter column setup_price drop not null,
  alter column monthly_price drop not null,
  alter column delivery_days drop not null;
alter table products
  add column if not exists summary text,
  add column if not exists preview text not null default 'landing',
  add column if not exists external_costs_note text,
  add column if not exists featured boolean not null default false,
  add column if not exists seo_title text,
  add column if not exists seo_description text;

-- Users -----------------------------------------------------------------------
alter table users add column if not exists stripe_customer_id text unique;

-- Orders ----------------------------------------------------------------------
alter table orders
  alter column setup_price drop not null,
  alter column monthly_price drop not null;
alter table orders
  add column if not exists accepted_at timestamptz,
  add column if not exists delivery_days integer,
  add column if not exists paid_at timestamptz,
  add column if not exists briefing_completed_at timestamptz,
  add column if not exists delivered_at timestamptz,
  add column if not exists stripe_checkout_session_id text unique,
  add column if not exists notes text;
create index if not exists orders_created_idx on orders(created_at desc);

-- Deliveries & revisions --------------------------------------------------------
alter table deliveries
  add column if not exists instructions text,
  add column if not exists created_by uuid references users(id);
alter table revisions
  add column if not exists response text,
  add column if not exists created_by uuid references users(id);

-- Realtime notifications for the Operations bell (RLS still filters rows).
do $$ begin
  alter publication supabase_realtime add table notifications;
exception when others then null;
end $$;

-- Superseded generic rows from 0001 ----------------------------------------------
delete from products p where p.slug in ('bot', 'automacao')
  and not exists (select 1 from orders o where o.product_id = p.id);
update products set active = false where slug in ('bot', 'automacao');

-- National holidays (editable in Operations → Configurações) ----------------------
insert into holidays (day, name) values
  ('2026-01-01', 'Confraternização Universal'),
  ('2026-02-16', 'Carnaval'),
  ('2026-02-17', 'Carnaval'),
  ('2026-04-03', 'Sexta-feira Santa'),
  ('2026-04-21', 'Tiradentes'),
  ('2026-05-01', 'Dia do Trabalho'),
  ('2026-06-04', 'Corpus Christi'),
  ('2026-09-07', 'Independência do Brasil'),
  ('2026-10-12', 'Nossa Senhora Aparecida'),
  ('2026-11-02', 'Finados'),
  ('2026-11-15', 'Proclamação da República'),
  ('2026-11-20', 'Dia da Consciência Negra'),
  ('2026-12-25', 'Natal'),
  ('2027-01-01', 'Confraternização Universal'),
  ('2027-02-08', 'Carnaval'),
  ('2027-02-09', 'Carnaval'),
  ('2027-03-26', 'Sexta-feira Santa'),
  ('2027-04-21', 'Tiradentes'),
  ('2027-05-01', 'Dia do Trabalho'),
  ('2027-05-27', 'Corpus Christi'),
  ('2027-09-07', 'Independência do Brasil'),
  ('2027-10-12', 'Nossa Senhora Aparecida'),
  ('2027-11-02', 'Finados'),
  ('2027-11-15', 'Proclamação da República'),
  ('2027-11-20', 'Dia da Consciência Negra'),
  ('2027-12-25', 'Natal')
on conflict (day) do nothing;

-- Catalog seed ------------------------------------------------------------------
insert into products (slug, name, category, tier, summary, description, setup_price, monthly_price, price_from, delivery_days, preview, external_costs_note, featured, sort_order) values
  ('landing-page', 'Landing Page', 'websites', 'standard', 'Uma página com um único objetivo: captar, agendar ou vender.', 'Página única, rápida e responsiva, desenhada em torno de uma ação principal — WhatsApp, formulário ou link de compra.', 29700, 4900, false, 2, 'landing', null, true, 10),
  ('pagina-de-vendas', 'Página de Vendas', 'websites', 'standard', 'Página longa que conduz o visitante até a compra.', 'Estrutura de vendas completa: promessa, prova, oferta, garantia e perguntas frequentes, integrada ao seu checkout.', 49700, 7900, false, 2, 'sales', null, true, 20),
  ('site-institucional', 'Site Institucional', 'websites', 'standard', 'Site completo para apresentar sua empresa com autoridade.', 'Até cinco páginas — início, sobre, serviços, contato e mais uma — com navegação clara e SEO por página.', 79700, 9900, false, 2, 'site', null, true, 30),
  ('link-in-bio', 'Link-in-Bio', 'websites', 'standard', 'Sua página de links com a cara da sua marca.', 'Uma página leve para o link da bio, com seus canais, ofertas e destaques organizados.', 29700, 4900, false, 2, 'landing', null, false, 40),
  ('pagina-de-evento', 'Página de Evento', 'websites', 'standard', 'Programação, inscrição e local em uma página só.', 'Página para eventos, lançamentos e workshops, com agenda, palestrantes e inscrição.', 29700, 4900, false, 2, 'landing', null, false, 50),
  ('automacao-de-leads', 'Automação de Leads', 'automacao', 'standard', 'Cada lead registrado, distribuído e respondido sozinho.', 'Captura de leads de formulários e anúncios, com registro, distribuição para a equipe e primeira resposta automática.', 69700, 14900, false, 2, 'automation', null, true, 60),
  ('automacao-de-email', 'Automação de E-mail', 'automacao', 'standard', 'Sequências de e-mail disparadas pelo comportamento do cliente.', 'Boas-vindas, recuperação e nutrição de leads com sequências automáticas.', 69700, 14900, false, 2, 'automation', null, false, 70),
  ('automacao-de-crm', 'Automação de CRM', 'automacao', 'standard', 'Seu funil se atualiza sozinho.', 'Movimentação de etapas, tarefas e lembretes automáticos no CRM que você já usa.', 69700, 14900, false, 2, 'automation', null, false, 80),
  ('integracoes', 'Integrações', 'automacao', 'standard', 'Suas ferramentas conversando entre si.', 'Conexão entre sistemas, planilhas e plataformas para os dados circularem sem copiar e colar.', 69700, 14900, false, 2, 'integration', null, false, 90),
  ('fluxos-personalizados', 'Fluxos Personalizados', 'automacao', 'custom', 'Automação desenhada para um processo único.', 'Para processos com várias etapas, regras ou sistemas. Prazo e escopo definidos após análise.', 69700, 14900, true, null, 'automation', null, false, 100),
  ('bot-de-atendimento', 'Bot de Atendimento', 'bots', 'standard', 'Respostas imediatas no seu site, a qualquer hora.', 'Bot treinado com as informações do seu negócio, que responde e encaminha para um humano quando precisa.', 49700, 14900, false, 2, 'bot', null, true, 110),
  ('bot-de-whatsapp', 'Bot de WhatsApp', 'bots', 'standard', 'Atendimento automático no canal que seu cliente já usa.', 'Bot na API oficial do WhatsApp para responder, qualificar e agendar.', 79700, 19900, false, 2, 'whatsapp', 'Custos da API oficial do WhatsApp são cobrados à parte, direto pelo provedor.', true, 120),
  ('faq-inteligente', 'FAQ Inteligente', 'bots', 'standard', 'As perguntas de sempre, respondidas sem a sua equipe.', 'Central de dúvidas que entende a pergunta escrita do jeito do cliente.', 49700, 14900, false, 2, 'bot', null, false, 130),
  ('qualificador-de-leads', 'Qualificador de Leads', 'bots', 'standard', 'Perguntas certas antes do lead chegar no comercial.', 'Bot que faz a triagem, pontua e entrega ao comercial só quem está pronto para comprar.', 49700, 14900, false, 2, 'bot', null, false, 140),
  ('ai-assistant', 'AI Assistant', 'bots', 'custom', 'Assistente de IA treinado com o conhecimento da sua empresa.', 'Assistente para equipe ou clientes, conectado aos seus documentos e sistemas. Escopo definido após análise.', 49700, 14900, true, null, 'bot', 'Custos de uso de modelos de IA são cobrados à parte, conforme consumo.', false, 150),
  ('dashboard', 'Dashboard', 'sistemas', 'standard', 'Seus números em um painel, atualizado sozinho.', 'Painel com os indicadores do seu negócio, conectado às suas fontes de dados.', 99700, 14900, false, 2, 'dashboard', null, true, 160),
  ('mini-sistema', 'Mini Sistema', 'sistemas', 'custom', 'Um sistema enxuto, feito para o seu processo.', 'Cadastros, fluxos e relatórios sob medida para uma operação específica.', 149700, 19900, true, null, 'system', null, true, 170),
  ('crm', 'CRM', 'sistemas', 'custom', 'Funil, contatos e tarefas do jeito que seu comercial trabalha.', 'CRM sob medida com funil visual, histórico de contatos e tarefas.', 149700, 19900, true, null, 'system', null, false, 180),
  ('agendamento', 'Agendamento', 'sistemas', 'custom', 'Agenda online com confirmação e lembretes.', 'Sistema de agendamento com horários, profissionais, confirmações e lembretes.', 149700, 19900, true, null, 'system', null, false, 190),
  ('orcamento', 'Orçamento', 'sistemas', 'custom', 'Orçamentos montados e enviados em minutos.', 'Sistema para montar, enviar e acompanhar orçamentos com a sua tabela de preços.', 149700, 19900, true, null, 'system', null, false, 200),
  ('portal-do-cliente', 'Portal do Cliente', 'sistemas', 'custom', 'Uma área para seus clientes acompanharem tudo.', 'Portal com login onde seus clientes veem pedidos, documentos e status.', 149700, 19900, true, null, 'system', null, false, 210),
  ('area-de-membros', 'Área de Membros', 'sistemas', 'custom', 'Conteúdo exclusivo para quem é assinante.', 'Área restrita com aulas, materiais e controle de acesso.', 149700, 19900, true, null, 'system', null, false, 220),
  ('sistema-de-pedidos', 'Sistema de Pedidos', 'sistemas', 'custom', 'Pedidos recebidos, organizados e acompanhados.', 'Recebimento e gestão de pedidos com status, notificações e relatórios.', 149700, 19900, true, null, 'system', null, false, 230),
  ('mini-saas', 'Mini SaaS', 'sistemas', 'custom', 'Seu produto digital por assinatura.', 'Software com cadastro de clientes, planos e cobrança recorrente.', 199700, 24900, true, null, 'app', null, false, 240),
  ('calculadoras', 'Calculadoras', 'ferramentas', 'custom', 'Simuladores que entregam a resposta e capturam o lead.', 'Calculadoras e simuladores para seu site, com captura de contato no resultado.', null, null, false, null, 'tool', null, false, 250),
  ('geradores-de-pdf', 'Geradores de PDF', 'ferramentas', 'custom', 'Documentos com sua marca, gerados a partir de dados.', 'Propostas, relatórios e certificados gerados automaticamente.', null, null, false, null, 'tool', null, false, 260),
  ('formularios-inteligentes', 'Formulários Inteligentes', 'ferramentas', 'custom', 'Formulários que mudam conforme a resposta.', 'Formulários com lógica condicional, validação e envio para onde você precisa.', null, null, false, null, 'tool', null, false, 270),
  ('catalogos', 'Catálogos', 'ferramentas', 'custom', 'Seus produtos organizados e fáceis de pedir.', 'Catálogo digital com busca, categorias e pedido pelo WhatsApp.', null, null, false, null, 'tool', null, false, 280),
  ('menus-digitais', 'Menus Digitais', 'ferramentas', 'custom', 'Cardápio por QR Code, sempre atualizado.', 'Cardápio digital para restaurantes e cafés, com QR Code e edição rápida.', null, null, false, null, 'tool', null, false, 290),
  ('trackers', 'Trackers', 'ferramentas', 'custom', 'Acompanhamento de pedidos, metas ou hábitos.', 'Ferramentas para acompanhar status e progresso, com visual claro.', null, null, false, null, 'tool', null, false, 300),
  ('pwa', 'PWA', 'apps', 'custom', 'App instalável no celular, sem loja de aplicativos.', 'Aplicativo web progressivo que funciona como app nativo e é instalado direto do navegador.', 199700, 24900, true, null, 'app', null, false, 310),
  ('web-app', 'Web App', 'apps', 'custom', 'Aplicação completa no navegador.', 'Aplicação web com contas, dados e regras de negócio, pronta para crescer.', 199700, 24900, true, null, 'app', null, true, 320),
  ('aplicativos-internos', 'Aplicativos Internos', 'apps', 'custom', 'Ferramentas para sua equipe trabalhar melhor.', 'Apps de uso interno para checklists, inspeções, estoque ou rotinas da operação.', 199700, 24900, true, null, 'app', null, false, 330)
on conflict (slug) do update set
  name = excluded.name, category = excluded.category, tier = excluded.tier, summary = excluded.summary,
  description = excluded.description, setup_price = excluded.setup_price, monthly_price = excluded.monthly_price,
  price_from = excluded.price_from, delivery_days = excluded.delivery_days, preview = excluded.preview,
  external_costs_note = excluded.external_costs_note, featured = excluded.featured, sort_order = excluded.sort_order;

delete from product_features where product_id in (select id from products where slug in ('landing-page', 'pagina-de-vendas', 'site-institucional', 'link-in-bio', 'pagina-de-evento', 'automacao-de-leads', 'automacao-de-email', 'automacao-de-crm', 'integracoes', 'fluxos-personalizados', 'bot-de-atendimento', 'bot-de-whatsapp', 'faq-inteligente', 'qualificador-de-leads', 'ai-assistant', 'dashboard', 'mini-sistema', 'crm', 'agendamento', 'orcamento', 'portal-do-cliente', 'area-de-membros', 'sistema-de-pedidos', 'mini-saas', 'calculadoras', 'geradores-de-pdf', 'formularios-inteligentes', 'catalogos', 'menus-digitais', 'trackers', 'pwa', 'web-app', 'aplicativos-internos'));
insert into product_features (product_id, name)
select p.id, f.name from (values
  ('landing-page', 'Design exclusivo e responsivo'),
  ('landing-page', 'Botão de WhatsApp ou formulário'),
  ('landing-page', 'SEO técnico e Open Graph'),
  ('landing-page', 'Domínio e SSL configurados'),
  ('landing-page', 'Métricas de acesso instaladas'),
  ('pagina-de-vendas', 'Estrutura persuasiva por seções'),
  ('pagina-de-vendas', 'Depoimentos e prova social'),
  ('pagina-de-vendas', 'Integração com seu checkout'),
  ('pagina-de-vendas', 'FAQ e garantia'),
  ('pagina-de-vendas', 'Eventos de conversão configurados'),
  ('site-institucional', 'Até 5 páginas'),
  ('site-institucional', 'SEO por página'),
  ('site-institucional', 'Formulário de contato'),
  ('site-institucional', 'Mapa e dados da empresa'),
  ('site-institucional', 'Painel de métricas'),
  ('link-in-bio', 'Links e destaques ilimitados'),
  ('link-in-bio', 'Identidade da sua marca'),
  ('link-in-bio', 'Métricas de cliques'),
  ('link-in-bio', 'Domínio próprio'),
  ('pagina-de-evento', 'Agenda e palestrantes'),
  ('pagina-de-evento', 'Inscrição ou venda de ingresso'),
  ('pagina-de-evento', 'Contagem regressiva'),
  ('pagina-de-evento', 'Mapa do local'),
  ('automacao-de-leads', 'Captura de formulários e anúncios'),
  ('automacao-de-leads', 'Registro em planilha ou CRM'),
  ('automacao-de-leads', 'Distribuição para a equipe'),
  ('automacao-de-leads', 'Resposta automática'),
  ('automacao-de-email', 'Sequências automáticas'),
  ('automacao-de-email', 'Gatilhos por evento'),
  ('automacao-de-email', 'Modelos com sua marca'),
  ('automacao-de-email', 'Relatório de envios'),
  ('automacao-de-crm', 'Etapas automáticas'),
  ('automacao-de-crm', 'Tarefas e lembretes'),
  ('automacao-de-crm', 'Alertas para a equipe'),
  ('automacao-de-crm', 'Integração com seu CRM'),
  ('integracoes', 'Conexão entre plataformas'),
  ('integracoes', 'Sincronização de dados'),
  ('integracoes', 'Tratamento de erros'),
  ('integracoes', 'Registro de execuções'),
  ('fluxos-personalizados', 'Mapeamento do processo'),
  ('fluxos-personalizados', 'Regras de negócio'),
  ('fluxos-personalizados', 'Múltiplas integrações'),
  ('fluxos-personalizados', 'Monitoramento'),
  ('bot-de-atendimento', 'Treinado com seu conteúdo'),
  ('bot-de-atendimento', 'Encaminhamento para humano'),
  ('bot-de-atendimento', 'Horário de atendimento'),
  ('bot-de-atendimento', 'Histórico de conversas'),
  ('bot-de-whatsapp', 'API oficial do WhatsApp'),
  ('bot-de-whatsapp', 'Menu e respostas automáticas'),
  ('bot-de-whatsapp', 'Encaminhamento para a equipe'),
  ('bot-de-whatsapp', 'Relatório de atendimentos'),
  ('faq-inteligente', 'Base de perguntas e respostas'),
  ('faq-inteligente', 'Busca por linguagem natural'),
  ('faq-inteligente', 'Atualização simples'),
  ('faq-inteligente', 'Métricas de dúvidas'),
  ('qualificador-de-leads', 'Roteiro de qualificação'),
  ('qualificador-de-leads', 'Pontuação de leads'),
  ('qualificador-de-leads', 'Envio ao comercial'),
  ('qualificador-de-leads', 'Registro no CRM'),
  ('ai-assistant', 'Base de conhecimento própria'),
  ('ai-assistant', 'Integração com seus sistemas'),
  ('ai-assistant', 'Controle de acesso'),
  ('ai-assistant', 'Registro de uso'),
  ('dashboard', 'Indicadores principais'),
  ('dashboard', 'Gráficos e filtros'),
  ('dashboard', 'Conexão com suas fontes'),
  ('dashboard', 'Acesso por usuário'),
  ('mini-sistema', 'Cadastros sob medida'),
  ('mini-sistema', 'Fluxos e permissões'),
  ('mini-sistema', 'Relatórios'),
  ('mini-sistema', 'Acesso por usuário'),
  ('crm', 'Funil visual'),
  ('crm', 'Histórico de contatos'),
  ('crm', 'Tarefas e lembretes'),
  ('crm', 'Relatórios de vendas'),
  ('agendamento', 'Agenda por profissional'),
  ('agendamento', 'Confirmação automática'),
  ('agendamento', 'Lembretes'),
  ('agendamento', 'Painel administrativo'),
  ('orcamento', 'Tabela de preços'),
  ('orcamento', 'PDF com sua marca'),
  ('orcamento', 'Envio e aprovação'),
  ('orcamento', 'Histórico'),
  ('portal-do-cliente', 'Login de clientes'),
  ('portal-do-cliente', 'Documentos e arquivos'),
  ('portal-do-cliente', 'Status de pedidos'),
  ('portal-do-cliente', 'Mensagens'),
  ('area-de-membros', 'Controle de acesso'),
  ('area-de-membros', 'Aulas e materiais'),
  ('area-de-membros', 'Progresso do aluno'),
  ('area-de-membros', 'Integração com pagamento'),
  ('sistema-de-pedidos', 'Recebimento de pedidos'),
  ('sistema-de-pedidos', 'Status e notificações'),
  ('sistema-de-pedidos', 'Gestão de estoque simples'),
  ('sistema-de-pedidos', 'Relatórios'),
  ('mini-saas', 'Cadastro e login'),
  ('mini-saas', 'Planos e assinaturas'),
  ('mini-saas', 'Painel do cliente'),
  ('mini-saas', 'Painel administrativo'),
  ('calculadoras', 'Fórmulas do seu negócio'),
  ('calculadoras', 'Resultado visual'),
  ('calculadoras', 'Captura de lead'),
  ('calculadoras', 'Incorporável no site'),
  ('geradores-de-pdf', 'Modelos com sua marca'),
  ('geradores-de-pdf', 'Dados dinâmicos'),
  ('geradores-de-pdf', 'Download e envio'),
  ('geradores-de-pdf', 'Histórico'),
  ('formularios-inteligentes', 'Lógica condicional'),
  ('formularios-inteligentes', 'Validação de dados'),
  ('formularios-inteligentes', 'Envio para planilha ou CRM'),
  ('formularios-inteligentes', 'Notificações'),
  ('catalogos', 'Categorias e busca'),
  ('catalogos', 'Fotos e preços'),
  ('catalogos', 'Pedido pelo WhatsApp'),
  ('catalogos', 'Atualização simples'),
  ('menus-digitais', 'QR Code por mesa'),
  ('menus-digitais', 'Fotos e descrições'),
  ('menus-digitais', 'Edição rápida de preços'),
  ('menus-digitais', 'Itens esgotados'),
  ('trackers', 'Status em tempo real'),
  ('trackers', 'Linha do tempo'),
  ('trackers', 'Notificações'),
  ('trackers', 'Link compartilhável'),
  ('pwa', 'Instalável no celular'),
  ('pwa', 'Funciona offline'),
  ('pwa', 'Notificações'),
  ('pwa', 'Atualização instantânea'),
  ('web-app', 'Contas e permissões'),
  ('web-app', 'Banco de dados'),
  ('web-app', 'Painel administrativo'),
  ('web-app', 'Infraestrutura escalável'),
  ('aplicativos-internos', 'Uso no celular ou desktop'),
  ('aplicativos-internos', 'Login da equipe'),
  ('aplicativos-internos', 'Relatórios'),
  ('aplicativos-internos', 'Funciona offline')
) as f(slug, name) join products p on p.slug = f.slug;

