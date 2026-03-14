import type { Metadata, Viewport } from "next";
import { Inter, Oswald, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from "@vercel/analytics/next";
import AddToHomeScreen from "@/components/AddToHomeScreen";
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#f59e0b',
}

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
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Rovult',
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icon-120.png', sizes: '120x120', type: 'image/png' },
      { url: '/icon-152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icon-167.png', sizes: '167x167', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rovult.com',
    title: 'Rovult | The Website for Blue-Collar Pros',
    description: 'Build a heavy-duty, mobile-first profile ready while sitting in your truck. Earn more high-paying leads.',
    siteName: 'Rovult',
    images: [{
      url: '/og-image.png',
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
          <AddToHomeScreen />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
