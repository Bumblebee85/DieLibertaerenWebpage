import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";
import thesenData from "@/data/thesen-v4.json";
import wahlomatData from "@/data/wahlomat-thesen.json";
import blogPostsData from "@/data/blog-posts.json";
import weeklyEssaysData from "@/data/weekly-essays.json";
import { plainTextToLexical } from "@/lib/cms/rich-text";
import { slugify } from "@/lib/cms/slugify";

/**
 * Legt Programm, Wahl-O-Mat, Blog und Wochenaufsätze aus JSON in Payload an.
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

  console.log("\nEditorial-Seed abgeschlossen. Admin-Panel: /admin");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});