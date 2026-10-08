// Hello World
import { FactoryHero } from '@/components/factory/hero';
import { WantPicker } from '@/components/factory/want-picker';
import { BuildIndex } from '@/components/factory/build-index';
import { IdeaToProduct } from '@/components/factory/idea-to-product';
import { SpeedTimeline } from '@/components/factory/speed-timeline';
import { Pricing } from '@/components/factory/pricing';
import { FinalCta } from '@/components/factory/final-cta';
import { featuredProducts } from '@/lib/factory/repo';
import { FACTORY } from '@/lib/factory/site';

export const revalidate = 300;

export default async function FactoryHome() {
  const products = await featuredProducts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${FACTORY.url}/#service`,
    name: FACTORY.name,
    slogan: FACTORY.slogan,
    description: FACTORY.description,
    url: FACTORY.url,
    areaServed: 'BR',
    provider: { '@type': 'Organization', name: 'ViraWeb', url: FACTORY.mainUrl },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Produtos ViraWeb Factory',
      itemListElement: products
        .filter((p) => p.setupPrice !== null)
        .map((p) => ({
          '@type': 'Offer',
          name: p.name,
          url: `${FACTORY.url}/products/${p.slug}`,
          price: ((p.setupPrice ?? 0) / 100).toFixed(2),
          priceCurrency: 'BRL',
        })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FactoryHero />
      <WantPicker />
      <BuildIndex />
      <IdeaToProduct />
      <SpeedTimeline />
      <Pricing products={products} />
      <FinalCta />
    </>
  );
}
