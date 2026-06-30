import weeklyEssaysData from "@/data/weekly-essays.json";
import { getPayloadClient } from "@/lib/payload";
import type { WeeklyEssay } from "@/payload-types";
import { getWeekNumber } from "@/lib/utils";

export type WeeklyEssayDisplay = {
  id: string;
  week: number;
  title: string;
  author: string;
  excerpt: string;
  content?: unknown;
  contentPlain: string;
  tags: string[];
};

function mapJsonEssay(
  essay: (typeof weeklyEssaysData.essays)[number]
): WeeklyEssayDisplay {
  return {
    id: essay.id,
    week: essay.week,
    title: essay.title,
    author: essay.author,
    excerpt: essay.excerpt,
    contentPlain: essay.content,
    tags: essay.tags,
  };
}

function mapEssay(doc: WeeklyEssay): WeeklyEssayDisplay {
  return {
    id: String(doc.id),
    week: doc.week,
    title: doc.title,
    author: doc.author ?? "DIE LIBERTÄREN",
    excerpt: doc.excerpt,
    content: doc.content,
    contentPlain: "",
    tags: (doc.tags ?? []).map((item) => item.tag),
  };
}

export async function getPublishedWeeklyEssays(): Promise<WeeklyEssayDisplay[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "weekly-essays",
      where: { published: { equals: true } },
      sort: "week",
      limit: 52,
      pagination: false,
      depth: 0,
    });

    if (result.docs.length > 0) {
      return result.docs.map((doc) => mapEssay(doc as WeeklyEssay));
    }
  } catch {
    // Fallback unten
  }

  return weeklyEssaysData.essays.map(mapJsonEssay);
}

export async function getWeeklyEssayForCurrentWeek(): Promise<{
  essay: WeeklyEssayDisplay;
  weekNumber: number;
}> {
  const weekNumber = getWeekNumber();
  const essays = await getPublishedWeeklyEssays();

  const exact = essays.find((e) => e.week === weekNumber);
  if (exact) return { essay: exact, weekNumber };

  const fallback = essays[(weekNumber - 1) % essays.length];
  return { essay: fallback, weekNumber };
}