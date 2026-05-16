'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { userData } from '@/lib/data';
import MagneticButton from '@/components/ui/MagneticButton';
import { Send, Mail, Phone, ArrowUpRight } from 'lucide-react';

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TypingLink({
  href,
  label,
  displayText,
  icon,
}: {
  href: string;
  label: string;
  displayText: string;
  icon?: React.ReactNode;
}) {
  return (
    <MagneticButton as="div" strength={0.2}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 py-3 transition-colors duration-300"
        style={{ color: 'var(--foreground-muted)' }}
        aria-label={label}
      >
        <span className="text-sm font-medium flex items-center gap-2 group-hover:text-[var(--accent-primary)] transition-colors duration-300">
          {icon}
          <span>{displayText}</span>
        </span>
        <ArrowUpRight
          size={14}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: 'var(--accent-primary)' }}
        />
      </a>
    </MagneticButton>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <section id="contato" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Giant title */}
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-16"
            style={{ color: 'var(--foreground)' }}
          >
            Vamos{' '}
            conversar
            <span style={{ color: 'var(--accent-primary)' }}>?</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-8"
                aria-label="Formulário de contato"
              >
                {/* Name */}
                <div className="relative">
                  <label
                    htmlFor="contact-name"
                    className="text-xs uppercase tracking-[0.2em] font-medium mb-2 block transition-colors duration-300"
                    style={{
                      color:
                        focusedField === 'name'
                          ? 'var(--accent-primary)'
                          : 'var(--foreground-muted)',
                    }}
                  >
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent pb-3 text-lg font-medium outline-none transition-all duration-300"
                    style={{
                      color: 'var(--foreground)',
                      borderBottom: `1px solid ${
                        focusedField === 'name'
                          ? 'var(--input-border-focus)'
                          : 'var(--input-border)'
                      }`,
                    }}
                    placeholder="Seu nome completo"
                    aria-label="Seu nome completo"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label
                    htmlFor="contact-email"
                    className="text-xs uppercase tracking-[0.2em] font-medium mb-2 block transition-colors duration-300"
                    style={{
                      color:
                        focusedField === 'email'
                          ? 'var(--accent-primary)'
                          : 'var(--foreground-muted)',
                    }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent pb-3 text-lg font-medium outline-none transition-all duration-300"
                    style={{
                      color: 'var(--foreground)',
                      borderBottom: `1px solid ${
                        focusedField === 'email'
                          ? 'var(--input-border-focus)'
                          : 'var(--input-border)'
                      }`,
                    }}
                    placeholder="seu@email.com"
                    aria-label="Seu endereço de email"
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="contact-message"
                    className="text-xs uppercase tracking-[0.2em] font-medium mb-2 block transition-colors duration-300"
                    style={{
                      color:
                        focusedField === 'message'
                          ? 'var(--accent-primary)'
                          : 'var(--foreground-muted)',
                    }}
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className="w-full bg-transparent pb-3 text-lg font-medium outline-none resize-none transition-all duration-300"
                    style={{
                      color: 'var(--foreground)',
                      borderBottom: `1px solid ${
                        focusedField === 'message'
                          ? 'var(--input-border-focus)'
                          : 'var(--input-border)'
                      }`,
                    }}
                    placeholder="Conte sobre seu projeto..."
                    aria-label="Sua mensagem"
                  />
                </div>

                {/* Submit */}
                <MagneticButton as="div" strength={0.3}>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
                    style={{
                      background: 'var(--accent-primary)',
                      color: 'var(--background-secondary)',
                    }}
                    aria-label="Enviar mensagem"
                  >
                    Enviar Mensagem
                    <Send
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    />
                  </button>
                </MagneticButton>
              </form>
            </div>

            {/* Contact links */}
            <div className="flex flex-col justify-center">
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: 'var(--foreground-muted)' }}
              >
                {userData.about}
              </p>

              <div className="space-y-2">
                <TypingLink
                  href={`tel:+55${userData.contact.phone.replace(/\s/g, '')}`}
                  label="Ligar para Evanilson"
                  displayText={userData.contact.phone}
                  icon={<Phone size={16} />}
                />
                <TypingLink
                  href={`mailto:${userData.contact.email}`}
                  label="Enviar email para Evanilson"
                  displayText={userData.contact.email}
                  icon={<Mail size={16} />}
                />
                <TypingLink
                  href={userData.contact.linkedin}
                  label="Perfil do LinkedIn de Evanilson"
                  displayText={`LinkedIn ${userData.contact.linkedinHandle}`}
                  icon={<LinkedinIcon size={16} />}
                />
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-4 mt-8">
                <MagneticButton as="div" strength={0.3}>
                  <a
                    href={userData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      border: '1px solid var(--card-border)',
                      color: 'var(--foreground)',
                    }}
                    aria-label="LinkedIn de Evanilson Freitas"
                  >
                    <LinkedinIcon size={20} />
                  </a>
                </MagneticButton>
                <MagneticButton as="div" strength={0.3}>
                  <a
                    href={`mailto:${userData.contact.email}`}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      border: '1px solid var(--card-border)',
                      color: 'var(--foreground)',
                    }}
                    aria-label="Enviar email"
                  >
                    <Mail size={20} />
                  </a>
                </MagneticButton>
                <MagneticButton as="div" strength={0.3}>
                  <a
                    href={`tel:+55${userData.contact.phone.replace(/\s/g, '')}`}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      border: '1px solid var(--card-border)',
                      color: 'var(--foreground)',
                    }}
                    aria-label="Ligar para Evanilson"
                  >
                    <Phone size={20} />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
