"use client"

import { ArrowRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n"

/* GeoV removido conforme solicitação */

/* ─────────────── Arrow Pattern ─────────────── */
function ArrowPattern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M40 160L160 40M160 40H80M160 40V120" stroke="currentColor" strokeWidth="2" opacity="0.06" />
      <path d="M20 180L140 60M140 60H70M140 60V130" stroke="currentColor" strokeWidth="1.5" opacity="0.04" />
    </svg>
  )
}

/* ─────────────── Site Showcase Card ─────────────── */
function SiteCard({
  src,
  alt,
  url,
  label,
  delay = 0,
  className = "",
  rotate = 0,
  isLCP = false,
  quality = 75,
}: {
  src: string
  alt: string
  url: string
  label: string
  delay?: number
  className?: string
  rotate?: number
  isLCP?: boolean
  quality?: number
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0f1923]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-[#1a2e4a] rounded-md px-4 py-1 text-[10px] text-gray-400 max-w-[200px] w-full text-center font-mono">
              {url}
            </div>
          </div>
        </div>
        <Image
          src={src}
          alt={alt}
          width={1080}
          height={607}
          className="w-full h-auto block"
          priority={isLCP}
          quality={quality}
          sizes="(max-width: 768px) 95vw, (max-width: 1200px) 60vw, 700px"
          fetchPriority={isLCP ? "high" : "auto"}
          decoding={isLCP ? "sync" : "async"}
        />
      </div>
      {/* Label */}
      <div
        className="absolute -bottom-3 -left-3 bg-[#ffd400] text-[#1a2e4a] font-black text-[11px] px-3 py-1.5 rounded-lg shadow-lg"
      >
        {label}
      </div>
    </div>
  )
}

export function Hero() {
  const { t } = useTranslation()
  return (
    <>
      {/* ═══════════════ HERO PRINCIPAL ═══════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f7f9fc]">
        {/* ── Fundo geométrico inspirado na logo V ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Diagonal cortada — REFEITA: Oculta no mobile para não cortar o texto, ativa apenas em telas maiores */}
          <div
            className="hidden md:block absolute top-0 right-0 w-[45%] lg:w-[55%] h-full bg-[#1a2e4a] origin-top-right transition-all duration-700"
            style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
          {/* Linha amarela diagonal — Oculta no mobile */}
          <div
            className="hidden md:block absolute top-0 right-[38%] lg:right-[44%] w-[6px] h-full bg-gradient-to-b from-[#ffd400] via-[#ffd400] to-transparent origin-top transition-all duration-700"
            style={{ transform: "rotate(-8deg)" }}
          />
          
          {/* Fundo sutil para mobile para manter o estilo premium sem prejudicar a leitura */}
          <div className="md:hidden absolute bottom-0 left-0 right-0 h-1/3 bg-[#1a2e4a]" style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0% 100%)" }} />

          {/* Ornatos de Marca — Mais sutis e nítidos */}
          <div className="absolute top-16 left-[5%] opacity-[0.05] md:opacity-[0.08] w-20 md:w-40">
            <Image src="/viraweb3.png" alt="" width={160} height={160} sizes="160px" quality={30} loading="lazy" className="w-full h-auto brightness-0" />
          </div>
          <div className="absolute bottom-12 right-[5%] opacity-[0.03] md:opacity-[0.05] w-32 md:w-64">
            <Image src="/viraweb3.png" alt="" width={256} height={256} sizes="256px" quality={30} loading="lazy" className="w-full h-auto brightness-0 invert" />
          </div>

          <ArrowPattern className="absolute top-[15%] right-[5%] md:right-[20%] w-32 md:w-48 text-white opacity-[0.08] md:opacity-20" />
          <ArrowPattern className="absolute bottom-[20%] left-[2%] md:left-[8%] w-24 md:w-40 text-[#3396d3] opacity-[0.08] md:opacity-20" />
          
          {/* Dots grid */}
          <div
            className="absolute top-0 left-0 w-full md:w-[50%] h-full opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#1a2e4a 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* ── Conteúdo ── */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            {/* ▌ ESQUERDO — Texto */}
            <div className="lg:col-span-5 relative">
              <div className="relative">
                <div
                  className="inline-flex items-center gap-2 mb-8"
                >
                  <span className="w-8 h-[3px] bg-[#ffd400] rounded-full" />
                  <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#1a2e4a]/60">
                    {t("hero.badge")}
                  </span>
                </div>

                <h1 className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.8rem] font-black leading-[1.1] text-[#1a2e4a] mb-6">
                  {t("hero.title1")}{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">{t("hero.title2")}</span>
                    <span className="absolute bottom-1 left-0 w-full h-[8px] md:h-[14px] bg-[#ffd400]/50 -z-0 rounded-sm" />
                  </span>
                  <br />
                  {t("hero.title3")}
                  <br />
                  <span className="text-[#3396d3]">{t("hero.title4")}</span>
                </h1>

                <p className="text-base md:text-lg text-[#374151] max-w-md mb-10 leading-relaxed">
                  {t("hero.subtitle")}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <a href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!" className="w-full sm:w-auto">
                    <button
                      className="relative w-full cursor-pointer overflow-hidden bg-[#1a2e4a] text-white font-bold text-sm px-8 py-4 rounded-lg group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {t("hero.cta")}
                        <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-[#ffd400] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-[#1a2e4a] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {t("hero.cta")}
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </button>
                  </a>
                  <a href="#servicos" className="text-[#1a2e4a] font-bold text-sm hover:text-black transition-colors flex items-center gap-1.5 group py-2">
                    {t("hero.view_services")}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Stats inline */}
                <div className="flex items-center text-black gap-8 mt-12 pt-8 border-t border-[#1a2e4a]/10">
                  {[
                    { num: "50+", label: t("hero.stats.sites") },
                    { num: "98%", label: t("hero.stats.satisfaction") },
                    { num: "7d", label: t("hero.stats.time") },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="text-2xl font-black text-[#1a2e4a]">{s.num}</p>
                      <p className="text-xs text-[#374151] font-medium">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ▌ DIREITO — Showcase de sites reais */}
            <div className="lg:col-span-7 relative">
              <div className="relative">
                {/* Card principal — Marcelo Daltro */}
                <SiteCard
                  src="/site-marcelo.png"
                  alt="Site Marcelo Daltro — criado pela ViraWeb"
                  url="marcelodaltro.com.br"
                  label="✦ Feito pela ViraWeb"
                  delay={0}
                  rotate={0}
                  isLCP={true}
                  quality={75}
                  className="z-20 ml-auto max-w-[540px]"
                />

                {/* Card secundário — Librás (sobreposto) */}
                <SiteCard
                  src="/site-libras.png"
                  alt="Site Librás — criado pela ViraWeb"
                  url="libraslixas.com.br"
                  label="✦ Projeto ViraWeb"
                  delay={0.3}
                  rotate={-2}
                  className="z-10 -mt-16 mr-auto max-w-[420px]"
                />

                {/* Connector entre os cards - removed animation to prioritize LCP */}
                <div className="hidden sm:flex absolute top-[52%] right-[30%] flex-col items-center z-30 opacity-60">
                  <div className="w-px h-6 bg-[#ffd400]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffd400]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

