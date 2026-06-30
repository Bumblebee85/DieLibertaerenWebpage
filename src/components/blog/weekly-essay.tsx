import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { richTextToHtml } from "@/lib/cms/rich-text";
import type { WeeklyEssayDisplay } from "@/lib/cms/weekly-essays";

type WeeklyEssayProps = {
  essay: WeeklyEssayDisplay;
  weekNumber: number;
};

export function WeeklyEssay({ essay, weekNumber }: WeeklyEssayProps) {
  const contentHtml = richTextToHtml(essay.content, essay.contentPlain);

  return (
    <Card
      id="aufsatz-der-woche"
      className="scroll-mt-28 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
    >
      <CardHeader>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge>Libertärer Aufsatz der Woche</Badge>
          <Badge variant="muted">KW {weekNumber}</Badge>
        </div>
        <CardTitle className="text-2xl md:text-3xl">{essay.title}</CardTitle>
        <p className="text-sm text-muted-foreground">von {essay.author}</p>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg font-medium text-foreground">{essay.excerpt}</p>
        <div
          className="prose prose-lg max-w-none leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {essay.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}