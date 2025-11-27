import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viraweb.online"

export const metadata: Metadata = {
  title: "Criação de Sites - Vira Web",
  description:
    "Especialistas em tráfego pago, criação de sites, design e gestão de Google Meu Negócio. Transforme sua presença digital.",
  metadataBase: new URL(SITE_URL),
  keywords: ["tráfego pago", "criação de sites", "design", "Google Meu Negócio"],
  openGraph: {
    title: "Criação de Sites - Vira Web",
    description:
      "Especialistas em tráfego pago, criação de sites, design e gestão de Google Meu Negócio.",
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
      "Especialistas em tráfego pago, criação de sites, design e gestão de Google Meu Negócio.",
    images: [`${SITE_URL}/og-criacao-sites.svg`],
  },
  icons: {
    icon: [{ url: "/viraweb6.ico" }],
    apple: [{ url: "/viraweb6.ico" }],
    other: [
      { rel: "mask-icon", url: "/viraweb6.ico", color: "#06b6d4" },
      { rel: "icon", url: "/viraweb6.ico" },
    ],
  },
  manifest: `${SITE_URL}/site.webmanifest`,
}

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
    <html lang="pt-BR" className="bg-white selection:text-white selection:bg-secondary/50">
      <link rel="icon" href="/viraweb6.ico" sizes="any" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="canonical" href={SITE_URL} />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <script
          key="ld-json"
          id="ld-json"
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
