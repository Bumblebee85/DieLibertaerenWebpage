import Link from "next/link";

const topicLinks = [
  { href: "/unsere-prinzipien", label: "Nichtaggressionsprinzip & Prinzipien" },
  { href: "/programm", label: "Programm & Minimalstaat" },
  { href: "/blog", label: "Blog zu Freiheit & Eigentum" },
  { href: "/stimmst-du-mit-uns-ueberein", label: "Wahlkompass libertär" },
  { href: "/werde-mitglied", label: "Mitglied werden" },
];

/** Keyword-reicher Intro-Block mit interner Verlinkung – nur Startseite. */
export function SeoIntro() {
  return (
    <section
      className="border-t border-black/10 bg-muted/20 py-16 md:py-20"
      aria-labelledby="seo-intro-heading"
    >
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2
          id="seo-intro-heading"
          className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
        >
          Libertarismus, Freiheit und Eigentum – aus Prinzip
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          <strong className="font-semibold text-foreground">DIE LIBERTÄREN</strong> sind
          die konsequente libertäre Partei in Deutschland: Wir stehen für individuelle
          Freiheit, das <strong className="font-semibold text-foreground">Nichtaggressionsprinzip</strong>,
          unverletzliches <strong className="font-semibold text-foreground">Eigentum</strong> und
          einen <strong className="font-semibold text-foreground">Minimalstaat</strong>, der
          Rechte schützt statt sie zu beschneiden. Wir setzen auf den{" "}
          <strong className="font-semibold text-foreground">freien Markt</strong>, freiwillige
          Kooperation und – wo nötig – das Recht auf{" "}
          <strong className="font-semibold text-foreground">Sezession</strong> als friedliches
          Mittel gegen Zentralismus.
        </p>
        <nav aria-label="Wichtige Themen" className="mt-8">
          <ul className="flex flex-wrap justify-center gap-3">
            {topicLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full border border-primary/25 bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}