import Link from "next/link";
import { AppHeader } from "@/components/Navigation";
import { getAuthenticatedUser } from "@/lib/auth";
import { getUserStatistics } from "@/lib/actions";
import {
  Brain,
  Trophy,
  Flame,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();
  const stats = await getUserStatistics();

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <AppHeader user={user} />

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Personal Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Welcome back, {user?.name?.split(" ")[0] || "Eco Champion"}!
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Track your environmental learning journey, strengths, and quiz milestones.
            </p>
          </div>

          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-emerald-500/20 hover:bg-emerald-400 transition"
          >
            <Play className="h-4 w-4 fill-current" />
            Start New Quiz
          </Link>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Total Quizzes</span>
              <Brain className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
              {stats?.totalQuizzes || 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Attempts recorded</div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Average Score</span>
              <BarChart3 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {stats?.averageScore ? `${stats.averageScore}%` : "—"}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Across all categories</div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Best Score</span>
              <Trophy className="h-4 w-4 text-amber-400" />
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
              {stats?.bestScore ? `${stats.bestScore}%` : "—"}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Peak performance</div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Active Streak</span>
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
              {stats?.currentStreak || 0} <span className="text-sm font-normal text-slate-400">days</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Daily consistency</div>
          </div>
        </div>

        {/* Quick Quiz Launchers */}
        <div className="my-8">
          <h2 className="text-lg font-bold text-white mb-4">Choose a Mode to Play</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/quiz?mode=myth_vs_facts"
              className="p-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-slate-900/60 to-slate-900/80 hover:border-emerald-500/40 transition flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-semibold">Mode 1</span>
                </div>
                <h3 className="font-bold text-white text-base sm:text-lg">Myth vs Facts</h3>
                <p className="text-xs text-slate-400 mt-1">Fast 2-choice myth-busting with instant scientific insights.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-emerald-400 group-hover:translate-x-1 transition ml-4 shrink-0" />
            </Link>

            <Link
              href="/quiz?mode=general"
              className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 hover:border-emerald-500/40 transition flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 text-teal-400 mb-1">
                  <Brain className="h-4 w-4" />
                  <span className="text-xs font-semibold">Mode 2</span>
                </div>
                <h3 className="font-bold text-white text-base sm:text-lg">General MCQ Quiz</h3>
                <p className="text-xs text-slate-400 mt-1">Deep dive across General, Device-Based, and Environmental topics.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-teal-400 group-hover:translate-x-1 transition ml-4 shrink-0" />
            </Link>
          </div>
        </div>

        {/* Recent Attempts and Activity */}
        <div className="my-8 rounded-2xl border border-white/5 bg-slate-900/40 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Recent Quiz Attempts</h2>
            <Link href="/profile" className="text-xs font-medium text-emerald-400 hover:underline">
              View all history →
            </Link>
          </div>

          {stats?.recentAttempts && stats.recentAttempts.length > 0 ? (
            <div className="space-y-3">
              {stats.recentAttempts.slice(0, 5).map((attempt: any) => (
                <div
                  key={attempt.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-white/5 bg-slate-900/70 hover:bg-slate-800/40 transition gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      {attempt.quizMode === "myth_vs_facts" ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <Brain className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white capitalize">
                        {attempt.quizMode.replace(/_/g, " ")} • {attempt.category.replace(/_/g, " ")}
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(attempt.createdAt).toLocaleDateString()} • {attempt.totalQuestions} questions
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className={`text-sm font-bold ${
                      attempt.scorePercentage >= 80 ? "text-emerald-400" : attempt.scorePercentage >= 60 ? "text-amber-400" : "text-rose-400"
                    }`}>
                      {attempt.scorePercentage}%
                    </span>
                    <Link
                      href={`/quiz/results/${attempt.id}`}
                      className="text-xs font-medium text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-white/10 bg-slate-800/60"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Sparkles className="h-8 w-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No quizzes completed yet.</p>
              <p className="text-xs text-slate-500 mt-1">Start your first quiz above to track your scores and streaks!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
