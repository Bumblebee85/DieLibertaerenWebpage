import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";
import { runSeedImpulses } from "@/lib/seed/impulses";

/**
 * Befüllt die DailyImpulses-Collection mit aktuellen Tagesimpulsen.
 *
 * Ausführen: npm run seed:impulses
 */
async function seed() {
  const payload = await getPayload({ config });
  const stats = await runSeedImpulses(payload);

  console.log(`\n✓ DailyImpulses-Seed abgeschlossen`);
  console.log(`  Neu angelegt: ${stats.created}`);
  console.log(`  Aktualisiert: ${stats.updated}`);
  console.log(`  Übersprungen: ${stats.skipped} (unverändert)`);
  console.log(`  Gesamt in Bibliothek: ${stats.total}`);
  console.log(`\nAdmin-Panel: /admin → Tagesimpulse`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed fehlgeschlagen:", error instanceof Error ? error.message : error);
  process.exit(1);
});