import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { Code2, Search, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services | Rovult',
  description: 'Everything you need to capture traffic, convert leads, and distribute your local service brand securely.',
};

export default function ServicesPage() {
  return (
    <div className="aurora-page min-h-screen flex flex-col bg-[#050507] text-[#f4f4f5] font-sans selection:bg-white selection:text-black">
      <div className="aurora">
        <div className="aurora-grain" />
        <div className="aurora-vignette" />
      </div>

      <Navigation />

      <main className="flex-1 pt-48 pb-24 relative z-10 w-full">
        <div className="narrow">
          <div className="contact-glow" />
          
          {/* Header */}
          <div className="text-center mb-16 relative z-10">
            <span className="eyebrow mb-4 font-mono text-xs">Our Offerings</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: 'var(--display)', letterSpacing: '-0.04em' }}>
              Engineered for <br /><span style={{
                fontWeight: 300,
                fontStyle: 'normal',
                background: 'linear-gradient(180deg, var(--blue-300) 0%, var(--blue-500) 60%, var(--blue-700) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.045em'
              }} className="italic font-light">local growth.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
              Everything you need to capture customer traffic, convert leads, and run your local service business online with zero technical friction.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-6 relative z-10">
            
            {/* Websites */}
            <Link href="/services/websites" className="group block bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl hover:border-white/15 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4 max-w-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-white group-hover:text-[#38bdf8] transition-colors" style={{ fontFamily: 'var(--display)' }}>
                    Web Design &amp; Strategy
                  </h2>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Custom-coded Next.js architectures optimized for conversion. Zero slow templates. Sub-second load speeds, professional copy, and secure layouts.
                  </p>
                </div>
                <div className="text-neutral-500 group-hover:text-white transition-colors text-2xl font-light font-mono shrink-0 hidden md:block">
                  →
                </div>
              </div>
            </Link>

            {/* SEO */}
            <Link href="/services/seo" className="group block bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl hover:border-white/15 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4 max-w-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
                    <Search className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-white group-hover:text-[#38bdf8] transition-colors" style={{ fontFamily: 'var(--display)' }}>
                    Local SEO Dominance
                  </h2>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Dominate local search lists, optimize your Google Maps profile, build consistent directory citations, and rank in surrounding service cities.
                  </p>
                </div>
                <div className="text-neutral-500 group-hover:text-white transition-colors text-2xl font-light font-mono shrink-0 hidden md:block">
                  →
                </div>
              </div>
            </Link>

            {/* Audits */}
            <Link href="/services/audits" className="group block bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl hover:border-white/15 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4 max-w-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-white group-hover:text-[#38bdf8] transition-colors" style={{ fontFamily: 'var(--display)' }}>
                    Website Audits &amp; Diagnostics
                  </h2>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Identify hidden issues. A comprehensive review of your current site&apos;s loading speeds, security gaps, layout flow, and search accessibility.
                  </p>
                </div>
                <div className="text-neutral-500 group-hover:text-white transition-colors text-2xl font-light font-mono shrink-0 hidden md:block">
                  →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
