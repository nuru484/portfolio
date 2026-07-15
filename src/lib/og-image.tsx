// src/lib/og-image.tsx
//
// Shared Open Graph card template used by every opengraph-image.tsx file
// convention. Mirrors the site's visual language: charcoal field, dot grid,
// soft indigo glow (SiteBackground), monogram badge, Urbanist-style sans.
//
// Satori (behind ImageResponse) supports flexbox + a CSS subset only — no
// grid — so the layout is flex-based, and the ambient glows are positioned
// divs with radial gradients rather than layered backgrounds.
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

export function portfolioOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  // Long titles (blog posts) scale down so they never overflow the card.
  const titleSize = title.length > 60 ? 52 : title.length > 32 ? 64 : 84;
  const host = new URL(SITE.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px',
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

        {/* Header: monogram badge + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
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
              marginTop: 14,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          <div style={{ marginTop: 16, fontSize: 28, color: MUTED, lineHeight: 1.4 }}>
            {subtitle}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 26,
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
