import { getPontoControle, getPrx } from '@/lib/home/products';
import type { Copy } from '@/lib/site';

interface CaseCopy {
  category: string;
  summary: string;
  problem: string;
  solution: string;
}

interface CaseStudy {
  slug: 'prx' | 'pontocontrole' | 'pagina-de-lancamento' | 'virabot' | 'painel-de-aquisicao';
  name: Copy<string>;
  copy: Copy<CaseCopy>;
  url?: string;
}

const prx = getPrx('pt');
const ponto = getPontoControle('pt');

export const cases: readonly CaseStudy[] = [
  {
    slug: 'prx',
    name: { pt: prx.name, en: prx.name, es: prx.name },
    url: prx.url,
    copy: {
      pt: { category: 'Plataforma digital', summary: 'Conta digital, benefícios e eventos em um só aplicativo.', problem: 'O público jovem precisa acessar serviços financeiros, descobrir benefícios e aproveitar eventos sem alternar entre plataformas.', solution: prx.definition },
      en: { category: 'Digital platform', summary: 'Digital account, perks and events in one app.', problem: 'Young users need to access financial services, find perks and join events without switching platforms.', solution: getPrx('en').definition },
      es: { category: 'Plataforma digital', summary: 'Cuenta digital, beneficios y eventos en una aplicación.', problem: 'El público joven necesita acceder a servicios financieros, descubrir beneficios y disfrutar de eventos sin cambiar de plataforma.', solution: getPrx('es').definition },
    },
  },
  {
    slug: 'pontocontrole',
    name: { pt: ponto.name, en: ponto.name, es: ponto.name },
    url: ponto.url,
    copy: {
      pt: { category: 'Produto próprio', summary: 'Registro de jornada no celular e fechamento mensal organizado.', problem: 'Pequenas equipes precisam conferir horários e horas extras sem reunir registros dispersos no fim do mês.', solution: ponto.definition },
      en: { category: 'ViraWeb product', summary: 'Mobile clock-ins and simpler monthly reporting.', problem: 'Small teams need to check hours and overtime without collecting scattered records at the end of the month.', solution: getPontoControle('en').definition },
      es: { category: 'Producto propio', summary: 'Registro móvil de jornada y cierre mensual organizado.', problem: 'Los equipos pequeños necesitan revisar horarios y horas extra sin reunir registros dispersos al final del mes.', solution: getPontoControle('es').definition },
    },
  },
  {
    slug: 'pagina-de-lancamento',
    name: { pt: 'Página de lançamento', en: 'Course launch page', es: 'Página de lanzamiento' },
    copy: {
      pt: { category: 'Conversão', summary: 'Uma página dedicada ao lançamento de um curso.', problem: 'O lançamento de um curso precisava de uma página que ajudasse mais visitantes a dar o próximo passo.', solution: 'A ViraWeb criou uma página dedicada ao lançamento do curso de Beatriz Lopes, com a oferta e o caminho de conversão concentrados na mesma experiência.' },
      en: { category: 'Conversion', summary: 'A dedicated page for a course launch.', problem: 'A course launch needed a page that helped more visitors take the next step.', solution: 'ViraWeb built a dedicated page for Beatriz Lopes’s course launch, bringing the offer and the next step together.' },
      es: { category: 'Conversión', summary: 'Una página dedicada al lanzamiento de un curso.', problem: 'El lanzamiento de un curso necesitaba una página que ayudara a más visitantes a dar el siguiente paso.', solution: 'ViraWeb creó una página para el lanzamiento del curso de Beatriz Lopes, reuniendo la oferta y el siguiente paso en una sola experiencia.' },
    },
  },
  {
    slug: 'virabot',
    name: { pt: 'ViraBot', en: 'ViraBot', es: 'ViraBot' },
    copy: {
      pt: { category: 'Automação de atendimento', summary: 'Triagem, agendamentos e lembretes pelo WhatsApp.', problem: 'Quando as mensagens chegam fora do expediente ou em grande volume, a equipe perde tempo com perguntas repetidas e o cliente fica esperando.', solution: 'O ViraBot responde dúvidas, identifica o que cada cliente precisa, agenda horários e envia lembretes. As informações podem seguir para as ferramentas que a equipe usa no dia a dia.' },
      en: { category: 'Customer service automation', summary: 'Screening, bookings and reminders on WhatsApp.', problem: 'After-hours messages and high volumes leave customers waiting while teams answer the same questions repeatedly.', solution: 'ViraBot answers questions, identifies what customers need, books appointments and sends reminders. Information can flow into the team’s existing tools.' },
      es: { category: 'Automatización de atención', summary: 'Consultas, reservas y recordatorios por WhatsApp.', problem: 'Los mensajes fuera de horario o en gran volumen dejan a los clientes esperando y llenan la jornada de preguntas repetidas.', solution: 'ViraBot responde preguntas, identifica qué necesita el cliente, agenda citas y envía recordatorios. La información puede llegar a las herramientas que ya usa el equipo.' },
    },
  },
  {
    slug: 'painel-de-aquisicao',
    name: { pt: 'Painel de aquisição', en: 'Acquisition dashboard', es: 'Panel de adquisición' },
    copy: {
      pt: { category: 'Aquisição de clientes', summary: 'Visibilidade sobre as etapas do funil de vendas em tempo real.', problem: 'Sem uma visão do funil, é difícil saber em que etapa os contatos param de avançar e onde concentrar os esforços de aquisição.', solution: 'A ViraWeb construiu um painel de métricas em tempo real para acompanhar o funil de vendas, conforme o relato de Thiago Neves. Esse tipo de painel ajuda a conectar o acompanhamento das campanhas ao trabalho da equipe comercial.' },
      en: { category: 'Customer acquisition', summary: 'Real-time visibility into sales stages.', problem: 'Without a view of the funnel, it is hard to know where prospects stop progressing or where to focus acquisition efforts.', solution: 'ViraWeb built a real-time dashboard for tracking the sales funnel, as described by Thiago Neves. This kind of dashboard helps connect campaign monitoring to the sales team’s work.' },
      es: { category: 'Adquisición de clientes', summary: 'Visibilidad en tiempo real sobre las etapas de venta.', problem: 'Sin una visión del embudo, es difícil saber dónde dejan de avanzar los contactos y dónde enfocar la adquisición.', solution: 'ViraWeb construyó un panel de métricas en tiempo real para seguir el embudo de ventas, según el relato de Thiago Neves. Este tipo de panel ayuda a conectar el seguimiento de campañas con el trabajo comercial.' },
    },
  },
];
