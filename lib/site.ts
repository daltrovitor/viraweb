// Hello World
import type { Language } from '@/lib/i18n';

/** Per-language copy dictionary, resolved with `copy[language]`. */
export type Copy<T> = Record<Language, T>;

export const SITE = {
  whatsappNumber: '5562984638578',
  whatsappDisplay: '(62) 9 8463-8578',
  email: 'suporte@viraweb.online',
  instagramUrl: 'https://instagram.com/viraweb.online',
  instagramHandle: '@viraweb.online',
  odontoUrl: 'https://odonto.viraweb.online',
  pontoControleUrl: 'https://pontocontrole.com.br',
  leadScrapUrl: 'https://ls.viraweb.online',
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
