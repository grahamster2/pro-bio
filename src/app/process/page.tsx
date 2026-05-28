import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Process | Rovult',
  description: 'A systematic approach to website engineering and local SEO deployment. Transparent milestones, clear results.',
};

export default function ProcessPage() {
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
            <span className="eyebrow mb-4">How We Build</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: 'var(--display)', letterSpacing: '-0.04em' }}>
              A simple process, <br /><span style={{
                fontWeight: 300,
                fontStyle: 'normal',
                background: 'linear-gradient(180deg, var(--blue-300) 0%, var(--blue-500) 60%, var(--blue-700) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.045em'
              }} className="italic font-light">no fluff.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
              A systematic approach to engineering your digital presence. No shortcuts, just clear deliverables and sub-millisecond launches.
            </p>
          </div>

          {/* Process Timeline */}
          <div className="space-y-6 relative z-10">
            {[
              { 
                num: '01', 
                title: 'Discovery & Strategy', 
                desc: 'We map out your business objectives, profile your target service areas, evaluate direct local competitors, and plan the structure of your conversion pathways. This serves as the roadmap for your website architecture.' 
              },
              { 
                num: '02', 
                title: 'UI/UX Prototyping', 
                desc: 'No cookie-cutter templates. We craft a bespoke visual prototype customized for your business. We design the interface with high-contrast layouts, smooth interactive elements, and floating contact pathways optimized for mobile visitors.' 
              },
              { 
                num: '03', 
                title: 'Engineering & Build', 
                desc: 'We translate the approved design mockups into semantic, clean code using Next.js and TypeScript. We build custom API pathways for lead forms, set up database integration, and host assets on global edge CDNs for lightning-fast speeds.' 
              },
              { 
                num: '04', 
                title: 'QA, SEO & Launch', 
                desc: 'We run your site through comprehensive Lighthouse speed audits, inject local JSON-LD schema tags, test contact routes, and execute the final edge deployment. You go live with a secure, sub-second web presence.' 
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 rounded-3xl flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] font-mono font-bold text-sm">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--display)' }}>{step.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ section call */}
          <div className="text-center mt-20 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--display)' }}>Ready to get started?</h2>
            <p className="text-neutral-400 max-w-xl mx-auto mb-8">
              We guide you through each milestone. Let's start mapping out your digital presence today.
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
