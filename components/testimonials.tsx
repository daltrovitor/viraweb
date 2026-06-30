'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonails';

// ── 40 unique reviews, 5 per column ─────────────────────────────────
const col1 = [
  { name: 'Dr. Marcelo Ramos', username: '@dr.marcelo', body: 'A integração do GDC com WhatsApp e prontuários mudou nossa rotina. Economizamos 15h semanais.', img: 'https://randomuser.me/api/portraits/men/32.jpg', country: '🇧🇷 Brasil' },
  { name: 'Beatriz Lopes', username: '@bialopes', body: 'A landing page que fizeram para o lançamento do nosso curso converteu 3x mais do que a anterior. Absurdo.', img: 'https://randomuser.me/api/portraits/women/44.jpg', country: '🇧🇷 Brasil' },
  { name: 'Thiago Neves', username: '@thiago.nv', body: 'O dashboard de métricas em tempo real nos deu visibilidade total sobre o funil de vendas. Indispensável.', img: 'https://randomuser.me/api/portraits/men/75.jpg', country: '🇧🇷 Brasil' },
  { name: 'Camila Ferreira', username: '@camilaf', body: 'Entregaram o MVP em duas semanas. A qualidade do código e do design superou nossas expectativas.', img: 'https://randomuser.me/api/portraits/women/63.jpg', country: '🇧🇷 Brasil' },
  { name: 'Diego Almeida', username: '@diegoalm', body: 'Migramos três sistemas legados para a stack deles. Performance aumentou 400% e o custo caiu pela metade.', img: 'https://randomuser.me/api/portraits/men/46.jpg', country: '🇧🇷 Brasil' },
];

const col2 = [
  { name: 'Arthur K.', username: '@arthurcto', body: 'Código limpo e velocidade excepcional. Nossa taxa de conversão subiu 25% após migramos para a arquitetura de elite deles.', img: 'https://randomuser.me/api/portraits/men/68.jpg', country: '🇧🇷 Brasil' },
  { name: 'Fernanda Costa', username: '@fecosta', body: 'O chatbot com IA que implementaram resolveu 70% dos atendimentos sem intervenção humana. ROI imediato.', img: 'https://randomuser.me/api/portraits/women/26.jpg', country: '🇧🇷 Brasil' },
  { name: 'Rafael Borges', username: '@rafaborges', body: 'Profissionalismo raro no mercado. Cumprem prazos e a comunicação é transparente do início ao fim.', img: 'https://randomuser.me/api/portraits/men/41.jpg', country: '🇧🇷 Brasil' },
  { name: 'Isabela Martins', username: '@isamartins', body: 'Nossa loja virtual passou de R$30k para R$120k/mês depois da otimização de performance e SEO que fizeram.', img: 'https://randomuser.me/api/portraits/women/57.jpg', country: '🇧🇷 Brasil' },
  { name: 'Lucas Oliveira', username: '@lucas.oli', body: 'O sistema de agendamento online eliminou 90% das ligações telefônicas. Nossos clientes adoraram a praticidade.', img: 'https://randomuser.me/api/portraits/men/36.jpg', country: '🇧🇷 Brasil' },
];

const col3 = [
  { name: 'Mariana Santos', username: '@mariana.scale', body: 'O LeadScrap transformou nossa prospecção ativa. Geramos listas de leads qualificadas e automatizamos o contato em minutos.', img: 'https://randomuser.me/api/portraits/women/51.jpg', country: '🇧🇷 Brasil' },
  { name: 'Pedro Henrique', username: '@pedroh', body: 'A integração com APIs de pagamento e nota fiscal foi perfeita. Zero retrabalho no financeiro desde então.', img: 'https://randomuser.me/api/portraits/men/52.jpg', country: '🇧🇷 Brasil' },
  { name: 'Amanda Ribeiro', username: '@amandrib', body: 'Redesenharam nosso app e os downloads triplicaram no primeiro mês. UX de outro nível.', img: 'https://randomuser.me/api/portraits/women/37.jpg', country: '🇧🇷 Brasil' },
  { name: 'Gustavo Lima', username: '@gustavolima', body: 'Suporte pós-entrega impecável. Qualquer ajuste é resolvido em horas, não em semanas como outras empresas.', img: 'https://randomuser.me/api/portraits/men/29.jpg', country: '🇧🇷 Brasil' },
  { name: 'Patrícia Souza', username: '@patsouza', body: 'O CRM personalizado que desenvolveram se encaixou perfeitamente na nossa operação. Equipe muito competente.', img: 'https://randomuser.me/api/portraits/women/72.jpg', country: '🇧🇷 Brasil' },
];

