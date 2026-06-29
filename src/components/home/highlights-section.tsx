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
    <section className="relative overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 libertarian-stripe-pattern opacity-[0.12]" />
        <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-slate-50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8 lg:py-28">
        <header className="mb-10 text-center md:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Highlight
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Aktuell bei DIE LIBERTÄREN
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Was uns gerade bewegt – und wo du mitmachen kannst.
          </p>
        </header>

        <div className="space-y-10">
          {highlights.map((highlight) => (
            <article
              key={highlight.id}
              className="group relative min-h-[420px] overflow-hidden rounded-3xl border-2 border-primary/25 shadow-2xl shadow-black/50 ring-1 ring-white/10 md:min-h-[480px] lg:min-h-[540px]"
            >
              {highlight.imageUrl && (
                <Image
                  src={highlight.imageUrl}
                  alt=""
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  quality={85}
                  priority
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/88 to-slate-950/50 md:to-slate-950/35" />
              <div className="absolute inset-0 libertarian-stripe-pattern opacity-[0.1]" />

              <div className="relative grid min-h-[420px] gap-8 p-8 md:min-h-[480px] md:grid-cols-[1.15fr_0.85fr] md:items-center md:p-12 lg:min-h-[540px] lg:p-14">
                <div className="flex flex-col justify-center">
                  <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/50 bg-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    Jetzt aktuell
                  </div>

                  <h3 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
                    {highlight.title}
                  </h3>

                  <div
                    className="prose prose-invert mt-6 max-w-xl text-lg leading-relaxed text-white/90 prose-p:my-0 md:text-xl"
                    dangerouslySetInnerHTML={{ __html: highlight.subtitleHtml }}
                  />

                  {highlight.id === "afuera-fest-2026" && (
                    <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/70">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        24.–26. Juli 2026
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Camping Strandbad Gerlebogk
                      </span>
                    </div>
                  )}

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Button
                      size="lg"
                      className="h-14 px-10 text-base font-bold shadow-lg shadow-primary/30 ring-2 ring-primary/40 hover:shadow-xl hover:shadow-primary/40"
                      asChild
                    >
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
                        <ArrowUpRight className="ml-1 h-5 w-5" />
                      </Link>
                    </Button>
                    {highlight.id === "afuera-fest-2026" && (
                      <p className="text-sm text-white/55">
                        Das größte libertäre Fest im deutschsprachigen Raum
                      </p>
                    )}
                  </div>
                </div>

                {highlight.imageUrl && (
                  <div className="relative hidden md:block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl ring-1 ring-primary/20">
                      <Image
                        src={highlight.imageUrl}
                        alt={highlight.imageAlt ?? highlight.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 420px"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                    </div>
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