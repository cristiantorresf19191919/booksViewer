#!/usr/bin/env node
/**
 * Parses pasted book text into book_content.json.
 * Usage:
 *   1. Paste the full book text into app/public/book_raw.txt
 *   2. Run: node scripts/parse-book-content.js
 * Output: app/public/data/book_content.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const INPUT = path.join(ROOT, "public", "book_raw.txt");
const OUTPUT = path.join(ROOT, "public", "data", "book_content.json");

if (!fs.existsSync(INPUT)) {
  console.error("Missing app/public/book_raw.txt – paste your book text there first.");
  process.exit(1);
}

const raw = fs.readFileSync(INPUT, "utf-8");
const paragraphs = raw
  .split(/\n\s*\n/)
  .map((p) => p.trim())
  .filter((p) => p.length > 0);

const bookContent = { paragraphs };
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(bookContent), "utf-8");
console.log(`Wrote ${OUTPUT} with ${paragraphs.length} paragraphs.`);
