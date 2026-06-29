import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";
import { runSeedImpulses } from "@/lib/seed/impulses";
import { runSeedQuotes } from "@/lib/seed/quotes";

/**
 * Führt Quotes- und DailyImpulses-Seeds in einer MongoDB-Sitzung aus.
 *
 * Ausführen: npm run seed:content
 */
async function seed() {
  const payload = await getPayload({ config });

  console.log("=== Seed: Quotes ===\n");
  const quoteStats = await runSeedQuotes(payload);
  console.log(`  Neu: ${quoteStats.created} | Aktualisiert: ${quoteStats.updated} | Übersprungen: ${quoteStats.skipped}`);

  console.log("\n=== Seed: Daily Impulses ===\n");
  const impulseStats = await runSeedImpulses(payload);
  console.log(`  Neu: ${impulseStats.created} | Aktualisiert: ${impulseStats.updated} | Übersprungen: ${impulseStats.skipped}`);

  console.log("\n✓ Alle Content-Seeds abgeschlossen.");
  console.log(`  Zitate: ${quoteStats.total} | Tagesimpulse: ${impulseStats.total}`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Combined seed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});