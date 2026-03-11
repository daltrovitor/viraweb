"use client"

import { motion } from "framer-motion"
import ScrollAnimate from "./scroll-animate"

const stats = [
  { value: "300%", label: "Aumento em conversões", accent: "#3396d3" },
  { value: "20%", label: "OFF no primeiro serviço", accent: "#ffd400" },
  { value: "5 anos", label: "De experiência", accent: "#3396d3" },
  { value: "98%", label: "Taxa de satisfação", accent: "#ffd400" },
]

export function Stats() {
  return (
    <section className="relative py-0 overflow-hidden">
      {/* Barra diagonal contínua — conecta com a hero */}
      <div className="relative bg-[#f7f9fc]">
        {/* Stripe amarelo decorativo */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffd400] to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {stats.map((stat, i) => (
              <ScrollAnimate key={i} delay={i * 0.08}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative text-center py-8 px-4 group"
                >
                  {/* Linha vertical separadora (exceto o primeiro) */}
                  {i > 0 && (
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-[#1a2e4a]/10 hidden lg:block" />
                  )}

                  {/* Número grande */}
                  <motion.p
                    className="text-4xl md:text-5xl font-black mb-2"
                    style={{ color: stat.accent }}
                  >
                    {stat.value}
                  </motion.p>

                  {/* Linha acentuada */}
                  <div
                    className="w-8 h-[3px] rounded-full mx-auto mb-3 opacity-40"
                    style={{ backgroundColor: stat.accent }}
                  />

                  <p className="text-sm font-medium text-[#4b5563]">{stat.label}</p>
                </motion.div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
