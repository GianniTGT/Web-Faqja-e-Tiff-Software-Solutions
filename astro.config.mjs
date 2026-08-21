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
});
