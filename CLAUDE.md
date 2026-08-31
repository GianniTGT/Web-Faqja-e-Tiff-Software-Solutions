# CLAUDE.md — Tiff Software Solutions, the website

Read this first. It is the shared memory between sessions. **If a decision is not written
here, the next session will not know it** — that is the lesson the DAS-Manager repo bought
the hard way, and it is why this file exists on day one rather than after the first thing
is forgotten.

**Last updated: 30 August 2026**

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

## 2b. What changed on 30 August 2026

Four instructions from Gianni, and the one defect they turned up.

**The site speaks as "we" now, not as "I".** It used to open the About page with *"One
developer, in Bern."* and stay in the first person singular for seventy-odd sentences across
both languages. His instruction was plain: *not a one man company, just a small company.*
So: *"A small company, in Bern."* / *"Ein kleines Unternehmen, in Bern."*, and `wir`
throughout the German with Sie-Form untouched for the reader.

**This is a voice, not a fact about headcount, and the difference matters for edits.** The
page never says how many people there are, because it does not have to and because a number
would be a claim to keep true. What it no longer does is *volunteer* that there is one. Any
new copy follows the same rule — plural voice, no count.

Every replacement was a whole phrase checked to match exactly once, not a word swap: an
`I` → `we` pass hits the `I` inside words, and German `ich` is not the German `wir` in
every clause it appears in. Three survivors were caught only by grepping the **built** HTML
afterwards — *"something I built"*, *"das ich gebaut habe"*, *"ohne mich anzurufen"*. Grep
the output, not the source; the source is what you already believe is right.

**The language switch is a globe.** It used to print "Auf Deutsch" / "In English". A globe
carries less information, and that cost is paid back in the accessible name: `aria-label`
and `title` both say *"Auf Deutsch wechseln"* rather than "Sprache wechseln", because with
no visible word the label *is* the control. A flag was never an option — German is not
Germany, and Switzerland has four national languages.

**One layout defect, found by looking rather than by building.** Grouped with the nav in a
`.right` wrapper, the globe wrapped onto a *third* row at 412px — one small circle alone on
an empty line, which reads as a rendering fault. The nav and the switch are siblings of the
brand now; at phone width the globe stays on the brand's row and only the nav wraps. **The
build passed the whole time.** This is the third defect in this repo's history that only a
rendered screen has caught.

**The mark draws itself on the home page** — `AnimatedMark.astro`, gold tile in, green T,
then the white road stroking along its path, then one sheen. **Its static state is the
default and the keyframes only define what to start *from*** (`animation-fill-mode:
backwards`), so a browser that never runs it shows the finished logo rather than an empty
square. `prefers-reduced-motion` gets that same finished logo. It is CSS with no script, so
`/privacy/` stays true — verified by counting third-party requests in Chromium across all
30 render combinations: zero.

**The geometry is copied from `Mark.astro`, not imported.** The road has to be a stroke
with a `pathLength` before it can draw itself, and the tile and T have to move separately —
none of which is reachable through the existing component. If the mark is ever redrawn,
both files change.

---

### Downtown is two companies, and both their sites are broken — 30 August 2026

Gianni corrected an assumption this repo had written down twice, so it is recorded properly
rather than left to be re-derived:

| Domain | Company | Product |
|---|---|---|
| `downtownautosale.com` | **Downtown Auto Sales** — the dealer | Tiff Cardealer — the `/work/` case study |
| `downtownautoak.com` | **the car rental company** | Tiff Rent a Car Manager — an `OTHER_WORK` line |

**Two businesses with one owner, not one business with two products.** The apparent
contradiction between Gianni's project list and the case study — *Rent a Car Manager* at one
address, *Cardealer Manager* at the dealership — was never a contradiction. Anything that
treats the two rows as duplicating each other is wrong, and deleting either loses a real
customer.

**Both sites are broken today, and neither is linked from here because of it:**

- `downtownautoak.com` — **404** on every variant tried: http and https, apex and www. The
  http ones redirect to https and 404 there, so it is not a redirect problem.
- `downtownautosale.com` — serves a real page ("Downtownautosale LLC", ~98 KB) but **its
  TLS certificate has expired**, so a browser shows a security warning before any of it.
  Exactly the `test-tiff` failure mode the DAS project already recorded: a working site that
  looks dead.

