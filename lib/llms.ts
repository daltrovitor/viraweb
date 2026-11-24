import { cases } from '@/lib/home/cases';
import { getFaq } from '@/lib/home/faq';
import { getTopicPages } from '@/lib/seo/pages';
import { absoluteUrl, SITE, whatsappLink } from '@/lib/site';

export function buildLlmsTxt(): string {
  return [
    '# ViraWeb',
    '',
    '> Empresa de Goiânia (GO) especializada no desenvolvimento de sistemas sob medida, plataformas web, produtos digitais e automação de processos.',
    '',
    '## Empresa e contato',
    ...getTopicPages().map((page) => `- [${page.label}](${absoluteUrl(page.slug)}): ${page.description}`),
    `- [Solicitar diagnóstico](${absoluteUrl('/propostas')})`,
    `- [WhatsApp](${whatsappLink()}): ${SITE.whatsappDisplay}`,
    '',
    '## Cases e produtos',
    ...cases.map((project) => `- [${project.name.pt}](${absoluteUrl(`/cases/${project.slug}`)}): ${project.copy.pt.summary}`),
    '',
  ].join('\n');
}

export function buildLlmsFullTxt(): string {
  return [
    buildLlmsTxt(),
    '## Projetos desenvolvidos',
    ...cases.flatMap((project) => [
      `### ${project.name.pt}`,
      `- Desafio: ${project.copy.pt.problem}`,
      `- Solução: ${project.copy.pt.solution}`,
      ...(project.url ? [`- Produto: ${project.url}`] : []),
    ]),
    '',
    '## Perguntas frequentes',
    ...getFaq('pt').flatMap((item) => [`### ${item.question}`, item.answer, '']),
  ].join('\n');
}
