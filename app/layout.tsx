// Hello World
import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { LanguageProvider } from "@/lib/i18n"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viraweb.dev.br"
const ODONTO_URL = "https://odonto.viraweb.dev.br"

// Only the primary text face is preloaded; the accent faces swap in when used,
// keeping the bytes ahead of the first paint (and LCP) to a minimum.
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
})

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
  preload: false,
})

// Brand typeface (ViraWeb wordmark + Vira Web Odonto section).
const brand = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: false,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
}

export const metadata: Metadata = {
  title: "ViraWeb — Engenharia de Software, Sistemas Personalizados & IA",
  description:
    "Empresa de engenharia de software especializada em sistemas personalizados sob medida, criação de sites premium, automação comercial com IA (ViraBot) e softwares proprietários (Vira Web Odonto, PontoControle e LeadScrap).",
  metadataBase: new URL(SITE_URL),
  keywords: [
    "criação de sites",
    "sistemas personalizados",
    "desenvolvimento de sistemas",
    "desenvolvimento de software sob medida",
    "automação whatsapp ia",
    "empresa de desenvolvimento de sistemas",
    "software odontológico",
    "sistema para clínica odontológica",
    "vira web odonto",
    "pontocontrole biometria facial",
    "sistema de ponto portaria 671 mte",
    "leadscrap prospecção",
    "viraweb",
    "desenvolvimento de bots",
    "inteligência artificial para empresas",
    "gestão google meu negócio",
    "tráfego pago alta conversão",
  ],
  authors: [{ name: "ViraWeb", url: SITE_URL }],
  creator: "ViraWeb",
  publisher: "ViraWeb",
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "ViraWeb — Engenharia de Software & Infraestrutura Digital de Elite",
    description:
      "Desenvolvimento de softwares exclusivos, inteligência artificial integrada, automação comercial e sistemas sob medida para a sua operação escalar.",
    url: SITE_URL,
    siteName: "ViraWeb",
    images: [{ url: `${SITE_URL}/favicon.png`, alt: "ViraWeb Logo", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ViraWeb — Engenharia de Software & Infraestrutura Digital de Elite",
    description:
      "Desenvolvimento de softwares exclusivos, inteligência artificial integrada, automação comercial e sistemas sob medida para a sua operação escalar.",
    images: [`${SITE_URL}/favicon.png`],
    creator: "@viraweb",
  },
  icons: {
    icon: [{ url: "/favicon.png" }],
    apple: [{ url: "/favicon.png" }],
  },
  manifest: "/site.webmanifest",
}

/**
 * Runs before first paint. Decides whether the home intro plays (first visit of
 * the session, real browser, motion allowed) and locks scrolling while it runs.
 * Everything else about the intro is pure CSS, so it never waits on hydration.
 */
const INTRO_SCRIPT = `(function(){try{var d=document.documentElement;if(location.pathname!=='/'||/^(factory|ops)\\./.test(location.hostname))return;var ua=navigator.userAgent.toLowerCase();var bot=/lighthouse|googlebot|bingbot|baiduspider|yandex|duckduckbot|slurp|headless/.test(ua);var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;var seen=false;try{seen=sessionStorage.getItem('vw-intro')==='1'}catch(e){}if(bot||reduce||seen||location.hash){d.setAttribute('data-intro','skip');return}try{sessionStorage.setItem('vw-intro','1')}catch(e){}d.setAttribute('data-intro','play');d.classList.add('intro-lock');setTimeout(function(){d.classList.remove('intro-lock')},1700)}catch(e){}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "TechCompany", "ProfessionalService"],
        "@id": `${SITE_URL}/#organization`,
        name: "ViraWeb",
        legalName: "ViraWeb Tecnologias",
        alternateName: ["Vira Web", "ViraWeb Online", "ViraWeb Software"],
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.png`,
        image: `${SITE_URL}/favicon.png`,
        description:
          "Empresa brasileira de engenharia de software sob medida, desenvolvimento de sistemas personalizados, inteligência artificial integrada, automação comercial e tráfego pago de alta performance.",
        telephone: "+55-62-99246-6109",
        email: "suporte@viraweb.dev.br",
        address: {
          "@type": "PostalAddress",
          addressCountry: "BR",
          addressRegion: "GO",
        },
        areaServed: ["BR", "US", "ES", "PT", "Worldwide"],
        priceRange: "$$$",
        sameAs: [
          ODONTO_URL,
          "https://pontocontrole.com.br",
          "https://instagram.com/viraweb.dev.br",
          "https://wa.me/5562992466109",
        ],
        knowsAbout: [
          "Desenvolvimento de Software",
          "Sistemas Personalizados",
          "Inteligência Artificial",
          "Software Odontológico",
          "Ponto Eletrônico Biométrico",
          "Portaria 671 MTE",
          "Automação WhatsApp",
          "Next.js",
          "React",
          "CRM & ERP Customizados",
          "Gestão de Tráfego Pago",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "ViraWeb",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "pt-BR",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${ODONTO_URL}/#software`,
        name: "Vira Web Odonto",
        url: ODONTO_URL,
        operatingSystem: "Web, iOS, Android",
        applicationCategory: "HealthApplication",
        description:
          "Software odontológico para clínicas e consultórios: agenda semanal com status clínicos, ficha do paciente, orçamento direto no odontograma, plano de pagamento em até 24 parcelas, financeiro, conciliação bancária e assistente com IA.",
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "74.90",
          highPrice: "247.90",
          priceCurrency: "BRL",
          offerCount: 3,
          availability: "https://schema.org/InStock",
        },
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://pontocontrole.com.br/#software",
        name: "PontoControle",
        operatingSystem: "Web, iOS, Android",
        applicationCategory: "HRApplication",
        description:
          "Sistema de controle de ponto eletrônico digital com biometria facial avançada, geolocalização por GPS e 100% de conformidade com a Portaria 671 do MTE.",
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#leadscrap`,
        name: "LeadScrap",
        operatingSystem: "Web",
        applicationCategory: "SalesApplication",
        description:
          "Plataforma de inteligência comercial e extração de leads qualificados para prospecção ativa B2B e automação comercial.",
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-sistemas`,
        name: "Desenvolvimento de Sistemas Personalizados",
        serviceType: "Software Engineering & Custom Development",
        description:
          "Desenvolvimento de softwares exclusivos, ERPs, CRMs e aplicações web com arquitetura limpa em Next.js, React e TypeScript.",
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-sites`,
        name: "Criação de Sites Premium & Landing Pages",
        serviceType: "Web Design & Performance Optimization",
        description:
          "Design 100% exclusivo focado em conversão, velocidade PageSpeed 90+ e SEO de alta performance.",
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "O site será meu? Terei acesso ao código?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, 100% seu. Após o desenvolvimento, você tem propriedade total sobre o domínio, o código-fonte e as chaves de acesso.",
            },
          },
          {
            "@type": "Question",
            name: "Como funciona o desenvolvimento de sistemas personalizados?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Mapeamos os processos manuais da sua empresa e criamos um software sob medida (como ERP, CRM ou ferramenta interna) totalmente integrado às APIs e bancos de dados que você já utiliza, eliminando erros operacionais.",
            },
          },
          {
            "@type": "Question",
            name: "O que é o Vira Web Odonto?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "É o nosso software odontológico para clínicas e consultórios. Agenda, ficha do paciente, orçamento no odontograma e plano de pagamento no mesmo fluxo — com financeiro, conciliação bancária e assistente com IA. Você testa grátis por 14 dias e cancela quando quiser.",
            },
          },
          {
            "@type": "Question",
            name: "Qual o tempo médio de desenvolvimento de um site premium?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Depende da complexidade, mas landing pages de elite costumam ser entregues em 10 a 15 dias úteis, e portais mais complexos/institucionais entre 20 a 30 dias úteis, com acompanhamento ativo.",
            },
          },
          {
            "@type": "Question",
            name: "Como funciona a automação do WhatsApp no comercial?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Integramos o fluxo de conversas do seu comercial diretamente com o seu CRM ou banco de dados. Isso automatiza lembretes, envio de orçamentos e qualificação de leads sem trabalho manual.",
            },
          },
          {
            "@type": "Question",
            name: "Vocês oferecem suporte pós-entrega?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, oferecemos suporte técnico ativo pós-entrega para garantir que os servidores estejam no ar, as APIs funcionem e que sua equipe saiba operar as ferramentas criadas.",
            },
          },
          {
            "@type": "Question",
            name: "O design das páginas é personalizado?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, não utilizamos templates prontos. Cada layout é desenhado do zero para a sua marca, combinando estética premium com foco em conversão e experiência do usuário.",
            },
          },
          {
            "@type": "Question",
            name: "Como é feita a integração com meus sistemas atuais?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Desenvolvemos conectores de API sob medida para sincronizar seus dados em tempo real com plataformas externas (ERP, gateways de pagamento, CRMs e bancos de dados externos).",
            },
          },
        ],
      },
    ],
  }

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable} ${brand.variable}`}
    >
      <head>
        <script id="vw-intro" dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-white text-ink">
        <script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <Suspense fallback={null}>
            {children}
            <Analytics />
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  )
}
