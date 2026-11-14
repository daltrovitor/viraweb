import { describe, expect, it } from 'vitest';
import { CANONICAL_ORIGIN, absoluteUrl, resolveSiteUrl, whatsappLink, SITE } from '@/lib/site';

describe('resolveSiteUrl', () => {
  it('falls back to the canonical origin when the variable is missing', () => {
    expect(resolveSiteUrl(undefined)).toBe(CANONICAL_ORIGIN);
    expect(resolveSiteUrl('')).toBe(CANONICAL_ORIGIN);
    expect(resolveSiteUrl(null)).toBe(CANONICAL_ORIGIN);
  });

  it('rejects a foreign or parked domain so it can never become the canonical URL', () => {
    expect(resolveSiteUrl('https://www.viraweb.online/')).toBe(CANONICAL_ORIGIN);
    expect(resolveSiteUrl('https://viraweb.online')).toBe(CANONICAL_ORIGIN);
    expect(resolveSiteUrl('https://evil.example/viraweb.dev.br')).toBe(CANONICAL_ORIGIN);
    expect(resolveSiteUrl('https://viraweb.dev.br.evil.example')).toBe(CANONICAL_ORIGIN);
  });

  it('rejects non-https and malformed values', () => {
    expect(resolveSiteUrl('http://www.viraweb.dev.br')).toBe(CANONICAL_ORIGIN);
    expect(resolveSiteUrl('not a url')).toBe(CANONICAL_ORIGIN);
  });

  it('accepts our own domain and strips paths and trailing slashes', () => {
    expect(resolveSiteUrl('https://www.viraweb.dev.br/')).toBe('https://www.viraweb.dev.br');
    expect(resolveSiteUrl(' https://viraweb.dev.br ')).toBe('https://viraweb.dev.br');
    expect(resolveSiteUrl('https://staging.viraweb.dev.br/some/path')).toBe('https://staging.viraweb.dev.br');
  });
});

describe('absoluteUrl', () => {
  it('never produces a double slash', () => {
    expect(absoluteUrl('/')).toBe(SITE.url);
    expect(absoluteUrl('/propostas')).toBe(`${SITE.url}/propostas`);
    expect(absoluteUrl('propostas')).toBe(`${SITE.url}/propostas`);
    expect(absoluteUrl('/sitemap.xml')).not.toContain('br//');
  });
});

describe('whatsappLink', () => {
  it('uses the single official number and encodes the message', () => {
    expect(whatsappLink()).toBe('https://wa.me/5562984638578');
    expect(whatsappLink('Olá ViraWeb! Preciso de um site.')).toBe(
      'https://wa.me/5562984638578?text=Ol%C3%A1%20ViraWeb!%20Preciso%20de%20um%20site.',
    );
  });
});
