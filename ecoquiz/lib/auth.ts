import { createClient } from "@/lib/supabase/server";
import { prisma } from "./db";

export interface AppUser {
  supabaseId: string;
  name: string | null;
  avatarUrl: string | null;
  email?: string | null;
  dbId?: string;
}

/**
 * Gets the authenticated user via Supabase SSR auth.
 * Gracefully provides a dev user fallback if running without active browser session in local test.
 */
export async function getAuthenticatedUser(): Promise<AppUser | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const name =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Eco Champion";
      const avatarUrl =
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        null;

      return {
        supabaseId: user.id,
        name,
        avatarUrl,
        email: user.email || null,
      };
    }
  } catch (err) {
    console.error("Supabase user resolution error:", err);
  }

  // Development fallback so offline scripts and seeders function smoothly
  if (process.env.NODE_ENV === "development") {
    return {
      supabaseId: "demo-user-101",
      name: "Eco Champion (Dev User)",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80",
      email: "demo@ecoquiz.dev",
    };
  }

  return null;
}

/**
 * Ensures user profile exists in Supabase PostgreSQL via Prisma
 */
export async function ensureDbUser(appUser: AppUser) {
  try {
    const profile = await prisma.userProfile.upsert({
      where: { supabaseId: appUser.supabaseId },
      update: {
        name: appUser.name,
        avatarUrl: appUser.avatarUrl,
        email: appUser.email,
      },
      create: {
        supabaseId: appUser.supabaseId,
        name: appUser.name,
        avatarUrl: appUser.avatarUrl,
        email: appUser.email,
      },
    });
    return profile;
  } catch (err) {
    console.error("Database user upsert error:", err);
    // Return resilient fallback object
    return {
      id: "local-" + appUser.supabaseId,
      supabaseId: appUser.supabaseId,
      name: appUser.name,
      avatarUrl: appUser.avatarUrl,
      email: appUser.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
