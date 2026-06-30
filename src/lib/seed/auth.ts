import { timingSafeEqual } from "node:crypto";

/** Liest das Seed-Secret aus Authorization, X-Seed-Secret oder ?secret= */
export function readSeedSecretFromRequest(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (auth) {
    const bearer = auth.replace(/^Bearer\s+/i, "").trim();
    if (bearer) return bearer;
  }

  const header = request.headers.get("x-seed-secret")?.trim();
  if (header) return header;

  const url = new URL(request.url);
  const query = url.searchParams.get("secret")?.trim();
  if (query) return query;

  return null;
}

/** Zeitkonstante Vergleich gegen SEED_SECRET (min. 16 Zeichen). */
export function verifySeedSecret(provided: string | null): boolean {
  const expected = process.env["SEED_SECRET"]?.trim();
  if (!expected || expected.length < 16 || !provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

export function getSeedSecretConfigError(): string | null {
  const secret = process.env["SEED_SECRET"]?.trim();
  if (!secret) return "SEED_SECRET is not set in environment variables.";
  if (secret.length < 16) return "SEED_SECRET must be at least 16 characters.";
  return null;
}