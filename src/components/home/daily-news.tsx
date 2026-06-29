import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeader } from "@/components/shared/section";
import dailyNews from "@/data/daily-news.json";
import { formatDateDE } from "@/lib/utils";

export function DailyNews() {
  return (
    <Section className="border-t border-slate-300/70">
      <SectionHeader
        title="Tagesaktuelle libertäre Impulse"
        subtitle="3 Top News – täglich aktualisierbar über src/data/daily-news.json"
      />
      <div className="grid gap-8 md:grid-cols-3 md:gap-10">
        {dailyNews.items.map((item) => (
          <Card
            key={item.id}
            className="texture-surface-card group flex flex-col transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <div className="mb-3 flex items-center justify-between">
                <Badge variant="muted">{item.source}</Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDateDE(item.date)}
                </span>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">
                <Link href={item.url} className="flex items-start gap-2">
                  <Newspaper className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>{item.title}</span>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-auto">
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
              <Link
                href={item.url}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:underline"
              >
                Weiterlesen
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}