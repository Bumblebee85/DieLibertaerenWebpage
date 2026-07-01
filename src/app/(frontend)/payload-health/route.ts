import { NextResponse } from "next/server";
import { getPayloadEnvStatus } from "@/lib/payload-env";
import {
  readSeedSecretFromRequest,
  verifySeedOrPayloadSecret,
} from "@/lib/seed/auth";
import { runSeedContent } from "@/lib/seed/run-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Diagnose-Endpoint AUSSERHALB von /api (Payload catch-all blockiert /api/*).
 * GET /payload-health
 */
export async function GET() {
  const status = getPayloadEnvStatus();

  if (!status.secretValid) {
    return NextResponse.json(
      {
        ok: false,
        stage: "env",
        message: "PAYLOAD_SECRET missing or shorter than 32 characters",
        fix: "Vercel → Environment Variables → PAYLOAD_SECRET (openssl rand -base64 32) → Redeploy",
        ...status,
      },
      { status: 500 }
    );
  }

  if (!status.dbUrlSet) {
    return NextResponse.json(
      {
        ok: false,
        stage: "env",
        message: "No valid MongoDB URI found (must start with mongodb:// or mongodb+srv://)",
        fix: "Set MONGODB_URI in Vercel. Remove conflicting postgres DATABASE_URL if present.",
        ...status,
      },
      { status: 500 }
    );
  }

  try {
    const { default: config } = await import("@payload-config");
    const { getPayload } = await import("payload");

    const payload = await getPayload({ config });
    const [users, quotes, impulses, weeklyEssays, prompts, events] =
      await Promise.all([
        payload.find({ collection: "users", limit: 0 }),
        payload.find({ collection: "quotes", limit: 0 }),
        payload.find({ collection: "daily-impulses", limit: 0 }),
        payload.find({ collection: "weekly-essays", limit: 0 }),
        payload.find({ collection: "prompt-templates", limit: 0 }),
        payload.find({ collection: "events", limit: 0 }),
      ]);

    const editorialReady =
      weeklyEssays.totalDocs > 0 && prompts.totalDocs >= 2;

    return NextResponse.json({
      ok: true,
      stage: "connected",
      message: "Payload CMS is ready",
      userCount: users.totalDocs,
      quoteCount: quotes.totalDocs,
      dailyImpulseCount: impulses.totalDocs,
      weeklyEssayCount: weeklyEssays.totalDocs,
      promptTemplateCount: prompts.totalDocs,
      eventCount: events.totalDocs,
      editorialReady,
      seedHint:
        !editorialReady || quotes.totalDocs < 10
          ? "Auto-seed runs on init, or POST /seed-content with SEED_SECRET"
          : undefined,
      adminUrl: `${status.serverURL}/admin`,
      ...status,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const cause =
      error instanceof Error && error.cause instanceof Error
        ? error.cause.message
        : undefined;

    return NextResponse.json(
      {
        ok: false,
        stage: "init",
        message,
        cause,
        fix:
          "MongoDB Atlas: Network Access 0.0.0.0/0, URL-encode password (@→%40), cluster running.",
        ...status,
      },
      { status: 500 }
    );
  }
}

/**
 * Remote-Seed-Fallback auf dem bereits deployten Diagnose-Endpoint.
 * POST /payload-health mit Authorization: Bearer <SEED_SECRET|PAYLOAD_SECRET>
 */
export async function POST(request: Request) {
  const provided = readSeedSecretFromRequest(request);

  if (!provided || !verifySeedOrPayloadSecret(provided)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Unauthorized. Pass SEED_SECRET or PAYLOAD_SECRET via Bearer, X-Seed-Secret, or ?secret=.",
      },
      { status: 401 }
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