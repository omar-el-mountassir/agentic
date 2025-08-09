// Shared glob matching utility
// Supported subset: *, ** (directories), ** in middle, ** at end, **/file, **/*.ext, prefix/**/file
// Not supported: extglobs, braces, character classes, leading dot rules.
export function matchPattern(pattern: string, filePath: string): boolean {
  if (pattern === '**') return true; // trivial catch-all
  const esc = (s: string) => s.replace(/[-/\\^$+?.()|[\]{}]/g, (m) => `\\${m}`);
  const parts = pattern.split('/');
  const lastIdx = parts.length - 1;
  const regexParts: string[] = [];
  parts.forEach((seg, i) => {
    if (seg === '**') {
      if (i === lastIdx) {
        // trailing ** => optional deeper (or nothing)
        regexParts.push('(?:.*)?');
      } else {
        // middle ** => any number of inner directories (including none)
        regexParts.push('(?:[^/]+/)*');
      }
      return;
    }
    // normal segment with * wildcards (no /)
    const reSeg = esc(seg).replace(/\*/g, '[^/]*');
    regexParts.push(reSeg + (i === lastIdx ? '' : '/'));
  });
  const rx = '^' + regexParts.join('') + '$';
  return new RegExp(rx).test(filePath);
}
