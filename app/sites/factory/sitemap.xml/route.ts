// Hello World
import { listProducts } from '@/lib/factory/repo';
import { FACTORY } from '@/lib/factory/site';

export const revalidate = 3600;

export async function GET() {
  const products = await listProducts();
  const urls = [
    { loc: FACTORY.url, priority: '1.0' },
    { loc: `${FACTORY.url}/products`, priority: '0.9' },
    ...products.map((p) => ({ loc: `${FACTORY.url}/products/${p.slug}`, priority: p.tier === 'standard' ? '0.8' : '0.6' })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
