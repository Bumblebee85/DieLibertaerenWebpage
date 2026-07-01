import type { Payload } from "payload";
import { getWeeklyEssaySystemPrompt } from "@/lib/cms/prompt-templates";
import { plainTextToLexical } from "@/lib/cms/rich-text";
import { slugify } from "@/lib/cms/slugify";
import { callGrokJson } from "@/lib/grok/client";
import { PARTY_ACCOUNT } from "@/lib/grok/party";
import { getWeekNumber } from "@/lib/utils";

type WeeklyPostResult = {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
};

function todayIso(): string {
  return new Date().toISOString().split("T")[0];
}

function weekSlug(date = new Date()): string {
  const week = getWeekNumber(date);
  return `woche-${date.getFullYear()}-${String(week).padStart(2, "0")}`;
}

async function ensureCategory(payload: Payload, name: string): Promise<string> {
  const slug = slugify(name);
  const existing = await payload.find({
    collection: "blog-categories",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (existing.docs[0]) {
    return String(existing.docs[0].id);
  }

  const created = await payload.create({
    collection: "blog-categories",
    data: { name, slug },
  });
  return String(created.id);
}

export type RunWeeklyResult = {
  ok: true;
  weekNumber: number;
  slug: string;
  skipped: boolean;
  createdEssay: boolean;
  createdPost: boolean;
  title?: string;
};

export async function runGenerateWeekly(payload: Payload): Promise<RunWeeklyResult> {
  const now = new Date();
  const slug = weekSlug(now);
  const weekNumber = getWeekNumber(now);
  const date = todayIso();

  const [existingPost, existingEssay] = await Promise.all([
    payload.find({
      collection: "blog-posts",
      where: { slug: { equals: slug } },
      limit: 1,
    }),
    payload.find({
      collection: "weekly-essays",
      where: { week: { equals: weekNumber } },
      limit: 1,
    }),
  ]);

  if (existingPost.docs.length > 0 && existingEssay.docs.length > 0) {
    return {
      ok: true,
      weekNumber,
      slug,
      skipped: true,
      createdEssay: false,
      createdPost: false,
    };
  }

  const systemPrompt = await getWeeklyEssaySystemPrompt(payload);

  const result = await callGrokJson<WeeklyPostResult>({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content:
          `Schreibe den Libertären Aufsatz der Woche für Kalenderwoche ${weekNumber}. ` +
          "Wähle ein aktuelles oder zeitloses Thema aus Politik, Wirtschaft oder Gesellschaft und ordne es libertär ein (NAP, Eigentum, Minimalstaat, freier Markt). " +
          "Ca. 500 Wörter natürlicher Fließtext in content (Absätze mit \\n\\n). " +
          'JSON: {"title":"...","excerpt":"...","content":"...","tags":["..."],"category":"Grundlagen|Politik|Wirtschaft|Gesellschaft"}. ' +
          "Titel knackig, excerpt 1–2 Sätze. Keine erfundenen Zitate von realen Personen.",
      },
    ],
    temperature: 0.7,
  });

  const lexicalContent = plainTextToLexical(result.content);
  let createdEssay = false;
  let createdPost = false;

  if (existingEssay.docs.length === 0) {
    await payload.create({
      collection: "weekly-essays",
      data: {
        week: weekNumber,
        title: result.title,
        author: PARTY_ACCOUNT.author,
        excerpt: result.excerpt,
        content: lexicalContent,
        tags: (result.tags ?? []).map((tag) => ({ tag })),
        published: true,
      },
    });
    createdEssay = true;
  }

  if (existingPost.docs.length === 0) {
    const categoryId = await ensureCategory(payload, result.category || "Grundlagen");

    await payload.create({
      collection: "blog-posts",
      data: {
        title: result.title,
        slug,
        excerpt: result.excerpt,
        content: lexicalContent,
        date,
        author: PARTY_ACCOUNT.author,
        category: categoryId,
        tags: (result.tags ?? []).map((tag) => ({ tag })),
        published: true,
      },
    });
    createdPost = true;
  }

  return {
    ok: true,
    weekNumber,
    slug,
    skipped: false,
    createdEssay,
    createdPost,
    title: result.title,
  };
}