const col4 = [
  { name: 'Roberto Mendes', username: '@roberto.m', body: 'O suporte da equipe é excelente. Projetos sob medida entregues antes do prazo e com qualidade superior.', img: 'https://randomuser.me/api/portraits/men/53.jpg', country: '🇧🇷 Brasil' },
  { name: 'Vanessa Prado', username: '@vanprado', body: 'A automação de e-mail marketing que criaram gerou R$80k em vendas no primeiro disparo. Impressionante.', img: 'https://randomuser.me/api/portraits/women/19.jpg', country: '🇧🇷 Brasil' },
  { name: 'Eduardo Campos', username: '@educampos', body: 'Escalamos de 500 para 50.000 usuários sem nenhum downtime. A infraestrutura que montaram é robusta demais.', img: 'https://randomuser.me/api/portraits/men/64.jpg', country: '🇧🇷 Brasil' },
  { name: 'Renata Dias', username: '@renatadias', body: 'O painel administrativo é intuitivo até para quem não é técnico. Minha equipe inteira aprendeu em um dia.', img: 'https://randomuser.me/api/portraits/women/82.jpg', country: '🇧🇷 Brasil' },
  { name: 'Marcos Vinícius', username: '@marcosv', body: 'Contratamos para um projeto e já estamos no quinto. A qualidade vicia. Parceria de longo prazo garantida.', img: 'https://randomuser.me/api/portraits/men/11.jpg', country: '🇧🇷 Brasil' },
];

const col5 = [
  { name: 'Julia Silva', username: '@julia.studios', body: 'Nosso faturamento aumentou muito após a implementação das automações de funil. Retorno garantido.', img: 'https://randomuser.me/api/portraits/women/33.jpg', country: '🇧🇷 Brasil' },
  { name: 'André Barros', username: '@andrebarros', body: 'A velocidade do site no PageSpeed passou de 38 para 99. Os clientes comentam como tudo carrega rápido.', img: 'https://randomuser.me/api/portraits/men/18.jpg', country: '🇧🇷 Brasil' },
  { name: 'Carla Mendonça', username: '@carlam', body: 'O ponto eletrônico com reconhecimento facial acabou com as fraudes de registro. Economia real.', img: 'https://randomuser.me/api/portraits/women/15.jpg', country: '🇧🇷 Brasil' },
  { name: 'Felipe Rocha', username: '@felipinho.nv', body: 'Os orçamentos do GDC pouparam dias de trabalho manual do nosso setor comercial. Ferramenta essencial.', img: 'https://randomuser.me/api/portraits/men/85.jpg', country: '🇧🇷 Brasil' },
  { name: 'Larissa Duarte', username: '@lariduarte', body: 'O sistema de controle de ponto é muito intuitivo e bonito. As colaboradoras adoraram usar no dia a dia.', img: 'https://randomuser.me/api/portraits/women/45.jpg', country: '🇧🇷 Brasil' },
];

