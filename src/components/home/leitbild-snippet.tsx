import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/shared/section";
import thesenData from "@/data/thesen-v4.json";

const leitbildItems = [
  thesenData.leitbild.vision,
  thesenData.leitbild.mission,
  thesenData.leitbild.values,
];

export function LeitbildSnippet() {
  return (
    <Section className="bg-muted/30">
      <SectionHeader
        title="Unser Leitbild"
        subtitle="Vision, Mission und Werte bilden das Fundament unseres Handelns als Partei."
        align="center"
      />
      <div className="grid gap-8 md:grid-cols-3">
        {leitbildItems.map((item) => (
          <Card key={item.title} className="border-none bg-white shadow-sm">
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                {item.title}
              </p>
              <CardTitle className="text-xl leading-snug">
                {item.headline}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
                {item.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/programm"
          className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:underline"
        >
          Vollständiges Leitbild & Thesenpapier v4
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}