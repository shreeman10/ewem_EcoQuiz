import { AppHeader } from "@/components/Navigation";
import { QuizSetup } from "@/components/QuizSetup";
import { getAuthenticatedUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function QuizSelectionPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const user = await getAuthenticatedUser();
  const resolvedParams = await searchParams;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <AppHeader user={user} />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Quiz Configuration</h1>
          <p className="text-slate-400 text-sm mt-1">
            Customize your questions, category focus, and test parameters.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-sm">
          <QuizSetup initialMode={resolvedParams.mode} />
        </div>
      </main>
    </div>
  );
}
