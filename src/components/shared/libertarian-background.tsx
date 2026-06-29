import Image from "next/image";
import type { ReactNode } from "react";

/** Dunkler, dezenter Hero-Hintergrund mit feiner libertärer Textur. */
export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c12] via-[#0e1118] to-[#141820]" />

      <Image
        src="/images/hero-background.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-[var(--libertarian-image-opacity)] mix-blend-soft-light"
        sizes="100vw"
        quality={85}
      />

      <div className="absolute inset-0 libertarian-stripe-pattern" />
      <div className="absolute inset-0 libertarian-hero-overlay" />

      <div className="absolute -right-20 top-1/4 h-[480px] w-[480px] rounded-full bg-primary/[0.06] blur-3xl" />
      <div className="absolute -left-16 bottom-1/4 h-[320px] w-[320px] rounded-full bg-[#1a2030] blur-3xl" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#0a0c12]/40 to-[#0a0c12] md:h-52" />
    </div>
  );
}

/**
 * Dynamischer libertärer Übergang unter dem Hero.
 * Dunkler, texturierter Verlauf mit Tiefe – verbindet Hero und Inhaltssektionen.
 */
export function LibertarianAtmosphere({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative isolate">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        {/* Dunkler Kern oben – nahtloser Übergang vom Hero */}
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-[#0a0c12] via-[#10141c]/95 to-transparent md:h-[620px]" />

        <Image
          src="/images/hero-background-2.jpg"
          alt=""
          fill
          className="object-cover object-top opacity-[var(--libertarian-atmosphere-image)] mix-blend-soft-light"
          sizes="100vw"
          quality={75}
        />

        <div className="absolute inset-0 libertarian-atmosphere-pattern" />
        <div className="absolute inset-0 libertarian-noise" />

        {/* Warme Lichtakzente */}
        <div className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-primary/[0.08] blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#1a2030]/60 blur-3xl" />

        {/* Weicher Übergang zu helleren Bereichen */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-[#eef0f4]/80 to-[#f7f8fa] md:h-80" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
      </div>

      {children}
    </div>
  );
}