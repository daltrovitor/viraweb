// Hello World
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ViraWeb Operations',
  robots: { index: false, follow: false },
};

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white text-[color:var(--ink)]">{children}</div>;
}
