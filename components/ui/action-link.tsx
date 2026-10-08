// Hello World
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RollText } from '@/components/motion/roll-text';
import { cn } from '@/lib/utils';

export type ActionVariant = 'primary' | 'outline' | 'light' | 'odonto' | 'odonto-outline';
export type ActionSize = 'md' | 'lg';

interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  variant?: ActionVariant;
  size?: ActionSize;
  icon?: boolean;
}

const BASE: Record<ActionVariant, string> = {
  primary: 'bg-ink text-white',
  outline: 'border border-line-strong bg-white text-ink',
  light: 'bg-white text-ink',
  odonto: 'bg-odonto text-white',
  'odonto-outline': 'border border-line-strong bg-white text-ink',
};

const FILL: Record<ActionVariant, string> = {
  primary: 'bg-brand',
  outline: 'bg-ink',
  light: 'bg-brand-tint',
  odonto: 'bg-odonto-strong',
  'odonto-outline': 'bg-odonto-tint',
};

const HOVER_TEXT: Record<ActionVariant, string> = {
  primary: '',
  outline: 'group-hover:text-white',
  light: '',
  odonto: '',
  'odonto-outline': 'group-hover:text-odonto-strong',
};

/** Shared classes so links, Next links and buttons render the same call-to-action. */
export function actionClassName(variant: ActionVariant = 'primary', size: ActionSize = 'lg', className?: string) {
  return cn(
    'roll-trigger group relative isolate inline-flex cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-sm font-medium tracking-[-0.01em] transition-[transform,color] duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
    size === 'lg' ? 'min-h-14 px-6 text-[0.95rem]' : 'min-h-12 px-5 text-sm',
    BASE[variant],
    className,
  );
}

/** Inner content: wipe-up fill, rolling label and a nudging arrow. */
export function ActionInner({
  label,
  variant = 'primary',
  icon = true,
  iconNode,
}: {
  label: string;
  variant?: ActionVariant;
  icon?: boolean;
  iconNode?: ReactNode;
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-out-expo group-hover:scale-y-100 group-disabled:scale-y-0',
          FILL[variant],
        )}
      />
      <span className={cn('transition-colors duration-300', HOVER_TEXT[variant])}>
        <RollText text={label} />
      </span>
      {icon
        ? (iconNode ?? (
            <ArrowUpRight
              aria-hidden="true"
              className={cn(
                'size-4 shrink-0 transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
                HOVER_TEXT[variant],
              )}
            />
          ))
        : null}
    </>
  );
}

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
    <a {...props} className={actionClassName(variant, size, className)}>
      <ActionInner label={label} variant={variant} icon={icon} />
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
      <ActionInner label={label} variant={variant} icon={icon} />
    </button>
  );
}
