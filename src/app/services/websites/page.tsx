import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Web Design & Strategy | Rovult',
  description: 'Custom digital architecture built for speed, conversion, and local business growth. Headless React & Next.js websites.',
};

export default function WebsitesServicePage() {
  return (
    <div className="aurora-page min-h-screen flex flex-col bg-[#050507] text-[#f4f4f5] font-sans selection:bg-white selection:text-black">
      <div className="aurora">
        <div className="aurora-grain" />
        <div className="aurora-vignette" />
      </div>

      <Navigation />

      <main className="flex-1 pt-48 pb-24 relative z-10 w-full">
        <div className="narrow">
          {/* Header */}
          <div className="text-center mb-20 relative z-10">
            <span className="eyebrow mb-4">Core Capability</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: 'var(--display)', letterSpacing: '-0.04em' }}>
              Web design &amp; <br /><span className="italic font-light text-zinc-400" style={{ fontWeight: 300, letterSpacing: '-0.045em' }}>strategy.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
              We build custom digital architectures optimized for your specific conversion goals. Every interface is a precise mechanism designed for business growth.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 relative z-10">
            <div className="bg-[#0b0c10]/40 border border-white/5 p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--display)' }}>Blazing Fast Performance</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Sub-second load times built on Next.js. Fast sites keep customers on your page, rank higher on Google, and drive more phone calls.
              </p>
            </div>

            <div className="bg-[#0b0c10]/40 border border-white/5 p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--display)' }}>Premium Custom Design</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Zero cheap templates. We craft a bespoke visual identity that reflects your quality of work and makes your business stand out immediately.
              </p>
            </div>

            <div className="bg-[#0b0c10]/40 border border-white/5 p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--display)' }}>Conversion Optimization</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                We position your call-to-actions, simplify forms, and streamline user pathways to turn casual visitors into paying leads.
              </p>
            </div>
          </div>

          {/* Detailed Features */}
          <div className="bg-[#0b0c10]/40 border border-white/5 p-8 md:p-12 rounded-3xl mb-20 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center" style={{ fontFamily: 'var(--display)' }}>What goes into a Rovult website</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Modern Headless Stack</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">Built with React, Next.js, and TypeScript. We compile your site to static files hosted on global edge networks, eliminating server lag and security exploits.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Bank-Grade Security</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">Traditional WordPress sites get hacked. Our static architectures have no databases or servers to exploit, making them virtually bulletproof.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">CMS Content Control</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">Easily update portfolio items, blog articles, and business details via a simplified admin panel without writing code.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Lighthouse Score Targeting</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">We optimize code structure, load order, and compress images to achieve 95+ performance metrics on Google PageSpeed Insights.</p>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="bg-[#0c0d12]/60 border border-white/5 rounded-3xl p-8 md:p-12 mb-20 text-center relative z-10">
            <span className="text-4xl text-neutral-600 block mb-6 font-serif">“</span>
            <p className="text-xl md:text-2xl text-neutral-200 font-medium italic mb-8 max-w-3xl mx-auto leading-relaxed">
              “Rovult built us a clean, professional site that showcases our custom home builds. We started getting estimate requests directly from the web within three weeks of launch.”
            </p>
            <div className="font-heading font-semibold text-white">Tyler McCloud</div>
            <div className="text-neutral-500 text-xs mt-1">Owner · TCM Construction · Lexington, KY</div>
          </div>

          {/* CTA */}
          <div className="text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--display)' }}>Ready for a real website?</h2>
            <p className="text-neutral-400 max-w-xl mx-auto mb-8">
              Skip the templated builders and let us engineer a custom high-converting asset for your business.
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
