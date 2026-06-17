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
        <p className="text-muted-foreground">
          © {new Date().getFullYear()}. All Rights Reserved By Nurudeen
        </p>
        <div className="flex items-center gap-3 mx-auto md:mx-0">
          <ThemeToggle className="w-9 h-9 border border-border bg-background text-foreground hover:bg-muted" />
          <button
            className="flex items-center gap-2 hover:text-muted-foreground transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Scroll to Top <ArrowUp className="w-4 h-4" />
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
            <span className="text-muted-foreground/50">Together</span>
          </h2>
          <Link href="/contact">
            <button className="bg-foreground text-background border border-foreground px-8 py-4 text-base font-medium rounded-full inline-flex items-center gap-2 hover:bg-background hover:text-foreground transition-colors duration-500">
              Get In Touch! <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-5 px-6 mb-16">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-muted-foreground transition-colors"
            >
              {social.label} <ArrowUpRight className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="bg-muted">
        <BottomBar />
      </div>
    </footer>
  );
}
