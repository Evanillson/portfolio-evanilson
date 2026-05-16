'use client';

import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { projects } from '@/lib/data';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import {
  ChevronRight,
  Maximize2,
  AlertTriangle,
  Smartphone,
  Layers,
  Database,
  Workflow,
  Cpu,
} from 'lucide-react';
import Image from 'next/image';

const MermaidDiagram = dynamic(() => import('@/components/ui/MermaidDiagram'), {
  ssr: false,
  loading: () => (
    <div className="h-64 rounded-2xl flex items-center justify-center" style={{ background: 'var(--card-bg)' }}>
      <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }} />
    </div>
  ),
});

const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

function Section({
  title,
  icon,
  content,
  diagram,
  diagramCaption,
  index,
}: {
  title: string;
  icon: React.ReactNode;
  content: string;
  diagram?: string;
  diagramCaption?: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="mb-16"
    >
      <h3
        className="text-xl sm:text-2xl font-bold tracking-tight mb-4 flex items-center gap-3"
        style={{ color: 'var(--foreground)' }}
      >
        <span style={{ color: 'var(--accent-primary)' }}>{icon}</span>
        {title}
      </h3>
      <p
        className="text-base leading-relaxed mb-6"
        style={{ color: 'var(--foreground-muted)' }}
      >
        {content}
      </p>

      {/* Mermaid Diagram */}
      {diagram && (
        <MermaidDiagram chart={diagram} caption={diagramCaption} />
      )}
    </motion.div>
  );
}

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects.find((p) => p.slug === slug);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  if (!project) {
    notFound();
  }

  const handleFullscreen = () => {
    const container = iframeContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const sections = [
    {
      title: 'Arquitetura de Dados',
      icon: <Layers size={24} />,
      content: project.sections.architecture,
      diagram: project.mermaidDiagrams.architecture,
      diagramCaption: 'Diagrama de Arquitetura — Fluxo de dados entre camadas',
    },
    {
      title: 'Processo de ETL (Engenharia)',
      icon: <Cpu size={24} />,
      content: project.sections.etl,
    },
    {
      title: 'Modelagem (Star Schema)',
      icon: <Database size={24} />,
      content: project.sections.modeling,
      diagram: project.mermaidDiagrams.erDiagram,
      diagramCaption: 'Diagrama ER — Modelo dimensional Star Schema',
    },
    {
      title: 'Fluxograma da Solução',
      icon: <Workflow size={24} />,
      content: project.sections.flowchart,
      diagram: project.mermaidDiagrams.flowchart,
      diagramCaption: 'Fluxograma — Pipeline de ponta a ponta',
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            href="/projetos"
            className="hover:text-[var(--accent-primary)] transition-colors duration-300"
          >
            Projetos
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--accent-primary)' }}>{project.title}</span>
        </motion.nav>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mb-8"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            {project.title}
          </h1>
          <p
            className="text-lg"
            style={{ color: 'var(--foreground-muted)' }}
          >
            {project.description}
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {project.tags.map((tag) => (
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
        </motion.div>

        {/* Dashboard iframe container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          ref={iframeContainerRef}
          className="relative rounded-2xl overflow-hidden mb-16"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
          }}
        >
          {/* Fullscreen button */}
          <button
            onClick={handleFullscreen}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg transition-all duration-300"
            style={{
              background: 'var(--card-bg)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--card-border)',
              color: 'var(--foreground)',
            }}
            aria-label={isFullscreen ? 'Sair da tela cheia' : 'Abrir em tela cheia'}
          >
            <Maximize2 size={18} />
          </button>

          {/* Aspect ratio container */}
          <div className="aspect-video relative">
            {project.embedUrl ? (
              <>
                {!iframeLoaded && (
                  <SkeletonLoader className="absolute inset-0" />
                )}
                <iframe
                  src={project.embedUrl}
                  className="w-full h-full"
                  onLoad={() => setIframeLoaded(true)}
                  allowFullScreen
                  title={`Dashboard: ${project.title}`}
                  style={{ opacity: iframeLoaded ? 1 : 0 }}
                />
              </>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src="/dashboard_placeholder.png"
                  alt="Dashboard Placeholder"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center p-6">
                    <AlertTriangle size={32} className="mx-auto mb-4" style={{ color: 'var(--accent-primary)' }} />
                    <p className="text-white font-medium">Dashboard Interativo em Breve</p>
                    <p className="text-sm mt-2 text-gray-300">Este é um placeholder visual da solução desenvolvida.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile rotate hint */}
          <div
            className="flex sm:hidden items-center gap-2 px-4 py-3 text-xs"
            style={{
              borderTop: '1px solid var(--divider)',
              color: 'var(--foreground-muted)',
            }}
          >
            <Smartphone size={14} />
            Para melhor visualização, rotacione o dispositivo para paisagem.
          </div>
        </motion.div>

        {/* Documentation sections */}
        <div
          className="h-px w-full mb-12"
          style={{ background: 'var(--divider)' }}
        />

        {sections.map((section, i) => (
          <Section
            key={section.title}
            title={section.title}
            icon={section.icon}
            content={section.content}
            diagram={section.diagram}
            diagramCaption={section.diagramCaption}
            index={i}
          />
        ))}

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8"
          style={{ borderTop: '1px solid var(--divider)' }}
        >
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300"
            style={{ color: 'var(--accent-primary)' }}
            aria-label="Voltar para todos os projetos"
          >
            ← Voltar para Projetos
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
