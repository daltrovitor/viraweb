// Hello World
import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

/** Date of the last real content change. Update it when the pages change — not on every build. */
const CONTENT_UPDATED = new Date('2026-11-13T00:00:00-03:00')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), lastModified: CONTENT_UPDATED, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/propostas'), lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/termos'), lastModified: CONTENT_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
