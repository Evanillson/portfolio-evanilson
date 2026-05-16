import Link from 'next/link';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden pt-20">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none blur-[100px]"
        style={{ background: 'var(--accent-primary)' }}
      />
      
      <div className="relative z-10">
        <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-8" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
          <AlertTriangle size={40} style={{ color: 'var(--accent-primary)' }} />
        </div>
        
        <h1 className="text-6xl sm:text-8xl font-extrabold mb-6 tracking-tighter" style={{ color: 'var(--foreground)' }}>
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--foreground-muted)' }}>
          Página não encontrada
        </h2>
        <p className="max-w-md mx-auto mb-10 text-lg leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
          A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
          style={{ background: 'var(--accent-primary)', color: 'var(--background-secondary)' }}
        >
          <Home size={18} />
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}
