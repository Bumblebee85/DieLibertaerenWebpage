import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { DailyImpulses } from "./collections/DailyImpulses";
import { Documents } from "./collections/Documents";
import { Events } from "./collections/Events";
import { Highlights } from "./collections/Highlights";
import { Media } from "./collections/Media";
import { Quotes } from "./collections/Quotes";
import { Users } from "./collections/Users";
import {
  getDatabaseUrl,
  getPayloadSecret,
  getServerURL,
} from "./lib/payload-env";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const serverURL = getServerURL();

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
  ],
  editor: lexicalEditor(),
  secret: getPayloadSecret(),
  serverURL,
  // Vertrauenswürdige Origins für Admin/API auf Vercel
  csrf: [serverURL],
  cors: [serverURL],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: getDatabaseUrl(),
    // Serverless-freundliche Verbindungsparameter für Atlas + Vercel
    connectOptions: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    },
  }),
  sharp,
  localization: {
    locales: ["de"],
    fallback: true,
    defaultLocale: "de",
  },
  onInit: async (payload) => {
    if (process.env.NODE_ENV !== "production") {
      payload.logger.info(`Payload CMS ready – ${serverURL}/admin`);
    }
  },
});