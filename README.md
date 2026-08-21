# tiff-software

The website for **Tiff Software Solutions** — a static [Astro](https://astro.build) site,
built from this repo and deployed to Netcup by GitHub Actions.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

`dist/` is the whole site as plain files. Nothing is edited on the server.

**Read `CLAUDE.md` before changing anything** — it carries the decisions, the brand
palette, and the two guards that stop a wrong deploy path from deleting a neighbouring
site on the shared Netcup account.
