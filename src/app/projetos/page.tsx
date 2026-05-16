'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { ProjectCard } from '@/components/sections/Projects';
import { ArrowLeft } from 'lucide-react';

export default function ProjetosPage() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors duration-300"
            style={{ color: 'var(--accent-primary)' }}
            aria-label="Voltar para a página inicial"
          >
            <ArrowLeft size={16} />
            Voltar para Home
          </Link>

          <span
            className="text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
            style={{ color: 'var(--accent-primary)' }}
          >
            Portfólio Completo
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Todos os Projetos
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ color: 'var(--foreground-muted)' }}
          >
            Dashboards de Business Intelligence, simulações de pricing e soluções de governança de dados.
          </p>
        </motion.div>

        {/* Full project grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
