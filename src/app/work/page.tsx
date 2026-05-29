import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Work | Rovult',
  description: 'Bespoke custom designs and high-performance digital engines built for real service businesses.',
};

export default function WorkPage() {
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
            <span className="eyebrow mb-4">Case Studies</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: 'var(--display)', letterSpacing: '-0.04em' }}>
              Websites built <br /><span className="italic font-light text-zinc-400" style={{ fontWeight: 300, letterSpacing: '-0.045em' }}>to perform.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
              A showcase of recent digital products and local search engines we've shipped for our clients.
            </p>
          </div>

          {/* Work Showcase Grid */}
          <div className="grid grid-cols-1 gap-8 relative z-10">
            
            {/* TCM Construction */}
            <div className="group bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="w-full md:w-1/3 bg-white/5 border border-white/10 rounded-2xl p-8 aspect-video flex items-center justify-center overflow-hidden shrink-0 group-hover:border-white/15 transition-all">
                <img 
                  src="https://horizons-cdn.hostinger.com/7e5fc9a0-be58-4bfe-8620-02d0b4a89192/74998d188a14e133cceb474bd1a7001e.png" 
                  alt="TCM Construction Logo" 
                  className="w-full max-h-16 object-contain filter grayscale invert brightness-0 group-hover:brightness-100 group-hover:invert-0 group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="text-xs text-[#38bdf8] font-bold uppercase tracking-wider">Custom Builder Site &amp; Local SEO</div>
                <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--display)' }}>TCM Construction</h2>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  A high-end portfolio site engineered to exhibit custom home builds and renovations. Configured with a localized content structure that brought in direct estimate requests within weeks of launch.
                </p>
                <div className="flex gap-8 pt-2">
                  <div>
                    <div className="text-lg font-bold text-white">3 Weeks</div>
                    <div className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">First lead arrival</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">Lexington, KY</div>
                    <div className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Service Region</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Focally */}
            <div className="group bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="w-full md:w-1/3 bg-zinc-950 border border-white/10 rounded-2xl p-8 aspect-video flex items-center justify-center overflow-hidden shrink-0 group-hover:border-white/15 transition-all">
                <svg viewBox="0 0 512 512" className="w-24 h-24 text-neutral-500 group-hover:text-white transition-colors" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="160" y="112" width="80" height="256" rx="20" fill="currentColor"></rect>
                  <rect x="272" y="144" width="80" height="256" rx="20" fill="#5A67D8"></rect>
                </svg>
              </div>
              <div className="flex-1 space-y-4">
                <div className="text-xs text-[#38bdf8] font-bold uppercase tracking-wider">Web Application &amp; UI Design</div>
                <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--display)' }}>Focally</h2>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  A custom photography link-in-bio platform. We designed and coded the responsive interface, achieving sub-millisecond edge delivery and complete visual optimization for mobile creatives.
                </p>
                <div className="flex gap-8 pt-2">
                  <div>
                    <div className="text-lg font-bold text-white">99/100</div>
                    <div className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Lighthouse Speed Score</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">React / Next.js</div>
                    <div className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Tech Stack</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lexington Overstock Warehouse */}
            <div className="group bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="w-full md:w-1/3 bg-white/5 border border-white/10 rounded-2xl p-8 aspect-video flex items-center justify-center overflow-hidden shrink-0 group-hover:border-white/15 transition-all">
                <img 
                  src="https://lexingtonoverstockwarehouse.com/wp-content/uploads/2016/09/cropped-local_logo_alpha-copy.png" 
                  alt="Lexington Overstock Warehouse Logo" 
                  className="w-full max-h-12 object-contain filter grayscale invert brightness-0 group-hover:brightness-100 group-hover:invert-0 group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="text-xs text-[#38bdf8] font-bold uppercase tracking-wider">Showroom Lead Engine &amp; SEO</div>
                <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--display)' }}>Lexington Overstock Warehouse</h2>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  A catalog portal for Lexington's largest discount furniture outlet, engineered to direct web traffic to their brick-and-mortar showroom. Integrated local Google Map pack targeting to secure key search positions.
                </p>
                <div className="flex gap-8 pt-2">
                  <div>
                    <div className="text-lg font-bold text-white">Top 3</div>
                    <div className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Google Map Pack ranking</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">Lexington, KY</div>
                    <div className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Location</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="text-center mt-20 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--display)' }}>Want a similar high-performance site?</h2>
            <p className="text-neutral-400 max-w-xl mx-auto mb-8">
              Let's chat about your project and build a high-converting digital machine for your service business.
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
