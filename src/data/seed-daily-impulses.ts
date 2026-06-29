/**
 * Tagesimpulse für npm run seed:impulses
 * Aktuelle Themen (Stand: 29.06.2026) – Wirtschaft, Politik, Internationales.
 */
export type SeedDailyImpulse = {
  title: string;
  shortText: string;
  libertarianPerspective: string;
  date: string;
  sourceLink?: string;
};

export const seedDailyImpulses: SeedDailyImpulse[] = [
  {
    title: "US Supreme Court: Präsidialmacht vs. unabhängige Behörden",
    shortText:
      "Der Supreme Court erlaubte der US-Regierung, einen FTC-Kommissar zu entlassen – ein Einschnitt in die Grenzen exekutiver Macht und die Unabhängigkeit von Regulierungsbehörden. Die Debatte dreht sich um Kontrolle, nicht um Freiheit.",
    libertarianPerspective:
      "Libertäre kritisieren beides: willkürliche Macht ohne klare Regeln und den Regulierungsstaat an sich. Freiheit braucht feste Eigentums- und Vertragsrechte – nicht immer mehr Behördenkompetenz, die Politiker beliebig umschichten.",
    date: "2026-06-29",
    sourceLink: "https://www.scotusblog.com/2026/06/court-allows-trump-to-fire-ftc-commissioner-and-overturns-major-restraint-on-presidential-power/",
  },
  {
    title: "Persischer Golf: Handelswege und Eskalation im Fokus",
    shortText:
      "Neue Spannungen rund um den Straßen von Hormuz belasten internationale Lieferketten und treiben Energie- und Versicherungskosten. Staaten reagieren mit Drohungen, Sanktionen und militärischer Präsenz statt mit marktbasierten Lösungen.",
    libertarianPerspective:
      "Freier Welthandel scheitert an Kriegsrhetorik und Interventionismus. Libertäre plädieren für offene Märkte, bilaterale Verträge und Zurückhaltung – nicht für die Verstaatlichung globaler Risiken auf Kosten der Steuerzahler.",
    date: "2026-06-29",
    sourceLink: "https://www.reuters.com/world/asia-pacific/us-carries-out-fresh-strikes-against-iran-after-tanker-struck-hormuz-escalating-2026-06-27/",
  },
  {
    title: "EZB und Märkte: Geldpolitik unter dem Sommer-Druck",
    shortText:
      "Vor dem neuen Handelsmonat richten Anleger den Blick erneut auf Zinsentscheidungen und Inflationsdaten in Europa. Zentralbanken versprechen Stabilität, während Staatsausgaben und Schuldenquoten weiter steigen.",
    libertarianPerspective:
      "Inflation ist keine Naturkatastrophe, sondern Folge von Kreditexpansion und Staatsfinanzierung. Sound Money und strikte Haushaltsdisziplin sind die libertäre Antwort – nicht immer neue Geldschöpfung als politisches Werkzeug.",
    date: "2026-06-29",
    sourceLink: "https://www.cnbc.com/2026/06/26/stock-market-next-week-outlook-for-june-29-july-3-2026.html",
  },
  {
    title: "Deutschland: Bürokratie und Wirtschaftswachstum im Clinch",
    shortText:
      "Unternehmen beklagen weiter steigende Regulierungs- und Energiekosten, während die Politik neue Förderprogramme und Eingriffe ankündigt. Der Mittelstand trägt die Last – ohne spürbare Entlastung bei Steuern und Genehmigungen.",
    libertarianPerspective:
      "Wohlstand entsteht durch Deregulierung und Eigentumsschutz, nicht durch Subventionspolitik. Wer Freiheit wirtschaftlich ernst meint, muss den Staat kleiner machen – nicht größer und „grüner“.",
    date: "2026-06-29",
    sourceLink: "https://www.mercatus.org/research/policy-briefs/economic-situation-june-2026",
  },
];