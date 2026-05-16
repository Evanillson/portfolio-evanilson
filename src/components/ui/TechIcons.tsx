'use client';

/**
 * Official SVG icons for all technologies in the portfolio.
 * All icons use `currentColor` so the parent controls the color.
 * This ensures unified theming: dark mode (#00F0FF) and light mode (#0056D2).
 */

interface IconProps {
  size?: number;
  className?: string;
}

function PowerBIIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M10 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm5 4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1Zm4 4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1ZM5 11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1Z" />
    </svg>
  );
}

function DAXIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 4h6v2H6v12h4v2H4V4Zm10 0h6v16h-6v-2h4V6h-4V4Z" />
      <path d="M8.5 9h7l-3.5 3 3.5 3h-7l3.5-3-3.5-3Z" opacity="0.7" />
    </svg>
  );
}

function SQLServerIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C7.58 2 4 3.79 4 6v12c0 2.21 3.58 4 8 4s8-1.79 8-4V6c0-2.21-3.58-4-8-4Zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2ZM6 8.35c1.58.95 3.68 1.65 6 1.65s4.42-.7 6-1.65V12c0 .5-2.13 2-6 2s-6-1.5-6-2V8.35ZM6 14.35c1.58.95 3.68 1.65 6 1.65s4.42-.7 6-1.65V18c0 .5-2.13 2-6 2s-6-1.5-6-2v-3.65Z" />
    </svg>
  );
}

function PythonIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.13V3.202S18.28 0 11.914 0ZM8.708 1.85a1.06 1.06 0 1 1 0 2.118 1.06 1.06 0 0 1 0-2.118Z" />
      <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H11.98v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.402-3.35 3.402H9.451s-3.24-.052-3.24 3.13v5.328S5.72 24 12.086 24Zm3.206-1.85a1.06 1.06 0 1 1 0-2.118 1.06 1.06 0 0 1 0 2.118Z" opacity="0.7" />
    </svg>
  );
}

function PandasIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.5 1h2v6h-2V1Zm0 8h2v6h-2V9Zm0 8h2v6h-2v-6ZM5.5 4h2v6h-2V4Zm0 8h2v6h-2v-6Zm0 8h2v3h-2v-3ZM11 7h2v4h-2V7Zm0 6h2v4h-2v-4Z" />
    </svg>
  );
}

function DatabricksIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0L1 6.5v11L12 24l11-6.5v-11L12 0Zm0 2.2l8.5 5v2.3L12 14.8 3.5 9.5V7.2L12 2.2Zm-8.5 9l8.5 5.3 8.5-5.3v2.3L12 19.8l-8.5-5.3v-2.3Z" />
    </svg>
  );
}

function ExcelIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" opacity="0.2" />
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 1.5L18.5 9H14a1 1 0 0 1-1-1V3.5ZM6 20V4h5v4a3 3 0 0 0 3 3h4v9H6Z" />
      <path d="M8.5 12.5 10 15l-1.5 2.5h1.5l.75-1.4.75 1.4h1.5L11.5 15l1.5-2.5h-1.5l-.75 1.35-.75-1.35H8.5Z" />
    </svg>
  );
}

function FigmaIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8Z" opacity="0.5" />
      <path d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z" opacity="0.65" />
      <path d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z" opacity="0.8" />
      <path d="M12 0h4a4 4 0 0 1 0 8h-4V0Z" opacity="0.8" />
      <path d="M20 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
    </svg>
  );
}

function PowerQueryIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 4h16v16H4V4Zm2 2v12h12V6H6Zm1 1h4v2H7V7Zm5 0h4v2h-4V7ZM7 10h4v2H7v-2Zm5 0h4v2h-4v-2ZM7 13h4v2H7v-2Zm5 0h4v2h-4v-2Z" />
      <path d="M2 2h3v2H4v16h1v2H2V2Zm17 0h3v20h-3v-2h1V4h-1V2Z" opacity="0.4" />
    </svg>
  );
}

function SparkIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2Z" />
      <path d="M12 6l-1.5 4.5L6 12l4.5 1.5L12 18l1.5-4.5L18 12l-4.5-1.5L12 6Z" opacity="0.5" />
    </svg>
  );
}

// Icon registry
const iconComponents: Record<string, React.FC<IconProps>> = {
  powerbi: PowerBIIcon,
  dax: DAXIcon,
  sqlserver: SQLServerIcon,
  python: PythonIcon,
  pandas: PandasIcon,
  databricks: DatabricksIcon,
  excel: ExcelIcon,
  figma: FigmaIcon,
  powerquery: PowerQueryIcon,
  spark: SparkIcon,
};

export function TechIcon({ name, size = 28, className }: { name: string; size?: number; className?: string }) {
  const Component = iconComponents[name];
  if (!Component) {
    // Fallback
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <circle cx="12" cy="12" r="10" opacity="0.3" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    );
  }
  return <Component size={size} className={className} />;
}

export default TechIcon;
