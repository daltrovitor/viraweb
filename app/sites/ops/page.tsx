// Hello World
import { requireRole } from '@/lib/auth/guards';

export default async function OpsHome() {
  const user = await requireRole();
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">Operations</h1>
      <p className="mt-2 text-sm text-[color:var(--mute)]">{user.email} · {user.role}</p>
    </main>
  );
}
