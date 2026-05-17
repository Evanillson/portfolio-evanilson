'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

interface CertificateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  institution?: string;
}

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/portfolio-evanilson' : '';

export default function CertificateViewerModal({
  isOpen,
  onClose,
  pdfUrl,
  title,
  institution,
}: CertificateViewerModalProps) {
  // Resolve absolute URL respecting basePath for GH Pages
  const resolvedUrl = pdfUrl.startsWith('http') ? pdfUrl : `${basePath}${pdfUrl}`;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Visualizar certificado: ${title}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="relative w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--card-border)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 shrink-0"
              style={{ borderBottom: '1px solid var(--divider)' }}
            >
              <div className="min-w-0 flex-1">
                <h3
                  className="text-sm sm:text-base font-bold tracking-tight truncate"
                  style={{ color: 'var(--foreground)' }}
                >
                  {title}
                </h3>
                {institution && (
                  <p
                    className="text-xs truncate"
                    style={{ color: 'var(--foreground-muted)' }}
                  >
                    {institution}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={resolvedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    border: '1px solid var(--card-border)',
                    color: 'var(--foreground)',
                  }}
                  aria-label="Abrir em nova aba"
                >
                  <ExternalLink size={12} />
                  <span className="hidden sm:inline">Nova aba</span>
                </a>
                <a
                  href={resolvedUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'var(--accent-primary)',
                    color: 'var(--background-secondary)',
                  }}
                  aria-label="Baixar PDF"
                >
                  <Download size={12} />
                  <span className="hidden sm:inline">Baixar</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg transition-all duration-300 hover:scale-[1.05]"
                  style={{
                    border: '1px solid var(--card-border)',
                    color: 'var(--foreground)',
                  }}
                  aria-label="Fechar visualizador"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* PDF viewer */}
            <div className="flex-1 overflow-hidden" style={{ background: 'var(--background-secondary)' }}>
              <iframe
                src={resolvedUrl}
                title={title}
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