**Check a link before publishing it, from somewhere that can actually reach it.** Three
external links were added to `OTHER_WORK` in one commit and none had been fetched; two were
broken. The sandbox proxy refuses these hosts, so `curl` from the netcup account through the
Novamira connector is the way to check — the same read-only route as §5. `ride2balkan.com`
was checked the same way and is genuinely fine (200, valid certificate), so its link stays.

---

## 2c. SEO, 30 August 2026 — and what is still not done

Gianni asked for SEO once the site was live. The technical base was already strong — static
pages with no scripts and no third-party requests, unique title and description per page in
both languages, canonical, `hreflang`, `sitemap.xml`. What was missing was of two kinds, and
**only one kind is code.**

**Titles now carry what people type, not what the page is called internally.** They read
`Services — Tiff Software Solutions` and `Leistungen — Tiff Software Solutions`; nobody
searches either. **The word "Bern" was in no title on the site**, only in descriptions,
and the title is the heavier signal.

| | English | German |
|---|---|---|
| Home | Software Development in Bern | Softwareentwicklung Bern |
| Services | Software & Web Development | Software- und Webentwicklung Bern |
| Work | Case Study: Dealership Software | Referenzen: Software für KMU |
| About | A Small Software Company in Bern | Softwarefirma in Bern |
| Contact | Contact a Developer in Bern | Kontakt: Softwareentwickler Bern |

**The German half carries the heavier local keywords deliberately.** English is the wider
net and reaches Anchorage; German is the half a Berner SME searches in, and that is where
"Bern" earns its place in every title. All ten land between 49 and 61 characters, so none is
truncated in a result. Imprint, privacy and 404 were left alone — legal pages do not compete
for anything.

**Structured data** — one `ProfessionalService` block per page, built in `Base.astro` from
`site.js` so the address can never disagree with the imprint. **No `priceRange`**, which
Google likes and §2 forbids: a band invented for a validator is a number Gianni then has to
honour.

**A sharing card at `/og.png`**, 1200×630, generated by `scripts/make-og.mjs` from the real
mark and the real typefaces. Committed rather than built, because it changes when the
wordmark does — roughly never — and wiring Chromium into `npm run build` to regenerate it
each time would be a poor trade. It is served from this domain like the fonts; a card on an
image CDN would be the third-party request `/privacy/` says does not exist.

### The two that matter most are not code — 30 August 2026

Worth stating plainly, because it is tempting to keep improving markup instead:

1. ~~**The site is not in Google Search Console.**~~ **Verified 31 August 2026**, as a
   *domain* property via a DNS TXT record — which covers `www`, `http`, `https` and every
   subdomain in one go, unlike a URL-prefix property. Sitemap submission and the first
   indexing request follow from there.
2. ~~**There is no Google Business Profile.**~~ **Created and verified 31 August 2026** —
   faster than the five days Google warned of. See below.

### The Business Profile, and the one thing it still needs — 31 August 2026

Live and managed, showing the Bern map, the phone number and the website. Set up as a
**Dienstleistungsunternehmen** — a service-area business — rather than a shopfront, because
Kasparstrasse 15 is a home address and **listing one you do not receive customers at is a
guideline breach Google suspends profiles for.** The address is used for verification and
stays private; the service area is Bern and Switzerland.

Category **Softwareunternehmen**, which is the same one devedis, BEGASOFT and avega carry —
the firms already holding the map pack for "Softwareentwicklung Bern". Not *Computerservice*,
which is IT support and repair, and which is what itnetX runs.

**SMS chat was deliberately switched off.** It sets an expectation of a fast reply, Google
measures whether that reply comes, and `/contact/` says nothing about a response time for
exactly the reason CLAUDE.md §6 records. Turn it on the day answering within hours is a
promise worth making.

**What is left is not a setting: four reviews.** The competitors above carry 10–19 each at
4.8–5.0, and that — not markup, not keywords — is what decides the map pack. Tif, Frigemo,
Adams Tuning and Ride2Balkan are real customers who can each write one. **Never offer
anything in return**: Google removes incentivised reviews and can suspend the profile.

A new profile with no reviews will show up for the company's own name and on Maps within
days. The top three for a competitive local query is months away and is not guaranteed.
The ordinary blue results below the map pack are a separate race, and that is the one the
site's own SEO work runs in.

