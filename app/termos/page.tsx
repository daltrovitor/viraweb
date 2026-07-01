"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useTranslation } from "@/lib/i18n"

export default function Termos() {
  const { language } = useTranslation();

  const renderContent = () => {
    if (language === 'en') {
      return (
        <>
          <div className="text-center mb-10 md:mb-14">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500 font-mono">
              Last updated: October 04, 2025
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm md:text-base text-slate-600 leading-relaxed space-y-6">
            <p className="font-semibold text-slate-800">
              Welcome to ViraWeb!
            </p>
            <p>
              By accessing or using our website and services, you agree to the terms and conditions described below. We recommend reading this document carefully before hiring or using any of our services.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              1. About ViraWeb
            </h2>
            <p>
              ViraWeb is a company specialized in website creation, automation bot development, graphic bots creation, custom systems development, and Google Business Profile (GBP) optimization. Our goal is to provide custom digital solutions to boost our clients' online presence and results.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              2. Acceptance of Terms
            </h2>
            <p>
              By using ViraWeb's website or hiring our services, the client declares that they have read, understood, and fully agree to these Terms of Service, as well as the Privacy Policy. If you do not agree with any clause described here, you must immediately stop using the website and services.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              3. Services Offered
            </h2>
            <p>
              ViraWeb offers the following services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Customized and optimized website creation for different purposes (institutional, e-commerce, portfolios, etc.);
              </li>
              <li>
                Automation bots for WhatsApp, Instagram, Telegram, and other platforms;
              </li>
              <li>
                Graphic design and visual identity creation (logos, banners, business cards, posts, among others);
              </li>
              <li>
                Custom systems development (ERPs, CRMs, automation tools, and BI dashboards);
              </li>
              <li>
                Google Business Profile (GBP) management and local presence optimization.
              </li>
            </ul>
            <p>
              Services are provided in a customized manner, based on analysis, budget, and prior approval of the client.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              4. Client Obligations
            </h2>
            <p>
              The client commits to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide true, complete, and updated information;</li>
              <li>Make available the necessary content (texts, images, logos, etc.) that was agreed upon;</li>
              <li>Respect payment deadlines and contractual conditions;</li>
              <li>Not use ViraWeb's services for illegal, offensive, discriminatory purposes or purposes that infringe the rights of third parties.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              5. Deadlines and Deliveries
            </h2>
            <p>
              Delivery times will be defined in the contract or specific proposal for each service. ViraWeb commits to meeting the agreed deadlines, provided that the client provides all requested information and materials within the agreed timeframes.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              6. Payments and Refunds
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Values, payment methods, and deadlines will be included in the commercial proposal or contract.</li>
              <li>In case of cancellation by the client after the start of the project, there will be no refund of values referring to stages already completed.</li>
              <li>Partial refunds may be analyzed according to the stage of the service and the internal policy of the company.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              7. Intellectual Property
            </h2>
            <p>
              All material developed by ViraWeb (websites, arts, texts, codes, layouts, automations, etc.) remains the property of the company until full payment of the services. After payment, usage rights are transferred to the client, except in cases of software, scripts, or templates licensed from third parties.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              8. Support and Maintenance
            </h2>
            <p>
              ViraWeb offers technical support according to the type of service contracted. Continuous maintenance, updates, or monitoring services must be agreed upon separately in specific plans.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              9. Limitation of Liability
            </h2>
            <p>
              ViraWeb is not responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Failures resulting from improper use of the services;</li>
              <li>Changes made by the client or third parties after delivery;</li>
              <li>Instabilities of external servers, ad platforms, or social networks;</li>
              <li>Financial losses resulting from failures of third parties, organic results, or automations, as performance may vary according to external factors.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              10. Privacy and Data Protection
            </h2>
            <p>
              ViraWeb respects the privacy of its clients and follows the guidelines of the General Data Protection Law (LGPD – Law No. 13,709/2018). The information provided will be used exclusively for contractual and operational purposes.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              11. Changes to Terms
            </h2>
            <p>
              ViraWeb may alter these Terms of Service at any time by publishing the updated version on this website. The client is recommended to periodically review this document to remain informed about any changes.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              12. Contact
            </h2>
            <p>
              In case of questions, support, or requests, the client can contact us through the following channels:
            </p>
            <ul className="list-none pl-0 space-y-2 font-semibold text-slate-800">
              <li>📧 Email: suporte@viraweb.online</li>
              <li>🌐 Website: viraweb.online</li>
              <li>📱 WhatsApp: (62) 9 9246-6109</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              13. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms are governed by Brazilian laws. The jurisdiction of the city of Goiânia-GO is elected to resolve any disputes.
            </p>
          </div>
        </>
      );
    }

    if (language === 'es') {
      return (
        <>
          <div className="text-center mb-10 md:mb-14">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Términos de Servicio
            </h1>
            <p className="text-sm text-slate-500 font-mono">
              Última actualización: 04 de octubre de 2025
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm md:text-base text-slate-600 leading-relaxed space-y-6">
            <p className="font-semibold text-slate-800">
              ¡Bienvenido a ViraWeb!
            </p>
            <p>
              Al acceder o utilizar nuestro sitio web y nuestros servicios, usted acepta los términos y condiciones descritos a continuación. Recomendamos leer atentamente este documento antes de contratar o utilizar cualquiera de nuestros servicios.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              1. Sobre ViraWeb
            </h2>
            <p>
              ViraWeb es una empresa especializada en creación de sitios web, desarrollo de bots de automatización, creación de bots gráficos, desarrollo de sistemas personalizados y optimización de perfiles en Google Business Profile. Nuestro objetivo es proporcionar soluciones digitales personalizadas para impulsar la presencia en línea y los resultados de nuestros clientes.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              2. Aceptación de los Términos
            </h2>
            <p>
              Al utilizar el sitio web de ViraWeb o contratar nuestros servicios, el cliente declara que ha leído, entendido y acepta en su totalidad estos Términos de Servicio, así como la Política de Privacidad. Si no está de acuerdo con alguna cláusula descrita aquí, debe dejar de utilizar inmediatamente el sitio web y los servicios.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              3. Servicios Ofrecidos
            </h2>
            <p>
              ViraWeb ofrece los siguientes servicios:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Creación de sitios web personalizados y optimizados para diferentes propósitos (institucionales, tiendas virtuales, portafolios, etc.);
              </li>
              <li>
                Bots de automatización para WhatsApp, Instagram, Telegram y otras plataformas;
              </li>
              <li>
                Diseño gráfico y creación de identidad visual (logotipos, banners, tarjetas de presentación, publicaciones, entre otros);
              </li>
              <li>
                Desarrollo de sistemas personalizados (ERPs, CRMs, herramientas de automatización y paneles de BI);
              </li>
              <li>
                Gestión de Google Business Profile y optimización de presencia local.
              </li>
            </ul>
            <p>
              Los servicios se prestan de manera personalizada, previa análisis, presupuesto y aprobación del cliente.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              4. Obligaciones del Cliente
            </h2>
            <p>
              El cliente se compromete a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proporcionar información verdadera, completa y actualizada;</li>
              <li>Poner a disposición el contenido necesario (textos, imágenes, logotipos, etc.) acordado;</li>
              <li>Respetar los plazos de pago y las condiciones contractuales;</li>
              <li>No utilizar los servicios de ViraWeb para fines ILegal, ofensivos, discriminatorios o que infrinjan los derechos de terceros.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              5. Plazos y Entregas
            </h2>
            <p>
              Los plazos de entrega se definirán en el contrato o propuesta específica para cada servicio. ViraWeb se compromete a cumplir con los plazos acordados, siempre que el cliente proporcione toda la información y los materiales solicitados dentro de los plazos combinados.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              6. Pagos y Reembolsos
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Los valores, métodos de pago y plazos se incluirán en la propuesta comercial o contrato.</li>
              <li>En caso de desistimiento por parte del cliente después del inicio del proyecto, no habrá reembolso de los valores referentes a las etapas ya completadas.</li>
              <li>Los reembolsos parciales podrán ser analizados según la etapa del servicio y la política interna de la empresa.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              7. Propiedad Intelectual
            </h2>
            <p>
              Todo el material desarrollado por ViraWeb (sitios web, artes, textos, códigos, diseños, automatizaciones, etc.) sigue siendo propiedad de la empresa hasta el pago total de los servicios. Después del pago, los derechos de uso se transfieren al cliente, excepto en casos de software, scripts o plantillas con licencia de terceros.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              8. Soporte y Mantenimiento
            </h2>
            <p>
              ViraWeb ofrece soporte técnico según el tipo de servicio contratado. Los servicios de mantenimiento continuo, actualización o monitoreo deben acordarse por separado en planes específicos.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              9. Limitación de Responsabilidad
            </h2>
            <p>
              ViraWeb no se hace responsable de:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fallas resultantes del uso indebido de los servicios;</li>
              <li>Cambios realizados por el cliente o terceros después de la entrega;</li>
              <li>Inestabilidades de servidores externos, plataformas de anuncios o redes sociales;</li>
              <li>Pérdidas financieras resultantes de fallas de terceros, resultados orgánicos o automatizaciones, ya que el rendimiento puede variar según factores externos.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              10. Privacidad y Protección de Datos
            </h2>
            <p>
              ViraWeb respeta la privacidad de sus clientes y sigue las directrices de la Ley General de Protección de Datos (LGPD). La información proporcionada se utilizará exclusivamente para fines contractuales y operativos.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              11. Cambios a los Términos
            </h2>
            <p>
              ViraWeb puede alterar estos Términos de Servicio en cualquier momento publicando la versión actualizada en este sitio web. Se recomienda al cliente revisar periódicamente este documento para mantenerse informado sobre cualquier cambio.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              12. Contacto
            </h2>
            <p>
              En caso de dudas, soporte o solicitudes, el cliente puede ponerse en contacto por los siguientes canales:
            </p>
            <ul className="list-none pl-0 space-y-2 font-semibold text-slate-800">
              <li>📧 Correo electrónico: suporte@viraweb.online</li>
              <li>🌐 Sitio web: viraweb.online</li>
              <li>📱 WhatsApp: (62) 9 9246-6109</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
              13. Foro y Legislación Aplicable
            </h2>
            <p>
              Estos Términos se rigen por las leyes brasileñas. Se elige el foro de la ciudad de Goiânia-GO para resolver cualquier controversia.
            </p>
          </div>
        </>
      );
    }

    // Default Portuguese
    return (
      <>
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
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
      </>
    );
  };

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
            
            {renderContent()}

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
