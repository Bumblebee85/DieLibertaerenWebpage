import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { BeiratMembers } from "./collections/BeiratMembers";
import { BlogCategories } from "./collections/BlogCategories";
import { BlogPosts } from "./collections/BlogPosts";
import { DailyImpulses } from "./collections/DailyImpulses";
import { Documents } from "./collections/Documents";
import { Events } from "./collections/Events";
import { Highlights } from "./collections/Highlights";
import { Media } from "./collections/Media";
import { ProgramTopicCategories } from "./collections/ProgramTopicCategories";
import { Quotes } from "./collections/Quotes";
import { Users } from "./collections/Users";
import { WahlomatElections } from "./collections/WahlomatElections";
import { WeeklyEssays } from "./collections/WeeklyEssays";
import { Beirat } from "./globals/Beirat";
import { Freiheitsbewegung } from "./globals/Freiheitsbewegung";
import { Program } from "./globals/Program";
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

export default buildConfig({
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
    Events,
    DailyImpulses,
    Documents,
    ProgramTopicCategories,
    WahlomatElections,
    BlogCategories,
    BlogPosts,
    WeeklyEssays,
    BeiratMembers,
  ],
  globals: [Program, Beirat, Freiheitsbewegung],
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
  },
});