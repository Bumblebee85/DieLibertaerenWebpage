import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Repeat,
  Users,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getEventOccurrencesBySlug,
  type EventDisplay,
} from "@/lib/cms/events";
import {
  formatTimeRange,
  getRecurrenceLabel,
} from "@/lib/cms/event-recurrence";
import { richTextToHtml } from "@/lib/cms/rich-text";
import { resolveMediaUrl } from "@/lib/cms/media";
import { getSiteUrl } from "@/lib/seo/site-url";
import { createPageMetadata } from "@/lib/seo/metadata";
import type { Event, EventLocation } from "@/payload-types";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDateDE(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function resolveVenueName(event: Event): string {
  if (event.isVirtual) return "Online";
  const venue = event.venue;
  if (venue && typeof venue !== "string") {
    const loc = venue as EventLocation;
    return [loc.name, loc.city].filter(Boolean).join(", ");
  }
  return event.locationLabel?.trim() || "Ort folgt";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getEventOccurrencesBySlug(slug, 1);
  if (!data) return { title: "Veranstaltung nicht gefunden" };

  const { event } = data;
  return createPageMetadata({
    title: event.title,
    description: event.excerpt ?? `${event.title} – Veranstaltung von DIE LIBERTÄREN`,
    path: `/events/${slug}`,
  });
}

function OccurrenceList({ occurrences }: { occurrences: EventDisplay[] }) {
  if (occurrences.length === 0) return null;

  return (
    <Card className="mt-8">
      <CardContent className="space-y-3 pt-6">
        <h3 className="font-display text-lg font-bold">Nächste Termine</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {occurrences.map((occurrence) => (
            <li key={occurrence.id} className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0 text-primary" />
              {formatDateDE(occurrence.occurrenceDate)}
              {occurrence.time && (
                <span className="text-muted-foreground">· {occurrence.time}</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getEventOccurrencesBySlug(slug);
  if (!data) notFound();

  const { event, occurrences } = data;
  const { url: imageUrl, alt: imageAlt } = resolveMediaUrl(event.image);
  const contentHtml = richTextToHtml(event.content, event.excerpt ?? "");
  const siteUrl = getSiteUrl();
  const eventUrl = `${siteUrl}/events/${slug}`;
  const timeLabel = formatTimeRange(event.startTime, event.endTime, event.allDay);
  const recurrenceLabel = getRecurrenceLabel(event.recurrence);
  const venue = event.venue && typeof event.venue !== "string" ? (event.venue as EventLocation) : null;
  const categories = (event.categories ?? []).map((item) =>
    typeof item === "string" ? item : item.name
  );
  const organizers = (event.organizers ?? []).map((item) =>
    typeof item === "string" ? item : item.name
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Events", href: "/events" },
          { label: event.title },
        ]}
      />
      <PageHeader title={event.title} subtitle={resolveVenueName(event)} />

      <Section>
        <Button variant="ghost" size="sm" className="mb-8" asChild>
          <Link href="/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zum Kalender
          </Link>
        </Button>

        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category}>{category}</Badge>
              ))}
              {event.recurrence?.enabled && (
                <Badge variant="outline" className="gap-1">
                  <Repeat className="h-3 w-3" />
                  {recurrenceLabel ?? "Wiederkehrend"}
                </Badge>
              )}
            </div>

            {imageUrl && (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
                  src={imageUrl}
                  alt={imageAlt ?? event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>
            )}

            {contentHtml ? (
              <div
                className="prose prose-neutral max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : event.excerpt ? (
              <p className="text-lg leading-relaxed text-muted-foreground">{event.excerpt}</p>
            ) : null}

            <OccurrenceList occurrences={occurrences} />
          </div>

          <aside className="space-y-6">
            <Card>
              <CardContent className="space-y-4 pt-6 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Datum</p>
                    <p className="text-muted-foreground">
                      {formatDateDE(event.startDate)}
                      {event.endDate && event.endDate !== event.startDate && (
                        <> – {formatDateDE(event.endDate)}</>
                      )}
                    </p>
                  </div>
                </div>

                {timeLabel && (
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Uhrzeit</p>
                      <p className="text-muted-foreground">{timeLabel}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Ort</p>
                    <p className="text-muted-foreground">{resolveVenueName(event)}</p>
                    {venue?.address && (
                      <p className="mt-1 text-muted-foreground">
                        {venue.address}
                        {venue.postalCode || venue.city ? (
                          <>
                            <br />
                            {[venue.postalCode, venue.city].filter(Boolean).join(" ")}
                          </>
                        ) : null}
                      </p>
                    )}
                    {venue?.showMapLink !== false && venue?.mapUrl && (
                      <a
                        href={venue.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        Karte öffnen
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                {organizers.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Veranstalter</p>
                      <p className="text-muted-foreground">{organizers.join(", ")}</p>
                    </div>
                  </div>
                )}

                {event.admissionFee && event.admissionFee !== "0" && (
                  <div>
                    <p className="font-medium">Eintritt</p>
                    <p className="text-muted-foreground">
                      {event.admissionFee} {event.admissionCurrency ?? "EUR"}
                    </p>
                  </div>
                )}

                {event.website && (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={event.website} target="_blank" rel="noopener noreferrer">
                      Zur Veranstaltungs-Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}

                {event.isVirtual && event.virtualUrl && (
                  <Button size="sm" className="w-full" asChild>
                    <a href={event.virtualUrl} target="_blank" rel="noopener noreferrer">
                      Zur Online-Veranstaltung
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {event.showQrCode !== false && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="mb-3 text-sm font-medium">QR-Code zum Teilen</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/events/${slug}/qr`}
                    alt={`QR-Code für ${event.title}`}
                    width={200}
                    height={200}
                    className="mx-auto rounded-lg border border-border"
                  />
                  <p className="mt-3 break-all text-xs text-muted-foreground">{eventUrl}</p>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}