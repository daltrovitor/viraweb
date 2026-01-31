import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://viraweb.online'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    { url: `${SITE_URL}/portfolio`, lastModified: new Date() },
    { url: `${SITE_URL}/criação de bots`, lastModified: new Date() },
    { url: `${SITE_URL}/websites`, lastModified: new Date() },
    { url: `${SITE_URL}/termos`, lastModified: new Date() },
    { url: `${SITE_URL}/criacao-de-sites`, lastModified: new Date() },
  ]
}
