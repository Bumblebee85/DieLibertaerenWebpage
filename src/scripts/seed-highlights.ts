import "dotenv/config";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Legt den Highlight-Eintrag „Afuera Fest 2026“ im CMS an.
 * Ausführen: npm run seed:highlights
 *
 * Für alle Collections: npm run seed:cms
 */
async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "highlights",
    where: {
      title: { equals: "Afuera Fest 2026" },
    },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    console.log("Afuera Fest 2026 existiert bereits – Seed übersprungen.");
    process.exit(0);
  }

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

  console.log("Highlight „Afuera Fest 2026“ erfolgreich angelegt.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});