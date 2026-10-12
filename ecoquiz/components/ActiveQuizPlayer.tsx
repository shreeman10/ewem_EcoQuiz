"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submitQuestionAnswer, finalizeQuizAttempt } from "@/lib/actions";
import {
  Brain,
  Timer,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  LogOut,
  Sparkles,
} from "lucide-react";

interface PlayQuestion {
  id: string;
  question: string;
  options: string[];
  category: string;
  difficulty: string;
  correctAnswer?: string;
  explanation?: string;
}

export function ActiveQuizPlayer({ attemptId }: { attemptId: string }) {
  const router = useRouter();

  const [session, setSession] = useState<{
    attemptId: string;
    questions: PlayQuestion[];
    instantFeedback: boolean;
    timed: boolean;
    totalQuestions: number;
  } | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [answerResults, setAnswerResults] = useState<
    Record<string, { isCorrect: boolean; correctAnswer: string; explanation: string }>
  >({});
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Hydrate quiz session from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(`quiz_session_${attemptId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSession(parsed);
        } catch {}
      }
    }
  }, [attemptId]);

  // Timer countdown logic
  useEffect(() => {
    if (!session?.timed) return;

    setTimeLeft(30);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired for this question, auto skip/proceed
          handleOptionSelect(null);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, session?.timed]);

  if (!session) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-400">
        <div className="text-center">
          <Sparkles className="h-8 w-8 text-emerald-400 animate-spin mx-auto mb-3" />
          <p className="text-sm">Loading quiz session...</p>
        </div>
      </div>
    );
  }

  const currentQ = session.questions[currentIndex];
  const isLastQuestion = currentIndex === session.questions.length - 1;
  const currentAnswered = selectedAnswers[currentQ?.id] !== undefined;
  const currentResult = answerResults[currentQ?.id];

  const handleOptionSelect = async (opt: string | null) => {
    if (currentAnswered || isSubmitting) return;

    setIsSubmitting(true);
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: opt || "" }));

    try {
      const result = await submitQuestionAnswer({
        attemptId,
        questionId: currentQ.id,
        selectedAnswer: opt,
      });

      setAnswerResults((prev) => ({
        ...prev,
        [currentQ.id]: {
          isCorrect: result.isCorrect,
          correctAnswer: result.correctAnswer,
          explanation: result.explanation,
        },
      }));
    } catch (err) {
      console.error("Answer submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinalize();
    }
  };

  const handleFinalize = async () => {
    setIsSubmitting(true);
    try {
      await finalizeQuizAttempt({ attemptId });
      router.push(`/quiz/results/${attemptId}`);
    } catch (err) {
      console.error("Finalization error:", err);
      router.push(`/quiz/results/${attemptId}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Question {currentIndex + 1} of {session.questions.length}
          </span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-400 capitalize">
            {currentQ.category.replace(/_/g, " ")}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {session.timed && (
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              timeLeft <= 5 ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse" : "bg-slate-800 text-slate-300"
            }`}>
              <Timer className="h-3.5 w-3.5" />
              <span>{timeLeft}s</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowExitModal(true)}
            className="text-slate-400 hover:text-rose-400 transition p-1"
            title="Quit Quiz"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / session.questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-md">
        <div className="mb-4">
          <span className="inline-block rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-400 capitalize border border-white/5">
            Difficulty: {currentQ.difficulty}
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
          {currentQ.question}
        </h2>

        {/* Options List */}
        <div className="mt-6 space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedAnswers[currentQ.id] === opt;
            const hasResult = currentResult !== undefined;
            const isCorrect = currentResult?.correctAnswer === opt;
            const isWrongSelected = hasResult && isSelected && !isCorrect;

            let buttonStyle = "border-white/10 bg-slate-800/40 hover:border-emerald-500/40 text-slate-200";

            if (hasResult) {
              if (isCorrect) {
                buttonStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-200 font-semibold";
              } else if (isWrongSelected) {
                buttonStyle = "border-rose-500 bg-rose-500/20 text-rose-200";
              } else {
                buttonStyle = "border-white/5 bg-slate-900/30 text-slate-500 opacity-60";
              }
            } else if (isSelected) {
              buttonStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-300";
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={currentAnswered || isSubmitting}
                onClick={() => handleOptionSelect(opt)}
                className={`w-full p-4 rounded-xl border text-left text-sm transition flex items-center justify-between gap-3 ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-slate-300">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {hasResult && isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                )}
                {hasResult && isWrongSelected && (
                  <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Feedback Educational Insight Box */}
        {currentResult && (
          <div className="mt-6 rounded-xl border border-white/10 bg-slate-950/60 p-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2 mb-1.5 font-semibold text-xs">
              {currentResult.isCorrect ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Correct Answer!
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1">
                  <XCircle className="h-4 w-4" /> Incorrect
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentResult.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => handleOptionSelect(null)}
          disabled={currentAnswered || isSubmitting}
          className="text-xs text-slate-400 hover:text-white px-3 py-2 disabled:opacity-30"
        >
          Skip Question
        </button>

        {currentAnswered && (
          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition"
          >
            <span>{isLastQuestion ? "Finish Quiz & View Results" : "Next Question"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Confirm Exit Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Leave Active Quiz?</h3>
            <p className="text-xs text-slate-400">
              Your current progress in this session will not be saved if you abandon the quiz before finishing.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg bg-slate-800"
              >
                Continue Quiz
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 rounded-lg border border-rose-500/30"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
