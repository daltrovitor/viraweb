import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
// Add display swap implicitly if geist doesn't do it, but usually next/font does.
// We'll trust next/font here unless we see a specific flash issue.
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viraweb.online"

export const metadata: Metadata = {
  title: "Criação de Sites - Vira Web",
  description:
    "Especialistas em tráfego pago, criação de sites, criação de bots e gestão de Google Meu Negócio. Transforme sua presença digital.",
  metadataBase: new URL(SITE_URL),
  keywords: ["tráfego pago", "criação de sites", "criação de bots", "Google Meu Negócio"],
  openGraph: {
    title: "Criação de Sites - Vira Web",
    description:
      "Especialistas em tráfego pago, criação de sites, criação de bots e gestão de Google Meu Negócio.",
    url: SITE_URL,
    siteName: "Vira Web",
    images: [
      {
        url: `${SITE_URL}/og-criacao-sites.svg`,
        alt: "Vira Web",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Criação de Sites - Vira Web",
    description:
      "Especialistas em tráfego pago, criação de sites, criação de bots e gestão de Google Meu Negócio.",
    images: [`${SITE_URL}/og-criacao-sites.svg`],
  },
  icons: {
    icon: [{ url: "/favicon.png" }],
    apple: [{ url: "/favicon.png" }],
    other: [
      { rel: "mask-icon", url: "/favicon.png" },
      { rel: "icon", url: "/favicon.png" },
    ],
  },
  manifest: `${SITE_URL}/site.webmanifest`,
}

import { LanguageProvider } from "@/lib/i18n"

import { LazyMotion, domAnimation } from "framer-motion"

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
        "url": SITE_URL,
        "name": "Vira Web",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${SITE_URL}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "name": "Vira Web",
        "url": SITE_URL,
        "logo": `${SITE_URL}/viraweb6.ico`,
      },
    ],
  }

  return (
    <html lang="pt-BR" className="bg-[#0f1923] selection:text-white selection:bg-secondary/50">
      <head>
        <link rel="icon" href="/viraweb6.ico" sizes="any" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href={SITE_URL} />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
      </head>
      <body className={`font-sans ${GeistSans.className} ${GeistMono.className} antialiased`}>
        <script
          key="ld-json"
          id="ld-json"
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LazyMotion features={domAnimation} strict>
          <LanguageProvider>
            <Suspense fallback={null}>
              {children}
              <Analytics />
            </Suspense>
          </LanguageProvider>
        </LazyMotion>
      </body>
    </html>
  )
}
