import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          fontFamily: "'Jost', 'Arial Unicode MS', Arial, sans-serif",
          backgroundColor: '#ffffff',
          color: '#312f2f',
          lineHeight: '1.6',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
