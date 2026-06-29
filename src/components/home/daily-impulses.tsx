import Link from "next/link";
import { ArrowUpRight, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/shared/section";
import { getLatestDailyImpulses } from "@/lib/cms/daily-impulses";
import { formatDateDE } from "@/lib/utils";

/**
 * Tagesaktuelle libertäre Impulse – Daten aus Payload CMS (Collection: daily-impulses).
 * Sektion wird ausgeblendet, wenn keine Impulse vorhanden sind.
 */
export async function DailyImpulsesSection() {
  const impulses = await getLatestDailyImpulses(3);

  if (impulses.length === 0) {
    return null;
  }

  return (
    <Section className="border-t border-black/10">
      <SectionHeader
        title="Tagesaktuelle libertäre Impulse"
        subtitle="Kurznews mit libertärer Einordnung – pflegbar im CMS unter „Tagesimpulse“."
      />
      <div className="grid gap-8 md:grid-cols-3 md:gap-10">
        {impulses.map((item) => (
          <Card
            key={item.id}
            className="texture-surface-card group flex flex-col transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {formatDateDE(item.date)}
                </span>
              </div>
              <CardTitle className="group-hover:text-primary text-lg transition-colors">
                {item.sourceLink ? (
                  <Link href={item.sourceLink} className="flex items-start gap-2">
                    <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <span className="flex items-start gap-2">
                    <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>{item.title}</span>
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-auto">
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                {item.shortText}
              </p>
              <p className="mb-4 rounded-lg border border-primary/15 bg-primary/5 px-3 py-2 text-sm leading-relaxed text-foreground">
                <span className="font-semibold text-primary">Libertäre Sicht: </span>
                {item.libertarianPerspective}
              </p>
              {item.sourceLink && (
                <Link
                  href={item.sourceLink}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:underline"
                >
                  Weiterlesen
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}