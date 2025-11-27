const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viraweb.online"

export default function Head() {
  const url = `${SITE_URL}/design`
  return (
    <>
      <title>Design de Websites — Vira Web</title>
      <meta name="description" content="Design de websites e identidade visual com foco em conversão. Veja nossos projetos." />
      <link rel="canonical" href={url} />

      <meta property="og:title" content="Design de Websites — Vira Web" />
      <meta property="og:description" content="Design de websites e identidade visual com foco em conversão. Veja nossos projetos." />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${SITE_URL}/og-design.svg`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Design de Websites — Vira Web" />
      <meta name="twitter:description" content="Design de websites e identidade visual com foco em conversão. Veja nossos projetos." />
      <meta name="twitter:image" content={`${SITE_URL}/og-design.svg`} />
    </>
  )
}
