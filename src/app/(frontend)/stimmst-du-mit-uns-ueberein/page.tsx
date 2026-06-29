import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CTASection } from "@/components/shared/cta-section";
import { WahlomatFeature } from "@/components/wahlomat/wahlomat-feature";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(seoPages.wahlomat);

export default function StimmstDuMitUnsUebereinPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Wahl-O-Mat" }]} />
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