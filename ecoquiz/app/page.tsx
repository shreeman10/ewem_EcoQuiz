import Link from "next/link";
import { AppHeader } from "@/components/Navigation";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <AppHeader landing />

      <main>
        <section className="relative flex h-screen w-full items-end justify-center overflow-hidden">
          <div className="absolute inset-0 scale-105 animate-[hero-in_1400ms_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 motion-reduce:animate-none motion-reduce:opacity-100">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_212700_3bb9329b-5c50-4257-a09b-ca85cf3654a3.mp4"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-6 pb-16 text-center md:pb-24">
            <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-emerald-200/90 opacity-0 [animation:hero-copy-in_900ms_250ms_cubic-bezier(0.16,1,0.3,1)_forwards] sm:text-xs">
              The e-waste knowledge quiz
            </p>
            <h1 className="font-instrument text-[2.5rem] leading-[0.95] opacity-0 [animation:hero-copy-in_900ms_400ms_cubic-bezier(0.16,1,0.3,1)_forwards] sm:text-5xl md:text-6xl lg:text-7xl">
              Step through the door
              <br className="hidden sm:block" />
              into a smarter future
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/80 opacity-0 [animation:hero-copy-in_900ms_600ms_cubic-bezier(0.16,1,0.3,1)_forwards] md:mt-6 md:text-lg">
              Test what you know about electronics, recycling, and the choices that shape a cleaner future.
            </p>
            <Link
              href="/sign-in"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black opacity-0 [animation:hero-copy-in_900ms_800ms_cubic-bezier(0.16,1,0.3,1)_forwards] transition hover:bg-emerald-300 md:mt-10 md:text-base"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
