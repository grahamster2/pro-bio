import type { Metadata } from "next";
import { Inter, Oswald, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL('https://rovult.com'),
  title: {
    template: '%s | Rovult',
    default: 'Rovult | The Heavy-Duty Website Builder for Tradesmen',
  },
  description: 'Stop losing jobs to guys who just have better websites. Build a high-converting, mobile-first profile in 3 minutes. Perfect for plumbers, electricians, and contractors.',
  keywords: ['contractor website', 'tradesman software', 'plumber website', 'electrician website', 'link in bio for contractors', 'Rovult'],
  authors: [{ name: 'Rovult' }],
  creator: 'Rovult',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rovult.com',
    title: 'Rovult | The Website for Blue-Collar Pros',
    description: 'Build a heavy-duty, mobile-first profile ready while sitting in your truck. Earn more high-paying leads.',
    siteName: 'Rovult',
    images: [{
      url: '/og-image.png', // Fallback global image
      width: 1200,
      height: 630,
      alt: 'Rovult - Contractor Websites',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rovult | The Website for Blue-Collar Pros',
    description: 'Build a heavy-duty, mobile-first profile ready while sitting in your truck.',
    creator: '@rovult',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
