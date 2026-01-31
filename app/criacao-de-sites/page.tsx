import { buildMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viraweb.online"

  return buildMetadata({
    title: "Criação de Sites — Vira Web",
    description:
      "Criação de sites profissionais e responsivos. criação de bots, SEO e integração com ferramentas para aumentar suas vendas.",
    path: "/criacao-de-sites",
    keywords: ["criação de sites", "desenvolvimento de sites", "site responsivo"],
    image: `${SITE_URL}/og-criacao-sites.svg`,
  })
}

export default function CriacaoDeSites() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viraweb.online"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/criacao-de-sites#service`,
    name: "Criação de Sites",
    serviceType: "Criação de Sites",
    description:
      "Criação de sites responsivos, otimizados para SEO e conversão para pequenas e médias empresas.",
    provider: {
      "@type": "Organization",
      name: "Vira Web",
      url: siteUrl,
    },
  }

  return (
    <main className="container mx-auto px-6 py-12">
      <script
        id="service-jsonld"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Criação de Sites Profissionais</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Sites responsivos e otimizados para performance e conversão. Do briefing à publicação,
          contamos a sua história na web.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-3">O que entregamos</h2>
          <ul className="list-disc ml-5 space-y-2 text-pretty">
            <li>criação de bots responsivo e acessível</li>
            <li>Otimização inicial de SEO</li>
            <li>Integração com formulários e WhatsApp</li>
            <li>Performance e Core Web Vitals</li>
            <li>Treinamento e suporte pós-lançamento</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Como funciona</h2>
          <ol className="list-decimal ml-5 space-y-2 text-pretty">
            <li>Briefing e proposta</li>
            <li>Protótipo e aprovação</li>
            <li>Desenvolvimento e testes</li>
            <li>Publicação e monitoramento</li>
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pacotes e Orçamento</h2>
        <p className="text-pretty">
          Trabalhamos com pacotes iniciais e soluções personalizadas. Solicite um orçamento
          gratuito clicando no botão abaixo.
        </p>
        <div className="mt-6">
          <a
            className="inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold"
            href="/contato"
          >
            Peça um Orçamento
          </a>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">FAQ</h2>
        <details className="mb-2">
          <summary className="font-medium">Quanto tempo para entregar?</summary>
          <p className="text-pretty mt-2">Projetos simples: 2–4 semanas. Projetos maiores: sob consulta.</p>
        </details>
        <details className="mb-2">
          <summary className="font-medium">Vocês fazem e-commerce?</summary>
          <p className="text-pretty mt-2">Sim — lojas simples até integrações mais avançadas.</p>
        </details>
      </section>
    </main>
  )
}
