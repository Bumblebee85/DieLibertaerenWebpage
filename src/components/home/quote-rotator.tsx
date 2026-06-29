"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import type { QuoteDisplay } from "@/lib/cms/quotes";

function getDailyQuoteIndex(quoteCount: number): number {
  if (quoteCount === 0) return 0;
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
    if (quotes.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  if (quotes.length === 0) {
    return null;
  }

  const current = quotes[index];

  return (
    <section className="relative border-y border-black/10 py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 libertarian-stripe-pattern opacity-[0.05]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <div className="texture-surface-card rounded-2xl px-6 py-14 text-center md:px-10">
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