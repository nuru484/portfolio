// src/components/home/LogoMarquee.tsx
import Image from 'next/image';

export interface IMarqueeLogo {
  id: string;
  name: string;
  logo: string;
  websiteUrl: string | null;
}

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
 * A seamless right-to-left roll of client logos.
 *
 * Spacing is a trailing margin on each logo and the track carries no padding.
 * Both matter: a gap between the copies, or padding on the ends, makes the
 * track something other than a whole number of identical copies, so sliding by
 * one copy lands slightly off and the strip visibly snaps back.
 *
 * Every copy is clickable, but only the first is announced. The duplicates are
 * aria-hidden and their links are taken out of the tab order one by one rather
 * than the whole copy being marked inert: inert also removes an element from
 * hit testing, which left the duplicates looking identical while refusing the
 * mouse, so most of the strip appeared dead.
 *
 * A server component: the animation is pure CSS, so there is no reason to ship
 * a client bundle or run an animation frame for it. Hover and keyboard focus
 * pause it, and `prefers-reduced-motion` stops it outright (see globals.css),
 * leaving a row that can still be scrolled by hand.
 */
export function LogoMarquee({ logos }: { logos: IMarqueeLogo[] }) {
  // A single logo has nothing to roll against.
  const shouldRoll = logos.length > 1;
  const copies = shouldRoll ? COPIES : 1;

  return (
    <div
      className="logo-marquee no-scrollbar relative mt-8 overflow-x-auto md:overflow-hidden"
      // Scrollable by hand for anyone who cannot see it move, without the
      // scrollbar itself, which on a phone sat under the logos.
      tabIndex={0}
      role="group"
      aria-label="Client logos"
    >
      <div
        // Longer strips take proportionally longer, so a logo crosses the
        // screen at the same speed however many there are.
        style={{ '--logo-count': logos.length } as React.CSSProperties}
        className={'flex w-max' + (shouldRoll ? ' logo-marquee-track' : '')}
      >
        {Array.from({ length: copies }).map((_, copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-start"
            {...(copy > 0 ? { 'aria-hidden': true } : {})}
          >
            {logos.map((logo) => (
              <LogoItem key={logo.id} logo={logo} duplicate={copy > 0} />
            ))}
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

function LogoItem({
  logo,
  duplicate,
}: {
  logo: IMarqueeLogo;
  duplicate: boolean;
}) {
  // The group is named because the strip around it is a group too (for
  // pause-on-hover), and an unnamed group-hover here would fire on every logo
  // whenever the strip was hovered anywhere.
  const inner = (
    <>
      <span className="relative block h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20">
        <Image
          src={logo.logo}
          alt=""
          fill
          sizes="80px"
          // Logos arrive at every shape, so they are contained rather than
          // cropped, and sit slightly back until hovered.
          className="object-contain opacity-80 transition-opacity duration-300 group-hover/logo:opacity-100"
        />
      </span>
      <span className="w-28 text-center text-xs font-medium leading-tight text-muted-foreground transition-colors [overflow-wrap:anywhere] group-hover/logo:text-foreground md:w-36 md:text-sm">
        {logo.name}
      </span>
    </>
  );

  const stackClass =
    'group/logo flex w-28 flex-col items-center gap-3 md:w-36 md:gap-4';

  return (
    // Spacing is a trailing margin, not a row gap: the marquee slides by
    // exactly one copy, which only lines up if every copy is the same width
    // including the space after its last logo.
    <li className="me-10 shrink-0 md:me-14">
      {logo.websiteUrl ? (
        <a
          href={logo.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          // Clickable in every copy, but only the first copy is tabbed to.
          tabIndex={duplicate ? -1 : undefined}
          className={`${stackClass} rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background`}
        >
          {inner}
          {!duplicate && <span className="sr-only">(opens in a new tab)</span>}
        </a>
      ) : (
        <span className={stackClass}>{inner}</span>
      )}
    </li>
  );
}
