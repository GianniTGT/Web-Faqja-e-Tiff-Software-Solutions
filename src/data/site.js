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
 * Our own products. Status is one of `live`, `building`, `internal`, and the page prints it
 * as a small tag. Since 12 October 2026 every product that was «in development» is shown as «Im Einsatz» (Gianni's decision).
 *
 * Shape: { id, name, status, href?, en: { kind, line }, de: { kind, line } }
 */
export const PRODUCTS = [
  {
    id: 'tiffcore', name: 'TiffCore', status: 'live', href: 'https://tiffcore.ch',
    en: { kind: 'Software for building-services firms',
          line: 'Building services · Job report · QR invoice · Accounting' },
    de: { kind: 'Software für Haustechnik-Betriebe',
          line: 'Haustechnik · Rapport · QR-Rechnung · Buchhaltung' },
  },
  {
    id: 'tiffcar', name: 'TiffCar', status: 'live', href: 'https://tiffcar.ch',
    en: { kind: 'Software for Swiss car dealers',
          line: 'Car dealers · AutoScout24 · Workshop · Website' },
    de: { kind: 'Software für Autohändler in der Schweiz',
          line: 'Autohandel · AutoScout24 · Werkstatt · Website' },
  },
  {
    id: 'cardealer', name: 'Tiff Cardealer Manager', status: 'live',
    en: { kind: 'Desktop software for car dealers',
          line: 'Windows · Vehicles · Costs · Documents' },
    de: { kind: 'Desktop-Software für Autohändler',
          line: 'Windows · Fahrzeuge · Kosten · Dokumente' },
  },
  {
    id: 'theme', name: 'Tiff Cardealer Theme', status: 'live',
    en: { kind: 'Website for car dealers',
          line: 'WordPress · Inventory · Financing · Reviews' },
    de: { kind: 'Website für Autohändler',
          line: 'WordPress · Bestand · Finanzierung · Bewertungen' },
  },
  {
    id: 'rentacar', name: 'Tiff Rent a Car Manager', status: 'live',
    en: { kind: 'Software for car rental',
          line: 'Fleet · Availability · Booking' },
    de: { kind: 'Software für Autovermietungen',
          line: 'Flotte · Verfügbarkeit · Buchung' },
  },
  {
    id: 'nfc', name: 'Tiff NFC Reader', status: 'internal',
    en: { kind: 'Android app',
          line: 'NFC · Cards and tags · CSV export' },
    de: { kind: 'Android-App',
          line: 'NFC · Karten und Tags · CSV-Export' },
  },
  {
    id: 'apps', name: 'Diverse Android-Apps', status: 'live',
    en: { kind: 'Android apps',
          line: 'My TRT · Post ist da · Ride2Balkan' },
    de: { kind: 'Android-Apps',
          line: 'My TRT · Post ist da · Ride2Balkan' },
  },
];

/**
 * Work for clients — every project that has been done for somebody, on Gianni's instruction
 * of 12 October 2026: "alle Projekte, Webseiten oder sonst etwas für einen Kunden".
 *
 * **Named with permission.** Downtown Auto Sales since 30 August 2026; AINO Haustechnik
 * confirmed by Gianni on 12 October 2026. BIT Automobile was taken out again the same day:
 * the website is only a draft and TiffCar is not bought — add it back when it is.
 *
 * **Links only where the address has been checked.** `downtownautoak.com` answered 404 on
 * 30 August and has no `href` for that reason (see CLAUDE.md §2b).
 *
 * Shape: { name, place, href? } — names only, no list of what we delivered.
 */
export const CLIENTS = [
  { name: 'Downtown Auto Sales', place: 'Anchorage, Alaska' },
  { name: 'Downtown Auto AK', place: 'Anchorage, Alaska' },
  { name: 'Adams Tuning', place: '' },
  /* Gianni, 12 October 2026: the app by name only, without naming the company. */
  { name: 'Post ist da', place: '' },
  { name: 'Ride2Balkan', place: '', href: 'https://ride2balkan.com' },
  { name: 'AINO Haustechnik GmbH', place: 'Bern' },
];

/**
 * The people. Photos go in `public/team/<id>.webp` (or .jpg); until one is there the card
 * shows initials rather than a stock face — a borrowed face over a real name is the one
 * thing worse than no photo.
 */
export const TEAM = [
  { id: 'gianni', name: 'K. Tifeki', en: 'Owner & support', de: 'Inhaber & Support' },
  { id: 'sara', name: 'Sara', en: 'UI design', de: 'UI-Design' },
  { id: 'stefan', name: 'Stefan', en: 'Backend', de: 'Backend' },
];

/*
 * The navigation used to live here. It moved to `src/i18n/ui.js` when German was added,
 * because every entry now needs a label per language and a path that gets its locale
 * prefix from `localise()`. One list, two languages — a page added there appears in
 * both or in neither.
 */
/**
 * Prices on the services page. Change a number here (GitHub, pencil icon) and the site
 * rebuilds itself. Gianni, 12 October 2026.
 */
export const PREISE = {
  betreuung: 19,   // Website-Betreuung und Hosting, ab CHF … pro Monat
  schulung: 199,   // Schulung 2 Stunden, einmalig
};
