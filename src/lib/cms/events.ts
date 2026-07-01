import eventsData from "@/data/events.json";
import {
  expandEventOccurrences,
  formatTimeRange,
  getDefaultExpansionRange,
  getRecurrenceLabel,
} from "@/lib/cms/event-recurrence";
import { resolveMediaUrl } from "@/lib/cms/media";
import { getSiteUrl } from "@/lib/seo/site-url";
import { getPayloadClient } from "@/lib/payload";
import type {
  Event,
  EventCategory,
  EventLocation,
  EventOrganizer,
} from "@/payload-types";
import type { Where } from "payload";

export type EventVenueDisplay = {
  name: string;
  address?: string;
  city?: string;
  postalCode?: string;
  mapUrl?: string;
  showMap?: boolean;
  showMapLink?: boolean;
};

export type EventDisplay = {
  id: string;
  eventId: string;
  slug: string;
  title: string;
  occurrenceDate: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  allDay?: boolean;
  time?: string;
  location: string;
  venue?: EventVenueDisplay;
  excerpt?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  categories: string[];
  tags: string[];
  seriesName?: string;
  isRecurring: boolean;
  recurrenceLabel?: string;
  isVirtual?: boolean;
  virtualUrl?: string;
  organizers: string[];
  website?: string;
  admissionFee?: string;
  admissionCurrency?: string;
  link: string;
  showQrCode?: boolean;
  qrCodeUrl?: string;
};

function todayIso(): string {
  return new Date().toISOString().split("T")[0];
}

function resolveVenue(venue: Event["venue"]): EventVenueDisplay | undefined {
  if (!venue || typeof venue === "string") return undefined;
  const loc = venue as EventLocation;
  return {
    name: loc.name,
    address: loc.address ?? undefined,
    city: loc.city ?? undefined,
    postalCode: loc.postalCode ?? undefined,
    mapUrl: loc.mapUrl ?? undefined,
    showMap: loc.showMap ?? true,
    showMapLink: loc.showMapLink ?? true,
  };
}

const legacyCategoryLabels: Record<string, string> = {
  stammtisch: "Libertärer Stammtisch",
  fest: "Veranstaltung",
  parteitag: "Veranstaltung",
  veranstaltung: "Veranstaltung",
  workshop: "Veranstaltung",
  sonstiges: "Veranstaltung",
};

function resolveLocationLabel(event: Event): string {
  if (event.isVirtual) return "Online";
  const venue = resolveVenue(event.venue);
  if (venue) {
    const parts = [venue.name, venue.city].filter(Boolean);
    return parts.join(", ");
  }
  if (event.locationLabel?.trim()) return event.locationLabel.trim();

  const legacyLocation = (event as Event & { location?: string }).location;
  if (legacyLocation?.trim()) return legacyLocation.trim();

  return "Ort folgt";
}

function resolveCategories(event: Event): string[] {
  const categories = event.categories;
  if (categories?.length) {
    return categories.map((item) => {
      if (typeof item === "string") return item;
      return (item as EventCategory).name;
    });
  }

  const legacyCategory = (event as Event & { category?: string }).category;
  if (legacyCategory) {
    return [legacyCategoryLabels[legacyCategory] ?? legacyCategory];
  }

  return ["Veranstaltung"];
}

function resolveTags(tags: Event["tags"]): string[] {
  return (tags ?? [])
    .map((item) => item?.tag?.trim())
    .filter((tag): tag is string => Boolean(tag));
}

function resolveOrganizers(organizers: Event["organizers"]): string[] {
  if (!organizers?.length) return [];
  return organizers.map((item) => {
    if (typeof item === "string") return item;
    return (item as EventOrganizer).name;
  });
}

function buildEventLink(event: Event): string {
  if (event.link?.trim()) return event.link.trim();
  if (event.slug) return `/events/${event.slug}`;
  return "/events";
}

