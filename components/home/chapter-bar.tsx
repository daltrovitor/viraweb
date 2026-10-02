// Hello World
import { EXTERNAL_LINK_PROPS } from '@/lib/site';
import { cn } from '@/lib/utils';

/** Thin mono bar that opens each product chapter, linking out to the product. */
interface ChapterBarProps {
  label: string;
  href: string;
  host: string;
  accent?: 'brand' | 'odonto';
}

export function ChapterBar({ label, href, host, accent = 'brand' }: ChapterBarProps) {
  return (
    <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 border-b border-line px-4 py-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute sm:px-8 lg:px-12">
      <span>{label}</span>
      <a
        href={href}
        {...EXTERNAL_LINK_PROPS}
        className={cn(
          'inline-flex min-h-12 items-center normal-case tracking-normal text-ink-soft underline-offset-4 transition-colors hover:underline',
          accent === 'brand' ? 'hover:text-brand' : 'hover:text-odonto',
        )}
      >
        {host} ↗
      </a>
    </div>
  );
}
