import Link from "next/link";
import { AppHeader } from "@/components/Navigation";
import { getAuthenticatedUser } from "@/lib/auth";
import { getUserStatistics } from "@/lib/actions";
import { HistoryScoreChart } from "@/components/HistoryScoreChart";
import { SignOutButton } from "@/components/SignOutButton";
import {
  User,
  Mail,
  Award,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Brain,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getAuthenticatedUser();
  const stats = await getUserStatistics();

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <AppHeader user={user} />

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 space-y-8">
        {/* User Profile Card */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"}
            alt={user?.name || "Avatar"}
            className="h-24 w-24 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-xl shadow-emerald-500/10"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl font-bold text-white">{user?.name || "Eco Champion"}</h1>
              <span className="inline-flex items-center gap-1 w-fit mx-auto sm:mx-0 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <Sparkles className="h-3 w-3" /> Certified Member
              </span>
            </div>

            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <span>{user?.email || "Signed in with Google"}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-500" />
                <span>Active Member</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                <span>{stats?.totalQuizzes || 0} Quizzes Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges and Achievements */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 space-y-4">
          <h2 className="text-base font-bold text-white">Earned Badges & Milestones</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                title: "Recycling Rookie",
                desc: "Complete your first quiz",
                earned: (stats?.totalQuizzes || 0) >= 1,
              },
              {
                title: "Myth Buster",
                desc: "Complete a Myth vs Facts run",
                earned: (stats?.recentAttempts?.some((a: any) => a.quizMode === "myth_vs_facts") || false),
              },
              {
                title: "Eco Expert",
                desc: "Achieve a score of 80%+",
                earned: (stats?.bestScore || 0) >= 80,
              },
              {
                title: "Daily Champion",
                desc: "Maintain a 1+ day streak",
                earned: (stats?.currentStreak || 0) >= 1,
              },
            ].map((badge, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border text-center transition ${
                  badge.earned
                    ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                    : "border-white/5 bg-slate-900/40 text-slate-500 opacity-50"
                }`}
              >
                <Award className={`h-6 w-6 mx-auto mb-2 ${badge.earned ? "text-amber-400" : "text-slate-600"}`} />
                <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1">{badge.desc}</p>
                <div className="mt-2 text-[10px] font-semibold">
                  {badge.earned ? "✓ Unlocked" : "Locked"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Graph */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6">
          <h2 className="text-base font-bold text-white mb-2">Performance History Over Time</h2>
          <p className="text-xs text-slate-400 mb-4">Tracking your percentage accuracy across completed sessions.</p>
          <HistoryScoreChart data={stats?.historyChartData || []} />
        </div>

        {/* Detailed Attempts Table / Mobile Cards */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6">
          <h2 className="text-base font-bold text-white mb-4">Full Quiz Attempt History</h2>

          {stats?.recentAttempts && stats.recentAttempts.length > 0 ? (
            <div className="space-y-3">
              {stats.recentAttempts.map((att: any) => (
                <div
                  key={att.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-900/80 hover:bg-slate-800/40 transition gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                      {att.quizMode === "myth_vs_facts" ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <Brain className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white capitalize">
                        {att.quizMode.replace(/_/g, " ")}
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(att.createdAt).toLocaleDateString()} • {att.category.replace(/_/g, " ")} • {att.totalQuestions} questions
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-sm font-extrabold text-emerald-400">
                      {att.scorePercentage}%
                    </span>
                    <Link
                      href={`/quiz/results/${att.id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-slate-800/80 text-slate-300 hover:text-white"
                    >
                      Review Answers
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">
              No historical quiz attempts to display yet.
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-rose-500/20 bg-rose-950/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Sign out of EcoQuiz</h2>
            <p className="mt-1 text-xs text-slate-400">End your current quiz session on this device.</p>
          </div>
          <SignOutButton className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-500/30 px-4 py-2 text-xs font-bold text-rose-300 transition hover:bg-rose-500/20" />
        </div>
      </main>
    </div>
  );
}
