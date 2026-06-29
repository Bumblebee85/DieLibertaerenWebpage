import { Hero } from "@/components/home/hero";
import { HighlightsSection } from "@/components/home/highlights-section";
import { QuoteRotator } from "@/components/home/quote-rotator";
import { DailyImpulsesSection } from "@/components/home/daily-impulses";
import { EventsTeaser } from "@/components/home/events-teaser";
import { getPublishedQuotes } from "@/lib/cms/quotes";
import { StatsSection } from "@/components/home/stats-section";
import { CTASection } from "@/components/shared/cta-section";
import { LightSectionBackground } from "@/components/shared/light-section-background";
import { Section, SectionHeader } from "@/components/shared/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Network, Megaphone } from "lucide-react";

const pillars = [
  {
    icon: Megaphone,
    title: "Aktionismus",
    text: "Wir bringen den Libertarismus in die öffentliche Debatte und auf die Straße.",
  },
  {
    icon: FileText,
    title: "Parteiarbeit",
    text: "Wir stellen Positionspapiere und Programme auf, um den Rahmen für mehr gesellschaftliche Freiheit zu schaffen.",
  },
  {
    icon: Users,
    title: "Modellierung",
    text: "Wir transformieren die Lehre in praktische Modelle und unterstützen freiheitliche Organisationen.",
  },
  {
    icon: Network,
    title: "Vernetzung",
    text: "Wir vernetzen uns in der Wissenschaft und in der Zivilgesellschaft.",
  },
];

export default async function HomePage() {
  const quotes = await getPublishedQuotes();

  return (
    <>
      <Hero />
      <HighlightsSection />

      {/* Textur-Zone: Zitat → Impulse → Events → Prinzipien */}
      <LightSectionBackground>
        {quotes.length > 0 && <QuoteRotator quotes={quotes} />}
        <DailyImpulsesSection />
        <EventsTeaser />

        <Section className="border-t border-black/10 bg-transparent">
          <SectionHeader
            title="Für einen praktischen Libertarismus"
            subtitle="Libertarismus ist keine bloße Theorie – es ist eine Lebensphilosophie."
            align="center"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-10">
            {pillars.map((pillar) => (
              <Card
                key={pillar.title}
                className="texture-surface-card transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <pillar.icon className="mx-auto h-10 w-10 text-primary" />
                  <CardTitle className="text-center text-lg">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-sm leading-relaxed text-muted-foreground">
                    {pillar.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </LightSectionBackground>

      <CTASection
        title="Freiheit ist kein Geschenk, sondern dein Recht!"
        description="Für uns ist Freiheit nicht nur ein Begriff, sondern ein Prinzip. Werde der Patron einer wahren Freiheitsbewegung!"
        primaryLabel="Unterstütze uns"
        primaryHref="/spenden"
        secondaryLabel="Werde Mitglied"
        secondaryHref="/werde-mitglied"
      />

      <StatsSection />
    </>
  );
}