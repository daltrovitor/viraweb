// Hello World
// JSON-LD builders. Every value comes from the same modules that render the
// visible page (lib/site, lib/pricing, lib/home/*), so structured data cannot
// drift away from what a visitor actually reads. No ratings or review counts are
// emitted: none are published on the page, and inventing them is against both
// schema.org semantics and search-engine policies.
import { SITE, absoluteUrl } from '@/lib/site';
import { SERVICES_CONFIG, type ServiceId } from '@/lib/pricing';
import { getServices, type ServiceKey } from '@/lib/home/services';
import { getPontoControle, getPrx, PONTO_PLANS } from '@/lib/home/products';
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
  'Empresa de engenharia de software de Goiânia (GO), Brasil, que cria sites e landing pages, sistemas sob medida, automações com IA no WhatsApp e campanhas de tráfego pago, e mantém o PontoControle, sistema de controle de ponto com reconhecimento facial e GPS.';

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
        slogan: 'Design e engenharia que viram clientes.',
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
          'Criação de sites',
          'Landing pages',
          'Sistemas sob medida',
          'ERP e CRM',
          'Chatbot para WhatsApp',
          'Inteligência artificial',
          'Automação de processos',
          'Marketing digital',
          'Tráfego pago',
          'Google Meu Negócio',
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

const SERVICE_OFFERS: Record<ServiceKey, readonly ServiceId[]> = {
  sites: ['website'],
  systems: [],
  automation: ['virabot'],
  marketing: ['ads', 'gmn'],
};

function serviceOffers(key: ServiceKey): JsonLd[] {
  return SERVICE_OFFERS[key].map((id) => {
    const service = SERVICES_CONFIG.find((item) => item.id === id);
    if (!service) throw new Error(`Unknown service: ${id}`);
    return {
      '@type': 'Offer',
      name: service.name.pt,
      priceCurrency: 'BRL',
      price: service.setupBRL,
      description: `Setup de R$ ${service.setupBRL} e mensalidade de R$ ${service.monthlyBRL}.`,
      url: absoluteUrl('/propostas'),
    };
  });
}

/** Home page graph: the page itself, the four services, the products and the FAQ. */
export function homeJsonLd(): JsonLd {
  const services = getServices('pt');
  const ponto = getPontoControle('pt');
  const pontoPrices = PONTO_PLANS.pt.flatMap((plan) => (plan.price === null ? [] : [plan.price]));
  const faq = getFaq('pt');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE.url}/#webpage`,
        url: SITE.url,
        name: 'ViraWeb — Sites, sistemas sob medida, automação com IA e marketing',
        inLanguage: 'pt-BR',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
      },
      ...services.map((service) => {
        const offers = serviceOffers(service.key);
        return {
          '@type': 'Service',
          '@id': `${SITE.url}/#${service.anchor}`,
          name: service.name,
          serviceType: service.name,
          description: service.summary,
          provider: { '@id': ORGANIZATION_ID },
          areaServed: { '@type': 'Country', name: 'Brasil' },
          ...(offers.length > 0 ? { offers } : {}),
        };
      }),
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE.url}/#${ponto.anchor}`,
        name: ponto.name,
        url: ponto.url,
        sameAs: ponto.url,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Android, iOS',
        description: ponto.definition,
        audience: { '@type': 'Audience', audienceType: ponto.audience },
        publisher: { '@id': ORGANIZATION_ID },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'BRL',
          lowPrice: Math.min(...pontoPrices).toFixed(2),
          highPrice: Math.max(...pontoPrices).toFixed(2),
          offerCount: pontoPrices.length,
        },
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
          ...(page.service ? { offers: serviceOffers(page.service) } : {}),
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
