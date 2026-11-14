// Hello World
import type { Language } from '@/lib/i18n';

/** Per-language copy dictionary, resolved with `copy[language]`. */
export type Copy<T> = Record<Language, T>;

/**
 * Canonical origin of the main site. The apex domain 308-redirects to www, so
 * www is the address every canonical tag, sitemap entry and schema @id uses.
 */
export const CANONICAL_ORIGIN = 'https://www.viraweb.dev.br';
const OWN_DOMAIN = 'viraweb.dev.br';

/**
 * NEXT_PUBLIC_SITE_URL is honoured only when it is an https address on our own
 * domain. A stale value there once made every page declare a parked domain as
 * its canonical URL — a mistake that quietly removes a site from search engines
 * and AI answers — so anything else falls back to the canonical origin.
 */
export function resolveSiteUrl(raw: string | undefined | null): string {
  if (!raw) return CANONICAL_ORIGIN;
  try {
    const url = new URL(raw.trim());
    const host = url.hostname.toLowerCase();
    const ours = host === OWN_DOMAIN || host.endsWith(`.${OWN_DOMAIN}`);
    return url.protocol === 'https:' && ours ? url.origin : CANONICAL_ORIGIN;
  } catch {
    return CANONICAL_ORIGIN;
  }
}

/**
 * Single source of truth for the company's identity and contact data. The page,
 * the JSON-LD and the llms.txt files all read from here, so they cannot disagree.
 */
export const SITE = {
  name: 'ViraWeb',
  legalName: 'ViraWeb Tecnologias',
  /** No trailing slash. */
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  city: 'Goiânia',
  region: 'GO',
  country: 'BR',
  whatsappNumber: '5562984638578',
  whatsappDisplay: '(62) 9 8463-8578',
  /** International format, as schema.org expects. */
  whatsappTel: '+55-62-98463-8578',
  email: 'suporte@viraweb.dev.br',
  instagramUrl: 'https://instagram.com/viraweb.dev.br',
  instagramHandle: '@viraweb.dev.br',
  pontoControleUrl: 'https://www.pontocontrole.com.br',
} as const;

/** Absolute URL on the main site for a root-relative path. */
export function absoluteUrl(path = '/'): string {
  return path === '/' ? SITE.url : `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
