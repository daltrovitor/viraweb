// Hello World
'use client';

import { useActionState } from 'react';
import type { OpsFormState } from '@/app/sites/ops/(panel)/actions';
import { CATEGORIES } from '@/lib/factory/catalog';
import { PREVIEW_KINDS, TIERS, type Product } from '@/lib/factory/types';
import { TIER_LABEL } from '@/lib/factory/format';
import { OpsSubmit } from './forms';
import { opsInput } from './ui';

interface Props {
  action: (prev: OpsFormState, form: FormData) => Promise<OpsFormState>;
  product: Product | null;
}

const cents = (value: number | null | undefined) => (value === null || value === undefined ? '' : (value / 100).toFixed(2).replace('.', ','));

function Label({ htmlFor, children, hint }: { htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1 text-sm font-medium text-ink">
      {children}
      {hint ? <span className="text-xs font-normal text-mute">{hint}</span> : null}
    </label>
  );
}

export function ProductForm({ action, product }: Props) {
  const [state, formAction] = useActionState(action, {});
  const p = product;

  return (
    <form action={formAction} className="grid gap-6 xl:grid-cols-[1fr_22rem]">
      <div className="grid gap-5 rounded-sm border border-line p-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Nome</Label>
          <input id="name" name="name" required defaultValue={p?.name} className={opsInput} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="slug" hint="URL pública: /products/slug">Slug</Label>
          <input id="slug" name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={p?.slug} className={opsInput} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="summary">Resumo</Label>
          <input id="summary" name="summary" maxLength={200} defaultValue={p?.summary} className={opsInput} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="description">Descrição</Label>
          <textarea id="description" name="description" rows={3} defaultValue={p?.description} className={opsInput} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="category">Categoria</Label>
          <select id="category" name="category" defaultValue={p?.category ?? 'websites'} className={opsInput}>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tier" hint="Somente Standard promete até 2 dias úteis e vai direto ao checkout.">Tipo</Label>
          <select id="tier" name="tier" defaultValue={p?.tier ?? 'standard'} className={opsInput}>
            {TIERS.map((t) => <option key={t} value={t}>{TIER_LABEL[t]}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="setup_price" hint="Em reais. Vazio = sob análise.">Setup (R$)</Label>
          <input id="setup_price" name="setup_price" inputMode="decimal" defaultValue={cents(p?.setupPrice)} className={opsInput} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="monthly_price" hint="Em reais por mês.">Mensalidade (R$)</Label>
          <input id="monthly_price" name="monthly_price" inputMode="decimal" defaultValue={cents(p?.monthlyPrice)} className={opsInput} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="delivery_days" hint="Dias úteis. Vazio = após análise.">Prazo</Label>
          <input id="delivery_days" name="delivery_days" type="number" min={1} max={180} defaultValue={p?.deliveryDays ?? ''} className={opsInput} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="preview">Prévia visual</Label>
          <select id="preview" name="preview" defaultValue={p?.preview ?? 'landing'} className={opsInput}>
            {PREVIEW_KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="features" hint="Um recurso por linha (até 20).">Recursos incluídos</Label>
          <textarea id="features" name="features" rows={5} defaultValue={p?.features.join('\n')} className={opsInput} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="briefing_schema" hint='JSON: [{"name":"campo","label":"Pergunta","type":"text|textarea|url|email|tel|select","required":true,"options":[]}]. Vazio = padrão da categoria. "Explique sua ideia" e contato entram sempre.'>
            Briefing personalizado
          </Label>
          <textarea
            id="briefing_schema"
            name="briefing_schema"
            rows={6}
            spellCheck={false}
            defaultValue={p && p.briefing.length ? JSON.stringify(p.briefing, null, 2) : ''}
            className={`${opsInput} font-mono text-xs`}
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="external_costs_note">Nota de custos externos</Label>
          <input id="external_costs_note" name="external_costs_note" defaultValue={p?.externalCostsNote ?? ''} className={opsInput} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid gap-4 rounded-sm border border-line p-4">
          {[
            ['active', 'Ativo no catálogo', p ? p.active : true],
            ['featured', 'Destaque na tabela de preços da home', p?.featured ?? false],
            ['price_from', 'Exibir “a partir de”', p?.priceFrom ?? false],
          ].map(([name, label, checked]) => (
            <label key={name as string} className="flex min-h-10 cursor-pointer items-center gap-3 text-sm text-ink">
              <input type="checkbox" name={name as string} defaultChecked={checked as boolean} className="size-4 cursor-pointer accent-[var(--brand)]" />
              {label}
            </label>
          ))}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sort_order" hint="Menor aparece primeiro.">Ordem</Label>
            <input id="sort_order" name="sort_order" type="number" min={0} defaultValue={p?.sortOrder ?? 1000} className={opsInput} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="image_url">Imagem (URL)</Label>
            <input id="image_url" name="image_url" type="url" defaultValue={p?.imageUrl ?? ''} className={opsInput} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="seo_title">Título SEO</Label>
            <input id="seo_title" name="seo_title" maxLength={70} defaultValue={p?.seoTitle ?? ''} className={opsInput} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="seo_description">Descrição SEO</Label>
            <textarea id="seo_description" name="seo_description" maxLength={160} rows={2} defaultValue={p?.seoDescription ?? ''} className={opsInput} />
          </div>
        </div>
        {state.error ? <p role="alert" className="text-sm text-[#912018]">{state.error}</p> : null}
        {state.message ? <p role="status" className="text-sm text-[#14532d]">{state.message}</p> : null}
        <OpsSubmit label={p ? 'Salvar alterações' : 'Criar produto'} className="w-full" />
      </div>
    </form>
  );
}
