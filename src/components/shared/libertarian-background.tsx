import Image from "next/image";

/** Dunkler, dezenter Hero-Hintergrund mit feiner libertärer Textur. */
export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c12] via-[#0e1118] to-[#141820]" />

      <Image
        src="/images/background-hero.jpg"
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

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background md:h-40" />
    </div>
  );
}