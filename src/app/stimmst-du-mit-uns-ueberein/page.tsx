import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CTASection } from "@/components/shared/cta-section";
import { WahlomatFeature } from "@/components/wahlomat/wahlomat-feature";

export const metadata: Metadata = {
  title: "Stimmst du mit uns überein?",
  description:
    "Vergleiche deine Positionen mit DIE LIBERTÄREN: 80 Wahl-O-Mat-Thesen mit Begründungen und ein interaktiver Schnell-Check mit 20 Fragen.",
};

export default function StimmstDuMitUnsUebereinPage() {
  return (
    <>
      <PageHeader
        title="Stimmst du mit uns überein?"
        subtitle="Finde in wenigen Minuten heraus, wie stark deine Positionen mit DIE LIBERTÄREN übereinstimmen – oder lies alle 80 Thesen mit unseren Begründungen."
      />
      <Section>
        <WahlomatFeature />
      </Section>
      <CTASection
        title="Freiheit braucht Menschen wie dich"
        description="Wenn unsere Positionen dich überzeugen, werde Teil der konsequentesten Freiheitspartei Deutschlands."
        primaryLabel="Werde Mitglied"
        primaryHref="/werde-mitglied"
        secondaryLabel="Unser Programm"
        secondaryHref="/programm"
      />
    </>
  );
}