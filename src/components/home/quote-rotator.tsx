"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import quotesData from "@/data/quotes.json";

function getDailyQuoteIndex(quoteCount: number): number {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return dayOfYear % quoteCount;
}

export function QuoteRotator() {
  const quotes = quotesData.quotes;
  const [index, setIndex] = useState(() => getDailyQuoteIndex(quotes.length));

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  const current = quotes[index];

  return (
    <section className="border-y border-border bg-muted/50 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
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
              — {quotesData.author},{" "}
              <a
                href={quotesData.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-colors hover:underline"
              >
                {quotesData.handle}
              </a>
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
    </section>
  );
}