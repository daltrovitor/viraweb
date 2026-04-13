"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type Language = "pt" | "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const translations: Record<Language, Record<string, string>> = {
  pt: {
    "nav.services": "Serviços",
    "nav.gdc": "G.D.C.",
    "nav.contact": "Contato",
    "nav.button": "Fale Conosco",
    "hero.badge": "Criação de Sites",
    "hero.title1": "Seu negócio",
    "hero.title2": "merece",
    "hero.title3": "um site à",
    "hero.title4": "sua altura.",
    "hero.subtitle": "Criamos sites personalizados com design premium, painel de gerenciamento completo e estratégia digital — tudo para você se destacar.",
    "hero.cta": "Quero meu site",
    "hero.view_services": "Ver serviços",
    "hero.stats.sites": "sites entregues",
    "hero.stats.satisfaction": "satisfação",
    "hero.stats.time": "prazo médio",
    "gdc.exclusive": "Exclusivo",
    "gdc.title": "Controle total com o G.D.C.",
    "gdc.description": "Nosso Gestor de Clientes (GDC) é muito mais do que um simples painel de controle. Ele é o verdadeiro motor central, criado com todas as 9 funcionalidades que você precisa para controlar processos manuais hoje.",
    "gdc.cta": "Acessar o G.D.C.",
    "gdc.feature1.title": "Gestão de Clientes",
    "gdc.feature1.desc": "Histórico completo e prontuários",
    "gdc.feature2.title": "Financeiro Integrado",
    "gdc.feature2.desc": "Fluxo de caixa automático",
    "gdc.feature3.title": "Relatórios e Visão",
    "gdc.feature3.desc": "Dashboards analíticos",
    "gdc.feature4.title": "ViraBot IA",
    "gdc.feature4.desc": "Inteligência Artificial 24h",
    "footer.description": "Transformando negócios através de sites profissionais, tráfego pago e soluções digitais completas.",
    "footer.services": "Serviços",
    "footer.company": "Empresa",
    "footer.contact": "Contato",
    "footer.cta": "Falar no WhatsApp",
    "footer.rights": "Todos os direitos reservados.",
    "footer.made_with": "Feito com",
    "footer.by": "pela equipe ViraWeb",
    "services.creation": "Criação de Sites",
    "services.traffic": "Tráfego Pago",
    "services.assistant": "Assistente Virtual",
    "services.gmn": "Google Meu Negócio",
    "services.badge": "O que fazemos",
    "services.title1": "Serviços que",
    "services.title2": "impulsionam",
    "services.title3": "seu negócio.",
    "services.subtitle": "Soluções completas para você crescer no digital — do site ao tráfego.",
    "services.creation.desc": "Sites modernos, responsivos e otimizados para conversão. Do institucional ao e-commerce.",
    "services.traffic.desc": "Campanhas estratégicas no Google e Meta Ads para maximizar seu ROI e alcançar o público certo.",
    "services.assistant.desc": "Automatize o atendimento com IA disponível 24/7 para responder dúvidas e captar leads.",
    "services.gmn.desc": "Gestão completa do seu perfil no Google para aumentar visibilidade local e atrair clientes.",
    "services.cta": "Solicitar orçamento",
    "stats.conversions": "Aumento em conversões",
    "stats.off": "OFF no primeiro serviço",
    "stats.exp": "De experiência",
    "stats.satisfaction": "Taxa de satisfação",
    "gdc.features.badge": "9 funcionalidades",
    "gdc.features.desc": "Nosso Gestor de Clientes (GDC) é muito mais do que um simples painel de controle. Ele é o verdadeiro motor central, criado com todas as 9 funcionalidades que você precisa para controlar processos manuais hoje. O GDC abraça todo o seu ecossistema: desde o tratamento e agendamento contínuo, o braço financeiro que garante tudo no fim do mês, até as métricas diárias essenciais, e integra tudo isso em uma Inteligência Artificial avançada. Incrivelmente fácil de mexer.",
    "gdc.f1.title": "Gestão de Clientes",
    "gdc.f1.desc": "Mantenha o histórico completo, prontuários precisos e o controle de todos os agendamentos amarrados individualmente na ficha de cada cliente do seu negócio.",
    "gdc.f2.title": "Financeiro Integrado",
    "gdc.f2.desc": "Controle as suas entradas a receber, pagamentos parcelados, descontos e acesse um fluxo de caixa detalhado gerado automaticamente com imensa precisão num piscar de olhos.",
    "gdc.f3.title": "Relatórios e Visão",
    "gdc.f3.desc": "Dashboards analíticos absurdamente elegantes que te dizem a verdade sobre a saúde da sua empresa: acompanhe faturamento real, ticket médio mensal e taxas de retenção.",
    "gdc.f4.title": "Importação Mágica",
    "gdc.f4.desc": "Esqueça perder dias passando dados antigos. Nossa IA lê PDFs massivos e planilhas esquecidas para preencher todo o seu sistema online num processo de menos de 2 segundos.",
    "gdc.f5.title": "ViraBot IA",
    "gdc.f5.desc": "Sua operação ganha uma Inteligência Artificial exclusiva que funciona 24h para extrair informações que passaram despercebidas, organizar registros complexos e te mostrar insights.",
    "gdc.f6.title": "Módulo Profissionais",
    "gdc.f6.desc": "Alinhe diretamente as agendas da sua operação, configure permissões rigorosas de acessos por tela, e programe fluxos de pagamentos ou comissões individuais para sua equipe.",
    "cta.badge": "Vamos conversar",
    "cta.title1": "Pronto para ter um",
    "cta.title2": "site",
    "cta.title3": "profissional",
    "cta.subtitle": "Entre em contato pelo WhatsApp e descubra como podemos transformar sua presença digital em resultados reais.",
    "cta.button": "Falar no WhatsApp",
    "cta.or_services": "Ou veja nossos serviços",
    "cta.clients": "+50 clientes satisfeitos",
    "cta.clients_desc": "Empresas que já cresceram com a ViraWeb",
    "video.title1": "Conheça a",
    "video.subtitle": "O ponto de virada entre o mundo físico e o digital. Criamos caminhos, não apenas sites. Transformamos presença física em presença digital — somos a ponte entre a ideia e a web.",
    "video.placeholder": "Vídeo Explicativo",
    "video.soon": "Em breve: Nossa história e visão",
    "video.button": "Orçamento",
  },
  en: {
    "nav.services": "Services",
    "nav.gdc": "G.D.C.",
    "nav.contact": "Contact",
    "nav.button": "Contact Us",
    "hero.badge": "Website Creation",
    "hero.title1": "Your business",
    "hero.title2": "deserves",
    "hero.title3": "a website at",
    "hero.title4": "your level.",
    "hero.subtitle": "We create personalized websites with premium design, complete management panel, and digital strategy — everything for you to stand out.",
    "hero.cta": "I want my website",
    "hero.view_services": "View services",
    "hero.stats.sites": "websites delivered",
    "hero.stats.satisfaction": "satisfaction",
    "hero.stats.time": "average time",
    "gdc.exclusive": "Exclusive",
    "gdc.title": "Total control with G.D.C.",
    "gdc.description": "Our Client Manager (GDC) is much more than a simple control panel. It is the true central engine, created with all 9 features you need to control manual processes today.",
    "gdc.cta": "Access G.D.C.",
    "gdc.feature1.title": "Client Management",
    "gdc.feature1.desc": "Complete history and records",
    "gdc.feature2.title": "Integrated Finance",
    "gdc.feature2.desc": "Automatic cash flow",
    "gdc.feature3.title": "Reports and Vision",
    "gdc.feature3.desc": "Analytical dashboards",
    "gdc.feature4.title": "ViraBot AI",
    "gdc.feature4.desc": "24h Artificial Intelligence",
    "footer.description": "Transforming businesses through professional websites, paid traffic, and complete digital solutions.",
    "footer.services": "Services",
    "footer.company": "Company",
    "footer.contact": "Contact",
    "footer.cta": "Talk on WhatsApp",
    "footer.rights": "All rights reserved.",
    "footer.made_with": "Made with",
    "footer.by": "by the ViraWeb team",
    "services.creation": "Website Creation",
    "services.traffic": "Paid Traffic",
    "services.assistant": "Virtual Assistant",
    "services.gmn": "Google My Business",
    "services.badge": "What we do",
    "services.title1": "Services that",
    "services.title2": "boost",
    "services.title3": "your business.",
    "services.subtitle": "Complete solutions for you to grow digitally — from website to traffic.",
    "services.creation.desc": "Modern, responsive websites optimized for conversion. From institutional to e-commerce.",
    "services.traffic.desc": "Strategic campaigns on Google and Meta Ads to maximize your ROI and reach the right audience.",
    "services.assistant.desc": "Automate service with AI available 24/7 to answer questions and capture leads.",
    "services.gmn.desc": "Complete management of your Google profile to increase local visibility and attract customers.",
    "services.cta": "Request budget",
    "stats.conversions": "Increase in conversions",
    "stats.off": "OFF on first service",
    "stats.exp": "Of experience",
    "stats.satisfaction": "Satisfaction rate",
    "gdc.features.badge": "9 features",
    "gdc.features.desc": "Our Client Manager (GDC) is much more than a simple control panel. It is the true central engine, created with all 9 features you need to control manual processes today. GDC embraces your entire ecosystem: from treatment and continuous scheduling, the financial arm that ensures everything at the end of the month, to essential daily metrics, and integrates all this into advanced Artificial Intelligence. Incredibly easy to use.",
    "gdc.f1.title": "Client Management",
    "gdc.f1.desc": "Keep complete history, accurate records, and control of all schedules tied individually to each client file of your business.",
    "gdc.f2.title": "Integrated Finance",
    "gdc.f2.desc": "Control your incoming receipts, installment payments, discounts, and access a detailed cash flow generated automatically with immense precision in the blink of an eye.",
    "gdc.f3.title": "Reports and Vision",
    "gdc.f3.desc": "Absurdly elegant analytical dashboards that tell you the truth about your company's health: track real revenue, monthly average ticket, and retention rates.",
    "gdc.f4.title": "Magic Import",
    "gdc.f4.desc": "Forget losing days inputting old data. Our AI reads massive PDFs and forgotten spreadsheets to fill your entire online system in a process of less than 2 seconds.",
    "gdc.f5.title": "ViraBot AI",
    "gdc.f5.desc": "Your operation gains an exclusive Artificial Intelligence that works 24h to extract information that went unnoticed, organize complex records, and show you insights.",
    "gdc.f6.title": "Professional Module",
    "gdc.f6.desc": "Directly align your operation's schedules, configure strict access permissions per screen, and program individual payment or commission flows for your team.",
    "cta.badge": "Let's talk",
    "cta.title1": "Ready to have a",
    "cta.title2": "professional",
    "cta.title3": "website",
    "cta.subtitle": "Contact us via WhatsApp and discover how we can transform your digital presence into real results.",
    "cta.button": "Talk on WhatsApp",
    "cta.or_services": "Or see our services",
    "cta.clients": "+50 satisfied clients",
    "cta.clients_desc": "Companies that have already grown with ViraWeb",
    "video.title1": "Meet",
    "video.subtitle": "The turning point between the physical and digital world. We create paths, not just websites. We transform physical presence into digital presence — we are the bridge between the idea and the web.",
    "video.placeholder": "Explanatory Video",
    "video.soon": "Soon: Our story and vision",
    "video.button": "Get a Quote",
  },
  es: {
    "nav.services": "Servicios",
    "nav.gdc": "G.D.C.",
    "nav.contact": "Contacto",
    "nav.button": "Contáctenos",
    "hero.badge": "Creación de Sitios",
    "hero.title1": "Su negocio",
    "hero.title2": "merece",
    "hero.title3": "un sitio a",
    "hero.title4": "su altura.",
    "hero.subtitle": "Creamos sitios personalizados con diseño premium, panel de gestión completo y estrategia digital, todo para que usted se destaque.",
    "hero.cta": "Quiero mi sitio",
    "hero.view_services": "Ver servicios",
    "hero.stats.sites": "sitios entregados",
    "hero.stats.satisfaction": "satisfacción",
    "hero.stats.time": "plazo promedio",
    "gdc.exclusive": "Exclusivo",
    "gdc.title": "Control total con el G.D.C.",
    "gdc.description": "Nuestro Gestor de Clientes (GDC) es mucho más que un simple panel de control. Es el verdadero motor central, creado con todas las 9 funcionalidades que necesita para controlar los procesos manuales hoy.",
    "gdc.cta": "Acceder al G.D.C.",
    "gdc.feature1.title": "Gestión de Clientes",
    "gdc.feature1.desc": "Historial completo y registros",
    "gdc.feature2.title": "Finanzas Integradas",
    "gdc.feature2.desc": "Flujo de caja automático",
    "gdc.feature3.title": "Informes y Visión",
    "gdc.feature3.desc": "Dashboards analíticos",
    "gdc.feature4.title": "ViraBot IA",
    "gdc.feature4.desc": "Inteligencia Artificial 24h",
    "footer.description": "Transformando negocios a través de sitios web profesionales, tráfico pago y soluciones digitales completas.",
    "footer.services": "Servicios",
    "footer.company": "Empresa",
    "footer.contact": "Contacto",
    "footer.cta": "Hablar por WhatsApp",
    "footer.rights": "Todos los derechos reservados.",
    "footer.made_with": "Hecho con",
    "footer.by": "por el equipo de ViraWeb",
    "services.creation": "Creación de Sitios",
    "services.traffic": "Tráfico Pago",
    "services.assistant": "Asistente Virtual",
    "services.gmn": "Google mi Negocio",
    "services.badge": "Qué hacemos",
    "services.title1": "Servicios que",
    "services.title2": "impulsan",
    "services.title3": "su negocio.",
    "services.subtitle": "Soluciones completas para que crezcas en lo digital — del sitio al tráfico.",
    "services.creation.desc": "Sitios modernos, responsivos e optimizados para conversión. Del institucional al e-commerce.",
    "services.traffic.desc": "Campañas estratégicas en Google y Meta Ads para maximizar su ROI e alcanzar al público adecuado.",
    "services.assistant.desc": "Automatice la atención con IA disponible 24/7 para responder dudas y captar leads.",
    "services.gmn.desc": "Gestión completa de su perfil en Google para aumentar visibilidad local e atraer clientes.",
    "services.cta": "Solicitar presupuesto",
    "stats.conversions": "Aumento en conversiones",
    "stats.off": "OFF en el primer servicio",
    "stats.exp": "De experiencia",
    "stats.satisfaction": "Tasa de satisfacción",
    "gdc.features.badge": "9 funcionalidades",
    "gdc.features.desc": "Nuestro Gestor de Clientes (GDC) es mucho más que un simple panel de control. Es el verdadero motor central, creado con todas las 9 funcionalidades que necesita para controlar los procesos manuales hoy. El GDC abarca todo su ecosistema: desde el tratamiento y la programación continua, el brazo financiero que garantiza todo al final del mes, hasta las métricas diarias esenciales, e integra todo esto en una Inteligencia Artificial avanzada. Increíblemente fácil de usar.",
    "gdc.f1.title": "Gestión de Clientes",
    "gdc.f1.desc": "Mantenga el historial completo, registros precisos y el control de todas las citas vinculadas individualmente en la ficha de cada cliente de su negocio.",
    "gdc.f2.title": "Finanzas Integradas",
    "gdc.f2.desc": "Controle sus recibos pendientes, pagos a plazos, descuentos y acceda a un flujo de caja detallado generado automáticamente con una inmensa precisión en un abrir y cerrar de ojos.",
    "gdc.f3.title": "Informes y Visión",
    "gdc.f3.desc": "Dashboards analíticos absurdamente elegantes que le dicen la verdad sobre la salud de su empresa: siga los ingresos reales, el ticket promedio mensual y las tasas de retención.",
    "gdc.f4.title": "Importación Mágica",
    "gdc.f4.desc": "Olvídese de perder días pasando datos antiguos. Nuestra IA lee PDFs masivos y hojas de cálculo olvidadas para completar todo su sistema en línea en un proceso de menos de 2 segundos.",
    "gdc.f5.title": "ViraBot IA",
    "gdc.f5.desc": "Su operación gana una Inteligencia Artificial exclusiva que funciona las 24 horas para extraer información que pasó desapercibida, organizar registros complejos y mostrarle ideas.",
    "gdc.f6.title": "Módulo Profesionales",
    "gdc.f6.desc": "Alinee directamente las agendas de su operación, configure permisos estrictos de acceso por pantalla e programe flujos de pagos o comisiones individuales para su equipo.",
    "cta.badge": "Hablemos",
    "cta.title1": "Listo para tener un",
    "cta.title2": "sitio",
    "cta.title3": "profesional",
    "cta.subtitle": "Contáctenos por WhatsApp y descubra cómo podemos transformar su presencia digital en resultados reales.",
    "cta.button": "Hablar por WhatsApp",
    "cta.or_services": "O vea nuestros servicios",
    "cta.clients": "+50 clientes satisfechos",
    "cta.clients_desc": "Empresas que ya han crecido con ViraWeb",
    "video.title1": "Conozca",
    "video.subtitle": "El punto de inflexión entre el mundo físico y el digital. Creamos caminos, no solo sitios. Transformamos la presencia física en presencia digital — somos el puente entre la idea y la web.",
    "video.placeholder": "Vídeo Explicativo",
    "video.soon": "Pronto: Nuestra historia y visión",
    "video.button": "Presupuesto",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "pt" || saved === "en" || saved === "es")) {
      setLanguageState(saved)
    }
  }, [])

  const t = React.useCallback((key: string) => {
    // Durante a hidratação, 'mounted' ainda é false, então usamos 'pt' (o padrão do servidor)
    // Isso evita o erro de mismatch caso o localStorage tenha 'en' ou 'es'
    const activeLang = mounted ? language : "pt"
    return translations[activeLang][key] || key
  }, [mounted, language])

  const setLanguage = React.useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }, [])

  const contextValue = React.useMemo(() => ({
    language: mounted ? language : "pt",
    setLanguage,
    t
  }), [mounted, language, setLanguage, t])

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = React.useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
