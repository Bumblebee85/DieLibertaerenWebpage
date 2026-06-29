import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CTASection } from "@/components/shared/cta-section";
import { ThesenViewer } from "@/components/programm/thesen-viewer";
import thesenData from "@/data/thesen-v4.json";

export const metadata: Metadata = {
  title: "Unser Programm – Thesenpapier v4",
  description:
    "Das vollständige Thesenpapier DER LIBERTÄREN v4: Leitbild, Grundthese, Erste Maßnahmen und alle politischen Positionen.",
};

export default function ProgrammPage() {
  return (
    <>
      <PageHeader
        title={thesenData.title}
        subtitle={`${thesenData.subtitle} – Leitbild, Grundthese, Erste Maßnahmen und alle Themen mit konkreten Maßnahmen.`}
      />
      <Section>
        <ThesenViewer />
      </Section>
      <CTASection
        title="Wahre Freiheit braucht mutige Kämpfer!"
        description="Lasse auch du deinem Freiheitswillen Taten folgen und engagiere dich bei uns. Werde noch heute Mitglied!"
        primaryLabel="Werde Mitglied"
        primaryHref="/werde-mitglied"
        secondaryLabel="Programm als PDF"
        secondaryHref={thesenData.pdfUrl}
      />
    </>
  );
}