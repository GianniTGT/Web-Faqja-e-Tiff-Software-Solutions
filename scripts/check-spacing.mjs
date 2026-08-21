/**
 * Two words that ran together, and a page that ships saying "theprivacy page".
 *
 * A built page said exactly that on 21 August: the newline between "the" and a link had
 * been eaten somewhere between the source and the output, so the page read "theprivacy
 * page". The source was correct, which is why it survived review.
 *
 * **The cause was never established** — a clean rebuild does not reproduce it with the HTML
 * compressor either on or off. That is precisely the argument for this check: it reads the
 * **built** HTML rather than trusting a setting, so whatever eats the space, the guard sees
 * the result.
 *
 * Run by `npm run build`. A finding fails the build.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

/**
 * A word character pressed straight against an opening inline tag, or a closing inline tag
 * pressed straight against a word.
 *
 * `<b>s</b>` inside a word is legitimate — pluralising a bolded term — so the check ignores
 * a single character between the tags, which is the only shape that pattern takes.
 */
const OPEN = /[\p{L}\p{N},.;:!?)"'’”](<(?:a|em|strong|code|b|i|span)\b[^>]*>)/gu;
const CLOSE = /(<\/(?:a|em|strong|code|b|i|span)>)[\p{L}\p{N}]/gu;

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

const findings = [];
for await (const file of htmlFiles(DIST)) {
  const html = await readFile(file, 'utf8');
  for (const re of [OPEN, CLOSE]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(html)) !== null) {
      const from = Math.max(0, m.index - 28);
      const context = html.slice(from, m.index + m[0].length + 18).replace(/\s+/g, ' ');
      findings.push(`${file.replace(DIST, '')}: …${context}…`);
    }
  }
}

if (findings.length) {
  console.error(`\nWords run together against an inline tag — ${findings.length} place(s):\n`);
  findings.forEach((f) => console.error('  ' + f));
  console.error(
    '\nA space between a word and a tag has been lost between the source and the built ' +
    'page. Check the source first, then `compressHTML` in astro.config.mjs — which is off ' +
    'for this reason.\n',
  );
  process.exit(1);
}
console.log(`spacing: clean (${DIST.replace(process.cwd() + '/', '')})`);
