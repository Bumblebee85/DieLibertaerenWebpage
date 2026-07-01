import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { EventsCalendar } from "@/components/events/events-calendar";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { getAllPublishedEvents, getCalendarLinks } from "@/lib/cms/events";
import siteConfig from "@/data/site-config.json";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(seoPages.events);
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const [events, calendarLinks] = await Promise.all([
    getAllPublishedEvents(),
    Promise.resolve(getCalendarLinks()),
  ]);

  return (
    <>
      <PageHeader
        title="Events & Stammtische"
        subtitle="Unser Veranstaltungskalender – Termine, Stammtische und Feste von DIE LIBERTÄREN."
      />

      <Section>
        <div className="mb-12 rounded-2xl border border-primary/20 bg-primary/5 p-8">
          <h2 className="font-display text-2xl font-bold">Freiheitliche Stammtische</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Das Projekt der freiheitlichen Stammtische visualisiert bestehende
            Stammtische verschiedener Organisationen in ganz Deutschland, um
            freiheitliche Gedanken und Gespräche leichter zugänglich zu machen.
          </p>
          <Button className="mt-6" asChild>
            <a href={siteConfig.stammtische} target="_blank" rel="noopener noreferrer">
              freiheitliche-stammtische.de
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {events.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Aktuell sind keine Veranstaltungen eingetragen.
          </p>
        ) : (
          <EventsCalendar events={events} />
        )}

        <div className="mt-16 rounded-2xl bg-muted/50 p-8">
          <h3 className="font-display text-xl font-bold">Kalender abonnieren</h3>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <a href={calendarLinks.google} target="_blank" rel="noopener noreferrer">
                Google Kalender
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={calendarLinks.ical}>iCalendar</a>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}