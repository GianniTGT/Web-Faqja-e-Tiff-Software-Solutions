/**
 * The two languages, and everything that is not page copy.
 *
 * ── Why English is at the root and German lives under `/de/` ─────────────────
 * The company sells in Bern and to Alaska. English is the wider net and the language the
 * one shipped product is written in; German is the language a Berner SME actually buys in.
 * Neither is decoration, so neither is a machine translation of the other — the German
 * pages are written, not converted.
 *
 * If Bern becomes the main market, flipping the default is a routing change rather than a
 * rewrite: every page already reads its words from here and builds its links through
 * `localise()`.
 *
 * ── Swiss German, not German German ─────────────────────────────────────────
 * **There is no `ß` anywhere in this file and there must not be.** Switzerland dropped it;
 * `Grösse`, not `Größe`. A Swiss reader spots one instantly and reads the page as written
 * by somebody from Germany — which, for a firm whose whole pitch is being local and
 * personal, is the wrong first impression. `test/no-eszett.test.mjs` guards it.
 *
 * Sie-Form throughout. Du would read as a startup addressing a garage owner in Bern.
 */

export const LOCALES = ['en', 'de'];
export const DEFAULT_LOCALE = 'en';

/** `/services/` → `/de/services/` for German, unchanged for English. */
export function localise(path, lang) {
  if (lang === DEFAULT_LOCALE) return path;
  return `/${lang}${path}`;
}

/** The locale a URL belongs to — used by the header to mark the current page. */
export function localeFromPath(pathname) {
  const seg = pathname.split('/').filter(Boolean)[0];
  return LOCALES.includes(seg) && seg !== DEFAULT_LOCALE ? seg : DEFAULT_LOCALE;
}

/** The same page in the other language, for the switcher and for hreflang. */
export function otherLocaleHref(pathname, lang) {
  const bare = pathname.replace(/^\/de(?=\/|$)/, '') || '/';
  return lang === 'de' ? bare : localise(bare, 'de');
}

/**
 * Navigation. The paths are language-neutral and get their prefix from `localise()`, so a
 * page added here appears in both languages or in neither — which is the point.
 */
export const NAV = [
  { href: '/services/', en: 'Services', de: 'Leistungen' },
  { href: '/work/',     en: 'Work',     de: 'Referenzen' },
  { href: '/about/',    en: 'About',    de: 'Über uns' },
  { href: '/contact/',  en: 'Contact',  de: 'Kontakt' },
];

export const LEGAL = [
  { href: '/imprint/', en: 'Imprint', de: 'Impressum' },
  { href: '/privacy/', en: 'Privacy', de: 'Datenschutz' },
];

/** Everything a component prints that is not the page's own copy. */
export const UI = {
  en: {
    htmlLang: 'en',
    skip: 'Skip to content',
    mainNav: 'Main',
    footerNav: 'Footer',
    legalNav: 'Legal',
    home: 'home',
    site: 'Site',
    contact: 'Contact',
    /**
     * The switch is a globe, so this string is the whole of its accessible name — it is not
     * a caption beside a visible word, it *is* the control as far as a screen reader, a
     * tooltip and a voice command are concerned. So it names the destination rather than
     * the mechanism: "Auf Deutsch wechseln", not "Sprache wechseln", which would leave a
     * blind visitor pressing a button with two possible outcomes and no way to tell which.
     *
     * Written in the language it goes TO, which is the same reasoning the old text switch
     * used: the person who wants German reads German.
     */
    switchLabel: 'Auf Deutsch wechseln',
  },
  de: {
    htmlLang: 'de-CH',
    skip: 'Zum Inhalt springen',
    mainNav: 'Hauptnavigation',
    footerNav: 'Fusszeile',
    legalNav: 'Rechtliches',
    home: 'Startseite',
    site: 'Seiten',
    contact: 'Kontakt',
    switchLabel: 'Switch to English',
  },
};

/** The one-line description under the wordmark in the footer. */
export const TAGLINE = {
  en: 'Desktop applications, websites and the systems that join them — built for one ' +
      'business at a time, from Bern, Switzerland.',
  de: 'Desktop-Anwendungen, Websites und die Systeme dazwischen — für ein Unternehmen ' +
      'nach dem anderen, aus Bern.',
};
