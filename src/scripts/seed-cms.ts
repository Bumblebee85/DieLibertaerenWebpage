import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";
import { runCmsSeed } from "@/lib/seed/run-cms";

/**
 * Legt Hero, Highlights und Events an.
 * Ausführen: npm run seed:cms
 */
async function seed() {
  const payload = await getPayload({ config });
  const stats = await runCmsSeed(payload);

  console.log("\nCMS-Seed abgeschlossen:");
  console.log(JSON.stringify(stats, null, 2));
  console.log("Admin-Panel: /admin");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});