import type { Event } from "@/payload-types";

export type RecurrenceConfig = NonNullable<Event["recurrence"]>;

export type OccurrenceWindow = {
  occurrenceStart: string;
  occurrenceEnd: string;
};

const MS_PER_DAY = 86_400_000;

function parseIso(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function daysBetween(start: string, end: string): number {
  const s = parseIso(start);
  const e = parseIso(end);
  return Math.round((e.getTime() - s.getTime()) / MS_PER_DAY);
}

function getWeekday(date: Date): number {
  return date.getDay();
}

function getNthWeekdayOfMonth(
  year: number,
  month: number,
  weekOfMonth: RecurrenceConfig["weekOfMonth"],
  weekday: number
): Date | null {
  if (weekOfMonth === "last") {
    const lastDay = new Date(year, month + 1, 0);
    let cursor = lastDay;
    while (cursor.getMonth() === month) {
      if (cursor.getDay() === weekday) return cursor;
      cursor = addDays(cursor, -1);
    }
    return null;
  }

  const weekIndex = { first: 0, second: 1, third: 2, fourth: 3 }[weekOfMonth ?? "first"] ?? 0;
  const first = new Date(year, month, 1);
  let cursor = first;
  let count = 0;

  while (cursor.getMonth() === month) {
    if (cursor.getDay() === weekday) {
      if (count === weekIndex) return cursor;
      count++;
    }
    cursor = addDays(cursor, 1);
  }

  return null;
}

function getExceptionDates(recurrence?: RecurrenceConfig | null): Set<string> {
  const dates = new Set<string>();
  for (const item of recurrence?.exceptions ?? []) {
    if (item?.date) dates.add(item.date);
  }
  return dates;
}

function isInRange(iso: string, rangeStart: string, rangeEnd: string): boolean {
  return iso >= rangeStart && iso <= rangeEnd;
}

function expandWeekly(
  eventStart: string,
  durationDays: number,
  recurrence: RecurrenceConfig,
  rangeStart: string,
  rangeEnd: string,
  exceptions: Set<string>
): OccurrenceWindow[] {
  const occurrences: OccurrenceWindow[] = [];
  const interval = recurrence.interval ?? 1;
  const targetWeekday = Number(recurrence.weekday ?? getWeekday(parseIso(eventStart)));
  const seriesEnd = recurrence.endDate ?? rangeEnd;

  let cursor = parseIso(eventStart);
  while (getWeekday(cursor) !== targetWeekday) {
    cursor = addDays(cursor, 1);
  }

  let weekCounter = 0;
  while (toIso(cursor) <= seriesEnd && toIso(cursor) <= rangeEnd) {
    if (weekCounter % interval === 0) {
      const start = toIso(cursor);
      if (!exceptions.has(start) && isInRange(start, rangeStart, rangeEnd)) {
        const end = toIso(addDays(cursor, durationDays));
        occurrences.push({ occurrenceStart: start, occurrenceEnd: end });
      }
    }
    cursor = addDays(cursor, 7);
    weekCounter++;
  }

  return occurrences;
}

function expandMonthly(
  eventStart: string,
  durationDays: number,
  recurrence: RecurrenceConfig,
  rangeStart: string,
  rangeEnd: string,
  exceptions: Set<string>
): OccurrenceWindow[] {
  const occurrences: OccurrenceWindow[] = [];
  const interval = recurrence.interval ?? 1;
  const weekday = Number(recurrence.weekday ?? getWeekday(parseIso(eventStart)));
  const weekOfMonth = recurrence.weekOfMonth ?? "first";
  const seriesEnd = recurrence.endDate ?? rangeEnd;

  const start = parseIso(eventStart);
  let year = start.getFullYear();
  let month = start.getMonth();
  let monthCounter = 0;

  while (true) {
    const candidate = getNthWeekdayOfMonth(year, month, weekOfMonth, weekday);
    if (candidate) {
      const iso = toIso(candidate);
      if (iso > seriesEnd) break;
      if (monthCounter % interval === 0 && !exceptions.has(iso)) {
        if (isInRange(iso, rangeStart, rangeEnd)) {
          occurrences.push({
            occurrenceStart: iso,
            occurrenceEnd: toIso(addDays(candidate, durationDays)),
          });
        }
      }
    }

    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    monthCounter++;

    const probe = new Date(year, month, 1);
    if (toIso(probe) > seriesEnd && toIso(probe) > rangeEnd) break;
    if (year > 2100) break;
  }

  return occurrences;
}

function expandYearly(
  eventStart: string,
  durationDays: number,
  recurrence: RecurrenceConfig,
  rangeStart: string,
  rangeEnd: string,
  exceptions: Set<string>
): OccurrenceWindow[] {
  const occurrences: OccurrenceWindow[] = [];
  const interval = recurrence.interval ?? 1;
  const seriesEnd = recurrence.endDate ?? rangeEnd;
  const start = parseIso(eventStart);

  let year = start.getFullYear();
  let yearCounter = 0;

  while (true) {
    const candidate = new Date(year, start.getMonth(), start.getDate());
    const iso = toIso(candidate);
    if (iso > seriesEnd) break;

    if (yearCounter % interval === 0 && !exceptions.has(iso)) {
      if (isInRange(iso, rangeStart, rangeEnd)) {
        occurrences.push({
          occurrenceStart: iso,
          occurrenceEnd: toIso(addDays(candidate, durationDays)),
        });
      }
    }

    year++;
    yearCounter++;
    if (year > 2100) break;
  }

  return occurrences;
}

/** Ein Event in konkrete Termine im Zeitraum auflösen (inkl. Wiederholungen). */
export function expandEventOccurrences(
  event: Pick<Event, "startDate" | "endDate" | "recurrence">,
  rangeStart: string,
  rangeEnd: string
): OccurrenceWindow[] {
  const eventEnd = event.endDate ?? event.startDate;
  const durationDays = Math.max(0, daysBetween(event.startDate, eventEnd));
  const recurrence = event.recurrence;
  const exceptions = getExceptionDates(recurrence);

  if (!recurrence?.enabled) {
    if (
      event.startDate <= rangeEnd &&
      eventEnd >= rangeStart &&
      !exceptions.has(event.startDate)
    ) {
      return [{ occurrenceStart: event.startDate, occurrenceEnd: eventEnd }];
    }
    return [];
  }

  const frequency = recurrence.frequency ?? "monthly";

  switch (frequency) {
    case "weekly":
      return expandWeekly(
        event.startDate,
        durationDays,
        recurrence,
        rangeStart,
        rangeEnd,
        exceptions
      );
    case "monthly":
      return expandMonthly(
        event.startDate,
        durationDays,
        recurrence,
        rangeStart,
        rangeEnd,
        exceptions
      );
    case "yearly":
      return expandYearly(
        event.startDate,
        durationDays,
        recurrence,
        rangeStart,
        rangeEnd,
        exceptions
      );
    default:
      return [];
  }
}

/** Kalender-Zeitraum: 12 Monate zurück, 24 Monate voraus. */
export function getDefaultExpansionRange(): { start: string; end: string } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 12, 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 24, 0);
  return { start: toIso(start), end: toIso(end) };
}

