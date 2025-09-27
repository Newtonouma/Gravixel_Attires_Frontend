import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import "./auth/auth.css";

const inter = Inter({
  variable: "--font-inter",
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
      <head>
        <link rel="icon" href="/Logo.jpg" type="image/jpeg" />
        <meta name="google-site-verification" content="rZ5Uawo7OmqulaX7DMwDkd46iCYFlRNKMzo78XqNRhg" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        style={{
          fontFamily: "'Jost', 'Arial Unicode MS', Arial, sans-serif",
          backgroundColor: '#ffffff',
          color: '#312f2f',
          lineHeight: '1.6',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      >
        <AuthProvider>
          <CartProvider>
            <Navigation />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
