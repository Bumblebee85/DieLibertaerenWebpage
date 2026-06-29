import Image from "next/image";

/** Maximale Quellbreite des Hero-JPEGs – verhindert künstliches Hochskalieren durch den Optimizer. */
const HERO_IMAGE_WIDTH = 832;
const HERO_IMAGE_HEIGHT = 1248;

/**
 * Hero-Hintergrund – starkes Bild NUR im Hero-Bereich.
 * unoptimized + sizes auf Quellauflösung = maximale Schärfe bis ein 1920px+-Asset nachgeliefert wird.
 */
export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#03050f]"
      aria-hidden
    >
      <Image
        src="/images/hero-background.jpg"
        alt=""
        fill
        priority
        unoptimized
        sizes={`(max-width: ${HERO_IMAGE_WIDTH}px) 100vw, ${HERO_IMAGE_WIDTH}px`}
        className="object-cover object-center [image-rendering:-webkit-optimize-contrast]"
      />

      {/* Overlay ~50 % für Lesbarkeit */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#03050f]/65 via-[#03050f]/52 to-[#0a0c14]/48" />

      <div className="absolute inset-0 libertarian-stripe-pattern opacity-[0.18]" />

      <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-primary/[0.07] blur-3xl" />
      <div className="absolute -left-20 bottom-1/4 h-64 w-64 rounded-full bg-primary/[0.04] blur-3xl" />

      {/* Übergang zur helleren Highlights-Sektion */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-slate-100 md:h-32" />
    </div>
  );
}

