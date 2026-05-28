import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { BarChart3, Locate, MapPin, Search, Star, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Local SEO Strategy | Rovult',
  description: 'Dominate your local search results, claim the Google Map Pack, and capture customers in your service areas.',
};

export default function SeoServicePage() {
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
          <div className="text-center mb-20 relative z-10">
            <span className="eyebrow mb-4">Core Capability</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: 'var(--display)', letterSpacing: '-0.04em' }}>
              Local SEO <br /><span style={{
                fontWeight: 300,
                fontStyle: 'normal',
                background: 'linear-gradient(180deg, var(--blue-300) 0%, var(--blue-500) 60%, var(--blue-700) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.045em'
              }} className="italic font-light">dominance.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
              If your phone isn&apos;t ringing, it&apos;s because your competitors are occupying the top spots of Google. We position your business where local searchers actually click.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 relative z-10">
            <div className="bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--display)' }}>Google Map Pack Optimization</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                We optimize your Google Business Profile (GBP) listing, categorize your services correctly, and update citations to push you into the top 3 spots.
              </p>
            </div>

            <div className="bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--display)' }}>Service-Area Landing Pages</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Rank in cities you don&apos;t physically have an office in. We build high-converting location pages targeting local search terms in adjacent suburbs.
              </p>
            </div>

            <div className="bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] mb-6">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--display)' }}>Review Strategy Integration</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Reviews are a primary ranking factor. We integrate automated pipelines that encourage satisfied customers to leave 5-star Google reviews.
              </p>
            </div>
          </div>

          {/* Detailed Features */}
          <div className="bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl mb-20 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center" style={{ fontFamily: 'var(--display)' }}>Our local SEO playbook</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="text-[#38bdf8] shrink-0"><Search className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Intent-Driven Keyword Research</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">We don&apos;t just target generic terms. We pinpoint highly specific search queries that local buyers use when they are ready to call and book a job immediately.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#38bdf8] shrink-0"><Locate className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Local Schema Markup</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">We inject microdata tags (JSON-LD schemas) into your code so search engines understand your specific service regions, operating hours, and business type.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#38bdf8] shrink-0"><BarChart3 className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Consistent NAP Citations</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">Mismatching Name, Address, and Phone data confuses search crawlers. We audit and align all direct directory listings to build search authority.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#38bdf8] shrink-0"><Target className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Competitor Analysis Gap</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">We reverse-engineer why your top local competitors are outranking you, finding their backlink sources and keyword gaps, then out-ranking them.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="bg-[#0c0d12]/60 border border-white/5 rounded-3xl p-8 md:p-12 mb-20 text-center relative z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <span className="text-4xl text-neutral-600 block mb-6 font-serif">“</span>
            <p className="text-xl md:text-2xl text-neutral-200 font-medium italic mb-8 max-w-3xl mx-auto leading-relaxed">
              “As Lexington’s largest furniture outlet, we needed a site that drives foot traffic to our showroom and handles 24/7 web orders. Rovult delivered exactly that and dominated our local search results.”
            </p>
            <div className="font-heading font-semibold text-white">John Fothergill</div>
            <div className="text-neutral-500 text-xs mt-1">Founder &amp; President · Lexington Overstock Warehouse · Lexington, KY</div>
          </div>

          {/* CTA */}
          <div className="text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--display)' }}>Dominate your local market</h2>
            <p className="text-neutral-400 max-w-xl mx-auto mb-8">
              Stop letting competitors take your leads. Let us implement a structured, data-driven local SEO campaign.
            </p>
            <Link href="/start" className="btn-white py-4 px-8 rounded-full font-bold inline-flex items-center gap-2 hover:bg-neutral-200 transition-colors">
              Start Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
