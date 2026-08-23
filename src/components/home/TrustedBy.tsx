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
  const mark = (
    // Every logo sits on the same pale chip in both themes. Brand marks are
    // drawn for one background: a dark-ink logo disappears on the dark theme
    // and a white one on the light theme. Recolouring them would falsify the
    // brand, so the surface under them is fixed instead.
    <span className="relative block h-14 w-36 rounded-xl border border-border bg-white/95 p-2.5 md:h-16 md:w-44">
      <Image
        src={logo.logo}
        alt={logo.name}
        fill
        sizes="176px"
        // Logos arrive at every shape, so they are contained rather than
        // cropped, and sit slightly back until hovered.
        className="object-contain p-2 opacity-80 transition-opacity duration-300 hover:opacity-100"
      />
    </span>
  );

  return (
    <li className="shrink-0">
      {logo.websiteUrl ? (
        <a
          href={logo.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          {mark}
          <span className="sr-only">{logo.name} (opens in a new tab)</span>
        </a>
      ) : (
        mark
      )}
    </li>
  );
}
