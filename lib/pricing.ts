export const WHATSAPP_E164 = "5562992466109"

export type ServiceId = "website" | "gmn" | "ads" | "virabot"

export type Service = {
  id: ServiceId
  name: string
  short: string
  description: string
  setup: number
  monthly: number
}

export const SERVICES: Service[] = [
  {
    id: "website",
    name: "Website / Landing Page Alta Conversão",
    short: "Site de alta conversão",
    description:
      "Site institucional ou landing page moderna em Next.js, SEO básico, design exclusivo e responsivo.",
    setup: 1200,
    monthly: 150,
  },
  {
    id: "gmn",
    name: "Google Meu Negócio & SEO Local",
    short: "Domínio no mapa",
    description:
      "Otimização completa da ficha, cadastro de produtos/serviços, estratégia de avaliações e posicionamento no mapa.",
    setup: 500,
    monthly: 100,
  },
  {
    id: "ads",
    name: "Gestão de Tráfego Pago (Google Ads + Meta Ads)",
    short: "Google Ads e Meta Ads",
    description:
      "Criação e otimização constante de campanhas de anúncios para atrair clientes qualificados. Verba de anúncios paga pelo cliente.",
    setup: 400,
    monthly: 450,
  },
  {
    id: "virabot",
    name: "ViraBot WhatsApp (Atendimento Automático)",
    short: "Atendimento 24/7",
    description:
      "Chatbot inteligente para triagem, resposta de dúvidas frequentes e agendamento/captação de leads.",
    setup: 600,
    monthly: 200,
  },
]

export const PACKAGE_IDS: ServiceId[] = ["website", "gmn", "ads", "virabot"]

export function brl(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function isFullPackage(selected: ServiceId[]) {
  return PACKAGE_IDS.every((id) => selected.includes(id))
}

export function quoteTotals(selected: ServiceId[]) {
  const items = SERVICES.filter((s) => selected.includes(s.id))
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

export function specialistMessage() {
  return "Olá ViraWeb! Gostaria de falar com um especialista sobre o Pacote ViraWeb e entender a melhor estratégia para minha empresa."
}

export function packageMessage() {
  return "Olá ViraWeb! Quero contratar o Pacote ViraWeb completo com 20% de desconto no Setup e 15% de desconto na mensalidade!"
}

export function engineeringMessage() {
  return "Olá ViraWeb! Quero agendar uma reunião técnica de engenharia para um Sistema Sob Medida / ERP / CRM do zero."
}

export function planMessage(selected: ServiceId[], customSystem: boolean) {
  const q = quoteTotals(selected)
  const lines = q.items.map((s) => `- ${s.name}`)
  if (customSystem) lines.push("- Sistema Sob Medida / ERP / CRM (Orçamento e escopo técnico à parte)")

  let discountInfo = ""
  if (q.fullPackage) {
    discountInfo = "\n🎉 Pacote ViraWeb Completo (20% OFF no Setup + 15% OFF na Mensalidade)"
  } else if (q.discounted) {
    discountInfo = `\n🎉 Desconto de ${q.setupDiscountRate * 100}% no Setup aplicado!`
  }

  if (lines.length === 0 && !customSystem) {
    return "Olá ViraWeb! Quero montar um plano personalizado para minha empresa."
  }

  return `Olá ViraWeb! Montei uma proposta no site:${discountInfo}
Serviços selecionados:
${lines.join("\n")}

Investimento Setup: ${brl(q.setup)}${q.setupSaved > 0 ? ` (Economia de ${brl(q.setupSaved)})` : ""}
Recorrência: ${brl(q.monthly)}/mês${q.monthlySaved > 0 ? ` (Economia de ${brl(q.monthlySaved)}/mês)` : ""}

Gostaria de dar andamento e falar com o time de engenharia.`
}
