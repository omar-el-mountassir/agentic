#!/usr/bin/env node
/**
 * Verifies that package-lock.json is in sync with package.json.
 * Checks:
 *  - Root version match
 *  - All deps & devDeps present with identical spec strings
 *  - No stale entries (reports extras)
 */
import { readFileSync } from 'node:fs';

function fail(msg, details) {
  console.error('\n[check-lock] FAIL:', msg);  
  if (details && details.length) {
    for (const d of details) console.error('  -', d);  
  }
  process.exit(1);
}

function main() {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));

  // Support npm lockfile v3 structure
  const root = lock.packages?.[''];
  if (!root) fail('Structure inattendue dans package-lock.json: entrée racine manquante.');

  const problems = [];
  if (pkg.version !== lock.version) {
    problems.push(`Version root mismatch: package.json=${pkg.version} lock=${lock.version}`);
  }

  const wantDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const lockDeps = { ...(root.dependencies || {}), ...(root.devDependencies || {}) };

  for (const [name, spec] of Object.entries(wantDeps)) {
    if (!(name in lockDeps)) {
      problems.push(`Missing in lock: ${name} (spec ${spec})`);
      continue;
    }
    if (lockDeps[name] !== spec) {
      problems.push(`Spec mismatch ${name}: package.json=${spec} lock=${lockDeps[name]}`);
    }
  }
  for (const name of Object.keys(lockDeps)) {
    if (!(name in wantDeps)) {
      problems.push(`Extra in lock (not in package.json): ${name}`);
    }
  }

  if (problems.length) {
    fail('Lockfile out of sync. Exécute: npm install', problems);
  } else {
    console.log('[check-lock] OK: lockfile in sync');  
  }
}

try {
  main();
} catch (e) {
  fail('Erreur inattendue: ' + (e?.message || e));
}
