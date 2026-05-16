import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post não encontrado' };

  return {
    title: `${post.title} — Blog | Evanilson Freitas`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav
          className="flex items-center gap-2 text-sm mb-8"
          aria-label="Breadcrumb"
          style={{ color: 'var(--foreground-muted)' }}
        >
          <Link
            href="/"
            className="hover:text-[var(--accent-primary)] transition-colors duration-300"
          >
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            href="/blog"
            className="hover:text-[var(--accent-primary)] transition-colors duration-300"
          >
            Blog
          </Link>
          <ChevronRight size={14} />
          <span className="line-clamp-1" style={{ color: 'var(--accent-primary)' }}>
            {post.title}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--accent-primary)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.15]"
            style={{ color: 'var(--foreground)' }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4">
            {/* Author avatar placeholder */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: 'var(--accent-primary)',
                color: 'var(--background-secondary)',
              }}
            >
              EF
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                {post.author}
              </p>
              <div className="flex items-center gap-3">
                <time
                  className="text-xs font-mono"
                  style={{ color: 'var(--foreground-muted)' }}
                  dateTime={post.date}
                >
                  {formatDate(post.date)}
                </time>
                <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>•</span>
                <span className="text-xs font-mono" style={{ color: 'var(--foreground-muted)' }}>
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px w-full mb-12" style={{ background: 'var(--divider)' }} />

        {/* MDX Content */}
        <div className="prose-custom">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--divider)' }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300"
            style={{ color: 'var(--accent-primary)' }}
            aria-label="Voltar para todos os artigos"
          >
            ← Voltar para Blog
          </Link>

          <p className="text-xs font-mono" style={{ color: 'var(--foreground-muted)' }}>
            Publicado em {formatDate(post.date)}
          </p>
        </div>
      </article>
    </div>
  );
}
