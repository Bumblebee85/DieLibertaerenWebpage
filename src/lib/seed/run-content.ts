import type { Payload } from "payload";
import { runSeedImpulses } from "@/lib/seed/impulses";
import { runSeedQuotes } from "@/lib/seed/quotes";
import { getDatabaseName, getPayloadEnvStatus } from "@/lib/payload-env";

export type SeedContentResult = {
  ok: true;
  message: string;
  database: string;
  quotes: Awaited<ReturnType<typeof runSeedQuotes>>;
  impulses: Awaited<ReturnType<typeof runSeedImpulses>>;
  totalsInDb: { quotes: number; dailyImpulses: number };
  adminUrl: string;
  durationMs: number;
};

export async function runSeedContent(): Promise<SeedContentResult> {
  const started = Date.now();
  const status = getPayloadEnvStatus();

  if (!status.dbUrlSet || !status.secretValid) {
    throw new Error("MongoDB URI or PAYLOAD_SECRET not configured.");
  }

  const { default: config } = await import("@payload-config");
  const { getPayload } = await import("payload");
  const payload: Payload = await getPayload({ config });

  const quoteStats = await runSeedQuotes(payload);
  const impulseStats = await runSeedImpulses(payload);

  const [quotes, impulses] = await Promise.all([
    payload.find({ collection: "quotes", limit: 1 }),
    payload.find({ collection: "daily-impulses", limit: 1 }),
  ]);

  return {
    ok: true,
    message: "Content seed completed (idempotent)",
    database: getDatabaseName(),
    quotes: quoteStats,
    impulses: impulseStats,
    totalsInDb: {
      quotes: quotes.totalDocs,
      dailyImpulses: impulses.totalDocs,
    },
    adminUrl: `${status.serverURL}/admin`,
    durationMs: Date.now() - started,
  };
}