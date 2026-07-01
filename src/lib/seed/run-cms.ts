import type { Payload } from "payload";
import eventsData from "@/data/events.json";
import heroData from "@/data/hero.json";
import { slugify } from "@/lib/cms/slugify";

export type CmsSeedStats = {
  hero: boolean;
  highlights: number;
  eventCategories: number;
  eventLocations: number;
  eventOrganizers: number;
  events: number;
  eventsUpdated: number;
};

const defaultCategories = [
  "Die Libertären",
  "Libertärer Stammtisch",
  "Online",
  "Veranstaltung",
] as const;

async function ensureCategory(payload: Payload, name: string): Promise<string> {
  const existing = await payload.find({
    collection: "event-categories",
    where: { name: { equals: name } },
    limit: 1,
  });
  if (existing.docs[0]?.id) return String(existing.docs[0].id);

  const created = await payload.create({
    collection: "event-categories",
    data: { name, slug: slugify(name) },
  });
  return String(created.id);
}

async function ensureLocation(
  payload: Payload,
  data: {
    name: string;
    city?: string;
    address?: string;
    postalCode?: string;
    mapUrl?: string;
  }
): Promise<string> {
  const existing = await payload.find({
    collection: "event-locations",
    where: { name: { equals: data.name } },
    limit: 1,
  });
  if (existing.docs[0]?.id) return String(existing.docs[0].id);

  const created = await payload.create({
    collection: "event-locations",
    data: {
      name: data.name,
      slug: slugify(data.name),
      city: data.city,
      address: data.address,
      postalCode: data.postalCode,
      mapUrl: data.mapUrl,
      showMap: true,
      showMapLink: true,
    },
  });
  return String(created.id);
}

async function ensureOrganizer(payload: Payload, name: string): Promise<string> {
  const existing = await payload.find({
    collection: "event-organizers",
    where: { name: { equals: name } },
    limit: 1,
  });
  if (existing.docs[0]?.id) return String(existing.docs[0].id);

  const created = await payload.create({
    collection: "event-organizers",
    data: { name, website: "https://die-libertaeren.de" },
  });
  return String(created.id);
}

