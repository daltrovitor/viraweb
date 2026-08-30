"use client"

import { ArrowUpRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { engineeringMessage, waLink } from "@/lib/pricing"

export function LandingEngineering() {
  const { language } = useTranslation()

  const solutions = [
    {
      num: "01",
      tag: language === "en" ? "FINANCIAL & ERP" : language === "es" ? "FINANCIERO Y ERP" : "FINANCEIRO & ERP",
      title: language === "en" ? "Financial Management & Invoicing" : language === "es" ? "Gestión Financiera y Facturación" : "Gestão Financeira & Faturamento",
      desc: language === "en"
        ? "Real-time cash flow control, automated billing with payment split APIs, DRE reporting, and bank reconciliation without reliance on manual spreadsheets."
        : language === "es"
        ? "Control de flujo de caja en tiempo real, emisión automática de pagos y facturas, reportes DRE y conciliación bancaria sin planillas manuales."
        : "Controle de fluxo de caixa em tempo real, emissão automatizada de boletos e Pix com split de pagamentos, relatórios DRE e conciliação bancária sem dependência de planilhas manuais.",
    },
    {
      num: "02",
      tag: language === "en" ? "INVENTORY & OPERATIONS" : language === "es" ? "INVENTARIO Y OPERACIONES" : "ESTOQUE & OPERAÇÕES",
      title: language === "en" ? "Inventory & Logistics Control" : language === "es" ? "Control de Inventario y Logística" : "Controle de Estoque & Logística",
      desc: language === "en"
        ? "Supply tracking, automated inbound/outbound logging, predictive stockout alerts, and direct API integrations with supplier catalogs."
        : language === "es"
        ? "Rastreo de suministros, registro automatizado de entradas y salidas, alertas predictivas de stock e integraciones API directas con proveedores."
        : "Rastreamento de insumos, registros automatizados de entradas e saídas, alertas preditivos de ruptura de estoque e integração direta via API com sistemas de fornecedores.",
    },
    {
      num: "03",
      tag: language === "en" ? "OPERATIONS & HR" : language === "es" ? "OPERACIONES Y RRHH" : "OPERACIONAL & RH",
      title: language === "en" ? "Staff Management & Digital Records" : language === "es" ? "Gestión de Personal y Registros Digitales" : "Gestão de Equipe & Prontuários / Ponto",
      desc: language === "en"
        ? "Administrative dashboards with granular role-based permissions, secure digital client records, attendance tracking, and operational productivity reports."
        : language === "es"
        ? "Paneles administrativos con permisos granulares por rol, historiales digitales seguros, control horario y reportes de productividad operativa."
        : "Painéis administrativos com níveis granulares de permissão por cargo, prontuários eletrônicos seguros, controle de frequência e relatórios de produtividade operacional.",
    },
    {
      num: "04",
      tag: language === "en" ? "SAAS & PRODUCTS" : language === "es" ? "SAAS Y PRODUCTOS" : "SAAS & PRODUTOS",
      title: language === "en" ? "SaaS Platforms & WebGL / 3D" : language === "es" ? "Plataformas SaaS y WebGL / 3D" : "Plataformas SaaS & WebGL / 3D",
      desc: language === "en"
        ? "End-to-end digital product development and scalable cloud platforms for recurring monetization, with modern microservices architecture and high availability."
        : language === "es"
        ? "Construcción completa de productos digitales y plataformas escalables en la nube para monetización recurrente, con microservicios y alta disponibilidad."
        : "Construção de produtos digitais completos e plataformas escaláveis na nuvem para monetização recorrente, com arquitetura em microsserviços e alta disponibilidade.",
    },
  ]

  return (
    <section id="sistemas" className="relative bg-white border-b border-slate-200 py-20 lg:py-28 text-slate-900">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-blue-600 mb-3">
            {language === "en" ? "ENGINEERING HUB • CUSTOM SOFTWARE" : language === "es" ? "ENGINEERING HUB • DESARROLLO A MEDIDA" : "ENGINEERING HUB • DESENVOLVIMENTO SOB MEDIDA"}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950">
            {language === "en"
              ? "Does your operation need more than a website? We build bespoke systems from scratch."
              : language === "es"
              ? "¿Su operación necesita más que un sitio web? Construimos su sistema a medida desde cero."
              : "Sua operação precisa de mais do que um site? Criamos o seu sistema sob medida do zero."}
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            {language === "en"
              ? "From complex ERPs to SaaS platforms: we develop scalable, secure, and intuitive software architecture to eliminate bottlenecks in your business."
              : language === "es"
              ? "De ERPs complejos a plataformas SaaS: desarrollamos arquitectura de software escalable, segura e intuitiva para eliminar cuellos de botella en su empresa."
              : "De ERPs complexos a plataformas SaaS: desenvolvemos arquitetura de software escalável, segura e intuitiva para eliminar gargalos da sua empresa."}
          </p>
        </div>

        {/* Editorial Architecture List with Divider Lines */}
        <div className="mt-14 border-t border-b border-slate-200 divide-y divide-slate-200">
          {solutions.map((item) => (
            <div
              key={item.num}
              className="py-8 lg:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-2xl font-bold text-slate-950">
                  {item.num}
                </span>
              </div>

              <div className="md:col-span-4">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-950">
                  {item.title}
                </h3>
              </div>

              <div className="md:col-span-6">
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Technical Briefing Action Strip */}
        <div className="mt-12 border border-slate-200 bg-slate-50/70 p-6 sm:p-8 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-slate-950">
              {language === "en"
                ? "Need a customized architecture for your business?"
                : language === "es"
                ? "¿Necesita una arquitectura personalizada para su empresa?"
                : "Precisa de uma arquitetura customizada para o seu negócio?"}
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              {language === "en"
                ? "Schedule a technical diagnostic session to map business requirements and estimate scope."
                : language === "es"
                ? "Agende una sesión técnica de diagnóstico para mapear los requerimientos de negocio y estimar el alcance."
                : "Agende uma sessão técnica de diagnóstico para mapeamento das regras de negócio e estimativa de escopo."}
            </p>
          </div>

          <a
            href={waLink(engineeringMessage(language))}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-sm bg-[#2563EB] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8] cursor-pointer"
          >
            <span>{language === "en" ? "Schedule Technical Meeting" : language === "es" ? "Agendar Reunión Técnica" : "Agendar Reunião Técnica"}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
