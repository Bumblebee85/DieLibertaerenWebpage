import type { Payload } from "payload";
import { runSeedImpulses } from "@/lib/seed/impulses";
import { runSeedQuotes } from "@/lib/seed/quotes";
import { runCmsSeed } from "@/lib/seed/run-cms";
import { runEditorialSeed } from "@/lib/seed/run-editorial";
import { getDatabaseName, getPayloadEnvStatus } from "@/lib/payload-env";

export type SeedContentResult = {
  ok: true;
  message: string;
  database: string;
  quotes: Awaited<ReturnType<typeof runSeedQuotes>>;
  impulses: Awaited<ReturnType<typeof runSeedImpulses>>;
  editorial: Awaited<ReturnType<typeof runEditorialSeed>>;
  cms: Awaited<ReturnType<typeof runCmsSeed>>;
  totalsInDb: {
    quotes: number;
    dailyImpulses: number;
    weeklyEssays: number;
    promptTemplates: number;
    events: number;
  };
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

  const [quoteStats, impulseStats, editorialStats, cmsStats] = await Promise.all([
    runSeedQuotes(payload),
    runSeedImpulses(payload),
    runEditorialSeed(payload),
    runCmsSeed(payload),
  ]);

  const [quotes, impulses, weeklyEssays, prompts, events] = await Promise.all([
    payload.find({ collection: "quotes", limit: 0 }),
    payload.find({ collection: "daily-impulses", limit: 0 }),
    payload.find({ collection: "weekly-essays", limit: 0 }),
    payload.find({ collection: "prompt-templates", limit: 0 }),
    payload.find({ collection: "events", limit: 0 }),
  ]);

  return {
    ok: true,
    message: "Full content seed completed (idempotent)",
    database: getDatabaseName(),
    quotes: quoteStats,
    impulses: impulseStats,
    editorial: editorialStats,
    cms: cmsStats,
    totalsInDb: {
      quotes: quotes.totalDocs,
      dailyImpulses: impulses.totalDocs,
      weeklyEssays: weeklyEssays.totalDocs,
      promptTemplates: prompts.totalDocs,
      events: events.totalDocs,
    },
    adminUrl: `${status.serverURL}/admin`,
    durationMs: Date.now() - started,
  };
}