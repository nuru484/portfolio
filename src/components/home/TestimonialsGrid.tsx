// src/components/home/TestimonialsGrid.tsx
'use client';

// Modern card grid shown three at a time (one lg row): "See more" swaps in
// the next three instead of stacking them, so the section never grows
// unboundedly long. Quotes render in full — length is capped at creation
// (500 chars, see testimonial-validation).
import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import {
  Quote as QuoteIcon,
  ArrowRight,
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

const PAGE_SIZE = 3;

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
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: ITestimonial;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      // max-sm scopes the flush-top first card to the borderless phone
      // stack — unscoped first:pt-0 outranks sm:p-6 in the emitted CSS and
      // strips the desktop card's top padding.
      className="flex h-full flex-col py-6 max-sm:first:pt-0 sm:rounded-2xl sm:border sm:border-border sm:bg-card sm:p-6 sm:shadow-sm"
    >
      <QuoteIcon
        strokeWidth={1.5}
        className="mb-3 h-6 w-6 text-muted-foreground/40"
        aria-hidden
      />

      <blockquote className="mb-5 text-base leading-relaxed text-foreground/90 [overflow-wrap:anywhere]">
        {testimonial.quote}
      </blockquote>

      {/* mt-auto pins the author row to the card bottom in equal-height rows */}
      <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
          {testimonial.image ? (
            <Image
              src={testimonial.image}
              alt={testimonial.author}
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
        </div>

        <div className="min-w-0">
          <p className="min-w-0 line-clamp-1 whitespace-normal [overflow-wrap:anywhere] text-sm font-semibold text-foreground">
            {testimonial.author}
          </p>
          <p className="min-w-0 line-clamp-1 whitespace-normal [overflow-wrap:anywhere] text-xs text-muted-foreground">
            {testimonial.role}
          </p>
        </div>

        <Socials socials={testimonial.socials} />
      </div>
    </motion.article>
  );
}

export function TestimonialsGrid({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(testimonials.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const visible = testimonials.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-col divide-y divide-border sm:grid sm:grid-cols-2 sm:gap-6 sm:divide-y-0 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>

      {pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {start + 1}–{Math.min(start + PAGE_SIZE, testimonials.length)} of{' '}
            {testimonials.length}
          </p>
          <button
            onClick={() => setPage((page + 1) % pageCount)}
            className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            See more
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
