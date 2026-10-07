// Hello World
/**
 * Hostname → experience routing. Hosts are env-driven so a domain change never
 * touches code. Unknown hosts (including admin.viraweb.dev.br) always resolve
 * to "main" and are never rewritten.
 */
export type HostKind = 'main' | 'factory' | 'ops';

export const FACTORY_HOST = (process.env.FACTORY_HOST ?? 'factory.viraweb.dev.br').toLowerCase();
export const OPS_HOST = (process.env.OPS_HOST ?? 'ops.viraweb.dev.br').toLowerCase();

/** Internal route prefixes the proxy rewrites to; never reachable directly. */
export const INTERNAL_PREFIX = '/sites';
export const REWRITE_TARGET: Record<Exclude<HostKind, 'main'>, string> = {
  factory: `${INTERNAL_PREFIX}/factory`,
  ops: `${INTERNAL_PREFIX}/ops`,
};

export function normalizeHost(hostHeader: string | null | undefined): string {
  if (!hostHeader) return '';
  return hostHeader.split(',')[0].trim().toLowerCase().replace(/:\d+$/, '');
}

export function getHostKind(hostHeader: string | null | undefined): HostKind {
  const host = normalizeHost(hostHeader);
  if (host === FACTORY_HOST || host === 'factory.localhost') return 'factory';
  if (host === OPS_HOST || host === 'ops.localhost') return 'ops';
  return 'main';
}

/** Maps a public path on a sub-experience host to its internal route. */
export function rewritePath(kind: Exclude<HostKind, 'main'>, pathname: string): string {
  const base = REWRITE_TARGET[kind];
  return pathname === '/' ? base : `${base}${pathname}`;
}

export function isInternalPath(pathname: string): boolean {
  return pathname === INTERNAL_PREFIX || pathname.startsWith(`${INTERNAL_PREFIX}/`);
}
