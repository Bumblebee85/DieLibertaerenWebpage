import wahlomatData from "@/data/wahlomat-thesen.json";

export type PartyPosition = "Ja" | "Nein" | "Neutral";
export type UserAnswer = "zustimmen" | "neutral" | "ablehnen";

export interface These {
  id: number;
  these: string;
  position: PartyPosition;
  begruendung: string;
  category: string;
}

export type MatchStatus = "match" | "partial" | "differ";

export interface TheseComparison {
  these: These;
  userAnswer: UserAnswer;
  matchScore: number;
  matchStatus: MatchStatus;
}

export interface QuizResult {
  percentage: number;
  matches: number;
  partialMatches: number;
  total: number;
  headline: string;
  summary: string;
  agreements: TheseComparison[];
  differences: TheseComparison[];
}

export const QUIZ_QUESTION_COUNT = 20;

export const thesen: These[] = wahlomatData.thesen as These[];

export const categories = Array.from(
  new Set(thesen.map((t) => t.category))
).sort();

export function shuffleThesen(count: number = QUIZ_QUESTION_COUNT): These[] {
  const pool = [...thesen];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function normalizePosition(position: PartyPosition | UserAnswer): string {
  if (position === "zustimmen" || position === "Ja") return "ja";
  if (position === "ablehnen" || position === "Nein") return "nein";
  return "neutral";
}

export function calculateMatchScore(
  userAnswer: UserAnswer,
  partyPosition: PartyPosition
): number {
  const user = normalizePosition(userAnswer);
  const party = normalizePosition(partyPosition);

  if (user === party) return 1;
  if (user === "neutral" || party === "neutral") return 0.5;
  return 0;
}

export function getMatchStatus(matchScore: number): MatchStatus {
  if (matchScore === 1) return "match";
  if (matchScore === 0.5) return "partial";
  return "differ";
}

export function getUserAnswerLabel(answer: UserAnswer): string {
  switch (answer) {
    case "zustimmen":
      return "Zustimmen";
    case "ablehnen":
      return "Ablehnen";
    case "neutral":
      return "Neutral";
  }
}

export function getMatchStatusLabel(status: MatchStatus): string {
  switch (status) {
    case "match":
      return "Übereinstimmung";
    case "partial":
      return "Teilweise / Neutral";
    case "differ":
      return "Abweichung";
  }
}

export function getMatchStatusStyles(status: MatchStatus): {
  border: string;
  badge: string;
  icon: string;
} {
  switch (status) {
    case "match":
      return {
        border: "border-l-accent",
        badge: "bg-accent/15 text-accent border-accent/30",
        icon: "text-accent",
      };
    case "partial":
      return {
        border: "border-l-primary",
        badge: "bg-primary/15 text-foreground border-primary/30",
        icon: "text-primary",
      };
    case "differ":
      return {
        border: "border-l-accent-orange",
        badge: "bg-accent-orange/15 text-accent-orange border-accent-orange/30",
        icon: "text-accent-orange",
      };
  }
}

export function getUserAnswerStyles(answer: UserAnswer): string {
  switch (answer) {
    case "zustimmen":
      return "bg-accent/10 text-accent border-accent/25";
    case "ablehnen":
      return "bg-accent-orange/10 text-accent-orange border-accent-orange/25";
    case "neutral":
      return "bg-muted text-muted-foreground border-border";
  }
}

function buildTheseComparison(
  these: These,
  answer: UserAnswer
): TheseComparison {
  const matchScore = calculateMatchScore(answer, these.position);
  return {
    these,
    userAnswer: answer,
    matchScore,
    matchStatus: getMatchStatus(matchScore),
  };
}

export function calculateQuizResult(
  quizThesen: These[],
  answers: Record<number, UserAnswer>
): QuizResult {
  let score = 0;
  let matches = 0;
  let partialMatches = 0;

  const comparisons: TheseComparison[] = [];

  for (const these of quizThesen) {
    const answer = answers[these.id];
    if (!answer) continue;

    const comparison = buildTheseComparison(these, answer);
    comparisons.push(comparison);

    score += comparison.matchScore;

    if (comparison.matchScore === 1) matches++;
    else if (comparison.matchScore === 0.5) partialMatches++;
  }

  const total = quizThesen.length;
  const percentage = Math.round((score / total) * 100);

  const agreements = comparisons.filter((c) => c.matchStatus === "match");
  const differences = comparisons.filter((c) => c.matchStatus !== "match");

  return {
    percentage,
    matches,
    partialMatches,
    total,
    agreements,
    differences,
    ...getResultMessage(percentage),
  };
}

function getResultMessage(percentage: number): {
  headline: string;
  summary: string;
} {
  if (percentage >= 90) {
    return {
      headline: "Fast auf einer Wellenlänge!",
      summary:
        "Deine Positionen stimmen in fast allen Fragen mit uns überein. Du denkst freiheitlich – aus Prinzip.",
    };
  }
  if (percentage >= 75) {
    return {
      headline: "Starke Übereinstimmung",
      summary:
        "In den meisten Punkten teilst du unsere libertäre Haltung. Schau dir unsere Begründungen an – vielleicht überzeugen wir dich auch bei den restlichen Thesen.",
    };
  }
  if (percentage >= 55) {
    return {
      headline: "Teils übereinstimmend",
      summary:
        "Du stimmst uns in vielen Fragen zu, hast aber auch eigene Positionen. Unsere Thesen-Übersicht zeigt dir, wo wir genau stehen und warum.",
    };
  }
  if (percentage >= 35) {
    return {
      headline: "Deutliche Differenzen",
      summary:
        "Es gibt einige gemeinsame Punkte, aber auch klare Unterschiede. Informiere dich über unsere Begründungen – vielleicht siehst du manche Themen neu.",
    };
  }
  return {
    headline: "Unterschiedliche Perspektiven",
    summary:
      "Deine Antworten weichen in vielen Punkten von unseren Positionen ab. Wir laden dich ein, unsere 80 Thesen und Begründungen zu lesen – vielleicht findest du Überraschungen.",
  };
}

export function getPositionLabel(position: PartyPosition): string {
  switch (position) {
    case "Ja":
      return "Zustimmung";
    case "Nein":
      return "Ablehnung";
    case "Neutral":
      return "Neutral";
  }
}

export function getPositionColor(position: PartyPosition): string {
  switch (position) {
    case "Ja":
      return "bg-accent/15 text-accent border-accent/30";
    case "Nein":
      return "bg-accent-orange/15 text-accent-orange border-accent-orange/30";
    case "Neutral":
      return "bg-muted text-muted-foreground border-border";
  }
}