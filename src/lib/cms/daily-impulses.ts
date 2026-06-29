import dailyNewsData from "@/data/daily-news.json";
import { getPayloadClient } from "@/lib/payload";
import type { DailyImpulse } from "@/payload-types";

export type DailyImpulseDisplay = {
  id: string;
  title: string;
  shortText: string;
  libertarianPerspective: string;
  date: string;
  sourceLink?: string;
};

function mapPayloadImpulse(impulse: DailyImpulse): DailyImpulseDisplay {
  return {
    id: String(impulse.id),
    title: impulse.title,
    shortText: impulse.shortText,
    libertarianPerspective: impulse.libertarianPerspective,
    date: impulse.date,
    sourceLink: impulse.sourceLink ?? undefined,
  };
}

type JsonDailyItem = (typeof dailyNewsData.items)[number] & {
  libertarianPerspective?: string;
};

function mapJsonImpulse(item: JsonDailyItem): DailyImpulseDisplay {
  return {
    id: item.id,
    title: item.title,
    shortText: item.summary,
    libertarianPerspective: item.libertarianPerspective ?? item.summary,
    date: item.date,
    sourceLink: item.url,
  };
}

/** Neueste veröffentlichte Tagesimpulse aus Payload, mit JSON-Fallback. */
export async function getLatestDailyImpulses(
  limit = 3
): Promise<DailyImpulseDisplay[]> {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: "daily-impulses",
      where: {
        published: { equals: true },
      },
      sort: "-date",
      limit,
    });

    if (result.docs.length > 0) {
      return (result.docs as DailyImpulse[]).map(mapPayloadImpulse);
    }
  } catch {
    // MongoDB nicht erreichbar – Fallback auf statische JSON-Daten
  }

  return dailyNewsData.items
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
    .map(mapJsonImpulse);
}