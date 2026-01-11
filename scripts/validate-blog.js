#!/usr/bin/env node
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const BLOG_DIR = './src/content/blog';

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

async function validateBlogPosts() {
  const files = await readdir(BLOG_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md') && f !== 'blog-template.md');

  let violations = [];

  for (const file of mdFiles) {
    const content = await readFile(join(BLOG_DIR, file), 'utf-8');
    const lines = content.split('\n');

    for (const pattern of FLAGGED_PATTERNS) {
      const regex = new RegExp(pattern, 'gi');
      lines.forEach((line, i) => {
        if (regex.test(line)) {
          violations.push({
            file,
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

  console.log(`Checked ${mdFiles.length} blog posts - all passed.\n`);
}

validateBlogPosts().catch(err => {
  console.error('Validation error:', err.message);
  process.exit(1);
});
