"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createQuizAttempt } from "@/lib/actions";
import {
  Brain,
  AlertTriangle,
  Play,
  Sliders,
  Timer,
  CheckCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export function QuizSetup({ initialMode }: { initialMode?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"myth_vs_facts" | "general">(
    initialMode === "myth_vs_facts" ? "myth_vs_facts" : "general"
  );
  const [category, setCategory] = useState<"general" | "device_based" | "environmental" | "mixed">("mixed");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "mixed">("mixed");
  const [limit, setLimit] = useState<number>(10);
  const [instantFeedback, setInstantFeedback] = useState<boolean>(true);
  const [timed, setTimed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await createQuizAttempt({
        mode,
        category,
        difficulty,
        limit,
        instantFeedback,
        timed,
      });

      // Store in sessionStorage for fast client hydration
      if (typeof window !== "undefined") {
        sessionStorage.setItem(`quiz_session_${result.attemptId}`, JSON.stringify(result));
      }

      router.push(`/quiz/play/${result.attemptId}`);
    } catch (err: any) {
      setError(err.message || "Failed to start quiz. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Quiz Mode Selector */}
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-3">
          1. Select Quiz Mode
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setMode("myth_vs_facts")}
            className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between ${
              mode === "myth_vs_facts"
                ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                : "border-white/10 bg-slate-900/60 hover:border-white/20"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Mode 1</span>
              </div>
              <h3 className="font-bold text-white text-base">Myth vs Facts</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                400 statements testing common misconceptions regarding data wiping, batteries, toxic leachates, and recycling.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-400">
              {mode === "myth_vs_facts" ? "Selected Mode" : "Select this mode"}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMode("general")}
            className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between ${
              mode === "general"
                ? "border-teal-500 bg-teal-500/10 shadow-lg shadow-teal-500/10"
                : "border-white/10 bg-slate-900/60 hover:border-white/20"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 text-teal-400 mb-2">
                <Brain className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Mode 2</span>
              </div>
              <h3 className="font-bold text-white text-base">General MCQ Quiz</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                600 multiple-choice questions across General Knowledge, Hardware & Devices, and Environmental Toxicology.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-teal-400">
              {mode === "general" ? "Selected Mode" : "Select this mode"}
            </div>
          </button>
        </div>
      </div>

      {/* Category selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-3">
          2. Category Focus
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: "mixed", label: "Mixed (All)" },
            { id: "general", label: "General Principles" },
            { id: "device_based", label: "Device-Specific" },
            { id: "environmental", label: "Environmental Impact" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id as any)}
              className={`p-3 rounded-xl border text-xs font-semibold transition ${
                category === cat.id
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                  : "border-white/10 bg-slate-900/60 text-slate-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-3">
          3. Difficulty Level
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: "mixed", label: "Balanced Mix" },
            { id: "easy", label: "Easy (Foundations)" },
            { id: "medium", label: "Medium (Applied)" },
            { id: "hard", label: "Hard (Expert)" },
          ].map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDifficulty(d.id as any)}
              className={`p-3 rounded-xl border text-xs font-semibold transition ${
                difficulty === d.id
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                  : "border-white/10 bg-slate-900/60 text-slate-400 hover:text-white"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question count */}
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-3">
          4. Number of Questions
        </label>
        <div className="grid grid-cols-4 gap-2.5">
          {[5, 10, 15, 20].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setLimit(num)}
              className={`p-3 rounded-xl border text-xs font-semibold transition ${
                limit === num
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                  : "border-white/10 bg-slate-900/60 text-slate-400 hover:text-white"
              }`}
            >
              {num} Questions
            </button>
          ))}
        </div>
      </div>

      {/* Experience preferences */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Instant Explanations</div>
            <div className="text-xs text-slate-400">Reveal correct answer and educational insight right after selecting</div>
          </div>
          <input
            type="checkbox"
            checked={instantFeedback}
            onChange={(e) => setInstantFeedback(e.target.checked)}
            className="h-5 w-5 accent-emerald-500 rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <div className="text-sm font-semibold text-white">Timed Challenge (30s per question)</div>
            <div className="text-xs text-slate-400">Adds an optional timer countdown for quick-thinking training</div>
          </div>
          <input
            type="checkbox"
            checked={timed}
            onChange={(e) => setTimed(e.target.checked)}
            className="h-5 w-5 accent-emerald-500 rounded cursor-pointer"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="button"
        disabled={loading}
        onClick={handleStartQuiz}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 text-base font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 disabled:opacity-50 transition"
      >
        {loading ? (
          <span>Generating Randomized Quiz...</span>
        ) : (
          <>
            <span>Launch Quiz ({limit} Questions)</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}
