import type { Language } from "./i18n"

export const WHATSAPP_E164 = "5562992466109"

export type ServiceId = "website" | "gmn" | "ads" | "virabot"

export type Service = {
  id: ServiceId
  name: {
    pt: string
    en: string
    es: string
  }
  short: {
    pt: string
    en: string
    es: string
  }
  description: {
    pt: string
    en: string
    es: string
  }
  setupBRL: number
  monthlyBRL: number
}

// Exchange rates relative to BRL (for clean commercial display)
// 1 USD = ~5.00 BRL | 1 EUR = ~5.50 BRL
const RATE_USD = 5.0
const RATE_EUR = 5.5

export const SERVICES_CONFIG: Service[] = [
  {
    id: "website",
    name: {
      pt: "Website / Landing Page Alta Conversão",
      en: "High-Converting Website / Landing Page",
      es: "Sitio Web / Landing Page de Alta Conversión",
    },
    short: {
      pt: "Site de alta conversão",
      en: "High-converting site",
      es: "Sitio de alta conversión",
    },
    description: {
      pt: "Site institucional ou landing page moderna em Next.js, SEO básico, design exclusivo e responsivo.",
      en: "Modern Next.js institutional website or landing page, native SEO, bespoke responsive design.",
      es: "Sitio web o landing page moderna en Next.js, SEO básico, diseño exclusivo y 100% responsivo.",
    },
    setupBRL: 1600,
    monthlyBRL: 180,
  },
  {
    id: "gmn",
    name: {
      pt: "Google Meu Negócio & SEO Local",
      en: "Google Business Profile & Local SEO",
      es: "Google Mi Negocio y SEO Local",
    },
    short: {
      pt: "Domínio no mapa",
      en: "Map dominance",
      es: "Dominio en el mapa",
    },
    description: {
      pt: "Otimização completa da ficha, cadastro de produtos/serviços, estratégia de avaliações e posicionamento no mapa.",
      en: "Complete profile setup, catalog optimization, 5-star review strategy, and top map rankings.",
      es: "Optimización completa de la ficha, catálogo de servicios, estrategia de reseñas y posicionamiento top en Google Maps.",
    },
    setupBRL: 700,
    monthlyBRL: 150,
  },
  {
    id: "ads",
    name: {
      pt: "Gestão de Tráfego Pago (Google Ads + Meta Ads)",
      en: "Paid Media Management (Google & Meta Ads)",
      es: "Gestión de Tráfico Pago (Google Ads y Meta Ads)",
    },
    short: {
      pt: "Google Ads e Meta Ads",
      en: "Google & Meta Ads",
      es: "Google y Meta Ads",
    },
    description: {
      pt: "Criação e otimização constante de campanhas de anúncios para atrair clientes qualificados. Verba de anúncios paga pelo cliente.",
      en: "Creation and daily optimization of targeted campaigns. Ad spend is invested directly by the client.",
      es: "Creación y optimización diaria de campañas publicitarias para captar clientes cualificados. Inversión publicitaria cubierta por el cliente.",
    },
    setupBRL: 600,
    monthlyBRL: 600,
  },
  {
    id: "virabot",
    name: {
      pt: "ViraBot WhatsApp (Atendimento Automático)",
      en: "ViraBot WhatsApp (24/7 Automation)",
      es: "ViraBot WhatsApp (Atención Automática 24/7)",
    },
    short: {
      pt: "Atendimento 24/7",
      en: "24/7 Support",
      es: "Atención 24/7",
    },
    description: {
      pt: "Chatbot inteligente para triagem, resposta de dúvidas frequentes e agendamento/captação de leads.",
      en: "Intelligent chatbot for instant lead qualification, FAQ answering, and automated booking.",
      es: "Chatbot inteligente para triaje de clientes, resolución de dudas y agendamiento automático.",
    },
    setupBRL: 800,
    monthlyBRL: 250,
  },
]

export const PACKAGE_IDS: ServiceId[] = ["website", "gmn", "ads", "virabot"]

export function getPriceInCurrency(brlValue: number, lang: Language = "pt"): number {
  if (lang === "en") {
    return Math.round(brlValue / RATE_USD)
  }
  if (lang === "es") {
    return Math.round(brlValue / RATE_EUR)
  }
  return brlValue
}

