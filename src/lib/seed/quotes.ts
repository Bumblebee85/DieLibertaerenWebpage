import type { Payload } from "payload";
import { seedQuotes } from "@/data/seed-quotes";

export type SeedStats = {
  created: number;
  updated: number;
  skipped: number;
  total: number;
};

export async function runSeedQuotes(payload: Payload): Promise<SeedStats> {
  let created = 0;
  let updated = 0;
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
      const doc = existing.docs[0];
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