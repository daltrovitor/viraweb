// Hello World
// Copy for the Vira Web Odonto section, mirrored from odonto.viraweb.dev.br.
import type { Copy } from '@/lib/site';

export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'arrived'
  | 'inTreatment'
  | 'finished'
  | 'missed'
  | 'cancelled';

export interface ProcedureDef {
  id: string;
  name: string;
  price: number;
}

export interface PlanDef {
  name: string;
  tagline: string;
  price: number;
  features: string[];
  featured?: boolean;
}

export interface OdontoCopy {
  chapter: string;
  product: string;
  titleA: string;
  titleB: string;
  lede: string;
  primary: string;
  secondary: string;
  chips: string[];
  builder: {
    title: string;
    arch: string;
    hint: string;
    total: string;
    installments: (value: string) => string;
    empty: string;
    clear: string;
    tooth: (id: number) => string;
    procedureLabel: string;
    procedures: ProcedureDef[];
  };
  vocabulary: {
    title: string;
    stats: Array<{ value: number; label: string }>;
  };
  flow: {
    title: string;
    lede: string;
    steps: Array<{ title: string; body: string }>;
    agenda: {
      title: string;
      days: string[];
      statuses: Record<AppointmentStatus, string>;
    };
    budget: {
      title: string;
      linked: string;
      procedure: string;
      prophylaxis: string;
      noRegion: string;
      total: string;
    };
    installments: {
      title: string;
      paid: string;
      due: (date: string) => string;
      dueDates: string[];
      received: string;
      receivable: string;
      overdue: string;
    };
  };
  modules: {
    title: string;
    lede: string;
    items: Array<{ title: string; body: string }>;
  };
  plans: {
    title: string;
    lede: string;
    perMonth: string;
    featured: string;
    cta: string;
    items: PlanDef[];
  };
}

