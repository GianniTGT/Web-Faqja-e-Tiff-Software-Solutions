/**
 * The sitemap, generated at build time from the pages that exist.
 *
 * Hand-rolled rather than pulling in `@astrojs/sitemap`, for one reason: this site has
 * five URLs and the integration would be a dependency to keep updated for a file that fits
 * on a screen. The moment there is a blog with generated routes, swap it — a hand-listed
 * sitemap that goes stale is worse than none.
 *
 * `robots.txt` disallows everything until go-live, so nothing reads this yet. It is here
 * so the go-live is one edit to one file rather than two things to remember.
 */
import { NAV, LEGAL } from '../data/site.js';

const PATHS = ['/', ...NAV.map((n) => n.href), ...LEGAL.map((n) => n.href)];

export function GET({ site }) {
  const urls = PATHS.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