export async function runCmsSeed(payload: Payload): Promise<CmsSeedStats> {
  const stats: CmsSeedStats = {
    hero: false,
    highlights: 0,
    eventCategories: 0,
    eventLocations: 0,
    eventOrganizers: 0,
    events: 0,
    eventsUpdated: 0,
  };

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

  const categoryIds: Record<string, string> = {};
  for (const name of defaultCategories) {
    const before = await payload.find({
      collection: "event-categories",
      where: { name: { equals: name } },
      limit: 1,
    });
    categoryIds[name] = await ensureCategory(payload, name);
    if (before.docs.length === 0) stats.eventCategories++;
  }

  const organizerId = await ensureOrganizer(payload, "Die Libertären");
  const organizerBefore = await payload.find({
    collection: "event-organizers",
    limit: 1,
  });
  if (organizerBefore.totalDocs === 0) stats.eventOrganizers++;

  const locationSeeds = [
    {
      name: "Torschenke im Bayertor",
      city: "Landsberg am Lech",
      address: "Alte Bergstraße 448",
      postalCode: "86899",
      mapUrl: "https://maps.google.com/?q=Torschenke+Bayertor+Landsberg",
    },
    { name: "Hamburg (Stammtisch)", city: "Hamburg" },
    { name: "Göppingen/Esslingen", city: "Göppingen" },
    { name: "Frankfurt am Main", city: "Frankfurt am Main" },
    { name: "München", city: "München" },
  ] as const;

  const locationIds: Record<string, string> = {};
  for (const loc of locationSeeds) {
    const before = await payload.find({
      collection: "event-locations",
      where: { name: { equals: loc.name } },
      limit: 1,
    });
    locationIds[loc.name] = await ensureLocation(payload, loc);
    if (before.docs.length === 0) stats.eventLocations++;
  }

  const eventSeeds = [
    {
      title: "Freiheitlicher Stammtisch Landsberg am Lech",
      startDate: "2026-06-25",
      startTime: "19:00",
      endTime: "22:00",
      locationKey: "Torschenke im Bayertor",
      locationLabel: "Landsberg am Lech",
      categories: ["Die Libertären", "Libertärer Stammtisch"],
      tags: ["libertarismus", "Stammtisch", "Landsberg"],
      excerpt:
        "DIE LIBERTÄREN laden ein zum Stammtisch nach Landsberg am Lech – wir freuen uns auf deinen Besuch!",
      recurring: false,
    },
    {
      title: "Libertärer Stammtisch Hamburg",
      startDate: "2026-07-01",
      startTime: "19:00",
      endTime: "22:00",
      locationKey: "Hamburg (Stammtisch)",
      locationLabel: "Hamburg",
      categories: ["Die Libertären", "Libertärer Stammtisch"],
      tags: ["libertarismus", "Hamburg", "Stammtisch"],
      seriesName: "Libertärer Stammtisch Hamburg",
      recurring: true,
      frequency: "monthly" as const,
      weekOfMonth: "first" as const,
      weekday: "3",
      recurrenceEndDate: "2031-06-01",
    },
    {
      title: "Libertärer Stammtisch Göppingen/Esslingen",
      startDate: "2026-07-02",
      startTime: "19:30",
      endTime: "23:00",
      locationKey: "Göppingen/Esslingen",
      locationLabel: "Göppingen/Esslingen",
      categories: ["Die Libertären", "Libertärer Stammtisch"],
      tags: ["libertarismus", "Göppingen", "Esslingen"],
      seriesName: "Libertärer Stammtisch Göppingen/Esslingen",
      recurring: true,
      frequency: "monthly" as const,
      weekOfMonth: "first" as const,
      weekday: "4",
      recurrenceEndDate: "2031-06-02",
    },
    {
      title: "Libertärer Stammtisch Frankfurt am Main",
      startDate: "2026-06-01",
      startTime: "19:00",
      endTime: "22:00",
      locationKey: "Frankfurt am Main",
      locationLabel: "Frankfurt am Main",
      categories: ["Die Libertären", "Libertärer Stammtisch"],
      tags: ["libertarismus", "Frankfurt", "Stammtisch"],
      seriesName: "Libertärer Stammtisch Frankfurt",
      recurring: true,
      frequency: "monthly" as const,
      weekOfMonth: "first" as const,
      weekday: "1",
      recurrenceEndDate: "2031-06-02",
    },
    {
      title: "Bundesparteitag 2026",
      startDate: "2026-09-12",
      startTime: "10:00",
      endTime: "18:00",
      locationKey: "München",
      locationLabel: "München",
      categories: ["Die Libertären", "Veranstaltung"],
      tags: ["Parteitag", "libertarismus"],
      excerpt: "Bundesparteitag 2026 – DIE LIBERTÄREN in München.",
      recurring: false,
    },
  ] as const;

  for (const seed of eventSeeds) {
    const existing = await payload.find({
      collection: "events",
      where: { title: { equals: seed.title } },
      limit: 1,
    });

    const jsonFallback = eventsData.events.find((e) => e.title === seed.title);
    const eventData = {
      title: seed.title,
      slug: slugify(seed.title),
      startDate: seed.startDate,
      startTime: seed.startTime,
      endTime: seed.endTime,
      timezone: "Europe/Berlin",
      venue: locationIds[seed.locationKey],
      locationLabel: seed.locationLabel,
      categories: seed.categories.map((name) => categoryIds[name]),
      tags: seed.tags.map((tag) => ({ tag })),
      seriesName: "seriesName" in seed ? seed.seriesName : undefined,
      excerpt: "excerpt" in seed ? seed.excerpt : undefined,
      organizers: [organizerId],
      published: true,
      showQrCode: true,
      recurrence: seed.recurring
        ? {
            enabled: true,
            frequency: seed.frequency,
            interval: 1,
            weekOfMonth: seed.weekOfMonth,
            weekday: seed.weekday,
            endDate: seed.recurrenceEndDate,
          }
        : { enabled: false },
      link: `/events/${slugify(seed.title)}`,
    };

    if (existing.docs.length > 0) {
      const doc = existing.docs[0];
      const needsUpdate =
        !doc.slug ||
        !doc.venue ||
        !doc.categories?.length ||
        !doc.startTime ||
        (seed.recurring && !doc.recurrence?.enabled);

      if (needsUpdate) {
        await payload.update({
          collection: "events",
          id: doc.id,
          data: eventData,
        });
        stats.eventsUpdated++;
      }
      continue;
    }

    await payload.create({
      collection: "events",
      data: eventData,
    });
    stats.events++;
  }

  return stats;
}