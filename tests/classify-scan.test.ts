import { describe, it, expect } from 'vitest';
import { matchPattern } from '../control-plane/scripts/governance/glob.ts';

describe('matchPattern', () => {
  it('matches simple * segment', () => {
    expect(matchPattern('docs/*.md', 'docs/QUICKSTART.md')).toBe(true);
    expect(matchPattern('docs/*.md', 'docs/deeper/file.md')).toBe(false);
  });
  it('matches recursive **', () => {
    expect(matchPattern('docs/**', 'docs/a/b/file.txt')).toBe(true);
  });
  it('matches **/file.ext anywhere', () => {
    expect(matchPattern('**/README.md', 'README.md')).toBe(true);
    expect(matchPattern('**/README.md', 'docs/README.md')).toBe(true);
    expect(matchPattern('**/README.md', 'a/b/c/README.md')).toBe(true);
    expect(matchPattern('**/README.md', 'a/b/c/READMEX.md')).toBe(false);
  });
  it('matches **/*.md deep', () => {
    expect(matchPattern('**/*.md', 'README.md')).toBe(true);
    expect(matchPattern('**/*.md', 'docs/QUICKSTART.md')).toBe(true);
    expect(matchPattern('**/*.md', 'a/b/c/file.txt')).toBe(false);
  });
  it('mixed prefix + deep + file', () => {
    expect(matchPattern('docs/**/file.txt', 'docs/file.txt')).toBe(true);
    expect(matchPattern('docs/**/file.txt', 'docs/a/file.txt')).toBe(true);
    expect(matchPattern('docs/**/file.txt', 'docs/a/b/c/file.txt')).toBe(true);
    expect(matchPattern('docs/**/file.txt', 'docsa/b/c/file.txt')).toBe(false);
  });
});
