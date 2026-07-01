"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventDisplay } from "@/lib/cms/events";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] as const;

type EventsCalendarProps = {
  events: EventDisplay[];
};

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
}

function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function eventOnDay(event: EventDisplay, isoDate: string): boolean {
  const end = event.endDate ?? event.startDate;
  return event.startDate <= isoDate && end >= isoDate;
}

function formatEventDate(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  if (endDate && endDate !== startDate) {
    const end = new Date(endDate);
    return `${start.toLocaleDateString("de-DE", options)} – ${end.toLocaleDateString("de-DE", options)}`;
  }
  return start.toLocaleDateString("de-DE", options);
}

export function EventsCalendar({ events }: EventsCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const todayIso = useMemo(
    () => toIsoDate(today.getFullYear(), today.getMonth(), today.getDate()),
    [today]
  );

  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(todayIso);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = lastDay.getDate();

    const cells: Array<{ day: number | null; iso?: string }> = [];
    for (let i = 0; i < startOffset; i++) {
      cells.push({ day: null });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({ day, iso: toIsoDate(year, month, day) });
    }
    return cells;
  }, [year, month]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventDisplay[]>();
    for (const event of events) {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate ?? event.startDate);
      const cursor = new Date(start);
      while (cursor <= end) {
        const iso = toIsoDate(
          cursor.getFullYear(),
          cursor.getMonth(),
          cursor.getDate()
        );
        const list = map.get(iso) ?? [];
        if (!list.some((item) => item.id === event.id)) {
          list.push(event);
          map.set(iso, list);
        }
        cursor.setDate(cursor.getDate() + 1);
      }
    }
    return map;
  }, [events]);

  const monthEvents = useMemo(
    () =>
      events.filter((event) => {
        const end = event.endDate ?? event.startDate;
        const monthStart = toIsoDate(year, month, 1);
        const monthEnd = toIsoDate(year, month, new Date(year, month + 1, 0).getDate());
        return event.startDate <= monthEnd && end >= monthStart;
      }),
    [events, year, month]
  );

  const selectedEvents = selectedDate
    ? (eventsByDate.get(selectedDate) ?? [])
    : monthEvents;

  const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <div className="space-y-10">
      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-4 md:px-6">
          <Button variant="outline" size="icon" onClick={goPrevMonth} aria-label="Vorheriger Monat">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-display text-xl font-bold capitalize md:text-2xl">
            {formatMonthYear(viewDate)}
          </h2>
          <Button variant="outline" size="icon" onClick={goNextMonth} aria-label="Nächster Monat">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 border-b border-border bg-secondary/5 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-3">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarDays.map((cell, index) => {
            if (!cell.day || !cell.iso) {
              return (
                <div
                  key={`empty-${index}`}
                  className="min-h-[4.5rem] border-b border-r border-border/60 bg-muted/10 md:min-h-[5.5rem]"
                />
              );
            }

            const iso = cell.iso;
            const dayEvents = eventsByDate.get(iso) ?? [];
            const isToday = iso === todayIso;
            const isSelected = iso === selectedDate;

            return (
              <button
                key={iso}
                type="button"
                onClick={() => setSelectedDate(iso)}
                className={cn(
                  "relative min-h-[4.5rem] border-b border-r border-border/60 p-2 text-left transition-colors hover:bg-primary/5 md:min-h-[5.5rem]",
                  isSelected && "bg-primary/10 ring-2 ring-inset ring-primary/40",
                  isToday && !isSelected && "bg-primary/5"
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium",
                    isToday && "bg-primary text-secondary"
                  )}
                >
                  {cell.day}
                </span>
                {dayEvents.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <span
                        key={event.id}
                        className="block h-1.5 w-1.5 rounded-full bg-primary"
                        title={event.title}
                      />
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[10px] text-muted-foreground">
                        +{dayEvents.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-6 font-display text-2xl font-bold">
          {selectedDate
            ? `Termine am ${new Date(selectedDate).toLocaleDateString("de-DE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}`
            : `Termine im ${formatMonthYear(viewDate)}`}
        </h3>

        {selectedEvents.length === 0 ? (
          <p className="text-muted-foreground">Keine Termine an diesem Tag.</p>
        ) : (
          <div className="grid gap-6">
            {selectedEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {event.imageUrl && (
                    <div className="relative h-48 w-full md:h-auto md:w-64 md:shrink-0">
                      <Image
                        src={event.imageUrl}
                        alt={event.imageAlt ?? event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 256px"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2">
                        <Badge>{event.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {formatEventDate(event.startDate, event.endDate)}
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
                      {event.description && <p>{event.description}</p>}
                      {event.link && event.link !== "/events" && (
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <Link
                            href={event.link}
                            target={event.link.startsWith("http") ? "_blank" : undefined}
                            rel={
                              event.link.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            Mehr Infos
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}