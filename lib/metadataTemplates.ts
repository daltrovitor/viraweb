export const siteMetadata = ({
  title = 'Vira Web - Criação de Sites',
  description = 'Especialistas em sistemas personalizados, criação de sites, criação de bots e gestão de Google Meu Negócio. Transforme sua presença digital.',
  url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://viraweb.online',
  image = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://viraweb.online'}/favicon.png`,
  keywords = ['sistemas personalizados', 'criação de sites', 'criação de bots'],
} = {}) => ({
  title,
  description,
  url,
  image,
  keywords,
})
