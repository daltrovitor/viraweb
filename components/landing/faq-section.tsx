"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "@/lib/i18n"

const faqsData = {
  pt: [
    {
      q: "Posso começar apenas com um serviço e adicionar outros depois?",
      a: "Sim, a estrutura da ViraWeb é 100% modular. Você pode iniciar contratando apenas o Website, o Google Meu Negócio ou o ViraBot, e adicionar outros módulos conforme a necessidade de escala da sua empresa.",
    },
    {
      q: "A verba dos anúncios do Tráfego Pago já está inclusa na mensalidade?",
      a: "A mensalidade cobre toda a criação, gestão diária, testes de anúncios, estratégia e otimização contínua das suas campanhas pela ViraWeb. A verba investida diretamente no Google Ads e Meta Ads é definida por você conforme o seu orçamento.",
    },
    {
      q: "Como funciona o desenvolvimento de um sistema personalizado do zero?",
      a: "Fazemos uma reunião inicial de diagnóstico estratégico para mapear todas as regras de negócio da sua empresa. Em seguida, desenhamos a arquitetura de software, entregamos um protótipo navegável para validação e desenvolvemos o sistema em Next.js com banco de dados rápido.",
    },
    {
      q: "Quanto tempo leva para colocar o Pacote ViraWeb no ar?",
      a: "Em média, entregamos a estrutura completa do Pacote ViraWeb (Website, Google Meu Negócio, criativos de tráfego e ViraBot ativo) em 10 a 15 dias úteis após a etapa de alinhamento.",
    },
    {
      q: "O site, domínio e código-fonte serão meus?",
      a: "Sim, 100% seus! Você possui propriedade total sobre o código-fonte, domínio, chaves de acesso e banco de dados criados para a sua empresa.",
    },
    {
      q: "Como o ViraBot atua no WhatsApp comercial?",
      a: "O ViraBot responde mensagens instantaneamente 24h por dia. Ele qualifica a necessidade do cliente, tira dúvidas sobre seus serviços e direciona para o agendamento de atendimentos ou para sua equipe humana.",
    },
  ],
  en: [
    {
      q: "Can I start with just one service and add others later?",
      a: "Yes, ViraWeb's architecture is 100% modular. You can start by contracting only the Website, Google Business Profile, or ViraBot, and scale into additional modules as your business grows.",
    },
    {
      q: "Is the advertising budget for paid ads included in the monthly fee?",
      a: "The monthly fee covers campaign creation, daily management, ad testing, strategy, and continuous ROI optimization by ViraWeb. The ad spend invested directly on Google Ads and Meta Ads is set by you according to your budget.",
    },
    {
      q: "How does custom software engineering from scratch work?",
      a: "We conduct an initial technical diagnostic meeting to map all your business logic. We then design the software architecture, deliver an interactive prototype for validation, and build the full system in Next.js with scalable cloud databases.",
    },
    {
      q: "How long does it take to launch the full ViraWeb Package?",
      a: "On average, we deploy the full ViraWeb Package (Website, Google Business, ad creatives, and active ViraBot) within 10 to 15 business days following technical alignment.",
    },
    {
      q: "Will the website, domain, and source code belong to me?",
      a: "Yes, 100% yours! You retain full ownership over the source code, domain name, credentials, and databases created for your enterprise.",
    },
    {
      q: "How does ViraBot operate on commercial WhatsApp?",
      a: "ViraBot responds to messages instantly 24/7. It qualifies prospective leads, answers frequent questions about your services, and schedules appointments directly onto your team's calendar.",
    },
  ],
  es: [
    {
      q: "¿Puedo comenzar con un solo servicio y añadir otros después?",
      a: "Sí, la estructura de ViraWeb es 100% modular. Puede iniciar contratando únicamente el Sitio Web, Google Mi Negocio o ViraBot, e incorporar otros módulos conforme crezca la demanda de su empresa.",
    },
    {
      q: "¿El presupuesto para anuncios de tráfico pago está incluido en la mensualidad?",
      a: "La mensualidad cubre toda la creación, gestión diaria, pruebas de creatividades, estrategia y optimización constante por parte de ViraWeb. La inversión publicitaria en Google Ads y Meta Ads la define usted según su presupuesto.",
    },
    {
      q: "¿Cómo funciona el desarrollo de un sistema a medida desde cero?",
      a: "Realizamos una reunión inicial de diagnóstico para mapear los procesos de su empresa. Diseñamos la arquitectura de software, entregamos un prototipo navegable y desarrollamos el sistema en Next.js con base de datos en la nube.",
    },
    {
      q: "¿Cuánto tiempo toma poner en marcha el Paquete ViraWeb?",
      a: "En promedio, entregamos la estructura completa del Paquete ViraWeb (Sitio Web, Google Mi Negocio, anuncios y ViraBot activo) en 10 a 15 días hábiles tras la fase de alineación.",
    },
    {
      q: "¿El sitio web, dominio y código fuente serán míos?",
      a: "¡Sí, 100% suyos! Usted cuenta con la propiedad total sobre el código fuente, dominio, claves de acceso y bases de datos creadas para su empresa.",
    },
    {
      q: "¿Cómo actúa ViraBot en el WhatsApp comercial?",
      a: "ViraBot responde mensajes al instante las 24 horas del día. Califica las necesidades del cliente, resuelve preguntas frecuentes sobre sus servicios y agenda citas directamente.",
    },
  ],
}

export function LandingFaq() {
  const { language } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  const faqs = faqsData[language] || faqsData.pt

  return (
    <section id="faq" className="relative bg-slate-50/70 border-b border-slate-200 py-20 lg:py-28 text-slate-900">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-blue-600 mb-3">
            {language === "en" ? "FAQ • TECHNICAL CLARIFICATIONS" : language === "es" ? "FAQ • ACLARACIONES TÉCNICAS" : "FAQ • ESCLARECIMENTOS TÉCNICOS"}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950">
            {language === "en" ? "Frequently Asked Questions" : language === "es" ? "Preguntas Frecuentes" : "Perguntas Frequentes"}
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            {language === "en"
              ? "Direct answers regarding delivery timelines, source code intellectual property, ad management, and technical support."
              : language === "es"
              ? "Respuestas directas sobre tiempos de entrega, propiedad intelectual del código, gestión de anuncios y soporte."
              : "Respostas diretas sobre processos de entrega, propriedade intelectual de código, gestão de mídia e suporte."}
          </p>
        </div>

        {/* Editorial Accordion with Dividing Rules */}
        <div className="mt-12 border-t border-b border-slate-200 divide-y divide-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.q} className="py-6">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-6 text-left cursor-pointer group"
                >
                  <span className="text-base font-semibold text-slate-950 group-hover:text-blue-600 transition-colors">
                    {faq.q}
                  </span>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="pt-3 pr-8 text-sm text-slate-600 leading-relaxed font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
