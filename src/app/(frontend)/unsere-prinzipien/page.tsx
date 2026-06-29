import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CTASection } from "@/components/shared/cta-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(seoPages.prinzipien);

const pillars = [
  {
    id: "individuell",
    title: "Individuelle Freiheit",
    subtitle: "Deine Freiheit, ein selbstbestimmtes Leben zu führen.",
    description:
      "Jeder Mensch hat das Recht, beliebigen Aktivitäten nachzugehen, solange er die Freiheiten und Rechte anderer nicht begrenzt.",
  },
  {
    id: "vertraglich",
    title: "Vertragliche Freiheit",
    subtitle: "Eine friedvolle Gesellschaft fußt auf freiwilliger Kooperation und Verträgen.",
    description:
      "Freiwillige Verträge zwischen gleichberechtigten Partnern sind die Grundlage jeder friedlichen Gesellschaftsordnung.",
  },
  {
    id: "gesellschaftlich",
    title: "Gesellschaftliche Freiheit",
    subtitle: "Gesellschaftliche Freiheit ist Ergebnis individueller Freiheit.",
    description:
      "Eine freie Gesellschaft entsteht nicht durch Zwang, sondern als Ergebnis freier Individuen, die freiwillig kooperieren.",
  },
];

export default function PrinzipienPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Unsere Prinzipien" }]} />
      <PageHeader
        title="Unsere Prinzipien"
        subtitle="Das Fundament unserer Überzeugungen – von der individuellen über die vertragliche zur gesellschaftlichen Freiheit."
      />

      <Section>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Erklärung
          </h2>
          <p>
            Wir Libertäre Deutschlands und all unsere Miteiferer sind von der
            Absicht geleitet, ein selbstbestimmtes Leben zu führen, strebend
            nach einer Welt größtmöglicher individueller Freiheit, in welcher der
            Mensch der alleinige Souverän über sein eigenes Leben ist.
          </p>
          <p>
            Als Libertäre leben wir zuallererst grundsätzliche und
            allgemeingültige Prinzipien. Kein Mensch und keine Gruppe von
            Menschen haben das Recht, ihren Willen durch Androhung oder Ausübung
            von Gewalt einem anderen aufzuerlegen.
          </p>
          <p>
            Das <strong className="text-foreground">Nichtaggressionsprinzip</strong>{" "}
            ist unser ethisches Fundament: Kein Mensch darf Gewalt oder Drohung
            einsetzen, um anderen seinen Willen aufzuerzwingen. Wir stehen für
            die Freiheit und das Recht jedes Menschen, beliebigen Aktivitäten
            nachzugehen, solange sie die Freiheiten und Rechte anderer dadurch
            nicht begrenzen – und für unverletzliches{" "}
            <strong className="text-foreground">Eigentum</strong> als Basis
            freiwilliger Verträge.
          </p>
          <p>
            Wir unterstützen die freie Marktwirtschaft und den freien Wettbewerb
            gemäß der Österreichischen Schule. Mehr dazu in unserem{" "}
            <Link href="/programm" className="text-primary hover:underline">
              libertären Programm
            </Link>{" "}
            und im{" "}
            <Link href="/blog" className="text-primary hover:underline">
              Blog
            </Link>
            .
          </p>
          <p>
            Aus Erfahrung der gelebten Realität erkennen wir an, dass eine
            gesellschaftliche Veränderung mit einer politischen Veränderung
            einhergehen muss. Hierzu dient die Partei DIE LIBERTÄREN als
            politisches Instrument.
          </p>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <h2 className="mb-16 text-center font-display text-3xl font-bold md:text-4xl">
          Die drei Säulen der Freiheit
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.id} id={pillar.id}>
              <CardHeader>
                <CardTitle className="font-display text-xl text-primary">
                  {pillar.title}
                </CardTitle>
                <p className="font-medium">{pillar.subtitle}</p>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
                <Button variant="link" asChild className="p-0">
                  <Link href="/programm">
                    Erfahre mehr <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl bg-muted/50 p-12 text-center">
          <h2 className="font-display text-2xl font-bold">Hast du noch Fragen?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Wenn du Fragen zu unseren Prinzipien oder zur Partei hast, schreibe
            uns direkt an{" "}
            <a
              href="mailto:info@die-libertaeren.de"
              className="text-primary hover:underline"
            >
              info@die-libertaeren.de
            </a>
          </p>
          <Button className="mt-8" asChild>
            <Link href="/kontakt">Kontakt aufnehmen</Link>
          </Button>
        </div>
      </Section>

      <CTASection
        title="Freiheit ist kein Geschenk, sondern dein Recht!"
        description="Lasse auch du deinem Freiheitswillen Taten folgen! Werde der Patron einer wahren Freiheitsbewegung!"
        primaryLabel="Unterstütze uns"
        primaryHref="/spenden"
      />
    </>
  );
}