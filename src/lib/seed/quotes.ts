import type { Payload } from "payload";
import { seedQuotes } from "@/data/seed-quotes";

export type SeedStats = {
  created: number;
  updated: number;
  skipped: number;
  total: number;
};

function quoteKey(quoteText: string, authorName: string): string {
  return `${quoteText}|||${authorName}`;
}

/** Idempotent: ein DB-Read, dann Create/Update nur bei Bedarf. */
export async function runSeedQuotes(payload: Payload): Promise<SeedStats> {
  let created = 0;
  let updated = 0;
  let skipped = 0;

  const existing = await payload.find({
    collection: "quotes",
    limit: 500,
    pagination: false,
  });

  const byKey = new Map(
    existing.docs.map((doc) => [
      quoteKey(String(doc.quoteText), String(doc.authorName)),
      doc,
    ])
  );

  for (const quote of seedQuotes) {
    const key = quoteKey(quote.quoteText, quote.authorName);
    const doc = byKey.get(key);

    if (doc) {
      const needsUpdate =
        doc.authorTitle !== quote.authorTitle || doc.source !== quote.source;

      if (needsUpdate) {
        await payload.update({
          collection: "quotes",
          id: doc.id,
          data: {
            authorTitle: quote.authorTitle,
            source: quote.source,
          },
        });
        updated++;
      } else {
        skipped++;
      }
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

  return { created, updated, skipped, total: seedQuotes.length };
}