function mapPayloadEventToOccurrence(
  event: Event,
  occurrenceStart: string,
  occurrenceEnd: string
): EventDisplay {
  const { url, alt } = resolveMediaUrl(event.image);
  const slug = event.slug ?? String(event.id);
  const siteUrl = getSiteUrl();
  const detailPath = `/events/${slug}`;

  return {
    id: `${event.id}-${occurrenceStart}`,
    eventId: String(event.id),
    slug,
    title: event.title,
    occurrenceDate: occurrenceStart,
    startDate: occurrenceStart,
    endDate: occurrenceEnd !== occurrenceStart ? occurrenceEnd : undefined,
    startTime: event.startTime ?? undefined,
    endTime: event.endTime ?? undefined,
    allDay: event.allDay ?? false,
    time:
      formatTimeRange(event.startTime, event.endTime, event.allDay) ??
      (event as Event & { time?: string }).time,
    location: resolveLocationLabel(event),
    venue: resolveVenue(event.venue),
    excerpt: event.excerpt ?? undefined,
    description: event.excerpt ?? undefined,
    imageUrl: url,
    imageAlt: alt ?? event.title,
    categories: resolveCategories(event),
    tags: resolveTags(event.tags),
    seriesName: event.seriesName ?? undefined,
    isRecurring: event.recurrence?.enabled === true,
    recurrenceLabel: getRecurrenceLabel(event.recurrence),
    isVirtual: event.isVirtual ?? false,
    virtualUrl: event.virtualUrl ?? undefined,
    organizers: resolveOrganizers(event.organizers),
    website: event.website ?? undefined,
    admissionFee: event.admissionFee ?? undefined,
    admissionCurrency: event.admissionCurrency ?? "EUR",
    link: buildEventLink(event),
    showQrCode: event.showQrCode !== false,
    qrCodeUrl: `${siteUrl}/api/events/${slug}/qr`,
  };
}

function expandPayloadEvents(events: Event[], rangeStart: string, rangeEnd: string): EventDisplay[] {
  const expanded: EventDisplay[] = [];

  for (const event of events) {
    const windows = expandEventOccurrences(event, rangeStart, rangeEnd);
    for (const window of windows) {
      expanded.push(
        mapPayloadEventToOccurrence(event, window.occurrenceStart, window.occurrenceEnd)
      );
    }
  }

  return expanded.sort((a, b) => {
    const dateCmp = a.occurrenceDate.localeCompare(b.occurrenceDate);
    if (dateCmp !== 0) return dateCmp;
    return a.title.localeCompare(b.title);
  });
}

function mapJsonEvent(event: (typeof eventsData.events)[number]): EventDisplay {
  return {
    id: event.id,
    eventId: event.id,
    slug: event.id,
    title: event.title,
    occurrenceDate: event.date,
    startDate: event.date,
    time: event.time,
    location: event.location,
    description: [event.time, event.recurrence].filter(Boolean).join(" – ") || undefined,
    categories: [event.type],
    tags: [],
    isRecurring: event.recurring ?? false,
    recurrenceLabel: event.recurrence,
    link: event.url,
    organizers: [],
    showQrCode: false,
  };
}

function isUpcomingOccurrence(event: EventDisplay, today: string): boolean {
  const endOrStart = event.endDate ?? event.occurrenceDate;
  return endOrStart >= today;
}

async function fetchPublishedEvents(
  where: Where | undefined,
  limit: number,
  sort = "startDate"
): Promise<Event[]> {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: "events",
      where: where ?? { published: { equals: true } },
      sort,
      limit,
      depth: 2,
    });

    return result.docs as Event[];
  } catch {
    return [];
  }
}

/** Nächste veröffentlichte Events (inkl. Wiederholungen), mit JSON-Fallback. */
export async function getUpcomingEvents(limit = 10): Promise<EventDisplay[]> {
  const today = todayIso();
  const range = getDefaultExpansionRange();

  const payloadEvents = await fetchPublishedEvents({ published: { equals: true } }, 200);
  if (payloadEvents.length > 0) {
    return expandPayloadEvents(payloadEvents, today, range.end)
      .filter((event) => isUpcomingOccurrence(event, today))
      .slice(0, limit);
  }

  return eventsData.events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)
    .map(mapJsonEvent);
}

/** Alle veröffentlichten Events für den Kalender (inkl. Wiederholungen). */
export async function getAllPublishedEvents(): Promise<EventDisplay[]> {
  const range = getDefaultExpansionRange();
  const payloadEvents = await fetchPublishedEvents({ published: { equals: true } }, 200);

  if (payloadEvents.length > 0) {
    return expandPayloadEvents(payloadEvents, range.start, range.end);
  }

  return eventsData.events
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(mapJsonEvent);
}

/** Einzelnes Event per Slug (Basisdaten, ohne Occurrence-Expansion). */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "events",
      where: {
        and: [{ slug: { equals: slug } }, { published: { equals: true } }],
      },
      limit: 1,
      depth: 2,
    });
    return (result.docs[0] as Event | undefined) ?? null;
  } catch {
    return null;
  }
}

/** Occurrences eines Events für Detailseite (nächste Termine). */
export async function getEventOccurrencesBySlug(
  slug: string,
  limit = 12
): Promise<{ event: Event; occurrences: EventDisplay[] } | null> {
  const event = await getEventBySlug(slug);
  if (!event) return null;

  const today = todayIso();
  const range = getDefaultExpansionRange();
  const occurrences = expandPayloadEvents([event], today, range.end).slice(0, limit);

  return { event, occurrences };
}

export function getCalendarLinks() {
  return eventsData.calendarLinks;
}