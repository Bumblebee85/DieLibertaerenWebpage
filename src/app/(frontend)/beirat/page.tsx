import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/shared/cta-section";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeader } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdvisoryIcon, getBeiratPageContent } from "@/lib/cms/beirat";
import { richTextToHtml } from "@/lib/cms/rich-text";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(seoPages.beirat);
export const dynamic = "force-dynamic";

export default async function BeiratPage() {
  const content = await getBeiratPageContent();
  const nachrufHtml = richTextToHtml(content.nachruf.body, content.nachruf.bodyPlain);

  return (
    <>
      <Breadcrumbs items={[{ label: "Beirat" }]} />
      <PageHeader title={content.pageTitle} subtitle={content.pageSubtitle} />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>{content.intro}</p>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeader title={content.tasksSectionTitle} align="center" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.tasks.map((task) => {
            const Icon = getAdvisoryIcon(task.icon);
            return (
              <Card key={task.title} className="texture-surface-card">
                <CardHeader>
                  <Icon className="h-7 w-7 text-primary" />
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {task.text}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader
          title={content.membersSectionTitle}
          subtitle={content.membersSectionSubtitle}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {content.members.map((member) => (
            <Card
              key={member.id}
              className={`overflow-hidden texture-surface-card ${
                member.deceased ? "border-muted-foreground/20 opacity-90" : ""
              }`}
            >
              <div className="grid gap-0 md:grid-cols-[200px_1fr]">
                {member.imageUrl && (
                  <div className="relative aspect-square bg-muted md:aspect-auto md:min-h-[220px]">
                    <Image
                      src={member.imageUrl}
                      alt={member.imageAlt ?? member.name}
                      fill
                      className={`object-cover ${member.deceased ? "grayscale" : ""}`}
                      sizes="200px"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge variant={member.deceased ? "outline" : "default"}>
                      {member.role}
                    </Badge>
                    {member.deceased && member.deceasedDate && (
                      <Badge variant="muted">† {member.deceasedDate}</Badge>
                    )}
                  </div>
                  <h3 className="font-display text-2xl font-bold">{member.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {content.nachruf.enabled && (
        <Section className="border-t border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="mx-auto max-w-3xl">
            <Card className="border-2 border-primary/20 bg-white/80 shadow-lg">
              <CardHeader>
                <Badge variant="outline" className="w-fit">
                  {content.nachruf.badgeLabel}
                </Badge>
                <CardTitle className="font-display text-2xl md:text-3xl">
                  {content.nachruf.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{content.nachruf.subtitle}</p>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-lg max-w-none leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: nachrufHtml }}
                />
              </CardContent>
            </Card>
          </div>
        </Section>
      )}

      <Section>
        <p className="mx-auto max-w-2xl text-center text-muted-foreground">
          {content.contactHint.includes("Schreib uns") ? (
            <>
              {content.contactHint.split("Schreib uns")[0]}
              <Link href="/kontakt" className="font-semibold text-primary hover:underline">
                Schreib uns
              </Link>
              {content.contactHint.split("Schreib uns")[1]}
            </>
          ) : (
            content.contactHint
          )}
        </p>
      </Section>

      <CTASection
        title="Freiheit braucht fundierte Argumente"
        description="Unterstütze die konsequenteste Freiheitspartei Deutschlands."
        primaryLabel="Unterstützer werden"
        primaryHref="/werde-unterstuetzer"
        secondaryLabel="Netzwerk"
        secondaryHref="/netzwerk"
      />
    </>
  );
}