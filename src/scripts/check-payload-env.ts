import { getPayloadForScript } from "@/lib/scripts/payload-cli";
import {
  getDatabaseUrl,
  getPayloadSecret,
  getServerURL,
} from "@/lib/payload-env";

/**
 * Prüft Umgebungsvariablen und MongoDB-Verbindung.
 * Ausführen: npm run check:payload
 */
async function check() {
  console.log("Checking Payload environment...\n");

  try {
    const secret = getPayloadSecret();
    console.log(`✓ PAYLOAD_SECRET (${secret.length} chars)`);

    const dbUrl = getDatabaseUrl();
    if (!dbUrl) {
      throw new Error("No MONGODB_URI or DATABASE_URL set");
    }
    console.log(`✓ Database URL (${dbUrl.replace(/\/\/.*@/, "//***@")})`);

    const serverURL = getServerURL();
    console.log(`✓ Server URL: ${serverURL}`);

    console.log("\nConnecting to MongoDB...");
    const payload = await getPayloadForScript();

    const users = await payload.find({ collection: "users", limit: 1 });
    console.log(`✓ MongoDB connected (${users.totalDocs} user(s) in database)`);
    console.log("\nAll checks passed. Admin panel: /admin");
    process.exit(0);
  } catch (error) {
    console.error(
      "\n✗ Payload check failed:",
      error instanceof Error ? error.message : error
    );
    console.error(
      "\nFix: Set PAYLOAD_SECRET + MONGODB_URI in Vercel → Environment Variables, then redeploy."
    );
    process.exit(1);
  }
}

check();