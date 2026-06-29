import siteConfig from "@/data/site-config.json";

/** Kanonische Basis-URL – Vercel-Env hat Vorrang vor site-config. */
export function getSiteUrl(): string {
  const fromEnv = process.env["NEXT_PUBLIC_SERVER_URL"]?.trim();
  const base = fromEnv || siteConfig.url;
  return base.replace(/\/$/, "");
}

export const DEFAULT_OG_IMAGE = "/images/logo-dark.png";