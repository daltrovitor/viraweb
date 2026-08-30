"use client"

import { Cpu, DollarSign, Package, Users, Layers, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { engineeringMessage, waLink } from "@/lib/pricing"

const solutions = [
  {
    title: "1. Gestão Financeira & Faturamento",
    desc: "Controle de fluxo de caixa em tempo real, emissão de boletos e Pix automático com split, relatórios DRE e DAF sem planilhas.",
    icon: DollarSign,
    tag: "Financeiro & ERP",
  },
  {
    title: "2. Controle de Estoque & Logística",
    desc: "Gestão de insumos, registros de entradas e saídas, alertas automáticos de ruptura de estoque e integração com fornecedores.",
    icon: Package,
    tag: "Estoque & Suprimentos",
  },
  {
    title: "3. Gestão de Equipe & Prontuários/Ponto",
    desc: "Painéis administrativos completos, controle de acesso por níveis de permissão, prontuários digitais e relatórios operacionais.",
    icon: Users,
    tag: "Operacional & RH",
  },
  {
    title: "4. Plataformas SaaS & WebGL/3D",
    desc: "Criação de produtos digitais completos e plataformas sob medida para monetização recorrente, escaláveis na nuvem.",
    icon: Layers,
    tag: "SaaS & Produtos Digitais",
  },
]

export function LandingEngineering() {
  const reduce = useReducedMotion()

  return (
    <section id="sistemas" className="relative isolate overflow-hidden bg-white border-b border-[#E2E8F0] px-4 py-20 md:px-8 md:py-28 text-slate-900 select-none">
      {/* Blueprint grid lines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[25%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute top-[75%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[30%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[70%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
      </div>

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
            <Cpu className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Engineering Hub</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl md:text-5xl leading-tight">
            Sua operação precisa de mais do que um site? Criamos o seu sistema sob medida do zero.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475569] md:text-lg font-medium">
            De ERPs complexos a plataformas SaaS: desenvolvemos arquitetura de software escalável, segura e intuitiva.
          </p>
        </motion.div>

        {/* Custom Solutions Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:bg-white"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-bold tracking-tight text-[#0F172A]">
                    {item.title}
                  </h3>
                  <span className="mt-2 inline-block rounded-full bg-blue-100/70 px-2.5 py-0.5 text-[10px] font-bold text-[#2563EB]">
                    {item.tag}
                  </span>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500 font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Section CTA Banner */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50/80 via-white to-slate-50 p-8 shadow-lg sm:flex-row md:p-10"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <h3 className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">
              Pronto para construir o seu software exclusivo?
            </h3>
            <p className="mt-2 text-xs text-slate-600 sm:text-sm font-medium">
              Agende uma reunião estratégica com nossos arquitetos de software para alinhar as regras do seu negócio.
            </p>
          </div>
          <a
            href={waLink(engineeringMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm px-7 py-4 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
          >
            <span>Agendar Reunião Técnica de Engenharia</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
