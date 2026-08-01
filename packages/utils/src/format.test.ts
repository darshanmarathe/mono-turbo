import { describe, expect, it } from 'vitest';
import { formatBytes, formatNumber } from './format.ts';

describe('formatNumber', () => {
  it('formats thousands separators', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
  });
});

describe('formatBytes', () => {
  it('handles zero', () => {
    expect(formatBytes(0)).toBe('0 B');
  });

  it('formats binary units', () => {
    expect(formatBytes(1536)).toBe('1.5 KB');
  });
});
