// Hello World
import { requireRole } from '@/lib/auth/guards';
import { can, type Permission } from '@/lib/auth/roles';
import { isSupabaseConfigured } from '@/lib/env';
import { opsNotifications } from '@/lib/ops/queries';
import { OpsSidebar, type OpsNavItem } from '@/components/ops/sidebar';
import { OpsShortcuts } from '@/components/ops/shortcuts';
import { NotificationsBell } from '@/components/ops/notifications-bell';
import { markOpsNotificationsRead } from './actions';
import { signOutOps } from '../login/actions';

export const dynamic = 'force-dynamic';

const NAV: Array<OpsNavItem & { permission: Permission | null }> = [
  { href: '/', label: 'Dashboard', shortcut: 'g d', permission: null },
  { href: '/orders', label: 'Pedidos', shortcut: 'g o', permission: 'orders:read' },
  { href: '/revisions', label: 'Alterações', shortcut: 'g r', permission: 'orders:read' },
  { href: '/products', label: 'Produtos', shortcut: 'g p', permission: 'products:write' },
  { href: '/customers', label: 'Clientes', shortcut: 'g c', permission: 'customers:read' },
  { href: '/subscriptions', label: 'Assinaturas', shortcut: 'g s', permission: 'subscriptions:read' },
  { href: '/payments', label: 'Pagamentos', permission: 'payments:read' },
  { href: '/audit', label: 'Auditoria', permission: 'audit:read' },
  { href: '/settings', label: 'Configurações', permission: 'settings:write' },
];

const ROLE_LABEL = { admin: 'Admin', production: 'Produção', support: 'Suporte', customer: 'Cliente' } as const;

export default async function OpsPanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole();
  const items = NAV.filter((item) => item.permission === null || can(user.role, item.permission)).map(({ permission: _p, ...item }) => item);
  const notifications = await opsNotifications();

  const footer = (
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-ink">{user.name ?? user.email}</p>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-mute">{ROLE_LABEL[user.role]}</p>
      </div>
      <form action={signOutOps}>
        <button type="submit" className="min-h-10 cursor-pointer rounded-sm px-2 text-xs text-ink-soft hover:bg-surface hover:text-ink">
          Sair
        </button>
      </form>
    </div>
  );

  return (
    <div className="lg:flex">
      <OpsSidebar items={items} footer={footer} />
      <div className="min-w-0 flex-1">
        <div className="sticky top-14 z-30 flex h-14 items-center justify-end gap-3 border-b border-line bg-white/95 px-4 backdrop-blur lg:top-0 lg:px-8">
          <span className="mr-auto hidden font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mute sm:block">
            ViraWeb Factory · ops
          </span>
          <NotificationsBell initial={notifications} markAllRead={markOpsNotificationsRead} realtime={isSupabaseConfigured()} />
        </div>
        <main id="conteudo" className="px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
      <OpsShortcuts allowed={items.map((i) => i.href)} />
    </div>
  );
}
