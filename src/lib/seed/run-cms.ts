import type { Payload } from "payload";
import eventsData from "@/data/events.json";
import heroData from "@/data/hero.json";

type EventCategory =
  | "stammtisch"
  | "fest"
  | "parteitag"
  | "veranstaltung"
  | "workshop"
  | "sonstiges";

const eventTypeToCategory: Record<string, EventCategory> = {
  Stammtisch: "stammtisch",
  Parteitag: "parteitag",
  Fest: "fest",
  Veranstaltung: "veranstaltung",
  Workshop: "workshop",
};

export type CmsSeedStats = {
  hero: boolean;
  highlights: number;
  events: number;
};

export async function runCmsSeed(payload: Payload): Promise<CmsSeedStats> {
  const stats: CmsSeedStats = { hero: false, highlights: 0, events: 0 };

  const existingHero = await payload.findGlobal({ slug: "hero", depth: 0 });
  if (!existingHero?.headline) {
    await payload.updateGlobal({ slug: "hero", data: heroData });
    stats.hero = true;
  }

  const existingHighlight = await payload.find({
    collection: "highlights",
    where: { title: { equals: "Afuera Fest 2026" } },
    limit: 1,
  });
  if (existingHighlight.docs.length === 0) {
    await payload.create({
      collection: "highlights",
      data: {
        title: "Afuera Fest 2026",
        slug: "afuera-fest-2026",
        shortText:
          "Das größte libertäre Fest im deutschsprachigen Raum. Wir brauchen deine Unterstützung vor Ort!",
        date: "2026-07-24",
        activeUntil: "2026-07-27",
        link: "https://afuerafest.de/",
        isActive: true,
      },
    });
    stats.highlights++;
  }

  for (const event of eventsData.events) {
    const existing = await payload.find({
      collection: "events",
      where: { title: { equals: event.title } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;

    const descriptionParts = [
      event.time ? `Uhrzeit: ${event.time}` : null,
      event.recurrence ?? null,
    ].filter(Boolean);

    await payload.create({
      collection: "events",
      data: {
        title: event.title,
        startDate: event.date,
        location: event.location,
        time: event.time,
        category: eventTypeToCategory[event.type] ?? "veranstaltung",
        description:
          descriptionParts.length > 0 ? descriptionParts.join(" – ") : undefined,
        link: event.url ?? "/events",
        published: true,
      },
    });
    stats.events++;
  }

  return stats;
}