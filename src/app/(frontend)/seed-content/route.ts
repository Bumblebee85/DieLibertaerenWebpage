import { NextResponse } from "next/server";
import {
  readSeedSecretFromRequest,
  verifySeedOrPayloadSecret,
} from "@/lib/seed/auth";
import { runSeedContent } from "@/lib/seed/run-content";
import { getPayloadEnvStatus } from "@/lib/payload-env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** Vercel Pro: bis 60s für ~80 Zitate + Impulse */
export const maxDuration = 60;

const USAGE = {
  methods: ["GET", "POST"],
  auth: [
    "Authorization: Bearer <SEED_SECRET>",
    "X-Seed-Secret: <SEED_SECRET>",
    "?secret=<SEED_SECRET> (nur für einmaligen Browser-Aufruf)",
  ],
  examples: {
    curl_post:
      'curl -X POST "https://<domain>/seed-content" -H "Authorization: Bearer <SEED_SECRET>"',
    curl_get:
      'curl "https://<domain>/seed-content?secret=<SEED_SECRET>"',
    browser:
      "https://<domain>/seed-content?secret=<SEED_SECRET>",
  },
  note: "Idempotent – bestehende Einträge werden übersprungen oder aktualisiert. Secret nach Browser-Aufruf rotieren (Query-String landet in Logs).",
};

function unauthorized(message: string) {
  return NextResponse.json({ ok: false, message, usage: USAGE }, { status: 401 });
}

async function handleSeed() {
  const seedSecret = process.env["SEED_SECRET"]?.trim();
  if (seedSecret && seedSecret.length < 16) {
    return NextResponse.json(
      {
        ok: false,
        message: "SEED_SECRET must be at least 16 characters.",
        usage: USAGE,
      },
      { status: 503 }
    );
  }

  const status = getPayloadEnvStatus();
  if (!status.dbUrlSet || !status.secretValid) {
    return NextResponse.json(
      {
        ok: false,
        message: "MongoDB URI or PAYLOAD_SECRET not configured.",
        ...status,
      },
      { status: 500 }
    );
  }

  try {
    const result = await runSeedContent();
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, message, ...status }, { status: 500 });
  }
}

/**
 * Remote-Seed für Vercel (MongoDB vom Server erreichbar).
 *
 * GET/POST /seed-content
 * Auth: SEED_SECRET via Bearer, X-Seed-Secret oder ?secret=
 */
export async function GET(request: Request) {
  const provided = readSeedSecretFromRequest(request);

  if (!provided) {
    return NextResponse.json(
      {
        ok: false,
        message: "Missing SEED_SECRET. See usage below.",
        usage: USAGE,
      },
      { status: 401 }
    );
  }

  if (!verifySeedOrPayloadSecret(provided)) {
    return unauthorized("Invalid SEED_SECRET or PAYLOAD_SECRET.");
  }

  return handleSeed();
}

export async function POST(request: Request) {
  const provided = readSeedSecretFromRequest(request);

  if (!provided || !verifySeedOrPayloadSecret(provided)) {
    return unauthorized(
      "Unauthorized. Pass SEED_SECRET or PAYLOAD_SECRET via Bearer header, X-Seed-Secret, or ?secret=."
    );
  }

  return handleSeed();
}