import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import weeklyEssays from "@/data/weekly-essays.json";
import { getWeekNumber } from "@/lib/utils";

export function WeeklyEssay() {
  const weekNumber = getWeekNumber();
  const essay =
    weeklyEssays.essays.find((e) => e.week === weekNumber) ??
    weeklyEssays.essays[(weekNumber - 1) % weeklyEssays.essays.length];

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
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
        <p className="leading-relaxed text-muted-foreground">{essay.content}</p>
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