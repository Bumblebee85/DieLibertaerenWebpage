import { NextResponse } from "next/server";
import {
  readSeedSecretFromRequest,
  verifySeedOrPayloadSecret,
} from "@/lib/seed/auth";
import { getPayloadClient } from "@/lib/payload";
import { getPayloadEnvStatus } from "@/lib/payload-env";
import { runGenerateDaily } from "@/lib/generate/run-daily";
import { runGenerateWeekly } from "@/lib/generate/run-weekly";

const USAGE = {
  methods: ["GET", "POST"],
  auth: [
    "Authorization: Bearer <SEED_SECRET>",
    "X-Seed-Secret: <SEED_SECRET>",
    "?secret=<SEED_SECRET>",
  ],
  note: "Idempotent – bestehende Einträge werden übersprungen.",
};

function unauthorized(message: string) {
  return NextResponse.json({ ok: false, message, usage: USAGE }, { status: 401 });
}

async function assertEnv() {
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

  if (!process.env.GROK_API_KEY?.trim()) {
    return NextResponse.json(
      {
        ok: false,
        message: "GROK_API_KEY is not configured on the server.",
      },
      { status: 503 }
    );
  }

  return null;
}

export async function handleGenerateDailyRequest(request: Request) {
  const provided = readSeedSecretFromRequest(request);
  if (!provided || !verifySeedOrPayloadSecret(provided)) {
    return unauthorized(
      "Unauthorized. Pass SEED_SECRET or PAYLOAD_SECRET via Bearer header, X-Seed-Secret, or ?secret=."
    );
  }

  const envError = await assertEnv();
  if (envError) return envError;

  try {
    const payload = await getPayloadClient();
    const result = await runGenerateDaily(payload);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function handleGenerateWeeklyRequest(request: Request) {
  const provided = readSeedSecretFromRequest(request);
  if (!provided || !verifySeedOrPayloadSecret(provided)) {
    return unauthorized(
      "Unauthorized. Pass SEED_SECRET or PAYLOAD_SECRET via Bearer header, X-Seed-Secret, or ?secret=."
    );
  }

  const envError = await assertEnv();
  if (envError) return envError;

  try {
    const payload = await getPayloadClient();
    const result = await runGenerateWeekly(payload);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}