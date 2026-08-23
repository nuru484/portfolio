import { describe, it, expect } from 'vitest';
import {
  stepIndex,
  swipeDirection,
  SWIPE_THRESHOLD_PX,
} from '@/utils/gallery';

describe('stepIndex', () => {
  it('moves forward and backward within range', () => {
    expect(stepIndex(0, 1, 5)).toBe(1);
    expect(stepIndex(3, -1, 5)).toBe(2);
  });

  it('wraps at both ends', () => {
    expect(stepIndex(4, 1, 5)).toBe(0);
    expect(stepIndex(0, -1, 5)).toBe(4);
  });

  it('handles a single image and an empty set', () => {
    expect(stepIndex(0, 1, 1)).toBe(0);
    expect(stepIndex(0, -1, 1)).toBe(0);
    expect(stepIndex(0, 1, 0)).toBe(0);
  });
});

describe('swipeDirection', () => {
  it('ignores movement below the threshold', () => {
    expect(swipeDirection(0)).toBe(0);
    expect(swipeDirection(SWIPE_THRESHOLD_PX - 1)).toBe(0);
    expect(swipeDirection(-(SWIPE_THRESHOLD_PX - 1))).toBe(0);
  });

  it('pages forward on a left drag and back on a right drag', () => {
    expect(swipeDirection(-SWIPE_THRESHOLD_PX)).toBe(1);
    expect(swipeDirection(SWIPE_THRESHOLD_PX)).toBe(-1);
    expect(swipeDirection(-200)).toBe(1);
    expect(swipeDirection(200)).toBe(-1);
  });
});
