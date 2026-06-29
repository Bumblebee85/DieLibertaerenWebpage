/**
 * Payload-Umgebungsvariablen – liest zur Laufzeit aus process.env (Vercel Serverless).
 * Keine Throws beim Import: Fehler werden in /api/payload-health sichtbar.
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

function readEnv(name: string): string {
  return trimEnv(process.env[name]);
}

function isCodegenScript(): boolean {
  const event = process.env.npm_lifecycle_event ?? "";
  return event === "generate:types" || event === "generate:importmap";
}

/**
 * MongoDB URI – ignoriert nicht-Mongo DATABASE_URL (z. B. Vercel Postgres).
 */
export function getDatabaseUrl(): string {
  const candidates = [
    readEnv("MONGODB_URI"),
    readEnv("MONGODB_URL"),
    readEnv("DATABASE_URL"),
  ].filter(Boolean);

  return (
    candidates.find(
      (url) =>
        url.startsWith("mongodb://") || url.startsWith("mongodb+srv://")
    ) ?? ""
  );
}

export function getDatabaseHost(): string | null {
  const url = getDatabaseUrl();
  if (!url) return null;
  try {
    return new URL(url.replace("mongodb+srv://", "https://")).hostname;
  } catch {
    return "invalid-uri";
  }
}

/** Payload secret – kein Throw; Payload meldet Fehler bei zu kurzem Secret. */
export function getPayloadSecret(): string {
  const secret = readEnv("PAYLOAD_SECRET");

  if (secret.length >= 32) {
    return secret;
  }

  if (isCodegenScript()) {
    return secret || "codegen-only-placeholder-secret-32chars!";
  }

  // Lokale Entwicklung
  if (process.env.NODE_ENV !== "production") {
    return secret || "local-dev-only-placeholder-secret-32ch";
  }

  return secret;
}

export function getServerURL(): string {
  const explicit = readEnv("NEXT_PUBLIC_SERVER_URL");
  if (explicit) return explicit.replace(/\/$/, "");

  const production = readEnv("VERCEL_PROJECT_PRODUCTION_URL");
  if (production) return `https://${production.replace(/\/$/, "")}`;

  const vercel = readEnv("VERCEL_URL");
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3010";
}

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

export function getPayloadEnvStatus() {
  const secret = readEnv("PAYLOAD_SECRET");
  const dbUrl = getDatabaseUrl();

  return {
    vercel: process.env.VERCEL === "1",
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