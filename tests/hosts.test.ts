// Hello World
import { describe, expect, it } from 'vitest';
import { getHostKind, isInternalPath, rewritePath } from '@/lib/hosts';

describe('getHostKind', () => {
  it('routes factory and ops, ignoring port and case', () => {
    expect(getHostKind('Factory.viraweb.dev.br')).toBe('factory');
    expect(getHostKind('ops.viraweb.dev.br:443')).toBe('ops');
    expect(getHostKind('factory.localhost:3000')).toBe('factory');
  });

  it('never touches admin.viraweb.dev.br or unknown hosts', () => {
    expect(getHostKind('admin.viraweb.dev.br')).toBe('main');
    expect(getHostKind('viraweb.dev.br')).toBe('main');
    expect(getHostKind(null)).toBe('main');
  });
});

describe('rewritePath', () => {
  it('maps root and nested paths', () => {
    expect(rewritePath('factory', '/')).toBe('/sites/factory');
    expect(rewritePath('ops', '/orders/1')).toBe('/sites/ops/orders/1');
  });

  it('detects internal paths', () => {
    expect(isInternalPath('/sites/ops')).toBe(true);
    expect(isInternalPath('/sitesmap')).toBe(false);
  });
});
