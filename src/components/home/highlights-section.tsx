import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { getActiveHighlights } from "@/lib/cms/highlights";
import { Button } from "@/components/ui/button";

export async function HighlightsSection() {
  const highlights = await getActiveHighlights();

  if (highlights.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute -left-40 bottom-20 h-72 w-72 rounded-full bg-slate-200/80 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8 lg:py-28">
        <header className="mb-10 text-center md:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Highlight
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Aktuell bei DIE LIBERTÄREN
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Was uns gerade bewegt – und wo du mitmachen kannst.
          </p>
        </header>

        <div className="space-y-10">
          {highlights.map((highlight) => (
            <article
              key={highlight.id}
              className="group overflow-hidden rounded-3xl bg-slate-900 shadow-2xl shadow-slate-900/25 ring-1 ring-slate-800"
            >
              <div className="grid lg:min-h-[480px] lg:grid-cols-[1.1fr_0.9fr]">
                {/* Text & CTA – hoher Kontrast auf dunkler Card */}
                <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-14">
                  <div className="pointer-events-none absolute inset-0 libertarian-stripe-pattern opacity-[0.08]" aria-hidden />

                  <div className="relative">
                    <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/60 bg-primary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                      Jetzt aktuell
                    </div>

                    <h3 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl lg:text-5xl">
                      {highlight.title}
                    </h3>

                    <div
                      className="prose prose-invert mt-5 max-w-xl text-base leading-relaxed text-slate-200 prose-p:my-0 md:text-lg"
                      dangerouslySetInnerHTML={{ __html: highlight.subtitleHtml }}
                    />

                    {highlight.id === "afuera-fest-2026" && (
                      <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                          24.–26. Juli 2026
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 shrink-0 text-primary" />
                          Camping Strandbad Gerlebogk
                        </span>
                      </div>
                    )}

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                      <Button
                        size="lg"
                        className="h-14 bg-primary px-10 text-base font-bold text-secondary shadow-lg shadow-primary/35 hover:bg-primary/95 hover:shadow-xl hover:shadow-primary/45"
                        asChild
                      >
                        <Link
                          href={highlight.link}
                          target={
                            highlight.link.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            highlight.link.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {highlight.buttonText}
                          <ArrowUpRight className="ml-1 h-5 w-5" />
                        </Link>
                      </Button>
                      {highlight.id === "afuera-fest-2026" && (
                        <p className="text-sm text-slate-400">
                          Das größte libertäre Fest im deutschsprachigen Raum
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bild-Panel – scharf, 1904px Quelle */}
                {highlight.imageUrl && (
                  <div className="relative min-h-[280px] lg:min-h-full">
                    <Image
                      src={highlight.imageUrl}
                      alt={highlight.imageAlt ?? highlight.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 640px"
                      quality={90}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent lg:bg-gradient-to-l lg:from-slate-900/90 lg:via-slate-900/20 lg:to-transparent" />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}