**The logo and the sharing card are generated from the brand, not from a stock template** —
`scripts/make-og.mjs` produces the wide card, and the square logo is the same traced mark at
2048px. **Google rejects images under 10 KB**, and a 1024px PNG of three flat brand colours
compresses to 8.6 KB, so it was refused for being "too small" while being the right size in
pixels. Doubling the resolution to 2048 fixed it at 22.5 KB without touching the artwork.

### Where Search Console actually stands — 31 August 2026

Verified, sitemap submitted, and **"Sitemap wurde ohne Fehler verarbeitet" with all 14 URLs
discovered** — seven pages in each language, the same 14 the build emits. Same day, not the
several this was expected to take.

**Two things read as broken while they were merely new**, and both cost a round of worry:

- The URL inspection said *"Indexiert, obwohl durch robots.txt-Datei blockiert"*, quoting a
  crawl from **25 August** — before the `Disallow` came out. That was Google's cached copy,
  not the live file: fetching `/robots.txt` while claiming to be Googlebot returned
  `Allow: /`. It cleared by itself, which the successful sitemap read proves.
- Settings showed *"Keine robots.txt-Datei gefunden"* and *"Crawling-Statistiken: noch keine
  Daten"*. Those reports are built from a property's own crawl history, and the property was
  hours old. Empty meant new, not missing.

**Check the live file before believing a Search Console report about it.** Both panels
describe Google's record of the site, which lags the site itself by up to a day.

### What the TXT record cost, and why it is written down — 31 August 2026

Verification took five attempts, and **four of them failed for reasons that had nothing to
do with DNS being slow.** Worth recording, because the next person will hit the same traps:

1. **The token was transcribed from a screenshot and was truncated.** Google's dialog field
   is narrower than the value, so the tail sat out of view; 34 of the 43 characters were
   read and the rest were never seen. Google then reported *"we could not find your token"*
   while listing a token that looked identical — because the difference was off-screen at
   both ends. **Never retype a verification token. Use the provider's copy button, and
   paste it as text where it can be diffed.**
2. **netcup rejects mixed TTLs** across records sharing a host+type. The new TXT went in at
   86400 beside an SPF at 3600 and the save was refused. Match the existing TTL; never
   "fix" it by raising the SPF's, which is a working mail record.
3. **The row was edited on host `mail` rather than `@`.** The value was perfect and
   invisible to Google, since verification only ever reads the apex.
4. **A netcup field holds the value until the deploy button below the whole table is
   pressed.** What the browser shows is not what the zone has. The only proof is the
   message *"Die Bereitstellung der Zonenänderungen war erfolgreich."*

**The thing that actually resolved it was querying the authoritative nameservers directly**
— `netcup.firstns.cc` and `netcup.thirdns.de` — over raw UDP from the netcup account
through the Novamira connector. Public resolvers cache, so they cannot distinguish *"not
saved"* from *"saved, still propagating"*, and that distinction was the whole diagnosis
three times over. A small DNS client is in this conversation's history; `dig` is not
installed in the sandbox and DoH to a public resolver answers the wrong question.

**Two `google-site-verification` records are in the zone**, the truncated one and the real
one. Google matches if *any* TXT matches, so it verifies; the stale one should be deleted
once convenient. **The real one must never be removed** — Google re-checks it periodically
and removing it un-verifies the property.

Neither is in this repo, so neither will show up as an undone task in the code. That is
exactly why they are written here.

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

### The plan gives SSH — and the Action still cannot use it — 30 August 2026

The open question above was whether netcup gives SSH or only SFTP, on the assumption that
SSH meant `rsync` and SFTP meant `lftp`. **It is SSH, and neither answer is right.**

The account is a chroot: `/var/www/vhosts/hosting243104.af92d.netcup.net/` contains its own
`bin`, `etc`, `lib` and `usr`, and `etc/passwd` inside it gives `hosting243104` a real
`/bin/bash`. That `bin` is curated, and what it holds decides the workflow:

| Present | `bash` `git` `curl` `wget` `scp` `sftp` `ssh` `tar` `zip` `unzip` `php` `mysql` `nano` `vim` |
|---|---|
| **Absent** | **`rsync`** — and **`lftp`** |

