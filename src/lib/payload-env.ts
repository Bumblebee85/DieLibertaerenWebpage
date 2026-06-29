/**
 * Zentrale Payload-Umgebungsvariablen mit Validierung.
 * Liest Werte zur Laufzeit (wichtig für Vercel Serverless).
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

/** Runtime-Zugriff – nicht am Modul-Top-Level cachen. */
function readEnv(name: string): string {
  return trimEnv(process.env[name]);
}

/**
 * MongoDB connection string.
 * Reihenfolge: MONGODB_URI → MONGODB_URL → DATABASE_URL (nur wenn mongodb://)
 */
export function getDatabaseUrl(): string {
  const candidates = [
    readEnv("MONGODB_URI"),
    readEnv("MONGODB_URL"),
    readEnv("DATABASE_URL"),
  ].filter(Boolean);

  // Vercel kann eine Postgres-DATABASE_URL injizieren – Mongo-URI bevorzugen
  const mongoUrl =
    candidates.find(
      (url) =>
        url.startsWith("mongodb://") || url.startsWith("mongodb+srv://")
    ) ?? "";

  if (!mongoUrl && isVercel() && !isCodegenScript()) {
    throw new Error(
      "MONGODB_URI is missing or invalid. Use mongodb+srv://… in Vercel Environment Variables. " +
        "URL-encode special characters in the password (@ → %40)."
    );
  }

  return mongoUrl;
}

/** Hostname aus der URI für Diagnostik (ohne Credentials). */
export function getDatabaseHost(): string | null {
  const url = getDatabaseUrl();
  if (!url) return null;
  try {
    return new URL(url.replace("mongodb+srv://", "https://")).hostname;
  } catch {
    return "invalid-uri";
  }
}

/**
 * Payload secret – min. 32 Zeichen, Pflicht auf Vercel.
 */
export function getPayloadSecret(): string {
  const secret = readEnv("PAYLOAD_SECRET");

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
          "(min. 32 characters). Generate: openssl rand -base64 32. Then redeploy."
      );
    }
    throw new Error(
      `PAYLOAD_SECRET is too short (${secret.length} chars). Must be at least 32 characters.`
    );
  }

  return secret || "local-dev-only-placeholder-secret-32ch";
}

/**
 * Öffentliche Server-URL – benötigt für Admin-Panel, CSRF und Medien-Links.
 */
export function getServerURL(): string {
  const explicit = readEnv("NEXT_PUBLIC_SERVER_URL");
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const production = readEnv("VERCEL_PROJECT_PRODUCTION_URL");
  if (production) {
    return `https://${production.replace(/\/$/, "")}`;
  }

  const vercel = readEnv("VERCEL_URL");
  if (vercel) {
    return `https://${vercel.replace(/\/$/, "")}`;
  }

  return "http://localhost:3010";
}

/** Alle vertrauenswürdigen Origins für CSRF/CORS (Vercel-Deployments inkl.). */
export function getTrustedOrigins(): string[] {
  const origins = new Set<string>();

  const add = (value: string | undefined) => {
    const trimmed = trimEnv(value);
    if (!trimmed) return;
    const normalized = trimmed.startsWith("http")
      ? trimmed.replace(/\/$/, "")
      : `https://${trimmed.replace(/\/$/, "")}`;
    origins.add(normalized);
  };

  add(readEnv("NEXT_PUBLIC_SERVER_URL"));
  add(readEnv("VERCEL_PROJECT_PRODUCTION_URL"));
  add(readEnv("VERCEL_URL"));
  add(readEnv("VERCEL_BRANCH_URL"));
  origins.add("http://localhost:3010");

  return [...origins];
}

/** Env-Status für Diagnostik (keine Secrets). */
export function getPayloadEnvStatus() {
  const secret = readEnv("PAYLOAD_SECRET");
  const dbUrl = getDatabaseUrl();

  return {
    vercel: isVercel(),
    nodeEnv: process.env.NODE_ENV ?? "unknown",
    secretSet: secret.length > 0,
    secretLength: secret.length,
    secretValid: secret.length >= 32,
    dbUrlSet: dbUrl.length > 0,
    dbHost: getDatabaseHost(),
    dbProtocol: dbUrl.startsWith("mongodb+srv://")
      ? "mongodb+srv"
      : dbUrl.startsWith("mongodb://")
        ? "mongodb"
        : null,
    serverURL: getServerURL(),
    trustedOrigins: getTrustedOrigins(),
    envSources: {
      MONGODB_URI: readEnv("MONGODB_URI").length > 0,
      MONGODB_URL: readEnv("MONGODB_URL").length > 0,
      DATABASE_URL: readEnv("DATABASE_URL").length > 0,
      PAYLOAD_SECRET: secret.length > 0,
      NEXT_PUBLIC_SERVER_URL: readEnv("NEXT_PUBLIC_SERVER_URL").length > 0,
    },
  };
}