"use client"

import { motion } from "framer-motion"
import ScrollAnimate from "./scroll-animate"
import { Users, FileText, BarChart3, Upload, Bot, UserCog } from "lucide-react"

const gdcFeatures = [
  {
    icon: Users,
    title: "Gestão de Clientes",
    description:
      "Mantenha o histórico completo, prontuários precisos e o controle de todos os agendamentos amarrados individualmente na ficha de cada cliente do seu negócio.",
    color: "#3396d3",
  },
  {
    icon: FileText,
    title: "Financeiro Integrado",
    description:
      "Controle as suas entradas a receber, pagamentos parcelados, descontos e acesse um fluxo de caixa detalhado gerado automaticamente com imensa precisão num piscar de olhos.",
    color: "#3396d3",
  },
  {
    icon: BarChart3,
    title: "Relatórios e Visão",
    description:
      "Dashboards analíticos absurdamente elegantes que te dizem a verdade sobre a saúde da sua empresa: acompanhe faturamento real, ticket médio mensal e taxas de retenção.",
    color: "#3396d3",
  },
  {
    icon: Upload,
    title: "Importação Mágica",
    description:
      "Esqueça perder dias passando dados antigos. Nossa IA lê PDFs massivos e planilhas esquecidas para preencher todo o seu sistema online num processo de menos de 2 segundos.",
    color: "#3396d3",
  },
  {
    icon: Bot,
    title: "ViraBot IA",
    description:
      "Sua operação ganha uma Inteligência Artificial exclusiva que funciona 24h para extrair informações que passaram despercebidas, organizar registros complexos e te mostrar insights.",
    color: "#3396d3",
  },
  {
    icon: UserCog,
    title: "Módulo Profissionais",
    description:
      "Alinhe diretamente as agendas da sua operação, configure permissões rigorosas de acessos por tela, e programe fluxos de pagamentos ou comissões individuais para sua equipe.",
    color: "#3396d3",
  },
]

export function GDCFeatures() {
  return (
    <section id="gdc-features" className="relative bg-[#f7f9fc] overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(#1a2e4a 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Linhas decorativas diagonais */}
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.03]"
          style={{
            background: "linear-gradient(135deg, #3396d3 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] opacity-[0.03]"
          style={{
            background: "linear-gradient(315deg, #ffd400 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Texto introdutório centralizado */}
        <ScrollAnimate delay={0}>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-[3px] bg-[#ffd400] rounded-full" />
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#1a2e4a]/60">
                9 funcionalidades
              </span>
              <span className="w-8 h-[3px] bg-[#ffd400] rounded-full" />
            </div>

            <p className="text-base md:text-lg text-[#4b5563] leading-relaxed">
              Nosso{" "}
              <strong className="text-[#1a2e4a] font-black underline decoration-[#ffd400] decoration-[3px] underline-offset-4">
                Gestor de Clientes (GDC)
              </strong>{" "}
              é muito mais do que um simples painel de controle. Ele é o verdadeiro motor central,
              criado com todas as 9 funcionalidades que você precisa para controlar processos manuais
              hoje. O GDC abraça todo o seu ecossistema: desde o tratamento e agendamento contínuo, o
              braço financeiro que garante tudo no fim do mês, até as métricas diárias essenciais, e
              integra tudo isso em uma Inteligência Artificial avançada. Incrivelmente fácil de mexer.
            </p>
          </div>
        </ScrollAnimate>

        {/* Grid 3x2 de features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {gdcFeatures.map((feature, i) => (
            <ScrollAnimate key={i} delay={i * 0.06}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group h-full"
              >
                <div className="relative bg-white rounded-2xl p-8 border border-[#1a2e4a]/[0.06] hover:border-[#3396d3]/20 transition-all duration-500 h-full flex flex-col hover:shadow-xl hover:shadow-[#3396d3]/[0.04]">
                  {/* Glow sutil no hover */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#3396d3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl" />

                  {/* Ícone */}
                  <div className="relative z-10 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#e8f4fb] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-[#3396d3]" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="relative z-10 text-lg font-black text-[#1a2e4a] mb-3">
                    {feature.title}
                  </h3>

                  {/* Descrição */}
                  <p className="relative z-10 text-sm text-[#4b5563] leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  )
}
