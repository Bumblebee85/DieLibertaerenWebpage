import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/shared/cta-section";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeader } from "@/components/shared/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFreiheitsbewegungContent } from "@/lib/cms/freiheitsbewegung";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";
import { BookOpen, Globe2, Landmark, Scale } from "lucide-react";

export const metadata: Metadata = createPageMetadata(seoPages.freiheitsbewegung);
export const dynamic = "force-dynamic";

export default async function FreiheitsbewegungPage() {
  const content = await getFreiheitsbewegungContent();

  return (
    <>
      <Breadcrumbs items={[{ label: "Freiheitsbewegung" }]} />
      <PageHeader title={content.pageTitle} subtitle={content.pageSubtitle} />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          {content.introParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeader
          title={content.austrianSchool.title}
          subtitle={content.austrianSchool.subtitle}
          align="center"
        />
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <Card className="texture-surface-card">
            <CardHeader>
              <Scale className="h-8 w-8 text-primary" />
              <CardTitle>{content.austrianSchool.cardLeft.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              {content.austrianSchool.cardLeft.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
          <Card className="texture-surface-card">
            <CardHeader>
              <Landmark className="h-8 w-8 text-primary" />
              <CardTitle>{content.austrianSchool.cardRight.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              {content.austrianSchool.cardRight.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeader title={content.figuresSectionTitle} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.figures.map((figure) => (
            <Card key={figure.id} className="overflow-hidden texture-surface-card">
              {figure.imageUrl && (
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={figure.imageUrl}
                    alt={figure.imageAlt ?? figure.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{figure.name}</CardTitle>
                <p className="text-sm font-medium text-primary">{figure.years}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{figure.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-black/10 bg-muted/20">
        <SectionHeader
          title={content.history.title}
          subtitle={content.history.subtitle}
        />
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
            {content.history.paragraphs.map((paragraph) => {
              const Icon = paragraph.icon === "globe" ? Globe2 : BookOpen;
              return (
                <div key={paragraph.text.slice(0, 40)} className="flex items-start gap-3">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <p className="leading-relaxed">{paragraph.text}</p>
                </div>
              );
            })}
          </div>
          <Card className="texture-surface-card">
            <CardHeader>
              <CardTitle>{content.history.milestonesTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.history.milestones.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <CTASection
        title="Freiheit braucht Menschen wie dich"
        description="Werde Teil der konsequentesten Freiheitspartei Deutschlands."
        primaryLabel="Mitglied werden"
        primaryHref="/werde-mitglied"
        secondaryLabel="Unterstützer werden"
        secondaryHref="/werde-unterstuetzer"
      />
    </>
  );
}