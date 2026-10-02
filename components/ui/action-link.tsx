// Hello World
import type { AnchorHTMLAttributes } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RollText } from '@/components/motion/roll-text';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'light' | 'odonto' | 'odonto-outline';

interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  variant?: Variant;
  size?: 'md' | 'lg';
  icon?: boolean;
}

const BASE: Record<Variant, string> = {
  primary: 'bg-ink text-white',
  outline: 'border border-line-strong bg-white text-ink',
  light: 'bg-white text-ink',
  odonto: 'bg-odonto text-white',
  'odonto-outline': 'border border-line-strong bg-white text-ink',
};

const FILL: Record<Variant, string> = {
  primary: 'bg-brand',
  outline: 'bg-ink',
  light: 'bg-brand-tint',
  odonto: 'bg-odonto-strong',
  'odonto-outline': 'bg-odonto-tint',
};

const HOVER_TEXT: Record<Variant, string> = {
  primary: '',
  outline: 'group-hover:text-white',
  light: '',
  odonto: '',
  'odonto-outline': 'group-hover:text-odonto-strong',
};

/** Primary call-to-action link: wipe-up fill, rolling label and a nudging arrow. */
export function ActionLink({
  label,
  variant = 'primary',
  size = 'lg',
  icon = true,
  className,
  ...props
}: ActionLinkProps) {
  return (
    <a
      {...props}
      className={cn(
        'roll-trigger group relative isolate inline-flex cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-sm font-medium tracking-[-0.01em] transition-[transform,color] duration-300 active:scale-[0.98]',
        size === 'lg' ? 'min-h-14 px-6 text-[0.95rem]' : 'min-h-12 px-5 text-sm',
        BASE[variant],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-out-expo group-hover:scale-y-100',
          FILL[variant],
        )}
      />
      <span className={cn('transition-colors duration-300', HOVER_TEXT[variant])}>
        <RollText text={label} />
      </span>
      {icon ? (
        <ArrowUpRight
          aria-hidden="true"
          className={cn(
            'size-4 shrink-0 transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
            HOVER_TEXT[variant],
          )}
        />
      ) : null}
    </a>
  );
}
