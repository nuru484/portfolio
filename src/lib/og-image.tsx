// src/lib/og-image.tsx
//
// Shared Open Graph card template used by every opengraph-image.tsx file
// convention. Mirrors the site's visual language: charcoal field, dot grid,
// soft indigo glow (SiteBackground), profile photo (monogram fallback),
// Urbanist-style sans, and a call-to-action pill so shares invite a click.
//
// Satori (behind ImageResponse) supports flexbox + a CSS subset only — no
// grid — so the layout is flex-based, and the ambient glows are positioned
// divs with radial gradients rather than layered backgrounds. OG file
// conventions run on the Node runtime, so the photo is read from disk and
// embedded as a data URI.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { SITE, CONTACT } from '@/config/constants';

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

// Dark-theme palette from globals.css, as hex for Satori.
const BG = '#1f1f1f'; // --background oklch(0.22 0 0)
const FG = '#f4f4f4'; // --foreground
const MUTED = '#a8a8a8'; // --muted-foreground
const BRAND = '#8a8cf8'; // --brand oklch(0.7 0.16 275)
const BORDER = 'rgba(255,255,255,0.14)';

/** Profile photo as a data URI; null falls back to the monogram badge. */
async function profilePhotoSrc(): Promise<string | null> {
  try {
    const photo = await readFile(
      path.join(process.cwd(), 'public', 'profile-photo.jpg'),
    );
    return `data:image/jpeg;base64,${photo.toString('base64')}`;
  } catch {
    return null;
  }
}

export async function portfolioOgImage({
  eyebrow,
  title,
  subtitle,
  cta,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** The conversion line on the card — tailor it per page. */
  cta?: string;
}) {
  // Long titles (blog posts) scale down so they never overflow the card.
  const titleSize = title.length > 60 ? 50 : title.length > 32 ? 60 : 78;
  const host = new URL(SITE.url).host;
  const ctaText = cta ?? `Explore my work at ${host} →`;
  const photo = await profilePhotoSrc();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 72px',
          background: BG,
          color: FG,
          fontFamily: 'sans-serif',
          // Dot grid, echoing SiteBackground.
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1.5px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      >
        {/* Ambient brand glows */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 560,
            background:
              'radial-gradient(circle, rgba(138,140,248,0.28) 0%, rgba(138,140,248,0) 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -220,
            left: -140,
            width: 520,
            height: 520,
            borderRadius: 520,
            background:
              'radial-gradient(circle, rgba(138,140,248,0.18) 0%, rgba(138,140,248,0) 70%)',
            display: 'flex',
          }}
        />

        {/* Header: profile photo (or monogram) + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt=""
              width={72}
              height={72}
              style={{
                width: 72,
                height: 72,
                borderRadius: 72,
                objectFit: 'cover',
                border: `2px solid ${BRAND}`,
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 72,
                height: 72,
                borderRadius: 18,
                background: BRAND,
                color: '#17171c',
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: -1,
              }}
            >
              AN
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{SITE.name}</div>
            <div style={{ fontSize: 20, color: MUTED }}>
              Full-Stack Software Developer
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 7,
              textTransform: 'uppercase',
              color: BRAND,
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          <div
            style={{ marginTop: 14, fontSize: 26, color: MUTED, lineHeight: 1.4 }}
          >
            {subtitle}
          </div>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              marginTop: 26,
              background: BRAND,
              color: '#17171c',
              borderRadius: 999,
              padding: '14px 30px',
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            {ctaText}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
            borderTop: `1px solid ${BORDER}`,
            fontSize: 22,
            color: MUTED,
          }}
        >
          <span style={{ color: FG }}>{host}</span>
          <span>PERN · Next.js · {CONTACT.location}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
