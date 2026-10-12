"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/sign-in");
      router.refresh();
    } catch {
      router.push("/sign-in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="px-4 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/20 rounded-xl border border-rose-500/30 transition cursor-pointer"
    >
      {loading ? "Signing Out..." : "Sign Out"}
    </button>
  );
}
