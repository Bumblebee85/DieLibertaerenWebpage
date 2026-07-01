import "./load-env";
import { getDatabaseHost, getDatabaseName, getPayloadEnvStatus } from "@/lib/payload-env";
import { runSeedContent } from "@/lib/seed/run-content";

/**
 * Vollständiger Content-Seed: Zitate, Impulse, Editorial, CMS.
 * Auf Vercel: GET/POST /seed-content mit SEED_SECRET
 */
async function seed() {
  const env = getPayloadEnvStatus();
  console.log(`MongoDB: ${getDatabaseHost()} / ${getDatabaseName()}`);

  if (!env.dbUrlSet) {
    console.error("Keine gültige MongoDB-URI. Setze MONGODB_URI mit /die-libertaeren");
    process.exit(1);
  }

  const result = await runSeedContent();

  console.log("\n✓ Vollständiger Content-Seed abgeschlossen");
  console.log(
    `  Zitate: neu ${result.quotes.created}, aktualisiert ${result.quotes.updated}, übersprungen ${result.quotes.skipped}`
  );
  console.log(
    `  Impulse: neu ${result.impulses.created}, aktualisiert ${result.impulses.updated}, übersprungen ${result.impulses.skipped}`
  );
  console.log(`  Editorial: ${JSON.stringify(result.editorial)}`);
  console.log(`  CMS: ${JSON.stringify(result.cms)}`);
  console.log(`  In MongoDB: ${JSON.stringify(result.totalsInDb)}`);
  console.log(`  Dauer: ${result.durationMs}ms`);
  console.log(`  Admin: ${result.adminUrl}`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed fehlgeschlagen:", error instanceof Error ? error.message : error);
  process.exit(1);
});