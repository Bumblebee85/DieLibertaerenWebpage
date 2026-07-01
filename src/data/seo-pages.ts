import type { PageSeoInput } from "@/lib/seo/metadata";

/** Zentrale SEO-Texte für statische Seiten – natürlich formuliert, keyword-optimiert. */
export const seoPages = {
  home: {
    title: "Libertäre Partei für Freiheit, Eigentum & freien Markt",
    description:
      "DIE LIBERTÄREN: Deutschlands konsequente libertäre Partei für individuelle Freiheit, Nichtaggressionsprinzip, Eigentumsschutz, Minimalstaat und freie Marktwirtschaft – freiheitlich aus Prinzip.",
    path: "/",
    keywords: [
      "Libertarismus",
      "Freiheit",
      "liberale Partei Deutschland",
      "Minimalstaat",
      "Nichtaggressionsprinzip",
      "Eigentum",
      "freier Markt",
      "libertäre Partei",
    ],
  },
  prinzipien: {
    title: "Unsere Prinzipien – Libertarismus & Nichtaggressionsprinzip",
    description:
      "Individuelle, vertragliche und gesellschaftliche Freiheit: Die drei Säulen von DIE LIBERTÄREN. Eigentum, freiwillige Kooperation und das Nichtaggressionsprinzip als Fundament.",
    path: "/unsere-prinzipien",
    keywords: [
      "Nichtaggressionsprinzip",
      "individuelle Freiheit",
      "Libertarismus",
      "Eigentum",
      "freiwillige Kooperation",
      "libertäre Prinzipien",
    ],
  },
  programm: {
    title: "Programm & Thesenpapier v4 – Minimalstaat & Freiheit",
    description:
      "Das libertäre Programm von DIE LIBERTÄREN: Thesenpapier v4 mit Leitbild, Grundthese, freiem Markt, Eigentumsschutz, Sezession und konkreten Maßnahmen für mehr Freiheit.",
    path: "/programm",
    keywords: [
      "libertäres Programm",
      "Minimalstaat",
      "Thesenpapier",
      "freier Markt",
      "Sezession",
      "Eigentumsschutz",
      "DIE LIBERTÄREN Programm",
    ],
  },
  blog: {
    title: "Blog – Libertärer Gedanke, Freiheit & aktuelle Themen",
    description:
      "Artikel zu Libertarismus, Freiheit, Eigentum, Steuern, freiem Markt und Politik – plus der wöchentliche libertäre Aufsatz von DIE LIBERTÄREN.",
    path: "/blog",
    keywords: [
      "libertärer Blog",
      "Libertarismus Artikel",
      "Freiheit Politik",
      "Eigentum Steuern",
      "freier Markt",
    ],
  },
  events: {
    title: "Events & libertäre Stammtische in Deutschland",
    description:
      "Veranstaltungen, Stammtische und Termine von DIE LIBERTÄREN – triff Gleichgesinnte und diskutiere Freiheit, Libertarismus und Minimalstaat vor Ort.",
    path: "/events",
    keywords: [
      "libertärer Stammtisch",
      "libertäre Veranstaltungen",
      "Freiheit Treffen",
      "DIE LIBERTÄREN Events",
    ],
  },
  wahlomat: {
    title: "Libertärer Kompass – Stimmst du mit uns überein?",
    description:
      "Vergleiche deine Positionen mit DIE LIBERTÄREN: 80 Thesen zu Freiheit, Eigentum, Minimalstaat und freiem Markt – plus interaktiver Schnell-Check im Libertären Kompass.",
    path: "/stimmst-du-mit-uns-ueberein",
    keywords: [
      "Libertärer Kompass",
      "libertäre Positionen",
      "Freiheit Test",
      "DIE LIBERTÄREN Thesen",
    ],
  },
  mitmachen: {
    title: "Mitmachen – Engagiere dich für Freiheit",
    description:
      "Werde aktiv bei DIE LIBERTÄREN: Mitglied werden, spenden, Stammtische besuchen oder im Netzwerk mitwirken – für Libertarismus und Freiheit in Deutschland.",
    path: "/mitmachen",
    keywords: ["libertär mitmachen", "Freiheit engagieren", "libertäre Partei Mitglied"],
  },
  mitglied: {
    title: "Mitglied werden – Teil der Freiheitspartei",
    description:
      "Werde Mitglied bei DIE LIBERTÄREN – der konsequentesten libertären Partei Deutschlands für Freiheit, Eigentum und Minimalstaat.",
    path: "/werde-mitglied",
    keywords: ["libertäre Partei Mitglied", "DIE LIBERTÄREN Mitgliedschaft", "Freiheit Partei"],
  },
  spenden: {
    title: "Spenden – Unterstütze die Freiheitsbewegung",
    description:
      "Spende an DIE LIBERTÄREN und unterstütze den konsequenten Libertarismus, Eigentumsschutz und den Kampf für einen Minimalstaat in Deutschland.",
    path: "/spenden",
    keywords: ["libertäre Partei spenden", "Freiheit unterstützen", "DIE LIBERTÄREN Spende"],
  },
  unterstuetzer: {
    title: "Unterstützer werden – Spende für Freiheit",
    description:
      "Unterstütze DIE LIBERTÄREN per Überweisung, PayPal oder Krypto. Keine staatliche Finanzierung – freiwillige Spenden für libertäre Aufklärung und Politik.",
    path: "/werde-unterstuetzer",
    keywords: [
      "libertäre Partei spenden",
      "Bitcoin Spende Partei",
      "Freiheit unterstützen",
      "DIE LIBERTÄREN Spende",
    ],
  },
  freiheitsbewegung: {
    title: "Freiheitsbewegung – Geschichte des Libertarismus",
    description:
      "Von der Aufklärung zur Österreichischen Schule: Geschichte und geistige Wurzeln der Freiheitsbewegung und des Libertarismus bei DIE LIBERTÄREN.",
    path: "/freiheitsbewegung",
    keywords: [
      "Freiheitsbewegung",
      "Österreichische Schule",
      "Libertarismus Geschichte",
      "Hayek Mises",
    ],
  },
  beirat: {
    title: "Beirat – Wissenschaft & Expertise",
    description:
      "Der Beirat von DIE LIBERTÄREN: Expertenwissen aus Wissenschaft und Zivilgesellschaft für fundierte libertäre Positionen.",
    path: "/beirat",
    keywords: ["Beirat DIE LIBERTÄREN", "libertäre Wissenschaft", "Expertenrat Partei"],
  },
  netzwerk: {
    title: "Netzwerk – Libertäre Vernetzung & Wissenschaft",
    description:
      "Das libertäre Netzwerk von DIE LIBERTÄREN: Vernetzung in Wissenschaft, Zivilgesellschaft und freiheitlichen Organisationen für Freiheit und freien Markt.",
    path: "/netzwerk",
    keywords: ["libertäres Netzwerk", "Freiheit Wissenschaft", "libertäre Organisationen"],
  },
  bundesvorstand: {
    title: "Bundesvorstand – Führung der Freiheitspartei",
    description:
      "Der Bundesvorstand von DIE LIBERTÄREN: Dr. Mathias Hummel (Bundesvorsitzender) und Florian Handwerker (Bundesgeschäftsführer) – die libertäre Partei in Deutschland.",
    path: "/bundesvorstand",
    keywords: ["DIE LIBERTÄREN Bundesvorstand", "Mathias Hummel", "libertäre Partei Führung"],
  },
  kontakt: {
    title: "Kontakt",
    description:
      "Kontaktiere DIE LIBERTÄREN – Fragen zu Libertarismus, Mitgliedschaft, Programm, Freiheit und politischen Positionen.",
    path: "/kontakt",
    keywords: ["DIE LIBERTÄREN Kontakt", "libertäre Partei kontaktieren"],
  },
  impressum: {
    title: "Impressum",
    description:
      "Impressum von DIE LIBERTÄREN e.V. – Angaben gemäß § 5 DDG. Libertäre Partei mit Sitz in Feldkirchen-Westerham und München.",
    path: "/impressum",
  },
  datenschutz: {
    title: "Datenschutz",
    description:
      "Datenschutzerklärung von DIE LIBERTÄREN e.V. – transparent, DSGVO-konform, minimale Datenerhebung im Sinne libertärer Privatsphäre.",
    path: "/datenschutz",
  },
} as const satisfies Record<string, PageSeoInput & { path: string }>;