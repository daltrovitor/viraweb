// Hello World
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { getTopicPage, TOPIC_SLUGS } from '@/lib/seo/pages';
import { TopicView } from '@/components/seo/topic-view';

// Only the topic pages listed in lib/seo/pages exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return TOPIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getTopicPage(slug);
  if (!page) return {};
  return buildMetadata({ title: page.title, description: page.description, path: `/${page.slug}` });
}

export default async function TopicRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getTopicPage(slug);
  if (!page) notFound();
  return <TopicView page={page} />;
}
