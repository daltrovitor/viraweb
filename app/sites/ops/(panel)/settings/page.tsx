// Hello World
import type { Metadata } from 'next';
import { requirePermission } from '@/lib/auth/guards';
import { createClient } from '@/lib/supabase/server';
import { listOperators } from '@/lib/ops/queries';
import { formatDate } from '@/lib/factory/format';
import { envReport } from '@/lib/env';
import { FACTORY_HOST, OPS_HOST } from '@/lib/hosts';
import { OpsActionButton, OpsForm } from '@/components/ops/forms';
import { DefinitionList, PageHeader, Panel, opsInput } from '@/components/ops/ui';
import { addHoliday, removeHoliday, setUserRole, testStripeConnection } from '../actions';

export const metadata: Metadata = { title: 'Configurações' };
export const dynamic = 'force-dynamic';

const ROLE = { admin: 'Admin', production: 'Produção', support: 'Suporte', customer: 'Cliente' } as Record<string, string>;

export default async function SettingsPage() {
  await requirePermission('settings:write');
  const env = envReport();
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);
  const [{ data: holidays }, operators] = await Promise.all([
    supabase.from('holidays').select('day, name').gte('day', today).order('day').limit(60),
    listOperators(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Configurações" description="Feriados do SLA, equipe e integrações da Factory." />

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Feriados (SLA)">
          <p className="mb-3 text-sm text-ink-soft">O prazo de 2 dias úteis ignora sábados, domingos e as datas abaixo (horário de Brasília).</p>
          <OpsForm action={addHoliday} submit="Adicionar feriado" className="mb-4">
            <div className="grid grid-cols-[10rem_1fr] gap-2">
              <label htmlFor="h-day" className="sr-only">Data</label>
              <input id="h-day" name="day" type="date" required className={opsInput} />
              <label htmlFor="h-name" className="sr-only">Nome</label>
              <input id="h-name" name="name" required placeholder="Nome do feriado" className={opsInput} />
            </div>
          </OpsForm>
          <ul className="divide-y divide-line border-t border-line text-sm">
            {(holidays ?? []).map((h) => (
              <li key={h.day as string} className="flex items-center justify-between gap-3 py-1.5">
                <span><span className="font-mono text-xs text-mute">{formatDate(`${h.day}T12:00:00Z`)}</span> · {h.name as string}</span>
                <OpsActionButton action={removeHoliday.bind(null, h.day as string)} label="Remover" variant="danger" confirm={`Remover ${h.name}?`} />
              </li>
            ))}
          </ul>
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel title="Equipe e papéis">
            <ul className="mb-4 divide-y divide-line text-sm">
              {operators.map((o) => (
                <li key={o.id} className="flex items-center justify-between py-2">
                  <span>{o.name ?? o.email} <span className="text-xs text-mute">{o.email}</span></span>
                  <span className="font-mono text-xs uppercase text-mute">{ROLE[o.role]}</span>
                </li>
              ))}
            </ul>
            <OpsForm action={setUserRole} submit="Atualizar papel" confirm="Confirmar alteração de acesso?">
              <p className="text-xs text-mute">A pessoa precisa ter criado uma conta (Factory ou convite do Supabase) antes.</p>
              <div className="grid grid-cols-[1fr_9rem] gap-2">
                <label htmlFor="r-email" className="sr-only">E-mail</label>
                <input id="r-email" name="email" type="email" required placeholder="email@viraweb.dev.br" className={opsInput} />
                <label htmlFor="r-role" className="sr-only">Papel</label>
                <select id="r-role" name="role" defaultValue="production" className={opsInput}>
                  <option value="admin">Admin</option>
                  <option value="production">Produção</option>
                  <option value="support">Suporte</option>
                  <option value="customer">Cliente (remover acesso)</option>
                </select>
              </div>
            </OpsForm>
          </Panel>

          <Panel title="Integrações e diagnóstico">
            <DefinitionList
              items={[
                ['Factory', FACTORY_HOST],
                ['Operations', OPS_HOST],
                ['Supabase', env.supabaseUrl && env.supabaseAnon ? 'URL e anon key ok' : 'NEXT_PUBLIC_SUPABASE_URL / ANON_KEY ausentes'],
                ['Service role', env.supabaseServiceRole ? 'ok' : 'SUPABASE_SERVICE_ROLE_KEY ausente (pedidos não são criados)'],
                ['Stripe (checkout)', env.stripeSecret ? `ok · modo ${env.stripeMode === 'live' ? 'produção' : 'teste'}` : env.stripeSecretPresentButInvalid ? 'STRIPE_SECRET_KEY em formato inválido' : 'STRIPE_SECRET_KEY ausente'],
                ['Stripe (webhook)', env.stripeWebhook ? 'ok · /api/stripe/webhook' : 'STRIPE_WEBHOOK_SECRET ausente — pagamentos são confirmados no retorno do checkout; renovações e falhas dependem do webhook'],
                ['Fuso do SLA', 'America/Sao_Paulo'],
              ]}
            />
            <OpsForm action={testStripeConnection} submit="Testar conexão com o Stripe" variant="secondary" className="mt-4" />
            <p className="mt-2 text-xs text-mute">Variáveis alteradas na Vercel só valem após um novo deploy.</p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
