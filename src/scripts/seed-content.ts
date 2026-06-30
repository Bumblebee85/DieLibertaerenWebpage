import "./load-env";
import { getDatabaseHost, getDatabaseName, getPayloadEnvStatus } from "@/lib/payload-env";
import { runSeedContent } from "@/lib/seed/run-content";

/**
 * Führt Quotes- und DailyImpulses-Seeds lokal aus.
 * Auf Vercel stattdessen: GET/POST /seed-content mit SEED_SECRET
 */
async function seed() {
  const env = getPayloadEnvStatus();
  console.log(`MongoDB: ${getDatabaseHost()} / ${getDatabaseName()}`);

  if (!env.dbUrlSet) {
    console.error("Keine gültige MongoDB-URI. Setze MONGODB_URI mit /die-libertaeren");
    process.exit(1);
  }

  const result = await runSeedContent();

  console.log("\n✓ Content-Seed abgeschlossen");
  console.log(`  Zitate: neu ${result.quotes.created}, aktualisiert ${result.quotes.updated}, übersprungen ${result.quotes.skipped}`);
  console.log(`  Impulse: neu ${result.impulses.created}, aktualisiert ${result.impulses.updated}, übersprungen ${result.impulses.skipped}`);
  console.log(`  In MongoDB: ${result.totalsInDb.quotes} Zitate, ${result.totalsInDb.dailyImpulses} Impulse`);
  console.log(`  Dauer: ${result.durationMs}ms`);
  console.log(`  Admin: ${result.adminUrl}`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed fehlgeschlagen:", error instanceof Error ? error.message : error);
  process.exit(1);
});