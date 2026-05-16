import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Evanilson Freitas',
  description:
    'Artigos sobre Data Analytics, Power BI, DAX, Pricing e Business Intelligence por Evanilson Freitas.',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <span
            className="text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
            style={{ color: 'var(--accent-primary)' }}
          >
            Blog
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Insights & Artigos
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ color: 'var(--foreground-muted)' }}
          >
            Compartilhando conhecimento sobre Data Analytics, Power BI, DAX, Pricing e Business Intelligence.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ background: 'var(--divider)' }} />

        {/* Posts */}
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-8 sm:py-10"
                aria-label={`Ler artigo: ${post.title}`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <time
                    className="text-xs font-mono tracking-wider"
                    style={{ color: 'var(--foreground-muted)' }}
                    dateTime={post.date}
                  >
                    {formatDate(post.date)}
                  </time>
                  <span className="text-xs font-mono" style={{ color: 'var(--foreground-muted)' }}>•</span>
                  <span
                    className="text-xs font-mono tracking-wider"
                    style={{ color: 'var(--foreground-muted)' }}
                  >
                    {post.readTime}
                  </span>
                </div>

                <h2
                  className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 group-hover:text-[var(--accent-primary)] transition-colors duration-300"
                  style={{ color: 'var(--foreground)' }}
                >
                  {post.title}
                </h2>

                <p
                  className="text-sm leading-relaxed mb-4 line-clamp-2"
                  style={{ color: 'var(--foreground-muted)' }}
                >
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded"
                      style={{
                        color: 'var(--foreground-muted)',
                        background: 'var(--card-bg)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
              <div
                className="h-px w-full"
                style={{ background: 'var(--divider)' }}
              />
            </article>
          ))
        ) : (
          <div className="py-24 text-center">
            <p className="text-lg" style={{ color: 'var(--foreground-muted)' }}>
              Novos artigos em breve...
            </p>
          </div>
        )}

        {/* Back */}
        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300"
            style={{ color: 'var(--accent-primary)' }}
            aria-label="Voltar para a página inicial"
          >
            ← Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  );
}
