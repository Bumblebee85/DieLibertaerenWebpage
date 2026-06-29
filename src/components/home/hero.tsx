"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "@/components/shared/libertarian-background";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-32 md:py-40 lg:py-48">
      <HeroBackground />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Willkommen bei DIE LIBERTÄREN
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
            DIE LIBERTÄREN –{" "}
            <span className="text-primary">libertäre Partei für Freiheit</span>
          </h1>
          <p className="mt-4 font-display text-2xl font-medium text-white/80 md:text-3xl">
            FREIHEITLICH – AUS PRINZIP
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            Deutschlands konsequenteste Stimme für Libertarismus, Eigentum und
            freien Markt: Wir stehen für individuelle Freiheit, Minimalstaat und
            das Nichtaggressionsprinzip – ehrlich und kompromisslos.
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/unsere-prinzipien">
                Unsere Prinzipien
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/programm">Thesenpapier v4</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}