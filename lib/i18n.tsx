"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"

export type Language = "pt" | "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Navigation
    "nav.services": "Soluções",
    "nav.gdc": "Plataforma GDC",
    "nav.contact": "Fale Conosco",
    "nav.button": "Acelerar Negócio",

    // Hero Section
    "hero.badge": "✦ Infraestrutura Digital de Elite",
    "hero.title1": "Código premium. Sistemas de elite.",
    "hero.title2": "Aceleramos sua",
    "hero.title3": "operação digital com",
    "hero.title4": "precisão de engenharia.",
    "hero.subtitle": "Desenhamos sites premium de altíssima conversão, desenvolvemos sistemas personalizados sob medida e criamos assistentes com IA integrados ao seu ecossistema.",
    "manifesto.text": "Desenvolvemos códigos rápidos, arquiteturas indestrutíveis e sistemas sob medida para marcas que exigem liderança e performance absoluta no digital.",
    "hero.cta": "Agendar Diagnóstico Gratuito",
    "hero.view_services": "Conhecer Soluções",
    "hero.stats.sites": "projetos de alto impacto",
    "hero.stats.satisfaction": "taxa de retenção de marcas",
    "hero.stats.time": "tempo de carregamento médio",

    // GDC Section (Proprietary Platform)
    "gdc.exclusive": "Tecnologia Proprietária",
    "gdc.title": "GDC. A central de comando inteligente da sua empresa.",
    "gdc.description": "Nossa plataforma exclusiva integra gestão de clientes, controle financeiro automatizado, dashboards em tempo real e inteligência artificial — tudo sob o mesmo ecossistema robusto.",
    "gdc.cta": "Conhecer o Ecossistema GDC",
    "gdc.feature1.title": "CRM & Operação Centralizada",
    "gdc.feature1.desc": "Histórico completo e agendamentos.",
    "gdc.feature2.title": "Financeiro Automatizado",
    "gdc.feature2.desc": "Contas a pagar/receber e comissões.",
    "gdc.feature3.title": "Business Intelligence",
    "gdc.feature3.desc": "Métricas de faturamento e ticket médio.",
    "gdc.feature4.title": "ViraBot IA Integrado",
    "gdc.feature4.desc": "Análise operacional ativa 24/7.",
    "gdc.f1.title": "CRM Operacional",
    "gdc.f1.desc": "Cadastre clientes, vincule prontuários, registre o histórico de atendimentos e coordene a escala de sua equipe de maneira integrada.",
    "gdc.f2.title": "Automação Financeira",
    "gdc.f2.desc": "Monitore fluxo de caixa, parcelamentos de vendas, recorrências e distribuições de comissões sem planilhas ou erros manuais.",
    "gdc.f3.title": "Dashboards de Métricas",
    "gdc.f3.desc": "Visualizações analíticas em tempo real de receita recorrente (MRR), faturamento líquido, taxa de retenção (LTV) e ticket médio.",
    "gdc.f4.title": "Importação Inteligente",
    "gdc.f4.desc": "Nossa IA exclusiva importa PDFs de notas fiscais e planilhas antigas estruturando os dados no novo banco em segundos.",
    "gdc.f5.title": "Assistente ViraBot IA",
    "gdc.f5.desc": "Um agente cognitivo integrado ao painel para rodar análises de comportamento de vendas, estimar faturamento e sugerir melhorias.",
    "gdc.f6.title": "Módulo de Permissões",
    "gdc.f6.desc": "Controle granular de acesso por tela. Cada colaborador visualiza apenas o necessário para sua rotina, garantindo total segurança.",
    "gdc.features.badge": "Infraestrutura Integrada",
    "gdc.features.desc": "O GDC não é apenas um painel administrativo — é a espinha dorsal de sua operação de negócios, unindo o digital às finanças em tempo real.",

    // Services Section
    "services.creation": "Desenvolvimento Premium",
    "services.traffic": "Sistemas Personalizados",
    "services.assistant": "Automação & IA WhatsApp",
    "services.gmn": "SEO Local & Google Maps",
    "services.badge": "Nossas Verticais",
    "services.title1": "Engenharia de software e marketing",
    "services.title2": "alinhados para",
    "services.title3": "gerar receita previsível.",
    "services.subtitle": "Unimos alta performance técnica com estratégias de conversão cirúrgicas para construir canais de vendas eficientes.",
    "services.creation.desc": "Sites rápidos e modernos focados na experiência do usuário. Código limpo, SEO técnico nativo de ponta e painel administrativo intuitivo.",
    "services.traffic.desc": "Desenvolvimento de softwares e plataformas sob medida. ERPs, CRMs, ferramentas internas e integrações de sistemas de alta complexidade.",
    "services.assistant.desc": "Implantação de agentes de inteligência artificial personalizados no WhatsApp para captação de leads, agendamento de reuniões e suporte 24h.",
    "services.gmn.desc": "Posicionamento estratégico no Google Maps para dominar buscas locais. Aumente significativamente chamadas e visitas de clientes prontos para comprar.",
    "services.cta": "Falar com Engenheiro de Software",

    // Stats Section
    "stats.conversions": "Aumento médio em conversão",
    "stats.off": "Bonificação em setup inicial",
    "stats.exp": "Anos desenvolvendo software",
    "stats.satisfaction": "Taxa de retenção e sucesso",

    // CTA Section
    "cta.badge": "Aceleração Imediata",
    "cta.title1": "Pronto para profissionalizar sua",
    "cta.title2": "arquitetura digital",
    "cta.title3": "e vender em escala?",
    "cta.subtitle": "Agende uma sessão estratégica rápida de 15 minutos com nosso time técnico. Analisamos suas necessidades de software e automação sem custo.",
    "cta.button": "Solicitar Sessão Estratégica",
    "cta.or_services": "ou fale conosco direto pelo WhatsApp",
    "cta.clients": "+50 negócios escalados no digital",
    "cta.clients_desc": "Empresas de serviços, SaaS e clínicas locais que saíram do amadorismo digital para a escala controlada.",

    // Why Us Section
    "why.badge": "Por que a ViraWeb",
    "why.title": "Menos achismo. Mais engenharia.",
    "why.title2": "Desenvolvido para máxima escala.",
    "why.subtitle": "Construímos pontes entre ideias e infraestruturas digitais eficientes que não quebram ao receber grandes volumes de dados.",
    "why.f1.title": "Performance Excepcional (Core Web Vitals)",
    "why.f1.desc": "Nossas páginas e sistemas carregam em menos de 1.5 segundo. Isso garante eficiência operacional e melhora a experiência de uso.",
    "why.f2.title": "Métricas Analíticas Rigorosas",
    "why.f2.desc": "Tagging e banco de dados integrados de forma robusta. Monitore a saúde da sua empresa de ponta a ponta com dashboards analíticos automatizados.",
    "why.f3.title": "Arquitetura Escalável & Headless",
    "why.f3.desc": "Utilizamos stacks modernos que permitem que seu site seja expandido para um aplicativo ou e-commerce sem precisar refazer tudo do zero.",
    "why.f4.title": "Engenharia de Suporte Ágil",
    "why.f4.desc": "Atendimento técnico direto por desenvolvedores. Entendemos a criticidade de sua operação e resolvemos incidentes em tempo recorde.",

    // Verticals/Industry Section
    "industry.badge": "Indústrias",
    "industry.title": "Soluções adaptadas a",
    "industry.title2": "setores competitivos.",
    "industry.i1.title": "Clínicas & Profissionais de Saúde",
    "industry.i1.desc": "Funil de agendamento automático, posicionamento local e captação de pacientes de alto valor.",
    "industry.i2.title": "Empresas de Tecnologia & SaaS",
    "industry.i2.desc": "Landing pages técnicas, fluxos de nutrição, integração com CRM e analytics de produto integrados.",
    "industry.i3.title": "Empresas de Serviços B2B",
    "industry.i3.desc": "Posicionamento premium de autoridade, qualificação automática de leads e canais de prospecção integrados.",
    "industry.i4.title": "Negócios Locais & PMEs",
    "industry.i4.desc": "Dominância nas buscas locais, automações de atendimento no WhatsApp e gestão centralizada no GDC.",

    // Footer
    "footer.description": "Infraestrutura de tecnologia e marketing focada na escala sustentável e previsibilidade de receitas para empresas modernas.",
    "footer.services": "Nossas Soluções",
    "footer.company": "Ecossistema",
    "footer.contact": "Contato Direto",
    "footer.cta": "Iniciar Conversa no WhatsApp",
    "footer.rights": "Todos os direitos reservados. ViraWeb Tecnologia.",
    "footer.made_with": "Construído com",
    "footer.by": "pela Engenharia ViraWeb",

    // Pricing
    "pricing.badge": "Tabela de Investimento",
    "pricing.title": "Planos transparentes para sua escala.",
    "pricing.subtitle": "Escolha a infraestrutura ideal para o momento do seu negócio. Sem letras miúdas.",
    "pricing.billing.monthly": "Mensal",
    "pricing.billing.annual": "Anual",
    "pricing.save": "Economize 20%",
    "pricing.plan.landing.title": "Landing Page Elite",
    "pricing.plan.landing.price": "1.200",
    "pricing.plan.landing.price.annual": "960",
    "pricing.plan.landing.desc": "Perfeito para presença digital focada em conversão imediata de serviços.",
    "pricing.plan.website.title": "Website Premium",
    "pricing.plan.website.price": "2.400",
    "pricing.plan.website.price.annual": "1.920",
    "pricing.plan.website.desc": "A estrutura ideal para empresas B2B, clínicas e marcas que exigem autoridade máxima.",
    "pricing.plan.platform.title": "Plataforma Custom",
    "pricing.plan.platform.price": "Sob Consulta",
    "pricing.plan.platform.desc": "Sistemas complexos, dashboards integrados, SaaS e integrações avançadas de banco de dados.",
    "pricing.cta.start": "Iniciar Projeto",
    "pricing.cta.contact": "Falar com Arquiteto",
    "pricing.period.monthly": "/mês",
    "pricing.period.annual": "/mês (faturamento anual)",

    // Process
    "process.badge": "Engenharia de Execução",
    "process.title": "Como construímos sua operação.",
    "process.subtitle": "Um fluxo previsível e sem fricção. Da análise estratégica à escala digital.",
    "process.step1.num": "01",
    "process.step1.title": "Diagnóstico & Alinhamento",
    "process.step1.desc": "Analisamos seus funis, campanhas atuais e gargalos operacionais para desenhar o escopo cirúrgico.",
    "process.step2.num": "02",
    "process.step2.title": "Arquitetura & Design",
    "process.step2.desc": "Desenhamos a interface de alta conversão sob o padrão visual premium ViraWeb, validando a navegação.",
    "process.step3.num": "03",
    "process.step3.title": "Engenharia de Código",
    "process.step3.desc": "Desenvolvimento limpo, SEO técnico nativo, integrações de CRM, bots e configuração de tags de conversão.",
    "process.step4.num": "04",
    "process.step4.title": "Integração & Escala",
    "process.step4.desc": "Configuração de servidores, bancos de dados, conexões de APIs e treinamento da equipe para início de uso do sistema.",

    // FAQ
    "faq.badge": "Perguntas Frequentes",
    "faq.title": "Dúvidas respondidas.",
    "faq.subtitle": "Tudo o que você precisa saber sobre o nosso ecossistema e entrega técnica.",
    "faq.q1": "O site será meu? Terei acesso ao código?",
    "faq.a1": "Sim, 100% seu. Após o desenvolvimento, você tem propriedade total sobre o domínio, o código-fonte e as chaves de acesso. ",
    "faq.q2": "Como funciona o desenvolvimento de sistemas personalizados?",
    "faq.a2": "Mapeamos os processos manuais da sua empresa e criamos um software sob medida (como ERP, CRM ou ferramenta interna) totalmente integrado às APIs e bancos de dados que você já utiliza, eliminando erros operacionais.",
    "faq.q3": "O que é a plataforma GDC exclusiva?",
    "faq.a3": "O GDC é nosso centro de comando proprietário. Em vez de contratar múltiplos softwares caros (CRM, financeiro, chatbot), nós integramos tudo em um único ecossistema personalizado para rodar sua empresa sem planilhas.",
    "faq.q4": "Qual o tempo médio de desenvolvimento de um site premium?",
    "faq.a4": "Depende da complexidade, mas landing pages de elite costumam ser entregues em 10 a 15 dias úteis, e portais mais complexos/institucionais entre 20 a 30 dias úteis, com acompanhamento ativo.",

    // Testimonials
    "testimonials.badge": "Depoimentos Reais",
    "testimonials.title": "Quem confia na nossa engenharia.",
    "testimonials.subtitle": "Veja relatos de marcas, clínicas e SaaS que escalaram suas operações com a ViraWeb."
  },
  en: {
    // Navigation
    "nav.services": "Solutions",
    "nav.gdc": "GDC Platform",
    "nav.contact": "Contact Us",
    "nav.button": "Accelerate Business",

    // Hero Section
    "hero.badge": "✦ Elite Digital Infrastructure",
    "hero.title1": "Premium code. Elite systems.",
    "hero.title2": "We scale your",
    "hero.title3": "digital operation with",
    "hero.title4": "engineering precision.",
    "hero.subtitle": "We design high-converting premium websites, develop custom software systems, and deploy AI assistants integrated into your ecosystem.",
    "manifesto.text": "We develop fast code, indestructible architectures, and tailor-made systems for brands that demand leadership and absolute performance in the digital space.",
    "hero.cta": "Book Free Diagnosis",
    "hero.view_services": "Explore Solutions",
    "hero.stats.sites": "high-impact projects",
    "hero.stats.satisfaction": "brand retention rate",
    "hero.stats.time": "average loading speed",

    // GDC Section
    "gdc.exclusive": "Proprietary Tech",
    "gdc.title": "GDC. The intelligent command center for your business.",
    "gdc.description": "Our exclusive platform integrates lead management, automated financial control, real-time dashboards, and AI agents under a single robust ecosystem.",
    "gdc.cta": "Explore GDC Ecosystem",
    "gdc.feature1.title": "Sleek CRM & Operations",
    "gdc.feature1.desc": "Complete customer log and scheduling.",
    "gdc.feature2.title": "Automated Billing",
    "gdc.feature2.desc": "Invoices, accounts, and commissions.",
    "gdc.feature3.title": "Business Intelligence",
    "gdc.feature3.desc": "Revenue metrics and average tickets.",
    "gdc.feature4.title": "ViraBot AI Embedded",
    "gdc.feature4.desc": "24/7 active operational analysis.",
    "gdc.f1.title": "Operational CRM",
    "gdc.f1.desc": "Register clients, link technical logs, track full customer interactions, and schedule team assignments in a unified workspace.",
    "gdc.f2.title": "Financial Automation",
    "gdc.f2.desc": "Monitor cash flow, handle invoice installments, process subscriptions, and distribute sales commissions automatically without spreadsheets.",
    "gdc.f3.title": "Metrics Dashboard",
    "gdc.f3.desc": "Real-time analytics for monthly recurring revenue (MRR), net billing, lifetime value (LTV), and average sales ticket.",
    "gdc.f4.title": "Smart AI Import",
    "gdc.f4.desc": "Our exclusive AI scans and structures data from complex PDFs, old tables, and invoices into your new database in seconds.",
    "gdc.f5.title": "ViraBot AI Assistant",
    "gdc.f5.desc": "A cognitive agent embedded in your dashboard that parses sales trends, forecasts revenue, and suggests business optimizations.",
    "gdc.f6.title": "Permission Levels",
    "gdc.f6.desc": "Granular dashboard access settings. Team members only view data relevant to their specific role, ensuring top security.",
    "gdc.features.badge": "Integrated Infrastructure",
    "gdc.features.desc": "GDC is not just an administrative dashboard — it is the operational spine of your business, connecting technology to finance in real time.",

    // Services Section
    "services.creation": "Premium Development",
    "services.traffic": "Custom Systems",
    "services.assistant": "Automation & WhatsApp AI",
    "services.gmn": "Local SEO & Google Maps",
    "services.badge": "Our Verticals",
    "services.title1": "Software engineering and marketing",
    "services.title2": "aligned to",
    "services.title3": "generate predictable revenue.",
    "services.subtitle": "We unify technical performance with surgical conversion strategies to build efficient client acquisition pipelines.",
    "services.creation.desc": "Fast, modern web apps optimized for user experience. Clean code, top technical SEO, and intuitive CMS control.",
    "services.traffic.desc": "Tailor-made software and platform development. ERPs, CRMs, internal tools, and complex system integrations.",
    "services.assistant.desc": "Custom conversational AI agents integrated with WhatsApp to capture leads, schedule meetings, and answer queries 24/7.",
    "services.gmn.desc": "Dominating local search results on Google Maps. Significantly grow business phone calls, directions, and visits from qualified buyers.",
    "services.cta": "Talk to a Software Engineer",

    // Stats Section
    "stats.conversions": "Average increase in conversions",
    "stats.off": "Bonified setup in first month",
    "stats.exp": "Years developing software",
    "stats.satisfaction": "Retention and success rate",

    // CTA Section
    "cta.badge": "Immediate Acceleration",
    "cta.title1": "Ready to professionalize your",
    "cta.title2": "digital architecture",
    "cta.title3": "and scale sales?",
    "cta.subtitle": "Schedule a brief 15-minute strategical session with our technical team. We will analyze your software and automation needs for free.",
    "cta.button": "Request Strategic Session",
    "cta.or_services": "or reach us directly via WhatsApp",
    "cta.clients": "+50 businesses scaled online",
    "cta.clients_desc": "Service companies, SaaS platforms, and local clinics that went from digital amateurs to highly controlled scale.",

    // Why Us Section
    "why.badge": "Why ViraWeb",
    "why.title": "Less guessing. More engineering.",
    "why.title2": "Engineered for maximum scale.",
    "why.subtitle": "We bridge ideas with efficient digital systems that do not break under high data volumes.",
    "why.f1.title": "Speed Performance (Core Web Vitals)",
    "why.f1.desc": "Our pages and systems load under 1.5 seconds. This boosts operational efficiency and user experience.",
    "why.f2.title": "Rigorous Analytics Integration",
    "why.f2.desc": "Robust integration of databases and tagging. Monitor your business health end-to-end with automated analytical dashboards.",
    "why.f3.title": "Modular & Headless Architectures",
    "why.f3.desc": "Decoupled frontend stacks. Easily scale your website into a mobile app or custom portal without rewriting your foundation.",
    "why.f4.title": "Direct Engineering Support",
    "why.f4.desc": "Work directly with the system engineers. We value your business uptime and resolve tickets in record time.",

    // Industry/Verticals
    "industry.badge": "Industries",
    "industry.title": "Tailored technology for",
    "industry.title2": "competitive sectors.",
    "industry.i1.title": "Clinics & Healthcare",
    "industry.i1.desc": "Automatic booking funnels, local dominance, and premium private client acquisition.",
    "industry.i2.title": "Tech & SaaS Companies",
    "industry.i2.desc": "Conversion-focused landing pages, product analytics tracking, and CRM integrations.",
    "industry.i3.title": "B2B Service Providers",
    "industry.i3.desc": "Premium authority portfolio, automatic lead qualification, and cold lead pipelines.",
    "industry.i4.title": "Local Businesses & SMBs",
    "industry.i4.desc": "Google Maps optimization, automated WhatsApp funnels, and centralized operations on GDC.",

    // Footer
    "footer.description": "Modern software engineering and marketing infrastructure designed to generate sustainable growth and predictable revenue.",
    "footer.services": "Our Solutions",
    "footer.company": "Ecosystem",
    "footer.contact": "Direct Support",
    "footer.cta": "Start WhatsApp Chat",
    "footer.rights": "All rights reserved. ViraWeb Technology.",
    "footer.made_with": "Built with",
    "footer.by": "by ViraWeb Engineering",

    // Pricing
    "pricing.badge": "Investment Sheet",
    "pricing.title": "Transparent plans for your scale.",
    "pricing.subtitle": "Choose the ideal infrastructure for your business's current moment. No fine print.",
    "pricing.billing.monthly": "Monthly",
    "pricing.billing.annual": "Annual",
    "pricing.save": "Save 20%",
    "pricing.plan.landing.title": "Elite Landing Page",
    "pricing.plan.landing.price": "240",
    "pricing.plan.landing.price.annual": "190",
    "pricing.plan.landing.desc": "Perfect for digital presence focused on immediate conversion of services.",
    "pricing.plan.website.title": "Premium Website",
    "pricing.plan.website.price": "480",
    "pricing.plan.website.price.annual": "380",
    "pricing.plan.website.desc": "The ideal structure for B2B companies, clinics, and brands requiring maximum authority.",
    "pricing.plan.platform.title": "Custom Platform",
    "pricing.plan.platform.price": "On Request",
    "pricing.plan.platform.desc": "Complex systems, integrated dashboards, SaaS, and advanced database integrations.",
    "pricing.cta.start": "Start Project",
    "pricing.cta.contact": "Talk to Architect",
    "pricing.period.monthly": "/mo",
    "pricing.period.annual": "/mo (billed annually)",

    // Process
    "process.badge": "Execution Engineering",
    "process.title": "How we build your operation.",
    "process.subtitle": "A predictable and frictionless flow. From strategic analysis to digital scale.",
    "process.step1.num": "01",
    "process.step1.title": "Diagnosis & Alignment",
    "process.step1.desc": "We analyze your funnels, current campaigns, and operational bottlenecks to design a surgical scope.",
    "process.step2.num": "02",
    "process.step2.title": "Architecture & Design",
    "process.step2.desc": "We design high-converting interfaces under ViraWeb's premium visual standard, validating navigation.",
    "process.step3.num": "03",
    "process.step3.title": "Code Engineering",
    "process.step3.desc": "Clean development, native technical SEO, CRM integrations, bots, and conversion tag configurations.",
    "process.step4.num": "04",
    "process.step4.title": "Integration & Scale",
    "process.step4.desc": "Setup of servers, databases, API integrations, and team onboarding to start using the system.",

    // FAQ
    "faq.badge": "Frequently Asked Questions",
    "faq.title": "Questions answered.",
    "faq.subtitle": "Everything you need to know about our ecosystem and technical delivery.",
    "faq.q1": "Will the website be mine? Will I have access to the code?",
    "faq.a1": "Yes, 100% yours. After development, you have full ownership of the domain, source code, and access keys. Plus, we create intuitive CMS panels so you can edit text without relying on us.",
    "faq.q2": "How does custom systems development work?",
    "faq.a2": "We map your business's manual processes and create tailor-made software (such as an ERP, CRM, or internal tool) fully integrated with the APIs and databases you already use, eliminating operational errors.",
    "faq.q3": "What is the exclusive GDC platform?",
    "faq.a3": "GDC is our proprietary command center. Instead of hiring multiple expensive tools (CRM, billing, invoice importer, chatbot), we integrate everything into a single custom ecosystem to run your company without spreadsheets.",
    "faq.q4": "What is the average development time for a premium site?",
    "faq.a4": "It depends on complexity, but elite landing pages are usually delivered in 10 to 15 business days, and more complex corporate portals in 20 to 30 business days, with active support.",

    // Testimonials
    "testimonials.badge": "Real Testimonials",
    "testimonials.title": "Who trusts our engineering.",
    "testimonials.subtitle": "See reports from brands, clinics, and SaaS that scaled their operations with ViraWeb."
  },
  es: {
    // Navigation
    "nav.services": "Soluciones",
    "nav.gdc": "Plataforma GDC",
    "nav.contact": "Contacto",
    "nav.button": "Acelerar Negocio",

    // Hero Section
    "hero.badge": "✦ Infraestrutura Digital de Élite",
    "hero.title1": "Código premium. Sistemas de élite.",
    "hero.title2": "Aceleramos su",
    "hero.title3": "operación digital con",
    "hero.title4": "precisión de ingeniería.",
    "hero.subtitle": "Diseñamos sitios premium de altísima conversión, desarrollamos sistemas personalizados a medida y creamos asistentes con IA integrados a su ecosistema.",
    "manifesto.text": "Desarrollamos códigos rápidos, arquitecturas indestructibles y sistemas a la medida para marcas que exigen liderazgo y rendimiento absoluto en el ámbito digital.",
    "hero.cta": "Agendar Diagnóstico Gratis",
    "hero.view_services": "Conocer Soluciones",
    "hero.stats.sites": "proyectos de alto impacto",
    "hero.stats.satisfaction": "tasa de retención de marcas",
    "hero.stats.time": "tiempo medio de carga",

    // GDC Section
    "gdc.exclusive": "Tecnología Propietaria",
    "gdc.title": "GDC. El centro de mando inteligente de su empresa.",
    "gdc.description": "Nuestra plataforma exclusiva integra gestión de clientes, control financiero automatizado, dashboards en tempo real e inteligencia artificial — todo bajo el mismo ecosistema robusto.",
    "gdc.cta": "Conocer el Ecosistema GDC",
    "gdc.feature1.title": "CRM y Operación Centralizada",
    "gdc.feature1.desc": "Historial de clientes y agendamientos en vivo.",
    "gdc.feature2.title": "Facturación Automática",
    "gdc.feature2.desc": "Cuentas, flujos y comisiones sin errores.",
    "gdc.feature3.title": "Business Intelligence",
    "gdc.feature3.desc": "Métricas de facturación y ticket medio.",
    "gdc.feature4.title": "ViraBot IA Integrado",
    "gdc.feature4.desc": "Análisis operativo activo 24/7.",
    "gdc.f1.title": "CRM Operacional",
    "gdc.f1.desc": "Registre clientes, vincule historiales técnicos, realice el seguimiento completo de interacciones y coordine la agenda de su equipo en un panel unificado.",
    "gdc.f2.title": "Automatización Financiera",
    "gdc.f2.desc": "Monitoree flujos de caja, parcelamiento de ventas, pagos recurrentes y comisiones sin necesidad de planillas complejas o propensas a errores.",
    "gdc.f3.title": "Dashboard de Métricas",
    "gdc.f3.desc": "Visualizaciones analíticas en tiempo real de ingresos recurrentes (MRR), facturación neta, tasa de retención (LTV) y ticket promedio por venta.",
    "gdc.f4.title": "Importação Inteligente",
    "gdc.f4.desc": "Nuestra inteligencia artificial importa archivos complejos de facturas y planillas estructurando los datos en segundos.",
    "gdc.f5.title": "Asistente ViraBot IA",
    "gdc.f5.desc": "Un agente cognitivo integrado en el panel que analiza tendencias de ventas, pronostica cobros y sugiere mejoras operativas.",
    "gdc.f6.title": "Niveles de Permisos",
    "gdc.f6.desc": "Control granular de acceso por pantalla. Cada colaborador visualiza únicamente los datos necesarios para su rol diario.",
    "gdc.features.badge": "Infraestructura Integrada",
    "gdc.features.desc": "El GDC no es solo un panel administrativo — es la columna vertebral de su operación comercial, uniendo la tecnología con las finanzas en tiempo real.",

    // Services Section
    "services.creation": "Desarrollo Premium",
    "services.traffic": "Sistemas Personalizados",
    "services.assistant": "Automatización e IA WhatsApp",
    "services.gmn": "SEO Local y Google Maps",
    "services.badge": "Soluciones Técnicas",
    "services.title1": "Ingeniería de software y marketing",
    "services.title2": "alineados para",
    "services.title3": "generar ingresos previsibles.",
    "services.subtitle": "Unimos alto rendimiento técnico con estrategias de conversión quirúrgicas para construir canales de ventas eficientes.",
    "services.creation.desc": "Sitios rápidos y modernos enfocados en la experiencia de usuario. Código limpio, SEO técnico nativo de punta y panel administrativo intuitivo.",
    "services.traffic.desc": "Desarrollo de software y plataformas a la medida. ERPs, CRMs, herramientas internas e integraciones de sistemas complejos.",
    "services.assistant.desc": "Implementación de agentes de IA personalizados en WhatsApp para captar clientes potenciales, agendar reuniones y dar soporte 24h.",
    "services.gmn.desc": "Posicionamiento estratégico en Google Maps para dominar búsquedas locales. Aumente llamadas y visitas de compradores listos para comprar.",
    "services.cta": "Hablar con un Ingeniero de Software",

    // Stats Section
    "stats.conversions": "Aumento promedio en conversiones",
    "stats.off": "Bonificación en configuración inicial",
    "stats.exp": "Años desarrollando software",
    "stats.satisfaction": "Tasa de retención y éxito",

    // CTA Section
    "cta.badge": "Aceleración Inmediata",
    "cta.title1": "Listo para profesionalizar su",
    "cta.title2": "arquitectura digital",
    "cta.title3": "y vender en escala?",
    "cta.subtitle": "Agende una breve sesión estratégica de 15 minutos con nuestro equipo técnico. Analizaremos sus necesidades de software y automatización sin costo.",
    "cta.button": "Solicitar Sesión Estratégica",
    "cta.or_services": "o hable directamente con nosotros vía WhatsApp",
    "cta.clients": "+50 negocios escalados en el medio digital",
    "cta.clients_desc": "Empresas de servicios, SaaS y clínicas locales que pasaron del amateurismo digital a la escala controlada.",

    // Why Us Section
    "why.badge": "Por qué ViraWeb",
    "why.title": "Menos suposiciones. Más ingeniería.",
    "why.title2": "Desarrollado para máxima escala.",
    "why.subtitle": "Construimos puentes entre ideas e infraestructuras digitales eficientes que no se rompen ante grandes volúmenes de datos.",
    "why.f1.title": "Rendimiento Excepcional (Core Web Vitals)",
    "why.f1.desc": "Nuestras páginas y sistemas cargan en menos de 1.5 segundos. Esto garantiza la eficiencia operativa y mejora la experiencia de uso.",
    "why.f2.title": "Métricas Analíticas Rigorosas",
    "why.f2.desc": "Integración robusta de bases de datos y etiquetado. Monitoree la salud de su negocio de extremo a extremo con paneles analíticos automatizados.",
    "why.f3.title": "Arquitectura Modular y Headless",
    "why.f3.desc": "Usamos stacks modernos que permiten expandir su sitio web hacia una aplicación móvil o sistema personalizado sin tener que reescribir la base.",
    "why.f4.title": "Soporte Técnico Directo (Sin Robots)",
    "why.f4.desc": "Hable directamente con los desarrolladores responsables de su proyecto. Resolución ágil alineada con la urgencia de su operación.",

    // Verticals
    "industry.badge": "Sectores",
    "industry.title": "Tecnología a la medida para",
    "industry.title2": "sectores competitivos.",
    "industry.i1.title": "Clínicas y Profesionales de Salud",
    "industry.i1.desc": "Embudo de agendamiento automático, posicionamiento local y captación de pacientes premium.",
    "industry.i2.title": "Empresas de Tecnología y SaaS",
    "industry.i2.desc": "Páginas de aterrizaje de alta conversión, analítica de producto e integración con CRM.",
    "industry.i3.title": "Proveedores de Servicios B2B",
    "industry.i3.desc": "Posicionamiento premium de autoridad, calificación automática de leads y canales de prospección.",
    "industry.i4.title": "Negócios Locales y Pymes",
    "industry.i4.desc": "Optimización de Google Maps, embudos de WhatsApp automatizados y gestión en GDC.",

    // Footer
    "footer.description": "Infraestructura de tecnología y marketing enfocada en el crecimiento sostenible y previsibilidad de ingresos para empresas modernas.",
    "footer.services": "Nuestras Soluciones",
    "footer.company": "Ecosistema",
    "footer.contact": "Soporte Directo",
    "footer.cta": "Iniciar Conversación en WhatsApp",
    "footer.rights": "Todos los derechos reservados. ViraWeb Tecnología.",
    "footer.made_with": "Construído con",
    "footer.by": "por la Ingeniería ViraWeb",

    // Pricing
    "pricing.badge": "Tabla de Inversión",
    "pricing.title": "Planes transparentes para su escala.",
    "pricing.subtitle": "Elija la infraestructura ideal para el momento de su negocio. Sin letra pequeña.",
    "pricing.billing.monthly": "Mensual",
    "pricing.billing.annual": "Anual",
    "pricing.save": "Ahorre 20%",
    "pricing.plan.landing.title": "Landing Page Elite",
    "pricing.plan.landing.price": "220",
    "pricing.plan.landing.price.annual": "175",
    "pricing.plan.landing.desc": "Perfecto para presencia digital enfocada en la conversión inmediata de servicios.",
    "pricing.plan.website.title": "Sitio Web Premium",
    "pricing.plan.website.price": "440",
    "pricing.plan.website.price.annual": "350",
    "pricing.plan.website.desc": "La estructura ideal para empresas B2B, clínicas y marcas que exigen máxima autoridad.",
    "pricing.plan.platform.title": "Plataforma Custom",
    "pricing.plan.platform.price": "Bajo Consulta",
    "pricing.plan.platform.desc": "Sistemas complejos, dashboards integrados, SaaS e integraciones avanzadas de bases de datos.",
    "pricing.cta.start": "Iniciar Proyecto",
    "pricing.cta.contact": "Hablar con Arquitecto",
    "pricing.period.monthly": "/mes",
    "pricing.period.annual": "/mes (facturación anual)",

    // Process
    "process.badge": "Ingeniería de Ejecución",
    "process.title": "Cómo construimos su operación.",
    "process.subtitle": "Un flujo predecible y sin fricciones. Del análisis estratégico a la escala digital.",
    "process.step1.num": "01",
    "process.step1.title": "Diagnóstico & Alineamiento",
    "process.step1.desc": "Analizamos sus embudos, campañas actuales y cuellos de botella operativos para diseñar el alcance quirúrgico.",
    "process.step2.num": "02",
    "process.step2.title": "Arquitectura & Diseño",
    "process.step2.desc": "Diseñamos la interfaz de alta conversión bajo el estándar visual premium ViraWeb, validando la navegación.",
    "process.step3.num": "03",
    "process.step3.title": "Ingeniería de Código",
    "process.step3.desc": "Desarrollo limpio, SEO técnico nativo, integraciones de CRM, bots y configuración de etiquetas de conversión.",
    "process.step4.num": "04",
    "process.step4.title": "Integración y Escala",
    "process.step4.desc": "Configuración de servidores, bases de datos, integraciones de APIs y capacitación del equipo para comenzar a usar el sistema.",

    // FAQ
    "faq.badge": "Preguntas Frecuentes",
    "faq.title": "Dudas respondidas.",
    "faq.subtitle": "Todo lo que necesita saber sobre nuestro ecosistema y entrega técnica.",
    "faq.q1": "¿El sitio será mío? ¿Tendré acceso al código?",
    "faq.a1": "Sí, 100% suyo. Tras el desarrollo, tiene propiedad total sobre el dominio, el código fuente y las claves de acceso. Además, creamos paneles CMS intuitivos para que modifique textos sin depender de nosotros.",
    "faq.q2": "¿Cómo funciona el desarrollo de sistemas personalizados?",
    "faq.a2": "Mapeamos los processos manuales de su empresa y creamos un software a la medida (como ERP, CRM o herramienta interna) totalmente integrado con las APIs y bases de dados que ya utiliza, eliminando errores operativos.",
    "faq.q3": "¿Qué es la plataforma GDC exclusiva?",
    "faq.a3": "GDC es nuestro centro de mando propietario. En lugar de contratar múltiples softwares costosos (CRM, facturación, importador fiscal, chatbot), integramos todo en un único ecosistema personalizado para manejar su empresa sin planillas.",
    "faq.q4": "¿Cuál es el tiempo medio de desarrollo de un sitio premium?",
    "faq.a4": "Depende de la complejidad, pero las landing pages de élite suelen entregarse en 10 a 15 días hábiles, y los portales corporativos más complejos entre 20 a 30 días hábiles, con seguimiento activo.",

    // Testimonials
    "testimonials.badge": "Testimonios Reales",
    "testimonials.title": "Quién confía en nuestra ingeniería.",
    "testimonials.subtitle": "Vea testimonios de marcas, clínicas y SaaS que escalaron sus operaciones con ViraWeb."
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Language) || "pt"
    }
    return "pt"
  })

  useEffect(() => {
    localStorage.setItem("lang", language)
    document.documentElement.lang = language
  }, [language])

  const t = useCallback((key: string): string => {
    return translations[language]?.[key] || translations.pt[key] || key
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    return {
      language: "pt" as Language,
      setLanguage: () => {},
      t: (key: string) => key,
    }
  }
  return context
}
