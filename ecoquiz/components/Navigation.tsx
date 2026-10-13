"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Recycle, LayoutDashboard, Brain, User, Trophy } from "lucide-react";
import type { AppUser } from "@/lib/auth";
import { SignOutButton } from "@/components/SignOutButton";

export function AppHeader({ user, landing = false }: { user?: AppUser | null; landing?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    if (!landing && user) {
      const handlePageHide = () => {
        void fetch("/auth/sign-out", {
          method: "POST",
          credentials: "include",
          keepalive: true,
        });
      };

      window.addEventListener("pagehide", handlePageHide);
      return () => window.removeEventListener("pagehide", handlePageHide);
    }

    if (!landing) return;

    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [landing, user]);

  useEffect(() => {
    if (!accountOpen) return;

    const closeOnOutsideClick = () => setAccountOpen(false);
    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [accountOpen]);

  if (landing) {
    return (
      <header className={`fixed left-0 top-0 z-50 w-full transition duration-500 ${scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-10">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white md:text-2xl">
            EcoQuiz
          </Link>
          <Link
            href="/sign-in"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-black/25 transition hover:bg-emerald-300 hover:shadow-emerald-300/20 md:px-7 md:py-3 md:text-base"
          >
            Log In
          </Link>
        </div>
      </header>
    );
  }

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/quiz", label: "Quiz Modes", icon: Brain },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/profile", label: "My Profile", icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-y border-white/15 bg-[#111827]/80 shadow-[0_8px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/20">
            <Recycle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white">E-Waste <span className="text-emerald-400">IQ</span></span>
            <span className="hidden text-xs text-slate-400 sm:block">Think Smart. Dispose Right.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User avatar or Sign In */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                aria-label="Open account menu"
                onClick={() => setAccountOpen((open) => !open)}
                className="flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-900/80 p-1 pr-3 transition hover:border-emerald-500/40"
              >
                <img
                  src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&auto=format&fit=crop&q=80"}
                  alt={user.name || "User"}
                  className="h-7 w-7 rounded-full object-cover ring-1 ring-emerald-500/50"
                />
                <span className="hidden max-w-[120px] truncate text-xs font-medium text-slate-200 sm:inline">
                  {user.name || "Eco Learner"}
                </span>
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-12 z-50 min-w-44 rounded-xl border border-white/10 bg-slate-900 p-1.5 shadow-2xl" role="menu">
                  <Link
                    href="/profile"
                    role="menuitem"
                    onClick={() => setAccountOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                  >
                    Profile
                  </Link>
                  <div className="my-1 border-t border-white/10" />
                  <SignOutButton
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-300 transition hover:bg-rose-500/10"
                  />
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/quiz", label: "Quiz", icon: Brain },
    { href: "/leaderboard", label: "Ranks", icon: Trophy },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#090d16]/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-lg md:hidden">
      <div className="flex justify-around items-center">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-xl p-2 transition text-xs font-medium ${
                isActive ? "text-emerald-400" : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
