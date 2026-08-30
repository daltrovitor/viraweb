"use client"

import { ArrowRight, Check } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { PACKAGE_IDS, quoteTotals, waLink, packageMessage } from "@/lib/pricing"

export function LandingPackage() {
  const { language } = useTranslation()
  const totals = quoteTotals(PACKAGE_IDS, language)

  const deliverables = [
    {
      num: "01",
      title: language === "en" ? "Website / Landing Page" : language === "es" ? "Sitio Web / Landing Page" : "Website / Landing Page",
      category: "Next.js + Tailwind",
      desc: language === "en"
        ? "Modern high-converting institutional website or landing page, 100% responsive, native technical SEO, and instant load times."
        : language === "es"
        ? "Sitio web o landing page moderna de alta conversión, 100% responsiva, SEO técnico nativo y carga instantánea."
        : "Site institucional ou landing page moderna de alta conversão, 100% responsiva, SEO técnico nativo e carregamento instantâneo.",
    },
    {
      num: "02",
      title: language === "en" ? "Google Business Profile" : language === "es" ? "Google Mi Negocio" : "Google Meu Negócio",
      category: "SEO Local & Maps",
      desc: language === "en"
        ? "Complete profile optimization, services catalog, review strategy, and top ranking in local searches."
        : language === "es"
        ? "Optimización completa de la ficha, catálogo de servicios, estrategia de reseñas y posicionamiento top en búsquedas locales."
        : "Otimização completa da ficha, catálogo de serviços, estratégia de avaliações e posicionamento no topo das pesquisas locais.",
    },
    {
      num: "03",
      title: language === "en" ? "Paid Media Management" : language === "es" ? "Gestión de Tráfico Pago" : "Gestão de Tráfego Pago",
      category: "Google Ads & Meta Ads",
      desc: language === "en"
        ? "Campaign creation, ad creatives, audience testing, and ongoing optimization focused on qualified lead generation."
        : language === "es"
        ? "Creación de campañas, creatividades, pruebas de audiencia y optimización continua orientada a leads calificados."
        : "Criação de campanhas, criativos, testes de públicos e otimização contínua com foco em geração de leads qualificados.",
    },
    {
      num: "04",
      title: "ViraBot WhatsApp",
      category: language === "en" ? "24/7 Automation" : language === "es" ? "Automatización 24/7" : "Automação 24/7",
      desc: language === "en"
        ? "Instant 24/7 response on company WhatsApp, customer qualification, answering frequent questions, and automated booking."
        : language === "es"
        ? "Atención inmediata 24/7 en WhatsApp, calificación de clientes, respuesta a preguntas frecuentes y agendamiento automático."
        : "Atendimento imediato no WhatsApp da empresa, triagem de clientes, resposta a dúvidas frequentes e agendamento automático.",
    },
  ]

  return (
    <section id="pacote" className="relative bg-white border-b border-slate-200 py-20 lg:py-28 text-slate-900">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-blue-600 mb-3">
            {language === "en" ? "INTEGRATED TURN-KEY SOLUTION" : language === "es" ? "SOLUCIÓN TURN-KEY INTEGRADA" : "SOLUÇÃO TURN-KEY INTEGRADA"}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950">
            {language === "en"
              ? "ViraWeb Package: Attract, Rank, and Convert on Autopilot."
              : language === "es"
              ? "Paquete ViraWeb: Atraiga, Posicione y Convierta en Automático."
              : "Pacote ViraWeb: Atraia, Posicione e Converta no Automático."}
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            {language === "en"
              ? "The complete digital infrastructure for companies seeking fast commercial growth with professional engineering execution."
              : language === "es"
              ? "La infraestructura digital completa para empresas que buscan aceleración comercial con ejecución técnica profesional."
              : "A infraestrutura digital completa para empresas que buscam aceleração comercial com execução técnica profissional."}
          </p>
        </div>

        {/* Deliverables Editorial Grid with Fine Divider Rules */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {deliverables.map((item) => (
            <div key={item.num} className="py-8 md:py-10 px-0 md:px-6 lg:px-7 first:pl-0 last:pr-0 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-sm font-bold text-slate-400">
                    {item.num}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Breakdown & Contract Summary */}
        <div className="mt-12 border border-slate-200 bg-slate-50/70 p-7 lg:p-10 rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Value Proposition */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-semibold text-blue-700 uppercase tracking-wider">
                {language === "en" ? "FULL PACKAGE SPECIAL OFFER" : language === "es" ? "CONDICIÓN ESPECIAL DE PAQUETE COMPLETO" : "CONDIÇÃO ESPECIAL DE PACOTE COMPLETO"}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 mt-2">
                {language === "en"
                  ? "Save by contracting the unified ViraWeb Package"
                  : language === "es"
                  ? "Ahorre contratando el Paquete ViraWeb unificado"
                  : "Economize contratando o Pacote ViraWeb unificado"}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {language === "en" ? (
                  <>By contracting all 4 modules together, you guarantee <strong className="font-semibold text-slate-900">20% off on Setup</strong> and <strong className="font-semibold text-slate-900">15% off on the monthly fee</strong>.</>
                ) : language === "es" ? (
                  <>Al contratar los 4 módulos juntos, usted obtiene <strong className="font-semibold text-slate-900">20% de descuento en el Setup</strong> y <strong className="font-semibold text-slate-900">15% en la mensualidad</strong>.</>
                ) : (
                  <>Ao contratar os 4 módulos juntos, você garante <strong className="font-semibold text-slate-900">20% de desconto no Setup</strong> e <strong className="font-semibold text-slate-900">15% na mensalidade</strong>.</>
                )}
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span>{language === "en" ? "Next.js Website with native SEO" : language === "es" ? "Sitio Web en Next.js con SEO Nativo" : "Website em Next.js com SEO Nativo"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span>{language === "en" ? "Google Business optimized on Maps" : language === "es" ? "Google Mi Negocio configurado en el mapa" : "Google Meu Negócio configurado no mapa"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span>{language === "en" ? "Continuous Google & Meta Ads management" : language === "es" ? "Gestión continua de Google y Meta Ads" : "Gestão contínua de Google & Meta Ads"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span>{language === "en" ? "ViraBot active on WhatsApp 24/7" : language === "es" ? "ViraBot activo en WhatsApp 24h al día" : "ViraBot ativo no WhatsApp 24h por dia"}</span>
                </div>
              </div>
            </div>

            {/* Financial Overview & Direct CTA */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-10 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">{language === "en" ? "One-time Setup (20% OFF):" : language === "es" ? "Setup Único (20% OFF):" : "Setup Único (20% OFF):"}</span>
                  <div className="text-right">
                    <span className="font-mono text-xs text-slate-400 line-through mr-2">{totals.setupGrossFormatted}</span>
                    <span className="font-mono text-lg font-bold text-slate-900">{totals.setupFormatted}</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between border-t border-slate-200 pt-3">
                  <span className="text-xs text-slate-500">{language === "en" ? "Monthly Recurrence (15% OFF):" : language === "es" ? "Mensualidad Unificada (15% OFF):" : "Recorrência Mensal (15% OFF):"}</span>
                  <div className="text-right">
                    <span className="font-mono text-xs text-slate-400 line-through mr-2">{totals.monthlyGrossFormatted}{language === "en" ? "/mo" : language === "es" ? "/mes" : "/mês"}</span>
                    <span className="font-mono text-xl font-bold text-blue-600">{totals.monthlyFormatted}<span className="text-xs text-slate-500 font-normal">{language === "en" ? "/mo" : language === "es" ? "/mes" : "/mês"}</span></span>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-700 font-medium pt-1">
                  {language === "en"
                    ? `Save ${totals.setupSavedFormatted} on setup + ${totals.monthlySavedFormatted}/mo.`
                    : language === "es"
                    ? `Ahorro de ${totals.setupSavedFormatted} en setup + ${totals.monthlySavedFormatted}/mes.`
                    : `Economia de ${totals.setupSavedFormatted} no setup + ${totals.monthlySavedFormatted}/mês.`}
                </p>
              </div>

              <div className="mt-6">
                <a
                  href={waLink(packageMessage(language))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-[#2563EB] px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8] cursor-pointer text-center"
                >
                  <span>{language === "en" ? "Secure Full Package on WhatsApp" : language === "es" ? "Garantizar Paquete Completo en WhatsApp" : "Garantir Pacote Completo no WhatsApp"}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
