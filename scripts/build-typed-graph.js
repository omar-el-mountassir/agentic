#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const includeRoots = ['packages', 'src', 'scripts'];
const exts = new Set(['.js', '.ts', '.tsx']);

function walk(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (exts.has(path.extname(entry.name))) acc.push(full);
  }
}

function parseExports(file) {
  try {
    const txt = fs.readFileSync(file, 'utf8');
    const exports = [];
    const re = /export\s+(?:const|function|class|let|var|type|interface)\s+([A-Za-z0-9_]+)/g;
    let m;
    while ((m = re.exec(txt))) exports.push(m[1]);
    return exports;
  } catch {
    return [];
  }
}

const files = [];
for (const r of includeRoots) {
  const p = path.join(root, r);
  if (fs.existsSync(p)) walk(p, files);
}

const nodes = files.map((f) => ({ id: f.replace(root + path.sep, ''), exports: parseExports(f) }));
const graph = { generatedAt: new Date().toISOString(), nodes };

const outJson = path.join(root, 'docs', 'graph.json');
fs.mkdirSync(path.dirname(outJson), { recursive: true });
fs.writeFileSync(outJson, JSON.stringify(graph, null, 2), 'utf8');
console.log(`Wrote ${outJson} (${nodes.length} files)`);
