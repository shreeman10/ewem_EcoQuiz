export default function LeaderboardLoading() {
  return (
    <div className="min-h-screen bg-[#090d16] px-4 py-8 text-slate-400 sm:px-6">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-10 w-72 rounded-lg bg-slate-800" />
        <div className="mt-8 h-16 rounded-2xl bg-slate-900" />
        <div className="mt-4 h-20 rounded-xl bg-slate-900" />
      </div>
    </div>
  );
}