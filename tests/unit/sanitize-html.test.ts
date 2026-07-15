import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '@/utils/sanitize-html';

describe('sanitizeHtml', () => {
  it('strips script tags', () => {
    const out = sanitizeHtml('<p>hello</p><script>alert(1)</script>');
    expect(out).toContain('<p>hello</p>');
    expect(out).not.toContain('script');
    expect(out).not.toContain('alert');
  });

  it('strips inline event handlers', () => {
    const out = sanitizeHtml('<img src="x" onerror="alert(1)">');
    expect(out).not.toContain('onerror');
  });

  it('strips javascript: URLs', () => {
    const out = sanitizeHtml('<a href="javascript:alert(1)">click</a>');
    expect(out).not.toContain('javascript:');
  });

  it('strips iframes and forms', () => {
    const out = sanitizeHtml(
      '<iframe src="https://evil.example"></iframe><form><input name="a"></form>',
    );
    expect(out).not.toContain('iframe');
    expect(out).not.toContain('<form');
    expect(out).not.toContain('<input');
  });

  it('keeps rich-text structure the blog renders', () => {
    const html =
      '<h2>Title</h2><p>Body with <strong>bold</strong> and <code>code</code>.</p>' +
      '<pre><code>const x = 1;</code></pre>' +
      '<table><tbody><tr><td>cell</td></tr></tbody></table>' +
      '<ul><li>item</li></ul><blockquote>quote</blockquote>';
    expect(sanitizeHtml(html)).toBe(html);
  });

  it('keeps images, including data URIs (inline editor images)', () => {
    const hosted = '<img src="https://res.cloudinary.com/demo/image/upload/a.png">';
    expect(sanitizeHtml(hosted)).toContain('res.cloudinary.com');

    const inline = '<img src="data:image/png;base64,iVBORw0KGgo=">';
    expect(sanitizeHtml(inline)).toContain('data:image/png;base64');
  });

  it('forces rel=noopener on target=_blank links', () => {
    const out = sanitizeHtml('<a href="https://example.com" target="_blank">x</a>');
    expect(out).toContain('target="_blank"');
    expect(out).toContain('noopener');
  });
});
