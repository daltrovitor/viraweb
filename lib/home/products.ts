// Hello World
// Facts about PontoControle, ViraWeb's own product. Everything here mirrors what
// the product states on its own site, so the home page, the JSON-LD and the
// llms.txt files never claim more than the product itself does.
import type { Language } from '@/lib/i18n';
import { SITE } from '@/lib/site';

export interface ProductInfo {
  anchor: string;
  name: string;
  url: string;
  category: string;
  /** One self-contained sentence: what it is, what it does and for whom. */
  definition: string;
  audience: string;
}

export function getPontoControle(language: Language): ProductInfo {
  const shared = { anchor: 'pontocontrole', name: 'PontoControle', url: SITE.pontoControleUrl };

  if (language === 'en') {
    return {
      ...shared,
      category: 'Employee time tracking',
      definition:
        'PontoControle is a time-tracking system used on the phone, with facial recognition, GPS on every clock-in and a monthly timesheet in PDF, made for small businesses and household employers in Brazil.',
      audience: 'Small businesses and household employers',
    };
  }
  if (language === 'es') {
    return {
      ...shared,
      category: 'Control de asistencia',
      definition:
        'PontoControle es un sistema de control de asistencia que se usa en el celular, con reconocimiento facial, GPS en cada registro y planilla mensual en PDF, hecho para pequeñas empresas y empleadores domésticos en Brasil.',
      audience: 'Pequeñas empresas y empleadores domésticos',
    };
  }
  return {
    ...shared,
    category: 'Controle de ponto',
    definition:
      'O PontoControle é um sistema de controle de ponto pelo celular, com reconhecimento facial, GPS em cada marcação e espelho de ponto em PDF, feito para pequenas empresas e empregadores domésticos.',
    audience: 'Pequenas empresas e empregadores domésticos',
  };
}

// ---------------------------------------------------------------------------
// PRX — a case ViraWeb designed and built. Every line below mirrors what PRX
// publishes on prx.app.br (including its regulatory disclaimer), so the home
// page never claims more about the product than the product itself does.
// ---------------------------------------------------------------------------

export type PrxModuleKey = 'bank' | 'pass' | 'live' | 'coins' | 'founders';

export interface PrxModule {
  key: PrxModuleKey;
  name: string;
  body: string;
}

export interface PrxInfo {
  name: string;
  url: string;
  tagline: string;
  motto: string;
  definition: string;
  disclaimer: string;
  modules: readonly PrxModule[];
}

export const PRX_MODULE_KEYS: readonly PrxModuleKey[] = ['bank', 'pass', 'live', 'coins', 'founders'];

export function getPrx(language: Language): PrxInfo {
  const shared = { name: 'PRX', url: SITE.prxUrl, motto: 'Next is Yours' };

  if (language === 'en') {
    return {
      ...shared,
      tagline: 'The Gen Z bank',
      definition:
        'PRX is a digital account, benefits and events app for Gen Z and Gen Alpha: Pix and card, perks at selected brands, events and PRX Coins in a single app.',
      disclaimer:
        'PRX is not a financial institution: the payment account is held by a payment institution authorised by the Central Bank of Brazil.',
      modules: [
        { key: 'bank', name: 'PRX BANK', body: 'Digital account with Pix and card.' },
        { key: 'pass', name: 'PRX PASS', body: 'Exclusive perks at selected brands, redeemed by QR Code.' },
        { key: 'live', name: 'PRX LIVE', body: 'Events and reserved experiences, with the ticket in the app wallet.' },
        { key: 'coins', name: 'PRX Coins', body: 'Every purchase at a partner becomes PRX Coins and boosts your level.' },
        { key: 'founders', name: 'PRX Founders', body: 'Meetups that bring young founders closer to investors.' },
      ],
    };
  }
  if (language === 'es') {
    return {
      ...shared,
      tagline: 'El banco de la Generación Z',
      definition:
        'PRX es una app de cuenta digital, beneficios y eventos para la Generación Z y la Generación Alpha: Pix y tarjeta, beneficios en marcas seleccionadas, eventos y PRX Coins en una sola app.',
      disclaimer:
        'PRX no es una institución financiera: la cuenta de pago la mantiene una institución de pago autorizada por el Banco Central de Brasil.',
      modules: [
        { key: 'bank', name: 'PRX BANK', body: 'Cuenta digital con Pix y tarjeta.' },
        { key: 'pass', name: 'PRX PASS', body: 'Beneficios exclusivos en marcas seleccionadas, canjeados por código QR.' },
        { key: 'live', name: 'PRX LIVE', body: 'Eventos y experiencias reservadas, con la entrada en la billetera de la app.' },
        { key: 'coins', name: 'PRX Coins', body: 'Cada compra en un aliado se convierte en PRX Coins y sube tu nivel.' },
        { key: 'founders', name: 'PRX Founders', body: 'Encuentros que acercan a jóvenes emprendedores e inversores.' },
      ],
    };
  }
  return {
    ...shared,
    tagline: 'O banco da Geração Z',
    definition:
      'A PRX é um app de conta digital, benefícios e eventos para a Geração Z e a Geração Alpha: Pix e cartão, benefícios em marcas selecionadas, eventos e PRX Coins em um único aplicativo.',
    disclaimer:
      'A PRX não é instituição financeira: a conta de pagamento é mantida por instituição de pagamento autorizada pelo Banco Central do Brasil.',
    modules: [
      { key: 'bank', name: 'PRX BANK', body: 'Conta digital com Pix e cartão.' },
      { key: 'pass', name: 'PRX PASS', body: 'Benefícios exclusivos em marcas selecionadas, resgatados por QR Code.' },
      { key: 'live', name: 'PRX LIVE', body: 'Eventos e experiências reservadas, com o ingresso na carteira do aplicativo.' },
      { key: 'coins', name: 'PRX Coins', body: 'Cada gasto em parceiro vira PRX Coins e impulsiona o seu nível.' },
      { key: 'founders', name: 'PRX Founders', body: 'Encontros que aproximam jovens empreendedores de investidores.' },
    ],
  };
}
