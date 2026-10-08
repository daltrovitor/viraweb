// Hello World
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Operations · ViraWeb Factory', template: '%s · Operations' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function OpsRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-svh bg-white text-ink">{children}</div>;
}
