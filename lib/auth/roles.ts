// Hello World
export const ROLES = ['customer', 'admin', 'production', 'support'] as const;
export type Role = (typeof ROLES)[number];

export const OPS_ROLES: readonly Role[] = ['admin', 'production', 'support'];

export type Permission =
  | 'orders:read'
  | 'orders:write'
  | 'orders:assign'
  | 'production:update'
  | 'delivery:send'
  | 'products:write'
  | 'prices:write'
  | 'customers:read'
  | 'payments:read'
  | 'subscriptions:read'
  | 'users:manage'
  | 'settings:write'
  | 'audit:read'
  | 'revisions:respond';

const MATRIX: Record<Role, readonly Permission[]> = {
  customer: [],
  admin: [
    'orders:read', 'orders:write', 'orders:assign', 'production:update', 'delivery:send',
    'products:write', 'prices:write', 'customers:read', 'payments:read', 'subscriptions:read',
    'users:manage', 'settings:write', 'audit:read', 'revisions:respond',
  ],
  production: ['orders:read', 'production:update', 'delivery:send'],
  support: ['orders:read', 'customers:read', 'subscriptions:read', 'revisions:respond'],
};

export function can(role: Role | null | undefined, permission: Permission): boolean {
  return !!role && MATRIX[role].includes(permission);
}

export function isOpsRole(role: Role | null | undefined): role is Exclude<Role, 'customer'> {
  return !!role && OPS_ROLES.includes(role);
}
