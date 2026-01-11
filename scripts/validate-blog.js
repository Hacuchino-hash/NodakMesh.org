#!/usr/bin/env node
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const CONTENT_DIRS = [
  './src/content/blog',
  './src/pages',
];

// Low-quality writing patterns to detect
const FLAGGED_PATTERNS = [
  // Filler transitions
  'in essence',
  'in other words',
  'in a nutshell',
  'in summary,',
  'to put it simply',

  // Marketing clichés
  'game-changer',
  'game changer',
  'at your fingertips',
  'without further ado',
  "let's dive into",
  "let's dive deep",
  'delve into',
  'embark on',

  // Formulaic openings
  'in this comprehensive guide',
  'in this article',
  "whether you're a beginner or",
  "whether you're new to",

  // Rhetorical AI patterns
  'the result\\?',
  'the answer\\?',
  'the solution\\?',
  'but what exactly',
  'so what exactly',

  // Over-enthusiasm
  'exciting world of',
  'powerful tool',
  'incredibly powerful',
  'truly revolutionary',

  // Filler phrases
  "it's worth noting that",
  'it goes without saying',
  'needless to say',
  'as you may know',
  'as we all know',
];

async function getAllFiles(dir, ext) {
  const files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...await getAllFiles(fullPath, ext));
      } else if (ext.some(e => entry.name.endsWith(e))) {
        files.push(fullPath);
      }
    }
  } catch (e) {
    // Directory doesn't exist, skip
  }
  return files;
}

async function validateContent() {
  let allFiles = [];
  for (const dir of CONTENT_DIRS) {
    allFiles.push(...await getAllFiles(dir, ['.md', '.astro']));
  }

  // Filter out template files
  allFiles = allFiles.filter(f => !f.includes('blog-template.md'));

  let violations = [];

  for (const filePath of allFiles) {
    const content = await readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    const shortPath = filePath.replace(/^\.\//, '');

    for (const pattern of FLAGGED_PATTERNS) {
      const regex = new RegExp(pattern, 'gi');
      lines.forEach((line, i) => {
        if (regex.test(line)) {
          violations.push({
            file: shortPath,
            line: i + 1,
            pattern: pattern.replace(/\\/g, ''),
            text: line.trim().substring(0, 80)
          });
        }
      });
    }
  }

  if (violations.length > 0) {
    console.error('\nContent quality check failed:\n');

    violations.forEach(v => {
      console.error(`  ${v.file}:${v.line}`);
      console.error(`     Flagged: "${v.pattern}"`);
      console.error(`     Context: "${v.text}..."\n`);
    });

    console.error(`Found ${violations.length} issue(s). Fix before publishing.\n`);
    process.exit(1);
  }

  console.log(`Checked ${allFiles.length} content files - all passed.\n`);
}

validateContent().catch(err => {
  console.error('Validation error:', err.message);
  process.exit(1);
});
