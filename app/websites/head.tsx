const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viraweb.online"

export default function Head() {
  const url = `${SITE_URL}/websites`
  return (
    <>
      <title>Web Sites — Vira Web</title>
      <meta name="description" content="Projetos de sites modernos, responsivos e otimizados. Veja exemplos de sites que construímos." />
      <link rel="canonical" href={url} />

      <meta property="og:title" content="Web Sites — Vira Web" />
      <meta property="og:description" content="Projetos de sites modernos, responsivos e otimizados. Veja exemplos de sites que construímos." />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${SITE_URL}/og-websites.svg`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Web Sites — Vira Web" />
      <meta name="twitter:description" content="Projetos de sites modernos, responsivos e otimizados. Veja exemplos de sites que construímos." />
      <meta name="twitter:image" content={`${SITE_URL}/og-websites.svg`} />
    </>
  )
}
