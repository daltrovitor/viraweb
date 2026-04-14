"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import ScrollAnimate from "./scroll-animate"
import { m, LazyMotion } from "framer-motion"
import { useTranslation } from "@/lib/i18n"

const loadFeatures = () => import("../lib/framer-features").then((res) => res.default)

export function HeroGDC() {
  const { t } = useTranslation()
  return (
    <LazyMotion features={loadFeatures}>
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
        <div 
          className="absolute -top-10 -right-4 md:-right-10 opacity-10 w-40 md:w-64"
        >
          <Image src="/favicon.png" alt="" width={200} height={200} className="w-full h-auto brightness-0 invert" />
        </div>
        <div 
          className="absolute bottom-10 left-[8%] opacity-20 w-24 md:w-40"
        >
          <Image src="/favicon.png" alt="" width={150} height={150} className="w-full h-auto brightness-0" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* GDC Mockup */}
          <ScrollAnimate delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-8 bg-[#3396d3]/10 rounded-3xl blur-3xl" />
              <m.div
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
              </m.div>

              {/* Floating notification */}
              <m.div
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
              </m.div>
            </div>
          </ScrollAnimate>

          {/* Conteúdo texto */}
          <ScrollAnimate delay={0.2}>
            <m.div
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
                  <m.div
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
                  </m.div>
                ))}
              </div>

              <a href="https://gdc.viraweb.online/" target="_blank" rel="noopener noreferrer">
                <m.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="cursor-pointer bg-[#ffd400] text-[#1a2e4a] font-black text-sm px-8 py-4 rounded-lg inline-flex items-center gap-2 group hover:shadow-lg hover:shadow-[#ffd400]/20 transition-all duration-300"
                >
                  {t("gdc.cta")}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </m.button>
              </a>
            </m.div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
    </LazyMotion>
  )
}
