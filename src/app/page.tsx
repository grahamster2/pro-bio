import Link from 'next/link';
import { ArrowRight, Wrench, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Wrench className="w-6 h-6 text-brand-amber" />
          <span className="text-xl font-heading font-bold text-slate-100 tracking-wider">
            PRO<span className="text-brand-amber">BIO</span>
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log In</Link>
          <Link href="/onboarding" className="text-sm font-medium bg-brand-amber text-zinc-950 px-4 py-2 rounded-md hover:bg-amber-400 transition-colors font-bold">Get Started</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="px-6 py-24 md:py-32 w-full max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700 text-sm text-slate-300 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-brand-amber"></span>
            Built exclusively for trades businesses
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-50 tracking-tight leading-tight mb-6">
            The Website for Pros <br className="hidden md:block" /> who <span className="text-brand-amber underline decoration-8 underline-offset-8">Hate</span> Websites.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 font-sans">
            Plumbers, Electricians, Landscapers, and HVAC techs: stop losing customers to complicated website builders. Get a rugged, mobile-first profile ready in 3 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/onboarding" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-amber text-zinc-950 px-8 py-4 rounded-md font-bold text-lg hover:bg-amber-400 transition-all hover:scale-105">
              Claim Your Profile Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">No credit card required. Free forever plan available.</p>
        </section>

        {/* Features Section */}
        <section className="w-full border-t border-zinc-900 bg-zinc-900/50">
          <div className="px-6 py-24 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 text-brand-amber border border-zinc-700">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-100 mb-3">Live in 3 Minutes</h3>
                <p className="text-slate-400">Forget dragging and dropping. Answer three questions, and your business card is live on the internet.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 text-brand-amber border border-zinc-700">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-100 mb-3">Build Trust Instantly</h3>
                <p className="text-slate-400">Showcase your license number and trade category front and center so customers know you are legit.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 text-red-500 border border-zinc-700">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-6 h-6 rounded-full bg-red-500/30 animate-ping"></span>
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-100 mb-3">Emergency Pulse</h3>
                <p className="text-slate-400">Toggle emergency availability with one tap to get high-paying, after-hours jobs directly.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-900 py-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} ProBio. All rights reserved.</p>
      </footer>
    </div>
  );
}
