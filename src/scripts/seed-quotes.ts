import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";
import { seedQuotes } from "@/data/seed-quotes";

/**
 * Befüllt die Quotes-Collection mit der libertären Zitat-Bibliothek.
 *
 * Ausführen:
 *   npm run seed:quotes
 *
 * Voraussetzung: MONGODB_URI (oder DATABASE_URL) und PAYLOAD_SECRET gesetzt.
 * Bereits vorhandene Zitate (gleicher Text + Autor) werden übersprungen.
 */
async function seed() {
  const payload = await getPayload({ config });

  let created = 0;
  let skipped = 0;

  for (const quote of seedQuotes) {
    const existing = await payload.find({
      collection: "quotes",
      where: {
        and: [
          { quoteText: { equals: quote.quoteText } },
          { authorName: { equals: quote.authorName } },
        ],
      },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      skipped++;
      continue;
    }

    await payload.create({
      collection: "quotes",
      data: {
        quoteText: quote.quoteText,
        authorName: quote.authorName,
        authorTitle: quote.authorTitle,
        source: quote.source,
        published: true,
      },
    });
    created++;
  }

  console.log(`\n✓ Quotes-Seed abgeschlossen`);
  console.log(`  Neu angelegt: ${created}`);
  console.log(`  Übersprungen: ${skipped} (bereits vorhanden)`);
  console.log(`  Gesamt in Bibliothek: ${seedQuotes.length}`);
  console.log(`\nAdmin-Panel: /admin → Zitate`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed fehlgeschlagen:", error instanceof Error ? error.message : error);
  process.exit(1);
});