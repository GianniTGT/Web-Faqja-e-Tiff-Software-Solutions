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
 * as a small tag — a product still being built is named as such, never dressed up as shipped.
 *
 * Shape: { id, name, status, href?, en: { kind, line }, de: { kind, line } }
 */
export const PRODUCTS = [
  {
    id: 'tiffcore', name: 'TiffCore', status: 'live', href: 'https://tiffcore.ch',
    en: { kind: 'Software for building-services firms',
          line: 'Job reports on the phone, quotes, Swiss QR invoices and payment matching in one system — from the site visit to the paid invoice.' },
    de: { kind: 'Software für Haustechnik-Betriebe',
          line: 'Rapport am Handy, Offerte, QR-Rechnung und Zahlungsabgleich in einem System — vom Einsatz vor Ort bis zur bezahlten Rechnung.' },
  },
  {
    id: 'tiffcar', name: 'TiffCar', status: 'building',
    en: { kind: 'Software for Swiss car dealers',
          line: 'Vehicles by VIN or type approval, AutoScout24, quote to QR invoice, a workshop board and a dealer website with live stock.' },
    de: { kind: 'Software für Autohändler in der Schweiz',
          line: 'Fahrzeuge per VIN oder Typengenehmigung, AutoScout24, Offerte bis QR-Rechnung, Werkstatt und eine eigene Händler-Website mit Live-Bestand.' },
  },
  {
    id: 'cardealer', name: 'Tiff Cardealer Manager', status: 'live',
    en: { kind: 'Desktop software for car dealers',
          line: 'A Windows application for vehicles, costs, documents and payments. Encrypted on the dealer\u2019s own machine, publishing to the website by itself.' },
    de: { kind: 'Desktop-Software für Autohändler',
          line: 'Eine Windows-Anwendung für Fahrzeuge, Kosten, Dokumente und Zahlungen. Verschlüsselt auf dem eigenen Rechner, mit automatischer Veröffentlichung auf der Website.' },
  },
  {
    id: 'theme', name: 'Tiff Cardealer Theme', status: 'live',
    en: { kind: 'Website for car dealers',
          line: 'A WordPress theme written from scratch: inventory, search, financing enquiries and reviews, fed straight from the office.' },
    de: { kind: 'Website für Autohändler',
          line: 'Ein von Grund auf geschriebenes WordPress-Theme: Bestand, Suche, Finanzierungsanfragen und Bewertungen, direkt aus dem Büro gespeist.' },
  },
  {
    id: 'rentacar', name: 'Tiff Rent a Car Manager', status: 'live',
    en: { kind: 'Software for car rental',
          line: 'Fleet, availability per vehicle and request-based booking that cannot double-book.' },
    de: { kind: 'Software für Autovermietungen',
          line: 'Flotte, Verfügbarkeit pro Fahrzeug und Buchung auf Anfrage, die nicht doppelt vergeben kann.' },
  },
  {
    id: 'nfc', name: 'Tiff NFC Reader', status: 'internal',
    en: { kind: 'Android app',
          line: 'Reads and writes NFC cards and tags, names them — staff, equipment — and exports the list as CSV.' },
    de: { kind: 'Android-App',
          line: 'Liest und beschreibt NFC-Karten und Tags, benennt sie — Mitarbeiter, Equipment — und exportiert die Liste als CSV.' },
  },
  {
    id: 'hijama', name: 'Hijama Guide', status: 'building',
    en: { kind: 'Mobile app',
          line: 'A companion app with a Hijri calendar, guide and diary, in German, English, Albanian and Arabic.' },
    de: { kind: 'Mobile App',
          line: 'Eine Begleit-App mit Hijri-Kalender, Ratgeber und Tagebuch, in Deutsch, Englisch, Albanisch und Arabisch.' },
  },
];

/**
 * Work for clients — every project that has been done for somebody, on Gianni's instruction
 * of 12 October 2026: "alle Projekte, Webseiten oder sonst etwas für einen Kunden".
 *
 * **Named with permission.** Downtown Auto Sales since 30 August 2026; AINO Haustechnik and
 * BIT Automobile confirmed by Gianni on 12 October 2026.
 *
 * **Links only where the address has been checked.** `downtownautoak.com` answered 404 on
 * 30 August and has no `href` for that reason (see CLAUDE.md §2b).
 *
 * Shape: { name, place, href?, en: [what…], de: [what…] }
 */
export const CLIENTS = [
  { name: 'Downtown Auto Sales', place: 'Anchorage, Alaska',
    en: ['Tiff Cardealer Manager', 'Website and WordPress theme'],
    de: ['Tiff Cardealer Manager', 'Website und WordPress-Theme'] },
  { name: 'Downtown Auto AK', place: 'Anchorage, Alaska',
    en: ['Tiff Rent a Car Manager', 'Website with online booking', 'Logo and brand'],
    de: ['Tiff Rent a Car Manager', 'Website mit Online-Buchung', 'Logo und Marke'] },
  { name: 'Adams Tuning', place: '',
    en: ['Tiff Cardealer Manager'],
    de: ['Tiff Cardealer Manager'] },
  { name: 'Frigemo AG', place: 'Cressier',
    en: ['\u00abPost ist da\u00bb — a reception terminal that tells staff, in their own language, that a delivery has arrived'],
    de: ['\u00abPost ist da\u00bb — ein Empfangsterminal, das Mitarbeitende in ihrer Sprache über eine Lieferung informiert'] },
  { name: 'Ride2Balkan', place: '', href: 'https://ride2balkan.com',
    en: ['Website', 'SEO', 'Android app'],
    de: ['Website', 'SEO', 'Android-App'] },
  { name: 'AINO Haustechnik GmbH', place: 'Bern',
    en: ['Website'],
    de: ['Website'] },
  { name: 'BIT Automobile', place: 'Oberwangen bei Bern',
    en: ['Website', 'TiffCar'],
    de: ['Website', 'TiffCar'] },
];

/**
 * The people. Photos go in `public/team/<id>.webp` (or .jpg); until one is there the card
 * shows initials rather than a stock face — a borrowed face over a real name is the one
 * thing worse than no photo.
 */
export const TEAM = [
  { id: 'gianni', name: 'Gianni Tifeki', en: 'Owner & support', de: 'Inhaber & Support' },
  { id: 'sara', name: 'Sara', en: 'UI design', de: 'UI-Design' },
  { id: 'stefan', name: 'Stefan', en: 'Backend', de: 'Backend' },
];

/*
 * The navigation used to live here. It moved to `src/i18n/ui.js` when German was added,
 * because every entry now needs a label per language and a path that gets its locale
 * prefix from `localise()`. One list, two languages — a page added there appears in
 * both or in neither.
 */