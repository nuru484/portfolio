// src/components/home/TestimonialsCarousel.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Quote as QuoteIcon,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Globe,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  ITestimonial,
  ITestimonialSocial,
} from '@/types/testimonial.types';

const AUTO_ADVANCE_MS = 6000;

/** Maps a free-text platform name to a recognisable icon. */
function socialIcon(platform: string): LucideIcon {
  const p = platform.toLowerCase();
  if (p.includes('github')) return Github;
  if (p.includes('linkedin')) return Linkedin;
  if (p.includes('twitter') || p === 'x') return Twitter;
  if (p.includes('facebook')) return Facebook;
  if (p.includes('instagram')) return Instagram;
  if (p.includes('youtube')) return Youtube;
  return Globe;
}

function Socials({ socials }: { socials: ITestimonialSocial[] }) {
  if (socials.length === 0) return null;
  return (
    <div className="flex items-center justify-center gap-2 pt-1">
      {socials.map((social) => {
        const Icon = socialIcon(social.platform);
        return (
          <a
            key={`${social.platform}-${social.url}`}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.platform}
            title={social.platform}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  // Auto-advance, paused on hover/focus and for users who prefer reduced
  // motion. Reset on every index change so a manual interaction restarts it.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (paused || count <= 1) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    timer.current = setTimeout(() => go(index + 1, 1), AUTO_ADVANCE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, count, go]);

  const current = testimonials[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative overflow-hidden px-0 md:px-10">
        <div
          className="relative min-h-[18rem] md:min-h-[15rem]"
          aria-live="polite"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.article
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-5 text-center sm:rounded-2xl sm:border sm:border-border sm:bg-card sm:p-7 sm:shadow-sm"
            >
              <QuoteIcon
                className="h-7 w-7 text-muted-foreground/40"
                aria-hidden
              />

              <blockquote className="max-w-2xl text-lg leading-relaxed text-foreground">
                {current.quote}
              </blockquote>

              <div className="flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                  {current.image ? (
                    <Image
                      src={current.image}
                      alt={current.author}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound
                      className="h-8 w-8 text-muted-foreground"
                      aria-hidden
                    />
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">
                    {current.author}
                  </p>
                  <p className="text-sm text-muted-foreground">{current.role}</p>
                </div>
                <Socials socials={current.socials} />
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      {count > 1 && (
        <>
          {/* Controls — arrows flank the dots on mobile (no overlap), and sit
              on the card's sides from sm up. */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted sm:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => go(i, i > index ? 1 : -1)}
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-300',
                    i === index
                      ? 'w-6 bg-foreground'
                      : 'w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/70',
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted sm:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Side arrows (sm and up) */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted sm:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted sm:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
