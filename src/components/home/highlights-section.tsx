import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { getActiveHighlights } from "@/lib/cms/highlights";
import { Section, SectionHeader } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function HighlightsSection() {
  const highlights = await getActiveHighlights();

  if (highlights.length === 0) {
    return null;
  }

  return (
    <Section className="py-20 md:py-28">
      <SectionHeader
        title="Aktuell bei DIE LIBERTÄREN"
        subtitle="Was uns gerade bewegt – und wo du mitmachen kannst."
        align="center"
      />

      <div className="mx-auto grid max-w-5xl gap-8">
        {highlights.map((highlight, index) => (
          <article
            key={highlight.id}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-secondary via-secondary to-[#0a0c14] p-8 shadow-xl md:p-10",
              index === 0 && "ring-1 ring-primary/30"
            )}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 libertarian-stripe-pattern opacity-[0.12]"
              aria-hidden
            />

            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div className={cn(highlight.imageUrl && "md:col-span-1")}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Aktuell
                </div>

                <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                  {highlight.title}
                </h3>

                <div
                  className="prose prose-invert mt-4 max-w-2xl text-base leading-relaxed text-white/75 prose-p:my-0 md:text-lg"
                  dangerouslySetInnerHTML={{ __html: highlight.subtitleHtml }}
                />

                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link
                      href={highlight.link}
                      target={highlight.link.startsWith("http") ? "_blank" : undefined}
                      rel={
                        highlight.link.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {highlight.buttonText}
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {highlight.imageUrl && (
                <div className="relative mx-auto aspect-[4/3] w-full max-w-xs overflow-hidden rounded-xl border border-white/10 md:mx-0 md:max-w-[280px]">
                  <Image
                    src={highlight.imageUrl}
                    alt={highlight.imageAlt ?? highlight.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}