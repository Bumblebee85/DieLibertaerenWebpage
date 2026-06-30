import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";
import { plainTextToLexical } from "@/lib/cms/rich-text";
import { slugify } from "@/lib/cms/slugify";
import { callGrokJson } from "@/lib/grok/client";
import { PARTY_ACCOUNT, PARTY_WEEKLY_SYSTEM_PROMPT } from "@/lib/grok/party";
import { getDatabaseHost, getDatabaseName, getPayloadEnvStatus } from "@/lib/payload-env";
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

function weekSlug(): string {
  const now = new Date();
  const week = getWeekNumber(now);
  return `woche-${now.getFullYear()}-${String(week).padStart(2, "0")}`;
}

async function ensureCategory(
  payload: Awaited<ReturnType<typeof getPayload>>,
  name: string
): Promise<string> {
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

async function main() {
  const env = getPayloadEnvStatus();
  if (!env.dbUrlSet) {
    console.error("Keine gültige MongoDB-URI. Setze MONGODB_URI.");
    process.exit(1);
  }

  const payload = await getPayload({ config });
  const slug = weekSlug();
  const date = todayIso();

  const existing = await payload.find({
    collection: "blog-posts",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    console.log(`– Blog-Post „${slug}“ existiert bereits. Nichts zu tun.`);
    process.exit(0);
  }

  console.log(`MongoDB: ${getDatabaseHost()} / ${getDatabaseName()}`);
  console.log(`Parteikonto: ${PARTY_ACCOUNT.name} (Grok via GROK_API_KEY)`);
  console.log(`Generiere Wochen-Blog-Post (${slug}) …`);

  const result = await callGrokJson<WeeklyPostResult>({
    messages: [
      {
        role: "system",
        content: PARTY_WEEKLY_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content:
          `Schreibe einen vollständigen Blog-Artikel für Kalenderwoche ${slug.replace("woche-", "")}. ` +
          "Thema: libertärer Gedanke mit Bezug zu Freiheit, Eigentum, Minimalstaat oder freiem Markt. " +
          "800–1200 Wörter Fließtext in content (Absätze mit \\n\\n). " +
          'JSON: {"title":"...","excerpt":"...","content":"...","tags":["..."],"category":"Grundlagen|Politik|Wirtschaft|Gesellschaft"}. ' +
          "Keine erfundenen Zitate von realen Personen.",
      },
    ],
    temperature: 0.6,
  });

  const categoryId = await ensureCategory(payload, result.category || "Grundlagen");
  const postSlug = slug;

  await payload.create({
    collection: "blog-posts",
    data: {
      title: result.title,
      slug: postSlug,
      excerpt: result.excerpt,
      content: plainTextToLexical(result.content),
      date,
      author: PARTY_ACCOUNT.author,
      category: categoryId,
      tags: (result.tags ?? []).map((tag) => ({ tag })),
      published: true,
    },
  });

  console.log(`✓ Blog-Post angelegt: ${result.title} (/blog/${postSlug})`);
  process.exit(0);
}

main().catch((error) => {
  console.error("generate:weekly fehlgeschlagen:", error instanceof Error ? error.message : error);
  process.exit(1);
});