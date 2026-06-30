import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";
import beiratData from "@/data/beirat.json";
import thesenData from "@/data/thesen-v4.json";
import wahlomatData from "@/data/wahlomat-thesen.json";
import blogPostsData from "@/data/blog-posts.json";
import weeklyEssaysData from "@/data/weekly-essays.json";
import freiheitsbewegungData from "@/data/freiheitsbewegung.json";
import { PROMPT_TEMPLATE_KEYS } from "@/collections/PromptTemplates";
import { plainParagraphsToLexical, plainTextToLexical } from "@/lib/cms/rich-text";
import { PARTY_DAILY_SYSTEM_PROMPT } from "@/lib/grok/party";
import { slugify } from "@/lib/cms/slugify";

/**
 * Legt Programm, Wahl-O-Mat, Blog, Wochenaufsätze, Beirat und Freiheitsbewegung in Payload an.
 * Ausführen: npm run seed:editorial
 */
async function seed() {
  const payload = await getPayload({ config });

  // --- Program global ---
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
    console.log("✓ Programm-Global angelegt");
  } else {
    console.log("– Programm-Global existiert bereits");
  }

  // --- Program topic categories ---
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
    }
    console.log(`✓ ${thesenData.topics.length} Themen-Kategorien angelegt`);
  } else {
    console.log("– Themen-Kategorien existieren bereits");
  }

  // --- Wahl-O-Mat election ---
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
    console.log(`✓ Wahl-O-Mat (${wahlomatData.thesen.length} Thesen) angelegt`);
  } else {
    console.log("– Wahl-O-Mat existiert bereits");
  }

  // --- Blog categories ---
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
      console.log(`✓ Blog-Kategorie „${name}“ angelegt`);
    } else {
      categoryMap.set(name, existing.docs[0].id);
    }
  }

  // --- Blog posts ---
  for (const post of blogPostsData.posts) {
    const existing = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: post.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`– Blog-Artikel „${post.title}“ existiert bereits`);
      continue;
    }

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
    console.log(`✓ Blog-Artikel „${post.title}“ angelegt`);
  }

  // --- Weekly essays ---
  for (const essay of weeklyEssaysData.essays) {
    const existing = await payload.find({
      collection: "weekly-essays",
      where: { week: { equals: essay.week } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`– Wochenaufsatz KW ${essay.week} existiert bereits`);
      continue;
    }

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
    console.log(`✓ Wochenaufsatz KW ${essay.week} angelegt`);
  }

  // --- Beirat global ---
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
    console.log("✓ Beirat-Global angelegt");
  } else {
    console.log("– Beirat-Global existiert bereits");
  }

  // --- Beirat members ---
  for (const member of beiratData.members) {
    const existing = await payload.find({
      collection: "beirat-members",
      where: { name: { equals: member.name } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`– Beiratsmitglied „${member.name}“ existiert bereits`);
      continue;
    }

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
    console.log(`✓ Beiratsmitglied „${member.name}“ angelegt`);
  }

  // --- Freiheitsbewegung global ---
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
    console.log("✓ Freiheitsbewegung-Global angelegt");
  } else {
    console.log("– Freiheitsbewegung-Global existiert bereits");
  }

  // --- Prompt templates ---
  const existingDailyPrompt = await payload.find({
    collection: "prompt-templates",
    where: { slug: { equals: PROMPT_TEMPLATE_KEYS.DAILY_IMPULSES_SYSTEM } },
    limit: 1,
  });
  if (existingDailyPrompt.docs.length === 0) {
    await payload.create({
      collection: "prompt-templates",
      data: {
        name: "Tagesimpulse – System-Prompt",
        slug: PROMPT_TEMPLATE_KEYS.DAILY_IMPULSES_SYSTEM,
        systemPrompt: PARTY_DAILY_SYSTEM_PROMPT,
        description:
          "System-Prompt für npm run generate:daily und /generate-daily. JSON-Ausgabe beibehalten.",
        active: true,
      },
    });
    console.log("✓ Prompt-Vorlage „Tagesimpulse – System-Prompt“ angelegt");
  } else {
    console.log("– Prompt-Vorlage für Tagesimpulse existiert bereits");
  }

  console.log("\nEditorial-Seed abgeschlossen. Admin-Panel: /admin");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});