// Pure template renderer: replaces {{VAR}} with env[VAR]
// Preserves whitespace and unreplaced tokens become empty string with optional warning from caller.

export const VAR_PATTERN = /\{\{\s*([A-Z0-9_]+)\s*\}\}/g;

export function renderTemplate(content, env, onMissing) {
  if (typeof content !== 'string') throw new TypeError('content must be a string');
  const sourceEnv = env || {};
  return content.replace(VAR_PATTERN, (m, key) => {
    if (Object.prototype.hasOwnProperty.call(sourceEnv, key) && sourceEnv[key] !== undefined) {
      return String(sourceEnv[key]);
    }
    if (typeof onMissing === 'function') onMissing(key);
    return '';
  });
}
