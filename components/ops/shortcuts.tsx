// Hello World
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ROUTES: Record<string, string> = {
  d: '/',
  o: '/orders',
  p: '/products',
  c: '/customers',
  s: '/subscriptions',
  r: '/revisions',
};

function typing(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
}

/** "g" then a letter jumps between sections; "/" focuses the page search. */
export function OpsShortcuts({ allowed }: { allowed: string[] }) {
  const router = useRouter();

  useEffect(() => {
    let leader = 0;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || typing(event.target)) return;
      if (event.key === '/') {
        const search = document.querySelector<HTMLInputElement>('[data-ops-search]');
        if (search) {
          event.preventDefault();
          search.focus();
        }
        return;
      }
      if (event.key === 'g') {
        leader = Date.now();
        return;
      }
      const route = ROUTES[event.key];
      if (route && Date.now() - leader < 1200 && allowed.includes(route)) {
        leader = 0;
        router.push(route);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router, allowed]);

  return null;
}
