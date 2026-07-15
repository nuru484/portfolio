'use client';

// Detail pages mount this so opening one always starts at the top — with
// streamed loading boundaries Next can otherwise leave the viewport at the
// list page's scroll offset. List pages don't use it, so back-navigation
// scroll restoration there is unaffected.
import { useEffect } from 'react';

export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return null;
}
