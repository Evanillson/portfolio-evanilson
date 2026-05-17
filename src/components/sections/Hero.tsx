'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import { userData } from '@/lib/data';
import { ArrowRight, Download } from 'lucide-react';

const ParticleField = dynamic(
  () => import('@/components/three/ParticleField'),
  { ssr: false }
);

const titleWords = 'Transformando Dados em Estratégia e Performance.'.split(' ');

const EASE_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

const wordVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
      delay: 0.8 + i * 0.1,
    },
  }),
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT, delay },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <ParticleField />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 0%, var(--background) 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Role badge */}
        <motion.div
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-medium tracking-wider uppercase"
          style={{
            border: '1px solid var(--card-border)',
            color: 'var(--accent-primary)',
            background: 'var(--card-bg)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: 'var(--accent-primary)' }}
          />
          {userData.role.split(' | ')[0]}
        </motion.div>

        {/* Title with word-by-word reveal */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
          style={{ color: 'var(--foreground)' }}
        >
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <motion.span
                className="inline-block"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                style={
                  word === 'Estratégia' || word === 'Performance.'
                    ? { color: 'var(--accent-primary)' }
                    : {}
                }
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          custom={2.0}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--foreground-muted)' }}
        >
          Olá, sou <strong style={{ color: 'var(--foreground)' }}>Evanilson Freitas</strong>.
          Especialista em Power BI, Engenharia de Dados e Análise Estratégica.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={2.4}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton as="div" strength={0.3}>
            <Link
              href="/projetos"
              scroll
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold overflow-hidden transition-all duration-300"
              style={{
                background: 'var(--accent-primary)',
                color: 'var(--background-secondary)',
              }}
              aria-label="Explorar projetos"
            >
              <span className="relative z-10">Explorar Projetos</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
              {/* Glow effect */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'var(--accent-primary)',
                  filter: 'blur(20px)',
                }}
              />
            </Link>
          </MagneticButton>

          <MagneticButton as="div" strength={0.3}>
            <a
              href="/curriculo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                border: '1px solid var(--card-border)',
                color: 'var(--foreground)',
                background: 'transparent',
              }}
              aria-label="Baixar currículo em PDF"
            >
              <Download size={16} />
              Baixar Currículo
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: '1.5px solid var(--card-border)' }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: 'var(--accent-primary)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
