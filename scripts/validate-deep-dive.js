#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import Ajv from 'ajv';

const root = process.cwd();
const schemaPath = path.join(root, '.claude', 'knowledge', 'schema.json');
const digestPath = path.join(root, 'deep_dive_machine_actionable.json');

function readJson(p) {
  const s = fs.readFileSync(p, 'utf8');
  try {
    return JSON.parse(s);
  } catch (e) {
    console.error(`Invalid JSON in ${p}:`, e.message);
    process.exit(1);
  }
}

const schema = readJson(schemaPath);
const data = readJson(digestPath);

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);
const ok = validate(data);
if (!ok) {
  console.error(
    'Schema validation failed:\n',
    ajv.errorsText(validate.errors, { separator: '\n' })
  );
  process.exit(1);
}
console.log('Deep dive digest is valid.');
