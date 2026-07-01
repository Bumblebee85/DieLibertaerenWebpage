import type { Payload } from "payload";
import { PROMPT_TEMPLATE_KEYS } from "@/collections/PromptTemplates";
import beiratData from "@/data/beirat.json";
import blogPostsData from "@/data/blog-posts.json";
import freiheitsbewegungData from "@/data/freiheitsbewegung.json";
import thesenData from "@/data/thesen-v4.json";
import wahlomatData from "@/data/wahlomat-thesen.json";
import weeklyEssaysData from "@/data/weekly-essays.json";
import { plainParagraphsToLexical, plainTextToLexical } from "@/lib/cms/rich-text";
import { slugify } from "@/lib/cms/slugify";
import {
  PARTY_DAILY_SYSTEM_PROMPT,
  PARTY_WEEKLY_SYSTEM_PROMPT,
} from "@/lib/grok/party";

export type EditorialSeedStats = {
  program: boolean;
  topics: number;
  kompass: boolean;
  blogPosts: number;
  weeklyEssays: number;
  beirat: boolean;
  beiratMembers: number;
  freiheitsbewegung: boolean;
  prompts: number;
};

export async function needsEditorialSeed(payload: Payload): Promise<boolean> {
  const [prompts, weekly, beiratGlobal, program] = await Promise.all([
    payload.find({ collection: "prompt-templates", limit: 1 }),
    payload.find({ collection: "weekly-essays", limit: 1 }),
    payload.findGlobal({ slug: "beirat" }),
    payload.findGlobal({ slug: "program" }),
  ]);

  return (
    prompts.totalDocs < 2 ||
    weekly.totalDocs === 0 ||
    !beiratGlobal?.intro ||
    !program?.leitbild?.vision?.headline
  );
}

