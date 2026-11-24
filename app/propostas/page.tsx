import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import SmoothScroll from '@/components/smooth-scroll';
import { Contact } from '@/components/home/contact';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Diagnóstico de sistemas sob medida | ViraWeb',
  description: 'Converse com a ViraWeb sobre seu projeto e receba uma proposta personalizada para sua operação.',
  path: '/propostas',
});

export default function PropostasPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="conteudo" className="relative z-10 bg-white pt-[var(--nav-h)]">
        <Contact heading="h1" />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
