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

  // Auto-advance, paused on hover/focus. Reset on every index change so a
  // manual interaction restarts the countdown.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (paused || count <= 1) return;
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
      <div className="relative overflow-hidden px-2 md:px-14">
        <div
          className="relative min-h-[22rem] md:min-h-[20rem]"
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
              className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 text-center shadow-sm md:p-10"
            >
              <QuoteIcon
                className="h-8 w-8 text-muted-foreground/40"
                aria-hidden
              />

              <blockquote className="max-w-2xl text-lg leading-relaxed text-foreground md:text-xl">
                {current.quote}
              </blockquote>

              <div className="flex flex-col items-center gap-3">
                <div className="h-16 w-16 overflow-hidden rounded-full border border-border">
                  <Image
                    src={current.image || '/user-icon.png'}
                    alt={current.author}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
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
          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-3">
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

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-[9rem] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:bg-muted md:top-1/2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-[9rem] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:bg-muted md:top-1/2"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
