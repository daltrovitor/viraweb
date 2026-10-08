// Hello World
import Link from 'next/link';
import { ActionInner, actionClassName, type ActionSize, type ActionVariant } from '@/components/ui/action-link';

interface ActionNavLinkProps {
  href: string;
  label: string;
  variant?: ActionVariant;
  size?: ActionSize;
  icon?: boolean;
  className?: string;
  prefetch?: boolean;
}

/** ActionLink styling on a client-side Next.js route transition. */
export function ActionNavLink({ href, label, variant = 'primary', size = 'lg', icon = true, className, prefetch }: ActionNavLinkProps) {
  return (
    <Link href={href} prefetch={prefetch} className={actionClassName(variant, size, className)}>
      <ActionInner label={label} variant={variant} icon={icon} />
    </Link>
  );
}
