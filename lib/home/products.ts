// Hello World
// Facts about PontoControle, ViraWeb's own product. Everything here mirrors what
// the product states on its own site, so the home page, the JSON-LD and the
// llms.txt files never claim more than the product itself does.
import type { Language } from '@/lib/i18n';
import { SITE } from '@/lib/site';

export interface ProductPlan {
  name: string;
  /** Monthly price in BRL; null when quoted on request. */
  price: number | null;
  limit: string;
}

/** PontoControle plans, as published on pontocontrole.com.br. */
export const PONTO_PLANS: Record<Language, readonly ProductPlan[]> = {
  pt: [
    { name: 'Basic', price: 49.9, limit: 'Até 3 funcionários' },
    { name: 'Premium', price: 99.9, limit: 'Até 5 funcionários' },
    { name: 'Personalizado', price: null, limit: 'Mais de 5 funcionários' },
  ],
  en: [
    { name: 'Basic', price: 49.9, limit: 'Up to 3 employees' },
    { name: 'Premium', price: 99.9, limit: 'Up to 5 employees' },
    { name: 'Custom', price: null, limit: 'More than 5 employees' },
  ],
  es: [
    { name: 'Basic', price: 49.9, limit: 'Hasta 3 empleados' },
    { name: 'Premium', price: 99.9, limit: 'Hasta 5 empleados' },
    { name: 'Personalizado', price: null, limit: 'Más de 5 empleados' },
  ],
};

export const PONTO_TRIAL_DAYS = 14;

/** Deterministic BRL formatting (identical on server and client — no ICU drift). */
export function brl(value: number): string {
  const [integer, cents] = Math.abs(value).toFixed(2).split('.');
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${value < 0 ? '-' : ''}R$ ${grouped},${cents}`;
}

export interface ProductInfo {
  anchor: string;
  name: string;
  url: string;
  category: string;
  /** One self-contained sentence: what it is, what it does and for whom. */
  definition: string;
  audience: string;
  priceLine: string;
}

export function getPontoControle(language: Language): ProductInfo {
  const from = brl(PONTO_PLANS.pt[0].price ?? 0);
  const shared = { anchor: 'pontocontrole', name: 'PontoControle', url: SITE.pontoControleUrl };

  if (language === 'en') {
    return {
      ...shared,
      category: 'Employee time tracking',
      definition:
        'PontoControle is a time-tracking system used on the phone, with facial recognition, GPS on every clock-in and a monthly timesheet in PDF, made for small businesses and household employers in Brazil.',
      audience: 'Small businesses and household employers',
      priceLine: `From ${from}/month · ${PONTO_TRIAL_DAYS} days free, no card`,
    };
  }
  if (language === 'es') {
    return {
      ...shared,
      category: 'Control de asistencia',
      definition:
        'PontoControle es un sistema de control de asistencia que se usa en el celular, con reconocimiento facial, GPS en cada registro y planilla mensual en PDF, hecho para pequeñas empresas y empleadores domésticos en Brasil.',
      audience: 'Pequeñas empresas y empleadores domésticos',
      priceLine: `Desde ${from}/mes · ${PONTO_TRIAL_DAYS} días gratis, sin tarjeta`,
    };
  }
  return {
    ...shared,
    category: 'Controle de ponto',
    definition:
      'O PontoControle é um sistema de controle de ponto pelo celular, com reconhecimento facial, GPS em cada marcação e espelho de ponto em PDF, feito para pequenas empresas e empregadores domésticos.',
    audience: 'Pequenas empresas e empregadores domésticos',
    priceLine: `A partir de ${from}/mês · ${PONTO_TRIAL_DAYS} dias grátis, sem cartão`,
  };
}
