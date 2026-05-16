'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { certificates } from '@/lib/data';
import type { Certificate } from '@/lib/data';
import { TechIcon } from '@/components/ui/TechIcons';
import {
  ArrowLeft,
  GraduationCap,
  Award,
  BookOpen,
  FileText,
  Beaker,
  Layers,
  ChevronRight,
  Download,
  CheckCircle2,
  Star,
  Clock,
  Calendar,
} from 'lucide-react';

const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

const typeIcons: Record<string, React.ReactNode> = {
  mba: <Award size={24} />,
  pos: <BookOpen size={24} />,
  graduacao: <GraduationCap size={24} />,
  certificacao: <Award size={24} />,
};

const typeLabels: Record<string, string> = {
  mba: 'MBA',
  pos: 'Pós-Graduação',
  graduacao: 'Graduação',
  certificacao: 'Certificação',
};

const techIconMap: Record<string, string> = {
  'Python': 'python', 'R': 'python', 'SQL': 'sqlserver',
  'Spark': 'spark', 'Pandas': 'pandas', 'Scikit-learn': 'python',
  'TensorFlow': 'python', 'Power BI': 'powerbi', 'Jupyter': 'python',
  'Git': 'databricks', 'Excel': 'excel', 'SAP': 'powerquery',
  'PowerPoint': 'powerquery', 'Word': 'excel',
  'Matplotlib': 'python', 'NLTK': 'python', 'Spacy': 'python',
  'FastAPI': 'python', 'DAX': 'dax', 'Prophet': 'python',
};

/* ========================================
   TABS for detailed certificate view
   ======================================== */
type TabKey = 'resumo' | 'modulos' | 'tcc' | 'projetos' | 'tecnologias';

const tabConfig: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'resumo', label: 'Resumo', icon: <FileText size={16} /> },
  { key: 'modulos', label: 'Módulos', icon: <Layers size={16} /> },
  { key: 'tcc', label: 'TCC', icon: <GraduationCap size={16} /> },
  { key: 'projetos', label: 'Projetos', icon: <Beaker size={16} /> },
  { key: 'tecnologias', label: 'Tecnologias', icon: <Layers size={16} /> },
];

function getAvailableTabs(cert: Certificate): TabKey[] {
  const tabs: TabKey[] = ['resumo'];
  if (cert.modules && cert.modules.length > 0) tabs.push('modulos');
  if (cert.tcc) tabs.push('tcc');
  if (cert.academicProjects && cert.academicProjects.length > 0) tabs.push('projetos');
  if (cert.technologies && cert.technologies.length > 0) tabs.push('tecnologias');
  return tabs;
}

/* ========================================
   EDUCATION PAGE
   ======================================== */
