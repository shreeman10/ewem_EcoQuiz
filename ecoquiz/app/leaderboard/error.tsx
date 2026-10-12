"use client";

export default function LeaderboardError({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090d16] px-4 text-center text-slate-100">
      <div>
        <h1 className="text-xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-slate-400">The leaderboard could not be displayed.</p>
        <button type="button" onClick={reset} className="mt-5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400">
          Try again
        </button>
      </div>
    </div>
  );
}