// Hello World
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ViraWeb Factory — Você explica. A gente constrói.',
  description: 'Sites, automações, bots e sistemas personalizados, prontos em até 2 dias úteis.',
};

/** Phase 1 placeholder: the editorial experience ships in Phase 2. */
export default function FactoryHome() {
  return (
    <main className="flex min-h-screen items-center bg-white px-4 sm:px-8">
      <h1 className="text-3xl font-semibold text-[color:var(--ink)] sm:text-5xl">
        Você explica. A gente constrói.
      </h1>
    </main>
  );
}
