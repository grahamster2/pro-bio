import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Process | Rovult',
  description: 'How we build high-performance websites.',
};

export default function ProcessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#f4f4f5] font-sans">
      <Navigation />
      
      <main className="flex-1 pt-40 px-6 max-w-4xl mx-auto w-full pb-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">Our Process</h1>
        <p className="text-xl text-neutral-400 font-medium mb-16">
          A systematic approach to engineering your digital presence. No shortcuts, just clear milestones.
        </p>

        <div className="space-y-8">
           {[
             { title: '1. Discovery & Strategy', desc: 'Deep dive into your business logic, audience, and goals to plot out the optimal architecture.' },
             { title: '2. UI/UX Prototyping', desc: 'Crafting the interaction wireframes and high-fidelity mockups using the Nova Design System.' },
             { title: '3. Engineering & Build', desc: 'Writing clean, scalable code with Next.js, optimizing performance, and preparing database logic.' },
             { title: '4. QA & Launch', desc: 'Rigorous Lighthouse testing, responsive checks, and sub-millisecond edge deployment.' },
           ].map((step, idx) => (
             <div key={idx} className="flex gap-6 items-start p-8 bg-[#0a0a0e] border border-[#1f1f22] rounded-2xl">
               <div className="w-12 h-12 shrink-0 rounded-full bg-[#1e293b] flex items-center justify-center text-[#38bdf8]">
                 <CheckCircle2 className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-neutral-400">{step.desc}</p>
               </div>
             </div>
           ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
