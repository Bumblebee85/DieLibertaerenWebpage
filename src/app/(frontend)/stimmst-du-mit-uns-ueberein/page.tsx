import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CTASection } from "@/components/shared/cta-section";
import { WahlomatPageClient } from "@/components/wahlomat/wahlomat-page-client";
import {
  getPublishedWahlomatElections,
  getWahlomatElectionBySlug,
} from "@/lib/cms/wahlomat";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(seoPages.wahlomat);
export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ wahl?: string }>;
};

export default async function StimmstDuMitUnsUebereinPage({
  searchParams,
}: PageProps) {
  const { wahl } = await searchParams;
  const [election, elections] = await Promise.all([
    getWahlomatElectionBySlug(wahl),
    getPublishedWahlomatElections(),
  ]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Wahlkompass" }]} />
      <PageHeader
        title="Stimmst du mit uns überein?"
        subtitle={`Finde in wenigen Minuten heraus, wie stark deine Positionen mit DIE LIBERTÄREN übereinstimmen – oder lies alle ${election.thesen.length} Thesen mit unseren Begründungen.`}
      />
      <Section>
        <WahlomatPageClient election={election} elections={elections} />
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