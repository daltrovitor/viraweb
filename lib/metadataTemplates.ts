export const siteMetadata = ({
  title = 'Vira Web - Criação de Sites',
  description = 'Especialistas em tráfego pago, criação de sites, criação de bots e gestão de Google Meu Negócio. Transforme sua presença digital.',
  url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://viraweb.online',
  image = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://viraweb.online'}/og-criacao-sites.svg`,
  keywords = ['tráfego pago', 'criação de sites', 'criação de bots'],
} = {}) => ({
  title,
  description,
  url,
  image,
  keywords,
})
