"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateQuizResult,
  QUIZ_QUESTION_COUNT,
  shuffleThesen,
  type QuizResult,
  type These,
  type UserAnswer,
} from "@/lib/wahlomat";
import { QuizResults } from "./quiz-results";

type QuizPhase = "intro" | "quiz" | "results";

interface SchnellCheckQuizProps {
  thesen: These[];
  onShowAllThesen: () => void;
}

const answerOptions: Array<{
  value: UserAnswer;
  label: string;
  selectedClass: string;
}> = [
  {
    value: "zustimmen",
    label: "Zustimmen",
    selectedClass: "border-accent bg-accent/15 text-accent",
  },
  {
    value: "neutral",
    label: "Neutral",
    selectedClass: "border-border bg-muted text-foreground",
  },
  {
    value: "ablehnen",
    label: "Ablehnen",
    selectedClass: "border-accent-orange bg-accent-orange/15 text-accent-orange",
  },
];

export function SchnellCheckQuiz({ thesen, onShowAllThesen }: SchnellCheckQuizProps) {
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [quizThesen, setQuizThesen] = useState<These[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, UserAnswer>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentThese = quizThesen[currentIndex];
  const currentAnswer = currentThese ? answers[currentThese.id] : undefined;
  const answeredCount = Object.keys(answers).length;
  const progress = quizThesen.length
    ? Math.round((answeredCount / quizThesen.length) * 100)
    : 0;

  const startQuiz = useCallback(() => {
    setQuizThesen(shuffleThesen(thesen, QUIZ_QUESTION_COUNT));
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setPhase("quiz");
  }, [thesen]);

  const selectAnswer = (answer: UserAnswer) => {
    if (!currentThese) return;
    setAnswers((prev) => ({ ...prev, [currentThese.id]: answer }));
  };

  const goNext = () => {
    if (currentIndex < quizThesen.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const submitQuiz = () => {
    const quizResult = calculateQuizResult(quizThesen, answers);
    setResult(quizResult);
    setPhase("results");
  };

  const allAnswered = quizThesen.every((item) => answers[item.id]);

  if (phase === "intro") {
    return (
      <Card className="mx-auto max-w-2xl border-none bg-muted/40 shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-3xl">Schnell-Check</CardTitle>
          <p className="mt-4 text-muted-foreground">
            Beantworte {QUIZ_QUESTION_COUNT} zufällig ausgewählte Thesen und
            finde heraus, wie stark du mit DIE LIBERTÄREN übereinstimmst.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 pb-10">
          <div className="grid w-full gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="rounded-xl bg-white px-4 py-3 text-center">
              <p className="font-semibold text-foreground">{QUIZ_QUESTION_COUNT}</p>
              <p>Fragen</p>
            </div>
            <div className="rounded-xl bg-white px-4 py-3 text-center">
              <p className="font-semibold text-foreground">~3 Min.</p>
              <p>Dauer</p>
            </div>
            <div className="rounded-xl bg-white px-4 py-3 text-center">
              <p className="font-semibold text-foreground">Sofort</p>
              <p>Auswertung</p>
            </div>
          </div>
          <Button size="lg" onClick={startQuiz} disabled={thesen.length === 0}>
            Jetzt Quiz starten
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (phase === "results" && result) {
    return (
      <QuizResults
        result={result}
        onShowAllThesen={onShowAllThesen}
        onRestart={startQuiz}
      />
    );
  }

  if (!currentThese) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Frage {currentIndex + 1} von {quizThesen.length}
          </span>
          <span>{progress}% beantwortet</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / quizThesen.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {currentThese.category}
          </span>
          <CardTitle className="mt-2 text-xl leading-snug">
            {currentThese.these}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {answerOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => selectAnswer(option.value)}
                className={`rounded-2xl border-2 px-4 py-4 text-sm font-semibold transition-all hover:scale-[1.02] ${
                  currentAnswer === option.value
                    ? option.selectedClass
                    : "border-border bg-white text-foreground hover:border-primary/40"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button
              variant="outline"
              onClick={goPrev}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>

            {currentIndex < quizThesen.length - 1 ? (
              <Button onClick={goNext} disabled={!currentAnswer}>
                Weiter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={submitQuiz} disabled={!allAnswered}>
                Auswertung anzeigen
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}