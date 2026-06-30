import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/shared/cta-section";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeader } from "@/components/shared/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";
import { BookOpen, Globe2, Landmark, Scale } from "lucide-react";

export const metadata: Metadata = createPageMetadata(seoPages.freiheitsbewegung);

const austrianSchoolFigures = [
  {
    name: "Carl Menger",
    years: "1840 – 1921",
    role: "Begründer der Österreichischen Schule",
    image: "https://die-libertaeren.de/wp-content/uploads/2022/05/menger-portrait.jpg",
  },
  {
    name: "Eugen von Böhm-Bawerk",
    years: "1851 – 1914",
    role: "Professor der Nationalökonomie, Finanzminister",
    image: "https://die-libertaeren.de/wp-content/uploads/2022/05/bawerk-portrait.jpg",
  },
  {
    name: "Friedrich Freiherr von Wieser",
    years: "1851 – 1926",
    role: "Professor der Nationalökonomie, Handelsminister",
    image: "https://die-libertaeren.de/wp-content/uploads/2022/05/wieser-portrait.jpg",
  },
  {
    name: "Friedrich August von Hayek",
    years: "1899 – 1992",
    role: "Ökonom, Sozialphilosoph, Nobelpreis 1974",
    image: "https://die-libertaeren.de/wp-content/uploads/2022/05/hayek-portrait.jpg",
  },
  {
    name: "Ludwig von Mises",
    years: "1881 – 1973",
    role: "Ökonom des klassischen Liberalismus, Praxeologie",
    image: "https://die-libertaeren.de/wp-content/uploads/2022/05/mises-portrait.jpg",
  },
];

const milestones = [
  "Magna Carta (13. Jh.) – erste verbindliche Grenzen staatlicher Macht",
  "Amerikanische Unabhängigkeitserklärung und Revolution (18. Jh.)",
  "Aufklärung: Vernunft, Naturrecht und individuelle Autonomie",
  "Österreichische Schule: methodologischer Individualismus",
  "Gegenbewegung zu Keynesianismus und Planwirtschaft im 20. Jahrhundert",
];

export default function FreiheitsbewegungPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Freiheitsbewegung" }]} />
      <PageHeader
        title="Freiheitsbewegung"
        subtitle="Von der Aufklärung bis zur Österreichischen Schule – Libertarismus als Fortsetzung des Freiheitskampfes gegen Herrschaft und Tyrannei."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Der Libertarismus hat seine Wurzeln in den Freiheitsbewegungen Europas
            und Nordamerikas. Die Amerikanische Revolution und die Philosophie der
            Aufklärung bilden wichtige Meilensteine. Heute versteht sich der
            Libertarismus nicht als Ideologie mit Herrschaftsanspruch, sondern als
            Lebensphilosophie mit dem Individuum im Zentrum.
          </p>
          <p>
            Geistig ist er die Fortsetzung der Aufklärung und die Renaissance des
            klassischen Liberalismus – verwurzelt in der europäischen
            Philosophiegeschichte seit der Antike.
          </p>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeader
          title="Die Österreichische Schule"
          subtitle="Wirtschaftspolitische Ausrichtung von DIE LIBERTÄREN – vom methodologischen Individualismus zur Praxeologie."
          align="center"
        />
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <Card className="texture-surface-card">
            <CardHeader>
              <Scale className="h-8 w-8 text-primary" />
              <CardTitle>Österreicher und Libertäre</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Die Österreichische Schule beruht auf dem methodologischen
                Individualismus: Gesellschaftliches Gefüge entsteht aus individuellem
                Handeln. Ludwig von Mises nannte dies Praxeologie – der Mensch handelt
                zweckgerichtet und reflektiert über Mittel und Ziele.
              </p>
              <p>
                Freie Marktwirtschaft ist dabei kein abstraktes System, sondern das
                Aggregat freiwilliger Tauschgeschäfte. Preise transportieren
                Information über Knappheit und Bedarf.
              </p>
            </CardContent>
          </Card>
          <Card className="texture-surface-card">
            <CardHeader>
              <Landmark className="h-8 w-8 text-primary" />
              <CardTitle>Antagonist des Sozialismus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Ohne privates Eigentum, so Mises, ist keine Wirtschaftlichkeitsrechnung
                möglich. Planwirtschaft verzerrt Signale und führt zur
                Interventionsspirale – immer neue Vorschriften auf Kosten der
                Bürger.
              </p>
              <p>
                DIE LIBERTÄREN setzen auf Deregulierung, Eigentumsschutz und freiwillige
                Kooperation statt staatlicher Lenkung und Umverteilung.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeader title="Die Begründer der Österreichischen Schule" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {austrianSchoolFigures.map((figure) => (
            <Card key={figure.name} className="overflow-hidden texture-surface-card">
              <div className="relative aspect-square bg-muted">
                <Image
                  src={figure.image}
                  alt={figure.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{figure.name}</CardTitle>
                <p className="text-sm font-medium text-primary">{figure.years}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{figure.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-black/10 bg-muted/20">
        <SectionHeader
          title="Geschichte des Libertarismus"
          subtitle="Der Kampf um Freiheit ist so alt wie die Menschheit – und heute nötiger denn je."
        />
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p className="leading-relaxed">
                Freiheit des Individuums ist Naturrecht: „Die Tatsache, dass ich
                Mensch bin, verleiht mir dieses Recht.“ Der Libertarismus erneuert
                den klassischen Liberalismus gegen dessen Abweichung im 20. Jahrhundert.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Globe2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p className="leading-relaxed">
                Nach der Verfolgung österreichischer Ökonomen in den 1930er Jahren
                trugen Denker wie Hayek und Mises die Schule in die USA – mit Einfluss
                auf Chicago School, Ordoliberalismus und London School of Economics.
              </p>
            </div>
          </div>
          <Card className="texture-surface-card">
            <CardHeader>
              <CardTitle>Meilensteine des Freiheitskampfes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {milestones.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <CTASection
        title="Freiheit braucht Menschen wie dich"
        description="Werde Teil der konsequentesten Freiheitspartei Deutschlands."
        primaryLabel="Mitglied werden"
        primaryHref="/werde-mitglied"
        secondaryLabel="Unterstützer werden"
        secondaryHref="/werde-unterstuetzer"
      />
    </>
  );
}