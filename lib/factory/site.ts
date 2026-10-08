// Hello World
/** Public constants of the Factory experience (safe for client bundles). */

export const FACTORY = {
  name: 'ViraWeb Factory',
  slogan: 'Você explica. A gente constrói.',
  description: 'Sites, automações, bots e sistemas personalizados, prontos em até 2 dias úteis.',
  url: process.env.NEXT_PUBLIC_FACTORY_URL ?? 'https://factory.viraweb.dev.br',
  mainUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://viraweb.dev.br',
} as const;

export const FACTORY_NAV = [
  { label: 'Produtos', href: '/products' },
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Preços', href: '/#precos' },
] as const;

/** Only relative, same-origin paths may be used as post-login destinations. */
export function safeNextPath(value: unknown, fallback = '/dashboard'): string {
  if (typeof value !== 'string') return fallback;
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return fallback;
  return value;
}
