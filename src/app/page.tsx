import { Metadata } from 'next';
import Link from 'next/link';
import { Terminal, Monitor, Globe, Server, Warehouse, ArrowRight, ScanLine } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rovult | Precision Engineered Web Experiences',
  description: 'We build high-performance digital infrastructure for brands that refuse to settle for the standard web.',
};

export default function AgencyLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#131313] text-[#e5e2e1] overflow-x-hidden selection:bg-[#0070f3] selection:text-white pb-32 md:pb-0">
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-2xl border border-white/10 bg-neutral-900/15 backdrop-blur-xl flex justify-between items-center px-4 md:px-6 py-3 z-50 shadow-[0_0_60px_-15px_rgba(0,112,243,0.08)]">
        <div className="flex items-center gap-2">
          <Terminal className="text-[#0070f3] w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xl md:text-2xl font-black tracking-tighter text-[#e5e2e1] font-sans">ROVULT</span>
        </div>
        <Link 
          href="#contact"
          className="font-sans tracking-tighter text-xs md:text-sm uppercase font-bold text-[#0070f3] active:scale-95 transition-transform hover:text-white hover:bg-white/5 md:px-3 py-1 rounded-lg"
        >
          Launch Project
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-12 overflow-hidden"
               style={{ background: 'radial-gradient(at 0% 0%, rgba(0, 112, 243, 0.15) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(104, 7, 186, 0.15) 0, transparent 50%)' }}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuAiX9v2J4aIeBedd8YQVdkNAbvP2kEhpSf2vQ8RTHBYfhLeo-asfTUBS9EEPL3IwxbjrlwsJcsRFLSaDESns7rslWoKpDsMi__AT71g_18MrSEZ8Ls_lNeHDe8vZUT5CM3EQTItvkOs_YZmdv_oJy31xbh1MgcvK8Wsan58pPTA75jVBtl9ba5_YXO4NWHgeTj43rG891-d60kuk9aYU8pz0a8cdBVtKCcP0uIgnN3LtUbw9-DJFCyms36_-_3mef9HhV8IDsKSiHlX)' }}></div>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center mt-10 md:mt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a2a2a] border border-[#414754]/20 mb-8 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#0070f3] animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.1em] text-[#c1c6d7] uppercase">Operational Systems Ready</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] text-[#e5e2e1] mb-8">
            Precision <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070f3] to-[#6807ba]">Engineered</span> <br className="hidden md:block"/>
            Web Experiences
          </h1>
          <p className="text-lg md:text-xl text-[#c1c6d7] font-medium leading-relaxed mb-10 max-w-xl mx-auto">
            We build high-performance digital infrastructure for brands that refuse to settle for the standard web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm sm:max-w-none mx-auto">
            <Link href="#contact" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#0070f3] to-[#6807ba] rounded-xl font-bold text-white tracking-tight transition-all active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(0,112,243,0.5)] hover:shadow-[0_0_60px_-10px_rgba(0,112,243,0.7)] flex justify-center items-center gap-2">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#services" className="w-full sm:w-auto px-8 py-4 bg-[#2a2a2a] border border-[#414754]/30 rounded-xl font-bold text-[#e5e2e1] tracking-tight transition-all hover:bg-[#3a3939] active:scale-[0.98] flex justify-center items-center gap-2 shadow-lg">
              View the Arsenal <ScanLine className="w-4 h-4 text-[#c1c6d7]" />
            </Link>
          </div>
        </div>

        {/* Ambient background blur blobs */}
        <div className="absolute -left-32 top-1/2 w-96 h-96 bg-[#0070f3] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
        <div className="absolute -right-20 bottom-20 w-64 h-96 bg-[#2a2a2a] border border-white/5 rounded-3xl rotate-12 blur-3xl opacity-30 pointer-events-none"></div>
      </section>

      {/* Services Bento Grid */}
      <section id="services" className="px-6 py-24 md:py-32 bg-[#0e0e0e] relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:text-center">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#0070f3] uppercase block mb-3">Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-[#e5e2e1]">Core Infrastructure</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            
            {/* Large Card: Web Design */}
            <div className="lg:col-span-2 p-8 md:p-12 rounded-[2rem] bg-[#2a2a2a]/60 backdrop-blur-md shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.08)] relative overflow-hidden group hover:bg-[#2a2a2a] transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 scale-150 group-hover:scale-110 group-hover:opacity-10 transition-all duration-700 pointer-events-none text-[#aec6ff]">
                <Monitor className="w-64 h-64" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end">
                <span className="w-fit text-[10px] md:text-xs font-bold tracking-widest text-[#0070f3] uppercase mb-4 block bg-[#0070f3]/10 px-3 py-1 rounded-full border border-[#0070f3]/20">Design-First</span>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight text-[#e5e2e1] mb-4">Bespoke Web Systems</h3>
                <p className="text-sm md:text-base text-[#c1c6d7] leading-relaxed max-w-md font-medium">
                  Custom digital architectures built with React and Tailwind for surgical precision and lightning speed. No templates, strictly tailored engineering.
                </p>
              </div>
            </div>

            {/* Sub column for mobile stack or right side on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 flex-1">
              {/* Half Card: SEO */}
              <div className="p-8 rounded-[2rem] bg-[#2a2a2a]/60 backdrop-blur-md shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.08)] hover:bg-[#2a2a2a] transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0070f3] to-blue-900 flex items-center justify-center mb-6 shadow-lg shadow-[#0070f3]/20">
                  <Globe className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#e5e2e1] mb-2">Local SEO</h3>
                <p className="text-xs md:text-sm text-[#c1c6d7] leading-relaxed font-medium">
                  Dominating regional search clusters. Ensuring your brand captures high-intent traffic accurately.
                </p>
              </div>
              
              {/* Half Card: Hosting */}
              <div className="p-8 rounded-[2rem] bg-[#2a2a2a]/60 backdrop-blur-md shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.08)] hover:bg-[#2a2a2a] transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6807ba] to-purple-900 flex items-center justify-center mb-6 shadow-lg shadow-[#6807ba]/20">
                  <Server className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#e5e2e1] mb-2">Managed Hosting</h3>
                <p className="text-xs md:text-sm text-[#c1c6d7] leading-relaxed font-medium">
                  99.9% Uptime Protocol guaranteed via Vercel edge networks. Scalable and secure.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof Case Study */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-[#131313]">
        <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-[#0e0e0e] flex items-center justify-center border border-white/10 shadow-lg">
                <Warehouse className="text-[#0070f3] w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl text-[#e5e2e1] font-black tracking-tight mb-1">Lexington Overstock</h4>
                <p className="text-[10px] md:text-xs font-bold text-[#c1c6d7] uppercase tracking-widest">Case Protocol 082</p>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-[#c1c6d7] font-medium leading-relaxed mb-10">
              We rebuilt their digital storefront to align with their massive warehouse inventory. The result was an immediate surge in local visibility and measurable foot traffic.
            </p>

            <div className="space-y-8 mb-8 border-l-2 border-[#2a2a2a] pl-6">
              <div className="flex flex-col gap-1">
                <span className="text-5xl md:text-6xl font-black text-[#0070f3] tracking-tighter">40%</span>
                <span className="text-xs font-bold text-[#c1c6d7] uppercase tracking-wider">Foot Traffic Increase</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-5xl md:text-6xl font-black text-[#6807ba] tracking-tighter">200+</span>
                <span className="text-xs font-bold text-[#c1c6d7] uppercase tracking-wider">Monthly Leads Generated</span>
              </div>
            </div>
          </div>

          {/* Image Node */}
          <div className="flex-1 w-full order-1 lg:order-2">
            <div className="bg-[#2a2a2a]/30 rounded-3xl p-3 border border-[#414754]/30 shadow-2xl relative">
              <div className="absolute top-0 right-1/4 w-32 h-32 bg-[#0070f3] rounded-full blur-[80px] -z-10 opacity-30"></div>
              <div className="rounded-[1.5rem] overflow-hidden aspect-[4/3] relative group">
                <img 
                  alt="Modern high-tech workflow" 
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200&h=800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/90 via-[#0e0e0e]/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="text-[10px] font-bold text-white bg-[#0070f3] px-3 py-1.5 rounded-full uppercase shadow-[0_0_15px_rgba(0,112,243,0.5)]">Verified Result</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="px-6 py-24 md:py-32 bg-[#1c1b1b] relative">
        <div className="max-w-xl mx-auto relative z-10 bg-[#0e0e0e] p-8 md:p-12 rounded-3xl border border-[#2a2a2a] shadow-2xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-[#e5e2e1] mb-3">Initialize Contact</h2>
            <p className="text-[#c1c6d7] text-sm md:text-base leading-relaxed font-medium">
                Ready to upgrade your digital footprint? Secure your position in the queue.
            </p>
          </div>
          
          <form className="space-y-6">
            <div className="group">
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#8b90a0] mb-2 px-1 transition-colors group-focus-within:text-[#0070f3]">Identity</label>
              <input 
                className="w-full bg-[#1c1b1b] border border-[#414754]/50 rounded-xl px-5 py-4 text-[#e5e2e1] placeholder:text-neutral-600 focus:outline-none focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3]/50 transition-all text-sm font-medium tracking-tight shadow-inner" 
                placeholder="FULL NAME" 
                type="text"
                required
              />
            </div>
            
            <div className="group">
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#8b90a0] mb-2 px-1 transition-colors group-focus-within:text-[#0070f3]">Frequency</label>
              <input 
                className="w-full bg-[#1c1b1b] border border-[#414754]/50 rounded-xl px-5 py-4 text-[#e5e2e1] placeholder:text-neutral-600 focus:outline-none focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3]/50 transition-all text-sm font-medium tracking-tight shadow-inner" 
                placeholder="EMAIL ADDRESS" 
                type="email"
                required
              />
            </div>
            
            <div className="group">
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#8b90a0] mb-2 px-1 transition-colors group-focus-within:text-[#0070f3]">Transmission Details</label>
              <textarea 
                className="w-full bg-[#1c1b1b] border border-[#414754]/50 rounded-xl px-5 py-4 text-[#e5e2e1] placeholder:text-neutral-600 focus:outline-none focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3]/50 transition-all text-sm font-medium tracking-tight resize-none shadow-inner" 
                placeholder="PROJECT SCOPE & OBJECTIVES" 
                rows={4}
                required
              ></textarea>
            </div>
            
            <button 
              className="mt-4 w-full py-5 bg-gradient-to-r hover:bg-gradient-to-l from-[#3a3939] to-[#2a2a2a] text-[#e5e2e1] font-black uppercase tracking-[0.15em] text-xs md:text-sm rounded-xl border border-[#414754] shadow-[0_0_20px_-5px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_-5px_rgba(0,112,243,0.3)] hover:border-[#0070f3]/50 active:scale-95 transition-all duration-300" 
              type="submit">
                Submit Protocol
            </button>
          </form>
        </div>
        
        <div className="absolute inset-0 bg-[#0070f3]/5 blur-[150px] pointer-events-none mix-blend-screen"></div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0e0e0e] w-full border-t border-[#2a2a2a]">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-12 md:py-16 max-w-7xl mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <Terminal className="text-[#0070f3] w-6 h-6" />
              <span className="text-xl font-bold text-neutral-100 font-sans tracking-tighter">ROVULT <span className="opacity-50 font-medium">OS</span></span>
            </div>
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase font-bold text-[#8b90a0]">
                © {new Date().getFullYear()} ROVULT OS. ALL SYSTEMS OPERATIONAL.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link className="font-mono text-[10px] tracking-[0.05em] uppercase font-bold text-[#8b90a0] hover:text-[#0070f3] transition-colors duration-200" href="#services">Capabilities</Link>
            <Link className="font-mono text-[10px] tracking-[0.05em] uppercase font-bold text-[#8b90a0] hover:text-[#0070f3] transition-colors duration-200" href="#">Archives</Link>
            <Link className="font-mono text-[10px] tracking-[0.05em] uppercase font-bold text-[#0070f3] hover:text-white transition-colors duration-200" href="#contact">Terminal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
