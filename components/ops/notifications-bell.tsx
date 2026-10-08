// Hello World
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Bell, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatDateTime } from '@/lib/factory/format';
import type { OpsNotification } from '@/lib/ops/queries';
import { cn } from '@/lib/utils';

interface Props {
  initial: OpsNotification[];
  markAllRead: () => Promise<void>;
  realtime: boolean;
}

/** Bell + live toast. New rows arrive through Supabase Realtime (RLS-filtered). */
export function NotificationsBell({ initial, markAllRead, realtime }: Props) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<OpsNotification | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const unread = items.filter((n) => !n.read).length;

  useEffect(() => setItems(initial), [initial]);

  useEffect(() => {
    if (!realtime) return;
    const supabase = createClient();
    const channel = supabase
      .channel('ops-notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
        const row = payload.new as OpsNotification & { user_id: string | null };
        if (row.user_id !== null) return;
        setItems((current) => [row, ...current].slice(0, 30));
        setToast(row);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [realtime]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 9000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={panelRef} className="relative">
      <button
        type="button"
        aria-label={unread ? `Notificações: ${unread} não lidas` : 'Notificações'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-10 cursor-pointer place-items-center rounded-sm border border-line bg-white text-ink hover:border-ink"
      >
        <Bell aria-hidden="true" className="size-4" />
        {unread ? (
          <span className="absolute -right-1.5 -top-1.5 min-w-5 rounded-[2px] bg-brand px-1 text-center font-mono text-[0.65rem] leading-5 text-white">
            {unread > 9 ? '9+' : unread}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-12 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-sm border border-line bg-white shadow-[0_20px_50px_-24px_rgba(15,31,51,0.35)]">
          <div className="flex min-h-11 items-center justify-between border-b border-line px-3">
            <span className="text-sm font-semibold text-ink">Notificações</span>
            {unread ? (
              <form
                action={async () => {
                  await markAllRead();
                  setItems((current) => current.map((n) => ({ ...n, read: true })));
                }}
              >
                <button type="submit" className="min-h-10 cursor-pointer text-xs text-ink-soft hover:text-ink hover:underline">
                  Marcar todas como lidas
                </button>
              </form>
            ) : null}
          </div>
          <ul className="max-h-96 overflow-y-auto" data-lenis-prevent>
            {items.length === 0 ? <li className="px-3 py-6 text-center text-sm text-mute">Nada por aqui.</li> : null}
            {items.map((n) => (
              <li key={n.id} className={cn('border-b border-line px-3 py-2.5 text-sm', !n.read && 'bg-brand-tint/50')}>
                <p className="font-medium text-ink">{n.title}</p>
                {n.message ? <p className="text-ink-soft">{n.message}</p> : null}
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-mono text-[0.68rem] text-mute">{formatDateTime(n.created_at)}</span>
                  {n.link ? (
                    <Link href={n.link} onClick={() => setOpen(false)} className="text-xs font-medium text-brand hover:underline">
                      Abrir →
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div aria-live="polite" className="pointer-events-none fixed bottom-4 right-4 z-[70] w-[min(24rem,calc(100vw-2rem))]">
        <AnimatePresence>
          {toast ? (
            <motion.div
              key={toast.id}
              role="status"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="pointer-events-auto rounded-sm border border-ink bg-white p-4 shadow-[0_20px_50px_-24px_rgba(15,31,51,0.45)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{toast.title}</p>
                  {toast.message ? <p className="mt-0.5 text-sm text-ink-soft">{toast.message}</p> : null}
                </div>
                <button type="button" aria-label="Fechar aviso" onClick={() => setToast(null)} className="grid size-8 cursor-pointer place-items-center text-mute hover:text-ink">
                  <X aria-hidden="true" className="size-4" />
                </button>
              </div>
              {toast.link ? (
                <Link href={toast.link} onClick={() => setToast(null)} className="mt-3 inline-flex min-h-10 items-center rounded-sm bg-ink px-3 text-sm font-medium text-white hover:bg-brand">
                  Abrir pedido →
                </Link>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
