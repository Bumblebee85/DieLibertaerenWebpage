import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CTASection } from "@/components/shared/cta-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import siteConfig from "@/data/site-config.json";

import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(seoPages.netzwerk);

const partners = [
  {
    name: "Freiheitliche Stammtische",
    description: "Visualisierung libertärer Stammtische in ganz Deutschland.",
    url: siteConfig.stammtische,
  },
  {
    name: "Freiheitsbewegung",
    description: "Vernetzung mit Organisationen der internationalen Freiheitsbewegung.",
    url: "https://die-libertaeren.de/freiheitsbewegung/",
  },
  {
    name: "Beirat",
    description: "Wissenschaftlicher Beirat mit fachkundigen Persönlichkeiten.",
    url: "https://die-libertaeren.de/beirat/",
  },
];

export default function NetzwerkPage() {
  return (
    <>
      <PageHeader
        title="Netzwerk"
        subtitle="Gemeinsam lassen wir die Freiheit wieder erblühen – durch Austausch und Vernetzung."
      />

      <Section>
        <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
          Wir leben vom Austausch und von der Vernetzung mit wissenschaftlichen
          und zivilgesellschaftlichen Organisationen. Werde Teil der libertären
          Bewegung!
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {partners.map((partner) => (
            <Card key={partner.name}>
              <CardHeader>
                <CardTitle>{partner.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {partner.description}
                </p>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Mehr erfahren
                  <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection
        title="Gemeinsam lassen wir die Freiheit wieder erblühen!"
        description="Werde Teil der libertären Bewegung und vernetze dich mit uns."
        primaryLabel="Mitmachen"
        primaryHref="/mitmachen"
        secondaryLabel="Kontakt"
        secondaryHref="/kontakt"
      />
    </>
  );
}