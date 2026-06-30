import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CTASection } from "@/components/shared/cta-section";
import { ThesenViewer } from "@/components/programm/thesen-viewer";
import thesenData from "@/data/thesen-v4.json";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(seoPages.programm);

export default function ProgrammPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Programm" }]} />
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
        secondaryLabel="Thesenpapier als PDF"
        secondaryHref={thesenData.pdfUrl}
      />
    </>
  );
}