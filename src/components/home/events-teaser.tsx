import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/shared/section";
import { WeeklyEssayTeaser } from "@/components/home/weekly-essay-teaser";
import { getUpcomingEvents } from "@/lib/cms/events";
import { formatDateDE } from "@/lib/utils";

function formatEventDate(startDate: string, endDate?: string): string {
  if (endDate && endDate !== startDate) {
    return `${formatDateDE(startDate)} – ${formatDateDE(endDate)}`;
  }
  return formatDateDE(startDate);
}

/**
 * Aktuelle Veranstaltungen + aktueller libertärer Beitrag.
 * Sektion bleibt sichtbar (mindestens Beitrag), auch ohne kommende Termine.
 */
export async function EventsTeaser() {
  const upcoming = await getUpcomingEvents(3);

  return (
    <Section className="border-t border-black/10">
      <SectionHeader
        title="Aktuelle Veranstaltungen"
        subtitle="Triff uns auf unseren Veranstaltungen – und lies den aktuellen libertären Beitrag."
      />

      {upcoming.length > 0 && (
        <>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {upcoming.map((event) => (
              <Card
                key={event.id}
                className="texture-surface-card overflow-hidden transition-shadow hover:shadow-lg"
              >
                {event.imageUrl && (
                  <div className="relative h-40 w-full">
                    <Image
                      src={event.imageUrl}
                      alt={event.imageAlt ?? event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {event.categories.slice(0, 2).map((category) => (
                      <Badge key={category}>{category}</Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    {formatEventDate(event.startDate, event.endDate)}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {event.location}
                  </div>
                  {event.description && (
                    <p className="line-clamp-3 leading-relaxed">{event.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/events">Zu allen Terminen</Link>
            </Button>
          </div>
        </>
      )}

      <div className={upcoming.length > 0 ? "mt-16" : undefined}>
        <WeeklyEssayTeaser />
      </div>
    </Section>
  );
}