import dotenv from "dotenv";
import { resolve } from "path";

/** Lädt .env.local (Next.js) und .env für CLI-Skripte. */
dotenv.config({ path: resolve(process.cwd(), ".env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });