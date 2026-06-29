import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/shared/section";
import { getUpcomingEvents } from "@/lib/cms/events";
import { formatDateDE } from "@/lib/utils";

export async function EventsTeaser() {
  const upcoming = (await getUpcomingEvents(3));

  return (
    <Section className="border-t border-black/10">
      <SectionHeader
        title="Veranstaltungen"
        subtitle="Triff uns auf unseren Veranstaltungen oder lerne uns auf Events der Community kennen."
      />
      <div className="grid gap-8 md:grid-cols-3 md:gap-10">
        {upcoming.map((event) => (
          <Card
            key={event.id}
            className="texture-surface-card transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <Badge>{event.type}</Badge>
                {event.recurring && (
                  <Badge variant="muted">Serie</Badge>
                )}
              </div>
              <CardTitle className="text-lg">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                {formatDateDE(event.date)}
              </div>
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {event.time}
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {event.location}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button size="lg" asChild>
          <Link href="/events">Zu allen Terminen</Link>
        </Button>
      </div>
    </Section>
  );
}