`rsync` needs the binary at *both* ends, so `.github/workflows/deploy.yml` dies at its last
step the moment the four secrets are set. Everything before that step is correct. **The
transport is the only wrong part, and replacing it is a decision rather than a patch** —
either ask netcup to add `rsync` to the jail, or `scp` a tarball and `tar -xf` it on the far
side, which needs nothing that is not already there. The step is left intact with the
finding written above it, so whoever chooses can see what it was meant to do.

**Three of the four secrets are known now**, read off the account rather than guessed:

| Secret | Value |
|---|---|
| `NETCUP_USER` | `hosting243104` |
| `NETCUP_PATH` | `/var/www/vhosts/hosting243104.af92d.netcup.net/tiff-software-solutions.com/httpdocs` |
| `NETCUP_HOST` | `hosting243104.af92d.netcup.net` |
| `NETCUP_SSH_KEY` | **still missing.** `.ssh/` holds an `id_rsa` — *do not reuse it*, §5 wants a deploy-only key — and **no `authorized_keys` at all**, so inbound key auth is not set up yet. |

That path is six segments deep, so it clears the depth guard, and `.tiff-deploy-target` is
sitting in it, so it clears the marker guard too.

### `--delete` would have broken the certificate — 30 August 2026

The docroot contains `.well-known/acme-challenge/`, holding a Let's Encrypt challenge and a
Plesk `.htaccess` that keeps the HTTP→HTTPS redirect from swallowing the validation.
`dist/` has no such directory, so `rsync --delete` would have removed it — and the damage
would not show up until a renewal failed up to ninety days later, which is the worst shape
a bug can take. `--exclude '.well-known/'` is in the workflow now, beside the marker
exclusion and for the same reason.

### How the server was read without SSH credentials — 30 August 2026

Worth writing down because it is not obvious and it will be useful again: **the Novamira MCP
connector for `hoponeurope.com` reaches this account's filesystem.** That WordPress lives at
`ride2balkan.com/httpdocs` on the *same* netcup account, and its `execute-php` ability runs
with `open_basedir` set to the whole vhost root — so every sibling docroot, this site's
included, is readable from it. `novamira/list-directory` is sandboxed to the WP install and
refuses; `execute-php` with `scandir` is not.

That is how the file inventory, the `bin` listing and the secret values above were obtained
with no SSH key and no panel access. **Read-only, and it should stay that way** — it is a
connector into a different customer-facing site, and using it to write into this one would
put two unrelated projects one typo apart.

---

## 6. What the site has to say

Every small studio site claims it builds beautiful, reliable software. None of that is
evidence. **The evidence already exists:**

- **Downtown Auto Sales** — an encrypted desktop application, a WordPress theme, and a
  sync between them that publishes vehicles while every purchase price and margin stays on
  the office machine. A real constraint, honoured. **This is the lead case study, and one
  told properly beats five thin ones.**
  **Named on 30 August 2026** — Gianni confirmed Tif's permission, which is whose it was to
  give. It appears in the lede, the glance card and the meta description of `/work/`, and in
  the "Built for" row on the home page. **Not in the twenty sentences that go on to say "the
  dealership"**: swapping every one for the proper noun reads like a press release, and a
  name works once. Screens are still a separate question and have not been asked about.
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
- **`robots.txt` allows everything, since 30 August 2026.** It held `Disallow: /` while the
  domain still pointed at netcup's parking page. The block is deleted rather than commented
  out — a commented-out `Disallow` is one careless uncomment away from being live again.
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
| ~~The postal address~~ | **Done 30 August 2026** — Kasparstrasse 15, 3027 Bern. The imprint's unfinished notice disappeared by itself, and the footer prints it too. | `SITE.address` |
| ~~Four one-line descriptions~~ | **Done 30 August 2026**, in Gianni's own words. Not Hijama or Handwerk — he named Ride2Balkan, *Post ist da* (Frigemo AG), Adams Tuning and downtownautoak.com instead. | `OTHER_WORK` |
| ~~Netcup: SSH or SFTP~~ | **Answered 30 August 2026 — see §5.** SSH, but no `rsync` in the jail. | the workflow, §5 |
| ~~Tif's permission~~ | **Given, 30 August 2026.** Downtown Auto Sales is named in the case study. | `Work.astro`, `Home.astro` |
| ~~Which product downtownautoak.com runs~~ | **Answered 30 August 2026 — see below.** Two companies, one owner. No inconsistency after all. | `OTHER_WORK` |
| **Two dead links, both the owner's to fix** | `downtownautoak.com` answers 404 on every variant; `downtownautosale.com` serves but its TLS certificate has expired. Neither is linked from this site until they work. | tell Gianni |
| **Screens** | never asked about. The case study is words only; a screenshot of Tif's inventory is a separate permission. | `Work.astro` |
| **A response time** | for `/contact/`, if he wants to promise one | `contact.astro` |
| **Swiss UID** | `CHE-…`, if the business is registered | `SITE.uid` — the imprint section appears by itself |

