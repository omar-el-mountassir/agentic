#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../../..');

const envPath = path.join(root, '.env');
const tplPath = path.join(root, 'LICENSE.template.md');
const outPath = path.join(root, 'LICENSE.md');

if (fs.existsSync(envPath)) dotenv.config({ path: envPath });

const licenseKey = process.env.WORKSPACE_LICENSE || '';

try {
  const tpl = fs.readFileSync(tplPath, 'utf8');
  const out = tpl.replace(/\{\{\s*WORKSPACE_LICENSE\s*\}\}/g, licenseKey);
  fs.writeFileSync(outPath, out, 'utf8');
  console.log(`Rendered LICENSE.md with license: ${licenseKey || '(missing)'}`);
} catch (e) {
  console.error(e);
  process.exit(1);
}
