// Hello World
import { describe, expect, it } from 'vitest';
import { briefingFieldsFor, buildBriefingSchema, briefingSchemaValidator } from '@/lib/factory/briefing';
import { STATIC_CATALOG } from '@/lib/factory/catalog';
import { formatBRL, setupLabel } from '@/lib/factory/format';

const landing = STATIC_CATALOG.find((p) => p.slug === 'landing-page')!;

describe('briefing', () => {
  it('always starts with the idea field', () => {
    const fields = briefingFieldsFor(landing);
    expect(fields[0].name).toBe('idea');
    expect(fields.map((f) => f.name)).toEqual(expect.arrayContaining(['audience', 'cta', 'domain', 'whatsapp']));
  });

  it('requires a meaningful idea and strips unknown keys', () => {
    const schema = buildBriefingSchema(briefingFieldsFor(landing));
    expect(schema.safeParse({ idea: 'curta' }).success).toBe(false);
    const ok = schema.safeParse({
      idea: 'Quero uma página para vender meu curso de inglês online.',
      product: 'Curso', audience: 'Adultos', goal: 'Vender', cta: 'WhatsApp',
      name: 'Ana', whatsapp: '62999999999', logo: '', injected: 'x',
    });
    expect(ok.success).toBe(true);
    expect(ok.success && 'injected' in ok.data).toBe(false);
  });

  it('rejects invalid urls and select values', () => {
    const schema = buildBriefingSchema(briefingFieldsFor(landing));
    const result = schema.safeParse({
      idea: 'Quero uma página para vender meu curso de inglês online.',
      product: 'Curso', audience: 'Adultos', goal: 'Outro', cta: 'WhatsApp',
      name: 'Ana', whatsapp: '6299', logo: 'javascript:alert(1)',
    });
    expect(result.success).toBe(false);
  });

  it('validates operations-edited schemas', () => {
    expect(briefingSchemaValidator.safeParse([{ name: 'Bad Name', label: 'x', type: 'text' }]).success).toBe(false);
    expect(briefingSchemaValidator.safeParse([{ name: 'menu', label: 'Cardápio', type: 'textarea' }]).success).toBe(true);
  });
});

describe('catalog & format', () => {
  it('formats BRL without cents for whole amounts', () => {
    expect(formatBRL(29700)).toBe('R$ 297');
    expect(setupLabel({ setupPrice: 149700, priceFrom: true })).toBe('a partir de R$ 1.497');
  });

  it('has unique slugs and standard items priced', () => {
    const slugs = STATIC_CATALOG.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of STATIC_CATALOG.filter((x) => x.tier === 'standard')) {
      expect(p.setupPrice).not.toBeNull();
      expect(p.deliveryDays).toBe(2);
    }
  });
});
