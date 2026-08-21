import { defineConfig } from 'astro/config';

// The site's own address. Astro uses it for canonical URLs and the sitemap, so it has to
// be the real one — a wrong value here produces links that point at the wrong host and
// nothing complains. It is a placeholder until the domain is registered; changing it is
// one line and it is the first thing to do after buying the name.
export default defineConfig({
  site: 'https://tiffsoftware.com',
  // Plain files, no server. That is the whole point: the output of `npm run build` is a
  // folder that any web host can serve, which is why deployment is a copy rather than an
  // install.
  output: 'static',
  build: { format: 'directory' },

  // Whitespace between a word and an inline tag.
  //
  // On 21 August a built page read "…is on the<a href=\"/privacy/\">privacy page</a>" — the
  // newline before the link had been eaten, so the page said "theprivacy page". The source
  // was correct; only the output was wrong, which is why it survived review.
  //
  // **The cause is not established.** A clean rebuild does not reproduce it with this
  // setting either on or off, so blaming the compressor here would be writing down a guess
  // as a fact — and a wrong explanation in a config file costs the next session more than
  // no explanation at all. It is off because collapsing whitespace can only ever lose
  // information on a site this size, and the few kilobytes it saves are removed by gzip
  // anyway.
  //
  // `scripts/check-spacing.mjs` runs after every build and is the part that actually
  // protects the site: whatever eats the space, the guard sees the result.
  compressHTML: false,
});
