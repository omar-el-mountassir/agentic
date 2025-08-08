#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

function getRecentCommits(limit = 15) {
  const format = `%h|%ad|%an|%s`;
  const log = sh(`git log -n ${limit} --date=short --pretty=format:"${format}"`);
  return log.split('\n').map((line) => {
    const [hash, date, author, subject] = line.split('|');
    return { hash, date, author, subject };
  });
}

function toMarkdown(commits) {
  let md = `# Quick Start: What Changed Recently\n\n`;
  md += `This page summarizes recent work in ~5 minutes.\n\n`;
  for (const c of commits) {
    md += `- ${c.date} [${c.hash}]: ${c.subject} — _${c.author}_\n`;
  }
  md += `\nTips:\n\n- Run tests: \`npm test\`\n- Regenerate README: \`npm run render:readme\`\n- Generate docs: \`npm run docs\`\n`;
  return md;
}

const root = process.cwd();
const outPath = path.join(root, 'docs', 'QUICKSTART.md');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
const commits = getRecentCommits(20);
fs.writeFileSync(outPath, toMarkdown(commits), 'utf8');
console.log(`Wrote ${outPath}`);
