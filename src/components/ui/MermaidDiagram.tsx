'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, useInView } from 'framer-motion';

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
  className?: string;
}

export default function MermaidDiagram({ chart, caption, className = '' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const { theme } = useTheme();
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState(false);
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    if (!isInView || !chart) return;

    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'light' ? 'default' : 'dark',
          themeVariables:
            theme === 'light'
              ? {
                  primaryColor: '#E8F0FE',
                  primaryTextColor: '#121212',
                  primaryBorderColor: '#0056D2',
                  lineColor: '#0056D2',
                  secondaryColor: '#F0F4F8',
                  tertiaryColor: '#FFFFFF',
                  fontSize: '14px',
                }
              : {
                  primaryColor: '#0E1A2E',
                  primaryTextColor: '#EDEDED',
                  primaryBorderColor: '#00F0FF',
                  lineColor: '#00F0FF',
                  secondaryColor: '#0E131F',
                  tertiaryColor: '#05070A',
                  fontSize: '14px',
                },
          securityLevel: 'loose',
          fontFamily: 'var(--font-sans), system-ui, sans-serif',
        });

        const { svg: renderedSvg } = await mermaid.render(idRef.current, chart);
        if (!cancelled) {
          setSvg(renderedSvg);
          setError(false);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        if (!cancelled) setError(true);
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart, theme, isInView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
      }}
    >
      {/* Diagram */}
      <div className="p-6 sm:p-8 overflow-x-auto">
        {error ? (
          <div
            className="flex items-center justify-center py-12 text-sm"
            style={{ color: 'var(--foreground-muted)' }}
          >
            Erro ao renderizar diagrama
          </div>
        ) : svg ? (
          <div
            className="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="flex items-center justify-center py-12">
            <div
              className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }}
            />
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <div
          className="px-6 py-3 text-xs font-medium text-center"
          style={{
            borderTop: '1px solid var(--divider)',
            color: 'var(--foreground-muted)',
          }}
        >
          {caption}
        </div>
      )}
    </motion.div>
  );
}
