// Hello World
import { z } from 'zod';
import { BRIEFING_FIELD_TYPES, type BriefingField, type CategoryId, type Product } from './types';

/** The heart of every briefing: always first, always required. */
export const IDEA_FIELD: BriefingField = {
  name: 'idea',
  label: 'Explique sua ideia',
  type: 'textarea',
  required: true,
  placeholder:
    'Quero uma página para vender meu curso de inglês. Quero algo moderno, escuro, com bastante movimento e um botão para WhatsApp...',
  help: 'Escreva do seu jeito. Quanto mais contexto, mais certeiro fica o resultado.',
};

const CONTACT: BriefingField[] = [
  { name: 'name', label: 'Seu nome', type: 'text', required: true, placeholder: 'Nome completo' },
  { name: 'company', label: 'Empresa', type: 'text', placeholder: 'Nome da empresa ou marca' },
  { name: 'whatsapp', label: 'WhatsApp para contato', type: 'tel', required: true, placeholder: '(62) 9 0000-0000' },
];

const BY_CATEGORY: Record<CategoryId, BriefingField[]> = {
  websites: [
    { name: 'product', label: 'O que você vende ou oferece', type: 'text', required: true, placeholder: 'Curso, serviço, produto…' },
    { name: 'audience', label: 'Para quem é', type: 'text', required: true, placeholder: 'Quem é o seu cliente ideal' },
    { name: 'goal', label: 'Objetivo da página', type: 'select', required: true, options: ['Vender', 'Captar contatos', 'Agendar', 'Apresentar a empresa', 'Divulgar um evento'] },
    { name: 'cta', label: 'Ação principal (CTA)', type: 'text', required: true, placeholder: 'Ex.: falar no WhatsApp, comprar agora' },
    { name: 'visual', label: 'Identidade visual', type: 'text', placeholder: 'Cores, estilo, sensação que a página deve passar' },
    { name: 'logo', label: 'Link do logo', type: 'url', placeholder: 'https:// (Drive, Dropbox, site)', help: 'Se ainda não tiver, deixe em branco.' },
    { name: 'references', label: 'Referências', type: 'textarea', placeholder: 'Sites ou perfis que você gosta e por quê' },
    { name: 'copy', label: 'Textos', type: 'textarea', placeholder: 'Cole textos prontos ou descreva o que precisa ser dito' },
    { name: 'domain', label: 'Domínio', type: 'text', placeholder: 'suaempresa.com.br — ou “ainda não tenho”' },
  ],
  automacao: [
    { name: 'process', label: 'Como esse processo funciona hoje', type: 'textarea', required: true, placeholder: 'Passo a passo do que a equipe faz manualmente' },
    { name: 'tools', label: 'Ferramentas que você usa', type: 'text', required: true, placeholder: 'Planilhas, CRM, e-mail, formulários…' },
    { name: 'trigger', label: 'O que dispara a automação', type: 'text', placeholder: 'Ex.: novo lead no formulário' },
    { name: 'outcome', label: 'Resultado esperado', type: 'text', required: true, placeholder: 'O que deve acontecer no final' },
    { name: 'volume', label: 'Volume aproximado', type: 'text', placeholder: 'Ex.: 300 leads por mês' },
  ],
  bots: [
    { name: 'channel', label: 'Onde o bot vai atender', type: 'select', required: true, options: ['Site', 'WhatsApp', 'Instagram', 'Mais de um canal'] },
    { name: 'goal', label: 'Objetivo do bot', type: 'text', required: true, placeholder: 'Tirar dúvidas, qualificar, agendar…' },
    { name: 'faq', label: 'Perguntas frequentes', type: 'textarea', placeholder: 'As perguntas que seus clientes mais fazem, com as respostas' },
    { name: 'tone', label: 'Tom de voz', type: 'text', placeholder: 'Formal, descontraído, técnico…' },
    { name: 'hours', label: 'Horário de atendimento humano', type: 'text', placeholder: 'Ex.: seg a sex, 8h às 18h' },
    { name: 'handoff', label: 'Para quem encaminhar', type: 'text', placeholder: 'Pessoa, setor ou número' },
  ],
  sistemas: [
    { name: 'users', label: 'Quem vai usar', type: 'text', required: true, placeholder: 'Ex.: 3 vendedores e 1 gerente' },
    { name: 'features', label: 'O que o sistema precisa fazer', type: 'textarea', required: true, placeholder: 'Liste as funções principais' },
    { name: 'data', label: 'Dados que já existem', type: 'text', placeholder: 'Planilhas, outro sistema, nada ainda' },
    { name: 'integrations', label: 'Integrações', type: 'text', placeholder: 'Sistemas que precisam conversar com ele' },
    { name: 'references', label: 'Referências', type: 'textarea', placeholder: 'Sistemas que você já usou e gostou' },
  ],
  ferramentas: [
    { name: 'purpose', label: 'O que a ferramenta resolve', type: 'textarea', required: true, placeholder: 'Ex.: simular o valor de um financiamento' },
    { name: 'inputs', label: 'O que o usuário informa', type: 'text', placeholder: 'Campos de entrada' },
    { name: 'outputs', label: 'O que ela entrega', type: 'text', required: true, placeholder: 'Resultado, PDF, envio…' },
    { name: 'visual', label: 'Identidade visual', type: 'text', placeholder: 'Cores e estilo' },
  ],
  apps: [
    { name: 'users', label: 'Quem vai usar', type: 'text', required: true, placeholder: 'Clientes, equipe, parceiros…' },
    { name: 'features', label: 'Funções principais', type: 'textarea', required: true, placeholder: 'O que o app precisa fazer' },
    { name: 'platforms', label: 'Onde vai rodar', type: 'select', options: ['Celular', 'Computador', 'Ambos'] },
    { name: 'integrations', label: 'Integrações', type: 'text', placeholder: 'Sistemas e serviços conectados' },
    { name: 'references', label: 'Referências', type: 'textarea', placeholder: 'Apps que inspiram' },
  ],
};

