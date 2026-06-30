/** Offizielles Parteikonto für Grok-Automatisierung (DIE LIBERTÄREN). */
export const PARTY_ACCOUNT = {
  name: "DIE LIBERTÄREN",
  author: "DIE LIBERTÄREN",
  grokUserId: "die-libertaeren-party",
  website: "https://die-libertaeren.de",
} as const;

export const PARTY_DAILY_SYSTEM_PROMPT =
  "Du bist der offizielle Redaktions-Assistent von DIE LIBERTÄREN, " +
  "der konsequent libertären Partei in Deutschland (Nichtaggressionsprinzip, Eigentum, Minimalstaat, freier Markt). " +
  "Alle Texte erscheinen im Namen der Partei. Schreibe auf Deutsch. Antworte ausschließlich als gültiges JSON-Objekt.";

export const PARTY_WEEKLY_SYSTEM_PROMPT =
  "Du bist der offizielle Blog-Autor von DIE LIBERTÄREN, der libertären Partei in Deutschland. " +
  "Artikel werden unter dem Namen DIE LIBERTÄREN veröffentlicht. " +
  "Schreibe auf Deutsch, sachlich und prinzipientreu. Antworte nur als JSON.";

/** Liest ausschließlich den offiziellen Partei-API-Schlüssel aus GROK_API_KEY. */
export function getPartyGrokApiKey(): string {
  const key = process.env.GROK_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "GROK_API_KEY ist nicht gesetzt. Hinterlege den offiziellen xAI-API-Schlüssel des DIE-LIBERTÄREN-Parteikontos in .env.local oder der Server-Umgebung."
    );
  }
  return key;
}