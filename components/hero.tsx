"use client"

import { ArrowRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import ScrollAnimate from "./scroll-animate"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
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

import dynamic from "next/dynamic"

const CursorGlow = dynamic(() => import("./hero").then(mod => ({ default: () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handleMove = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true) }
    const handleLeave = () => setVisible(false)
    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseleave", handleLeave)
    return () => { window.removeEventListener("mousemove", handleMove); window.removeEventListener("mouseleave", handleLeave) }
  }, [])
  if (!visible) return null
  return (
    <div
      className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full opacity-20 mix-blend-multiply"
      style={{
        background: "radial-gradient(circle, #3396d3 0%, transparent 70%)",
        left: pos.x - 300,
        top: pos.y - 300,
        transition: "left 0.15s ease, top 0.15s ease",
      }}
    />
  )
}})), { ssr: false })

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
}: {
  src: string
  alt: string
  url: string
  label: string
  delay?: number
  className?: string
  rotate?: number
  isLCP?: boolean
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
          fetchPriority={isLCP ? "high" : "auto"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1080px"
          loading={isLCP ? "eager" : "lazy"}
          decoding="sync"
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
      <CursorGlow />

      {/* ═══════════════ HERO PRINCIPAL ═══════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f7f9fc]">
        {/* ── Fundo geométrico inspirado na logo V ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Diagonal cortada */}
          <div
            className="absolute top-0 right-0 w-[55%] h-full bg-[#1a2e4a] origin-top-right"
            style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
          {/* Linha amarela diagonal */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="absolute top-0 right-[44%] w-[6px] h-full bg-gradient-to-b from-[#ffd400] via-[#ffd400] to-transparent origin-top"
            style={{ transform: "rotate(-8deg)" }}
          />
          {/* Favicons flutuantes substituindo os vzinhos */}
          <div 
            className="absolute top-20 left-[8%] opacity-30 w-16 md:w-20"
          >
            <Image src="/favicon.png" alt="" width={80} height={80} className="w-full h-auto brightness-0" sizes="80px" />
          </div>
          <div 
            className="absolute bottom-32 right-[15%] opacity-10 w-24 md:w-32"
          >
            <Image src="/favicon.png" alt="" width={120} height={120} className="w-full h-auto brightness-0 invert" sizes="120px" />
          </div>
          <ArrowPattern className="absolute top-[15%] right-[20%] w-48 text-white" />
          <ArrowPattern className="absolute bottom-[20%] left-[5%] w-36 text-[#3396d3]" />
          {/* Dots grid */}
          <div
            className="absolute top-0 left-0 w-[50%] h-full opacity-[0.03]"
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

                <h1 className="text-[2.5rem] md:text-[3.2rem] lg:text-[3.8rem] font-black leading-[1.05] text-[#1a2e4a] mb-6">
                  {t("hero.title1")}{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">{t("hero.title2")}</span>
                    <span className="absolute bottom-1 left-0 w-full h-[14px] bg-[#ffd400]/50 -z-0 rounded-sm" />
                  </span>
                  <br />
                  {t("hero.title3")}
                  <br />
                  <span className="text-[#3396d3]">{t("hero.title4")}</span>
                </h1>

                <p className="text-base md:text-lg text-[#4b5563] max-w-md mb-10 leading-relaxed">
                  {t("hero.subtitle")}
                </p>

                {/* CTAs */}
                <div className="flex items-center gap-4">
                  <a href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative cursor-pointer overflow-hidden bg-[#1a2e4a] text-white font-bold text-sm px-8 py-4 rounded-lg group transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {t("hero.cta")}
                        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-[#ffd400] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-[#1a2e4a] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {t("hero.cta")}
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </motion.button>
                  </a>
                  <a href="#servicos" className="text-[#1a2e4a] font-semibold text-sm hover:text-[#1a2e4a] transition-colors flex items-center gap-1 group">
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
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    >
                      <p className="text-2xl font-black text-[#1a2e4a]">{s.num}</p>
                      <p className="text-xs text-[#4b5563] font-medium">{s.label}</p>
                    </motion.div>
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
                  rotate={1}
                  isLCP={true}
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

                {/* Connector entre os cards */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute top-[52%] right-[30%] flex flex-col items-center z-30"
                >
                  <div className="w-px h-6 bg-[#ffd400]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffd400]" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SEÇÃO G.D.C. ═══════════════ */}
      <section className="relative bg-[#1a2e4a] overflow-hidden">
        {/* Textura geométrica */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#ffd400 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-4 md:-right-10 opacity-10 w-40 md:w-64"
          >
            <Image src="/favicon.png" alt="" width={200} height={200} className="w-full h-auto brightness-0 invert" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-10 left-[8%] opacity-20 w-24 md:w-40"
          >
            <Image src="/favicon.png" alt="" width={150} height={150} className="w-full h-auto brightness-0" />
          </motion.div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* GDC Mockup */}
            <ScrollAnimate delay={0.1}>
              <div className="relative">
                <div className="absolute -inset-8 bg-[#3396d3]/10 rounded-3xl blur-3xl" />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/5"
                >
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1923] border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="bg-[#1a2e4a] rounded-md px-6 py-1.5 text-xs text-gray-400 max-w-xs w-full text-center font-mono border border-white/5">
                        gdc.viraweb.online
                      </div>
                    </div>
                  </div>
                  <Image
                    src="/gdc-real.png"
                    alt="Painel G.D.C. da ViraWeb em ação"
                    width={1200}
                    height={675}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-auto block"
                  />
                </motion.div>

                {/* Floating notification */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-xl px-5 py-3.5 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1a2e4a]">Site atualizado!</p>
                      <p className="text-[11px] text-gray-400">Publicado agora mesmo</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </ScrollAnimate>

            {/* Conteúdo texto */}
            <ScrollAnimate delay={0.2}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="w-8 h-[3px] bg-[#ffd400] rounded-full" />
                  <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#ffd400]">
                    {t("gdc.exclusive")}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] font-black text-white leading-tight mb-6">
                  {t("gdc.title")}
                </h2>

                <p className="text-base text-gray-400 mb-10 leading-relaxed max-w-md">
                  {t("gdc.description")}
                </p>

                {/* Features 2x2 */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {[
                    { icon: "👥", title: t("gdc.feature1.title"), desc: t("gdc.feature1.desc") },
                    { icon: "💰", title: t("gdc.feature2.title"), desc: t("gdc.feature2.desc") },
                    { icon: "📊", title: t("gdc.feature3.title"), desc: t("gdc.feature3.desc") },
                    { icon: "🤖", title: t("gdc.feature4.title"), desc: t("gdc.feature4.desc") },
                  ].map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-[#ffd400]/30 transition-colors group"
                    >
                      <span className="text-2xl block mb-2">{f.icon}</span>
                      <p className="text-sm font-bold text-white mb-0.5">{f.title}</p>
                      <p className="text-xs text-gray-500">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <a href="https://gdc.viraweb.online/" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer bg-[#ffd400] text-[#1a2e4a] font-black text-sm px-8 py-4 rounded-lg inline-flex items-center gap-2 group hover:shadow-lg hover:shadow-[#ffd400]/20 transition-all duration-300"
                  >
                    {t("gdc.cta")}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </a>
              </motion.div>
            </ScrollAnimate>
          </div>
        </div>
      </section>
    </>
  )
}