export const ODONTO_COPY: Copy<OdontoCopy> = {
  pt: {
    chapter: 'Produto 01',
    product: 'Odonto',
    titleA: 'Gestão odontológica,',
    titleB: 'dente a dente.',
    lede: 'Agenda, ficha do paciente, orçamento no odontograma e plano de pagamento no mesmo fluxo — feito para a recepção que não pode parar.',
    primary: 'Começar teste grátis',
    secondary: 'Ver demonstração',
    chips: ['14 dias grátis', 'Cancele quando quiser', 'App para iPhone e Android'],
    builder: {
      title: 'Orçamento em montagem',
      arch: 'Arcada superior',
      hint: 'Toque nos dentes para montar o orçamento.',
      total: 'Total',
      installments: (value) => `ou 10× de ${value}`,
      empty: 'Nenhum dente selecionado.',
      clear: 'Limpar',
      tooth: (id) => `Dente ${id}`,
      procedureLabel: 'Procedimento',
      procedures: [
        { id: 'emax', name: 'Faceta cerâmica E.max', price: 3850 },
        { id: 'zirconia', name: 'Coroa em zircônia', price: 2900 },
        { id: 'resin', name: 'Restauração em resina', price: 420 },
      ],
    },
    vocabulary: {
      title: 'Feito com o vocabulário da clínica',
      stats: [
        { value: 10, label: 'status de consulta, de “agendado” a “faltou — remarcado”' },
        { value: 52, label: 'dentes mapeados (permanentes e decíduos, numeração FDI)' },
        { value: 24, label: 'parcelas no plano de pagamento, centavo a centavo' },
        { value: 1, label: 'ficha com agendamentos, imagens, orçamentos e anamnese' },
      ],
    },
    flow: {
      title: 'Um fluxo, do primeiro contato ao último recebimento.',
      lede: 'A recepção trabalha em sequência. O Vira Web Odonto também.',
      steps: [
        {
          title: 'Agenda que mostra o dia de verdade',
          body: 'Semana em blocos de 30 minutos, cor por status e o passo seguinte a um clique: confirmar, paciente chegou, em atendimento, finalizado — ou falta e desmarcação, com remarcação.',
        },
        {
          title: 'Orçamento direto no odontograma',
          body: 'Escolha o procedimento na sua tabela de preços e clique nos dentes, no hemiarco, na arcada ou em “sem região”. Cada dente vira uma linha, com valor e região registrados.',
        },
        {
          title: 'Plano de pagamento que fecha a conta',
          body: 'Desconto em % ou R$, entrada e até 24 parcelas com vencimento ajustado ao fim do mês. Ao fechar, as parcelas caem no contas a receber e a ficha mostra recebido, a receber e atrasado.',
        },
      ],
      agenda: {
        title: 'Agenda da semana',
        days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
        statuses: {
          scheduled: 'Agendado',
          confirmed: 'Confirmado',
          arrived: 'Cliente na recepção',
          inTreatment: 'Em atendimento',
          finished: 'Finalizado',
          missed: 'Faltou',
          cancelled: 'Desmarcado pelo paciente',
        },
      },
      budget: {
        title: 'Odontograma',
        linked: 'Procedimentos vinculados',
        procedure: 'Faceta cerâmica E.max',
        prophylaxis: 'Profilaxia + raspagem',
        noRegion: 'Sem região',
        total: 'Total',
      },
      installments: {
        title: 'Parcelas',
        paid: 'Pago',
        due: (date) => `Vence ${date}`,
        dueDates: ['31/10', '30/11', '31/12', '31/01'],
        received: 'Recebido',
        receivable: 'A receber',
        overdue: 'Atrasado',
      },
    },
    modules: {
      title: 'Tudo o que a recepção e a cadeira usam',
      lede: 'Módulos que conversam entre si — o que é marcado na agenda aparece na ficha, e o que é fechado no orçamento aparece no financeiro.',
      items: [
        { title: 'Agenda semanal', body: 'Status clínicos, primeira consulta e confirmação pelo WhatsApp.' },
        { title: 'Ficha do paciente', body: 'Agendamentos futuros, sem baixa, faltas, imagens e orçamentos.' },
        { title: 'Odontograma', body: 'Condição por dente, decíduos e anotações clínicas.' },
        { title: 'Orçamentos', body: 'Por dente, hemiarco ou arcada, com status em andamento, fechado ou reprovado.' },
        { title: 'Plano de pagamento', body: 'Entrada, parcelas e recebimento integrado ao contas a receber.' },
        { title: 'Anamnese e documentos', body: 'Alertas clínicos na ficha, receitas, atestados e termos.' },
        { title: 'Financeiro e fechamento', body: 'Recebimentos, despesas e o fechamento do mês.' },
        { title: 'Conciliação bancária', body: 'Importe o extrato OFX e concilie os lançamentos.' },
        { title: 'Assistente com IA', body: 'Perguntas sobre a agenda e o caixa em linguagem natural.' },
      ],
    },
    plans: {
      title: 'Planos',
      lede: 'Comece com 14 dias grátis. Troque de plano quando quiser.',
      perMonth: '/ mês',
      featured: 'Mais escolhido',
      cta: 'Começar agora',
      items: [
        {
          name: 'Plano Básico',
          tagline: 'Perfeito para começar sua clínica',
          price: 74.9,
          features: ['Até 75 pacientes', 'Até 7 profissionais', '50 agendamentos/mês', 'Painel de indicadores', 'Suporte via email'],
        },
        {
          name: 'Plano Premium',
          tagline: 'Recursos avançados com IA',
          price: 147.9,
          featured: true,
          features: ['Até 500 pacientes', 'Até 50 profissionais', '500 agendamentos/mês', 'Painel financeiro completo', 'ViraBot AI 24/7', 'Suporte prioritário'],
        },
        {
          name: 'Plano Master',
          tagline: 'Recursos ilimitados e suporte premium',
          price: 247.9,
          features: ['Pacientes ilimitados', 'Profissionais ilimitados', 'Agendamentos ilimitados', 'Painel financeiro completo', 'ViraBot AI 24/7', 'Suporte prioritário 24/7'],
        },
      ],
    },
  },
  en: {
    chapter: 'Product 01',
    product: 'Odonto',
    titleA: 'Dental practice management,',
    titleB: 'tooth by tooth.',
    lede: "Scheduling, patient records, odontogram-based quotes and payment plans in one flow — built for a front desk that can't stop.",
    primary: 'Start free trial',
    secondary: 'See the demo',
    chips: ['14-day free trial', 'Cancel anytime', 'iPhone & Android app'],
    builder: {
      title: 'Quote in progress',
      arch: 'Upper arch',
      hint: 'Tap the teeth to build the quote.',
      total: 'Total',
      installments: (value) => `or 10× of ${value}`,
      empty: 'No tooth selected.',
      clear: 'Clear',
      tooth: (id) => `Tooth ${id}`,
      procedureLabel: 'Procedure',
      procedures: [
        { id: 'emax', name: 'E.max ceramic veneer', price: 3850 },
        { id: 'zirconia', name: 'Zirconia crown', price: 2900 },
        { id: 'resin', name: 'Composite restoration', price: 420 },
      ],
    },
    vocabulary: {
      title: "Built in the clinic's own vocabulary",
      stats: [
        { value: 10, label: 'appointment statuses, from “scheduled” to “no-show — rescheduled”' },
        { value: 52, label: 'teeth mapped (permanent and primary, FDI numbering)' },
        { value: 24, label: 'installments in the payment plan, to the cent' },
        { value: 1, label: 'record with appointments, images, quotes and medical history' },
      ],
    },
    flow: {
      title: 'One flow, from first contact to final payment.',
      lede: 'The front desk works in sequence. So does Vira Web Odonto.',
      steps: [
        {
          title: 'A schedule that shows the real day',
          body: 'The week in 30-minute blocks, colour by status and the next step one click away: confirm, patient arrived, in treatment, finished — or no-show and cancellation, with rescheduling.',
        },
        {
          title: 'Quotes straight on the odontogram',
          body: 'Pick the procedure from your price list and click the teeth, the half-arch, the arch or “no region”. Each tooth becomes a line, with value and region recorded.',
        },
        {
          title: 'A payment plan that closes the account',
          body: 'Discount in % or R$, down payment and up to 24 installments due at month-end. Once closed, installments land in accounts receivable and the record shows received, receivable and overdue.',
        },
      ],
      agenda: {
        title: 'This week',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        statuses: {
          scheduled: 'Scheduled',
          confirmed: 'Confirmed',
          arrived: 'At the front desk',
          inTreatment: 'In treatment',
          finished: 'Finished',
          missed: 'No-show',
          cancelled: 'Cancelled by patient',
        },
      },
      budget: {
        title: 'Odontogram',
        linked: 'Linked procedures',
        procedure: 'E.max ceramic veneer',
        prophylaxis: 'Prophylaxis + scaling',
        noRegion: 'No region',
        total: 'Total',
      },
      installments: {
        title: 'Installments',
        paid: 'Paid',
        due: (date) => `Due ${date}`,
        dueDates: ['Oct 31', 'Nov 30', 'Dec 31', 'Jan 31'],
        received: 'Received',
        receivable: 'Receivable',
        overdue: 'Overdue',
      },
    },
    modules: {
      title: 'Everything the front desk and the chair use',
      lede: "Modules that talk to each other — what's booked in the schedule shows up in the record, and what's closed in the quote shows up in finance.",
      items: [
        { title: 'Weekly schedule', body: 'Clinical statuses, first visits and WhatsApp confirmation.' },
        { title: 'Patient record', body: 'Upcoming appointments, open items, no-shows, images and quotes.' },
        { title: 'Odontogram', body: 'Condition per tooth, primary teeth and clinical notes.' },
        { title: 'Quotes', body: 'Per tooth, half-arch or arch, with in progress, closed or declined status.' },
        { title: 'Payment plan', body: 'Down payment, installments and collection tied to accounts receivable.' },
        { title: 'Medical history & documents', body: 'Clinical alerts on the record, prescriptions, certificates and consent forms.' },
        { title: 'Finance & month-end', body: 'Receipts, expenses and the monthly close.' },
        { title: 'Bank reconciliation', body: 'Import the OFX statement and reconcile entries.' },
        { title: 'AI assistant', body: 'Ask about the schedule and cash flow in plain language.' },
      ],
    },
    plans: {
      title: 'Plans',
      lede: 'Start with 14 days free. Switch plans anytime.',
      perMonth: '/ month',
      featured: 'Most popular',
      cta: 'Get started',
      items: [
        {
          name: 'Basic',
          tagline: 'Perfect to get your clinic started',
          price: 74.9,
          features: ['Up to 75 patients', 'Up to 7 professionals', '50 appointments/month', 'KPI dashboard', 'Email support'],
        },
        {
          name: 'Premium',
          tagline: 'Advanced features with AI',
          price: 147.9,
          featured: true,
          features: ['Up to 500 patients', 'Up to 50 professionals', '500 appointments/month', 'Full financial dashboard', 'ViraBot AI 24/7', 'Priority support'],
        },
        {
          name: 'Master',
          tagline: 'Unlimited resources and premium support',
          price: 247.9,
          features: ['Unlimited patients', 'Unlimited professionals', 'Unlimited appointments', 'Full financial dashboard', 'ViraBot AI 24/7', '24/7 priority support'],
        },
      ],
    },
  },
  es: {
    chapter: 'Producto 01',
    product: 'Odonto',
    titleA: 'Gestión odontológica,',
    titleB: 'diente a diente.',
    lede: 'Agenda, ficha del paciente, presupuesto en el odontograma y plan de pago en el mismo flujo — hecho para la recepción que no puede parar.',
    primary: 'Comenzar prueba gratis',
    secondary: 'Ver demostración',
    chips: ['14 días gratis', 'Cancele cuando quiera', 'App para iPhone y Android'],
    builder: {
      title: 'Presupuesto en preparación',
      arch: 'Arcada superior',
      hint: 'Toque los dientes para armar el presupuesto.',
      total: 'Total',
      installments: (value) => `o 10× de ${value}`,
      empty: 'Ningún diente seleccionado.',
      clear: 'Limpiar',
      tooth: (id) => `Diente ${id}`,
      procedureLabel: 'Procedimiento',
      procedures: [
        { id: 'emax', name: 'Carilla cerámica E.max', price: 3850 },
        { id: 'zirconia', name: 'Corona de zirconio', price: 2900 },
        { id: 'resin', name: 'Restauración en resina', price: 420 },
      ],
    },
    vocabulary: {
      title: 'Hecho con el vocabulario de la clínica',
      stats: [
        { value: 10, label: 'estados de cita, de “agendado” a “faltó — reprogramado”' },
        { value: 52, label: 'dientes mapeados (permanentes y temporales, numeración FDI)' },
        { value: 24, label: 'cuotas en el plan de pago, centavo a centavo' },
        { value: 1, label: 'ficha con citas, imágenes, presupuestos y anamnesis' },
      ],
    },
    flow: {
      title: 'Un flujo, del primer contacto al último cobro.',
      lede: 'La recepción trabaja en secuencia. Vira Web Odonto también.',
      steps: [
        {
          title: 'Agenda que muestra el día de verdad',
          body: 'Semana en bloques de 30 minutos, color por estado y el siguiente paso a un clic: confirmar, paciente llegó, en atención, finalizado — o falta y cancelación, con reprogramación.',
        },
        {
          title: 'Presupuesto directo en el odontograma',
          body: 'Elija el procedimiento en su tabla de precios y haga clic en los dientes, la hemiarcada, la arcada o “sin región”. Cada diente se convierte en una línea, con valor y región registrados.',
        },
        {
          title: 'Plan de pago que cierra la cuenta',
          body: 'Descuento en % o R$, entrada y hasta 24 cuotas con vencimiento a fin de mes. Al cerrar, las cuotas pasan a cuentas por cobrar y la ficha muestra cobrado, por cobrar y atrasado.',
        },
      ],
      agenda: {
        title: 'Agenda de la semana',
        days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
        statuses: {
          scheduled: 'Agendado',
          confirmed: 'Confirmado',
          arrived: 'Paciente en recepción',
          inTreatment: 'En atención',
          finished: 'Finalizado',
          missed: 'Faltó',
          cancelled: 'Cancelado por el paciente',
        },
      },
      budget: {
        title: 'Odontograma',
        linked: 'Procedimientos vinculados',
        procedure: 'Carilla cerámica E.max',
        prophylaxis: 'Profilaxis + raspado',
        noRegion: 'Sin región',
        total: 'Total',
      },
      installments: {
        title: 'Cuotas',
        paid: 'Pagado',
        due: (date) => `Vence ${date}`,
        dueDates: ['31/10', '30/11', '31/12', '31/01'],
        received: 'Cobrado',
        receivable: 'Por cobrar',
        overdue: 'Atrasado',
      },
    },
    modules: {
      title: 'Todo lo que usan la recepción y el sillón',
      lede: 'Módulos que se comunican entre sí — lo que se agenda aparece en la ficha, y lo que se cierra en el presupuesto aparece en finanzas.',
      items: [
        { title: 'Agenda semanal', body: 'Estados clínicos, primera consulta y confirmación por WhatsApp.' },
        { title: 'Ficha del paciente', body: 'Citas futuras, pendientes, faltas, imágenes y presupuestos.' },
        { title: 'Odontograma', body: 'Condición por diente, temporales y anotaciones clínicas.' },
        { title: 'Presupuestos', body: 'Por diente, hemiarcada o arcada, con estado en curso, cerrado o rechazado.' },
        { title: 'Plan de pago', body: 'Entrada, cuotas y cobro integrado a cuentas por cobrar.' },
        { title: 'Anamnesis y documentos', body: 'Alertas clínicas en la ficha, recetas, certificados y consentimientos.' },
        { title: 'Finanzas y cierre', body: 'Cobros, gastos y el cierre del mes.' },
        { title: 'Conciliación bancaria', body: 'Importe el extracto OFX y concilie los movimientos.' },
        { title: 'Asistente con IA', body: 'Preguntas sobre la agenda y la caja en lenguaje natural.' },
      ],
    },
    plans: {
      title: 'Planes',
      lede: 'Comience con 14 días gratis. Cambie de plan cuando quiera.',
      perMonth: '/ mes',
      featured: 'Más elegido',
      cta: 'Comenzar ahora',
      items: [
        {
          name: 'Plan Básico',
          tagline: 'Perfecto para empezar su clínica',
          price: 74.9,
          features: ['Hasta 75 pacientes', 'Hasta 7 profesionales', '50 citas/mes', 'Panel de indicadores', 'Soporte por email'],
        },
        {
          name: 'Plan Premium',
          tagline: 'Recursos avanzados con IA',
          price: 147.9,
          featured: true,
          features: ['Hasta 500 pacientes', 'Hasta 50 profesionales', '500 citas/mes', 'Panel financiero completo', 'ViraBot AI 24/7', 'Soporte prioritario'],
        },
        {
          name: 'Plan Master',
          tagline: 'Recursos ilimitados y soporte premium',
          price: 247.9,
          features: ['Pacientes ilimitados', 'Profesionales ilimitados', 'Citas ilimitadas', 'Panel financiero completo', 'ViraBot AI 24/7', 'Soporte prioritario 24/7'],
        },
      ],
    },
  },
};

/** Deterministic BRL formatting (identical on server and client — no ICU drift). */
export function brl(value: number): string {
  const [integer, cents] = Math.abs(value).toFixed(2).split('.');
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${value < 0 ? '-' : ''}R$ ${grouped},${cents}`;
}
