// src/components/SiteBackground.tsx

/**
 * Fixed, full-viewport ambient background for the public site (dotted grid +
 * soft radial glows + vertical fade). Purely decorative — see `.site-background`
 * in globals.css. The dashboard layout paints an opaque surface over it, so it
 * is visible on public pages only.
 */
export function SiteBackground() {
  return <div aria-hidden className="site-background" />;
}