/** Final field list for a product: idea first, then product/category fields, then contact. */
export function briefingFieldsFor(product: Pick<Product, 'briefing' | 'category'>): BriefingField[] {
  const specific = product.briefing.length > 0 ? product.briefing : BY_CATEGORY[product.category];
  const seen = new Set<string>([IDEA_FIELD.name]);
  const merged: BriefingField[] = [IDEA_FIELD];
  for (const field of [...specific, ...CONTACT]) {
    if (seen.has(field.name)) continue;
    seen.add(field.name);
    merged.push(field);
  }
  return merged;
}

const MAX_LEN = { textarea: 5000, default: 500 } as const;

/** Server-side validator built from the product's own fields; unknown keys are dropped. */
export function buildBriefingSchema(fields: BriefingField[]) {
  const shape: Record<string, z.ZodType<string>> = {};
  for (const field of fields) {
    const max = field.type === 'textarea' ? MAX_LEN.textarea : MAX_LEN.default;
    const base = z.string().trim().max(max, `${field.label}: no máximo ${max} caracteres`);
    const isIdea = field.name === IDEA_FIELD.name;
    let schema: z.ZodType<string> = field.required
      ? base.min(isIdea ? 20 : 1, isIdea ? 'Conte um pouco mais sobre a ideia (mínimo de 20 caracteres).' : `${field.label} é obrigatório.`)
      : base;
    if (field.type === 'email') {
      schema = schema.refine((v) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), `${field.label}: e-mail inválido.`);
    }
    if (field.type === 'url') {
      schema = schema.refine((v) => v === '' || /^https?:\/\/\S+$/i.test(v), `${field.label}: informe um link começando com https://`);
    }
    if (field.type === 'select' && field.options?.length) {
      const options = field.options;
      schema = schema.refine((v) => (v === '' && !field.required) || options.includes(v), `${field.label}: escolha uma opção.`);
    }
    // Missing or non-string values (e.g. absent optional inputs) become ''.
    shape[field.name] = z.preprocess((v) => (typeof v === 'string' ? v : ''), schema) as z.ZodType<string>;
  }
  return z.object(shape).strip();
}

/** Validates a briefing_schema edited in Operations. */
export const briefingSchemaValidator = z
  .array(
    z.object({
      name: z.string().regex(/^[a-z][a-z0-9_]{0,39}$/, 'Use letras minúsculas, números e _'),
      label: z.string().min(1).max(120),
      type: z.enum(BRIEFING_FIELD_TYPES),
      required: z.boolean().optional(),
      placeholder: z.string().max(300).optional(),
      help: z.string().max(300).optional(),
      options: z.array(z.string().min(1).max(80)).max(20).optional(),
    }),
  )
  .max(30);
