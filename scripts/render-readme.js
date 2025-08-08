#!/usr/bin/env node
/*
Simple templater: loads .env, replaces {{VAR}} in README.template.md, writes README.md
*/
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { renderTemplate } from "../packages/template/src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const envPath = path.join(root, ".env");
const templatePath = path.join(root, "README.template.md");
const outputPath = path.join(root, "README.md");

// Load .env
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.error(`.env not found at ${envPath}`);
  process.exit(1);
}

try {
  const tpl = fs.readFileSync(templatePath, "utf8");
  const missing = new Set();
  const rendered = renderTemplate(tpl, process.env, (k) => missing.add(k));
  fs.writeFileSync(outputPath, rendered, "utf8");
  const missMsg = missing.size ? ` (missing: ${[...missing].join(", ")})` : "";
  console.log(
    `Rendered README.md from README.template.md using .env${missMsg}`
  );
} catch (err) {
  console.error(err);
  process.exit(1);
}
