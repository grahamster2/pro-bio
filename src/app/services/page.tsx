import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Services | Rovult',
  description: 'Our capabilities and service offerings.',
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#f4f4f5] font-sans">
      <Navigation />
      
      <main className="flex-1 pt-40 px-6 max-w-6xl mx-auto w-full pb-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">Services</h1>
        <p className="text-xl text-neutral-400 max-w-2xl font-medium mb-16">
          Everything you need to capture traffic, convert leads, and distribute your brand securely.
        </p>

        <div className="grid grid-cols-1 gap-12">
           <div className="group relative p-10 md:p-16 rounded-3xl bg-[#0a0a0e] border border-[#1f1f22] overflow-hidden min-h-[400px] flex flex-col justify-end">
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1600" alt="Web Design" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
              <div className="relative z-10">
                 <h2 className="text-4xl font-bold text-white mb-4">Web Design & Strategy</h2>
                 <p className="text-neutral-300 text-lg leading-relaxed max-w-2xl font-medium">We build custom digital architectures optimized for your specific conversion goals. Every interface is a precise mechanism designed for brand growth.</p>
              </div>
           </div>
           
           <div className="group relative p-10 md:p-16 rounded-3xl bg-[#0a0a0e] border border-[#1f1f22] overflow-hidden min-h-[400px] flex flex-col justify-end">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600" alt="SEO" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
              <div className="relative z-10">
                 <h2 className="text-4xl font-bold text-white mb-4">SEO Dominance</h2>
                 <p className="text-neutral-300 text-lg leading-relaxed max-w-2xl font-medium">Comprehensive local search engine optimization, content strategy, and technical audits to capture intent. Dominate your market's search volume.</p>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
