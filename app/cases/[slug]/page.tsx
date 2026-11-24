import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import SmoothScroll from '@/components/smooth-scroll';
import { CaseDetails } from '@/components/home/case-details';
import { PrxCase } from '@/components/home/prx-case';
import { PontoControle } from '@/components/home/pontocontrole';
import { cases } from '@/lib/home/cases';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = cases.find((item) => item.slug === slug);
  if (!project) return {};
  return buildMetadata({ title: `${project.name.pt} | Cases ViraWeb`, description: project.copy.pt.summary, path: `/cases/${slug}` });
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const project = cases.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <SmoothScroll>
      <Navbar />
      <main id="conteudo" className="relative z-10 bg-white">
        <CaseDetails project={project} />
        {slug === 'prx' && <PrxCase />}
        {slug === 'pontocontrole' && <PontoControle />}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
