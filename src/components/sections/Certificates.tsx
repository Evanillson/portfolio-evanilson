'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { certificates } from '@/lib/data';
import { X, GraduationCap, Award, BookOpen, ExternalLink, ArrowUpRight, Download } from 'lucide-react';
import type { Certificate } from '@/lib/data';

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

function CertCard({
  cert,
  index,
  onClick,
}: {
  cert: Certificate;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  const isFeatured = cert.type === 'mba';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: EASE,
      }}
      onClick={onClick}
      className={`group relative rounded-2xl p-6 sm:p-8 transition-all duration-500 cursor-pointer hover:shadow-lg ${
        isFeatured ? 'sm:col-span-2' : ''
      }`}
      style={{
        background: 'var(--card-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        border: isFeatured
          ? '1px solid var(--card-border-hover)'
          : '1px solid var(--card-border)',
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes: ${cert.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Featured badge */}
      {isFeatured && (
        <span
          className="absolute top-4 right-4 text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-full"
          style={{
            background: 'var(--accent-primary)',
            color: 'var(--background-secondary)',
          }}
        >
          Destaque
        </span>
      )}

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-105"
        style={{
          background: 'var(--accent-primary)',
          color: 'var(--background-secondary)',
        }}
      >
        {typeIcons[cert.type]}
      </div>

      {/* Type badge */}
      <span
        className="text-[10px] uppercase tracking-[0.2em] font-medium mb-3 block"
        style={{ color: 'var(--accent-primary)' }}
      >
        {typeLabels[cert.type]} • {cert.year}
        {cert.duration && ` • ${cert.duration}`}
      </span>

      {/* Title */}
      <h3
        className="text-lg font-bold tracking-tight mb-2 group-hover:text-[var(--accent-primary)] transition-colors duration-500"
        style={{ color: 'var(--foreground)' }}
      >
        {cert.title}
      </h3>

      {/* Institution */}
      <p className="text-sm font-medium mb-3" style={{ color: 'var(--foreground-muted)' }}>
        {cert.institution}
      </p>

      {/* Description preview */}
      <p className="text-sm line-clamp-2 leading-relaxed mb-4" style={{ color: 'var(--foreground-muted)' }}>
        {cert.description}
      </p>

      {/* Highlights */}
      {cert.highlights && cert.highlights.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {cert.highlights.slice(0, 2).map((h) => (
            <span
              key={h}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                border: '1px solid var(--card-border)',
                color: 'var(--accent-primary)',
              }}
            >
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Hover border glow — smooth */}
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

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  // Show only academic + top certifications on home (max 4)
  const displayCerts = certificates.slice(0, 4);

  return (
    <section id="educacao" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span
              className="text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
              style={{ color: 'var(--accent-primary)' }}
            >
              Formação
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ color: 'var(--foreground)' }}
            >
              Educação & Certificados
            </h2>
          </div>
          <Link
            href="/educacao"
            className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors duration-300"
            style={{ color: 'var(--accent-primary)' }}
            aria-label="Ver formação completa"
          >
            Ver detalhes
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayCerts.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={i}
              onClick={() => setSelectedCert(cert)}
            />
          ))}
        </div>

        {/* Mobile link */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/educacao"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: 'var(--accent-primary)' }}
          >
            Ver formação completa
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal — Smooth */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
            style={{ background: 'rgba(5, 7, 10, 0.85)', backdropFilter: 'blur(20px)' }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-8 sm:p-12"
              style={{
                background: 'var(--card-bg)',
                backdropFilter: 'blur(var(--glass-blur))',
                border: '1px solid var(--card-border)',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-300 hover:bg-white/10"
                style={{ color: 'var(--foreground-muted)' }}
                aria-label="Fechar modal"
              >
                <X size={20} />
              </button>

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
                style={{ background: 'var(--accent-primary)', color: 'var(--background-secondary)' }}
              >
                {typeIcons[selectedCert.type]}
              </div>

              {/* Type */}
              <span
                className="text-xs uppercase tracking-[0.2em] font-medium mb-4 block"
                style={{ color: 'var(--accent-primary)' }}
              >
                {typeLabels[selectedCert.type]} • {selectedCert.year}
                {selectedCert.duration && ` • ${selectedCert.duration}`}
              </span>

              {/* Title */}
              <h3
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
                style={{ color: 'var(--foreground)' }}
              >
                {selectedCert.title}
              </h3>

              {/* Institution */}
              <p className="text-lg font-medium mb-6" style={{ color: 'var(--accent-primary)' }}>
                {selectedCert.institution}
              </p>

              {/* Description */}
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--foreground-muted)' }}>
                {selectedCert.description}
              </p>

              {/* Modules preview */}
              {selectedCert.modules && selectedCert.modules.length > 0 && (
                <div className="mb-8">
                  <h4
                    className="text-sm uppercase tracking-[0.15em] font-medium mb-3"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    Módulos
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.modules.slice(0, 6).map((m) => (
                      <span
                        key={m}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: 'var(--background)',
                          border: '1px solid var(--card-border)',
                          color: 'var(--foreground-muted)',
                        }}
                      >
                        {m}
                      </span>
                    ))}
                    {selectedCert.modules.length > 6 && (
                      <span
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          color: 'var(--accent-primary)',
                          border: '1px solid var(--card-border)',
                        }}
                      >
                        +{selectedCert.modules.length - 6} mais
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {selectedCert.pdfUrl && (
                  <a
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: 'var(--accent-primary)',
                      color: 'var(--background-secondary)',
                    }}
                  >
                    <Download size={14} />
                    Baixar Certificado
                  </a>
                )}
                <Link
                  href="/educacao"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    border: '1px solid var(--card-border)',
                    color: 'var(--foreground)',
                  }}
                  onClick={() => setSelectedCert(null)}
                >
                  <ExternalLink size={14} />
                  Ver Detalhes Completos
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
