import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RideOut — Motorcycle Ride Planner",
  description: "Discover curated motorcycle destinations and AI-powered ride suggestions for Philippine riders.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RideOut",
  },
};

export const viewport: Viewport = {
  themeColor: "#F97316",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="h-full antialiased bg-ride-bg text-ride-text">
        {children}
      </body>
    </html>
  );
}
