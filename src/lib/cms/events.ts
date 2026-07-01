import eventsData from "@/data/events.json";
import { resolveMediaUrl } from "@/lib/cms/media";
import { getPayloadClient } from "@/lib/payload";
import type { Event } from "@/payload-types";
import type { Where } from "payload";

export type EventDisplay = {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  time?: string;
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
    time: event.time ?? undefined,
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
    time: event.time,
    location: event.location,
    description: [event.time, event.recurrence].filter(Boolean).join(" – ") || undefined,
    category: event.type,
    link: event.url,
  };
}

function isUpcoming(event: EventDisplay, today: string): boolean {
  const endOrStart = event.endDate ?? event.startDate;
  return endOrStart >= today;
}

async function fetchPublishedEvents(
  where: Where | undefined,
  limit: number,
  sort = "startDate"
): Promise<EventDisplay[]> {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: "events",
      where: where ?? { published: { equals: true } },
      sort,
      limit,
      depth: 1,
    });

    if (result.docs.length > 0) {
      return (result.docs as Event[]).map(mapPayloadEvent);
    }
  } catch {
    // Fallback unten
  }

  return [];
}

/** Nächste veröffentlichte Events aus Payload, mit JSON-Fallback. */
export async function getUpcomingEvents(limit = 10): Promise<EventDisplay[]> {
  const today = todayIso();

  const payloadEvents = await fetchPublishedEvents(
    {
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
    limit
  );

  if (payloadEvents.length > 0) {
    return payloadEvents.filter((event) => isUpcoming(event, today));
  }

  return eventsData.events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)
    .map(mapJsonEvent);
}

/** Alle veröffentlichten Events für den Kalender (Vergangenheit + Zukunft). */
export async function getAllPublishedEvents(): Promise<EventDisplay[]> {
  const payloadEvents = await fetchPublishedEvents(
    { published: { equals: true } },
    200
  );

  if (payloadEvents.length > 0) {
    return payloadEvents;
  }

  return eventsData.events
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(mapJsonEvent);
}

export function getCalendarLinks() {
  return eventsData.calendarLinks;
}