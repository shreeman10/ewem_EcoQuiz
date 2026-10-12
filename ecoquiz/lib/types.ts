import { z } from "zod";

export const QuestionModeSchema = z.enum(["myth_vs_facts", "general"]);
export type QuestionMode = z.infer<typeof QuestionModeSchema>;

export const QuestionCategorySchema = z.enum(["general", "device_based", "environmental"]);
export type QuestionCategory = z.infer<typeof QuestionCategorySchema>;

export const QuestionDifficultySchema = z.enum(["easy", "medium", "hard"]);
export type QuestionDifficulty = z.infer<typeof QuestionDifficultySchema>;

export const QuestionSchema = z.object({
  id: z.string().min(1),
  mode: QuestionModeSchema,
  category: QuestionCategorySchema,
  difficulty: QuestionDifficultySchema,
  question: z.string().min(5),
  options: z.array(z.string().min(1)).refine((opts) => opts.length === 2 || opts.length === 4, {
    message: "Options must have either 2 choices (Myth vs Fact) or 4 choices (MCQ)",
  }),
  correctAnswer: z.string().min(1),
  explanation: z.string().min(10),
  tags: z.array(z.string()).default([]),
}).refine((data) => data.options.includes(data.correctAnswer), {
  message: "correctAnswer must be present in options array",
  path: ["correctAnswer"],
}).refine((data) => {
  if (data.mode === "myth_vs_facts") {
    return data.options.length === 2 && data.options.includes("Myth") && data.options.includes("Fact");
  }
  return data.options.length === 4;
}, {
  message: "Myth vs Facts must have exactly ['Myth', 'Fact'] options and general MCQs must have 4 options",
  path: ["options"],
});

export type Question = z.infer<typeof QuestionSchema>;

export const QuizFilterSchema = z.object({
  mode: QuestionModeSchema,
  category: z.union([QuestionCategorySchema, z.literal("mixed")]),
  difficulty: z.union([QuestionDifficultySchema, z.literal("mixed")]),
  limit: z.number().int().min(5).max(20).default(10),
  instantFeedback: z.boolean().default(true),
  timed: z.boolean().default(false),
});

export type QuizFilter = z.infer<typeof QuizFilterSchema>;

export const SubmitAnswerSchema = z.object({
  attemptId: z.string().uuid(),
  questionId: z.string(),
  selectedAnswer: z.string().nullable(),
});

export const FinalizeQuizSchema = z.object({
  attemptId: z.string().uuid(),
  timeTakenSec: z.number().optional(),
});