export default function EducacaoPage() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  // Separate academic from certifications
  const academic = certificates.filter((c) => ['mba', 'pos', 'graduacao'].includes(c.type));
  const certifications = certificates.filter((c) => c.type === 'certificacao');

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors duration-300"
            style={{ color: 'var(--accent-primary)' }}
          >
            <ArrowLeft size={16} />
            Voltar para Home
          </Link>

          <span
            className="text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
            style={{ color: 'var(--accent-primary)' }}
          >
            Formação Acadêmica Completa
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Educação & Certificados
          </h1>
          <p
            className="text-lg max-w-3xl"
            style={{ color: 'var(--foreground-muted)' }}
          >
            Trajetória acadêmica completa com detalhes de cada formação, módulos estudados,
            projetos acadêmicos, defesa de TCC e certificações profissionais.
          </p>
        </motion.div>

        {/* Academic Timeline */}
        <div className="mb-24">
          <h2
            className="text-2xl font-bold tracking-tight mb-10 flex items-center gap-3"
            style={{ color: 'var(--foreground)' }}
          >
            <GraduationCap size={28} style={{ color: 'var(--accent-primary)' }} />
            Formação Acadêmica
          </h2>

          <div className="space-y-8">
            {academic.map((cert, i) => (
              <AcademicDetailCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        </div>

        {/* Professional Certifications */}
        <div>
          <h2
            className="text-2xl font-bold tracking-tight mb-10 flex items-center gap-3"
            style={{ color: 'var(--foreground)' }}
          >
            <Award size={28} style={{ color: 'var(--accent-primary)' }} />
            Certificações Profissionais
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <CertificationCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================
   ACADEMIC DETAIL CARD (expandable)
   ======================================== */
function AcademicDetailCard({ cert, index }: { cert: Certificate; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [activeTab, setActiveTab] = useState<TabKey>('resumo');
  const availableTabs = getAvailableTabs(cert);
  const isMBA = cert.type === 'mba';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="rounded-3xl overflow-hidden"
      style={{
        background: 'var(--card-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        border: isMBA ? '1px solid var(--card-border-hover)' : '1px solid var(--card-border)',
      }}
    >
      {/* Header */}
      <div className="p-6 sm:p-8 pb-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: 'var(--accent-primary)',
                color: 'var(--background-secondary)',
              }}
            >
              {typeIcons[cert.type]}
            </div>
            <div>
              {isMBA && (
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold mb-2"
                  style={{
                    background: 'var(--accent-primary)',
                    color: 'var(--background-secondary)',
                  }}
                >
                  <Star size={10} />
                  Destaque
                </span>
              )}
              <h3
                className="text-xl sm:text-2xl font-bold tracking-tight mb-1"
                style={{ color: 'var(--foreground)' }}
              >
                {cert.title}
              </h3>
              <p className="text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>
                {cert.institution}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: 'var(--foreground-muted)' }}>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} />
              {cert.year}
            </span>
            {cert.duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} />
                {cert.duration}
              </span>
            )}
            {cert.status && (
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-medium"
                style={{
                  border: '1px solid var(--card-border)',
                  color: '#22C55E',
                }}
              >
                <CheckCircle2 size={12} />
                {cert.status}
              </span>
            )}
          </div>
        </div>

        {/* Tabs */}
        {availableTabs.length > 1 && (
          <div className="flex gap-1 overflow-x-auto pb-0 -mb-px">
            {availableTabs.map((tabKey) => {
              const tab = tabConfig.find((t) => t.key === tabKey)!;
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-300 rounded-t-lg shrink-0"
                  style={{
                    color: isActive ? 'var(--accent-primary)' : 'var(--foreground-muted)',
                    borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    background: isActive ? 'var(--background)' : 'transparent',
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: 'var(--divider)' }} />

      {/* Tab Content */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {activeTab === 'resumo' && <TabResumo cert={cert} />}
            {activeTab === 'modulos' && <TabModulos cert={cert} />}
            {activeTab === 'tcc' && <TabTCC cert={cert} />}
            {activeTab === 'projetos' && <TabProjetos cert={cert} />}
            {activeTab === 'tecnologias' && <TabTecnologias cert={cert} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer — download */}
      {cert.pdfUrl && (
        <div
          className="px-6 sm:px-8 py-4 flex items-center justify-between"
          style={{ borderTop: '1px solid var(--divider)' }}
        >
          <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
            Certificado disponível para download
          </span>
          <a
            href={cert.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'var(--accent-primary)',
              color: 'var(--background-secondary)',
            }}
          >
            <Download size={12} />
            Baixar PDF
          </a>
        </div>
      )}
    </motion.div>
  );
}

/* ========================================
   TAB CONTENT COMPONENTS
   ======================================== */
function TabResumo({ cert }: { cert: Certificate }) {
  return (
    <div className="space-y-5">
      <p className="text-base leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
        {cert.description}
      </p>
      {cert.highlights && cert.highlights.length > 0 && (
        <div className="space-y-2">
          <h4
            className="text-sm uppercase tracking-[0.15em] font-medium mb-3"
            style={{ color: 'var(--accent-primary)' }}
          >
            Destaques
          </h4>
          {cert.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color: 'var(--accent-primary)' }}
              />
              <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                {h}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TabModulos({ cert }: { cert: Certificate }) {
  if (!cert.modules) return null;
  return (
    <div>
      <p className="text-sm mb-6" style={{ color: 'var(--foreground-muted)' }}>
        Grade curricular completa do programa ({cert.modules.length} módulos)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cert.modules.map((mod, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-[1.01]"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--card-border)',
            }}
          >
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                background: 'var(--accent-primary)',
                color: 'var(--background-secondary)',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              {mod}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabTCC({ cert }: { cert: Certificate }) {
  if (!cert.tcc) return null;
  const { tcc } = cert;
  return (
    <div className="space-y-8">
      {/* TCC Title */}
      <div>
        <h4
          className="text-lg sm:text-xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--foreground)' }}
        >
          {tcc.title}
        </h4>
        <span
          className="text-xs uppercase tracking-[0.15em] font-medium"
          style={{ color: 'var(--accent-primary)' }}
        >
          Trabalho de Conclusão — Defesa Aprovada
        </span>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <div>
          <h5
            className="text-sm uppercase tracking-[0.15em] font-medium mb-3 flex items-center gap-2"
            style={{ color: 'var(--accent-primary)' }}
          >
            <FileText size={14} />
            Resumo
          </h5>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
            {tcc.summary}
          </p>
        </div>

        <div
          className="h-px w-full"
          style={{ background: 'var(--divider)' }}
        />

        <div>
          <h5
            className="text-sm uppercase tracking-[0.15em] font-medium mb-3 flex items-center gap-2"
            style={{ color: 'var(--accent-primary)' }}
          >
            <Beaker size={14} />
            Metodologia
          </h5>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
            {tcc.methodology}
          </p>
        </div>

        <div
          className="h-px w-full"
          style={{ background: 'var(--divider)' }}
        />

        <div>
          <h5
            className="text-sm uppercase tracking-[0.15em] font-medium mb-3 flex items-center gap-2"
            style={{ color: 'var(--accent-primary)' }}
          >
            <Star size={14} />
            Resultado
          </h5>
          <div
            className="p-4 rounded-xl"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--card-border-hover)',
            }}
          >
            <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--foreground)' }}>
              {tcc.result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabProjetos({ cert }: { cert: Certificate }) {
  if (!cert.academicProjects) return null;
  return (
    <div>
      <p className="text-sm mb-6" style={{ color: 'var(--foreground-muted)' }}>
        Projetos desenvolvidos durante o programa acadêmico
      </p>
      <div className="space-y-4">
        {cert.academicProjects.map((proj, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl transition-all duration-300 hover:shadow-md"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--card-border)',
            }}
          >
            <h5
              className="text-base font-bold tracking-tight mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              {proj.name}
            </h5>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--foreground-muted)' }}>
              {proj.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded-full"
                  style={{
                    border: '1px solid var(--card-border)',
                    color: 'var(--accent-primary)',
                  }}
                >
                  <span className="w-3 h-3 flex items-center justify-center" style={{ color: 'var(--accent-primary)' }}>
                    <TechIcon name={techIconMap[t] || 'python'} size={10} />
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabTecnologias({ cert }: { cert: Certificate }) {
  if (!cert.technologies) return null;
  return (
    <div>
      <p className="text-sm mb-6" style={{ color: 'var(--foreground-muted)' }}>
        Tecnologias e ferramentas utilizadas ao longo do programa
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cert.technologies.map((tech) => (
          <div
            key={tech}
            className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--card-border)',
            }}
          >
            <span className="w-6 h-6 flex items-center justify-center" style={{ color: 'var(--accent-primary)' }}>
              <TechIcon name={techIconMap[tech] || 'python'} size={20} />
            </span>
            <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================================
   CERTIFICATION CARD (simpler)
   ======================================== */
function CertificationCard({ cert, index }: { cert: Certificate; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className="group rounded-2xl p-6 transition-all duration-500 hover:shadow-lg"
      style={{
        background: 'var(--card-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--card-border)',
      }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: 'var(--accent-primary)',
          color: 'var(--background-secondary)',
        }}
      >
        <Award size={20} />
      </div>

      <span
        className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2 block"
        style={{ color: 'var(--accent-primary)' }}
      >
        {cert.institution} • {cert.year}
      </span>

      <h3
        className="text-base font-bold tracking-tight mb-2 group-hover:text-[var(--accent-primary)] transition-colors duration-500"
        style={{ color: 'var(--foreground)' }}
      >
        {cert.title}
      </h3>

      <p className="text-sm line-clamp-2 leading-relaxed mb-4" style={{ color: 'var(--foreground-muted)' }}>
        {cert.description}
      </p>

      {cert.pdfUrl && (
        <a
          href={cert.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-300"
          style={{ color: 'var(--accent-primary)' }}
        >
          <Download size={12} />
          Baixar Certificado
        </a>
      )}

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          border: '1px solid var(--card-border-hover)',
          boxShadow: 'var(--shadow-glow)',
        }}
      />
    </motion.div>
  );
}
