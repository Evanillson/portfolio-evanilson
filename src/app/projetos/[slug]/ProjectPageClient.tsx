'use client';

import { notFound } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { projects, type Project, type ProjectStatus } from '@/lib/data';
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
  ExternalLink,
  Code2,
  FileText,
  LayoutDashboard,
  Target,
  Lightbulb,
  Users,
  Building2,
  Sparkles,
  Compass,
  Server,
  Network,
  Shield,
  Cloud,
  GitBranch,
  Gauge,
  Zap,
  ArrowUpRight,
  Boxes,
  TrendingUp,
  Wrench,
  Rocket,
  ArrowLeft,
} from 'lucide-react';

const MermaidDiagram = dynamic(() => import('@/components/ui/MermaidDiagram'), {
  ssr: false,
  loading: () => (
    <div
      className="h-64 rounded-2xl flex items-center justify-center"
      style={{ background: 'var(--card-bg)' }}
    >
      <div
        className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }}
      />
    </div>
  ),
});

const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

/* ============================================================
   STATUS BADGE
   ============================================================ */
const STATUS_META: Record<ProjectStatus, { label: string; dot: string; ring: string }> = {
  production: { label: 'Em produção', dot: '#22C55E', ring: 'rgba(34, 197, 94, 0.35)' },
  beta: { label: 'Beta', dot: '#F59E0B', ring: 'rgba(245, 158, 11, 0.35)' },
  mvp: { label: 'MVP', dot: '#8B5CF6', ring: 'rgba(139, 92, 246, 0.35)' },
  concept: { label: 'Conceito', dot: '#0EA5E9', ring: 'rgba(14, 165, 233, 0.35)' },
  archived: { label: 'Arquivado', dot: '#64748B', ring: 'rgba(100, 116, 139, 0.35)' },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        border: `1px solid ${meta.ring}`,
        background: `${meta.dot}12`,
        color: meta.dot,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: meta.dot,
          boxShadow: status === 'production' ? `0 0 0 4px ${meta.dot}22` : undefined,
        }}
      />
      {meta.label}
    </span>
  );
}

/* ============================================================
   REUSABLE SECTION HEADER
   ============================================================ */
