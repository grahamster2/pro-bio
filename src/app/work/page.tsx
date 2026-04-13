import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Work | Rovult',
  description: 'Our portfolio and case studies.',
};

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#f4f4f5] font-sans">
      <Navigation />
      
      <main className="flex-1 pt-40 px-6 max-w-6xl mx-auto w-full pb-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">Work / Showreel</h1>
        <p className="text-xl text-neutral-400 max-w-2xl font-medium mb-16">
          A showcase of our recent projects and the high-performance digital machines we've built.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="group relative aspect-video bg-[#0a0a0e] rounded-2xl border border-[#1f1f22] overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600" alt="Case Study Alpha" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 z-10 w-[calc(100%-3rem)]">
                 <span className="text-[#38bdf8] font-bold text-xl tracking-tight flex items-center gap-2">Case Study Alpha <span className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">→</span></span>
                 <p className="text-neutral-300 text-sm mt-2 line-clamp-2">Complete digital transformation for a leading tech logistics firm. Scaled their pipeline by 400% using a headless architecture.</p>
              </div>
           </div>
           <div className="group relative aspect-video bg-[#0a0a0e] rounded-2xl border border-[#1f1f22] overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600" alt="Case Study Beta" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity hover:mix-blend-normal" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 z-10 w-[calc(100%-3rem)]">
                 <span className="text-[#38bdf8] font-bold text-xl tracking-tight flex items-center gap-2">Case Study Beta <span className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">→</span></span>
                 <p className="text-neutral-300 text-sm mt-2 line-clamp-2">SaaS marketing platform redefined. Increased user onboarding completion rates through streamlined onboarding workflows.</p>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
