import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeeklyEssayForCurrentWeek } from "@/lib/cms/weekly-essays";
import { richTextToHtml } from "@/lib/cms/rich-text";

export async function WeeklyEssayTeaser() {
  const { essay, weekNumber } = await getWeeklyEssayForCurrentWeek();
  const previewHtml = richTextToHtml(essay.content, essay.contentPlain);
  const previewText = previewHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  return (
    <section className="relative border-y border-black/10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Card className="texture-surface-card overflow-hidden border-2 border-primary/20 shadow-lg">
          <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
            <CardHeader className="pb-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge className="gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  Libertärer Aufsatz der Woche
                </Badge>
                <Badge variant="muted">KW {weekNumber}</Badge>
              </div>
              <CardTitle className="font-display text-2xl md:text-3xl lg:text-4xl">
                {essay.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">von {essay.author}</p>
            </CardHeader>
            <CardContent className="pb-8 lg:max-w-2xl">
              <p className="text-lg font-medium text-foreground">{essay.excerpt}</p>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {previewText}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {essay.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <div className="flex items-end border-t border-border/60 p-6 lg:border-l lg:border-t-0">
              <Button size="lg" className="w-full lg:w-auto" asChild>
                <Link href="/blog#aufsatz-der-woche">
                  Aufsatz lesen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}