"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuoteDisplay } from "@/lib/cms/quotes";

function getRandomQuoteIndex(quoteCount: number, exclude = -1): number {
  if (quoteCount === 0) return 0;
  if (quoteCount === 1) return 0;

  let next = Math.floor(Math.random() * quoteCount);
  while (next === exclude) {
    next = Math.floor(Math.random() * quoteCount);
  }
  return next;
}

type QuoteRotatorProps = {
  quotes: QuoteDisplay[];
};

export function QuoteRotator({ quotes }: QuoteRotatorProps) {
  const [index, setIndex] = useState(() => getRandomQuoteIndex(quotes.length));

  const goToRandom = useCallback(() => {
    if (quotes.length <= 1) return;
    setIndex((prev) => getRandomQuoteIndex(quotes.length, prev));
  }, [quotes.length]);

  const goPrev = goToRandom;
  const goNext = goToRandom;

  useEffect(() => {
    if (quotes.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => getRandomQuoteIndex(quotes.length, prev));
    }, 12000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  if (quotes.length === 0) {
    return null;
  }

  const current = quotes[index];
  const showDots = quotes.length <= 12;

  return (
    <section
      className="relative border-y border-black/10 py-20 md:py-24"
      aria-roledescription="carousel"
      aria-label="Zitat-Rotation"
    >
      <div
        className="pointer-events-none absolute inset-0 libertarian-stripe-pattern opacity-[0.05]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <div className="texture-surface-card rounded-2xl px-6 py-14 text-center md:px-10">
          <Quote className="mx-auto mb-8 h-10 w-10 text-primary" aria-hidden />

          <div className="relative">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={goPrev}
              className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 rounded-full border-border bg-white/90 shadow-sm md:inline-flex"
              aria-label="Vorheriges Zitat"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-3xl px-0 md:px-14"
              >
                <blockquote className="font-display text-2xl font-medium leading-relaxed text-foreground md:text-3xl lg:text-4xl">
                  &ldquo;{current.text}&rdquo;
                </blockquote>

                <div className="mt-8 flex flex-col items-center gap-4">
                  {current.authorImageUrl && (
                    <Image
                      src={current.authorImageUrl}
                      alt={current.authorImageAlt ?? current.authorName}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/30"
                    />
                  )}
                  <cite className="block text-base not-italic text-muted-foreground">
                    — {current.authorName}
                    {current.authorTitle && (
                      <span className="mt-1 block text-sm">{current.authorTitle}</span>
                    )}
                    {current.source && (
                      <span className="mt-1 block text-xs text-muted-foreground/80">
                        {current.source}
                      </span>
                    )}
                  </cite>
                </div>
              </motion.div>
            </AnimatePresence>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={goNext}
              className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 rounded-full border-border bg-white/90 shadow-sm md:inline-flex"
              aria-label="Nächstes Zitat"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 md:hidden">
              <Button type="button" variant="outline" size="sm" onClick={goPrev}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Zurück
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={goNext}>
                Weiter
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            {showDots && (
              <div className="flex flex-wrap justify-center gap-2">
                {quotes.map((quote, i) => (
                  <button
                    key={quote.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-8 bg-primary" : "w-2 bg-border"
                    }`}
                    aria-label={`Zitat ${i + 1}: ${quote.authorName}`}
                    aria-current={i === index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}