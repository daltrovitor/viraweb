const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viraweb.online"

export default function Head() {
  const url = `${SITE_URL}/portfolio`
  return (
    <>
      <title>Portfólio — Vira Web</title>
      <meta name="description" content="Veja projetos de design e web que geram resultados reais para nossos clientes." />
      <link rel="canonical" href={url} />

      <meta property="og:title" content="Portfólio — Vira Web" />
      <meta property="og:description" content="Veja projetos de design e web que geram resultados reais para nossos clientes." />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${SITE_URL}/og-websites.svg`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Portfólio — Vira Web" />
      <meta name="twitter:description" content="Veja projetos de design e web que geram resultados reais para nossos clientes." />
      <meta name="twitter:image" content={`${SITE_URL}/og-websites.svg`} />
    </>
  )
}
