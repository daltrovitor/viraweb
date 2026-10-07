// Hello World
import { describe, expect, it } from 'vitest';
import { can, isOpsRole } from '@/lib/auth/roles';

describe('RBAC matrix', () => {
  it('admin can change prices; production and support cannot', () => {
    expect(can('admin', 'prices:write')).toBe(true);
    expect(can('production', 'prices:write')).toBe(false);
    expect(can('support', 'prices:write')).toBe(false);
  });

  it('support cannot read payments; production can deliver', () => {
    expect(can('support', 'payments:read')).toBe(false);
    expect(can('production', 'delivery:send')).toBe(true);
  });

  it('customers have no ops access', () => {
    expect(isOpsRole('customer')).toBe(false);
    expect(can('customer', 'orders:read')).toBe(false);
    expect(can(null, 'orders:read')).toBe(false);
  });
});
