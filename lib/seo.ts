import type { Metadata } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viraweb.online"
const DEFAULT_IMAGE = `${SITE_URL}/viraweb6.ico`

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
  const url = new URL(path, SITE_URL).toString()

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      url,
      siteName: "Vira Web",
      images: [
        {
          url: image,
          alt: "Vira Web",
        },
      ],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
