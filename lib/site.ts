// Hello World
import type { Language } from '@/lib/i18n';

/** Per-language copy dictionary, resolved with `copy[language]`. */
export type Copy<T> = Record<Language, T>;

export const SITE = {
  whatsappNumber: '5562984638578',
  whatsappDisplay: '(62) 9 8463-8578',
  email: 'suporte@viraweb.dev.br',
  instagramUrl: 'https://instagram.com/viraweb.dev.br',
  instagramHandle: '@viraweb.dev.br',
  odontoUrl: 'https://odonto.viraweb.dev.br',
  pontoControleUrl: 'https://pontocontrole.com.br',
  leadScrapUrl: 'https://ls.viraweb.dev.br',
  factoryUrl: process.env.NEXT_PUBLIC_FACTORY_URL ?? 'https://factory.viraweb.dev.br',
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** The Odonto product is localized in pt-BR and en only. */
export function odontoLink(language: Language, path: '' | '/demo' = ''): string {
  const locale = language === 'en' ? 'en' : 'pt-BR';
  return `${SITE.odontoUrl}/${locale}${path}`;
}

export const EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
