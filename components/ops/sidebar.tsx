// Hello World
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BrandMark } from '@/components/brand/brand-mark';
import { publicOpsPath } from './paths';

export interface OpsNavItem {
  href: string;
  label: string;
  shortcut?: string;
}

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export function OpsSidebar({ items, footer }: { items: OpsNavItem[]; footer: React.ReactNode }) {
  const pathname = publicOpsPath(usePathname());
  const [open, setOpen] = useState(false);

  const nav = (
    <nav aria-label="Operations">
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex min-h-10 items-center justify-between rounded-sm px-3 text-sm transition-colors',
                  active ? 'bg-ink text-white' : 'text-ink-soft hover:bg-surface hover:text-ink',
                )}
              >
                {item.label}
                {item.shortcut ? (
                  <kbd className={cn('font-mono text-[0.65rem]', active ? 'text-white/60' : 'text-mute')}>{item.shortcut}</kbd>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-white px-4 lg:hidden">
        <Link href="/" className="flex min-h-12 items-center gap-2 text-sm font-semibold text-ink">
          <BrandMark className="w-6" />
          Operations
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="ops-mobile-nav"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
          className="grid size-12 cursor-pointer place-items-center rounded-sm border border-line"
        >
          {open ? <X aria-hidden="true" className="size-4" /> : <Menu aria-hidden="true" className="size-4" />}
        </button>
      </div>
      {open ? (
        <div id="ops-mobile-nav" className="border-b border-line bg-white p-3 lg:hidden">
          {nav}
          <div className="mt-3 border-t border-line pt-3">{footer}</div>
        </div>
      ) : null}

      <aside className="sticky top-0 hidden h-svh w-60 shrink-0 flex-col border-r border-line bg-white lg:flex">
        <Link href="/" className="flex h-14 items-center gap-2.5 border-b border-line px-4 text-sm font-semibold text-ink">
          <BrandMark className="w-6" />
          <span>
            Factory <span className="font-normal text-mute">Operations</span>
          </span>
        </Link>
        <div className="flex-1 overflow-y-auto p-3">{nav}</div>
        <div className="border-t border-line p-3">{footer}</div>
      </aside>
    </>
  );
}
