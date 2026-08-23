// src/components/NavBar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SOCIAL_LINKS } from '@/config/constants';
import { mobileMenuVariants } from '@/static-data/motion-variants';

interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

/** Ties both toggles to the panel they control. */
const MENU_PANEL_ID = 'site-menu';

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavScrolledPast, setIsNavScrolledPast] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Where focus came from, so closing puts it back on the control that opened
  // the menu rather than dropping it at the top of the document.
  const openerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const { top } = navRef.current.getBoundingClientRect();
        setIsNavScrolledPast(top < -10);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape closes the panel, and the page behind it does not scroll while it
  // is open. Focus moves to the first link on open and back to the toggle on
  // close, so the keyboard never lands somewhere invisible.
  useEffect(() => {
    if (!isMenuOpen) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setIsMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [isMenuOpen]);

  return (
    <nav ref={navRef} aria-label="Main">
      <div className="max-w-6xl mx-auto px-8 md:px-10 pt-8 pb-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex justify-between w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: isNavScrolledPast ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            inert={isNavScrolledPast}
          >
            <Link
              href="/"
              className="text-2xl font-urbanist font-semibold text-foreground"
            >
              Portfolio
            </Link>

            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls={MENU_PANEL_ID}
              className={cn(
                'md:hidden text-foreground text-xl font-urbanist font-semibold',
                isMenuOpen && 'text-muted-foreground z-50 mr-4'
              )}
            >
              Menu
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isNavScrolledPast ? 0 : 1,
              scale: isNavScrolledPast ? 0.95 : 1,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            // Faded out is not gone: without inert these links stay in the
            // tab order and focus lands on an invisible row.
            inert={isNavScrolledPast}
            className={cn(
              'hidden md:flex gap-6 font-urbanist',
              isNavScrolledPast && 'pointer-events-none'
            )}
          >
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors p-2 text-foreground text-lg font-semibold hover:text-muted-foreground hover:cursor-pointer"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={cn(
                    'transition-colors p-2 hover:cursor-pointer font-semibold text-lg border-b-2',
                    pathname === item.href
                      ? 'text-foreground border-foreground'
                      : 'text-foreground border-transparent hover:text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </motion.div>
        </div>

        {isNavScrolledPast && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              duration: 0.3,
            }}
            onClick={toggleMenu}
            className={cn(
              'fixed top-7 right-7 md:top-20 md:right-20 p-6 md:p-9 rounded-full z-50 transition-colors',
              isMenuOpen
                ? 'bg-background text-foreground border border-border'
                : 'bg-foreground text-background'
            )}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls={MENU_PANEL_ID}
          >
            {isMenuOpen ? (
              <X aria-hidden size={24} />
            ) : (
              <Menu aria-hidden size={24} />
            )}
          </motion.button>
        )}

        {/* The panel stays mounted so it can animate, so it must be inert
            while closed: otherwise its nine controls sit off-screen and
            still take keyboard focus. */}
        <motion.div
          id={MENU_PANEL_ID}
          ref={panelRef}
          variants={mobileMenuVariants}
          initial="closed"
          animate={isMenuOpen ? 'open' : 'closed'}
          inert={!isMenuOpen}
          className="fixed top-0 right-0 w-full h-dvh md:w-2/3 lg:w-2/5 2xl:w-2/5 bg-background border-l border-border shadow-lg z-40 overflow-y-auto overscroll-contain"
        >
          <div className="min-h-full px-8 py-8 md:px-16 md:py-16 lg:px-24 lg:py-24 flex flex-col justify-between gap-12">
            <div className="flex flex-col gap-4 font-urbanist">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    onClick={closeMenu}
                    rel="noopener noreferrer"
                    className="text-4xl text-foreground px-1.5 py-2.5 hover:text-muted-foreground transition-colors flex items-center gap-3"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="text-4xl text-foreground px-1.5 py-2.5 hover:text-muted-foreground cursor-pointer transition-colors flex items-center gap-3"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between border-b border-border py-4">
                <span className="text-2xl text-muted-foreground">Theme</span>
                <ThemeToggle className="w-11 h-11 border border-border text-foreground hover:bg-muted" />
              </div>

              {/* A group label, not a document heading: as an h2 it landed in
                  every page's heading outline. */}
              <p
                id="menu-socials-label"
                className="text-2xl py-4 text-muted-foreground border-b border-border"
              >
                Socials
              </p>
              <ul
                aria-labelledby="menu-socials-label"
                className="flex flex-wrap gap-6 text-foreground"
              >
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      {social.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
