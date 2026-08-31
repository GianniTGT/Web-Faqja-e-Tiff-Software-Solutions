/**
 * Regenerate `public/og.png`, the card people see when the site is shared.
 *
 * **Not part of `npm run build`, on purpose.** The card changes when the wordmark or the
 * tagline changes, which is roughly never, and wiring a headless browser into every build
 * would make `npm run build` depend on Chromium being installed. So the PNG is committed
 * and this script exists to reproduce it — the same bargain as any generated file that is
 * cheaper to store than to rebuild.
 *
 *   node scripts/make-og.mjs        # English, public/og.png
 *   node scripts/make-og.mjs de     # German,  public/og-de.png
 *
 * **Two cards, because the site is two sites.** A German page sharing an English card is
 * the same fault as a German page with an English title, and `/de/` is the half a Berner
 * SME reads. The German headline is the one from `Home.astro`, not a translation of the
 * English card — the same rule `src/i18n/ui.js` sets for every other string.
 *
 * Needs `playwright` and a Chromium. In the Claude Code sandbox one is already at
 * /opt/pw-browsers; set OG_CHROMIUM to point elsewhere.
 *
 * **The fonts are embedded as data URIs rather than linked**, because the card is rendered
 * from a `file://` page and a relative `@font-face` src would silently fall back to a
 * system font — silently being the problem. Poppins Bold is the wordmark's typeface; the
 * whole point of the card is that it looks like the site.
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/**
 * Both cards carry the page's own headline, copied from `Home.astro` rather than restated,
 * so the card and the page it represents cannot drift apart.
 *
 * The German headline is nine characters longer, which at 74px overflowed the card's height
 * — so it sets one step smaller. The English size is not reduced to match: making the wider
 * language pay for the narrower one is how both end up looking cramped.
 */
const CARDS = {
  en: {
    out: 'public/og.png',
    headline: 'Software small businesses can actually run.',
    place: 'Bern, Switzerland',
    size: 74,
  },
  de: {
    out: 'public/og-de.png',
    headline: 'Software, mit der kleine Betriebe wirklich arbeiten.',
    place: 'Bern, Schweiz',
    size: 62,
  },
};

const lang = (process.argv[2] || 'en').toLowerCase();
const card = CARDS[lang];
if (!card) {
  console.error(`og: no card for '${lang}'. Known: ${Object.keys(CARDS).join(', ')}`);
  process.exit(1);
}

const OUT = card.out;
const WIDTH = 1200;
const HEIGHT = 630;

/* The colours are the brand package's, as literals — the same decision `Mark.astro`
   records. A card that recoloured itself with a CSS token would drift from the logo. */
const FOREST = '#16653C';
const GOLD = '#C9A053';
const INK = '#1C1C1E';
const PAPER = '#FBFAF7';

const b64 = (p) => readFileSync(p).toString('base64');
const poppins = b64('node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff2');
const plex = b64('node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:P;src:url(data:font/woff2;base64,${poppins}) format('woff2');font-weight:700}
@font-face{font-family:X;src:url(data:font/woff2;base64,${plex}) format('woff2');font-weight:400}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${WIDTH}px;height:${HEIGHT}px;background:${PAPER};
  background-image:radial-gradient(90% 70% at 6% -12%, rgba(22,101,60,.13), transparent 62%);
  display:flex;flex-direction:column;justify-content:space-between;padding:74px 78px;
  font-family:X,system-ui,sans-serif;color:${INK}}
.top{display:flex;align-items:center;gap:22px}
.wm{font-family:P;font-size:26px;letter-spacing:.13em;text-transform:uppercase;font-weight:700}
.wm b{color:${FOREST}}
h1{font-family:P;font-weight:700;font-size:${card.size}px;line-height:1.08;letter-spacing:-.02em;max-width:16ch}
.foot{display:flex;align-items:center;justify-content:space-between;
  border-top:2px solid ${GOLD};padding-top:26px;font-size:25px;color:#55564F}
.foot b{color:${FOREST};font-weight:400}
</style></head><body>
<div class="top">
  <svg width="78" height="78" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="${GOLD}"/>
    <path d="M80 72h352v109H80z M201 72h110v368H201z" fill="${FOREST}"/>
    <path d="M119 125.5H190a65 65 0 0 1 65 65V400" fill="none" stroke="#FFF" stroke-width="38"/>
  </svg>
  <span class="wm">Tiff <b>Software Solutions</b></span>
</div>
<h1>${card.headline}</h1>
<div class="foot"><span>${card.place}</span><b>tiff-software-solutions.com</b></div>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'tiff-og-'));
const page_path = join(dir, 'og.html');
writeFileSync(page_path, html);

const browser = await chromium.launch(
  process.env.OG_CHROMIUM ? { executablePath: process.env.OG_CHROMIUM } : {},
);
const ctx = await browser.newContext({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto('file://' + page_path, { waitUntil: 'networkidle' });
/* Screenshotting before the faces are decoded produces a card set in the fallback, which
   looks close enough to pass a glance and wrong to anybody who knows the wordmark. */
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: OUT });
await browser.close();

console.log(`og: wrote ${OUT} (${WIDTH}×${HEIGHT}, ${lang})`);
