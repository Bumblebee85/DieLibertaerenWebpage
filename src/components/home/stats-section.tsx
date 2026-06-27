"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "6,5", unit: "Monate", label: "arbeitest du im Jahr für den Staat" },
  { value: "45%", unit: "", label: "Steuern auf dein Einkommen" },
  { value: "37", unit: "", label: "Steuerarten in Deutschland" },
  { value: "49,7%", unit: "", label: "Staatsquote in Deutschland" },
];

export function StatsSection() {
  return (
    <section className="bg-secondary py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-16 text-center font-display text-3xl font-bold md:text-4xl">
          Beende deine Knechtschaft jetzt!
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="font-display text-5xl font-bold text-primary md:text-6xl">
                {stat.value}
                {stat.unit && (
                  <span className="ml-1 text-2xl text-white/60">{stat.unit}</span>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}