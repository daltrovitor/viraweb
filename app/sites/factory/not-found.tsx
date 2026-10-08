// Hello World
import { ActionNavLink } from '@/components/factory/action-nav-link';

export default function FactoryNotFound() {
  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 px-4 pb-24 pt-[calc(var(--nav-h)+6rem)] sm:px-8 lg:px-12">
      <div className="col-span-12 lg:col-span-8 lg:col-start-3">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">404</p>
        <h1 className="mt-4 text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-ink">
          Essa página não saiu da fábrica.
        </h1>
        <p className="mt-6 max-w-[44ch] text-lg text-ink-soft">O endereço pode ter mudado. Os produtos continuam todos aqui.</p>
        <div className="mt-10">
          <ActionNavLink href="/products" label="Ver produtos" />
        </div>
      </div>
    </div>
  );
}
