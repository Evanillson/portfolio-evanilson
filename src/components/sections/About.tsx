'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { userData } from '@/lib/data';
import {
  Target,
  TrendingUp,
  Database,
  Users,
  Download,
  CheckCircle2,
  Layers,
  BarChart3,
  Cpu,
  Workflow,
} from 'lucide-react';

const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

const competencyIcons: Record<string, React.ReactNode> = {
  'Arquitetura de Dados Corporativos': <Layers size={16} />,
  'Power BI (DAX Avançado, Power Query M)': <BarChart3 size={16} />,
  'Modelagem Dimensional (Star Schema)': <Database size={16} />,
  'ETL & Engenharia de Dados': <Cpu size={16} />,
  'SQL Server & Databricks': <Database size={16} />,
  'Python para Análise de Dados': <Workflow size={16} />,
  'Storytelling com Dados': <Target size={16} />,
  'Governança & RLS': <Users size={16} />,
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="sobre" className="py-24 sm:py-32 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <span
            className="text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
            style={{ color: 'var(--accent-primary)' }}
          >
            Conheça o Especialista
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: 'var(--foreground)' }}
          >
            Sobre Mim
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left Column — Photo + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Photo */}
            <div className="relative w-full max-w-sm aspect-[3/4] mx-auto rounded-2xl overflow-hidden glass shadow-2xl mb-8">
              <Image
                src="/profile_placeholder.png"
                alt="Evanilson Freitas — Especialista em Power BI"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />

              {/* Status badge */}
              <div
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: 'var(--card-bg)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--accent-primary)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: '#22C55E' }}
                />
                Disponível
              </div>
            </div>

            {/* Quick facts */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                <Target size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>{userData.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                <BarChart3 size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>{userData.role.split(' | ')[0]}</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                <Database size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>{userData.language}</span>
              </div>
            </div>

            {/* Download CV Button */}
            <a
              href="/cv/curriculo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] w-full justify-center"
              style={{
                background: 'var(--accent-primary)',
                color: 'var(--background-secondary)',
              }}
              aria-label="Baixar Currículo PDF"
            >
              <Download size={16} />
              Baixar Currículo (PDF)
            </a>
          </motion.div>

          {/* Right Column — Bio + Skills + Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col"
          >
            {/* Bio */}
            <div className="space-y-5 mb-10">
              {userData.aboutExtended.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: 'var(--foreground-muted)' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Competencies */}
            <div className="mb-10">
              <h3
                className="text-sm uppercase tracking-[0.2em] font-medium mb-4"
                style={{ color: 'var(--accent-primary)' }}
              >
                Competências Principais
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {userData.coreCompetencies.map((comp, i) => (
                  <motion.div
                    key={comp}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.05, ease: EASE }}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg transition-colors duration-300"
                    style={{ color: 'var(--foreground)' }}
                  >
                    <CheckCircle2
                      size={16}
                      style={{ color: 'var(--accent-primary)', flexShrink: 0 }}
                    />
                    <span className="text-sm font-medium">{comp}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {userData.highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: EASE }}
                  className="p-4 rounded-2xl text-center transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <h4
                    className="text-2xl sm:text-3xl font-bold mb-1"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    {item.metric}
                  </h4>
                  <p
                    className="text-[11px] font-medium uppercase tracking-wider"
                    style={{ color: 'var(--foreground-muted)' }}
                  >
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
