// src/utils/gallery.ts
//
// Paging maths for the full-view image viewer. Pure so the wrap-around and
// the swipe threshold can be tested without a DOM.

/** A horizontal drag shorter than this is a tap, not a swipe. */
export const SWIPE_THRESHOLD_PX = 40;

/**
 * Next index after moving `delta` positions, wrapping at both ends. Returns
 * the index unchanged when there is nothing to page through.
 */
export function stepIndex(index: number, delta: number, count: number): number {
  if (count < 1) return 0;
  return (((index + delta) % count) + count) % count;
}

/**
 * Which way a pointer drag pages, or 0 when the movement was too small to
 * be a swipe. Dragging left (negative dx) moves forward.
 */
export function swipeDirection(dx: number): -1 | 0 | 1 {
  if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return 0;
  return dx < 0 ? 1 : -1;
}
