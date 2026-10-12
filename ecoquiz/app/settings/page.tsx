import { AppHeader } from "@/components/Navigation";
import { SignOutButton } from "@/components/SignOutButton";
import { getAuthenticatedUser } from "@/lib/auth";
import {
  Sliders,
  Bell,
  Eye,
  LogOut,
  Shield,
  Volume2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getAuthenticatedUser();

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <AppHeader user={user} />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Quiz & Account Preferences</h1>
          <p className="text-xs text-slate-400 mt-1">Configure your default learning and user interface settings.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Sliders className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Default Question Count</h3>
                <p className="text-xs text-slate-400">Choose standard length for newly initialized quizzes</p>
              </div>
            </div>
            <select className="bg-slate-800 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500">
              <option value="5">5 Questions</option>
              <option value="10" selected>10 Questions</option>
              <option value="15">15 Questions</option>
              <option value="20">20 Questions</option>
            </select>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Reduced Motion Mode</h3>
                <p className="text-xs text-slate-400">Minimize sliding effects and transitions across all quiz cards</p>
              </div>
            </div>
            <input type="checkbox" className="h-5 w-5 accent-emerald-500 cursor-pointer" />
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Authentication Status</h3>
                <p className="text-xs text-slate-400">Google OAuth Single Sign-On active</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20">
              Google Verified
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400">
                <LogOut className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Sign Out</h3>
                <p className="text-xs text-slate-400">Log out of your E-Waste IQ session</p>
              </div>
            </div>
            <SignOutButton />
          </div>
        </div>
      </main>
    </div>
  );
}
