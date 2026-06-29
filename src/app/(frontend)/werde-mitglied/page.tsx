import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Werde Mitglied",
  description: "Werde Mitglied bei DIE LIBERTÄREN – der konsequentesten Stimme für Freiheit in Deutschland.",
};

const benefits = [
  "Stimme für Freiheit in der öffentlichen Debatte",
  "Zugang zu exklusiven Veranstaltungen und Stammtischen",
  "Mitgestaltung des Parteiprogramms und der Positionen",
  "Vernetzung mit Gleichgesinnten in ganz Deutschland",
  "Unterstützung einer ehrlichen Freiheitsbewegung",
];

export default function WerdeMitgliedPage() {
  return (
    <>
      <PageHeader
        title="Wahre Freiheit braucht mutige Kämpfer!"
        subtitle="Für die Freiheit lohnt es sich zu kämpfen. Lasse auch du deinem Freiheitswillen Taten folgen."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold">Warum Mitglied werden?</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Als Mitglied von DIE LIBERTÄREN wirst du Teil einer Bewegung, die
              sich kompromisslos für individuelle Freiheit, Eigentum und
              Selbstbestimmung einsetzt. Wir sind keine Berufspolitiker – wir
              sind Freiheitskämpfer.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mitgliedschaft beantragen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-sm text-muted-foreground">
                Die Mitgliedschaft erfolgt über unser Online-Formular auf der
                bestehenden Website. Du wirst zur Antragsseite weitergeleitet.
              </p>
              <Button size="lg" className="w-full" asChild>
                <a
                  href="https://die-libertaeren.de/werde-mitglied/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mitgliedschaft beantragen
                </a>
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Fragen?{" "}
                <a
                  href="mailto:info@die-libertaeren.de"
                  className="text-primary hover:underline"
                >
                  info@die-libertaeren.de
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}