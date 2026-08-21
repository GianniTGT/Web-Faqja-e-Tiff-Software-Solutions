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
| **The typefaces are served from this site** | `@fontsource/*`, imported in `Base.astro` | A `<link>` to fonts.googleapis.com sends every visitor's IP to Google before a word is on screen. On a site whose argument is that a business's data stays where it belongs — selling into Switzerland, where that transfer is a live legal question — borrowing a font that way contradicts the page it is setting. It is also faster: **a page load makes no request to any third party at all**, which is what lets `/privacy/` say so plainly. |
| **Nothing is invented** | No logos, no testimonials, no numbers | A small studio's credibility does not survive padding. Where a fact is not known the section renders nothing rather than a guess — see `OTHER_WORK` and `SITE.address` in `src/data/site.js`. |

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

**All eight pages are built, 21 August 2026:** home, services, work, about, contact,
imprint, privacy, and a 404. Rendered in Chromium at 1280 light, 1280 dark and 412 phone —
24 combinations, zero console errors and zero horizontal overflow on every one.

- **`/work/` is the one case study, told at length.** The dealership is **described, not
  named** — "a used-car dealership in Anchorage, Alaska". Naming a customer on a public page
  is their permission to give; one line in `work.astro` and `index.astro` the day Tif says
  yes.
- **`/services/` says when each service is the wrong answer.** Unusual on a page meant to
  sell, and deliberate: a studio that tells you not to buy something is the one you believe
  when it says you should.
- **`/contact/` has no form and no promised response time.** The form is §2's decision. The
  response time is missing because one that gets broken on a busy week is worse than none —
  Gianni adds it the day he wants to stand behind it.
- **`/imprint/` states on its face that it is unfinished** while `SITE.address` is null,
  rather than rendering a tidy gap. Same reasoning as a missing translation key rendering
  the key: a blank space hides the mistake, and this is the one page where a gap is a legal
  problem rather than a cosmetic one.
- **`/privacy/` is short because the site genuinely does very little** — no cookies, no
  analytics, no form, no third-party request. **Every claim on it is checkable against the
  built output, and that is a maintenance obligation:** the day somebody adds a map embed,
  a video player or a Google Fonts link, that page becomes a false statement. Keep it in the
  same commit.

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

### The space that disappeared — 21 August 2026

A built page read *"…is on the<a href=\"/privacy/\">privacy page</a>"*, so it said
**"theprivacy page"** on screen. The newline between the word and the link had been eaten
somewhere between the source and the output. **The source was correct**, which is exactly
why it survived being read.

**The cause was never established, and that is written down rather than guessed at.** The
first diagnosis was Astro's HTML compressor; a clean A/B rebuild does not reproduce it with
`compressHTML` either on or off, so blaming the compressor would have put a wrong
explanation into a config file — which costs the next session more than no explanation.
It is off anyway, because collapsing whitespace can only lose information on a site this
size and gzip removes what it saves.

**`scripts/check-spacing.mjs` is the part that actually protects the site.** It reads the
**built** HTML after every build and fails on a word pressed against an inline tag, in
either direction. Whatever eats the space, the guard sees the result.

**It was proved against a deliberately broken copy of the built site**, not only against a
clean one — a check that has never seen the thing it checks for is a check nobody should
trust. That is the same lesson the DAS repo records for its React-hooks parser.

A single character between tags is ignored, because `<b>s</b>` pluralising a bolded term is
legitimate and a rule that flagged it would be a rule somebody switches off.

---

## 8. Open

**The repo does not exist on GitHub yet.** The GitHub App cannot create one — it answers
`403 Resource not accessible by integration` — so Gianni opens it empty as
`GianniTGT/tiff-software`, private, no README, and the local commits push straight into it.

Waiting on a person, none of it code:

| | What is needed | Where it goes |
|---|---|---|
| **The domain** | `tiffsoftware.com` is taken. Not chosen yet. | `site:` in `astro.config.mjs`, and this file |
| **The postal address** | for the imprint — the page says it is unfinished until then | `SITE.address` in `src/data/site.js` |
| **The email address** | `info@hoponeurope.com` today; moves when the domain has a mailbox | `SITE.email`, one line |
| **Four one-line descriptions** | Ride2Balkan, Frigemo *Post ist da*, Hijama, Handwerk. **I will not describe projects I have not seen** — a line written from a name is a guess on a public page. The Work page renders that section only when the list is non-empty. | `OTHER_WORK` in `src/data/site.js` |
| **Tif's permission** | to name Downtown Auto Sales in the case study | `work.astro`, `index.astro` |
| **A response time** | for `/contact/`, if he wants to promise one | `contact.astro` |
| **Netcup** | SSH or SFTP, and the document root for the new vhost | the four Action secrets, §5 |
| **Swiss UID** | `CHE-…`, if the business is registered | `SITE.uid` — the imprint section appears by itself |

**At go-live, in this order:** fill the address, set `site:`, remove the two `Disallow`
lines from `public/robots.txt`, then point the domain. Forgetting the last two is how a
finished site ends up asking Google to ignore it.
