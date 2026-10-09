import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { brandConfig } from '@/config/branding';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: brandConfig?.name ? `${brandConfig.name} - ${brandConfig.tagline || 'Programează-te online'}` : 'AutoBook',
  description: brandConfig?.description || 'Service auto profesionist. Programează-te online rapid și simplu.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
