// Hello World
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RollText } from '@/components/motion/roll-text';
import { cn } from '@/lib/utils';

export type ActionVariant = 'primary' | 'outline' | 'light';
export type ActionSize = 'md' | 'lg';

interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  variant?: ActionVariant;
  size?: ActionSize;
  icon?: boolean;
}

const BASE: Record<ActionVariant, string> = {
  primary: 'bg-ink text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_10px_30px_-12px_rgba(15,31,51,0.55)]',
  outline: 'bg-white text-ink shadow-[inset_0_0_0_1px_var(--line-strong)]',
  light: 'bg-white text-ink shadow-[0_10px_30px_-14px_rgba(15,31,51,0.4)]',
};

const FILL: Record<ActionVariant, string> = {
  primary: 'bg-brand',
  outline: 'bg-ink',
  light: 'bg-brand-tint',
};

const HOVER_TEXT: Record<ActionVariant, string> = {
  primary: '',
  outline: 'group-hover:text-white',
  light: '',
};

/** The trailing arrow lives in its own island, flush with the pill's right padding. */
const ISLAND: Record<ActionVariant, string> = {
  primary: 'bg-white/12 text-white',
  outline: 'bg-ink/[0.06] text-ink group-hover:bg-white/15 group-hover:text-white',
  light: 'bg-ink/[0.06] text-ink',
};

/** Shared classes so links, Next links and buttons render the same call-to-action. */
export function actionClassName(variant: ActionVariant = 'primary', size: ActionSize = 'lg', className?: string) {
  return cn(
    'roll-trigger group relative isolate inline-flex cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-[transform,color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
    size === 'lg' ? 'min-h-14 pl-6 pr-2 text-[0.95rem]' : 'min-h-12 pl-5 pr-1.5 text-sm',
    BASE[variant],
    className,
  );
}

/** Inner content: wipe-up fill, rolling label and an arrow nested in its own circle. */
export function ActionInner({
  label,
  variant = 'primary',
  icon = true,
  iconNode,
  size = 'lg',
}: {
  label: string;
  variant?: ActionVariant;
  icon?: boolean;
  iconNode?: ReactNode;
  size?: ActionSize;
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-out-expo group-hover:scale-y-100 group-disabled:scale-y-0',
          FILL[variant],
        )}
      />
      <span className={cn('transition-colors duration-300', HOVER_TEXT[variant], !icon && 'pr-3.5')}>
        <RollText text={label} />
      </span>
      {icon ? (
        <span
          aria-hidden="true"
          className={cn(
            'grid shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105',
            size === 'lg' ? 'size-10' : 'size-9',
            ISLAND[variant],
          )}
        >
          {iconNode ?? <ArrowUpRight className="size-4" strokeWidth={1.6} />}
        </span>
      ) : null}
    </>
  );
}

/** Primary call-to-action link: pill, wipe-up fill, rolling label and an arrow island. */
export function ActionLink({ label, variant = 'primary', size = 'lg', icon = true, className, ...props }: ActionLinkProps) {
  return (
    <a {...props} className={actionClassName(variant, size, className)}>
      <ActionInner label={label} variant={variant} icon={icon} size={size} />
    </a>
  );
}

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ActionVariant;
  size?: ActionSize;
  icon?: boolean;
}

export function ActionButton({ label, variant = 'primary', size = 'lg', icon = true, className, type = 'button', ...props }: ActionButtonProps) {
  return (
    <button {...props} type={type} className={actionClassName(variant, size, className)}>
      <ActionInner label={label} variant={variant} icon={icon} size={size} />
    </button>
  );
}
