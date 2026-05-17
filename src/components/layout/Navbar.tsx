'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { navItems, userData } from '@/lib/data';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    // "Início" → if already on home, smooth scroll to top; otherwise navigate then scroll
    if (href === '/') {
      if (pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Let Next.js navigate; ensure top after navigation
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 0);
      }
      setIsMobileOpen(false);
      return;
    }

    // Hash links — smooth scroll if on home, otherwise let Next.js handle
    if (href.startsWith('/#')) {
      const hash = href.slice(1); // e.g. "#skills"
      if (pathname === '/') {
        e.preventDefault();
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
        style={
          isScrolled
            ? {
                background: 'var(--card-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderColor: 'var(--card-border)',
              }
            : { background: 'transparent', borderColor: 'transparent' }
        }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tight"
            style={{ color: 'var(--foreground)' }}
            aria-label="Ir para página inicial"
          >
            <span style={{ color: 'var(--accent-primary)' }}>&lt;</span>
            {userData.shortName.split(' ')[0]}
            <span style={{ color: 'var(--accent-primary)' }}>/&gt;</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <MagneticButton
                key={item.label}
                as="div"
                strength={0.2}
                className="relative group"
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium transition-colors duration-300"
                  style={{ color: 'var(--foreground-muted)' }}
                  aria-label={`Navegar para ${item.label}`}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: 'var(--accent-primary)' }}
                  />
                </Link>
              </MagneticButton>
            ))}

            {/* Theme Toggle */}
            {mounted && (
              <MagneticButton
                as="div"
                className="inline-block"
              >
                <button
                  onClick={toggleTheme}
                  className="relative flex items-center p-1 rounded-full transition-all duration-300 w-14 h-7 cursor-pointer"
                  style={{
                    background: theme === 'dark' ? 'var(--background-secondary)' : '#E2E8F0',
                    border: '1px solid var(--card-border)',
                  }}
                  aria-label={`Alternar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`}
                >
                  <span className="sr-only">Toggle Theme</span>
                  <div
                    className={`absolute flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-300 ${
                      theme === 'dark' ? 'translate-x-7 bg-[#0E131F]' : 'translate-x-0 bg-white'
                    } shadow-md`}
                    style={{
                      border: '1px solid var(--divider)',
                      color: theme === 'dark' ? 'var(--foreground)' : 'var(--accent-primary)'
                    }}
                  >
                    {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
                  </div>
                  <div className="flex justify-between w-full px-1.5 opacity-50 text-xs pointer-events-none">
                    <Sun size={12} className={theme === 'dark' ? 'opacity-100 text-yellow-400' : 'opacity-0'} />
                    <Moon size={12} className={theme === 'dark' ? 'opacity-0' : 'opacity-100 text-blue-800'} />
                  </div>
                </button>
              </MagneticButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 z-[60]"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
            style={{ color: 'var(--foreground)' }}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Fullscreen */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-8"
            style={{ background: 'var(--background)' }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link
                  href={item.href}
                  className="text-3xl font-bold tracking-tight transition-colors duration-300"
                  style={{ color: 'var(--foreground)' }}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-label={`Navegar para ${item.label}`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {mounted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-4 text-sm font-medium mt-4 p-2 rounded-full cursor-pointer transition-colors"
                  style={{ 
                    color: 'var(--foreground)',
                    background: theme === 'dark' ? 'var(--card-bg)' : '#E2E8F0',
                    border: '1px solid var(--card-border)'
                  }}
                  aria-label={`Alternar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`}
                >
                  <div className="relative flex items-center p-1 rounded-full transition-all w-12 h-6" style={{ background: theme === 'dark' ? '#000' : '#fff' }}>
                    <div className={`absolute flex items-center justify-center w-4 h-4 rounded-full transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6 bg-[#0E131F]' : 'translate-x-0 bg-white'} shadow-sm`} style={{ border: '1px solid var(--divider)' }}>
                      {theme === 'dark' ? <Moon size={10} color="white" /> : <Sun size={10} color="black" />}
                    </div>
                  </div>
                  {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
