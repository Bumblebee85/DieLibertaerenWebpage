import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";
import { callGrokJson } from "@/lib/grok/client";
import { PARTY_ACCOUNT, PARTY_DAILY_SYSTEM_PROMPT } from "@/lib/grok/party";
import { getDatabaseHost, getDatabaseName, getPayloadEnvStatus } from "@/lib/payload-env";

type DailyImpulseBatch = {
  impulses: Array<{
    title: string;
    shortText: string;
    libertarianPerspective: string;
    sourceLink?: string;
  }>;
};

const IMPULSES_PER_RUN = Number(process.env.GENERATE_DAILY_COUNT ?? "3");

function todayIso(): string {
  return new Date().toISOString().split("T")[0];
}

async function main() {
  const env = getPayloadEnvStatus();
  if (!env.dbUrlSet) {
    console.error("Keine gültige MongoDB-URI. Setze MONGODB_URI.");
    process.exit(1);
  }

  const payload = await getPayload({ config });
  const date = todayIso();

  const existing = await payload.find({
    collection: "daily-impulses",
    where: { date: { equals: date } },
    limit: 10,
    pagination: false,
  });

  const remaining = Math.max(0, IMPULSES_PER_RUN - existing.docs.length);
  if (remaining === 0) {
    console.log(`– Bereits ${existing.docs.length} Impulse für ${date} vorhanden. Nichts zu tun.`);
    process.exit(0);
  }

  console.log(`MongoDB: ${getDatabaseHost()} / ${getDatabaseName()}`);
  console.log(`Parteikonto: ${PARTY_ACCOUNT.name} (Grok via GROK_API_KEY)`);
  console.log(`Generiere ${remaining} Impulse für ${date} …`);

  const result = await callGrokJson<DailyImpulseBatch>({
    messages: [
      {
        role: "system",
        content: PARTY_DAILY_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content:
          `Erstelle genau ${remaining} aktuelle Tagesimpulse für libertäre Leser zum Datum ${date}. ` +
          "Jeder Impuls: kurzer Nachrichtentitel, 2–4 Sätze Kurztext zu einem aktuellen Thema (Politik, Wirtschaft, Freiheit), " +
          "1–3 Sätze libertäre Einordnung (NAP, Eigentum, Minimalstaat, freier Markt). " +
          'JSON-Format: {"impulses":[{"title":"...","shortText":"...","libertarianPerspective":"...","sourceLink":"https://..."}]}. ' +
          "sourceLink optional (echte oder plausible Nachrichten-URL). Keine erfundenen Zitate von Personen.",
      },
    ],
  });

  const impulses = result.impulses?.slice(0, remaining) ?? [];
  if (impulses.length === 0) {
    throw new Error("Grok lieferte keine Impulse.");
  }

  for (const impulse of impulses) {
    await payload.create({
      collection: "daily-impulses",
      data: {
        title: impulse.title,
        shortText: impulse.shortText,
        libertarianPerspective: impulse.libertarianPerspective,
        date,
        sourceLink: impulse.sourceLink,
        published: true,
      },
    });
    console.log(`✓ Impuls angelegt: ${impulse.title}`);
  }

  console.log(`\nFertig: ${impulses.length} Impulse für ${date} in Payload gespeichert.`);
  process.exit(0);
}

main().catch((error) => {
  console.error("generate:daily fehlgeschlagen:", error instanceof Error ? error.message : error);
  process.exit(1);
});