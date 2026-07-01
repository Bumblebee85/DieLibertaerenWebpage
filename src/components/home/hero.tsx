"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "@/components/shared/libertarian-background";
import type { HeroContent } from "@/lib/cms/hero";

type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  const {
    eyebrow,
    headline,
    headlineAccent,
    tagline,
    description,
    primaryCta,
    secondaryCta,
  } = content;

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
          {eyebrow ? (
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
            {headline}
            {headlineAccent ? (
              <>
                {" – "}
                <span className="text-primary">{headlineAccent}</span>
              </>
            ) : null}
          </h1>
          {tagline ? (
            <p className="mt-4 font-display text-2xl font-medium text-white/80 md:text-3xl">
              {tagline}
            </p>
          ) : null}
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            {description}
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}