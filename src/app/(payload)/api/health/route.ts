import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { getPayloadEnvStatus } from "@/lib/payload-env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diagnose-Endpoint für Payload auf Vercel.
 * GET /api/health – zeigt Env-Status und Verbindungsfehler (ohne Secrets).
 */
export async function GET() {
  const status = getPayloadEnvStatus();

  if (!status.secretValid) {
    return NextResponse.json(
      {
        ok: false,
        stage: "env",
        message: "PAYLOAD_SECRET missing or too short (min. 32 chars)",
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
        message: "MONGODB_URI missing or not a mongodb:// / mongodb+srv:// URL",
        ...status,
      },
      { status: 500 }
    );
  }

  try {
    const payload = await getPayload({ config });
    const users = await payload.find({ collection: "users", limit: 1 });

    return NextResponse.json({
      ok: true,
      stage: "connected",
      message: "Payload CMS is ready",
      userCount: users.totalDocs,
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
        hint:
          "Check MongoDB Atlas: Network Access 0.0.0.0/0, URL-encoded password, cluster not paused.",
        ...status,
      },
      { status: 500 }
    );
  }
}