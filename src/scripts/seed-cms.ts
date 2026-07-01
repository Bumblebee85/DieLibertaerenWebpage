import "./load-env";
import heroData from "@/data/hero.json";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Legt Beispiel-Inhalte für alle Startseiten-Collections an.
 * Ausführen: npm run seed:cms
 *
 * Voraussetzung: MONGODB_URI / DATABASE_URL und PAYLOAD_SECRET gesetzt.
 */
async function seed() {
  const payload = await getPayload({ config });

  // --- Hero (Startseite) ---
  const existingHero = await payload.findGlobal({ slug: "hero", depth: 0 });
  if (!existingHero?.headline) {
    await payload.updateGlobal({
      slug: "hero",
      data: heroData,
    });
    console.log("✓ Hero-Global mit Standardtexten angelegt");
  } else {
    console.log("– Hero-Global existiert bereits");
  }

  // --- Highlights ---
  const existingHighlight = await payload.find({
    collection: "highlights",
    where: { title: { equals: "Afuera Fest 2026" } },
    limit: 1,
  });

  if (existingHighlight.docs.length === 0) {
    await payload.create({
      collection: "highlights",
      data: {
        title: "Afuera Fest 2026",
        slug: "afuera-fest-2026",
        shortText:
          "Das größte libertäre Fest im deutschsprachigen Raum. Wir brauchen deine Unterstützung vor Ort!",
        date: "2026-07-24",
        activeUntil: "2026-07-27",
        link: "https://afuerafest.de/",
        isActive: true,
      },
    });
    console.log("✓ Highlight „Afuera Fest 2026“ angelegt");
  } else {
    console.log("– Highlight „Afuera Fest 2026“ existiert bereits");
  }

  // --- Quotes (volle Bibliothek: npm run seed:quotes) ---
  const existingQuotes = await payload.find({ collection: "quotes", limit: 1 });
  if (existingQuotes.docs.length === 0) {
    console.log("– Keine Zitate vorhanden → bitte npm run seed:quotes ausführen");
  } else {
    console.log("– Zitate existieren bereits");
  }

  // --- Events ---
  const existingEvents = await payload.find({ collection: "events", limit: 1 });
  if (existingEvents.docs.length === 0) {
    await payload.create({
      collection: "events",
      data: {
        title: "Libertärer Stammtisch Hamburg",
        startDate: "2026-07-01",
        location: "Hamburg",
        category: "stammtisch",
        description: "Jeden ersten Mittwoch im Monat – offene Diskussion.",
        link: "/events",
        published: true,
      },
    });
    console.log("✓ Beispiel-Event angelegt");
  } else {
    console.log("– Events existieren bereits");
  }

  // --- Daily Impulses (volle Bibliothek: npm run seed:impulses) ---
  const existingImpulses = await payload.find({
    collection: "daily-impulses",
    limit: 1,
  });
  if (existingImpulses.docs.length === 0) {
    console.log("– Keine Tagesimpulse vorhanden → bitte npm run seed:impulses ausführen");
  } else {
    console.log("– Tagesimpulse existieren bereits");
  }

  console.log("\nSeed abgeschlossen. Admin-Panel: /admin");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});