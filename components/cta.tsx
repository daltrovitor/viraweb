"use client"

import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import ScrollAnimate from "./scroll-animate"

export function CTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Fundo diagonal — navy com corte geométrico */}
      <div className="relative bg-[#1a2e4a]">
        {/* Linha amarela no topo */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffd400] to-transparent" />

        {/* Textura dots */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffd400 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* V geométrico grande */}
        <svg className="absolute -bottom-10 right-[10%] w-56 text-white opacity-[0.03] pointer-events-none" viewBox="0 0 120 140" fill="none">
          <path d="M60 140L10 40L35 40L60 95L85 40L110 40L60 140Z" fill="currentColor" />
        </svg>

        {/* Linha amarela vertical */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "60%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute right-[20%] top-[20%] w-[4px] bg-gradient-to-b from-[#ffd400] to-transparent rounded-full pointer-events-none"
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <ScrollAnimate>
            <div className="max-w-3xl">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-[3px] bg-[#ffd400] rounded-full" />
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#ffd400]">
                  Vamos conversar
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[3.2rem] font-black text-white leading-tight mb-6">
                Pronto para ter um
                <br />
                site{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#ffd400]">profissional</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="absolute bottom-1 left-0 right-0 h-3 bg-[#ffd400]/20 -z-0 origin-left rounded-sm"
                  />
                </span>
                ?
              </h2>

              <p className="text-base md:text-lg text-gray-400 max-w-lg mb-10 leading-relaxed">
                Entre em contato pelo WhatsApp e descubra como podemos 
                transformar sua presença digital em resultados reais.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative cursor-pointer overflow-hidden bg-[#ffd400] text-[#1a2e4a] font-black text-sm px-10 py-5 rounded-xl group transition-all duration-300 shadow-lg shadow-[#ffd400]/20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Falar no WhatsApp
                      <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </motion.button>
                </a>
                <a href="#servicos" className="text-gray-400 hover:text-white font-semibold text-sm transition-colors flex items-center gap-1 py-5 group">
                  Ou veja nossos serviços
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Prova social rápida */}
              <div className="flex items-center gap-6 mt-14 pt-8 border-t border-white/10">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-[#1a2e4a] flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: i % 2 === 0 ? "#3396d3" : "#ffd400",
                        color: i % 2 === 0 ? "white" : "#1a2e4a",
                      }}
                    >
                      {["V", "M", "A", "R"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">+50 clientes satisfeitos</p>
                  <p className="text-xs text-gray-500">Empresas que já cresceram com a ViraWeb</p>
                </div>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}