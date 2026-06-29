import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Legt den ersten Admin-Benutzer an (falls noch keiner existiert).
 *
 * Ausführen (mit Atlas-URI in .env.local oder Umgebung):
 *   ADMIN_EMAIL=chris@example.com ADMIN_PASSWORD='SecurePass123!' npm run seed:admin
 */
async function seed() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();
  const name = process.env.ADMIN_NAME?.trim() ?? "Administrator";

  if (!email || !password) {
    console.error(
      "Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables.\n" +
        "Example: ADMIN_EMAIL=chris@die-libertaeren.de ADMIN_PASSWORD='YourSecurePass!' npm run seed:admin"
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("ADMIN_PASSWORD must be at least 8 characters.");
    process.exit(1);
  }

  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    console.log(`User ${email} already exists – skipped.`);
    process.exit(0);
  }

  await payload.create({
    collection: "users",
    data: {
      email,
      password,
      name,
      role: "admin",
    },
  });

  console.log(`✓ Admin user created: ${email}`);
  console.log("Login at: /admin");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});