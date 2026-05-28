import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ShieldCheck, Sparkles, TrendingUp, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Website Audits & Diagnostics | Rovult',
  description: 'Uncover the hidden performance, speed, and conversion blockers keeping your site from getting customer leads.',
};

export default function AuditsServicePage() {
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
              Deep technical <br /><span style={{
                fontWeight: 300,
                fontStyle: 'normal',
                background: 'linear-gradient(180deg, var(--blue-300) 0%, var(--blue-500) 60%, var(--blue-700) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.045em'
              }} className="italic font-light">audits.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
              We tear down your website's performance, code quality, and conversion flows to find out exactly why visitors are leaving without taking action.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 relative z-10">
            <div className="bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--display)' }}>Speed &amp; Core Web Vitals</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Slow sites kill sales. We audit asset loading, render-blocking scripts, and server response times to identify speed bottlenecks.
              </p>
            </div>

            <div className="bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--display)' }}>Conversion Rate &amp; UX</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                If your contact forms are too long or confusing, visitors leave. We audit visual hierarchy, form friction, and call-to-action layout.
              </p>
            </div>

            <div className="bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--display)' }}>SEO &amp; Crawlability</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                We crawl your site exactly like Google bot to identify broken links, redirect loops, crawl budget waste, and missing schema metadata.
              </p>
            </div>
          </div>

          {/* Detailed Features */}
          <div className="bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl mb-20 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center" style={{ fontFamily: 'var(--display)' }}>What you receive in our audit report</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="text-[#38bdf8] shrink-0"><Zap className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Performance Lighthouse Breakdown</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">A detailed analysis of Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP) with actionable steps to resolve them.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#38bdf8] shrink-0"><ShieldCheck className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Security &amp; Vulnerability Audit</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">Checking for outdated plugins, expired certificates, insecure API endpoints, or open ports that leave your site open to compromise.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#38bdf8] shrink-0"><TrendingUp className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">UI Friction &amp; Blocker Check</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">We pinpoint design flaws that disrupt the visitor's focus and fix complex layouts that make it hard to navigate on mobile devices.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#38bdf8] shrink-0"><Sparkles className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">SEO Authority and Backlink Audit</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">Reviewing search visibility, missing metadata, local keywords, and backlink health to benchmark your authority against direct local competitors.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="bg-[#0c0d12]/60 border border-white/5 rounded-3xl p-8 md:p-12 mb-20 text-center relative z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <span className="text-4xl text-neutral-600 block mb-6 font-serif">“</span>
            <p className="text-xl md:text-2xl text-neutral-200 font-medium italic mb-8 max-w-3xl mx-auto leading-relaxed">
              “The custom design and speed optimization are top-tier. Our photography link-in-bio platform looks incredible, and the load times are blazing fast. We recommend Rovult to everyone.”
            </p>
            <div className="font-heading font-semibold text-white">Maya Choi</div>
            <div className="text-neutral-500 text-xs mt-1">Founder &amp; CEO · Focally</div>
          </div>

          {/* CTA */}
          <div className="text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--display)' }}>Get a comprehensive diagnostic</h2>
            <p className="text-neutral-400 max-w-xl mx-auto mb-8">
              Stop guessing why your site is not performing. Let us run a deep audit and give you a detailed implementation roadmap.
            </p>
            <Link href="/start" className="btn-white py-4 px-8 rounded-full font-bold inline-flex items-center gap-2 hover:bg-neutral-200 transition-colors">
              Request Audit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