const col6 = [
  { name: 'Aline Santos', username: '@aline.design', body: 'O design system que criaram para nós economizou meses de front-end. Consistência impecável.', img: 'https://randomuser.me/api/portraits/women/12.jpg', country: '🇧🇷 Brasil' },
  { name: 'Ricardo Lima', username: '@ricardolima', body: 'Automatizamos 100% da emissão de notas fiscais com a API deles. Processo sem fricção.', img: 'https://randomuser.me/api/portraits/men/14.jpg', country: '🇧🇷 Brasil' },
  { name: 'Patrícia Ribeiro', username: '@patyrib', body: 'O suporte técnico pós-entrega é fantástico. Respostas em minutos e soluções rápidas.', img: 'https://randomuser.me/api/portraits/women/15.jpg', country: '🇧🇷 Brasil' },
  { name: 'Nelson M.', username: '@nelsonm', body: 'O dashboard executivo unificou nossos dados de 4 filiais em tempo real. Essencial para decisões.', img: 'https://randomuser.me/api/portraits/men/16.jpg', country: '🇧🇷 Brasil' },
  { name: 'Letícia G.', username: '@leticiag', body: 'Redesenharam o checkout do nosso e-commerce. A taxa de abandono de carrinho caiu 40%.', img: 'https://randomuser.me/api/portraits/women/17.jpg', country: '🇧🇷 Brasil' },
];

const col7 = [
  { name: 'Daniel F.', username: '@danielf', body: 'Infraestrutura robusta. Suportamos picos de 100k acessos simultâneos sem lentidão.', img: 'https://randomuser.me/api/portraits/men/18.jpg', country: '🇧🇷 Brasil' },
  { name: 'Sandra L.', username: '@sandral', body: 'A ViraWeb foi o parceiro estratégico que impulsionou nossa transformação digital.', img: 'https://randomuser.me/api/portraits/women/19.jpg', country: '🇧🇷 Brasil' },
  { name: 'Marcos A.', username: '@marcosa', body: 'Nosso funil comercial agora é 100% automatizado, economizando horas preciosas dos vendedores.', img: 'https://randomuser.me/api/portraits/men/20.jpg', country: '🇧🇷 Brasil' },
  { name: 'Carla B.', username: '@carlab', body: 'O sistema de controle financeiro automatizado eliminou erros de conciliação bancária.', img: 'https://randomuser.me/api/portraits/women/21.jpg', country: '🇧🇷 Brasil' },
  { name: 'Vinícius S.', username: '@vinicius.s', body: 'Velocidade de desenvolvimento surpreendente. Entregaram antes do prazo e com código limpo.', img: 'https://randomuser.me/api/portraits/men/23.jpg', country: '🇧🇷 Brasil' },
];

const col8 = [
  { name: 'Lucas S.', username: '@lucas.s', body: 'O sistema de CRM integrou nosso time comercial com o faturamento em tempo real.', img: 'https://randomuser.me/api/portraits/men/24.jpg', country: '🇧🇷 Brasil' },
  { name: 'Marina F.', username: '@marina.f', body: 'A equipe foi super atenciosa e entregou a automação de WhatsApp antes do prazo.', img: 'https://randomuser.me/api/portraits/women/25.jpg', country: '🇧🇷 Brasil' },
  { name: 'Gustavo D.', username: '@gustavo.d', body: 'Performance excepcional. O tempo de carregamento do app caiu pela metade.', img: 'https://randomuser.me/api/portraits/men/26.jpg', country: '🇧🇷 Brasil' },
  { name: 'Patrícia L.', username: '@patricia.l', body: 'A migração dos dados legados foi suave e sem downtime. Trabalho de profissionais.', img: 'https://randomuser.me/api/portraits/women/27.jpg', country: '🇧🇷 Brasil' },
  { name: 'Ricardo S.', username: '@ricardo.s', body: 'O sistema de biometria facial do PontoControle eliminou fraudes operacionais.', img: 'https://randomuser.me/api/portraits/men/28.jpg', country: '🇧🇷 Brasil' },
];

type Review = (typeof col1)[number];

