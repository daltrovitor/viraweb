"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { specialistMessage, waLink } from "@/lib/pricing"

export function LandingHero() {
  const { language } = useTranslation()
  const contentRef = useRef<HTMLDivElement>(null)

  const specs = [
    {
      num: "01",
      title: language === "en" ? "Website & Landing Page" : language === "es" ? "Sitio Web y Landing Page" : "Website & Landing Page",
      tech: "Next.js / Tailwind CSS",
      detail: language === "en"
        ? "Ultra-fast load time, native technical SEO, and 100% proprietary code."
        : language === "es"
        ? "Carga ultra-rápida, SEO técnico nativo y código 100% propietario."
        : "Carregamento ultra-rápido, SEO técnico e código 100% proprietário.",
    },
    {
      num: "02",
      title: language === "en" ? "Google Business & Local SEO" : language === "es" ? "Google Mi Negocio y SEO Local" : "Google Meu Negócio & SEO Local",
      tech: "Google Maps / Local SEO",
      detail: language === "en"
        ? "Profile optimized to dominate searches and Maps in your region."
        : language === "es"
        ? "Perfil optimizado para dominar las búsquedas y Maps en su región."
        : "Ficha otimizada para dominar as buscas da sua região geográfica.",
    },
    {
      num: "03",
      title: language === "en" ? "Paid Media Management" : language === "es" ? "Gestión de Tráfico Pago" : "Gestão de Tráfego Pago",
      tech: "Google Ads / Meta Ads",
      detail: language === "en"
        ? "Active campaigns focused on continuously lowering cost per lead."
        : language === "es"
        ? "Campañas activas enfocadas en reducir el costo por lead."
        : "Campanhas ativas com foco contínuo em redução do custo por lead.",
    },
    {
      num: "04",
      title: "ViraBot WhatsApp",
      tech: language === "en" ? "24/7 Sales Automation" : language === "es" ? "Automatización Comercial 24/7" : "Automação Comercial 24/7",
      detail: language === "en"
        ? "Instant response, FAQ answering, and automated scheduling."
        : language === "es"
        ? "Atención inmediata, resolución de dudas y agendamiento automático."
        : "Atendimento imediato, resposta a dúvidas e agendamento automático.",
    },
  ]

  useEffect(() => {
    if (!contentRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } })

      tl.fromTo(".landing-hero-eyebrow", { opacity: 0, y: -10 }, { opacity: 1, y: 0 })
        .fromTo(
          ".landing-hero-title",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          "-=0.7"
        )
        .fromTo(
          ".landing-hero-subtext",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          "-=0.7"
        )
        .fromTo(
          ".landing-hero-ctas",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          "-=0.7"
        )
        .fromTo(
          ".landing-hero-panel",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.8"
        )
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      className="relative bg-white pt-32 pb-20 lg:pt-36 lg:pb-28 text-slate-900 border-b border-slate-200"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Editorial Eyebrow */}
            <p className="landing-hero-eyebrow text-[12px] font-semibold uppercase tracking-[0.18em] text-blue-600 mb-4">
              {language === "en"
                ? "VIRAWEB PACKAGE • DIGITAL ENGINEERING"
                : language === "es"
                ? "PAQUETE VIRAWEB • INGENIERÍA DIGITAL"
                : "PACOTE VIRAWEB • ENGENHARIA DIGITAL"}
            </p>

            {/* Solid Master Headline */}
            <h1 className="landing-hero-title text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-[1.18] text-slate-950">
              {language === "en"
                ? "Your Company Dominating the Web: From Top Google Rankings to Automated WhatsApp Support."
                : language === "es"
                ? "Su Empresa Dominando Internet: Del Top de Google a la Atención Automática en WhatsApp."
                : "Sua Empresa Dominando a Internet: Do Topo do Google ao Atendimento Automático no WhatsApp."}
            </h1>

            {/* Sub-headline */}
            <p className="landing-hero-subtext text-base sm:text-[17px] text-slate-600 leading-relaxed max-w-[54ch] mt-5 mb-8">
              {language === "en" ? (
                <>Acquire the complete <strong className="font-semibold text-slate-900">ViraWeb Package</strong> or customize a plan tailored to your business stage.</>
              ) : language === "es" ? (
                <>Adquiera el <strong className="font-semibold text-slate-900">Paquete ViraWeb</strong> completo o arme un plan a la medida de su empresa.</>
              ) : (
                <>Adquira o <strong className="font-semibold text-slate-900">Pacote ViraWeb</strong> completo ou monte um plano sob medida para o seu momento.</>
              )}
            </p>

            {/* Solid Structured CTAs */}
            <div className="landing-hero-ctas flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#simulador"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#2563EB] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8] cursor-pointer"
              >
                <span>{language === "en" ? "Customize Your Plan" : language === "es" ? "Arme su Plan Personalizado" : "Monte Seu Plano Personalizado"}</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={waLink(specialistMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-300 bg-white px-6 py-3.5 text-sm font-medium text-slate-900 transition-colors hover:border-slate-900 cursor-pointer"
              >
                <span>{language === "en" ? "Talk to a Specialist via WhatsApp" : language === "es" ? "Hablar con Especialista en WhatsApp" : "Falar com Especialista via WhatsApp"}</span>
                <ArrowUpRight className="h-4 w-4 text-slate-500" />
              </a>
            </div>

            {/* Editorial Key Guarantees */}
            <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              <div>
                <p className="font-mono text-xs font-semibold text-slate-900">{language === "en" ? "10–15 DAYS" : language === "es" ? "10–15 DÍAS" : "10–15 DIAS"}</p>
                <p className="text-[12px] text-slate-500 mt-0.5">{language === "en" ? "Delivery timeline" : language === "es" ? "Plazo de entrega" : "Prazo de entrega"}</p>
              </div>
              <div>
                <p className="font-mono text-xs font-semibold text-slate-900">{language === "en" ? "100% YOURS" : language === "es" ? "100% SUYO" : "100% SEU"}</p>
                <p className="text-[12px] text-slate-500 mt-0.5">{language === "en" ? "Proprietary code" : language === "es" ? "Código propietario" : "Código proprietário"}</p>
              </div>
              <div>
                <p className="font-mono text-xs font-semibold text-slate-900">NEXT.JS + AI</p>
                <p className="text-[12px] text-slate-500 mt-0.5">{language === "en" ? "Modern tech stack" : language === "es" ? "Stack moderno" : "Stack moderna"}</p>
              </div>
              <div>
                <p className="font-mono text-xs font-semibold text-slate-900">24/7 ACTIVE</p>
                <p className="text-[12px] text-slate-500 mt-0.5">{language === "en" ? "WhatsApp support" : language === "es" ? "Atención WhatsApp" : "Atendimento WhatsApp"}</p>
              </div>
            </div>
          </div>

          {/* Right Architectural Solution Panel */}
          <div className="landing-hero-panel lg:col-span-5 w-full">
            <div className="border border-slate-200 bg-slate-50/60 p-6 sm:p-7 rounded-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                  {language === "en" ? "TURN-KEY ARCHITECTURE" : language === "es" ? "ESTRUCTURA TURN-KEY" : "ESTRUTURA TURN-KEY"}
                </span>
                <span className="text-[11px] font-mono font-semibold text-blue-600">
                  {language === "en" ? "4 MODULES" : language === "es" ? "4 MÓDULOS" : "4 MÓDULOS"}
                </span>
              </div>

              <div className="divide-y divide-slate-200">
                {specs.map((item) => (
                  <div key={item.num} className="py-4 first:pt-4 last:pb-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs font-bold text-slate-400">
                          {item.num}
                        </span>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {item.title}
                        </h3>
                      </div>
                      <span className="font-mono text-[11px] text-slate-500 shrink-0">
                        {item.tech}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed pl-6">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">
                  {language === "en" ? "Unified contract" : language === "es" ? "Contratación unificada" : "Contratação unificada"}
                </span>
                <span className="font-semibold text-blue-700">
                  {language === "en" ? "Save up to 25%" : language === "es" ? "Ahorre hasta 25%" : "Economize até 25%"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
