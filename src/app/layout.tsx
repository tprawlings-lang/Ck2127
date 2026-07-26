import type { Metadata } from 'next';
import { Manrope, Source_Sans_3 } from 'next/font/google';
import { site } from '@/config/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileContactBar } from '@/components/MobileContactBar';
import { StructuredData } from '@/components/StructuredData';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Personal Trainer in Phoenix | ${site.brandName}`,
    template: `%s | ${site.brandName}`,
  },
  description:
    'Patient one-on-one personal training, nutrition coaching, and healthy cooking instruction in Phoenix. Start where you are. Build strength that lasts.',
  openGraph: {
    siteName: site.brandName,
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${sourceSans.variable}`}>
      <body>
        <StructuredData />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-soft-white focus:px-4 focus:py-2 focus:text-slate-deep"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileContactBar />
      </body>
    </html>
  );
}
