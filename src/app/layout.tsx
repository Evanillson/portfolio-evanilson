import type { Metadata } from 'next';
import { jakarta, inter, jetbrains } from '@/lib/fonts';
import ThemeProvider from '@/components/providers/ThemeProvider';
import SmoothScroll from '@/components/providers/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Evanilson Freitas — Especialista em Power BI & Dados',
  description:
    'Portfólio de Evanilson Pereira de Freitas. Especialista em Power BI, Engenharia de Dados, Modelagem Star Schema e dashboards analíticos com alto nível de UI/UX.',
  keywords: [
    'Analista de Dados',
    'Power BI',
    'Engenheiro de Dados',
    'Business Intelligence',
    'DAX',
    'SQL',
    'Data Science',
    'Evanilson Freitas',
  ],
  authors: [{ name: 'Evanilson Pereira de Freitas' }],
  openGraph: {
    title: 'Evanilson Freitas — Especialista em Power BI & Dados',
    description:
      'Transformando dados em estratégia e performance. Especialista em Arquitetura de Dados, ETL e Power BI.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
