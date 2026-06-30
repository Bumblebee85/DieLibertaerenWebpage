import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CTASection } from "@/components/shared/cta-section";
import { ThesenViewer } from "@/components/programm/thesen-viewer";
import { getProgramContent } from "@/lib/cms/program";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(seoPages.programm);
export const dynamic = "force-dynamic";

export default async function ProgrammPage() {
  const program = await getProgramContent();

  return (
    <>
      <Breadcrumbs items={[{ label: "Programm" }]} />
      <PageHeader
        title={program.title}
        subtitle={`${program.subtitle} – Leitbild, Grundthese, Erste Maßnahmen und alle Themen mit konkreten Maßnahmen.`}
      />
      <Section>
        <ThesenViewer program={program} />
      </Section>
      <CTASection
        title="Wahre Freiheit braucht mutige Kämpfer!"
        description="Lasse auch du deinem Freiheitswillen Taten folgen und engagiere dich bei uns. Werde noch heute Mitglied!"
        primaryLabel="Werde Mitglied"
        primaryHref="/werde-mitglied"
        secondaryLabel="Thesenpapier als PDF"
        secondaryHref={program.pdfUrl}
      />
    </>
  );
}