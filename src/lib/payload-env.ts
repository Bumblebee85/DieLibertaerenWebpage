/**
 * Zentrale Payload-Umgebungsvariablen mit Validierung.
 * Verhindert stille Fehler auf Vercel (fehlendes PAYLOAD_SECRET, falsche DB-URL).
 */

function trimEnv(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

/** Strikte Validierung auf Vercel (Build + Runtime). */
function isVercel(): boolean {
  return process.env.VERCEL === "1";
}

function isCodegenScript(): boolean {
  const event = process.env.npm_lifecycle_event ?? "";
  return event === "generate:types" || event === "generate:importmap";
}

/**
 * MongoDB connection string.
 * Vercel: MONGODB_URI bevorzugen. Lokal: DATABASE_URL.
 */
export function getDatabaseUrl(): string {
  const url =
    trimEnv(process.env.MONGODB_URI) || trimEnv(process.env.DATABASE_URL);

  if (!url && isVercel() && !isCodegenScript()) {
    throw new Error(
      "MONGODB_URI is missing. Set it in Vercel → Settings → Environment Variables " +
        "(mongodb+srv://user:pass@cluster.mongodb.net/die-libertaeren?retryWrites=true&w=majority). " +
        "URL-encode special characters in the password (@ → %40)."
    );
  }

  return url;
}

/**
 * Payload secret – min. 32 Zeichen, Pflicht in Production.
 */
export function getPayloadSecret(): string {
  const secret = trimEnv(process.env.PAYLOAD_SECRET);

  if (secret.length >= 32) {
    return secret;
  }

  if (isCodegenScript()) {
    return secret || "codegen-only-placeholder-secret-32chars!";
  }

  if (isVercel()) {
    if (!secret) {
      throw new Error(
        "PAYLOAD_SECRET is missing on Vercel. Add it in Settings → Environment Variables " +
          "(min. 32 characters). Generate: openssl rand -base64 32"
      );
    }
    throw new Error(
      `PAYLOAD_SECRET is too short (${secret.length} chars). Must be at least 32 characters.`
    );
  }

  // Lokale Entwicklung ohne .env.local – nur für Dev, nicht für Production
  return secret || "local-dev-only-placeholder-secret-32ch";
}

/**
 * Öffentliche Server-URL – benötigt für Admin-Panel, CSRF und Medien-Links.
 */
export function getServerURL(): string {
  const explicit = trimEnv(process.env.NEXT_PUBLIC_SERVER_URL);
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const production = trimEnv(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (production) {
    return `https://${production.replace(/\/$/, "")}`;
  }

  const vercel = trimEnv(process.env.VERCEL_URL);
  if (vercel) {
    return `https://${vercel.replace(/\/$/, "")}`;
  }

  return "http://localhost:3010";
}