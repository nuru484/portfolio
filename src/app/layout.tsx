import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const siteUrl = 'https://portfolio-nurus-projects-d98f949e.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Abdul-Majeed Nurudeen — Full-Stack Software Developer',
    template: '%s | Abdul-Majeed Nurudeen',
  },
  description:
    'Portfolio of Abdul-Majeed Nurudeen, a full-stack software developer specializing in the PERN stack (PostgreSQL, Express, React, Node.js).',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Abdul-Majeed Nurudeen Portfolio',
    url: siteUrl,
    title: 'Abdul-Majeed Nurudeen — Full-Stack Software Developer',
    description:
      'Portfolio of Abdul-Majeed Nurudeen, a full-stack software developer specializing in the PERN stack.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1100,
        height: 630,
        alt: 'Abdul-Majeed Nurudeen Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ABDULMAJEEDNUR3',
    title: 'Abdul-Majeed Nurudeen — Full-Stack Software Developer',
    description:
      'Portfolio of Abdul-Majeed Nurudeen, a full-stack software developer specializing in the PERN stack.',
    images: ['/og-twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
