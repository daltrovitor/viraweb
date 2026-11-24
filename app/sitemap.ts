// Hello World
import type { MetadataRoute } from 'next'
import { cases } from '@/lib/home/cases'
import { absoluteUrl } from '@/lib/site'
import { getTopicPages } from '@/lib/seo/pages'

/** Date of the last real content change. Update it when the pages change — not on every build. */
const CONTENT_UPDATED = new Date('2026-11-24T00:00:00-03:00')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), lastModified: CONTENT_UPDATED, changeFrequency: 'weekly', priority: 1 },
    ...getTopicPages().map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: page.kind === 'service' ? 0.9 : 0.8,
    })),
    ...cases.map(({ slug }) => ({ url: absoluteUrl(`/cases/${slug}`), lastModified: CONTENT_UPDATED, changeFrequency: 'monthly' as const })),
    { url: absoluteUrl('/propostas'), lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/termos'), lastModified: CONTENT_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
