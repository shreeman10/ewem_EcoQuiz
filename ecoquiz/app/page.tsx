import Link from "next/link";
import { AppHeader } from "@/components/Navigation";
import { getAuthenticatedUser } from "@/lib/auth";
import {
  Brain,
  Recycle,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Cpu,
  Leaf,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Award,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const user = await getAuthenticatedUser();

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <AppHeader user={user} />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-16 sm:py-24 border-b border-white/5">
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Certified Educational Platform</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.15]">
              Think Smart. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                Dispose Right.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Every year, over 50 million metric tons of e-waste are discarded improperly. Master responsible electronics disposal, debunk toxic myths, and build lifelong eco-habits through interactive quizzes.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={user ? "/quiz" : "/sign-in"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Quiz Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/quiz"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-7 py-3.5 text-base font-semibold text-slate-200 transition hover:bg-slate-800/80 hover:text-white"
              >
                Explore Modes
              </Link>
            </div>
          </div>
        </section>

        {/* Two Primary Quiz Modes Cards */}
        <section className="py-16 mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Two Distinct Quiz Modes</h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">Designed for experiential awareness and deep practical retention.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mode 1: Myth vs Facts */}
            <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/40 transition">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    400 Questions
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Mode 1: Myth vs Facts</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Challenge common urban legends about battery safety, data erasing myths, microwave disposal, and the real hazards of municipal trash compactors.
                </p>
                <div className="mt-5 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Instant debunking & factual clarity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Real-world hazardous scenario classification</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5">
                <Link
                  href="/quiz?mode=myth_vs_facts"
                  className="flex items-center justify-between w-full font-semibold text-sm text-emerald-400 hover:text-emerald-300 group"
                >
                  <span>Play Myth vs Facts</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </div>

            {/* Mode 2: General MCQ */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/40 transition">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <Brain className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-800/40">
                    600 Questions
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Mode 2: General MCQ Quiz</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Multi-choice questions across three specialized categories: General Principles, Device-Specific Hardware, and Environmental Impact & Toxicology.
                </p>
                <div className="mt-5 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-400" />
                    <span>3 distinct categories with 4 options each</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-400" />
                    <span>Customizable lengths (5, 10, 15, or 20 questions)</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5">
                <Link
                  href="/quiz?mode=general"
                  className="flex items-center justify-between w-full font-semibold text-sm text-emerald-400 hover:text-emerald-300 group"
                >
                  <span>Configure MCQ Quiz</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Categories Preview */}
        <section className="py-12 border-t border-white/5 bg-slate-950/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center sm:text-left">
              Explore Our Three Core MCQ Pillars
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl border border-white/5 bg-slate-900/40">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-3">
                  <Recycle className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-white text-base">General Knowledge</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Circular economy, WEEE directives, certified e-Stewards recyclers, and consumer rights.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-white/5 bg-slate-900/40">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-3">
                  <Smartphone className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-white text-base">Device-Based</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Lithium batteries, CRT monitors, enterprise server sanitization, printers, and solar panels.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-white/5 bg-slate-900/40">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-3">
                  <Leaf className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-white text-base">Environmental Impact</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Lead and mercury leaching, bioaccumulation, conflict minerals (3TG), and carbon footprints.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-[#070a10]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Recycle className="h-4 w-4 text-emerald-500" />
            <span className="font-medium text-slate-400">E-Waste IQ</span> — Think Smart. Dispose Right.
          </div>
          <div className="flex gap-6">
            <Link href="/quiz" className="hover:text-slate-300">Quizzes</Link>
            <Link href="/dashboard" className="hover:text-slate-300">Dashboard</Link>
            <Link href="/settings" className="hover:text-slate-300">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
