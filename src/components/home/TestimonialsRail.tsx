// src/components/home/TestimonialsRail.tsx
'use client';

// A snap rail rather than paged cards: one card on a phone, two from sm,
// three from lg, and the next one always peeking so there is something to
// scroll toward.
//
// The previous version swapped a page of cards in and out through
// AnimatePresence. Old and new cards overlapped in the grid mid-swap, so the
// row briefly doubled in height and the incoming cards wrapped onto a second
// line, and the entrance fade read as a loading state. Paging also left a
// ragged tail: four testimonials meant a full row of three and then one card
// alone in a three-column grid.
//
// Nothing here re-renders on navigation. The cards are all in the DOM from the
// first paint and moving between them only changes scroll position, so there
// is no flash and nothing to re-fetch.
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Quote as QuoteIcon,
  ChevronLeft,
  ChevronRight,
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
import type {
  ITestimonial,
  ITestimonialSocial,
} from '@/types/testimonial.types';

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
    <div className="ml-auto flex shrink-0 items-center gap-1">
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icon aria-hidden className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: ITestimonial }) {
  return (
    <li
      // Each card is one snap target and one column of the rail.
      className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
    >
      <figure className="flex h-full flex-col border border-border bg-card p-5 sm:rounded-2xl sm:p-6">
        <QuoteIcon
          strokeWidth={1.5}
          className="mb-3 h-6 w-6 text-muted-foreground/40"
          aria-hidden
        />

        <blockquote className="mb-5 text-base leading-relaxed text-foreground/90 [overflow-wrap:anywhere]">
          {testimonial.quote}
        </blockquote>

        {/* mt-auto pins the author row to the bottom so the rail reads evenly
            even when the quotes differ in length. */}
        <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-4">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
            {testimonial.image ? (
              <Image
                src={testimonial.image}
                alt=""
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center">
                <UserRound
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden
                />
              </span>
            )}
          </span>

          <span className="min-w-0">
            <span className="block min-w-0 truncate text-sm font-semibold text-foreground">
              {testimonial.author}
            </span>
            <span className="block min-w-0 truncate text-xs text-muted-foreground">
              {testimonial.role}
            </span>
          </span>

          <Socials socials={testimonial.socials} />
        </figcaption>
      </figure>
    </li>
  );
}

export function TestimonialsRail({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    // A pixel of slack: sub-pixel widths mean scrollLeft rarely lands exactly
    // on the maximum.
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    const el = railRef.current;
    if (!el) return;
    const onResize = () => sync();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [sync]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({
      left: direction * el.clientWidth,
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  // With everything already in view there is nothing to move.
  const showControls = !(atStart && atEnd);

  const control =
    'flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40';

  return (
    <div>
      {showControls && (
        <div className="mb-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={atStart}
            aria-label="Previous testimonials"
            className={control}
          >
            <ChevronLeft aria-hidden className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={atEnd}
            aria-label="Next testimonials"
            className={control}
          >
            <ChevronRight aria-hidden className="h-5 w-5" />
          </button>
        </div>
      )}

      <ul
        ref={railRef}
        onScroll={sync}
        // Focusable so the rail can be scrolled with the arrow keys, which is
        // the same affordance the buttons give the mouse.
        tabIndex={0}
        aria-label="Testimonials"
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 sm:gap-6"
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </ul>
    </div>
  );
}
