import eventsData from "@/data/events.json";
import { resolveMediaUrl } from "@/lib/cms/media";
import { getPayloadClient } from "@/lib/payload";
import type { Event } from "@/payload-types";

export type EventDisplay = {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  location: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  category: string;
  link: string;
};

const categoryLabels: Record<string, string> = {
  stammtisch: "Stammtisch",
  fest: "Fest",
  parteitag: "Parteitag",
  veranstaltung: "Veranstaltung",
  workshop: "Workshop",
  sonstiges: "Sonstiges",
};

function todayIso(): string {
  return new Date().toISOString().split("T")[0];
}

function mapPayloadEvent(event: Event): EventDisplay {
  const { url, alt } = resolveMediaUrl(event.image);

  return {
    id: String(event.id),
    title: event.title,
    startDate: event.startDate,
    endDate: event.endDate ?? undefined,
    location: event.location,
    description: event.description ?? undefined,
    imageUrl: url,
    imageAlt: alt ?? event.title,
    category: categoryLabels[event.category] ?? event.category,
    link: event.link ?? "/events",
  };
}

function mapJsonEvent(event: (typeof eventsData.events)[number]): EventDisplay {
  return {
    id: event.id,
    title: event.title,
    startDate: event.date,
    location: event.location,
    category: event.type,
    link: event.url,
  };
}

function isUpcoming(event: EventDisplay, today: string): boolean {
  const endOrStart = event.endDate ?? event.startDate;
  return endOrStart >= today;
}

/** Nächste veröffentlichte Events aus Payload, mit JSON-Fallback. */
export async function getUpcomingEvents(limit = 10): Promise<EventDisplay[]> {
  const today = todayIso();

  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: "events",
      where: {
        and: [
          { published: { equals: true } },
          {
            or: [
              { endDate: { greater_than_equal: today } },
              {
                and: [
                  { endDate: { exists: false } },
                  { startDate: { greater_than_equal: today } },
                ],
              },
              {
                and: [
                  { endDate: { equals: null } },
                  { startDate: { greater_than_equal: today } },
                ],
              },
            ],
          },
        ],
      },
      sort: "startDate",
      limit,
      depth: 1,
    });

    if (result.docs.length > 0) {
      return (result.docs as Event[])
        .map(mapPayloadEvent)
        .filter((event) => isUpcoming(event, today));
    }
  } catch {
    // MongoDB nicht erreichbar – Fallback auf statische JSON-Daten
  }

  return eventsData.events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)
    .map(mapJsonEvent);
}

export function getCalendarLinks() {
  return eventsData.calendarLinks;
}