import eventsData from "@/data/events.json";
import { getPayloadClient } from "@/lib/payload";
import type { Event } from "@/payload-types";

export type EventDisplay = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  recurring: boolean;
  recurrence?: string;
  url: string;
};

const typeLabels: Record<string, string> = {
  stammtisch: "Stammtisch",
  parteitag: "Parteitag",
  veranstaltung: "Veranstaltung",
  sonstiges: "Sonstiges",
};

function mapPayloadEvent(event: Event): EventDisplay {
  return {
    id: String(event.id),
    title: event.title,
    date: event.date,
    time: event.time ?? "",
    location: event.location,
    type: typeLabels[event.type] ?? event.type,
    recurring: event.recurring ?? false,
    recurrence: event.recurrence ?? undefined,
    url: event.externalUrl ?? "/events",
  };
}

function mapJsonEvent(event: (typeof eventsData.events)[number]): EventDisplay {
  return {
    id: event.id,
    title: event.title,
    date: event.date,
    time: event.time,
    location: event.location,
    type: event.type,
    recurring: event.recurring,
    recurrence: event.recurrence,
    url: event.url,
  };
}

/** Nächste veröffentlichte Events aus Payload, mit JSON-Fallback. */
export async function getUpcomingEvents(limit = 10): Promise<EventDisplay[]> {
  try {
    const payload = await getPayloadClient();
    const today = new Date().toISOString().split("T")[0];

    const result = await payload.find({
      collection: "events",
      where: {
        and: [
          { published: { equals: true } },
          { date: { greater_than_equal: today } },
        ],
      },
      sort: "date",
      limit,
    });

    if (result.docs.length > 0) {
      return result.docs.map(mapPayloadEvent);
    }
  } catch {
    // MongoDB nicht erreichbar – Fallback auf statische JSON-Daten
  }

  const today = new Date().toISOString().split("T")[0];
  return eventsData.events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)
    .map(mapJsonEvent);
}

export function getCalendarLinks() {
  return eventsData.calendarLinks;
}