function SectionHeader({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold mb-3"
        style={{ color: 'var(--accent-primary)' }}
      >
        <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
          {icon}
        </span>
        {eyebrow}
      </div>
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
        style={{ color: 'var(--foreground)' }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-base max-w-3xl leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
          {description}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   FADE-IN WRAPPER
   ============================================================ */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   OVERVIEW CARD
   ============================================================ */
function OverviewCard({
  icon,
  label,
  content,
}: {
  icon: React.ReactNode;
  label: string;
  content: string;
}) {
  return (
    <div
      className="group p-5 rounded-2xl transition-all duration-500 hover:-translate-y-1"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        backdropFilter: 'blur(var(--glass-blur))',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-500"
          style={{
            background: 'var(--background)',
            border: '1px solid var(--card-border)',
            color: 'var(--accent-primary)',
          }}
        >
          {icon}
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.25em] font-semibold"
          style={{ color: 'var(--foreground-muted)' }}
        >
          {label}
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
        {content}
      </p>
    </div>
  );
}

/* ============================================================
   ARCHITECTURE PILLAR
   ============================================================ */
function PillarCard({
  icon,
  label,
  text,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
}) {
  return (
    <div
      className="p-5 rounded-2xl h-full"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
        style={{
          background: 'var(--accent-primary)',
          color: 'var(--background-secondary)',
        }}
      >
        {icon}
      </div>
      <h4
        className="text-sm font-bold tracking-tight mb-1.5"
        style={{ color: 'var(--foreground)' }}
      >
        {label}
      </h4>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
        {text}
      </p>
    </div>
  );
}

/* ============================================================
   STACK GROUP
   ============================================================ */
function StackGroup({
  label,
  items,
}: {
  label: string;
  items?: string[];
}) {
  if (!items || items.length === 0) return null;
  return (
    <div
      className="p-5 rounded-2xl"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
      }}
    >
      <div
        className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-3"
        style={{ color: 'var(--accent-primary)' }}
      >
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs font-medium px-2.5 py-1 rounded-md"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--card-border)',
              color: 'var(--foreground)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   CHALLENGE CARD
   ============================================================ */
function ChallengeCard({
  index,
  title,
  problem,
  decision,
  outcome,
}: {
  index: number;
  title: string;
  problem: string;
  decision: string;
  outcome: string;
}) {
  return (
    <div
      className="p-6 rounded-2xl flex flex-col gap-4 h-full"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: 'var(--accent-primary)',
            color: 'var(--background-secondary)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <h4 className="text-base font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
          {title}
        </h4>
      </div>
      <div className="grid gap-3">
        <ChallengeRow label="Problema" content={problem} accent="#F59E0B" />
        <ChallengeRow label="Decisão" content={decision} accent="var(--accent-primary)" />
        <ChallengeRow label="Resultado" content={outcome} accent="#22C55E" />
      </div>
    </div>
  );
}

function ChallengeRow({
  label,
  content,
  accent,
}: {
  label: string;
  content: string;
  accent: string;
}) {
  return (
    <div className="flex gap-3">
      <span
        className="text-[10px] uppercase tracking-[0.2em] font-semibold shrink-0 w-20 pt-0.5"
        style={{ color: accent }}
      >
        {label}
      </span>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
        {content}
      </p>
    </div>
  );
}

/* ============================================================
   LINK ICON RESOLVER
   ============================================================ */
function LinkIcon({ kind }: { kind: string }) {
  const size = 14;
  switch (kind) {
    case 'github':
      return <Code2 size={size} />;
    case 'docs':
      return <FileText size={size} />;
    case 'dashboard':
      return <LayoutDashboard size={size} />;
    case 'case-study':
      return <FileText size={size} />;
    default:
      return <ExternalLink size={size} />;
  }
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function ProjectPageClient({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  if (!project) {
    notFound();
  }

  const p: Project = project;
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

  return (
    <div className="pt-24 pb-20">
      {/* Soft top glow */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[520px] -z-10 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 0%, color-mix(in srgb, var(--accent-primary) 18%, transparent), transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm mb-8"
          aria-label="Breadcrumb"
          style={{ color: 'var(--foreground-muted)' }}
        >
          <Link href="/" className="hover:text-[var(--accent-primary)] transition-colors duration-300">
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
          <span style={{ color: 'var(--accent-primary)' }}>{p.title}</span>
        </motion.nav>

        {/* ============== HERO ============== */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {p.category && (
              <span
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold px-3 py-1 rounded-full"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--accent-primary)',
                }}
              >
                <Sparkles size={11} />
                {p.category}
              </span>
            )}
            {p.status && <StatusBadge status={p.status} />}
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5"
            style={{ color: 'var(--foreground)' }}
          >
            {p.title}
          </h1>

          <p
            className="text-lg sm:text-xl max-w-3xl leading-relaxed mb-6"
            style={{ color: 'var(--foreground-muted)' }}
          >
            {p.executiveSummary ?? p.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {p.tags.map((tag) => (
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
          </div>

          {/* CTAs */}
          {p.links && p.links.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {p.links.map((link, i) => {
                const isPrimary = i === 0;
                const isExternal = link.href.startsWith('http');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
                    style={
                      isPrimary
                        ? {
                            background: 'var(--accent-primary)',
                            color: 'var(--background-secondary)',
                          }
                        : {
                            background: 'transparent',
                            border: '1px solid var(--card-border)',
                            color: 'var(--foreground)',
                          }
                    }
                  >
                    <LinkIcon kind={link.kind} />
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                );
              })}
            </div>
          )}
        </motion.header>

        {/* ============== METRICS STRIP ============== */}
        {p.metrics && p.metrics.length > 0 && (
          <Reveal>
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden mb-14"
              style={{
                background: 'var(--card-border)',
                border: '1px solid var(--card-border)',
              }}
            >
              {p.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-5 sm:p-6 flex flex-col gap-1"
                  style={{ background: 'var(--background)' }}
                >
                  <span
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {m.label}
                  </span>
                  {m.hint && (
                    <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {m.hint}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ============== DASHBOARD / PREVIEW ============== */}
        <Reveal>
          <div
            ref={iframeContainerRef}
            className="relative rounded-2xl overflow-hidden mb-20"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
            }}
          >
            <button
              onClick={handleFullscreen}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg transition-all duration-300 cursor-pointer"
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

            <div className="aspect-video relative">
              {p.embedUrl ? (
                <>
                  {!iframeLoaded && <SkeletonLoader className="absolute inset-0" />}
                  <iframe
                    src={p.embedUrl}
                    className="w-full h-full"
                    onLoad={() => setIframeLoaded(true)}
                    allowFullScreen
                    title={`Dashboard: ${p.title}`}
                    style={{ opacity: iframeLoaded ? 1 : 0 }}
                  />
                </>
              ) : (
                <div className="w-full h-full relative">
                  <Image
                    src="/dashboard_placeholder.png"
                    alt={`Preview do dashboard: ${p.title}`}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.7) 100%)',
                    }}
                  />
                  <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-white drop-shadow">
                      <AlertTriangle size={14} style={{ color: 'var(--accent-primary)' }} />
                      Preview interativo em breve — versão estática para demonstração.
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="flex sm:hidden items-center gap-2 px-4 py-3 text-xs"
              style={{ borderTop: '1px solid var(--divider)', color: 'var(--foreground-muted)' }}
            >
              <Smartphone size={14} />
              Para melhor visualização, rotacione o dispositivo para paisagem.
            </div>
          </div>
        </Reveal>

        {/* ============== 2. VISÃO GERAL ============== */}
        {p.overview && (
          <section className="mb-24">
            <Reveal>
              <SectionHeader
                eyebrow="Visão Geral"
                title="O contexto por trás da solução"
                description="O problema, o público, o contexto de negócio e a estratégia adotada para resolver a dor de forma duradoura."
                icon={<Compass size={14} />}
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Reveal delay={0.05}>
                <OverviewCard
                  icon={<Target size={14} />}
                  label="Objetivo"
                  content={p.overview.objective}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <OverviewCard
                  icon={<AlertTriangle size={14} />}
                  label="Problema"
                  content={p.overview.problem}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <OverviewCard
                  icon={<Users size={14} />}
                  label="Público-alvo"
                  content={p.overview.audience}
                />
              </Reveal>
              <Reveal delay={0.2}>
                <OverviewCard
                  icon={<Building2 size={14} />}
                  label="Contexto de Negócio"
                  content={p.overview.businessContext}
                />
              </Reveal>
              <Reveal delay={0.25}>
                <OverviewCard
                  icon={<Lightbulb size={14} />}
                  label="Estratégia"
                  content={p.overview.strategy}
                />
              </Reveal>
              <Reveal delay={0.3}>
                <div
                  className="p-5 rounded-2xl h-full"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border-hover)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'var(--accent-primary)',
                        color: 'var(--background-secondary)',
                      }}
                    >
                      <Sparkles size={14} />
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-[0.25em] font-semibold"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      Diferenciais
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {p.overview.differentials.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-sm leading-relaxed"
                        style={{ color: 'var(--foreground)' }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ background: 'var(--accent-primary)' }}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ============== 3. ARQUITETURA ============== */}
        {p.architecture && (
          <section className="mb-24">
            <Reveal>
              <SectionHeader
                eyebrow="Arquitetura da Solução"
                title="Como as camadas conversam"
                description="Da camada de apresentação à infraestrutura, cada decisão arquitetural foi feita pensando em governança, observabilidade e escala horizontal."
                icon={<Layers size={14} />}
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mb-8">
                <MermaidDiagram
                  chart={p.mermaidDiagrams.architecture}
                  caption="Diagrama de Arquitetura — fluxo entre camadas"
                />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Reveal delay={0.05}>
                <PillarCard icon={<Layers size={16} />} label="Frontend" text={p.architecture.frontend} />
              </Reveal>
              <Reveal delay={0.1}>
                <PillarCard icon={<Server size={16} />} label="Backend" text={p.architecture.backend} />
              </Reveal>
              <Reveal delay={0.15}>
                <PillarCard icon={<Network size={16} />} label="APIs" text={p.architecture.apis} />
              </Reveal>
              <Reveal delay={0.2}>
                <PillarCard icon={<Database size={16} />} label="Banco de Dados" text={p.architecture.database} />
              </Reveal>
              <Reveal delay={0.25}>
                <PillarCard icon={<Workflow size={16} />} label="Fluxo da Aplicação" text={p.architecture.flow} />
              </Reveal>
              <Reveal delay={0.3}>
                <PillarCard icon={<Shield size={16} />} label="Autenticação" text={p.architecture.auth} />
              </Reveal>
              <Reveal delay={0.35}>
                <PillarCard icon={<Cloud size={16} />} label="Hospedagem" text={p.architecture.hosting} />
              </Reveal>
              <Reveal delay={0.4}>
                <PillarCard icon={<GitBranch size={16} />} label="Infraestrutura" text={p.architecture.infra} />
              </Reveal>
              <Reveal delay={0.45}>
                <PillarCard icon={<Gauge size={16} />} label="Escalabilidade" text={p.architecture.scalability} />
              </Reveal>
            </div>

            {p.architecture.integrations.length > 0 && (
              <Reveal delay={0.5}>
                <div
                  className="p-5 rounded-2xl"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-3"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    Integrações
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.architecture.integrations.map((it) => (
                      <span
                        key={it}
                        className="text-xs font-medium px-3 py-1.5 rounded-md"
                        style={{
                          background: 'var(--background)',
                          border: '1px solid var(--card-border)',
                          color: 'var(--foreground)',
                        }}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </section>
        )}

        {/* ============== 4. ENGENHARIA DE DADOS ============== */}
        {p.dataEngineering && (
          <section className="mb-24">
            <Reveal>
              <SectionHeader
                eyebrow="Engenharia de Dados"
                title="Pipeline de ponta a ponta"
                description="Ingestão, transformação, qualidade e consumo — cada etapa documentada com decisões de design e estratégias de performance."
                icon={<Cpu size={14} />}
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mb-8">
                <MermaidDiagram
                  chart={p.mermaidDiagrams.flowchart}
                  caption="Fluxograma — pipeline diário ponta a ponta"
                />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Reveal delay={0.05}>
                <PillarCard icon={<Zap size={16} />} label="Ingestão" text={p.dataEngineering.ingestion} />
              </Reveal>
              <Reveal delay={0.1}>
                <PillarCard
                  icon={<Wrench size={16} />}
                  label="Transformações"
                  text={p.dataEngineering.transformations}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <PillarCard
                  icon={<Workflow size={16} />}
                  label="Processamento"
                  text={p.dataEngineering.processing}
                />
              </Reveal>
              <Reveal delay={0.2}>
                <PillarCard
                  icon={<Network size={16} />}
                  label="Consumo"
                  text={p.dataEngineering.consumption}
                />
              </Reveal>
              <Reveal delay={0.25}>
                <PillarCard icon={<Database size={16} />} label="Schema" text={p.dataEngineering.schema} />
              </Reveal>
              <Reveal delay={0.3}>
                <PillarCard icon={<Gauge size={16} />} label="Performance" text={p.dataEngineering.performance} />
              </Reveal>
            </div>

            <Reveal delay={0.35}>
              <div className="mb-6">
                <MermaidDiagram
                  chart={p.mermaidDiagrams.erDiagram}
                  caption="Modelo dimensional — Star Schema"
                />
              </div>
            </Reveal>

            {p.dataEngineering.strategies.length > 0 && (
              <Reveal delay={0.4}>
                <div
                  className="p-5 rounded-2xl"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-3"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    Estratégias aplicadas
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {p.dataEngineering.strategies.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: 'var(--foreground)' }}
                      >
                        <TrendingUp
                          size={14}
                          className="mt-0.5 shrink-0"
                          style={{ color: 'var(--accent-primary)' }}
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {/* Fallback to legacy sections if no detailed engineering */}
            {!p.dataEngineering && (
              <Reveal delay={0.05}>
                <p className="text-base leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                  {p.sections.etl}
                </p>
              </Reveal>
            )}
          </section>
        )}

        {/* ============== 5. STACK TECNOLÓGICA ============== */}
        {p.stack && (
          <section className="mb-24">
            <Reveal>
              <SectionHeader
                eyebrow="Stack Tecnológica"
                title="Ferramentas que sustentam a operação"
                description="Tecnologias selecionadas por maturidade, comunidade e fit com o ciclo de vida do dado."
                icon={<Boxes size={14} />}
              />
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Reveal delay={0.05}>
                <StackGroup label="Frontend" items={p.stack.frontend} />
              </Reveal>
              <Reveal delay={0.1}>
                <StackGroup label="Backend" items={p.stack.backend} />
              </Reveal>
              <Reveal delay={0.15}>
                <StackGroup label="Banco de Dados" items={p.stack.database} />
              </Reveal>
              <Reveal delay={0.2}>
                <StackGroup label="Infraestrutura" items={p.stack.infrastructure} />
              </Reveal>
              <Reveal delay={0.25}>
                <StackGroup label="Bibliotecas" items={p.stack.libraries} />
              </Reveal>
              <Reveal delay={0.3}>
                <StackGroup label="Ferramentas" items={p.stack.tools} />
              </Reveal>
              <Reveal delay={0.35}>
                <StackGroup label="Analytics" items={p.stack.analytics} />
              </Reveal>
              <Reveal delay={0.4}>
                <StackGroup label="Deploy" items={p.stack.deploy} />
              </Reveal>
            </div>
          </section>
        )}

        {/* ============== 6. GALERIA / MOCKUPS ============== */}
        {p.gallery && p.gallery.length > 0 && (
          <section className="mb-24">
            <Reveal>
              <SectionHeader
                eyebrow="Galeria"
                title="Previews da experiência"
                description="Capturas das principais telas e fluxos visuais do produto."
                icon={<LayoutDashboard size={14} />}
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {p.gallery.map((g, i) => (
                <Reveal key={`${g.src}-${i}`} delay={0.05 + i * 0.05}>
                  <figure
                    className="group rounded-2xl overflow-hidden h-full"
                    style={{
                      background: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                    }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={g.src}
                        alt={g.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <figcaption
                      className="px-4 py-3 text-xs"
                      style={{
                        color: 'var(--foreground-muted)',
                        borderTop: '1px solid var(--divider)',
                      }}
                    >
                      {g.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ============== 7. DESAFIOS TÉCNICOS ============== */}
        {p.challenges && p.challenges.length > 0 && (
          <section className="mb-24">
            <Reveal>
              <SectionHeader
                eyebrow="Desafios Técnicos"
                title="Decisões que moldaram a solução"
                description="Cada desafio gerou uma decisão arquitetural intencional — registramos problema, decisão e resultado para garantir rastreabilidade."
                icon={<AlertTriangle size={14} />}
              />
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {p.challenges.map((c, i) => (
                <Reveal key={c.title} delay={0.05 + i * 0.08}>
                  <ChallengeCard index={i} {...c} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ============== ROADMAP FUTURO ============== */}
        {p.futureRoadmap && p.futureRoadmap.length > 0 && (
          <section className="mb-24">
            <Reveal>
              <SectionHeader
                eyebrow="Roadmap"
                title="Próximos passos"
                description="Evoluções planejadas para os próximos ciclos do produto."
                icon={<Rocket size={14} />}
              />
            </Reveal>

            <Reveal delay={0.05}>
              <div
                className="rounded-2xl p-6 sm:p-8"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                }}
              >
                <ol className="space-y-3">
                  {p.futureRoadmap.map((r, i) => (
                    <li key={r} className="flex items-start gap-3">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{
                          background: 'var(--background)',
                          border: '1px solid var(--card-border)',
                          color: 'var(--accent-primary)',
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                        {r}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </section>
        )}

        {/* ============== FALLBACK — projetos sem case-study completo ============== */}
        {!p.overview && !p.architecture && !p.dataEngineering && (
          <section className="mb-24">
            <Reveal>
              <SectionHeader
                eyebrow="Visão Técnica"
                title="Resumo da solução"
                description={p.description}
                icon={<FileText size={14} />}
              />
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Reveal delay={0.05}>
                <PillarCard icon={<Layers size={16} />} label="Arquitetura" text={p.sections.architecture} />
              </Reveal>
              <Reveal delay={0.1}>
                <PillarCard icon={<Cpu size={16} />} label="ETL" text={p.sections.etl} />
              </Reveal>
              <Reveal delay={0.15}>
                <PillarCard icon={<Database size={16} />} label="Modelagem" text={p.sections.modeling} />
              </Reveal>
              <Reveal delay={0.2}>
                <PillarCard icon={<Workflow size={16} />} label="Fluxo" text={p.sections.flowchart} />
              </Reveal>
            </div>
            <Reveal delay={0.25}>
              <div className="mt-8 grid gap-6">
                <MermaidDiagram
                  chart={p.mermaidDiagrams.architecture}
                  caption="Diagrama de Arquitetura"
                />
                <MermaidDiagram chart={p.mermaidDiagrams.flowchart} caption="Fluxograma" />
                <MermaidDiagram chart={p.mermaidDiagrams.erDiagram} caption="Modelo dimensional" />
              </div>
            </Reveal>
          </section>
        )}

        {/* ============== FOOTER NAV ============== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--divider)' }}
        >
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300"
            style={{ color: 'var(--accent-primary)' }}
            aria-label="Voltar para todos os projetos"
          >
            <ArrowLeft size={14} />
            Todos os projetos
          </Link>

          <Link
            href="/#contato"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'var(--accent-primary)',
              color: 'var(--background-secondary)',
            }}
          >
            Conversar sobre este projeto
            <ArrowUpRight size={12} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
