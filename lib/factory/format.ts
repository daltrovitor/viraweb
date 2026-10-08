// Hello World
import type { Product, Tier } from './types';

const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Cents → "R$ 297". Whole amounts drop the decimals. */
export function formatBRL(cents: number): string {
  return BRL.format(cents / 100).replace(/ /g, ' ');
}

export function setupLabel(product: Pick<Product, 'setupPrice' | 'priceFrom'>): string {
  if (product.setupPrice === null) return 'Sob análise';
  return `${product.priceFrom ? 'a partir de ' : ''}${formatBRL(product.setupPrice)}`;
}

export function monthlyLabel(product: Pick<Product, 'monthlyPrice'>): string {
  if (product.monthlyPrice === null) return 'Sob análise';
  return `${formatBRL(product.monthlyPrice)}/mês`;
}

export function deliveryLabel(product: Pick<Product, 'deliveryDays' | 'tier'>): string {
  if (product.tier !== 'standard' || product.deliveryDays === null) return 'Prazo após análise';
  return `Até ${product.deliveryDays} ${product.deliveryDays === 1 ? 'dia útil' : 'dias úteis'}`;
}

export const TIER_LABEL: Record<Tier, string> = {
  standard: 'Standard',
  custom: 'Custom',
  enterprise: 'Enterprise',
};

const DATE = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: 'short', year: 'numeric' });
const DATE_TIME = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
});

export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return '—';
  return DATE.format(typeof value === 'string' ? new Date(value) : value);
}

export function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) return '—';
  return DATE_TIME.format(typeof value === 'string' ? new Date(value) : value);
}
