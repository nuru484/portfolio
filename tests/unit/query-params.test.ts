import { describe, it, expect } from 'vitest';
import { intParam, boolParam, strParam } from '@/utils/query-params';

const sp = (query: string) => new URLSearchParams(query);

describe('intParam', () => {
  it('parses valid integers', () => {
    expect(intParam(sp('page=3'), 'page')).toBe(3);
  });

  it('returns undefined for junk instead of NaN', () => {
    expect(intParam(sp('page=abc'), 'page')).toBeUndefined();
    expect(intParam(sp('page='), 'page')).toBeUndefined();
    expect(intParam(sp(''), 'page')).toBeUndefined();
  });

  it('truncates decimals', () => {
    expect(intParam(sp('page=2.9'), 'page')).toBe(2);
  });
});

describe('boolParam', () => {
  it('maps "true" to true and anything else present to false', () => {
    expect(boolParam(sp('isPublished=true'), 'isPublished')).toBe(true);
    expect(boolParam(sp('isPublished=false'), 'isPublished')).toBe(false);
    expect(boolParam(sp('isPublished=1'), 'isPublished')).toBe(false);
  });

  it('returns undefined when absent', () => {
    expect(boolParam(sp(''), 'isPublished')).toBeUndefined();
  });
});

describe('strParam', () => {
  it('returns the value or undefined', () => {
    expect(strParam(sp('search=abc'), 'search')).toBe('abc');
    expect(strParam(sp(''), 'search')).toBeUndefined();
  });
});
