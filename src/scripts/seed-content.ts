import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";
import { getDatabaseName, getDatabaseHost, getPayloadEnvStatus } from "@/lib/payload-env";
import { runSeedImpulses } from "@/lib/seed/impulses";
import { runSeedQuotes } from "@/lib/seed/quotes";

/**
 * Führt Quotes- und DailyImpulses-Seeds in einer MongoDB-Sitzung aus.
 *
 * Ausführen: npm run seed:content
 */
async function seed() {
  const env = getPayloadEnvStatus();
  console.log(`MongoDB: ${getDatabaseHost()} / ${getDatabaseName()}`);

  if (!env.dbUrlSet) {
    console.error("Keine gültige MongoDB-URI. Setze MONGODB_URI mit /die-libertaeren");
    process.exit(1);
  }

  const payload = await getPayload({ config });

  console.log("\n=== Seed: Quotes ===\n");
  const quoteStats = await runSeedQuotes(payload);
  console.log(`  Neu: ${quoteStats.created} | Aktualisiert: ${quoteStats.updated} | Übersprungen: ${quoteStats.skipped}`);

  console.log("\n=== Seed: Daily Impulses ===\n");
  const impulseStats = await runSeedImpulses(payload);
  console.log(`  Neu: ${impulseStats.created} | Aktualisiert: ${impulseStats.updated} | Übersprungen: ${impulseStats.skipped}`);

  const quotes = await payload.find({ collection: "quotes", limit: 1 });
  const impulses = await payload.find({ collection: "daily-impulses", limit: 1 });

  console.log("\n✓ Alle Content-Seeds abgeschlossen.");
  console.log(`  Bibliothek: ${quoteStats.total} Zitate, ${impulseStats.total} Impulse`);
  console.log(`  In MongoDB: ${quotes.totalDocs} Zitate, ${impulses.totalDocs} Tagesimpulse`);
  console.log(`  Admin: ${env.serverURL}/admin`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Combined seed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});