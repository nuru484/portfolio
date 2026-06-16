// src/components/Footer.tsx
'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { SOCIAL_LINKS } from '@/config/constants';

export function BottomBar() {
  return (
    <div className="w-full h-28">
      <div className="max-w-6xl md:h-full font-urbanist flex justify-around md:justify-between items-center flex-wrap gap-4 text-center mx-auto px-6 md:px-12 py-7">
        <p className="text-gray-600">
          © {new Date().getFullYear()}. All Rights Reserved By Nurudeen
        </p>
        <button
          className="flex items-center gap-2 mx-auto md:mx-0 hover:text-gray-600 transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Scroll to Top <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="max-w-6xl mx-auto font-urbanist">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-medium mb-2">Let&apos;s Create</h2>
          <h2 className="text-5xl font-medium mb-4">Something</h2>
          <h2 className="text-5xl font-medium text-gray-300 mb-8">Together</h2>
          <Link href="/contact">
            <button className="bg-black text-white px-8 py-4 rounded-full inline-flex items-center gap-2 border hover:bg-white hover:border hover:border-black hover:text-black transition-colors duration-500">
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
              className="flex items-center gap-2 hover:text-gray-600 transition-colors"
            >
              {social.label} <ArrowUpRight className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="bg-gray-100">
        <BottomBar />
      </div>
    </footer>
  );
}
