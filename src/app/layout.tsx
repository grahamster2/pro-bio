import type { Metadata } from "next";
import { Inter, Oswald, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProBio",
  description: "The Website for Pros who Hate Websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} ${oswald.variable} ${geistMono.variable} antialiased font-sans bg-zinc-950 text-slate-100`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
