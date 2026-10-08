// Hello World
import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';

export type AuditAction =
  | 'login' | 'logout' | 'order.create' | 'order.update' | 'order.status'
  | 'price.update' | 'product.update' | 'delivery.send' | 'order.cancel' | 'subscription.update'
  | 'revision.update' | 'settings.update' | 'user.role';

export interface AuditEntry {
  userId: string | null;
  action: AuditAction;
  entity: string;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
}

/** Append-only; written with the service role so clients can never forge or erase it. */
export async function logAudit(entry: AuditEntry): Promise<void> {
  const { error } = await createAdminClient().from('audit_logs').insert({
    user_id: entry.userId,
    action: entry.action,
    entity: entry.entity,
    entity_id: entry.entityId ?? null,
    metadata: entry.metadata ?? {},
  });
  if (error) console.error('audit_log_failed', error.message);
}