/** Idempotent: Programm, Kompass, Blog, Beiträge, Beirat, Prompts. */
export async function runEditorialSeed(payload: Payload): Promise<EditorialSeedStats> {
  const stats: EditorialSeedStats = {
    program: false,
    topics: 0,
    kompass: false,
    blogPosts: 0,
    weeklyEssays: 0,
    beirat: false,
    beiratMembers: 0,
    freiheitsbewegung: false,
    prompts: 0,
  };

  const existingProgram = await payload.findGlobal({ slug: "program" });
  if (!existingProgram?.leitbild?.vision?.headline) {
    await payload.updateGlobal({
      slug: "program",
      data: {
        title: thesenData.title,
        subtitle: thesenData.subtitle,
        leitbild: thesenData.leitbild,
        grundthese: {
          title: thesenData.grundthese.title,
          text: thesenData.grundthese.text,
          pillars: thesenData.grundthese.pillars.map((pillar) => ({
            id: pillar.id as "individuell" | "vertraglich" | "gesellschaftlich",
            title: pillar.title,
            subtitle: pillar.subtitle,
            description: pillar.description,
          })),
        },
        ersteMassnahmen: thesenData.ersteMassnahmen.map((text) => ({ text })),
      },
    });
    stats.program = true;
  }

  const existingTopics = await payload.find({
    collection: "program-topic-categories",
    limit: 1,
  });
  if (existingTopics.docs.length === 0) {
    for (const [index, topic] of thesenData.topics.entries()) {
      await payload.create({
        collection: "program-topic-categories",
        data: {
          category: topic.category,
          pillar: topic.pillar as "individuell" | "vertraglich" | "gesellschaftlich",
          sortOrder: index,
          items: topic.items,
          published: true,
        },
      });
      stats.topics++;
    }
  }

  const existingElection = await payload.find({
    collection: "wahlomat-elections",
    where: { slug: { equals: "sachsen-anhalt-2026" } },
    limit: 1,
  });
  if (existingElection.docs.length === 0) {
    await payload.create({
      collection: "wahlomat-elections",
      data: {
        title: wahlomatData.title,
        slug: "sachsen-anhalt-2026",
        subtitle: wahlomatData.subtitle,
        region: wahlomatData.region,
        year: 2026,
        source: wahlomatData.source,
        isDefault: true,
        published: true,
        thesen: wahlomatData.thesen.map((these) => ({
          theseNumber: these.id,
          theseText: these.these,
          position: these.position as "Ja" | "Nein" | "Neutral",
          begruendung: these.begruendung,
          category: these.category,
        })),
      },
    });
    stats.kompass = true;
  }

  const categoryMap = new Map<string, string | number>();
  const uniqueCategories = new Set<string>();
  for (const post of blogPostsData.posts) {
    uniqueCategories.add(post.tags[0] ?? "Allgemein");
  }

  for (const name of uniqueCategories) {
    const slug = slugify(name);
    const existing = await payload.find({
      collection: "blog-categories",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: "blog-categories",
        data: { name, slug },
      });
      categoryMap.set(name, created.id);
    } else {
      categoryMap.set(name, existing.docs[0].id);
    }
  }

  for (const post of blogPostsData.posts) {
    const existing = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: post.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;

    const categoryName = post.tags[0] ?? "Allgemein";
    const categoryId = categoryMap.get(categoryName);
    if (!categoryId) continue;

    await payload.create({
      collection: "blog-posts",
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: plainTextToLexical(post.excerpt),
        date: post.date,
        author: post.author,
        category: String(categoryId),
        tags: post.tags.map((tag) => ({ tag })),
        published: true,
      },
    });
    stats.blogPosts++;
  }

  for (const essay of weeklyEssaysData.essays) {
    const existing = await payload.find({
      collection: "weekly-essays",
      where: { week: { equals: essay.week } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;

    await payload.create({
      collection: "weekly-essays",
      data: {
        week: essay.week,
        title: essay.title,
        author: essay.author,
        excerpt: essay.excerpt,
        content: plainTextToLexical(essay.content),
        tags: essay.tags.map((tag) => ({ tag })),
        published: true,
      },
    });
    stats.weeklyEssays++;
  }

  const existingBeirat = await payload.findGlobal({ slug: "beirat" });
  if (!existingBeirat?.intro) {
    await payload.updateGlobal({
      slug: "beirat",
      data: {
        pageTitle: beiratData.pageTitle,
        pageSubtitle: beiratData.pageSubtitle,
        intro: beiratData.intro,
        tasksSectionTitle: beiratData.tasksSectionTitle,
        tasks: beiratData.tasks.map((task) => ({
          icon: task.icon as
            | "book-open"
            | "line-chart"
            | "megaphone"
            | "search"
            | "user-search"
            | "users",
          title: task.title,
          text: task.text,
        })),
        membersSectionTitle: beiratData.membersSectionTitle,
        membersSectionSubtitle: beiratData.membersSectionSubtitle,
        nachruf: {
          enabled: beiratData.nachruf.enabled,
          badgeLabel: beiratData.nachruf.badgeLabel,
          title: beiratData.nachruf.title,
          subtitle: beiratData.nachruf.subtitle,
          body: plainParagraphsToLexical(beiratData.nachruf.paragraphs),
        },
        contactHint: beiratData.contactHint,
      },
    });
    stats.beirat = true;
  }

  for (const member of beiratData.members) {
    const existing = await payload.find({
      collection: "beirat-members",
      where: { name: { equals: member.name } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;

    await payload.create({
      collection: "beirat-members",
      data: {
        name: member.name,
        role: member.role,
        bio: member.bio,
        imageUrl: member.imageUrl,
        deceased: member.deceased,
        deceasedDate: member.deceasedDate,
        sortOrder: member.sortOrder,
        published: true,
      },
    });
    stats.beiratMembers++;
  }

  const existingFreiheit = await payload.findGlobal({ slug: "freiheitsbewegung" });
  if (!(existingFreiheit?.introParagraphs ?? []).length) {
    await payload.updateGlobal({
      slug: "freiheitsbewegung",
      data: {
        pageTitle: freiheitsbewegungData.pageTitle,
        pageSubtitle: freiheitsbewegungData.pageSubtitle,
        introParagraphs: freiheitsbewegungData.introParagraphs.map((text) => ({
          text,
        })),
        austrianSchool: {
          title: freiheitsbewegungData.austrianSchool.title,
          subtitle: freiheitsbewegungData.austrianSchool.subtitle,
          cardLeft: {
            title: freiheitsbewegungData.austrianSchool.cardLeft.title,
            paragraphs: freiheitsbewegungData.austrianSchool.cardLeft.paragraphs.map(
              (text) => ({ text })
            ),
          },
          cardRight: {
            title: freiheitsbewegungData.austrianSchool.cardRight.title,
            paragraphs: freiheitsbewegungData.austrianSchool.cardRight.paragraphs.map(
              (text) => ({ text })
            ),
          },
        },
        figuresSectionTitle: freiheitsbewegungData.figuresSectionTitle,
        figures: freiheitsbewegungData.figures.map((figure) => ({
          name: figure.name,
          years: figure.years,
          role: figure.role,
          imageUrl: figure.imageUrl,
        })),
        history: {
          title: freiheitsbewegungData.history.title,
          subtitle: freiheitsbewegungData.history.subtitle,
          paragraphs: freiheitsbewegungData.history.paragraphs.map((item) => ({
            icon: item.icon as "book-open" | "globe",
            text: item.text,
          })),
          milestonesTitle: freiheitsbewegungData.history.milestonesTitle,
          milestones: freiheitsbewegungData.history.milestones.map((text) => ({
            text,
          })),
        },
      },
    });
    stats.freiheitsbewegung = true;
  }

  const promptSeeds = [
    {
      slug: PROMPT_TEMPLATE_KEYS.DAILY_IMPULSES_SYSTEM,
      name: "Tagesimpulse – System-Prompt",
      systemPrompt: PARTY_DAILY_SYSTEM_PROMPT,
      description:
        "System-Prompt für npm run generate:daily und /generate-daily. JSON-Ausgabe beibehalten.",
    },
    {
      slug: PROMPT_TEMPLATE_KEYS.WEEKLY_ESSAY_SYSTEM,
      name: "Libertärer Beitrag – System-Prompt",
      systemPrompt: PARTY_WEEKLY_SYSTEM_PROMPT,
      description:
        "System-Prompt für npm run generate:weekly. Aktueller libertärer Beitrag, Stil Mathias Hummel, ca. 500 Wörter.",
    },
  ] as const;

  for (const prompt of promptSeeds) {
    const existing = await payload.find({
      collection: "prompt-templates",
      where: { slug: { equals: prompt.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;

    await payload.create({
      collection: "prompt-templates",
      data: {
        name: prompt.name,
        slug: prompt.slug,
        systemPrompt: prompt.systemPrompt,
        description: prompt.description,
        active: true,
      },
    });
    stats.prompts++;
  }

  return stats;
}