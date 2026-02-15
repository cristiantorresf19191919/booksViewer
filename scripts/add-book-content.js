#!/usr/bin/env node

/**
 * Script to add new paragraphs to a book's content.json file.
 *
 * Usage:
 *   node scripts/add-book-content.js <book-id> <raw-text-file>
 *
 * Example:
 *   node scripts/add-book-content.js economic-indicators public/book_raw.txt
 *
 * The raw text file should contain the new content separated by double newlines.
 * The script will append the new paragraphs to the existing content.json file.
 */

const fs = require('fs');
const path = require('path');

const BOOKS_DIR = path.join(__dirname, '..', 'public', 'data', 'books');

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node scripts/add-book-content.js <book-id> <raw-text-file>');
    console.log('');
    console.log('Available book IDs:');
    const books = fs.readdirSync(BOOKS_DIR).filter(f =>
      fs.statSync(path.join(BOOKS_DIR, f)).isDirectory()
    );
    books.forEach(b => console.log(`  - ${b}`));
    process.exit(1);
  }

  const bookId = args[0];
  const rawTextFile = args[1];

  const bookDir = path.join(BOOKS_DIR, bookId);
  const contentFile = path.join(bookDir, 'content.json');

  if (!fs.existsSync(bookDir)) {
    console.error(`Error: Book directory not found: ${bookDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(rawTextFile)) {
    console.error(`Error: Raw text file not found: ${rawTextFile}`);
    process.exit(1);
  }

  // Read existing content
  let existingContent = { paragraphs: [] };
  if (fs.existsSync(contentFile)) {
    try {
      existingContent = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
    } catch (e) {
      console.error(`Error reading existing content: ${e.message}`);
      process.exit(1);
    }
  }

  // Read new raw text
  const rawText = fs.readFileSync(rawTextFile, 'utf8');

  // Split into paragraphs (double newline separator)
  const newParagraphs = rawText
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  if (newParagraphs.length === 0) {
    console.log('No new paragraphs found in the raw text file.');
    process.exit(0);
  }

  // Append new paragraphs
  const previousCount = existingContent.paragraphs.length;
  existingContent.paragraphs.push(...newParagraphs);

  // Write updated content
  fs.writeFileSync(contentFile, JSON.stringify(existingContent, null, 2));

  console.log(`✓ Added ${newParagraphs.length} paragraphs to ${bookId}`);
  console.log(`  Previous: ${previousCount} paragraphs`);
  console.log(`  New total: ${existingContent.paragraphs.length} paragraphs`);
  console.log(`  Output: ${contentFile}`);
}

main();
