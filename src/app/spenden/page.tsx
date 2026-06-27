import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Spenden",
  description: "Unterstütze DIE LIBERTÄREN mit einer Spende – für eine wahre Freiheitsbewegung.",
};

export default function SpendenPage() {
  return (
    <>
      <PageHeader
        title="Freiheit ist kein Geschenk, sondern dein Recht!"
        subtitle="Für uns ist Freiheit nicht nur ein Begriff, sondern ein Prinzip. Wir brauchen deine Unterstützung."
      />

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Werde der Patron einer wahren Freiheitsbewegung! Mit deiner Spende
            ermöglichst du Aufklärungsarbeit, Veranstaltungen, Positionspapiere
            und den politischen Kampf für mehr Freiheit in Deutschland.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Einmalige Spende</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-sm text-muted-foreground">
                Unterstütze uns mit einem einmaligen Betrag deiner Wahl.
              </p>
              <Button className="w-full" asChild>
                <a
                  href="https://die-libertaeren.de/werde-unterstuetzer/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jetzt spenden
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fördermitgliedschaft</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-sm text-muted-foreground">
                Werde Fördermitglied mit regelmäßigem Beitrag für nachhaltige
                Freiheitsarbeit.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a
                  href="https://die-libertaeren.de/werde-unterstuetzer/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fördermitglied werden
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}