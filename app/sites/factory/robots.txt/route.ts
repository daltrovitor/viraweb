// Hello World
import { FACTORY } from '@/lib/factory/site';

export const dynamic = 'force-static';

export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /dashboard',
    'Disallow: /order/',
    'Disallow: /login',
    'Disallow: /auth/',
    `Sitemap: ${FACTORY.url}/sitemap.xml`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