export function formatTimeRange(
  startTime?: string | null,
  endTime?: string | null,
  allDay?: boolean | null
): string | undefined {
  if (allDay) return "Ganztägig";
  if (startTime && endTime) return `${startTime} – ${endTime}`;
  if (startTime) return startTime;
  return undefined;
}

export function getRecurrenceLabel(recurrence?: RecurrenceConfig | null): string | undefined {
  if (!recurrence?.enabled) return undefined;

  const interval = recurrence.interval ?? 1;
  const freq = recurrence.frequency ?? "monthly";
  const weekdayLabel = weekdayOptions.find((w) => w.value === recurrence.weekday)?.label;
  const weekLabel = weekOfMonthOptions.find((w) => w.value === recurrence.weekOfMonth)?.label;

  if (freq === "weekly" && weekdayLabel) {
    return interval === 1
      ? `Jeden ${weekdayLabel}`
      : `Alle ${interval} Wochen (${weekdayLabel})`;
  }

  if (freq === "monthly" && weekLabel && weekdayLabel) {
    return interval === 1
      ? `${weekLabel} ${weekdayLabel} im Monat`
      : `Alle ${interval} Monate (${weekLabel} ${weekdayLabel})`;
  }

  if (freq === "yearly") {
    return interval === 1 ? "Jährlich" : `Alle ${interval} Jahre`;
  }

  return "Wiederkehrend";
}

const weekdayOptions = [
  { label: "Montag", value: "1" },
  { label: "Dienstag", value: "2" },
  { label: "Mittwoch", value: "3" },
  { label: "Donnerstag", value: "4" },
  { label: "Freitag", value: "5" },
  { label: "Samstag", value: "6" },
  { label: "Sonntag", value: "0" },
] as const;

const weekOfMonthOptions = [
  { label: "Erster", value: "first" },
  { label: "Zweiter", value: "second" },
  { label: "Dritter", value: "third" },
  { label: "Vierter", value: "fourth" },
  { label: "Letzter", value: "last" },
] as const;