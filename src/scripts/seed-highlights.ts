import "dotenv/config";
import { getPayload } from "payload";
import config from "@payload-config";
import { plainTextToLexical } from "@/lib/cms/rich-text";
import type { Highlight } from "@/payload-types";

/**
 * Legt den ersten Highlight-Eintrag (Afuera Fest 2026) im CMS an.
 * Ausführen: npx tsx src/scripts/seed-highlights.ts
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
      subtitle: plainTextToLexical(
        "Das größte libertäre Fest im deutschsprachigen Raum. Wir brauchen deine Unterstützung vor Ort!"
      ) as Highlight["subtitle"],
      link: "https://afuerafest.de/",
      buttonText: "Zum Afuera Fest",
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