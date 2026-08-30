"use client"

import { useTranslation } from "@/lib/i18n"

export function LandingSocialProof() {
  const { language } = useTranslation()

  const metrics = [
    {
      value: "100/100",
      label: language === "en" ? "Google Performance" : language === "es" ? "Rendimiento Google" : "Performance Google",
      desc: language === "en"
        ? "Maximum Lighthouse score with Next.js architecture."
        : language === "es"
        ? "Puntuación máxima en Lighthouse con arquitectura Next.js."
        : "Score máximo no Lighthouse com arquitetura Next.js.",
    },
    {
      value: "3×",
      label: language === "en" ? "Lead Conversion" : language === "es" ? "Conversión de Leads" : "Conversão de Leads",
      desc: language === "en"
        ? "Average increase in qualified commercial inquiries."
        : language === "es"
        ? "Incremento promedio en contactos comerciales cualificados."
        : "Aumento médio no volume de contatos comerciais qualificados.",
    },
    {
      value: "24/7",
      label: language === "en" ? "Active Support" : language === "es" ? "Atención Activa" : "Atendimento Ativo",
      desc: language === "en"
        ? "Instant customer response powered by ViraBot on WhatsApp."
        : language === "es"
        ? "Respuesta inmediata a clientes mediante ViraBot en WhatsApp."
        : "Resposta imediata aos clientes pelo ViraBot no WhatsApp.",
    },
    {
      value: "99,4%",
      label: language === "en" ? "Approval Rate" : language === "es" ? "Tasa de Aprobación" : "Taxa de Aprovação",
      desc: language === "en"
        ? "Retention index and satisfaction score from serviced businesses."
        : language === "es"
        ? "Índice de retención y satisfacción de empresas atendidas."
        : "Índice de retenção e satisfação de empresas atendidas.",
    },
  ]

  const testimonials = [
    {
      name: "Dr. Marcelo Ramos",
      role: language === "en" ? "Director • Aurora Clinic" : language === "es" ? "Director • Clínica Aurora" : "Diretor • Clínica Aurora",
      body: language === "en"
        ? "After implementing the complete ViraWeb Package with ViraBot, our weekly patient calendar started filling up directly through WhatsApp with zero manual reception overhead."
        : language === "es"
        ? "Tras implementar el Paquete ViraWeb completo con ViraBot, nuestra agenda semanal se llena directamente por WhatsApp sin sobrecarga manual de recepción."
        : "Após implementarmos o Pacote ViraWeb completo com o ViraBot, nossa agenda semanal passou a lotar direto pelo WhatsApp sem necessidade de intervenção manual da recepção.",
      metric: language === "en" ? "+210% in bookings" : language === "es" ? "+210% en reservas" : "+210% em agendamentos",
    },
    {
      name: "Beatriz Lopes",
      role: language === "en" ? "Founder • Lopes Advisory" : language === "es" ? "Fundadora • Consultoría Lopes" : "Fundadora • Lopes Consultoria",
      body: language === "en"
        ? "The website loads instantly on mobile devices and our Google Business profile reached the #1 spot on Google Maps in our city in less than three weeks."
        : language === "es"
        ? "El sitio carga al instante en móviles y nuestro perfil en Google Mi Negocio alcanzó el 1º puesto en Maps en nuestra ciudad en menos de tres semanas."
        : "O site carrega instantaneamente no celular e nossa ficha no Google Meu Negócio alcançou o primeiro lugar no mapa da nossa região em menos de três semanas.",
      metric: language === "en" ? "#1 on Google Maps" : language === "es" ? "1º en Google Maps" : "1º lugar no Google Maps",
    },
    {
      name: "Arthur K.",
      role: language === "en" ? "CTO • SME Operations" : language === "es" ? "CTO • Operaciones Pyme" : "CTO • Operações PME",
      body: language === "en"
        ? "Clean code, impeccable architecture, and zero sluggishness. The custom system they built eliminated scattered spreadsheets and saved our team 15 hours every week."
        : language === "es"
        ? "Código limpio, arquitectura impecable y cero lentitud. El software a medida que desarrollaron eliminó planillas dispersas y ahorró 15 horas semanales al equipo."
        : "Código limpo, arquitetura impecável e zero lentidão. O sistema sob medida que desenvolveram eliminou planilhas dispersas e economizou 15 horas semanais da equipe.",
      metric: language === "en" ? "15h saved/week" : language === "es" ? "15h ahorradas/semana" : "15h economizadas/semana",
    },
  ]

  return (
    <section id="cases" className="relative bg-white border-b border-slate-200 py-20 lg:py-28 text-slate-900">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-blue-600 mb-3">
            {language === "en" ? "AUDITED METRICS & PROVEN RESULTS" : language === "es" ? "MÉTRICAS AUDITADAS Y RESULTADOS PROBADOS" : "MÉTRICAS & RESULTADOS COMPROVADOS"}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950">
            {language === "en" ? "Results Engineering & Real ROI" : language === "es" ? "Ingeniería de Resultados y ROI Real" : "Engenharia de Resultados & ROI Real"}
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            {language === "en"
              ? "Audited performance metrics and direct feedback from companies that scaled with ViraWeb's digital infrastructure."
              : language === "es"
              ? "Métricas de rendimiento auditadas y testimonios directos de empresas que escalaron con la infraestructura digital de ViraWeb."
              : "Métricas auditadas de performance e relatos diretos de operações que escalaram com a infraestrutura da ViraWeb."}
          </p>
        </div>

        {/* Editorial Metrics Banner with Big Typographic Numbers */}
        <div className="mt-14 border-t border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {metrics.map((item) => (
            <div key={item.label} className="py-8 sm:py-10 px-0 sm:px-6 lg:px-8 first:pl-0 last:pr-0">
              <span className="font-mono text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 block">
                {item.value}
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-3">
                {item.label}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Editorial Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="border border-slate-200 bg-slate-50/50 p-6 sm:p-7 rounded-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-3">
                  {t.metric}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  "{t.body}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-sm font-bold text-slate-950">{t.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
