import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Hell auf Texture-Hintergrund oder dunkel als Kontrastblock */
  variant?: "light" | "dark";
}

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = "dark",
}: CTASectionProps) {
  const isLight = variant === "light";

  return (
    <section
      className={cn(
        "relative overflow-hidden py-24",
        isLight
          ? "border-t border-slate-300/70 bg-transparent"
          : "border-t border-slate-700/50 bg-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      )}
    >
      {!isLight && (
        <div
          className="pointer-events-none absolute inset-0 libertarian-stripe-pattern opacity-[0.05]"
          aria-hidden
        />
      )}
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2
          className={cn(
            "font-display text-3xl font-bold tracking-tight md:text-4xl",
            isLight ? "text-foreground" : "text-white"
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "mx-auto mt-6 max-w-2xl text-lg leading-relaxed",
            isLight ? "text-muted-foreground" : "text-white/70"
          )}
        >
          {description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button
              variant="outline"
              size="lg"
              className={
                isLight
                  ? undefined
                  : "border-white text-white hover:bg-white hover:text-secondary"
              }
              asChild
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}