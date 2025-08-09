#!/usr/bin/env node
/**
 * Meta repository checks:
 *  - CHANGELOG structure lint
 *  - Package versions homogeneity across packages/*
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function fail(msg, details) {
  console.error('\n[check-meta] FAIL:', msg);
  if (details?.length) for (const d of details) console.error('  -', d);
  process.exit(1);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function lintChangelog(rootVersion) {
  const problems = [];
  let content;
  try {
    content = readFileSync('CHANGELOG.md', 'utf8');
  } catch {
    problems.push('CHANGELOG.md manquant');
    return problems;
  }
  const lines = content.split(/\r?\n/);
  if (!/^# Changelog\s*$/.test(lines[0])) problems.push("Première ligne doit être '# Changelog'");
  const unreleasedIdx = lines.findIndex((l) => /^## \[Unreleased\]/i.test(l));
  if (unreleasedIdx === -1) problems.push('Section Unreleased absente');
  const versionHeader = new RegExp(
    `^## \\[${rootVersion.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\]`
  );
  if (!lines.some((l) => versionHeader.test(l)))
    problems.push(`Entrée version actuelle absente: ${rootVersion}`);
  return problems;
}

function checkPackageVersions(rootVersion) {
  const problems = [];
  let entries = [];
  try {
    entries = readdirSync('packages');
  } catch {
    return problems;
  }
  for (const name of entries) {
    const dir = join('packages', name);
    try {
      const st = statSync(dir);
      if (!st.isDirectory()) continue;
      const pkgPath = join(dir, 'package.json');
      try {
        const pkg = readJson(pkgPath);
        if (pkg.version && pkg.version !== rootVersion) {
          problems.push(`Version mismatch ${name}: ${pkg.version} != ${rootVersion}`);
        }
      } catch {
        /* ignore if no package.json */
      }
    } catch {
      /* ignore */
    }
  }
  return problems;
}

function main() {
  const rootPkg = readJson('package.json');
  const version = rootPkg.version;
  const problems = [];
  problems.push(...lintChangelog(version));
  problems.push(...checkPackageVersions(version));
  if (problems.length) fail('Meta checks failed', problems);
  console.log('[check-meta] OK');
}

try {
  main();
} catch (e) {
  fail('Erreur inattendue: ' + (e?.message || e));
}
