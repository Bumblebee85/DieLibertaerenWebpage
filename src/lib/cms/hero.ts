import heroData from "@/data/hero.json";
import { getPayloadClient } from "@/lib/payload";

export type HeroCta = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  headlineAccent?: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
};

const jsonFallback: HeroContent = {
  eyebrow: heroData.eyebrow,
  headline: heroData.headline,
  headlineAccent: heroData.headlineAccent || undefined,
  description: heroData.description,
  primaryCta: heroData.primaryCta,
  secondaryCta: heroData.secondaryCta,
};

function mapCta(
  cta: { label?: string | null; href?: string | null } | undefined,
  fallback: HeroCta
): HeroCta {
  return {
    label: cta?.label?.trim() || fallback.label,
    href: cta?.href?.trim() || fallback.href,
  };
}

/** Hero-Inhalte aus Payload Global „hero“, JSON-Fallback bei DB-Ausfall. */
export async function getHeroContent(): Promise<HeroContent> {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: "hero", depth: 0 });

    if (global?.headline || global?.description) {
      const accent = global.headlineAccent?.trim();

      return {
        eyebrow: global.eyebrow?.trim() || jsonFallback.eyebrow,
        headline: global.headline?.trim() || jsonFallback.headline,
        headlineAccent: accent || undefined,
        description: global.description?.trim() || jsonFallback.description,
        primaryCta: mapCta(global.primaryCta, jsonFallback.primaryCta),
        secondaryCta: mapCta(global.secondaryCta, jsonFallback.secondaryCta),
      };
    }
  } catch {
    // MongoDB nicht erreichbar – Fallback unten
  }

  return jsonFallback;
}