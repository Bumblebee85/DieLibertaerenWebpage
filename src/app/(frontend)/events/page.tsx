import type { Metadata } from "next";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCalendarLinks, getUpcomingEvents } from "@/lib/cms/events";
import siteConfig from "@/data/site-config.json";

export const metadata: Metadata = {
  title: "Events & Stammtische",
  description:
    "Veranstaltungen, libertäre Stammtische und Termine von DIE LIBERTÄREN in ganz Deutschland.",
};

export default async function EventsPage() {
  const events = await getUpcomingEvents(50);
  const calendarLinks = getCalendarLinks();

  return (
    <>
      <PageHeader
        title="Events & Stammtische"
        subtitle="Triff uns auf unseren Veranstaltungen oder lerne uns auf Events der Community kennen."
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

        <div className="grid gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex items-center justify-center bg-secondary p-8 text-center text-white md:w-48">
                  <div>
                    <Calendar className="mx-auto mb-2 h-8 w-8 text-primary" />
                    <p className="text-sm font-medium">
                      {new Date(event.date).toLocaleDateString("de-DE", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                    <p className="text-2xl font-bold">
                      {new Date(event.date).getFullYear()}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2">
                      <Badge>{event.type}</Badge>
                      {event.recurring && <Badge variant="muted">Wiederkehrend</Badge>}
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        {event.time}
                        {event.recurrence && ` · ${event.recurrence}`}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {event.location}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

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