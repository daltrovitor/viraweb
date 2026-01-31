const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viraweb.online"

export default function Head() {
  const url = `${SITE_URL}/termos`
  return (
    <>
      <title>Termos de Serviço — Vira Web</title>
      <meta name="description" content="Termos de serviço da Vira Web — criação de sites, criação de bots e gestão digital. Leia as condições e políticas." />
      <link rel="canonical" href={url} />

      <meta property="og:title" content="Termos de Serviço — Vira Web" />
      <meta property="og:description" content="Termos de serviço da Vira Web — criação de sites, criação de bots e gestão digital. Leia as condições e políticas." />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${SITE_URL}/og-termos.svg`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Termos de Serviço — Vira Web" />
      <meta name="twitter:description" content="Termos de serviço da Vira Web — criação de sites, criação de bots e gestão digital. Leia as condições e políticas." />
      <meta name="twitter:image" content={`${SITE_URL}/og-termos.svg`} />
    </>
  )
}
