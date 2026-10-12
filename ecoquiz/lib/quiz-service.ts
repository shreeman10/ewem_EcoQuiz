import fs from "fs";
import path from "path";
import { Question, QuizFilter } from "./types";

let cachedQuestions: Question[] | null = null;

export function getAllQuestions(): Question[] {
  if (cachedQuestions) {
    return cachedQuestions;
  }
  const filePath = path.join(process.cwd(), "data/questions.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  cachedQuestions = JSON.parse(fileContents);
  return cachedQuestions || [];
}

/**
 * Fisher-Yates unbiased shuffle algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Selects questions server-side based on user filter parameters.
 * Shuffles options for MCQs while preserving the stable correctAnswer string.
 * Shuffles the selected question order.
 */
export function selectQuestions(filter: QuizFilter, excludeIds: string[] = []): Question[] {
  const all = getAllQuestions();

  // Filter by mode
  let filtered = all.filter((q) => q.mode === filter.mode);

  // Filter by category if not mixed
  if (filter.category !== "mixed") {
    filtered = filtered.filter((q) => q.category === filter.category);
  }

  // Filter by difficulty if not mixed
  if (filter.difficulty !== "mixed") {
    filtered = filtered.filter((q) => q.difficulty === filter.difficulty);
  }

  // Prioritize unseen questions if enough are available
  const unseen = filtered.filter((q) => !excludeIds.includes(q.id));
  const pool = unseen.length >= filter.limit ? unseen : filtered;

  // Unbiased shuffle of questions
  const shuffledPool = shuffleArray(pool);
  const selected = shuffledPool.slice(0, filter.limit);

  // Shuffle MCQ answer options so order is randomized per attempt
  return selected.map((q) => {
    if (q.mode === "general") {
      return {
        ...q,
        options: shuffleArray(q.options),
      };
    }
    // Myth vs Facts keeps standard ["Myth", "Fact"] order
    return q;
  });
}
