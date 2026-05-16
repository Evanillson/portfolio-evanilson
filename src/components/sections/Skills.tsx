'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '@/lib/data';
import { TechIcon } from '@/components/ui/TechIcons';

function SkillItem({ skill }: { skill: typeof skills[0] }) {
  return (
    <div
      className="flex items-center gap-4 px-8 py-4 rounded-2xl shrink-0 transition-all duration-300 hover:scale-105"
      style={{
        background: 'var(--card-bg)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--card-border)',
        color: 'var(--foreground)',
      }}
    >
      <span
        className="flex items-center justify-center w-8 h-8"
        style={{ color: 'var(--accent-primary)' }}
      >
        <TechIcon name={skill.icon} size={28} />
      </span>
      <span className="text-sm font-semibold whitespace-nowrap">{skill.name}</span>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Duplicate for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden" ref={ref}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-6 mb-16"
      >
        <span
          className="text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
          style={{ color: 'var(--accent-primary)' }}
        >
          Tecnologias
        </span>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          style={{ color: 'var(--foreground)' }}
        >
          Stack & Skills
        </h2>
      </motion.div>

      {/* Marquee Row 1 — Left to Right */}
      <div className="marquee-container mb-6 relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, var(--background), transparent)`,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to left, var(--background), transparent)`,
          }}
        />

        <div className="marquee-track flex gap-4 animate-marquee">
          {duplicatedSkills.map((skill, i) => (
            <SkillItem key={`row1-${i}`} skill={skill} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — Right to Left */}
      <div className="marquee-container relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, var(--background), transparent)`,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to left, var(--background), transparent)`,
          }}
        />

        <div className="marquee-track flex gap-4 animate-marquee-reverse">
          {[...duplicatedSkills].reverse().map((skill, i) => (
            <SkillItem key={`row2-${i}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
