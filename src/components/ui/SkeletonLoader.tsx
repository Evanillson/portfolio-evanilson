'use client';

export default function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`skeleton rounded-lg ${className}`} aria-label="Carregando conteúdo">
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
        <div className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }}
        />
        <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
          Carregando dashboard...
        </p>
      </div>
    </div>
  );
}
