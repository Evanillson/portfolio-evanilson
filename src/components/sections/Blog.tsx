'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { BlogPostMeta } from '@/lib/blog';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function BlogItem({ post, index }: { post: BlogPostMeta; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block py-8 sm:py-10 relative"
        aria-label={`Ler artigo: ${post.title}`}
      >
        {/* Top line — date + read time */}
        <div className="flex items-center gap-4 mb-3">
          <span
            className="text-xs font-mono tracking-wider"
            style={{ color: 'var(--foreground-muted)' }}
          >
            {formatDate(post.date)}
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--foreground-muted)' }}
          >
            •
          </span>
          <span
            className="text-xs font-mono tracking-wider"
            style={{ color: 'var(--foreground-muted)' }}
          >
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-start justify-between gap-4">
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight group-hover:text-[var(--accent-primary)] transition-colors duration-300"
            style={{ color: 'var(--foreground)' }}
          >
            {post.title}
          </h3>
          <ArrowUpRight
            size={24}
            className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
            style={{ color: 'var(--accent-primary)' }}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded"
              style={{ color: 'var(--foreground-muted)', background: 'var(--card-bg)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>

      {/* Divider with glow on hover */}
      <div
        className="h-px w-full transition-all duration-500 group-hover:shadow-[0_0_8px_var(--accent-primary)]"
        style={{ background: 'var(--divider)' }}
      />
    </motion.div>
  );
}

export default function BlogSection({ posts }: { posts: BlogPostMeta[] }) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section id="blog" className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span
              className="text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
              style={{ color: 'var(--accent-primary)' }}
            >
              Insights
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ color: 'var(--foreground)' }}
            >
              Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors duration-300"
            style={{ color: 'var(--accent-primary)' }}
            aria-label="Ver todos os artigos do blog"
          >
            Ver todos
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>

        {/* Divider top */}
        <div className="h-px w-full mb-0" style={{ background: 'var(--divider)' }} />

        {/* Posts list */}
        <div>
          {posts.length > 0 ? (
            posts.slice(0, 5).map((post, i) => (
              <BlogItem key={post.slug} post={post} index={i} />
            ))
          ) : (
            <div className="py-16 text-center">
              <p style={{ color: 'var(--foreground-muted)' }}>
                Novos artigos em breve...
              </p>
            </div>
          )}
        </div>

        {/* Mobile "Ver todos" */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: 'var(--accent-primary)' }}
            aria-label="Ver todos os artigos do blog"
          >
            Ver todos os artigos
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
