"use client";

import { CheckCircle2, MinusCircle, RotateCcw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getMatchStatusLabel,
  getMatchStatusStyles,
  getPositionColor,
  getUserAnswerLabel,
  getUserAnswerStyles,
  type QuizResult,
  type TheseComparison,
} from "@/lib/wahlomat";

interface QuizResultsProps {
  result: QuizResult;
  onShowAllThesen: () => void;
  onRestart: () => void;
}

function MatchStatusIcon({ status }: { status: TheseComparison["matchStatus"] }) {
  const styles = getMatchStatusStyles(status);

  switch (status) {
    case "match":
      return <CheckCircle2 className={`h-5 w-5 shrink-0 ${styles.icon}`} />;
    case "partial":
      return <MinusCircle className={`h-5 w-5 shrink-0 ${styles.icon}`} />;
    case "differ":
      return <XCircle className={`h-5 w-5 shrink-0 ${styles.icon}`} />;
  }
}

function TheseResultCard({ comparison }: { comparison: TheseComparison }) {
  const { these, userAnswer, matchStatus } = comparison;
  const statusStyles = getMatchStatusStyles(matchStatus);

  return (
    <article
      className={`rounded-2xl border border-border bg-white border-l-4 ${statusStyles.border} p-5 shadow-sm`}
    >
      <div className="flex items-start gap-3">
        <MatchStatusIcon status={matchStatus} />
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              These {these.id} · {these.category}
            </span>
            <span
              className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyles.badge}`}
            >
              {getMatchStatusLabel(matchStatus)}
            </span>
          </div>

          <p className="text-base font-medium leading-snug text-foreground">
            {these.these}
          </p>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <span
              className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${getUserAnswerStyles(userAnswer)}`}
            >
              Deine Antwort: {getUserAnswerLabel(userAnswer)}
            </span>
            <span
              className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${getPositionColor(these.position)}`}
            >
              Unsere Position: {these.position}
            </span>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem
              value={`begruendung-${these.id}`}
              className="rounded-xl border border-border/60 bg-muted/20 px-4"
            >
              <AccordionTrigger className="py-4 text-sm font-semibold hover:no-underline">
                Unsere Begründung ansehen
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed">
                {these.begruendung}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </article>
  );
}

function ResultSection({
  title,
  count,
  items,
  emptyMessage,
}: {
  title: string;
  count: number;
  items: TheseComparison[];
  emptyMessage?: string;
}) {
  if (items.length === 0 && emptyMessage) {
    return (
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <p className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-8 text-center text-muted-foreground">
          {emptyMessage}
        </p>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-bold">
        {title}{" "}
        <span className="text-lg font-normal text-muted-foreground">({count})</span>
      </h2>
      <div className="space-y-4">
        {items.map((comparison) => (
          <TheseResultCard
            key={comparison.these.id}
            comparison={comparison}
          />
        ))}
      </div>
    </section>
  );
}

export function QuizResults({
  result,
  onShowAllThesen,
  onRestart,
}: QuizResultsProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <Card className="border-none bg-muted/40 shadow-none">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-display text-3xl">{result.headline}</CardTitle>
          <p className="mt-4 text-muted-foreground">{result.summary}</p>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Übereinstimmung
            </p>
            <p className="mt-2 font-display text-6xl font-bold text-primary">
              {result.percentage}%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {result.matches} exakte Treffer · {result.partialMatches} teilweise
              Übereinstimmungen
            </p>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${result.percentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <ResultSection
        title="Wo wir übereinstimmen"
        count={result.agreements.length}
        items={result.agreements}
        emptyMessage="Bei keiner der 20 Thesen hast du exakt unsere Position geteilt."
      />

      <ResultSection
        title="Wo wir abweichen / neutral sind"
        count={result.differences.length}
        items={result.differences}
        emptyMessage="Perfekt! Bei allen 20 Thesen stimmst du exakt mit uns überein."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" onClick={onShowAllThesen}>
          Alle Thesen ansehen
        </Button>
        <Button size="lg" variant="outline" onClick={onRestart}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Quiz wiederholen
        </Button>
      </div>
    </div>
  );
}