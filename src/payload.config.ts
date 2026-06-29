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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    // DATABASE_URL (lokal) oder MONGODB_URI (Atlas / Vercel)
    url: process.env.DATABASE_URL || process.env.MONGODB_URI || "",
  }),
  sharp,
  localization: {
    locales: ["de"],
    fallback: true,
    defaultLocale: "de",
  },
});