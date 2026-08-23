// src/components/home/LogoMarquee.tsx
import { Children } from 'react';
import type { ReactNode } from 'react';

/**
 * How many times the logos are laid down end to end.
 *
 * The track slides by exactly one copy and repeats, so for the wrap to be
 * invisible the copies still on screen have to fill the frame at the moment it
 * happens. Two is not enough: once the first has slid away only one is left,
 * and a frame wider than that copy shows empty space before it restarts. Four
 * leaves three copies covering the frame at the wrap, which holds for a short
 * client list on a wide screen.
 */
const COPIES = 4;

/**
 * A seamless right-to-left roll.
 *
 * Spacing is a trailing margin on each logo rather than a gap on the row, and
 * the track carries no padding. Both matter: a gap between the copies, or
 * padding on the ends, makes the track something other than a whole number of
 * identical copies, so sliding by one copy lands slightly off and the strip
 * visibly snaps back.
 *
 * Only the first copy is real. The rest are aria-hidden and inert, or a screen
 * reader reads every client four times and the keyboard tabs through links it
 * cannot announce.
 *
 * A server component: the animation is pure CSS, so there is no reason to ship
 * a client bundle or run an animation frame for it. Hover and keyboard focus
 * pause it, and `prefers-reduced-motion` stops it outright (see globals.css),
 * leaving a row that can still be scrolled by hand.
 */
export function LogoMarquee({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  // A single logo has nothing to roll against.
  const shouldRoll = items.length > 1;
  const copies = shouldRoll ? COPIES : 1;

  return (
    <div
      className="logo-marquee relative mt-8 overflow-x-auto md:overflow-hidden"
      // Scrollable by hand for anyone who cannot see it move. The scrollbar
      // itself is hidden in globals.css - on a phone it sat under the logos.
      tabIndex={0}
      role="group"
      aria-label="Client logos"
    >
      <div
        // Longer strips take proportionally longer, so a logo crosses the
        // screen at the same speed however many there are.
        style={{ '--logo-count': items.length } as React.CSSProperties}
        className={'flex w-max' + (shouldRoll ? ' logo-marquee-track' : '')}
      >
        {Array.from({ length: copies }).map((_, copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-start"
            {...(copy > 0 ? { 'aria-hidden': true, inert: true } : {})}
          >
            {items}
          </ul>
        ))}
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
