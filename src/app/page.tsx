import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle2, Layout, Search, Server, Code2 } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Rovult | precision digital craft',
  description: 'Websites that work as hard as you do.',
};

export default function AgencyLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#f4f4f5] overflow-x-hidden selection:bg-[#38bdf8] selection:text-white font-sans">
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 flex flex-col items-center text-center px-4 overflow-hidden min-h-[80vh] justify-center -mt-24">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
           <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
               <source src="/hero-bg.mp4" type="video/mp4" />
           </video>
           <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/40 to-[#050505] pointer-events-none"></div>
        </div>

        {/* Subtle glow behind hero */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#38bdf8] rounded-[100%] opacity-15 blur-[120px] pointer-events-none mix-blend-screen z-0"></div>
        
        <h1 className="relative z-10 mt-12 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 max-w-4xl leading-[1.05]">
          Websites that work as hard as you do.
        </h1>
        <p className="relative z-10 text-lg md:text-xl text-neutral-400 font-medium mb-10 max-w-2xl">
          Driving local business growth through precision digital craft and high-velocity performance.
        </p>
        
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm sm:max-w-none mx-auto">
          <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 bg-white rounded-full font-semibold text-black transition-all hover:scale-105 active:scale-95 flex justify-center items-center">
            Get Started
          </Link>
          <Link href="/work" className="w-full sm:w-auto px-8 py-3.5 bg-[#121212] border border-white/10 rounded-full font-semibold text-white transition-all hover:bg-[#1a1a1a] active:scale-95 flex justify-center items-center gap-2">
            View Showreel
          </Link>
        </div>
      </section>

      {/* Hero Image / Dashboard Mockup */}
      <section className="relative px-4 pb-24 md:pb-32 -mt-4 z-20">
        <div className="max-w-6xl mx-auto rounded-xl border border-white/5 bg-[#0a0a0a] p-2 md:p-4 shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] z-10 pointer-events-none rounded-xl"></div>
          {/* Mockup Frame */}
          <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#0f0f11] rounded-lg border border-[#1f1f22] overflow-hidden relative shadow-inner">
             {/* Fake UI Header */}
             <div className="h-10 border-b border-[#1f1f22] flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
                </div>
                <div className="mx-auto w-48 h-5 bg-[#1a1a1c] rounded-md border border-[#27272a] hidden md:block"></div>
             </div>
             {/* Fake UI Content */}
             <div className="p-6 md:p-10 flex flex-col gap-6 opacity-60">
                <div className="flex justify-between items-center">
                  <div className="w-1/3 h-8 bg-[#1f1f22] rounded-md"></div>
                  <div className="flex gap-3">
                    <div className="w-24 h-8 bg-[#1f1f22] rounded-full"></div>
                    <div className="w-24 h-8 bg-[#38bdf8] rounded-full opacity-20"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="h-32 bg-[#1f1f22] border border-[#27272a] rounded-xl"></div>
                  <div className="h-32 bg-[#1f1f22] border border-[#27272a] rounded-xl"></div>
                  <div className="h-32 bg-[#1f1f22] border border-[#27272a] rounded-xl"></div>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="h-12 bg-[#1f1f22] rounded-md flex items-center px-4"><div className="w-3/4 h-2 bg-[#27272a] rounded-full"></div></div>
                  <div className="h-12 bg-[#1f1f22] rounded-md flex items-center px-4"><div className="w-1/2 h-2 bg-[#27272a] rounded-full"></div></div>
                  <div className="h-12 bg-[#1f1f22] rounded-md flex items-center px-4"><div className="w-5/6 h-2 bg-[#27272a] rounded-full"></div></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto w-full" id="services">
        <div className="mb-12">
          <span className="text-[11px] font-bold tracking-[0.15em] text-[#38bdf8] uppercase block mb-3">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8">Engineered for Impact</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          
          {/* Web Design & Strategy */}
          <div className="md:col-span-2 p-8 md:p-10 rounded-2xl bg-[#0a0a0e] border border-[#1f1f22] group relative overflow-hidden transition-all hover:bg-[#0f0f13]">
            <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center mb-6 text-[#38bdf8]">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Web Design & Strategy</h3>
            <p className="text-neutral-400 text-sm md:text-base mb-12 max-w-md leading-relaxed font-medium">
              We don&apos;t just build sites; we architect digital conversion machines designed to capture intent and drive action.
            </p>
            <div className="mt-auto">
              <Link href="/process" className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#38bdf8] transition-colors">
                Explore Methodology <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* SEO Dominance */}
          <div className="p-8 md:p-10 rounded-2xl bg-[#0a0a0e] border border-[#1f1f22] relative overflow-hidden group hover:bg-[#0f0f13] transition-all">
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 blur-sm pointer-events-none">
               <span className="text-8xl font-black text-[#38bdf8]">SEO</span>
            </div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center mb-6 text-[#38bdf8]">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">SEO Dominance</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mt-auto font-medium">
                Visibility is the new currency. We put your business where your customers are looking.
              </p>
            </div>
          </div>

          {/* Edge Hosting */}
          <div className="p-8 md:p-10 rounded-2xl bg-[#0a0a0e] border border-[#1f1f22] group hover:bg-[#0f0f13] transition-all flex flex-col justify-end">
            <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center mb-6 text-[#38bdf8]">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Edge Hosting</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-medium max-w-[250px]">
              Sub-millisecond performance. Global distribution. Security that never sleeps.
            </p>
          </div>

          {/* Precision Digital Craft */}
          <div className="md:col-span-2 p-8 md:p-10 rounded-2xl bg-[#0a0a0e] border border-[#1f1f22] group hover:bg-[#0f0f13] transition-all flex flex-col md:flex-row md:items-center gap-8 relative overflow-hidden">
            {/* Visual Blob */}
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#0ea5e9] to-[#020617] blur-2xl opacity-20 absolute top-1/2 left-1/4 -translate-y-1/2"></div>
            
            <div className="relative z-10 flex-1">
               <div className="w-32 h-32 rounded-full border border-white/5 bg-[#121212] flex items-center justify-center shadow-2xl relative">
                  <div className="absolute inset-0 rounded-full bg-[#38bdf8] blur-xl opacity-10"></div>
                  <div className="text-center">
                    <span className="block text-xl font-bold text-white">poly</span>
                    <span className="block text-xs text-neutral-500 font-medium tracking-widest mt-1">SAFE ZONE</span>
                  </div>
               </div>
            </div>

            <div className="relative z-10 flex-[1.5] flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Precision Digital Craft</h3>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 font-medium">
                Every pixel is intentional. Every line of code is optimized. We treat digital assets with the same mindset as physical architecture.
              </p>
              <div className="flex gap-2">
                 <span className="px-3 py-1 bg-[#1a1a1c] rounded border border-[#27272a] text-[10px] uppercase font-bold tracking-wider text-neutral-300">Advanced</span>
                 <span className="px-3 py-1 bg-[#1a1a1c] rounded border border-[#27272a] text-[10px] uppercase font-bold tracking-wider text-neutral-300">Foundation</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Disrupt Section */}
      <section className="py-24 md:py-32 px-6 max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
              Designed to <br/> disrupt.
            </h2>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-10 font-medium">
              We discard the templates and the generic shortcuts. Our process is a deep dive into your business logic, translating core values into a high-performance digital presence.
            </p>
            <ul className="space-y-5">
              <li className="flex gap-3 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></div>
                <span className="font-semibold text-white/90">Custom interaction design that defines brand feel.</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></div>
                <span className="font-semibold text-white/90">Lighthouse scores that never dip below 95.</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></div>
                <span className="font-semibold text-white/90">Strategic content hierarchy for maximum flow.</span>
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full relative">
             <div className="aspect-[4/5] bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 relative">
                {/* Person pointing mockup */}
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=1000" 
                  alt="Precision engineering" 
                  className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity brightness-75 transition-all duration-700 hover:grayscale-0 hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 pb-32 max-w-4xl mx-auto w-full">
        <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden flex flex-col items-center shadow-2xl">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#38bdf8] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
           
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">
             Ready to build the future?
           </h2>
           <p className="text-neutral-400 max-w-lg mx-auto mb-10 text-sm md:text-base font-medium leading-relaxed relative z-10">
             Join the local leaders who have already scaled their digital impact with Rovult.
           </p>
           <Link href="/contact" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all relative z-10">
             Start a Conversation
           </Link>
        </div>
      </section>

      <Footer />

    </div>
  );
}
