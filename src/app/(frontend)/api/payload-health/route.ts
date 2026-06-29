import { NextResponse } from "next/server";
import { getPayloadEnvStatus } from "@/lib/payload-env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diagnose außerhalb des Payload catch-all (/api/[...slug]).
 * GET /api/payload-health
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
        fix:
          "MongoDB Atlas: Network Access 0.0.0.0/0, URL-encode password (@→%40), cluster running, correct database name in URI.",
        ...status,
      },
      { status: 500 }
    );
  }
}