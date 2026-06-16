// src/app/layout.tsx
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { SITE } from '@/config/constants';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: '%s | Abdul-Majeed Nurudeen',
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    siteName: 'Abdul-Majeed Nurudeen Portfolio',
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
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
    title: SITE.title,
    description: SITE.description,
    images: ['/og-twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
