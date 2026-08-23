// src/components/home/LogoMarquee.tsx
import { Children } from 'react';
import type { ReactNode } from 'react';

/**
 * A seamless right-to-left roll.
 *
 * The track holds the logos twice and slides exactly half its width, so the
 * moment the first copy leaves the frame the second is sitting where it
 * started and the loop is invisible. The duplicate is aria-hidden, otherwise
 * a screen reader would read every client name twice.
 *
 * A server component: the animation is pure CSS, so there is no reason to
 * ship a client bundle or run an animation frame for it. Hover and keyboard
 * focus pause it, and `prefers-reduced-motion` stops it outright (see the
 * rule in globals.css) leaving a static, scrollable row.
 */
export function LogoMarquee({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  // One item cannot roll against itself: the half-width slide would jump.
  const shouldRoll = items.length > 1;

  return (
    <div
      className="group relative mt-8 overflow-x-auto md:overflow-hidden"
      // The row is reachable by scroll for anyone who cannot see it move.
      tabIndex={0}
      role="group"
      aria-label="Client logos"
    >
      <div
        // Longer strips take proportionally longer, so a logo crosses the
        // screen at the same speed however many there are.
        style={{ '--logo-count': items.length } as React.CSSProperties}
        className={
          'flex w-max items-center gap-12 px-6 md:gap-20 md:px-12' +
          (shouldRoll
            ? ' logo-marquee-track group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]'
            : '')
        }
      >
        <ul className="flex shrink-0 items-center gap-12 md:gap-20">{items}</ul>
        {shouldRoll && (
          // inert as well as aria-hidden: the copy carries the same links, and
          // an aria-hidden subtree that is still tabbable drops keyboard focus
          // onto a control no screen reader can announce.
          <ul
            aria-hidden
            inert
            className="flex shrink-0 items-center gap-12 md:gap-20"
          >
            {items}
          </ul>
        )}
      </div>

      {/* Edge fades, so logos enter and leave rather than being cut off. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent md:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent md:w-24"
      />
    </div>
  );
}
