/**
 * Everything about the business that appears in more than one place.
 *
 * The same rule the DAS-Manager handover records as §5, applied to the vendor rather than
 * to a dealer: a name typed into twenty files is a name that disagrees with itself after a
 * rename. The email in particular is temporary — it points at hoponeurope.com until the
 * new domain has a mailbox — so it must be one value, not a search-and-replace.
 */
export const SITE = {
  name: 'Tiff Software Solutions',
  short: 'Tiff',
  person: 'Kani Tifeki',
  city: 'Bern',
  country: 'Switzerland',

  /**
   * A real mailbox on the company's own domain since 22 August 2026.
   *
   * It read `info@hoponeurope.com` until then — the hosting domain rather than the
   * company's, which is exactly the impression this site exists to correct.
   */
  email: 'info@tiff-software-solutions.com',

  /**
   * The registered postal address, for the imprint.
   *
   * Supplied by Gianni on 30 August 2026. Until then this was `null` and `/imprint/`
   * rendered a visible "this page is not finished" notice rather than a tidy gap — a Swiss
   * or German visitor reads the imprint to decide whether this is a real business, and it
   * is the one page where a blank is a legal problem rather than a cosmetic one.
   *
   * The notice disappears by itself now that the three fields are here.
   */
  address: { street: 'Kasparstrasse 15', postcode: '3027', town: 'Bern', country: 'Switzerland' },

  /** Swiss commercial register number (CHE-…), if the business is registered. Optional. */
  uid: null,

  tagline: 'Software small businesses can actually run.',
  description:
    'Desktop applications, websites and the systems that join them — built for one ' +
    'business at a time, from Bern, Switzerland.',
};

/**
 * Other work, one line each — no case study.
 *
 * **Every line here is Gianni's own wording, not a description written from a name.** The
 * list sat empty until 30 August 2026 for exactly that reason: a sentence invented around a
 * project title is a guess printed on a public page over his own firm. What he supplied is
 * short, so these stay short — a line that says only what is known beats one padded out to
 * match the width of the column.
 *
 * **Both languages, because the Work page is bilingual.** A single `line` would print
 * English on `/de/work/`, which is the one place a Berner SME is reading.
 *
 * Shape: { name, en, de, href? }
 */
export const OTHER_WORK = [
  {
    name: 'Ride2Balkan',
    href: 'https://ride2balkan.com',
    en: 'Website, SEO, and the Android app.',
    de: 'Website, SEO und die Android-App.',
  },
  {
    name: 'Post ist da',
    en: 'An Android application. Client: Frigemo AG.',
    de: 'Eine Android-Anwendung. Kunde: Frigemo AG.',
  },
  {
    name: 'Adams Tuning',
    en: 'Running on Tiff Cardealer Manager.',
    de: 'Arbeitet mit Tiff Cardealer Manager.',
  },
  {
    name: 'downtownautoak.com',
    href: 'https://downtownautoak.com',
    en: 'Tiff Rent a Car Manager, in Anchorage, Alaska.',
    de: 'Tiff Rent a Car Manager, in Anchorage, Alaska.',
  },
];

/*
 * The navigation used to live here. It moved to `src/i18n/ui.js` when German was added,
 * because every entry now needs a label per language and a path that gets its locale
 * prefix from `localise()`. One list, two languages — a page added there appears in
 * both or in neither.
 */