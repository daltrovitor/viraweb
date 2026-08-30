"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowRight, Sparkles, ArrowUpRight, ShieldCheck, Zap, Bot, Code2 } from "lucide-react"
import { HeroShowcase } from "./hero-showcase"
import LogoWall from "@/components/logo-wall"
import { specialistMessage, waLink } from "@/lib/pricing"

export function LandingHero() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.1 } })

      tl.fromTo(".landing-hero-badge", { opacity: 0, y: -20 }, { opacity: 1, y: 0, delay: 0.1 })
        .fromTo(
          ".landing-hero-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0 },
          "-=0.9"
        )
        .fromTo(
          ".landing-hero-subtext",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          "-=0.8"
        )
        .fromTo(
          ".landing-hero-ctas",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          "-=0.8"
        )
        .fromTo(
          ".landing-hero-trust",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          "-=0.7"
        )
        .fromTo(
          ".landing-hero-visual",
          { opacity: 0, scale: 0.96, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2 },
          "-=1.0"
        )
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        id="hero"
        className="relative min-h-[90dvh] flex items-center justify-center pt-32 pb-16 overflow-hidden bg-white text-slate-900"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1000px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%)]" />
          <div className="absolute top-1/3 right-0 h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(6,182,212,0.06),transparent_65%)]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
          <div
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start text-left select-none">
              {/* Badge */}
              <div className="landing-hero-badge inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-4 py-1.5 text-xs font-bold text-[#2563EB] mb-6 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
                <span>PACOTE VIRAWEB • ESTRUTURA TURN-KEY COMPLETA</span>
              </div>

              {/* Main Headline */}
              <h1 className="landing-hero-title text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] text-[#0F172A] mb-6">
                Sua Empresa Dominando a Internet:{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#06B6D4] font-black pb-1">
                  Do Topo do Google ao Atendimento Automático no WhatsApp.
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="landing-hero-subtext text-base sm:text-lg text-slate-600 leading-relaxed max-w-[52ch] font-medium mb-8">
                Adquira o <strong className="text-[#2563EB] font-bold">Pacote ViraWeb</strong> completo ou monte um plano sob medida para o seu momento.
              </p>

              {/* Action CTAs */}
              <div className="landing-hero-ctas flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                <a
                  href="#simulador"
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm md:text-base px-7 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.97] flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <span>Monte Seu Plano Personalizado</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={waLink(specialistMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-slate-200 hover:border-slate-800 bg-white/90 backdrop-blur text-[#0F172A] font-bold text-sm md:text-base px-7 py-4 rounded-xl transition-all text-center active:scale-[0.97] flex items-center justify-center gap-2 group cursor-pointer shadow-xs"
                >
                  <span>Falar com Especialista via WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#2563EB]" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="landing-hero-trust flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-emerald-500" />
                  <span>Entrega em 10-15 dias</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  <span>Código 100% seu</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Code2 className="h-4 w-4 text-blue-600" />
                  <span>Next.js & IA Nativa</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bot className="h-4 w-4 text-cyan-600" />
                  <span>WhatsApp 24/7</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Interactive Live Hero Showcase) */}
            <div className="landing-hero-visual lg:col-span-6 relative w-full flex justify-center">
              <HeroShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Logo Wall Section */}
      <LogoWall />
    </>
  )
}