export function formatPrice(brlValue: number, lang: Language = "pt"): string {
  const converted = getPriceInCurrency(brlValue, lang)

  if (lang === "en") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(converted)
  }

  if (lang === "es") {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(converted)
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(converted)
}

// Backward compatibility alias
export function brl(value: number, lang: Language = "pt") {
  return formatPrice(value, lang)
}

export function getServices(lang: Language = "pt") {
  return SERVICES_CONFIG.map((s) => ({
    id: s.id,
    name: s.name[lang] || s.name.pt,
    short: s.short[lang] || s.short.pt,
    description: s.description[lang] || s.description.pt,
    setup: s.setupBRL,
    monthly: s.monthlyBRL,
    setupFormatted: formatPrice(s.setupBRL, lang),
    monthlyFormatted: formatPrice(s.monthlyBRL, lang),
  }))
}

export function isFullPackage(selected: ServiceId[]) {
  return PACKAGE_IDS.every((id) => selected.includes(id))
}

export function quoteTotals(selected: ServiceId[], lang: Language = "pt") {
  const items = SERVICES_CONFIG.filter((s) => selected.includes(s.id)).map((s) => ({
    id: s.id,
    name: s.name[lang] || s.name.pt,
    short: s.short[lang] || s.short.pt,
    description: s.description[lang] || s.description.pt,
    setup: s.setupBRL,
    monthly: s.monthlyBRL,
    setupFormatted: formatPrice(s.setupBRL, lang),
    monthlyFormatted: formatPrice(s.monthlyBRL, lang),
  }))

  const setupGross = items.reduce((sum, s) => sum + s.setup, 0)
  const monthlyGross = items.reduce((sum, s) => sum + s.monthly, 0)

  const count = items.length
  let setupDiscountRate = 0
  let monthlyDiscountRate = 0

  if (count === 4) {
    // 4 serviços selecionados (Pacote ViraWeb Completo): 20% no Setup + 15% na Mensalidade
    setupDiscountRate = 0.20
    monthlyDiscountRate = 0.15
  } else if (count >= 2) {
    // 2 a 3 serviços selecionados: 10% de desconto no Setup
    setupDiscountRate = 0.10
    monthlyDiscountRate = 0
  }

  const setup = Math.round(setupGross * (1 - setupDiscountRate))
  const monthly = Math.round(monthlyGross * (1 - monthlyDiscountRate))

  return {
    items,
    count,
    setupGross,
    monthlyGross,
    setup,
    monthly,
    setupFormatted: formatPrice(setup, lang),
    monthlyFormatted: formatPrice(monthly, lang),
    setupGrossFormatted: formatPrice(setupGross, lang),
    monthlyGrossFormatted: formatPrice(monthlyGross, lang),
    setupSavedFormatted: formatPrice(setupGross - setup, lang),
    monthlySavedFormatted: formatPrice(monthlyGross - monthly, lang),
    setupDiscountRate,
    monthlyDiscountRate,
    discounted: count >= 2,
    fullPackage: count === 4,
    setupSaved: setupGross - setup,
    monthlySaved: monthlyGross - monthly,
  }
}

