import { redirect } from "next/navigation";
import { Trophy } from "lucide-react";
import { AppHeader } from "@/components/Navigation";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type LeaderboardEntry = {
  userId: string;
  displayName: string;
  bestPercentage: number;
  correctAnswers: number;
  totalQuestions: number;
  quizMode: string;
  category: string;
};

function formatLabel(value: string) {
  return value.replace(/_/g, " ");
}

async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const attempts = await prisma.quizAttempt.findMany({
    where: { completed: true },
    select: {
      userId: true,
      scorePercentage: true,
      correctAnswers: true,
      totalQuestions: true,
      quizMode: true,
      category: true,
      completedAt: true,
      id: true,
      user: {
        select: {
          supabaseId: true,
          name: true,
        },
      },
    },
    orderBy: [
      { scorePercentage: "desc" },
      { correctAnswers: "desc" },
      { completedAt: "asc" },
      { id: "asc" },
    ],
  });

  const bestByUser = new Map<string, LeaderboardEntry>();

  for (const attempt of attempts) {
    if (bestByUser.has(attempt.userId)) continue;

    bestByUser.set(attempt.userId, {
      userId: attempt.user.supabaseId,
      displayName: attempt.user.name || "Eco Champion",
      bestPercentage: attempt.scorePercentage,
      correctAnswers: attempt.correctAnswers,
      totalQuestions: attempt.totalQuestions,
      quizMode: attempt.quizMode,
      category: attempt.category,
    });
  }

  return Array.from(bestByUser.values()).sort((first, second) => {
    if (second.bestPercentage !== first.bestPercentage) {
      return second.bestPercentage - first.bestPercentage;
    }
    if (second.correctAnswers !== first.correctAnswers) {
      return second.correctAnswers - first.correctAnswers;
    }
    return first.userId.localeCompare(second.userId);
  });
}

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) redirect("/sign-in");

  let entries: LeaderboardEntry[] = [];
  let loadError = false;

  try {
    entries = await getLeaderboard();
  } catch (error) {
    console.error("Leaderboard load error:", error);
    loadError = true;
  }

  const currentUserRank = entries.findIndex((entry) => entry.userId === authUser.id) + 1;
  const displayName =
    authUser.user_metadata?.full_name ||
    authUser.user_metadata?.name ||
    "Eco Champion";

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100">
      <AppHeader
        user={{
          supabaseId: authUser.id,
          name: displayName,
          avatarUrl: authUser.user_metadata?.avatar_url || null,
        }}
      />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 pb-24 sm:px-6 md:pb-8">
        <div className="mb-8 flex items-start gap-4 border-b border-white/10 pb-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">All-time rankings</p>
            <h1 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">E-Waste IQ Leaderboard</h1>
            <p className="mt-1 text-sm text-slate-400">Your best completed quiz attempt earns your place.</p>
          </div>
        </div>

        {loadError ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-8 text-center">
            <h2 className="font-semibold text-rose-200">Leaderboard unavailable</h2>
            <p className="mt-2 text-sm text-rose-300/80">We could not load rankings right now. Please try again shortly.</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-10 text-center">
            <Trophy className="mx-auto h-10 w-10 text-slate-600" />
            <h2 className="mt-4 font-semibold text-white">No completed quizzes yet</h2>
            <p className="mt-2 text-sm text-slate-400">Complete a quiz to claim the first spot.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50">
            {currentUserRank > 0 && (
              <div className="border-b border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 sm:px-6">
                You are ranked <strong>#{currentUserRank}</strong>.
              </div>
            )}
            <div className="hidden grid-cols-[4rem_minmax(0,1fr)_7rem_8rem_12rem] gap-4 border-b border-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:grid">
              <span>Rank</span><span>Player</span><span>Score</span><span>Correct</span><span>Mode / Category</span>
            </div>
            <div className="divide-y divide-white/5">
              {entries.map((entry, index) => {
                const isCurrentUser = entry.userId === authUser.id;
                return (
                  <div key={entry.userId} className={`grid gap-2 px-4 py-4 sm:grid-cols-[4rem_minmax(0,1fr)_7rem_8rem_12rem] sm:items-center sm:gap-4 sm:px-6 ${isCurrentUser ? "bg-emerald-500/10" : ""}`}>
                    <span className="text-lg font-bold text-amber-400">#{index + 1}</span>
                    <span className="truncate font-semibold text-white">{entry.displayName}{isCurrentUser && <span className="ml-2 text-xs font-medium text-emerald-400">(You)</span>}</span>
                    <span className="text-lg font-extrabold text-emerald-400">{Math.round(entry.bestPercentage)}%</span>
                    <span className="text-sm text-slate-300">{entry.correctAnswers}/{entry.totalQuestions}</span>
                    <span className="text-xs capitalize text-slate-400">{formatLabel(entry.quizMode)} / {formatLabel(entry.category)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}