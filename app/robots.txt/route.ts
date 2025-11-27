import { NextResponse } from 'next/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://viraweb.online'

export async function GET() {
  const rules = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  return new NextResponse(rules, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  })
}
