'use client';

import Link from 'next/link';
import { userData, navItems } from '@/lib/data';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-12 sm:py-16 border-t"
      style={{ borderColor: 'var(--divider)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight mb-3 block"
              style={{ color: 'var(--foreground)' }}
            >
              <span style={{ color: 'var(--accent-primary)' }}>&lt;</span>
              {userData.shortName.split(' ')[0]}
              <span style={{ color: 'var(--accent-primary)' }}>/&gt;</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--foreground-muted)' }}>
              Especialista em Power BI, Engenharia de Dados e Análise Estratégica.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href={userData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  border: '1px solid var(--card-border)',
                  color: 'var(--foreground-muted)',
                }}
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={14} />
              </a>
              <a
                href={`mailto:${userData.contact.email}`}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  border: '1px solid var(--card-border)',
                  color: 'var(--foreground-muted)',
                }}
                aria-label="Email"
              >
                <Mail size={14} />
              </a>
              <a
                href={`tel:+55${userData.contact.phone.replace(/\s/g, '')}`}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  border: '1px solid var(--card-border)',
                  color: 'var(--foreground-muted)',
                }}
                aria-label="Telefone"
              >
                <Phone size={14} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] font-medium mb-4"
              style={{ color: 'var(--accent-primary)' }}
            >
              Navegação
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors duration-300 hover:text-[var(--accent-primary)]"
                    style={{ color: 'var(--foreground-muted)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] font-medium mb-4"
              style={{ color: 'var(--accent-primary)' }}
            >
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/cv/curriculo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors duration-300 hover:text-[var(--accent-primary)] inline-flex items-center gap-1.5"
                  style={{ color: 'var(--foreground-muted)' }}
                >
                  Currículo PDF
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <Link
                  href="/educacao"
                  className="text-sm transition-colors duration-300 hover:text-[var(--accent-primary)]"
                  style={{ color: 'var(--foreground-muted)' }}
                >
                  Formação Completa
                </Link>
              </li>
              <li>
                <Link
                  href="/projetos"
                  className="text-sm transition-colors duration-300 hover:text-[var(--accent-primary)]"
                  style={{ color: 'var(--foreground-muted)' }}
                >
                  Todos os Projetos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] font-medium mb-4"
              style={{ color: 'var(--accent-primary)' }}
            >
              Contato
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${userData.contact.email}`}
                  className="text-sm transition-colors duration-300 hover:text-[var(--accent-primary)]"
                  style={{ color: 'var(--foreground-muted)' }}
                >
                  {userData.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:+55${userData.contact.phone.replace(/\s/g, '')}`}
                  className="text-sm transition-colors duration-300 hover:text-[var(--accent-primary)]"
                  style={{ color: 'var(--foreground-muted)' }}
                >
                  +55 {userData.contact.phone}
                </a>
              </li>
              <li>
                <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                  {userData.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--divider)' }}
        >
          <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
            © {currentYear} {userData.shortName}. Todos os direitos reservados.
          </p>
          <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
            Feito com Next.js, Framer Motion & Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
