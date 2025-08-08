/**
 * Pattern matching tokens of the form {{TOKEN_NAME}} where TOKEN_NAME is [A-Z0-9_]+.
 */
export const VAR_PATTERN = /\{\{\s*([A-Z0-9_]+)\s*\}\}/g;

/**
 * Render a template by replacing {{VARS}} with values from the provided environment mapping.
 *
 * Inputs:
 * - content: string template text
 * - env: record mapping token names to values
 * - onMissing: optional callback invoked with token name when value is missing
 *
 * Returns: rendered string with tokens replaced; missing tokens become empty strings.
 */
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
