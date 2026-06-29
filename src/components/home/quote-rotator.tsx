"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import type { QuoteDisplay } from "@/lib/cms/quotes";

function getDailyQuoteIndex(quoteCount: number): number {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return dayOfYear % quoteCount;
}

type QuoteRotatorProps = {
  quotes: QuoteDisplay[];
};

export function QuoteRotator({ quotes }: QuoteRotatorProps) {
  const [index, setIndex] = useState(() => getDailyQuoteIndex(quotes.length));

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  const current = quotes[index];

  return (
    <section className="relative border-y border-border/50 py-20 md:py-24">
      {/* Libertäre Streifen – dezent über dem Section-Hintergrund */}
      <div
        className="pointer-events-none absolute inset-0 libertarian-stripe-pattern opacity-[0.07]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <div className="rounded-2xl border border-white/80 bg-white/90 px-6 py-14 text-center shadow-lg shadow-slate-200/50 backdrop-blur-sm md:px-10">
          <Quote className="mx-auto mb-8 h-10 w-10 text-primary" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <blockquote className="font-display text-2xl font-medium leading-relaxed text-foreground md:text-3xl lg:text-4xl">
                &ldquo;{current.text}&rdquo;
              </blockquote>
              <cite className="mt-8 block text-base not-italic text-muted-foreground">
                — {current.author}
                {current.authorHandle && (
                  <>
                    {", "}
                    {current.authorUrl ? (
                      <a
                        href={current.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary transition-colors hover:underline"
                      >
                        {current.authorHandle}
                      </a>
                    ) : (
                      <span>{current.authorHandle}</span>
                    )}
                  </>
                )}
              </cite>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex justify-center gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-primary" : "w-2 bg-border"
                }`}
                aria-label={`Zitat ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}