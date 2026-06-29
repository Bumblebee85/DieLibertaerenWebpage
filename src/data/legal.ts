/**
 * Offizielle Angaben für Impressum und Datenschutzerklärung.
 * Bei Änderungen hier und auf den Rechtsseiten aktualisieren.
 */
export const legal = {
  organization: "DIE LIBERTÄREN e.V.",
  organizationShort: "DIE LIBERTÄREN",

  /** Geschäftsanschrift (§ 5 DDG) */
  streetAddress: {
    street: "Wallbergstraße 4",
    postalCode: "83620",
    city: "Feldkirchen-Westerham",
    country: "Deutschland",
  },

  /** Postanschrift */
  postalAddress: {
    postbox: "Postfach 75 02 07",
    postalCode: "81332",
    city: "München",
    country: "Deutschland",
  },

  register: {
    number: "VR 209533",
    court: "Amtsgericht München",
  },

  representatives: [
    { name: "Dr. Mathias Hummel", role: "Bundesvorsitzender" },
    { name: "Florian Handwerker", role: "Bundesgeschäftsführer" },
  ],

  /** § 18 Abs. 2 MStV – verantwortlich für redaktionelle Inhalte */
  contentResponsible: {
    name: "Florian Handwerker",
    role: "Bundesgeschäftsführer",
    address: "Wallbergstraße 4, 83620 Feldkirchen-Westerham",
  },

  contact: {
    email: "management@die-libertaeren.de",
    emailPublic: "info@die-libertaeren.de",
    phone: "+49 159 06320502",
  },

  privacy: {
    contactEmail: "management@die-libertaeren.de",
    supervisoryAuthority: "Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)",
    supervisoryAuthorityUrl: "https://www.lda.bayern.de",
    lastUpdated: "2026-06-29",
  },

  hosting: {
    provider: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
    privacyUrl: "https://vercel.com/legal/privacy-policy",
  },

  database: {
    provider: "MongoDB Atlas (MongoDB, Inc.)",
    region: "EU-Rechenzentrum (sofern in Atlas konfiguriert)",
    privacyUrl: "https://www.mongodb.com/legal/privacy-policy",
  },
} as const;