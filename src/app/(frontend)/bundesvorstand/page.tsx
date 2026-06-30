import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CTASection } from "@/components/shared/cta-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(seoPages.bundesvorstand);

const board = [
  {
    name: "Dr. Mathias Hummel, MBA",
    role: "Bundesvorsitzender",
    email: "mathias.hummel@die-libertaeren.de",
    twitter: "https://twitter.com/hummel_mathias",
    image: "https://die-libertaeren.de/wp-content/uploads/2024/08/m_hummel_1024.jpg",
    quote:
      "Ich stelle mir eine Gesellschaft vor, deren moralische Grundsätze keine Widersprüche aufweisen, deren Rechte allgemein gültig sind und in der jeder Mensch ein selbstbestimmtes Leben führen kann.",
    bio: "Als promovierter Physiker und MBA-Absolvent bringe ich eine starke analytische Perspektive in die politische Diskussion ein. Als Mitbegründer setze ich mich für einen pragmatischen Libertarismus ein.",
  },
  {
    name: "Florian Handwerker, M.A.",
    role: "Bundesgeschäftsführer",
    email: "florian.handwerker@die-libertaeren.de",
    twitter: "https://twitter.com/Libertaerer_FH",
    image: "https://die-libertaeren.de/wp-content/uploads/2023/02/FlorianHandwerker.png",
    quote:
      "Libertarismus bedeutet für mich den Gang hinaus aus der selbstverschuldeten Unmündigkeit – ganz im Sinne der Aufklärung.",
    bio: "Als Bundesgeschäftsführer koordiniere ich die operative Arbeit der Partei und setze mich für breite Akzeptanz persönlicher Freiheit und Selbstverantwortung ein.",
  },
];

export default function BundesvorstandPage() {
  return (
    <>
      <PageHeader
        title="Unser Bundesvorstand"
        subtitle="Politik ist nicht die Lösung – aber die öffentliche Debatte führt auch politisch. Wir sind Aufklärer."
      />

      <Section>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Auf den ersten Blick stellen Libertarismus und Parteiarbeit einen
            Widerspruch dar. Doch wir sind überzeugt, dass der friedliche Weg hin
            zu mehr Autonomie auch über die öffentliche Debatte führt.
          </p>
          <p>
            Als Libertäre betrachten wir uns nicht als traditionelle politische
            Partei, sondern als Stimme der Freiheit in der öffentlichen Debatte.
          </p>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <h2 className="mb-12 font-display text-3xl font-bold">
          Die Mitglieder des Bundesvorstands
        </h2>
        <div className="grid gap-12 lg:grid-cols-2">
          {board.map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="aspect-[4/3] relative bg-muted">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{member.name}</CardTitle>
                <p className="font-medium text-primary">{member.role}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  &ldquo;{member.quote}&rdquo;
                </blockquote>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-primary hover:underline"
                  >
                    {member.email}
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    X / Twitter
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection
        title="Freiheit ist kein Geschenk, sondern dein Recht!"
        description="Lasse auch du deinem Freiheitswillen Taten folgen! Werde der Patron einer wahren Freiheitsbewegung!"
        primaryLabel="Unterstütze uns"
        primaryHref="/werde-unterstuetzer"
      />
    </>
  );
}