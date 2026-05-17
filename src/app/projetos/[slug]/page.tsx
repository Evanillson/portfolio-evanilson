import { projects } from '@/lib/data';
import ProjectPageClient from './ProjectPageClient';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Next.js 16: params is a Promise — must be awaited before use.
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectPageClient slug={slug} />;
}