function TestimonialCard({ img, name, username, body, country }: Review) {
  return (
    <Card className="w-60 select-none bg-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-slate-900 flex items-center gap-1">
              {name} <span className="text-xs">{country}</span>
            </figcaption>
            <p className="text-xs font-medium text-slate-400">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">&ldquo;{body}&rdquo;</blockquote>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white border-b border-slate-100 relative overflow-hidden select-none py-0 w-full h-[600px] flex items-center justify-center [perspective:400px]">
      
      {/* Blueprint Grid Lines background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div
        className="flex flex-row items-start gap-4 origin-center justify-start w-[140%] -ml-16"
        style={{
          transform:
            'translateX(-200px) translateY(-50px) translateZ(-100px) rotateX(10deg) rotateY(-5deg) rotateZ(8deg)',
        }}
      >
        {/* Column 1 (downwards) */}
        <Marquee 
          vertical 
          pauseOnHover 
          repeat={3} 
          className="w-[260px] h-[900px]" 
          style={{ '--duration': '38s', '--gap': '1.25rem' } as React.CSSProperties}
        >
          {col1.map((review) => (
            <TestimonialCard key={`col1-${review.username}`} {...review} />
          ))}
        </Marquee>

        {/* Column 2 (upwards) */}
        <Marquee 
          vertical 
          pauseOnHover 
          reverse 
          repeat={3} 
          className="w-[260px] h-[900px]" 
          style={{ '--duration': '32s', '--gap': '1.25rem' } as React.CSSProperties}
        >
          {col2.map((review) => (
            <TestimonialCard key={`col2-${review.username}`} {...review} />
          ))}
        </Marquee>

        {/* Column 3 (downwards) */}
        <Marquee 
          vertical 
          pauseOnHover 
          repeat={3} 
          className="w-[260px] h-[900px]" 
          style={{ '--duration': '42s', '--gap': '1.25rem' } as React.CSSProperties}
        >
          {col3.map((review) => (
            <TestimonialCard key={`col3-${review.username}`} {...review} />
          ))}
        </Marquee>

        {/* Column 4 (upwards) */}
        <Marquee 
          vertical 
          pauseOnHover 
          reverse 
          repeat={3} 
          className="w-[260px] h-[900px]" 
          style={{ '--duration': '28s', '--gap': '1.25rem' } as React.CSSProperties}
        >
          {col4.map((review) => (
            <TestimonialCard key={`col4-${review.username}`} {...review} />
          ))}
        </Marquee>

        {/* Column 5 (downwards) */}
        <Marquee 
          vertical 
          pauseOnHover 
          repeat={3} 
          className="w-[260px] h-[900px]" 
          style={{ '--duration': '45s', '--gap': '1.25rem' } as React.CSSProperties}
        >
          {col5.map((review) => (
            <TestimonialCard key={`col5-${review.username}`} {...review} />
          ))}
        </Marquee>

        {/* Column 6 (upwards) */}
        <Marquee 
          vertical 
          pauseOnHover 
          reverse 
          repeat={3} 
          className="w-[260px] h-[900px]" 
          style={{ '--duration': '34s', '--gap': '1.25rem' } as React.CSSProperties}
        >
          {col6.map((review) => (
            <TestimonialCard key={`col6-${review.username}`} {...review} />
          ))}
        </Marquee>

        {/* Column 7 (downwards) */}
        <Marquee 
          vertical 
          pauseOnHover 
          repeat={3} 
          className="w-[260px] h-[900px]" 
          style={{ '--duration': '40s', '--gap': '1.25rem' } as React.CSSProperties}
        >
          {col7.map((review) => (
            <TestimonialCard key={`col7-${review.username}`} {...review} />
          ))}
        </Marquee>

        {/* Column 8 (upwards) */}
        <Marquee 
          vertical 
          pauseOnHover 
          reverse 
          repeat={3} 
          className="w-[260px] h-[900px]" 
          style={{ '--duration': '36s', '--gap': '1.25rem' } as React.CSSProperties}
        >
          {col8.map((review) => (
            <TestimonialCard key={`col8-${review.username}`} {...review} />
          ))}
        </Marquee>
      </div>

      {/* Premium Gradient overlays for vertical marquee */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white via-white/80 to-transparent z-20"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white via-white/80 to-transparent z-20"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-white via-white/80 to-transparent z-20"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-white via-white/80 to-transparent z-20"></div>
    </section>
  );
}
