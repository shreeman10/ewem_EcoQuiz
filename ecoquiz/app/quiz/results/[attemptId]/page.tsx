import Link from "next/link";
import { AppHeader } from "@/components/Navigation";
import { getAuthenticatedUser } from "@/lib/auth";
import { getAttemptResults } from "@/lib/actions";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  LayoutDashboard,
  Brain,
  AlertTriangle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function QuizResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const user = await getAuthenticatedUser();
  const { attemptId } = await params;

  let results: any = null;
  let errorMsg: string | null = null;

  try {
    results = await getAttemptResults(attemptId);
  } catch (err: any) {
    errorMsg = err.message || "Unable to load attempt results.";
  }

  if (errorMsg || !results) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
        <AppHeader user={user} />
        <main className="flex-1 mx-auto max-w-lg px-4 py-16 text-center">
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60">
            <h2 className="text-lg font-bold text-white mb-2">Quiz Results Not Found</h2>
            <p className="text-xs text-slate-400 mb-6">{errorMsg || "The requested attempt could not be retrieved."}</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400"
            >
              Return to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const score = results.scorePercentage;
  const isHigh = score >= 80;
  const isMid = score >= 60 && score < 80;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <AppHeader user={user} />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 space-y-8">
        {/* Results Banner Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-4 border border-emerald-500/20">
            <Trophy className="h-8 w-8" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {isHigh ? "Outstanding Eco Expertise!" : isMid ? "Great Effort!" : "Keep Practicing & Learning!"}
          </h1>

          <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
            You completed the <span className="text-emerald-400 capitalize">{results.quizMode.replace(/_/g, " ")}</span> quiz.
          </p>

          <div className="my-6">
            <span className={`text-5xl sm:text-6xl font-black ${
              isHigh ? "text-emerald-400" : isMid ? "text-amber-400" : "text-rose-400"
            }`}>
              {score}%
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto pt-4 border-t border-white/5">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="text-xs text-slate-400">Total</span>
              <div className="text-base font-bold text-white">{results.totalQuestions}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="text-xs text-slate-400">Correct</span>
              <div className="text-base font-bold text-emerald-400">{results.correctAnswers}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="text-xs text-slate-400">Incorrect</span>
              <div className="text-base font-bold text-rose-400">{results.incorrectAnswers}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="text-xs text-slate-400">Time</span>
              <div className="text-base font-bold text-white">{results.timeTakenSec}s</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition"
            >
              <RotateCcw className="h-4 w-4" />
              Try Another Quiz
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-300 hover:text-white transition"
            >
              <LayoutDashboard className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Question Review & Scientific Explanations</h2>

          <div className="space-y-4">
            {results.answers.map((item: any, idx: number) => {
              const correct = item.isCorrect;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border p-5 sm:p-6 transition ${
                    correct
                      ? "border-emerald-500/20 bg-slate-900/60"
                      : "border-rose-500/20 bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-semibold text-slate-400">
                      Question {idx + 1}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                      correct ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                    }`}>
                      {correct ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {correct ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  <p className="font-semibold text-white text-sm sm:text-base leading-snug">
                    {item.questionText}
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                      <span className="text-slate-400 block mb-0.5">Your Selected Answer:</span>
                      <span className={correct ? "text-emerald-300 font-semibold" : "text-rose-300 font-semibold"}>
                        {item.selectedAnswer || "Skipped"}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                      <span className="text-slate-400 block mb-0.5">Correct Answer:</span>
                      <span className="text-emerald-400 font-semibold">
                        {item.correctAnswer}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-emerald-400 block mb-1">Educational Insight:</span>
                    {item.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
