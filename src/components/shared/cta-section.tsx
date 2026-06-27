import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          {description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary" asChild>
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}