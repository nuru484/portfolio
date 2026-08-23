// src/components/home/TrustedBy.tsx
import Image from 'next/image';
import { getPublishedClientLogos } from '@/lib/client-logos/client-logo-service';
import { LogoMarquee } from '@/components/home/LogoMarquee';

/**
 * The "Trusted by" strip: client logos rolling right to left. Renders
 * nothing at all until at least one logo is published, so the homepage never
 * shows an empty band with a heading over it.
 */
export async function TrustedBy() {
  const logos = await getPublishedClientLogos();
  if (logos.length === 0) return null;

  return (
    <section
      aria-labelledby="trusted-by-heading"
      className="py-12 md:py-16 font-urbanist"
    >
      <h2
        id="trusted-by-heading"
        className="max-w-6xl mx-auto px-6 md:px-12 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
      >
        Trusted by
      </h2>

      <LogoMarquee>
        {logos.map((logo) => (
          <LogoItem key={logo.id} logo={logo} />
        ))}
      </LogoMarquee>
    </section>
  );
}

function LogoItem({
  logo,
}: {
  logo: { id: string; name: string; logo: string; websiteUrl: string | null };
}) {
  // Mark above the name. The group is named because the strip around it is a
  // group too (for pause-on-hover), and an unnamed group-hover here would
  // fire on every logo whenever the strip was hovered anywhere.
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
          className={`${stackClass} rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background`}
        >
          {inner}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        <span className={stackClass}>{inner}</span>
      )}
    </li>
  );
}
