'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects, type Project } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
      className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl dark:shadow-none transition-shadow duration-500 ${project.gridClass}`}
      style={{
        background: 'var(--card-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--card-border)',
      }}
    >
      <Link
        href={`/projetos/${project.slug}`}
        className="block h-full p-6 sm:p-8 flex flex-col justify-between min-h-[340px]"
        aria-label={`Ver detalhes do projeto: ${project.title}`}
      >
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <Image 
            src="/dashboard_placeholder.png" 
            alt="Dashboard Placeholder" 
            fill 
            className="object-cover opacity-100 transition-opacity duration-700"
          />
        </div>

        {/* Top — Tags */}
        <div className="relative z-10 flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full"
              style={{
                border: '1px solid var(--card-border)',
                color: '#FFFFFF',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Middle — Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-end mt-4">
          <h3
            className="text-xl sm:text-2xl font-bold tracking-tight mb-2 transition-colors duration-300 group-hover:text-[var(--accent-primary)] drop-shadow-md"
            style={{ color: '#FFFFFF' }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-4 line-clamp-2 drop-shadow-md"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            {project.subtitle}
          </p>

          {/* CTA */}
          <div 
            className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-lg mt-2 self-start transition-all duration-300 shadow-lg group-hover:shadow-[var(--accent-primary)]/30 group-hover:-translate-y-1"
            style={{ 
              backgroundColor: 'var(--accent-primary)',
              color: '#FFFFFF'
            }}
          >
            Ver Projeto
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Hover gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(0,240,255,0.05) 0%, rgba(138,43,226,0.05) 100%)',
          }}
        />

        {/* Corner glow */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'var(--accent-primary)',
            filter: 'blur(60px)',
          }}
        />

        {/* Border glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            border: '1px solid var(--card-border-hover)',
            boxShadow: 'var(--shadow-glow)',
          }}
        />
      </Link>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  // Show only the first 3 featured projects on home
  const featured = projects.slice(0, 3);

  return (
    <section id="projetos" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span
              className="text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
              style={{ color: 'var(--accent-primary)' }}
            >
              Portfólio
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ color: 'var(--foreground)' }}
            >
              Projetos em Destaque
            </h2>
          </div>
          <Link
            href="/projetos"
            className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors duration-300"
            style={{ color: 'var(--accent-primary)' }}
            aria-label="Ver todos os projetos"
          >
            Ver todos
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Mobile "Ver todos" */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: 'var(--accent-primary)' }}
            aria-label="Ver todos os projetos"
          >
            Ver todos os projetos
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
