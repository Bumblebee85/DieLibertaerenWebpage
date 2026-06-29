import Image from "next/image";

/**
 * Hero-Hintergrund – das starke Bild gilt NUR für den Hero-Bereich.
 * 40–60 % Dunkelgradient für optimale Textlesbarkeit.
 */
export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <Image
        src="/images/hero-background.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={85}
      />

      {/* Lesbarkeits-Overlay ~50 % */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#03050f]/60 via-[#03050f]/50 to-[#0a0c14]/45" />

      <div className="absolute inset-0 libertarian-stripe-pattern opacity-40" />

      <div className="absolute -right-20 top-1/4 h-[480px] w-[480px] rounded-full bg-primary/[0.08] blur-3xl" />
      <div className="absolute -left-16 bottom-1/4 h-[320px] w-[320px] rounded-full bg-[#1a2030]/50 blur-3xl" />

      {/* Kurzer Übergang zur Highlights-Sektion – kein Bild nach unten */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-slate-950 md:h-28" />
    </div>
  );
}