// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Urbanist } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { SiteBackground } from '@/components/SiteBackground';
import { ThemeProvider } from '@/components/theme-provider';
import { MotionProvider } from '@/components/motion-provider';
import { StoreProvider } from '@/redux/StoreProvider';
import { SITE } from '@/config/constants';
import { clampDescription } from '@/lib/seo';
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
  keywords: [
    'Abdul-Majeed Nurudeen',
    'Nurudeen',
    'full-stack developer',
    'software developer',
    'PERN stack',
    'React developer',
    'Node.js developer',
    'Next.js developer',
    'PostgreSQL',
    'web developer Ghana',
    'Tamale',
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: SITE.url },
  // OG/Twitter images come from the opengraph-image.tsx file conventions,
  // generated at build time from src/lib/og-image.tsx.
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_US',
    url: SITE.url,
    title: SITE.title,
    description: clampDescription(SITE.description, 125),
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nuru484',
    creator: '@nuru484',
    title: SITE.title,
    description: clampDescription(SITE.description, 125),
  },
  robots: { index: true, follow: true },
};

// Matches the page background in each scheme so the browser chrome does not
// flash the wrong colour on mobile.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1b1b1b' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={urbanist.variable} suppressHydrationWarning>
      <body>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
            </Script>
          </>
        )}
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MotionProvider>
              <SiteBackground />
              <a
                href="#main"
                className="sr-only z-[100] rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
              >
                Skip to content
              </a>
              <div className="flex min-h-dvh flex-col">{children}</div>
              <Toaster />
            </MotionProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