**The domain is bought: `tiff-software-solutions.com`, at Netcup, 22 August 2026.**
`tiffsoftware.com` was taken, and the full name is the better answer anyway — it is what
the footer, the invoices and the email address all say, so nothing has to be abbreviated
to match it. `site:` in `astro.config.mjs` points at it.

### The DNS has moved — resolved 30 August 2026

`tiff-software-solutions.com` and `www.` both answer **46.38.249.45**, the hosting IP, not
the `46.38.243.234` parking IP below. The zone was rewritten inside netcup's stated 48
hours and no support ticket was needed. The section that follows is kept as the record of
where it stood while it was still moving.

**The site is live and current.** All 41 files of a fresh `dist/` match the server byte for
byte — every page in both languages, the CSS, all twenty font files, the sitemap. Two
strays are up there that should not be: `tiffsoftwarewebsite20260822.zip` (380 KB, publicly
downloadable at its own URL) and `_astro/Page.dg68rrbr.css`, an orphan from an earlier
build. Delete both; nothing references either.

### The domain is registered and the DNS has not moved — 23 August 2026

Where this actually stands, because the paragraph above says the domain is bought and
stops there.

| | |
|---|---|
| Registered | Netcup, 22 August 2026 |
| Assigned to | hosting *Hosting243104 - Webhosting 8000 NUE (af92d)* in the panel |
| Files | uploaded to `/tiff-software-solutions.com/httpdocs` |
| The panel says the site's IP is | `46.38.249.45` |
| Public DNS still answers | `46.38.243.234` — **Netcup's parking IP** |

So everything on Netcup's side is in place and **only the zone has not been rewritten
yet.** Netcup's own registration email allows up to 48 hours, which expires around
**22:00 UTC on 23 August**. If it has not moved by then it is a support ticket, not
something to keep watching — the domain is assigned to the hosting in the panel and the
files are there, so the zone serving a parking IP is theirs to fix.

**Checking it needs the public resolvers over raw UDP.** `dig` is not installed in a
Claude Code sandbox and DNS-over-HTTPS is blocked by the proxy, so use a small Python DNS
client against `1.1.1.1`, `8.8.8.8` and `9.9.9.9` with the recursion-desired bit set.
**Not `getent` or `socket.getaddrinfo`** — those read a local cache and will happily
report a stale answer as fact.

**Do not hammer Netcup's own authoritative nameservers.** On 22 August at 13:07 UTC all
five returned SERVFAIL — including for `hoponeurope.com` and `ride2balkan.com`, which have
worked for months. That was rate limiting, and for a few minutes it looked like a broken
zone. Query them once at most and treat SERVFAIL as *unknown, try later*.

### The site is live, and verified against the repo — 30 August 2026

Uploaded by hand through the panel's File Manager and checked from outside afterwards.
**All 43 files of `dist/` match the server byte for byte** — every page in both languages,
the CSS, all twenty font files, `robots.txt`, `sitemap.xml`, `favicon.svg`.

| Request | Result |
|---|---|
| `http://tiff-software-solutions.com/` | 301 → https, then **200** |
| `https://tiff-software-solutions.com/` | **200**, certificate valid |
| `https://tiff-software-solutions.com/de/work/` | **200** — "Referenzen — Tiff Software Solutions" |
| `https://tiff-software-solutions.com/robots.txt` | **200** |
| `https://www.tiff-software-solutions.com/` | **200** since the certificate was reissued — see below |

