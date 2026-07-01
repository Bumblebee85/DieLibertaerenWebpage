import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";
import { runEditorialSeed } from "@/lib/seed/run-editorial";

/**
 * Legt Programm, Libertärer Kompass, Blog, Beiträge, Beirat und Prompts an.
 * Ausführen: npm run seed:editorial
 */
async function seed() {
  const payload = await getPayload({ config });
  const stats = await runEditorialSeed(payload);

  console.log("\nEditorial-Seed abgeschlossen:");
  console.log(JSON.stringify(stats, null, 2));
  console.log("Admin-Panel: /admin");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});