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
   * **Null until Gianni supplies it, and the imprint page says so on its face rather than
   * quietly rendering a gap.** A Swiss or German visitor reads the imprint to decide
   * whether this is a real business; an address invented to fill the layout would be a
   * false statement in the one place the law asks for a true one.
   *
   * Fill in `street`, `postcode` and `town` and the notice disappears by itself.
   */
  address: null,
  // address: { street: '…', postcode: '…', town: 'Bern', country: 'Switzerland' },

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
 * **Empty on purpose, and the Work page renders nothing while it is.** The projects exist
 * — Ride2Balkan, the Frigemo *Post ist da* app, the Hijama app, Handwerk — but I have not
 * seen four of them and a description written from a name is a guess printed on a public
 * page over Gianni's own firm. One true line each and the section appears by itself.
 *
 * Shape: { name, line, href? }
 */
export const OTHER_WORK = [];

/** The navigation, in one array so the header and the footer cannot drift apart. */
export const NAV = [
  { href: '/services/', label: 'Services' },
  { href: '/work/',     label: 'Work' },
  { href: '/about/',    label: 'About' },
  { href: '/contact/',  label: 'Contact' },
];

/**
 * The legal pages, kept out of `NAV` on purpose.
 *
 * They belong in the footer, where somebody looks for them, and not in a five-item main
 * navigation where they would compete with the pages that sell the work. In the DACH
 * region their *absence* is what gets noticed, not their prominence.
 */
export const LEGAL = [
  { href: '/imprint/', label: 'Imprint' },
  { href: '/privacy/', label: 'Privacy' },
];