export function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`
}

export function specialistMessage(lang: Language = "pt") {
  if (lang === "en") {
    return "Hello ViraWeb! I would like to speak with a specialist regarding the ViraWeb Package and understand the best digital strategy for my company."
  }
  if (lang === "es") {
    return "¡Hola ViraWeb! Me gustaría hablar con un especialista sobre el Paquete ViraWeb y entender la mejor estrategia digital para mi empresa."
  }
  return "Olá ViraWeb! Gostaria de falar com um especialista sobre o Pacote ViraWeb e entender a melhor estratégia para minha empresa."
}

export function packageMessage(lang: Language = "pt") {
  if (lang === "en") {
    return "Hello ViraWeb! I want to hire the complete ViraWeb Package with 20% off on Setup and 15% off on the monthly fee!"
  }
  if (lang === "es") {
    return "¡Hola ViraWeb! Quiero contratar el Paquete ViraWeb completo con 20% de descuento en el Setup y 15% en la mensualidad."
  }
  return "Olá ViraWeb! Quero contratar o Pacote ViraWeb completo com 20% de desconto no Setup e 15% de desconto na mensalidade!"
}

export function engineeringMessage(lang: Language = "pt") {
  if (lang === "en") {
    return "Hello ViraWeb! I want to schedule a technical software engineering meeting for a custom system / ERP / SaaS."
  }
  if (lang === "es") {
    return "¡Hola ViraWeb! Quiero agendar una reunión técnica de ingeniería para un sistema a medida / ERP / SaaS desde cero."
  }
  return "Olá ViraWeb! Quero agendar uma reunião técnica de engenharia para um Sistema Sob Medida / ERP / CRM do zero."
}

export function planMessage(selected: ServiceId[], customSystem: boolean, lang: Language = "pt") {
  const q = quoteTotals(selected, lang)
  const lines = q.items.map((s) => `- ${s.name}`)
  if (customSystem) {
    if (lang === "en") lines.push("- Custom System / ERP / CRM (Dedicated technical scope and budget)")
    else if (lang === "es") lines.push("- Sistema a Medida / ERP / CRM (Presupuesto y alcance técnico dedicado)")
    else lines.push("- Sistema Sob Medida / ERP / CRM (Orçamento e escopo técnico à parte)")
  }

  let discountInfo = ""
  if (q.fullPackage) {
    if (lang === "en") discountInfo = "\n🎉 Complete ViraWeb Package (20% OFF Setup + 15% OFF Monthly)"
    else if (lang === "es") discountInfo = "\n🎉 Paquete ViraWeb Completo (20% OFF Setup + 15% OFF Mensual)"
    else discountInfo = "\n🎉 Pacote ViraWeb Completo (20% OFF no Setup + 15% OFF na Mensalidade)"
  } else if (q.discounted) {
    if (lang === "en") discountInfo = `\n🎉 ${q.setupDiscountRate * 100}% Setup discount applied!`
    else if (lang === "es") discountInfo = `\n🎉 ¡Descuento de ${q.setupDiscountRate * 100}% en Setup aplicado!`
    else discountInfo = `\n🎉 Desconto de ${q.setupDiscountRate * 100}% no Setup aplicado!`
  }

  if (lines.length === 0 && !customSystem) {
    if (lang === "en") return "Hello ViraWeb! I want to customize a digital plan for my business."
    if (lang === "es") return "¡Hola ViraWeb! Quiero armar un plan personalizado para mi empresa."
    return "Olá ViraWeb! Quero montar um plano personalizado para minha empresa."
  }

  if (lang === "en") {
    return `Hello ViraWeb! I customized a proposal on your website:${discountInfo}
Selected services:
${lines.join("\n")}

Setup Investment: ${q.setupFormatted}${q.setupSaved > 0 ? ` (Savings of ${q.setupSavedFormatted})` : ""}
Monthly Recurrence: ${q.monthlyFormatted}/mo${q.monthlySaved > 0 ? ` (Savings of ${q.monthlySavedFormatted}/mo)` : ""}

I would like to proceed and speak with the engineering team.`
  }

  if (lang === "es") {
    return `¡Hola ViraWeb! He configurado una propuesta en su sitio web:${discountInfo}
Servicios seleccionados:
${lines.join("\n")}

Inversión en Setup: ${q.setupFormatted}${q.setupSaved > 0 ? ` (Ahorro de ${q.setupSavedFormatted})` : ""}
Mensualidad Recurrente: ${q.monthlyFormatted}/mes${q.monthlySaved > 0 ? ` (Ahorro de ${q.monthlySavedFormatted}/mes)` : ""}

Me gustaría coordinar con el equipo de ingeniería para avanzar.`
  }

  return `Olá ViraWeb! Montei uma proposta no site:${discountInfo}
Serviços selecionados:
${lines.join("\n")}

Investimento Setup: ${q.setupFormatted}${q.setupSaved > 0 ? ` (Economia de ${q.setupSavedFormatted})` : ""}
Recorrência: ${q.monthlyFormatted}/mês${q.monthlySaved > 0 ? ` (Economia de ${q.monthlySavedFormatted}/mês)` : ""}

Gostaria de dar andamento e falar com o time de engenharia.`
}
