import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { BeiratMembers } from "./collections/BeiratMembers";
import { BlogCategories } from "./collections/BlogCategories";
import { BlogPosts } from "./collections/BlogPosts";
import { DailyImpulses } from "./collections/DailyImpulses";
import { Documents } from "./collections/Documents";
import { EventCategories } from "./collections/EventCategories";
import { EventLocations } from "./collections/EventLocations";
import { EventOrganizers } from "./collections/EventOrganizers";
import { Events } from "./collections/Events";
import { Highlights } from "./collections/Highlights";
import { Media } from "./collections/Media";
import { PromptTemplates } from "./collections/PromptTemplates";
import { ProgramTopicCategories } from "./collections/ProgramTopicCategories";
import { Quotes } from "./collections/Quotes";
import { Users } from "./collections/Users";
import { WahlomatElections } from "./collections/WahlomatElections";
import { WeeklyEssays } from "./collections/WeeklyEssays";
import { Beirat } from "./globals/Beirat";
import { Freiheitsbewegung } from "./globals/Freiheitsbewegung";
import { Hero } from "./globals/Hero";
import { Program } from "./globals/Program";
import { runCmsSeed } from "./lib/seed/run-cms";
import { needsEditorialSeed, runEditorialSeed } from "./lib/seed/run-editorial";
import { runSeedImpulses } from "./lib/seed/impulses";
import { runSeedQuotes } from "./lib/seed/quotes";
import {
  getDatabaseUrl,
  getPayloadSecret,
  getServerURL,
  getTrustedOrigins,
} from "./lib/payload-env";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const serverURL = getServerURL();
const trustedOrigins = getTrustedOrigins();
const blobToken = process.env["BLOB_READ_WRITE_TOKEN"]?.trim();

const plugins = blobToken
  ? [
      vercelBlobStorage({
        collections: { media: true },
        token: blobToken,
        clientUploads: true,
      }),
    ]
  : [];

export default buildConfig({
  plugins,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "– DIE LIBERTÄREN CMS",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Highlights,
    Quotes,
    EventCategories,
    EventLocations,
    EventOrganizers,
    Events,
    DailyImpulses,
    Documents,
    ProgramTopicCategories,
    WahlomatElections,
    BlogCategories,
    BlogPosts,
    WeeklyEssays,
    BeiratMembers,
    PromptTemplates,
  ],
  globals: [Hero, Program, Beirat, Freiheitsbewegung],
  editor: lexicalEditor(),
  secret: getPayloadSecret(),
  serverURL,
  csrf: trustedOrigins,
  cors: trustedOrigins,
  debug: process.env["PAYLOAD_DIAGNOSTICS"] === "true",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: getDatabaseUrl(),
    connectOptions: {
      maxPoolSize: 1,
      minPoolSize: 0,
      maxIdleTimeMS: 10000,
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 20000,
    },
  }),
  sharp,
  localization: {
    locales: ["de"],
    fallback: true,
    defaultLocale: "de",
  },
  onInit: async (payload) => {
    payload.logger.info(`Payload CMS initialized – ${serverURL}/admin`);

    if (process.env["AUTO_SEED_ON_INIT"] === "false") return;

    try {
      const [needsEditorial, quotes, eventCategories] = await Promise.all([
        needsEditorialSeed(payload),
        payload.find({ collection: "quotes", limit: 1 }),
        payload.find({ collection: "event-categories", limit: 1 }),
      ]);

      if (!needsEditorial && quotes.totalDocs > 0 && eventCategories.totalDocs > 0) {
        return;
      }

      payload.logger.info("Auto-seeding CMS content (idempotent)…");
      await runEditorialSeed(payload);
      await runCmsSeed(payload);
      if (quotes.totalDocs === 0) await runSeedQuotes(payload);

      const impulses = await payload.find({ collection: "daily-impulses", limit: 1 });
      if (impulses.totalDocs === 0) await runSeedImpulses(payload);

      payload.logger.info("Auto-seed completed.");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      payload.logger.error(`Auto-seed failed: ${message}`);
    }
  },
});