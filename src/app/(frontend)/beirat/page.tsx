import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/shared/cta-section";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeader } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  BookOpen,
  LineChart,
  Megaphone,
  Search,
  Users,
  UserSearch,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata(seoPages.beirat);

const advisoryTasks = [
  {
    icon: BookOpen,
    title: "Expertenwissen",
    text: "Fachwissen für politische Themen, Stellungnahmen und Positionspapiere.",
  },
  {
    icon: LineChart,
    title: "Strategiebewertung",
    text: "Langfristige Parteistrategie durch fachliches und praktisches Feedback.",
  },
  {
    icon: Search,
    title: "Politische Analyse",
    text: "Trends und gesellschaftliche Entwicklungen frühzeitig einordnen.",
  },
  {
    icon: Megaphone,
    title: "Öffentlichkeitsarbeit",
    text: "Reputation und Netzwerke für klarere libertäre Botschaften nutzen.",
  },
  {
    icon: UserSearch,
    title: "Talente identifizieren",
    text: "Unterstützung bei Rekrutierung politischen Nachwuchses.",
  },
  {
    icon: Users,
    title: "Interessengruppen",
    text: "Stimmen der Zivilgesellschaft in die Parteiarbeit einbringen.",
  },
];

const boardMembers = [
  {
    name: "Dr. Antony P. Mueller",
    role: "Ehemaliger Beirat",
    bio: "Habilitierter Wirtschaftswissenschaftler der Universität Erlangen-Nürnberg und emeritierter Professor der Volkswirtschaftslehre an der brasilianischen Bundesuniversität UFS.",
    image:
      "https://die-libertaeren.de/wp-content/uploads/2023/07/AntonyPMueller_Photo_Beirat-1024x1024.jpg",
    deceased: true,
    deceasedDate: "24. Mai 2026",
  },
  {
    name: "Prof. Dr. iur. David Dürr",
    role: "Beirat",
    bio: "Schweizer Rechtstheoretiker, Wirtschaftsanwalt und Notar in der SwissLegal-Gruppe. Beirat des Ludwig-von-Mises-Instituts Deutschland sowie des Liberalen Instituts Zürich.",
    image:
      "https://die-libertaeren.de/wp-content/uploads/2023/07/DavidDuerr_Photo_Beirat-1024x1024.jpg",
    deceased: false,
  },
];

export default function BeiratPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Beirat" }]} />
      <PageHeader
        title="Der Beirat"
        subtitle="Wissenschaftliches Gremium für fundiertes Expertenwissen, strategische Einordnung und gesellschaftliche Vernetzung."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Der Beirat ist ein parteinahes Gremium, das unsere Arbeit unabhängig
            bewertet, Fachwissen bereitstellt und gesellschaftliche
            Interessengruppen vernetzt. Grundlage aller Positionen sind
            wissenschaftliche Fakten – darauf bauen wir Programme und
            Positionspapiere auf.
          </p>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeader title="Zweck und Aufgaben" align="center" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advisoryTasks.map((task) => (
            <Card key={task.title} className="texture-surface-card">
              <CardHeader>
                <task.icon className="h-7 w-7 text-primary" />
                <CardTitle className="text-lg">{task.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {task.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Unser Beirat"
          subtitle="Vertreter aus Wissenschaft, Wirtschaft, Zivilgesellschaft und libertärem Aktivismus."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {boardMembers.map((member) => (
            <Card
              key={member.name}
              className={`overflow-hidden texture-surface-card ${
                member.deceased ? "border-muted-foreground/20 opacity-90" : ""
              }`}
            >
              <div className="grid gap-0 md:grid-cols-[200px_1fr]">
                <div className="relative aspect-square bg-muted md:aspect-auto md:min-h-[220px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={`object-cover ${member.deceased ? "grayscale" : ""}`}
                    sizes="200px"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge variant={member.deceased ? "outline" : "default"}>
                      {member.role}
                    </Badge>
                    {member.deceased && (
                      <Badge variant="muted">† {member.deceasedDate}</Badge>
                    )}
                  </div>
                  <h3 className="font-display text-2xl font-bold">{member.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="mx-auto max-w-3xl">
          <Card className="border-2 border-primary/20 bg-white/80 shadow-lg">
            <CardHeader>
              <Badge variant="outline" className="w-fit">
                Nachruf
              </Badge>
              <CardTitle className="font-display text-2xl md:text-3xl">
                In Gedenken an Dr. Antony P. Mueller
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Gestorben am 24. Mai 2026 · Ehemaliger Beirat der DIE LIBERTÄREN
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Mit tiefer Trauer nehmen wir Abschied von Dr. Antony P. Mueller,
                der als Beirat unserer Partei wertvolles wirtschaftswissenschaftliches
                Wissen und scharfsinnige Analysen beigesteuert hat. Seine Arbeit als
                Professor und sein Engagement für die Ideen der Österreichischen Schule
                haben unsere Positionen nachhaltig geprägt.
              </p>
              <p className="leading-relaxed">
                Wir danken ihm für seine Unterstützung, seinen klaren Blick auf
                Marktmechanismen und staatliche Übergriffe sowie für seine Bereitschaft,
                libertäre Gedanken in die öffentliche Debatte zu tragen. Sein Wirken
                bleibt Teil unserer intellektuellen Grundlage.
              </p>
              <p className="font-medium text-foreground">
                In Freiheit und Dankbarkeit – DIE LIBERTÄREN
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <p className="mx-auto max-w-2xl text-center text-muted-foreground">
          Fragen zum Beirat?{" "}
          <Link href="/kontakt" className="font-semibold text-primary hover:underline">
            Schreib uns
          </Link>{" "}
          an info@die-libertaeren.de.
        </p>
      </Section>

      <CTASection
        title="Freiheit braucht fundierte Argumente"
        description="Unterstütze die konsequenteste Freiheitspartei Deutschlands."
        primaryLabel="Unterstützer werden"
        primaryHref="/werde-unterstuetzer"
        secondaryLabel="Netzwerk"
        secondaryHref="/netzwerk"
      />
    </>
  );
}