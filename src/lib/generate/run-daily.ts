import type { Payload } from "payload";
import { callGrokJson } from "@/lib/grok/client";
import { PARTY_DAILY_SYSTEM_PROMPT } from "@/lib/grok/party";

type DailyImpulseBatch = {
  impulses: Array<{
    title: string;
    shortText: string;
    libertarianPerspective: string;
    sourceLink?: string;
  }>;
};

const IMPULSES_PER_RUN = Number(process.env.GENERATE_DAILY_COUNT ?? "3");

function todayIso(): string {
  return new Date().toISOString().split("T")[0];
}

export type RunDailyResult = {
  ok: true;
  date: string;
  created: number;
  skipped: boolean;
  titles: string[];
};

export async function runGenerateDaily(payload: Payload): Promise<RunDailyResult> {
  const date = todayIso();

  const existing = await payload.find({
    collection: "daily-impulses",
    where: { date: { equals: date } },
    limit: 10,
    pagination: false,
  });

  const remaining = Math.max(0, IMPULSES_PER_RUN - existing.docs.length);
  if (remaining === 0) {
    return {
      ok: true,
      date,
      created: 0,
      skipped: true,
      titles: [],
    };
  }

  const result = await callGrokJson<DailyImpulseBatch>({
    messages: [
      {
        role: "system",
        content: PARTY_DAILY_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content:
          `Erstelle genau ${remaining} aktuelle Tagesimpulse für libertäre Leser zum Datum ${date}. ` +
          "Jeder Impuls: kurzer Nachrichtentitel, 2–4 Sätze Kurztext zu einem aktuellen Thema (Politik, Wirtschaft, Freiheit), " +
          "1–3 Sätze libertäre Einordnung (NAP, Eigentum, Minimalstaat, freier Markt). " +
          'JSON-Format: {"impulses":[{"title":"...","shortText":"...","libertarianPerspective":"...","sourceLink":"https://..."}]}. ' +
          "sourceLink optional (echte oder plausible Nachrichten-URL). Keine erfundenen Zitate von Personen.",
      },
    ],
  });

  const impulses = result.impulses?.slice(0, remaining) ?? [];
  if (impulses.length === 0) {
    throw new Error("Grok lieferte keine Impulse.");
  }

  const titles: string[] = [];
  for (const impulse of impulses) {
    await payload.create({
      collection: "daily-impulses",
      data: {
        title: impulse.title,
        shortText: impulse.shortText,
        libertarianPerspective: impulse.libertarianPerspective,
        date,
        sourceLink: impulse.sourceLink,
        published: true,
      },
    });
    titles.push(impulse.title);
  }

  return {
    ok: true,
    date,
    created: impulses.length,
    skipped: false,
    titles,
  };
}