'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X, Download, ExternalLink, FileX2, Loader2 } from 'lucide-react';

interface CertificateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  institution?: string;
}

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/portfolio-evanilson' : '';

type ViewerStatus = 'loading' | 'ok' | 'missing';

export default function CertificateViewerModal({
  isOpen,
  onClose,
  pdfUrl,
  title,
  institution,
}: CertificateViewerModalProps) {
  // Resolve absolute URL respecting basePath for GH Pages
  const resolvedUrl = pdfUrl.startsWith('http') ? pdfUrl : `${basePath}${pdfUrl}`;
  const [status, setStatus] = useState<ViewerStatus>('loading');

  // Verify the PDF actually exists before rendering the iframe — avoids
  // showing the site's own 404 page (which renders the full layout) inside the frame.
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setStatus('loading');

    (async () => {
      try {
        const res = await fetch(resolvedUrl, { method: 'GET', cache: 'no-store' });
        const contentType = res.headers.get('content-type') ?? '';
        const isPdf = contentType.toLowerCase().includes('pdf');
        if (cancelled) return;
        if (res.ok && isPdf) {
          setStatus('ok');
        } else {
          setStatus('missing');
        }
      } catch {
        if (!cancelled) setStatus('missing');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, resolvedUrl]);

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

  const hasPdf = status === 'ok';

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
                {hasPdf && (
                  <>
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
                  </>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg transition-all duration-300 hover:scale-[1.05] cursor-pointer"
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

            {/* Body */}
            <div
              className="flex-1 overflow-hidden"
              style={{ background: 'var(--background-secondary)' }}
            >
              {status === 'loading' && (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <Loader2
                    size={28}
                    className="animate-spin"
                    style={{ color: 'var(--accent-primary)' }}
                  />
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    Carregando certificado…
                  </p>
                </div>
              )}

              {status === 'ok' && (
                <iframe
                  src={resolvedUrl}
                  title={title}
                  className="w-full h-full"
                  style={{ border: 'none' }}
                />
              )}

              {status === 'missing' && (
                <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
                  <div
                    className="max-w-md w-full text-center rounded-2xl p-8 sm:p-10"
                    style={{
                      background: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      backdropFilter: 'blur(var(--glass-blur))',
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                      style={{
                        background: 'rgba(245, 158, 11, 0.12)',
                        border: '1px solid rgba(245, 158, 11, 0.35)',
                        color: '#F59E0B',
                      }}
                    >
                      <FileX2 size={28} />
                    </div>
                    <h4
                      className="text-lg sm:text-xl font-bold tracking-tight mb-2"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Documento não encontrado
                    </h4>
                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{ color: 'var(--foreground-muted)' }}
                    >
                      O certificado deste curso ainda não está vinculado ao portfólio.
                      Em caso de necessidade, posso enviá-lo diretamente sob solicitação.
                    </p>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                      style={{
                        background: 'var(--accent-primary)',
                        color: 'var(--background-secondary)',
                      }}
                      aria-label="Fechar"
                      autoFocus
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
