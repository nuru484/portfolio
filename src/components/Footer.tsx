// src/components/Footer.tsx
'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SOCIAL_LINKS } from '@/config/constants';

export function BottomBar() {
  return (
    <div className="w-full">
      <div className="max-w-6xl font-urbanist flex justify-between items-center flex-wrap gap-4 text-center mx-auto px-6 md:px-12 py-7">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()}. All Rights Reserved By Nurudeen
          </p>
          <Link
            href="/privacy-policy"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Terms
          </Link>
        </div>
        <div className="flex items-center gap-3 mx-auto md:mx-0">
          <ThemeToggle className="w-9 h-9 border border-border bg-background text-foreground hover:bg-muted" />
          <button
            type="button"
            className="flex items-center gap-2 hover:text-muted-foreground transition-colors"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                  .matches
                  ? 'auto'
                  : 'smooth',
              })
            }
          >
            Scroll to Top <ArrowUp aria-hidden className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full mt-auto">
      <div className="max-w-6xl mx-auto font-urbanist">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium leading-tight mb-6">
            Let&apos;s Create Something{' '}
            <span className="text-muted-foreground">Together</span>
          </h2>
          <Link
            href="/contact"
            className="bg-foreground text-background border border-foreground px-8 py-4 text-base font-medium rounded-full inline-flex items-center gap-2 hover:bg-background hover:text-foreground transition-colors duration-500"
          >
            Get In Touch! <ArrowUpRight aria-hidden className="w-4 h-4" />
          </Link>
        </div>

        {/* Social Links */}
        <ul
          aria-label="Social profiles"
          className="flex justify-center gap-5 px-6 mb-16"
        >
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-muted-foreground transition-colors"
              >
                {social.label}
                <span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight aria-hidden className="w-4 h-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-muted">
        <BottomBar />
      </div>
    </footer>
  );
}
