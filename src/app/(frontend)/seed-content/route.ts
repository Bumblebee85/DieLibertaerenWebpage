import { NextResponse } from "next/server";
import { runSeedImpulses } from "@/lib/seed/impulses";
import { runSeedQuotes } from "@/lib/seed/quotes";
import { getDatabaseName, getPayloadEnvStatus } from "@/lib/payload-env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Remote-Seed für Vercel/Produktion (MongoDB erreichbar vom Server).
 * POST /seed-content
 * Header: Authorization: Bearer <SEED_SECRET>
 */
export async function POST(request: Request) {
  const seedSecret = process.env["SEED_SECRET"]?.trim();
  const auth = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();

  if (!seedSecret || auth !== seedSecret) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Unauthorized. Set SEED_SECRET in Vercel and send Authorization: Bearer <SEED_SECRET>.",
      },
      { status: 401 }
    );
  }

  const status = getPayloadEnvStatus();
  if (!status.dbUrlSet || !status.secretValid) {
    return NextResponse.json(
      { ok: false, message: "MongoDB URI or PAYLOAD_SECRET not configured.", ...status },
      { status: 500 }
    );
  }

  try {
    const { default: config } = await import("@payload-config");
    const { getPayload } = await import("payload");
    const payload = await getPayload({ config });

    const quoteStats = await runSeedQuotes(payload);
    const impulseStats = await runSeedImpulses(payload);

    const quotes = await payload.find({ collection: "quotes", limit: 1 });
    const impulses = await payload.find({ collection: "daily-impulses", limit: 1 });

    return NextResponse.json({
      ok: true,
      message: "Content seed completed",
      database: getDatabaseName(),
      quotes: quoteStats,
      impulses: impulseStats,
      totalsInDb: {
        quotes: quotes.totalDocs,
        dailyImpulses: impulses.totalDocs,
      },
      adminUrl: `${status.serverURL}/admin`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, message, ...status }, { status: 500 });
  }
}