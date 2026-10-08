// Hello World
import 'server-only';
import { headers } from 'next/headers';
import { getHostKind, normalizeHost } from '@/lib/hosts';
import { FACTORY } from './site';

/**
 * Public origin of the current request, trusted only for known hosts
 * (prevents Host-header injection into auth emails and Stripe return URLs).
 */
export async function requestOrigin(fallback: string = FACTORY.url): Promise<string> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const kind = getHostKind(host);
  if (kind === 'main' || !host) return fallback;
  const proto = h.get('x-forwarded-proto') ?? (normalizeHost(host).endsWith('localhost') ? 'http' : 'https');
  return `${proto}://${host.split(',')[0].trim()}`;
}

export async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get('x-forwarded-for')?.split(',')[0].trim() || h.get('x-real-ip') || 'unknown';
}
