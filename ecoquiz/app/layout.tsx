import type { Metadata } from "next";
import "./globals.css";
import { MobileNavigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "E-Waste IQ | Think Smart. Dispose Right.",
  description: "Interactive educational quiz platform to master responsible electronic waste recycling, debunk myths, and protect our environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased flex flex-col pb-16 md:pb-0">
        <div className="flex-1">
          {children}
        </div>
        <MobileNavigation />
      </body>
    </html>
  );
}
