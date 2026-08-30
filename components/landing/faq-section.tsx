"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "Posso começar apenas com um serviço e adicionar outros depois?",
    a: "Sim, a estrutura da ViraWeb é 100% modular. Você pode iniciar contratando apenas o Website, o Google Meu Negócio ou o ViraBot, e adicionar outros módulos conforme a necessidade de escala da sua empresa.",
  },
  {
    q: "A verba dos anúncios do Tráfego Pago já está inclusa na mensalidade?",
    a: "A mensalidade cobre toda a criação, gestão diária, testes de anúncios, estratégia e otimização contínua das suas campanhas pela ViraWeb. A verba investida diretamente no Google Ads e Meta Ads é definida por você conforme o seu orçamento.",
  },
  {
    q: "Como funciona o desenvolvimento de um sistema personalizado do zero?",
    a: "Fazemos uma reunião inicial de diagnóstico estratégico para mapear todas as regras de negócio da sua empresa. Em seguida, desenhamos a arquitetura de software, entregamos um protótipo navegável para validação e desenvolvemos o sistema em Next.js com banco de dados rápido.",
  },
  {
    q: "Quanto tempo leva para colocar o Pacote ViraWeb no ar?",
    a: "Em média, entregamos a estrutura completa do Pacote ViraWeb (Website, Google Meu Negócio, criativos de tráfego e ViraBot ativo) em 10 a 15 dias úteis após a etapa de alinhamento.",
  },
  {
    q: "O site, domínio e código-fonte serão meus?",
    a: "Sim, 100% seus! Você possui propriedade total sobre o código-fonte, domínio, chaves de acesso e banco de dados criados para a sua empresa.",
  },
  {
    q: "Como o ViraBot atua no WhatsApp comercial?",
    a: "O ViraBot responde mensagens instantaneamente 24h por dia. Ele qualifica a necessidade do cliente, tira dúvidas sobre seus serviços e direciona para o agendamento de atendimentos ou para sua equipe humana.",
  },
]

export function LandingFaq() {
  const reduce = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section id="faq" className="relative isolate overflow-hidden bg-white border-b border-[#E2E8F0] px-4 py-20 md:px-8 md:py-28 text-slate-900 select-none">
      <div className="mx-auto max-w-[900px] relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-[#2563EB] mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl md:text-5xl leading-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-base text-slate-600 font-medium">
            Tudo o que você precisa saber sobre o Pacote ViraWeb e nossos Sistemas Sob Medida.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] transition-colors duration-300 hover:border-blue-300"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left cursor-pointer"
                >
                  <span className="text-base font-bold text-[#0F172A] sm:text-lg">
                    {faq.q}
                  </span>
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200/60 transition-transform duration-300", isOpen && "rotate-180 bg-blue-100 text-[#2563EB]")}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="border-t border-[#E2E8F0] px-6 pb-6 pt-3 text-sm leading-relaxed text-slate-600 font-medium">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
