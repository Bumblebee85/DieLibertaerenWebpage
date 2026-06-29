import type { Payload } from "payload";
import { seedDailyImpulses } from "@/data/seed-daily-impulses";
import type { SeedStats } from "@/lib/seed/quotes";

export async function runSeedImpulses(payload: Payload): Promise<SeedStats> {
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const impulse of seedDailyImpulses) {
    const existing = await payload.find({
      collection: "daily-impulses",
      where: {
        title: { equals: impulse.title },
      },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      const doc = existing.docs[0];
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