**`www` was not on the certificate, and now is.** It failed with `SSL: no alternative
certificate subject name matches target hostname` — the panel's "www-Domain nicht
geschützt" warning, and real: anybody typing `www.` met a browser security warning on a
site that otherwise worked. Gianni reissued the Let's Encrypt certificate in the netcup
panel with the www alias ticked, which was all it needed.

Verified from outside: `DNS:tiff-software-solutions.com, DNS:www.tiff-software-solutions.com`,
issued by Let's Encrypt, valid to **28 November 2026**. Both hostnames answer 200 over
http and https.

**`www` serves the site rather than redirecting to the apex**, so both hostnames return
identical pages. That is fine as it stands and needs no rewrite rule: every page carries
`<link rel="canonical">` and all three `hreflang` links pointing at the **apex**, because
they are built from `site:` in `astro.config.mjs`. Checked on the live `www` pages, not
assumed. **If `site:` is ever wrong, this is one of the things that silently breaks** —
which is the warning §7 already gives about that value.

**Four strays were deleted the same day**, on Gianni's go: `site.zip` and
`tiffsoftwarewebsite20260822.zip` (upload archives, both publicly downloadable once
`robots.txt` started allowing crawlers) and `_astro/Page.dg68rrbr.css` plus
`_astro/Page.D_UyVdrX.css` (stylesheets orphaned by later builds). 801 KB in total, and
`https://tiff-software-solutions.com/site.zip` answers 404 now.

**Each was checked for references before it was removed, not merely eyeballed** — every
served `.html`, `.xml`, `.txt`, `.css` and `.js` read and searched for the filename, with a
stray citing itself not counting. All four came back at zero. The four paths were written
out literally in the delete script; no glob, nothing that could widen on a typo, which is
the same reasoning as §5's two rsync guards.

**The docroot is now 45 files: the 43 of `dist/` plus the two in `.well-known/`**, which
were deliberately left alone — that is Let's Encrypt's, and taking it is the renewal bug §5
describes.

Uploading a zip over a directory adds; it never removes. Cleaning up by hand worked once
and does not scale, which is the whole argument for `rsync --delete` once §5's transport
question is settled.

### The upload failure was a stale panel session — 30 August 2026

Worth one line so the next person does not go looking at the server. Plesk's File Manager
answered **"No upload response — Einige Dateien wurden aufgrund eines Fehlers nicht
hochgeladen"**. Nothing on the server was wrong: 3.6 TB free, `upload_max_filesize` 256M
against a 392 KB file, docroot writable, and no partial file left behind. **The panel
session had simply expired.** Logging in again and repeating the upload worked first time.

### The certificate has to come before the first visit

The hosting has **"301 redirect HTTP to HTTPS" switched on with no certificate selected.**
So the moment DNS resolves, a browser is redirected to `https://` and meets a security
warning — which looks exactly like a broken deployment and is not one.

**Get the Let's Encrypt certificate in the Netcup panel first, then open the site.** Same
shape as the `test-tiff` lesson in the DAS project: a certificate a browser will not trust
makes a working site look dead, and the diagnosis costs more than the fix.

### Deploying is a hand-uploaded ZIP until the Action's secrets exist

§5 describes the GitHub Action, and it is right — but its four secrets
(`NETCUP_HOST`, `NETCUP_USER`, `NETCUP_SSH_KEY`, `NETCUP_PATH`) are **not set**, so
nothing deploys automatically yet. Until they are:

```bash
npm run build
cd dist && zip -r ../site.zip . -x '.DS_Store'   # the CONTENTS of dist/, not the folder
```

**Zip the contents, not the directory** — uploading `dist/` itself puts every page one
level too deep and every URL 404s. **Include `.tiff-deploy-target`**; it is the marker the
Action checks for, and losing it means re-creating it by hand later (§5).

Then it goes to Gianni through the chat and he uploads it in the panel's file manager.
A Claude Code web session cannot carry it there itself — the network policy refuses the
host, and relaying binary through a transcript does not survive (the same finding the DAS
project recorded for the team photographs).

**All three go-live steps are done** as of 30 August 2026: the postal address is in, the
`Disallow` lines are gone, and the domain resolves to the hosting. What is left is not
go-live work — it is the case-study naming question above, and the deploy transport in §5.
