"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Recycle, LayoutDashboard, Brain, User, Settings, LogOut } from "lucide-react";

export function AppHeader({ user }: { user?: any }) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/quiz", label: "Quiz Modes", icon: Brain },
    { href: "/profile", label: "My Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090d16]/85 backdrop-blur-md">
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
            <Link
              href="/profile"
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-900/80 p-1 pr-3 hover:border-emerald-500/40 transition"
            >
              <img
                src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&auto=format&fit=crop&q=80"}
                alt={user.name || "User"}
                className="h-7 w-7 rounded-full object-cover ring-1 ring-emerald-500/50"
              />
              <span className="hidden text-xs font-medium text-slate-200 sm:inline max-w-[120px] truncate">
                {user.name || "Eco Learner"}
              </span>
            </Link>
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

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/quiz", label: "Quiz", icon: Brain },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#090d16]/95 py-2 px-3 backdrop-blur-lg md:hidden safe-area-pb">
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
