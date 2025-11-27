import { NextResponse } from "next/server"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viraweb.online"

export async function GET() {
  const pages = [
    { url: `${SITE_URL}/`, priority: 1.0, changefreq: "weekly" },
    { url: `${SITE_URL}/portfolio`, priority: 0.8, changefreq: "monthly" },
    { url: `${SITE_URL}/design`, priority: 0.7, changefreq: "monthly" },
    { url: `${SITE_URL}/websites`, priority: 0.7, changefreq: "monthly" },
    { url: `${SITE_URL}/termos`, priority: 0.2, changefreq: "yearly" },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map(
      (p) =>
        `<url>\n  <loc>${p.url}</loc>\n  <changefreq>${p.changefreq}</changefreq>\n  <priority>${p.priority}</priority>\n</url>`
    )
    .join("\n")}\n</urlset>`

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  })
}
