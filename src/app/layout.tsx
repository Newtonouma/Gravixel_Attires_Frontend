import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gravixel Attires | Smart Tailoring & Suits",
  description:
    "Gravixel Attires: Premium suits, smart tailoring, and personalized perfection. Discover elegant, data-driven fits and bespoke craftsmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          `${geistSans.variable} ${geistMono.variable} antialiased bg-[#e5d7cb] text-[#161b29] font-sans` +
          " min-h-screen"
        }
        style={{
          fontFamily:
            "'Geist', 'Arial Unicode MS', Arial, 'Playfair Display', serif, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
