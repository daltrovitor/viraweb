// Hello World
// Builders for /llms.txt and /llms-full.txt (llmstxt.org format). Both files are
// generated from the same modules that render the home page, so a language model
// reads exactly the facts, prices and answers a visitor sees — nothing more.
import { SITE, absoluteUrl } from '@/lib/site';
import { getPackageOffer, getServices } from '@/lib/home/services';
import { getPontoControle, PONTO_PLANS, PONTO_TRIAL_DAYS, brl } from '@/lib/home/products';
import { getFaq } from '@/lib/home/faq';

const SUMMARY =
  'ViraWeb é uma empresa de engenharia de software de Goiânia (GO), Brasil. Cria sites e landing pages, sistemas sob medida, automações com IA no WhatsApp e campanhas de tráfego pago, e mantém o PontoControle, sistema de controle de ponto pelo celular com reconhecimento facial e GPS.';

const CONTACT = `Contato comercial: WhatsApp ${SITE.whatsappDisplay} (https://wa.me/${SITE.whatsappNumber}) · ${SITE.email}. Atendimento em português, inglês e espanhol.`;

/** Short index: one link per thing worth reading. */
export function buildLlmsTxt(): string {
  const services = getServices('pt');
  const ponto = getPontoControle('pt');

  return [
    `# ${SITE.name}`,
    '',
    `> ${SUMMARY}`,
    '',
    CONTACT,
    '',
    '## Páginas principais',
    '',
    `- [Página inicial](${SITE.url}): serviços, produtos, preços e perguntas frequentes`,
    `- [Simulador de proposta](${absoluteUrl('/propostas')}): monta o Pacote ViraWeb com preço calculado na hora`,
    `- [Termos de uso](${absoluteUrl('/termos')})`,
    '',
    '## Serviços',
    '',
    ...services.map(
      (service) =>
        `- [${service.name}](${SITE.url}/#${service.anchor}): ${service.summary} ${service.facts
          .map((fact) => `${fact.label}: ${fact.value}.`)
          .join(' ')}`,
    ),
    '',
    '## Produto próprio',
    '',
    `- [${ponto.name}](${ponto.url}): ${ponto.definition} ${ponto.priceLine}.`,
    '',
    '## Optional',
    '',
    `- [Versão completa](${absoluteUrl('/llms-full.txt')}): todos os fatos, preços e perguntas frequentes em um único arquivo`,
    '',
  ].join('\n');
}

/** Full reference: everything on the home page, as plain Markdown. */
export function buildLlmsFullTxt(): string {
  const services = getServices('pt');
  const ponto = getPontoControle('pt');
  const offer = getPackageOffer('pt');
  const faq = getFaq('pt');
  const pontoPlans = PONTO_PLANS.pt;

  const lines: string[] = [
    `# ${SITE.name}`,
    '',
    `> ${SUMMARY}`,
    '',
    '## Empresa',
    '',
    `- Nome: ${SITE.name} (${SITE.legalName})`,
    `- Site: ${SITE.url}`,
    `- Sede: ${SITE.city} (${SITE.region}), Brasil`,
    `- WhatsApp: ${SITE.whatsappDisplay} (https://wa.me/${SITE.whatsappNumber})`,
    `- E-mail: ${SITE.email}`,
    `- Instagram: ${SITE.instagramUrl}`,
    '- Como contratar: diagnóstico gratuito de 15 minutos pelo WhatsApp com um engenheiro de software, seguido de uma proposta técnica personalizada.',
    '',
    '## Serviços',
    '',
  ];

  for (const service of services) {
    lines.push(`### ${service.name}`, '', service.summary, '');
    lines.push(...service.deliverables.map((item) => `- ${item}`));
    lines.push(...service.facts.map((fact) => `- ${fact.label}: ${fact.value}`), '');
  }

  lines.push(
    '### Pacote ViraWeb',
    '',
    `Site, Google Meu Negócio, tráfego pago e ViraBot contratados juntos têm ${offer.setupDiscountPercent}% de desconto no setup e ${offer.monthlyDiscountPercent}% na mensalidade: ${offer.setup} de setup (em vez de ${offer.setupGross}) e ${offer.monthly} por mês (em vez de ${offer.monthlyGross}). Simulador: ${absoluteUrl('/propostas')}`,
    '',
    '## Produto próprio',
    '',
  );

  {
    lines.push(
      `### ${ponto.name}`,
      '',
      ponto.definition,
      '',
      `- Site: ${ponto.url}`,
      '- Para quem: pequenas empresas (comércios, clínicas, escritórios, restaurantes, salões e equipes externas) e empregadores domésticos (empregada doméstica, babá, cuidador de idosos, caseiro ou motorista).',
      '- Recursos: reconhecimento facial em cada batida, GPS em cada marcação, painel em tempo real, horas extras e banco de horas calculados automaticamente, espelho de ponto em PDF e marcação sem internet com sincronização posterior.',
      '- Onde funciona: celular do funcionário (Android ou iPhone), tablet na empresa ou computador, pelo navegador, sem instalar pela loja de aplicativos.',
      ...pontoPlans.map((plan) => `- Plano ${plan.name}: ${plan.limit}, ${plan.price === null ? 'sob consulta' : `${brl(plan.price)} por mês`}`),
      `- Teste: ${PONTO_TRIAL_DAYS} dias grátis com todos os recursos, sem cartão de crédito, sem taxa de adesão e sem fidelidade.`,
      '- Legislação: para empregados domésticos o registro de horário é obrigatório (Lei Complementar 150/2015, art. 12); para empresas, é obrigatório nos estabelecimentos com mais de 20 trabalhadores (CLT, art. 74, § 2º). A Portaria MTP 671/2021 regulamenta o ponto eletrônico, incluindo o registro por programa (REP-P).',
      '',
    );
  }

  lines.push('## Perguntas frequentes', '');
  for (const item of faq) lines.push(`### ${item.question}`, '', item.answer, '');

  return lines.join('\n');
}
