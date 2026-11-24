import { SITE, absoluteUrl } from '@/lib/site';
import { getPontoControle, getPrx } from '@/lib/home/products';
import type { TopicPage } from '@/lib/seo/pages';
import { getFaq } from '@/lib/home/faq';

export const ORGANIZATION_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

type JsonLd = Record<string, unknown>;

/** Serializes JSON-LD for an inline script, escaping `<` so markup can never break out. */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

const ORGANIZATION_DESCRIPTION =
  'Empresa de Goiânia (GO) especializada em sistemas sob medida, plataformas web, produtos digitais e automação de processos.';

/** Organization + WebSite: emitted on every page of the main site. */
export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: SITE.name,
        legalName: SITE.legalName,
        alternateName: ['Vira Web', 'Viraweb', 'ViraWeb Tecnologias', 'viraweb.dev.br'],
        slogan: 'Desenvolvimento de sistemas sob medida',
        url: SITE.url,
        logo: { '@type': 'ImageObject', url: absoluteUrl('/favicon.png') },
        image: absoluteUrl('/favicon.png'),
        description: ORGANIZATION_DESCRIPTION,
        email: SITE.email,
        telephone: SITE.whatsappTel,
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE.city,
          addressRegion: SITE.region,
          addressCountry: SITE.country,
        },
        areaServed: [
          { '@type': 'Country', name: 'Brasil' },
          { '@type': 'State', name: 'Goiás' },
          { '@type': 'City', name: 'Goiânia' },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: SITE.whatsappTel,
          email: SITE.email,
          url: `https://wa.me/${SITE.whatsappNumber}`,
          availableLanguage: ['pt-BR', 'en', 'es'],
        },
        sameAs: [SITE.instagramUrl],
        knowsAbout: [
          'Desenvolvimento de software',
          'Software sob medida',
          'Sistemas sob medida',
          'Plataformas web',
          'Inteligência artificial',
          'Automação de processos',
          'Controle de ponto eletrônico',
        ],
        owns: [
          { '@type': 'SoftwareApplication', name: 'PontoControle', url: SITE.pontoControleUrl },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE.url,
        name: SITE.name,
        inLanguage: 'pt-BR',
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  };
}

export function homeJsonLd(): JsonLd {
  const ponto = getPontoControle('pt');
  const faq = getFaq('pt');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE.url}/#webpage`,
        url: SITE.url,
        name: 'ViraWeb — Desenvolvimento de sistemas sob medida',
        inLanguage: 'pt-BR',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'Service',
        '@id': `${SITE.url}/desenvolvimento-de-software#service`,
        name: 'Desenvolvimento de sistemas sob medida',
        description: ORGANIZATION_DESCRIPTION,
        url: absoluteUrl('/desenvolvimento-de-software'),
        provider: { '@id': ORGANIZATION_ID },
        areaServed: { '@type': 'Country', name: 'Brasil' },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': absoluteUrl('/cases/pontocontrole#pontocontrole'),
        name: ponto.name,
        url: ponto.url,
        sameAs: ponto.url,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Android, iOS',
        description: ponto.definition,
        audience: { '@type': 'Audience', audienceType: ponto.audience },
        publisher: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE.url}/#faq`,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };
}

/** Topic pages (services, about, local): main entity + FAQ + breadcrumbs. */
export function topicJsonLd(page: TopicPage): JsonLd {
  const url = absoluteUrl(`/${page.slug}`);
  const prx = getPrx('pt');

  const mainEntity: JsonLd =
    page.kind === 'service'
      ? {
          '@type': 'Service',
          '@id': `${url}#service`,
          name: page.label,
          serviceType: page.topics[0],
          description: page.definition,
          url,
          provider: { '@id': ORGANIZATION_ID },
          areaServed: { '@type': 'Country', name: 'Brasil' },
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: `https://wa.me/${SITE.whatsappNumber}`,
            availableLanguage: ['pt-BR', 'en', 'es'],
          },
        }
      : {
          '@type': 'CreativeWork',
          '@id': `${url}#prx`,
          name: prx.name,
          url: prx.url,
          description: prx.definition,
          creator: { '@id': ORGANIZATION_ID },
        };

  const pageType = page.kind === 'about' ? 'AboutPage' : 'WebPage';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': pageType,
        '@id': `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': WEBSITE_ID },
        about: page.kind === 'service' ? { '@id': `${url}#service` } : { '@id': ORGANIZATION_ID },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      mainEntity,
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: page.label, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: page.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };
}
