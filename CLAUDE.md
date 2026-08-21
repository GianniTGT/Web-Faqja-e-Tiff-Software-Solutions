# CLAUDE.md — Tiff Software Solutions, the website

Read this first. It is the shared memory between sessions. **If a decision is not written
here, the next session will not know it** — that is the lesson the DAS-Manager repo bought
the hard way, and it is why this file exists on day one rather than after the first thing
is forgotten.

**Last updated: 21 August 2026**

---

## 1. What this is

The website for **Tiff Software Solutions** — Gianni's own firm. Not a product, not a
customer's site: the place a small business decides whether to trust him.

Until this exists, the designer credit in the Downtown Auto Sales footer points at
`hoponeurope.com`, which is a hosting domain rather than a company.

**Sister repo:** `GianniTGT/DAS-Manager` — the desktop application and the WordPress theme
for the first customer. Its `CLAUDE.md` is where the brand package, the licensing decision
and the Downtown Auto Sales story are recorded. **This site's first case study comes from
there.**

---

## 2. The decisions already made

| | | Why |
|---|---|---|
| **Static, not WordPress** | Astro, output `static` | The firm sells fast, carefully made software. A WordPress install with plugins argues the opposite. Eight pages that change a few times a year do not need a database. |
| **The repo is the source of truth** | Every change is a commit | The DAS site works the other way round — site first, repo second — and that is exactly the arrangement that produced its 18 August outage. Nothing here is edited on the server. |
| **No MCP connection** | Novamira is a WordPress plugin | With a static site a Claude Code session already has more than a connector gives: it writes the pages, renders them in a real browser, and the Action deploys. Reviewable before it ships, revertible after. |
| **English only** | For now | Gianni sells to Alaska. Built so German can be added later without a rewrite. |
| **No contact form in v1** | `mailto:` and a phone number | A form needs a backend, which means somebody's personal data on a server, a privacy notice covering it, and spam. Add one when the mailto is demonstrably losing enquiries — not before. |
| **No prices** | "Talk to us" | What Tiff Cardealer Manager costs per month is still open (DAS-Manager §5). A number invented for a web page is a number you have to honour. |

---

## 3. The brand is not chosen here

`src/styles/tokens.css` carries the palette, and it comes from the brand package Gianni
generated in August 2026 — the same values the desktop app's installer icon is drawn from:

| Role | Hex |
|---|---|
| Forest green | `#16653C` |
| Gold | `#C9A053` |
| Neutral ink | `#1C1C1E` |

**Deliberately not the DAS navy `#08318B`.** That is the dealership's colour and it stays
on the dealership's documents.

Type: **Poppins** for display, because the TIFF wordmark is Poppins Bold. **IBM Plex Sans**
for body and **IBM Plex Mono** for addresses and paths.

---

## 4. Commands

```bash
npm install        # once
npm run dev        # local, with hot reload
npm run build      # → dist/, which is the whole site as plain files
npm run preview    # serve dist/ exactly as the server will
```

**`dist/` is the deliverable.** Nothing else is uploaded, and nothing on the server is
edited by hand.

---

## 5. Deployment — and the one thing that could go badly

`.github/workflows/deploy.yml` builds on every push to `main` and copies `dist/` to Netcup
over SSH.

**The Netcup account is shared with `hoponeurope.com` and `ride2balkan.com`.** A deploy
path wrong by one directory, combined with `rsync --delete`, deletes somebody else's
website. Two guards stand between a typo and that:

1. **The path must look like a document root** — not empty, not `/`, not `~`, and at least
   three segments deep.
2. **The remote directory must already contain `.tiff-deploy-target`.** If the marker is
   not there, the path is wrong and the deploy stops before rsync runs.

### The first deploy is done by hand, once, on purpose

The marker cannot create itself — a deploy that made its own marker would defeat the check
it exists for. So the very first time, after confirming the document root really is the
new site's and nothing else's:

```bash
ssh <user>@<host> "touch '<docroot>/.tiff-deploy-target'"
```

Do this against a **throwaway subdomain first**, and let a build run to it, before the real
domain points anywhere. Prove the path while there is nothing to lose.

### Secrets, in GitHub → Settings → Secrets and variables → Actions

| Name | What |
|---|---|
| `NETCUP_HOST` | the SSH host |
| `NETCUP_USER` | the SSH user |
| `NETCUP_SSH_KEY` | a **deploy-only** private key, not a personal one |
| `NETCUP_PATH` | the absolute document root, no trailing slash |

**With any of them missing the workflow builds and then stops with a notice** rather than
failing red or, worse, deploying somewhere wrong. That is deliberate: the repo is useful
before the server exists.

*To check on the netcup plan:* whether it gives SSH or only SFTP. With SSH the Action uses
`rsync`; with SFTP only, it needs `lftp` instead. Four lines of the workflow, nothing else.

---

## 6. What the site has to say

Every small studio site claims it builds beautiful, reliable software. None of that is
evidence. **The evidence already exists:**

- **Downtown Auto Sales** — an encrypted desktop application, a WordPress theme, and a
  sync between them that publishes vehicles while every purchase price and margin stays on
  the office machine. A real constraint, honoured. **This is the lead case study, and one
  told properly beats five thin ones.**
  **Ask Tif before publishing his business's name and screens.** It is his company on the page.
- Ride2Balkan, the Frigemo *Post ist da* app, the Hijama app, Handwerk — named, one line
  each, no case study needed yet.

Pages planned: home, services, work, about, contact, and **Impressum + privacy**. The last
is not optional decoration: Gianni is in Switzerland, and in the DACH region a business
site without an Impressum is the first thing a Swiss or German client notices.

---

## 7. How to work in this repo

- **Render it and look at it before shipping.** Not "the build passed" — open the page in a
  browser at phone width and at desktop. Three separate bugs on the DAS project got past
  passing tests because nobody opened the screen.
- **Never edit anything on the server.** If it is not in the repo, it does not exist.
- **`robots.txt` currently disallows everything.** Remove those two lines at go-live.
  Forgetting is how a finished site ends up asking Google to ignore it.
- **`site:` in `astro.config.mjs` is a placeholder** until the domain is registered. A wrong
  value there makes every canonical URL point at the wrong host and nothing complains.

---

## 8. Open

- **The domain.** `tiffsoftware.com` is taken. Not yet chosen — see the chat of 21 August.
- **Which email address** the site publishes. Currently `info@hoponeurope.com`, which
  changes when the domain lands.
- **Netcup: SSH or SFTP**, and the document root for the new vhost.
- **Tif's permission** for the Downtown Auto Sales case study.
