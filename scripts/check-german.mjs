/**
 * Two things about the German pages that nothing else would catch.
 *
 * **1. No `ß`.** Switzerland dropped it: `Grösse`, not `Größe`. A German keyboard and a
 * German-trained instinct produce it without thinking, and a Swiss reader spots one
 * immediately — the page then reads as written by somebody from Germany, which for a firm
 * whose whole pitch is being local and personal is the wrong first impression. It is the
 * kind of mistake that never fails a build and never looks wrong to the person who made it.
 *
 * **2. Both languages have the same pages.** A German page that exists in `src/` but was
 * never routed, or an English page with no German counterpart, is a language switch that
 * lands somebody on a 404 — and the switch is the one control on the site that proves the
 * German half is real.
 *
 * Reads the built output, because that is what a reader gets.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

const problems = [];
const pages = { en: new Set(), de: new Set() };

for await (const file of htmlFiles(DIST)) {
  const rel = relative(DIST, file);
  const html = await readFile(file, 'utf8');

  if (rel.startsWith('de/')) {
    pages.de.add(rel.slice(3));
    let idx = html.indexOf('ß');
    while (idx !== -1) {
      const word = html.slice(Math.max(0, idx - 20), idx + 12).replace(/\s+/g, ' ');
      problems.push(`${rel}: eszett in “…${word}…” — Switzerland writes ss`);
      idx = html.indexOf('ß', idx + 1);
    }
  } else if (rel !== '404.html') {
    pages.en.add(rel);
  }
}

for (const page of pages.en) {
  if (!pages.de.has(page)) problems.push(`no German counterpart for /${page}`);
}
for (const page of pages.de) {
  if (!pages.en.has(page)) problems.push(`no English counterpart for /de/${page}`);
}

if (problems.length) {
  console.error(`\nGerman pages — ${problems.length} problem(s):\n`);
  problems.forEach((p) => console.error('  ' + p));
  console.error('');
  process.exit(1);
}
console.log(`german: clean (${pages.de.size} pages, both languages in step)`);
