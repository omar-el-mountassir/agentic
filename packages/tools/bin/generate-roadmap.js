#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Octokit } from '@octokit/rest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../../..');

const ownerRepo = process.env.GITHUB_REPOSITORY || '';
const [owner, repo] = ownerRepo.split('/');
const token = process.env.GITHUB_TOKEN;

async function main() {
  if (!owner || !repo) {
    console.error('GITHUB_REPOSITORY not set (owner/repo).');
    process.exit(1);
  }
  const octokit = new Octokit({ auth: token });
  const [milestonesRes, issuesRes] = await Promise.all([
    octokit.issues.listMilestones({ owner, repo, state: 'open' }),
    octokit.issues.listForRepo({ owner, repo, state: 'open', per_page: 100 })
  ]);

  const milestones = milestonesRes.data;
  const issues = issuesRes.data.filter(i => !i.pull_request);

  let md = `# ROADMAP\n\n`;
  if (milestones.length) {
    md += `## Milestones\n\n`;
    for (const m of milestones) {
      md += `- ${m.title} (${m.open_issues} open) — due ${m.due_on || 'TBD'}\n`;
    }
    md += `\n`;
  }
  md += `## Open Issues\n\n`;
  for (const i of issues) {
    md += `- #${i.number} ${i.title} (${i.state})\n`;
  }

  fs.writeFileSync(path.join(root, 'ROADMAP.md'), md, 'utf8');
  console.log('Generated ROADMAP.md');
}

main().catch((e) => { console.error(e); process.exit(1); });
