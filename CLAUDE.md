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

The designer credit in the Downtown Auto Sales footer used to point at
`hoponeurope.com` — a hosting domain rather than a company, which is the impression this
site exists to correct. It points here now, and the contact address moved with it:
`info@tiff-software-solutions.com`, a real mailbox since 22 August 2026.

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
| **English and German** | English at `/`, German at `/de/` | Gianni sells to Alaska *and* to Bern. A Berner SME buys in German; an English-only site is not in that race at all. English stays the default because it is the wider net and the language the one shipped product is written in — flipping that is a routing change, not a rewrite. |
| **No contact form in v1** | `mailto:` and a phone number | A form needs a backend, which means somebody's personal data on a server, a privacy notice covering it, and spam. Add one when the mailto is demonstrably losing enquiries — not before. |
| **No prices** | "Talk to us" | What Tiff Cardealer Manager costs per month is still open (DAS-Manager §5). A number invented for a web page is a number you have to honour. |
| **The typefaces are served from this site** | `@fontsource/*`, imported in `Base.astro` | A `<link>` to fonts.googleapis.com sends every visitor's IP to Google before a word is on screen. On a site whose argument is that a business's data stays where it belongs — selling into Switzerland, where that transfer is a live legal question — borrowing a font that way contradicts the page it is setting. It is also faster: **a page load makes no request to any third party at all**, which is what lets `/privacy/` say so plainly. |
| **Nothing is invented** | No logos, no testimonials, no numbers | A small studio's credibility does not survive padding. Where a fact is not known the section renders nothing rather than a guess — see `OTHER_WORK` and `SITE.address` in `src/data/site.js`. |

---

## 2a. The two languages — 22 August 2026

Added after putting the site beside **pbits.ch**, an agency in the same city. Their page
says nothing specific and hides its navigation behind a hamburger on a 1500px screen; ours
is better made. **But theirs carries PostFinance and TWINT in a logo wall and a named
testimonial from a CIO, and it is in German.** Craft was not the gap. Proof and language
were, and only one of the two is ours to fix today.

**Every page is one bilingual component.** `src/components/pages/*.astro` holds both
languages' copy side by side and takes a `lang` prop; `src/pages/x.astro` and
`src/pages/de/x.astro` are three lines each. Two separate page trees would duplicate every
style block — a spacing fix would then need making twice, and the day somebody makes it
once is the day the two languages stop looking like one site.

**The German is written, not translated.** A word-for-word conversion of English marketing
copy reads like a word-for-word conversion. Sie-Form throughout; Du would read as a startup
addressing a garage owner.

**There is no `ß` anywhere and there must not be.** Switzerland dropped it — `Grösse`, not
`Größe`. A German keyboard produces one without thinking and a Swiss reader spots it
instantly, at which point the page reads as written by somebody from Germany, which for a
firm whose whole pitch is being local is the wrong first impression.

`scripts/check-german.mjs` runs after every build and fails on either an eszett in a German
page or a page that exists in one language and not the other — a language switch that lands
on a 404 is the one control that proves the German half is real. **Proved against both
faults deliberately introduced**, not only against a clean build.

**`src/i18n/ui.js` holds the navigation, the chrome strings and `localise()`.** One list,
two languages: a page added there appears in both or in neither. `Base.astro` emits
`hreflang` for both plus `x-default`, and `<html lang>` is `de-CH` rather than `de`.

**One layout defect the German found.** `.hero h1` was capped at `15ch`, tuned for English,
and the German headline wrapped to five lines. The cap is `16ch` and the headline was
shortened — *Betriebe* is what a Swiss tradesman calls his own business and is four letters
shorter than *Unternehmen*. Both languages now wrap to four lines. Longer words are a real
layout input, not a translation detail.

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

### The Node version lives in `.nvmrc` — 22 August 2026

**The very first run of this workflow failed**, and on nothing to do with Netcup: the
workflow said `node-version: '20'` while Astro 7 requires `>= 22.12`. It built here and
died on the runner, which is the worst shape a version mismatch takes — the machine that
would have caught it is the one that never runs the build.

`setup-node` now reads **`.nvmrc`**, and `package.json` declares
`engines.node: ">=22.12.0"`. One number, in a file whose whole job is to hold it, and a
declaration that makes a wrong local Node fail at install rather than at build.

The number typed into a workflow is the copy nobody looks at until it breaks.

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
| **The postal address** | for the imprint — the page says it is unfinished until then | `SITE.address` in `src/data/site.js` |
| **Four one-line descriptions** | Ride2Balkan, Frigemo *Post ist da*, Hijama, Handwerk. **I will not describe projects I have not seen** — a line written from a name is a guess on a public page. The Work page renders that section only when the list is non-empty. | `OTHER_WORK` in `src/data/site.js` |
| **Tif's permission** | to name Downtown Auto Sales in the case study | `work.astro`, `index.astro` |
| **A response time** | for `/contact/`, if he wants to promise one | `contact.astro` |
| **Netcup** | SSH or SFTP, and the document root for the new vhost | the four Action secrets, §5 |
| **Swiss UID** | `CHE-…`, if the business is registered | `SITE.uid` — the imprint section appears by itself |

**The domain is bought: `tiff-software-solutions.com`, at Netcup, 22 August 2026.**
`tiffsoftware.com` was taken, and the full name is the better answer anyway — it is what
the footer, the invoices and the email address all say, so nothing has to be abbreviated
to match it. `site:` in `astro.config.mjs` points at it.

**At go-live, in this order:** fill the postal address, remove the two `Disallow` lines
from `public/robots.txt`, then point the domain at the Netcup document root. Forgetting
the `robots.txt` line is how a finished site ends up asking Google to ignore it.
