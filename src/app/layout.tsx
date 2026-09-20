import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSite } from '@/lib/data';

export function generateMetadata(): Metadata {
  const site = getSite();
  return {
    title: { default: site.name, template: `%s - ${site.name}` },
    description: site.description,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
