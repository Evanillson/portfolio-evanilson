'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { experiences } from '@/lib/data';
import { Briefcase, ChevronRight } from 'lucide-react';
import { TechIcon } from '@/components/ui/TechIcons';

const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

const techIconMap: Record<string, string> = {
  'Power BI': 'powerbi',
  'DAX': 'dax',
  'SQL Server': 'sqlserver',
  'Python': 'python',
  'Pandas': 'pandas',
  'Databricks': 'databricks',
  'Excel': 'excel',
  'SQL': 'sqlserver',
  'Power Query': 'powerquery',
  'SharePoint': 'powerquery',
  'Spark': 'spark',
};

export default function Experience() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section id="experiencia" className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <span
            className="text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
            style={{ color: 'var(--accent-primary)' }}
          >
            Trajetória
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: 'var(--foreground)' }}
          >
            Experiência Profissional
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-px"
            style={{ background: 'var(--divider)' }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience: exp,
  index,
}: {
  experience: typeof experiences[0];
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
      className="relative pl-16 sm:pl-20"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-4 sm:left-6 w-4 h-4 rounded-full border-2 z-10"
        style={{
          borderColor: exp.current ? 'var(--accent-primary)' : 'var(--card-border)',
          background: exp.current ? 'var(--accent-primary)' : 'var(--background)',
          boxShadow: exp.current ? '0 0 12px rgba(0, 240, 255, 0.4)' : 'none',
        }}
      >
        {exp.current && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: 'var(--accent-primary)', opacity: 0.3 }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="group rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-lg"
        style={{
          background: 'var(--card-bg)',
          backdropFilter: 'blur(var(--glass-blur))',
          border: `1px solid ${exp.current ? 'var(--card-border-hover)' : 'var(--card-border)'}`,
        }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            {exp.current && (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold mb-2"
                style={{
                  background: 'var(--accent-primary)',
                  color: 'var(--background-secondary)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Atual
              </span>
            )}
            <h3
              className="text-lg sm:text-xl font-bold tracking-tight mb-1"
              style={{ color: 'var(--foreground)' }}
            >
              {exp.role}
            </h3>
            <p className="text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>
              {exp.company}
            </p>
          </div>
          <span
            className="text-xs font-mono tracking-wider shrink-0"
            style={{ color: 'var(--foreground-muted)' }}
          >
            {exp.period}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: 'var(--foreground-muted)' }}
        >
          {exp.description}
        </p>

        {/* Achievements */}
        <div className="space-y-2 mb-5">
          {exp.achievements.map((achievement, i) => (
            <div key={i} className="flex items-start gap-2">
              <ChevronRight
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color: 'var(--accent-primary)' }}
              />
              <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                {achievement}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full transition-all duration-300"
              style={{
                border: '1px solid var(--card-border)',
                color: 'var(--accent-primary)',
              }}
            >
              <span className="w-3.5 h-3.5 flex items-center justify-center" style={{ color: 'var(--accent-primary)' }}>
                <TechIcon name={techIconMap[tech] || 'powerbi'} size={12} />
              </span>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
