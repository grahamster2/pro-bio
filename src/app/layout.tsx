import type { Metadata, Viewport } from "next";
import { Inter, Oswald, Geist_Mono, Geist, Bricolage_Grotesque, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
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
    default: 'Rovult | Website Builder for Plumbers, Electricians & Contractors',
  },
  description: 'Build a professional website for your contracting business in 3 minutes. The #1 website builder for plumbers, electricians, HVAC technicians, and tradesmen. Get more leads, rank higher in local searches, and win bigger jobs.',
  keywords: [
    'contractor website builder',
    'plumber website',
    'electrician website',
    'HVAC website builder',
    'tradesman website',
    'general contractor website',
    'handyman website',
    'roofer website',
    'mechanic website',
    'landscaping website',
    'local SEO for contractors',
    'mobile website for trades',
    'contractor marketing',
    'tradesman digital presence',
    'link in bio for contractors',
    'professional contractor website',
    'small business website builder',
    'service business website',
    'trade professional website',
    'contractor online presence',
    'Rovult'
  ],
  authors: [{ name: 'Rovult' }],
  creator: 'Rovult',
  publisher: 'Rovult',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rovult.com',
    title: 'Rovult | Website Builder for Plumbers, Electricians & Contractors',
    description: 'Build a professional website for your contracting business in 3 minutes. The #1 website builder for tradesmen and service professionals.',
    siteName: 'Rovult',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rovult - Website Builder for Contractors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rovult | Website Builder for Plumbers, Electricians & Contractors',
    description: 'Build a professional website for your contracting business in 3 minutes. Get more leads and bigger jobs.',
    images: ['/og-image.png'],
    creator: '@rovult',
  },
  alternates: {
    canonical: 'https://rovult.com',
  },
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
  other: {
    'business:contact_data:street_address': '',
    'business:contact_data:locality': 'Lexington',
    'business:contact_data:region': 'KY',
    'business:contact_data:postal_code': '',
    'business:contact_data:country_name': 'United States',
    'business:contact_data:email': 'hello@rovult.com',
    'business:contact_data:phone_number': '(859) 312-8778',
    'business:contact_data:website': 'https://rovult.com',
    'business:type': 'ProfessionalService',
    'business:service_type': 'Website Builder',
    'business:category': 'Technology',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body
        className={`${inter.variable} ${oswald.variable} ${geistMono.variable} ${bricolage.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased font-sans bg-zinc-950 text-slate-100`}
      >
        {children}
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-96P2FPQT7H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-96P2FPQT7H');
          `}
        </Script>
      </body>
    </html>
  );
}
