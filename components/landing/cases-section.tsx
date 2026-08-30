"use client"

import { Star, ShieldCheck, Zap, MessageSquare, TrendingUp, Award } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

const metrics = [
  {
    label: "Performance Google",
    value: "100/100",
    desc: "Nota máxima no Lighthouse com Next.js",
    icon: Zap,
  },
  {
    label: "Conversão de Leads",
    value: "3x Mais",
    desc: "Aumento médio em novos contatos de clientes",
    icon: TrendingUp,
  },
  {
    label: "Mensagens & Vendas",
    value: "24/7",
    desc: "Atendimento imediato pelo ViraBot WhatsApp",
    icon: MessageSquare,
  },
  {
    label: "Satisfação & Retenção",
    value: "99.4%",
    desc: "Aprovação de clientes e parceiros operacionais",
    icon: Award,
  },
]

const testimonials = [
  {
    name: "Dr. Marcelo Ramos",
    role: "Diretor da Clínica Aurora",
    body: "Após implementarmos o Pacote ViraWeb completo com o ViraBot, nossa agenda semanal passou a lotar direto pelo WhatsApp sem precisar de secretária manual.",
    metric: "+210% em agendamentos",
  },
  {
    name: "Beatriz Lopes",
    role: "Fundadora da Lopes Consultoria",
    body: "O site carrega instantaneamente no celular e nossa ficha no Google Meu Negócio ficou em 1º lugar no mapa da nossa cidade em menos de 3 semanas.",
    metric: "1º lugar no Google Mapa",
  },
  {
    name: "Arthur K.",
    role: "CTO de Operações PME",
    body: "Código limpo, arquitetura impecável e zero lentidão. O sistema sob medida que desenvolveram eliminou planilhas e economizou 15 horas semanais da equipe.",
    metric: "15h economizadas/semana",
  },
]

export function LandingSocialProof() {
  const reduce = useReducedMotion()

  return (
    <section id="cases" className="relative isolate overflow-hidden bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-20 md:px-8 md:py-28 text-slate-900 select-none">
      <div className="mx-auto max-w-[1200px] relative z-10">
        {/* Section Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-[#2563EB] mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Resultados Comprovados</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl md:text-5xl leading-tight">
            Engenharia de Resultados & ROI Real
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg font-medium">
            Veja as métricas de performance e o depoimento de marcas que escalaram suas vendas com a ViraWeb.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-blue-300"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-6 font-mono text-3xl font-black text-[#2563EB]">
                    {item.value}
                  </div>
                  <h3 className="mt-1 text-sm font-bold tracking-tight text-[#0F172A]">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Testimonials Cards Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-blue-300"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-slate-600 font-medium italic">
                  "{t.body}"
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">{t.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{t.role}</p>
                </div>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-[#2563EB] border border-blue-200">
                  {t.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
