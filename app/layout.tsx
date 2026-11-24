// Hello World
import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { LanguageProvider } from "@/lib/i18n"
import { SITE, absoluteUrl } from "@/lib/site"
import { organizationJsonLd, serializeJsonLd } from "@/lib/structured-data"

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

// Brand typeface (ViraWeb wordmark).
const brand = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: false,
})

const TITLE = "ViraWeb — Desenvolvimento de software, sites, chatbot com IA e marketing digital"
const DESCRIPTION =
  "A ViraWeb é uma empresa de software de Goiânia (GO): desenvolvimento de software sob medida, criação de sites, chatbot com IA no WhatsApp e marketing digital para empresas de todo o Brasil."

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
}

// No canonical here on purpose: a canonical set in the root layout is inherited by
// every route, which would declare each page a duplicate of the home page. Every
// page sets its own (see app/page.tsx and lib/seo.ts).
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  keywords: [
    "criação de sites",
    "landing page",
    "sistemas sob medida",
    "desenvolvimento de software",
    "automação whatsapp com ia",
    "tráfego pago",
    "google meu negócio",
    "controle de ponto",
    "viraweb",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
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
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: SITE.name,
    images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "ViraWeb" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [absoluteUrl("/opengraph-image")],
  },
  icons: {
    icon: [{ url: "/favicon.png" }],
    apple: [{ url: "/favicon.png" }],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable} ${brand.variable}`}
    >
      <body suppressHydrationWarning className="font-sans antialiased bg-white text-ink">
        <script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd()) }}
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
