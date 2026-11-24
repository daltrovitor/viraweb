// Hello World
import type { Metadata } from "next"
import { SITE, absoluteUrl } from "@/lib/site"

const DEFAULT_IMAGE = absoluteUrl("/opengraph-image")

/** Page metadata with a self-referencing canonical, so no page inherits another page's URL. */
export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = DEFAULT_IMAGE,
}: {
  title: string
  description: string
  path?: string
  keywords?: string[]
  image?: string
}): Metadata {
  const url = absoluteUrl(path)

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: image, alt: SITE.name }],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}
