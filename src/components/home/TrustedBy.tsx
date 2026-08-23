// src/components/home/TrustedBy.tsx
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

      <LogoMarquee logos={logos} />
    </section>
  );
}
