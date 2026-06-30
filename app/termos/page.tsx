"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Termos() {
  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Header />
      
      {/* Header spacer */}
      <div className="h-20" />

      <section id="termos" className="relative py-16 md:py-24 bg-slate-50/30">
        {/* Background grids */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="tech-line-grid opacity-30" />
          <div className="tech-grid opacity-20" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-900/[0.06] shadow-[0_12px_40px_-20px_rgba(0,0,0,0.03)] p-6 md:p-12">
            
            <div className="text-center mb-10 md:mb-14">
              <h1 className="heading-lg mb-4 text-slate-900">
                Termos de Serviço
              </h1>
              <p className="text-sm text-slate-500 font-mono">
                Última atualização: 04 de outubro de 2025
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-sm md:text-base text-slate-600 leading-relaxed space-y-6">
              <p className="font-semibold text-slate-800">
                Bem-vindo à ViraWeb!
              </p>
              <p>
                Ao acessar ou utilizar nosso site e nossos serviços, você concorda com os termos e condições descritos abaixo. Recomendamos a leitura atenta deste documento antes de contratar ou utilizar qualquer um de nossos serviços.
              </p>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                1. Sobre a ViraWeb
              </h2>
              <p>
                A ViraWeb é uma empresa especializada em criação de sites, desenvolvimento de bots de automação, criação de bots gráficos, desenvolvimento de sistemas personalizados e otimização de perfis no Google Meu Negócio (GMN). Nosso objetivo é fornecer soluções digitais personalizadas para impulsionar a presença online e os resultados de nossos clientes.
              </p>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                2. Aceitação dos Termos
              </h2>
              <p>
                Ao utilizar o site da ViraWeb ou contratar nossos serviços, o cliente declara que leu, entendeu e concorda integralmente com estes Termos de Serviço, bem como com a Política de Privacidade. Caso não concorde com qualquer cláusula aqui descrita, o cliente deve interromper imediatamente o uso do site e dos serviços.
              </p>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                3. Serviços Oferecidos
              </h2>
              <p>
                A ViraWeb oferece os seguintes serviços:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Criação de Sites personalizados e otimizados para diferentes finalidades (institucionais, lojas virtuais, portfólios etc.);
                </li>
                <li>
                  Bots de Automação para WhatsApp, Instagram, Telegram e outras plataformas;
                </li>
                <li>
                  Criação de bots Gráficos e Identidade Visual (logotipos, banners, cartões, posts, entre outros);
                </li>
                <li>
                  Desenvolvimento de Sistemas Personalizados (ERPs, CRMs, ferramentas de automação e painéis de BI);
                </li>
                <li>
                  Gestão de Google Meu Negócio (GMN) e otimização de presença local.
                </li>
              </ul>
              <p>
                Os serviços são prestados de forma personalizada, mediante análise, orçamento e aprovação prévia do cliente.
              </p>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                4. Obrigações do Cliente
              </h2>
              <p>
                O cliente se compromete a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer informações verdadeiras, completas e atualizadas;</li>
                <li>Disponibilizar o conteúdo necessário (textos, imagens, logotipos etc.) que foi acordado;</li>
                <li>Respeitar os prazos de pagamento e as condições contratuais;</li>
                <li>Não utilizar os serviços da ViraWeb para fins ilegais, ofensivos, discriminatórios ou que infrinjam direitos de terceiros.</li>
              </ul>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                5. Prazos e Entregas
              </h2>
              <p>
                Os prazos de entrega serão definidos em contrato ou proposta específica para cada serviço. A ViraWeb compromete-se a cumprir os prazos acordados, desde que o cliente forneça todas as informações e materiais solicitados dentro dos prazos combinados.
              </p>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                6. Pagamentos e Reembolsos
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Os valores, formas de pagamento e prazos constarão na proposta comercial ou contrato.</li>
                <li>Em caso de desistência por parte do cliente após o início do projeto, não haverá reembolso de valores referentes a etapas já concluídas.</li>
                <li>Reembolsos parciais poderão ser analisados conforme o estágio do serviço e a política interna da empresa.</li>
              </ul>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                7. Propriedade Intelectual
              </h2>
              <p>
                Todo o material desenvolvido pela ViraWeb (sites, artes, textos, códigos, layouts, automações etc.) permanece de propriedade da empresa até o pagamento total dos serviços. Após a quitação, os direitos de uso são transferidos ao cliente, exceto em casos de softwares, scripts ou templates licenciados de terceiros.
              </p>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                8. Suporte e Manutenção
              </h2>
              <p>
                A ViraWeb oferece suporte técnico conforme o tipo de serviço contratado. Serviços de manutenção contínua, atualização ou monitoramento devem ser acordados separadamente em planos específicos.
              </p>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                9. Limitação de Responsabilidade
              </h2>
              <p>
                A ViraWeb não se responsabiliza por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Falhas decorrentes de uso indevido dos serviços;</li>
                <li>Alterações feitas pelo cliente ou por terceiros após a entrega;</li>
                <li>Instabilidades de servidores externos, plataformas de anúncios ou redes sociais;</li>
                <li>Perdas financeiras decorrentes de falhas de terceiros, resultados orgânicos ou automações, uma vez que o desempenho pode variar de acordo com fatores externos.</li>
              </ul>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                10. Privacidade e Proteção de Dados
              </h2>
              <p>
                A ViraWeb respeita a privacidade de seus clientes e segue as diretrizes da Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018). As informações fornecidas serão utilizadas exclusivamente para fins contratuais e operacionais.
              </p>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                11. Alterações dos Termos
              </h2>
              <p>
                A ViraWeb pode alterar estes Termos de Serviço a qualquer momento, publicando a versão atualizada neste site. Recomenda-se que o cliente revise periodicamente este documento para manter-se informado sobre eventuais mudanças.
              </p>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                12. Contato
              </h2>
              <p>
                Em caso de dúvidas, suporte ou solicitações, o cliente pode entrar em contato pelos seguintes canais:
              </p>
              <ul className="list-none pl-0 space-y-2 font-semibold text-slate-800">
                <li>📧 E-mail: suporte@viraweb.online</li>
                <li>🌐 Site: viraweb.online</li>
                <li>📱 WhatsApp: (62) 9 9246-6109</li>
              </ul>

              <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                13. Foro e Legislação Aplicável
              </h2>
              <p>
                Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de Goiânia-GO, com exclusão de qualquer outro, por mais privilegiado que seja, para dirimir eventuais controvérsias.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
