import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viraweb.online"

export const metadata: Metadata = {
  title: "ViraWeb — Criação de Sites, Sistemas Personalizados & Automação",
  description:
    "Transformamos ideias em presença digital. Sites premium, sistemas personalizados, automação com IA e gestão de Google Meu Negócio.",
  metadataBase: new URL(SITE_URL),
  keywords: ["criação de sites", "sistemas personalizados", "desenvolvimento de sistemas", "criação de bots", "Google Meu Negócio", "ViraWeb"],
  openGraph: {
    title: "ViraWeb — Presença Digital que Transforma Negócios",
    description:
      "Da ideia ao digital. Sites, sistemas customizados, automação e inteligência artificial para o seu negócio crescer.",
    url: SITE_URL,
    siteName: "ViraWeb",
    images: [{ url: `${SITE_URL}/favicon.png`, alt: "ViraWeb", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ViraWeb — Presença Digital que Transforma Negócios",
    description:
      "Da ideia ao digital. Sites, sistemas customizados, automação e inteligência artificial para o seu negócio crescer.",
    images: [`${SITE_URL}/favicon.png`],
  },
  icons: {
    icon: [{ url: "/favicon.png" }],
    apple: [{ url: "/favicon.png" }],
  },
  manifest: `${SITE_URL}/site.webmanifest`,
}

import { LanguageProvider } from "@/lib/i18n"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": SITE_URL,
        url: SITE_URL,
        name: "ViraWeb",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "ViraWeb",
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.png`,
      },
    ],
  }

  return (
    <html lang="pt-BR" className="bg-white text-slate-900 selection:text-[#0B67FF] selection:bg-[#0B67FF]/10">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href={SITE_URL} />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`font-sans ${GeistSans.className} antialiased bg-white text-foreground`}>
        <script
          key="ld-json"
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
