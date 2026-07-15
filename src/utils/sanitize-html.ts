// src/utils/sanitize-html.ts
//
// Server-side sanitizer for rich-text (TinyMCE) HTML. Applied when a post is
// saved AND when stored content is rendered, so rows written before this
// existed are covered too. The editor is trusted UI, but the API accepts raw
// HTML from any authenticated user — without this, a post is stored XSS on
// every public visitor.
//
// isomorphic-dompurify needs Node >= 24 on Vercel (jsdom is ESM-only there) —
// see "engines" in package.json.
import 'server-only';
import DOMPurify from 'isomorphic-dompurify';

// Links opened in a new tab must not hand the opener window to the target.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

/**
 * Strips scripts, event handlers, and other active content from rich-text
 * HTML while keeping everything the blog renderer styles (headings, lists,
 * blockquotes, code blocks, tables, images, links).
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ['target'],
    // No embedded documents/forms in blog content.
    FORBID_TAGS: ['style', 'form', 'input', 'button', 'select', 'textarea'],
  });
}
