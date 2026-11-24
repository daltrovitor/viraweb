import type { Language } from '@/lib/i18n';
import type { Copy } from '@/lib/site';

const answers: Copy<readonly (readonly [string, string, string])[]> = {
  pt: [
    ['what', 'Que tipo de sistema a ViraWeb desenvolve?', 'Criamos sistemas internos, plataformas web, produtos por assinatura e automações para empresas que precisam organizar a operação ou lançar um produto digital.'],
    ['price', 'Como recebo uma proposta?', 'Começamos com um diagnóstico gratuito para entender sua operação. Depois, enviamos uma proposta personalizada com o que será entregue, prazo e investimento.'],
    ['timeline', 'Quanto tempo leva o desenvolvimento?', 'O prazo depende das etapas, das regras do seu negócio e das ferramentas que precisam ser conectadas. Na proposta, você recebe um cronograma e sabe quando poderá testar as primeiras entregas.'],
    ['integration', 'Dá para conectar as ferramentas que já uso?', 'Sim. Podemos conectar suas ferramentas de vendas, atendimento, gestão e pagamento para evitar retrabalho e manter as informações atualizadas.'],
    ['support', 'Como funciona a entrega e o suporte?', 'Sua equipe testa o sistema durante a construção e recebe orientação para começar a usá-lo. Os acessos ficam com você, e as condições de suporte são definidas na proposta.'],
  ],
  en: [
    ['what', 'What kinds of systems does ViraWeb build?', 'We build internal tools, web platforms, subscription products and automations for businesses that need to organize operations or launch a digital product.'],
    ['price', 'How do I get a proposal?', 'We start with a free assessment to understand your operations, then send a tailored proposal with deliverables, timing and cost.'],
    ['timeline', 'How long does development take?', 'Timing depends on the stages, business rules and tools involved. Your proposal includes a schedule and shows when you can try the first deliveries.'],
    ['integration', 'Can you connect my existing tools?', 'Yes. We can connect sales, customer service, management and payment tools to reduce duplicate work and keep information current.'],
    ['support', 'How do delivery and support work?', 'Your team can try the system as we build it and gets guidance when it is ready. You retain access, and support terms are set out in the proposal.'],
  ],
  es: [
    ['what', '¿Qué tipo de sistemas desarrolla ViraWeb?', 'Creamos sistemas internos, plataformas web, productos por suscripción y automatizaciones para empresas que necesitan organizar su operación o lanzar un producto digital.'],
    ['price', '¿Cómo recibo una propuesta?', 'Comenzamos con un diagnóstico gratuito para entender su operación y enviamos una propuesta personalizada con entregables, plazos e inversión.'],
    ['timeline', '¿Cuánto tarda el desarrollo?', 'El plazo depende de las etapas, las reglas del negocio y las herramientas que haya que conectar. La propuesta incluye un calendario y le indica cuándo podrá probar las primeras entregas.'],
    ['integration', '¿Pueden conectar las herramientas que ya uso?', 'Sí. Podemos conectar sus herramientas de ventas, atención, gestión y pagos para evitar trabajo duplicado y mantener los datos actualizados.'],
    ['support', '¿Cómo funcionan la entrega y el soporte?', 'Su equipo prueba el sistema durante el desarrollo y recibe orientación para empezar a usarlo. Usted conserva los accesos y la propuesta detalla las condiciones de soporte.'],
  ],
};

export function getFaq(language: Language) {
  return answers[language].map(([id, question, answer]) => ({ id, question, answer }));
}
