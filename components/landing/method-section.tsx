"use client"

import { Rocket, Target, Cpu, TrendingUp } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

const steps = [
  {
    num: "01",
    title: "Diagnóstico & Estratégia",
    desc: "Mapeamos sua região, concorrentes e jornada do cliente para definir a estratégia de atração e conversão.",
    icon: Target,
  },
  {
    num: "02",
    title: "Engenharia & Setup",
    desc: "Desenvolvemos o site em Next.js, configuramos sua ficha no Google Meu Negócio e preparamos os anúncios.",
    icon: Cpu,
  },
  {
    num: "03",
    title: "Ativação do ViraBot",
    desc: "Conectamos a inteligência de atendimento ao seu WhatsApp para responder leads e agendar atendimentos 24/7.",
    icon: Rocket,
  },
  {
    num: "04",
    title: "Escala & Otimização",
    desc: "Ligamos as campanhas de tráfego pago e acompanhamos diariamente as métricas para reduzir o custo por cliente.",
    icon: TrendingUp,
  },
]

export function LandingMethod() {
  const reduce = useReducedMotion()

  return (
    <section id="metodo" className="relative isolate overflow-hidden bg-[#07111f] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#FFD400]">
            Fluxo de Entrega
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#F4F7FB] sm:text-4xl md:text-5xl">
            Como construímos sua máquina de vendas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
            Um método ágil, sem burocracia e focado em colocar sua empresa no topo no menor tempo possível.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#FFD400]/40 hover:bg-white/[0.05]"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-[#FFD400]">
                    {step.num}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-white/80 ring-1 ring-white/10 transition-colors group-hover:bg-[#FFD400]/20 group-hover:text-[#FFD400]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-tight text-[#F4F7FB]">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/55">
                  {step.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
