import { AppHeader } from "@/components/Navigation";
import { ActiveQuizPlayer } from "@/components/ActiveQuizPlayer";
import { getAuthenticatedUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function PlayQuizPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const user = await getAuthenticatedUser();
  const { attemptId } = await params;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <AppHeader user={user} />
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        <ActiveQuizPlayer attemptId={attemptId} />
      </main>
    </div>
  );
}
