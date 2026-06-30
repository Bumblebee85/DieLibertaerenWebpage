import type { Payload } from "payload";
import { seedDailyImpulses } from "@/data/seed-daily-impulses";
import type { SeedStats } from "@/lib/seed/quotes";

/** Idempotent: ein DB-Read, dann Create/Update nur bei Bedarf. */
export async function runSeedImpulses(payload: Payload): Promise<SeedStats> {
  let created = 0;
  let updated = 0;
  let skipped = 0;

  const existing = await payload.find({
    collection: "daily-impulses",
    limit: 100,
    pagination: false,
  });

  const byTitle = new Map(
    existing.docs.map((doc) => [String(doc.title), doc])
  );

  for (const impulse of seedDailyImpulses) {
    const doc = byTitle.get(impulse.title);

    if (doc) {
      const needsUpdate =
        doc.shortText !== impulse.shortText ||
        doc.libertarianPerspective !== impulse.libertarianPerspective ||
        doc.date !== impulse.date ||
        doc.sourceLink !== impulse.sourceLink;

      if (needsUpdate) {
        await payload.update({
          collection: "daily-impulses",
          id: doc.id,
          data: {
            shortText: impulse.shortText,
            libertarianPerspective: impulse.libertarianPerspective,
            date: impulse.date,
            sourceLink: impulse.sourceLink,
          },
        });
        updated++;
      } else {
        skipped++;
      }
      continue;
    }

    await payload.create({
      collection: "daily-impulses",
      data: {
        title: impulse.title,
        shortText: impulse.shortText,
        libertarianPerspective: impulse.libertarianPerspective,
        date: impulse.date,
        sourceLink: impulse.sourceLink,
        published: true,
      },
    });
    created++;
  }

  return { created, updated, skipped, total: seedDailyImpulses.length };
}