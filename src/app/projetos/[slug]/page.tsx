import { projects } from '@/lib/data';
import ProjectPageClient from './ProjectPageClient';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return <ProjectPageClient slug={params.slug} />;
}
