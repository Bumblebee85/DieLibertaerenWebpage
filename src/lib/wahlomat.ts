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

export interface QuizResult {
  percentage: number;
  matches: number;
  partialMatches: number;
  total: number;
  headline: string;
  summary: string;
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

export function calculateQuizResult(
  quizThesen: These[],
  answers: Record<number, UserAnswer>
): QuizResult {
  let score = 0;
  let matches = 0;
  let partialMatches = 0;

  for (const these of quizThesen) {
    const answer = answers[these.id];
    if (!answer) continue;

    const matchScore = calculateMatchScore(answer, these.position);
    score += matchScore;

    if (matchScore === 1) matches++;
    else if (matchScore === 0.5) partialMatches++;
  }

  const total = quizThesen.length;
  const percentage = Math.round((score / total) * 100);

  return {
    percentage,
    matches,
    partialMatches,
    total,
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