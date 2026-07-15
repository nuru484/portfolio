// src/utils/sanitize-html.ts
//
// Server-side sanitizer for rich-text (TinyMCE) HTML. Applied when a post is
// saved AND when stored content is rendered, so rows written before this
// existed are covered too. The editor is trusted UI, but the API accepts raw
// HTML from any authenticated user — without this, a post is stored XSS on
// every public visitor.
//
// Uses sanitize-html (pure JS, htmlparser2) rather than DOMPurify:
// DOMPurify's server build needs jsdom, whose dependency chain require()s
// ESM-only modules and crashes Vercel's function runtime with
// ERR_REQUIRE_ESM (seen live on /blog). No DOM emulation, no interop risk.
import 'server-only';
import sanitize from 'sanitize-html';

/**
 * Strips scripts, event handlers, and other active content from rich-text
 * HTML while keeping everything the blog renderer styles (headings, lists,
 * blockquotes, code blocks, tables, images, links).
 */
export function sanitizeHtml(html: string): string {
  return sanitize(html, {
    // Defaults cover the text/structure tags (h1-h6, p, lists, blockquote,
    // pre/code, tables, span…); images are opt-in.
    allowedTags: [...sanitize.defaults.allowedTags, 'img'],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      '*': ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    // data: URIs only on images — the editor embeds base64 images that the
    // save pipeline uploads to Cloudinary (see utils/content-images).
    allowedSchemesByTag: { img: ['http', 'https', 'data'] },
    transformTags: {
      // Links opened in a new tab must not hand the opener to the target.
      a: (tagName, attribs) =>
        attribs.target === '_blank'
          ? { tagName, attribs: { ...attribs, rel: 'noopener noreferrer' } }
          : { tagName, attribs },
    },
  });
}
