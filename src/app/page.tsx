import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Star, TrendingUp, Zap } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Rovult | Websites that get more customers',
  description: 'We build fast, professional websites for local service businesses.',
};

export default function AgencyLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-white selection:text-black">
      
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-32 px-6 flex flex-col items-center text-center justify-center min-h-[70vh]">
        <span className="text-sm font-semibold tracking-wide text-white uppercase mb-4">Websites for local business</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 max-w-4xl leading-tight">
          Websites that work as hard as you do.
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
          Running a business is hard enough. Your website should be the easiest part. We build fast, reliable sites that turn visitors into customers.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm sm:max-w-none">
          <Link href="/contact" className="px-8 py-4 bg-white rounded-full font-bold text-black hover:bg-zinc-200 transition-all text-center">
            Get a Free Quote
          </Link>
          <Link href="/work" className="px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-full font-bold text-white hover:bg-zinc-800 transition-all text-center">
            See Our Work
          </Link>
        </div>
      </section>

      {/* Proof Section (Replacing Three-Feature-Cards and Dashboard) */}
      <section className="py-32 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Real results for real businesses.
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                We don't do generic templates. We build custom sites that actually help you scale. Last month, we helped a local logistics firm grow their pipeline by 400%.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">400% Pipeline Growth</h4>
                    <p className="text-zinc-400 text-sm">After moving to our custom headless architecture, leads started flowing immediately.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Lighthouse Scores over 95</h4>
                    <p className="text-zinc-400 text-sm">Our sites load in milliseconds, and they're optimized for Google search results from day one.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Built-in Local SEO</h4>
                    <p className="text-zinc-400 text-sm">We make sure people in your neighborhood can find your business when they need individual services.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8">
               <div className="flex items-center gap-2 mb-6">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-white text-white" />)}
               </div>
               <p className="text-xl text-white font-medium italic mb-6 leading-relaxed">
                 "Rovult handled everything. They understood exactly what we needed to grow our local presence. Within two weeks of launch, our leads doubled."
               </p>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-zinc-800" />
                 <div>
                    <p className="font-bold text-white text-sm">John D.</p>
                    <p className="text-zinc-500 text-xs">Owner, Alpha Logistics</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-32 px-6 bg-zinc-950 border-t border-zinc-900" id="services">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What we do.</h2>
            <p className="text-zinc-400 text-lg max-w-xl">
              We handle the tech so you can focus on your work. From design to hosting, we've got you covered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-2xl bg-[#0a0a0a] border border-zinc-800 hover:border-zinc-700 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">Web Design that sells</h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Your website shouldn't just look good—it should work. we design every page to make it as easy as possible for your customers to contact you.
              </p>
              <Link href="/process" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:underline underline-offset-4">
                How we work <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-10 rounded-2xl bg-[#0a0a0a] border border-zinc-800 hover:border-zinc-700 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">Fast, Secure Hosting</h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                We use global edge computing to make your site load instantly for every user, anywhere in the world. No maintenance required from your side.
              </p>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Auto-scaling servers</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Daily backups</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> DDoS protection</li>
              </ul>
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
                <Image
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=1000"
                  alt="Precision engineering"
                  fill
                  className="object-cover grayscale opacity-60 mix-blend-luminosity brightness-75 transition-all duration-700 hover:grayscale-0 hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Simplified CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 md:p-20 text-center">
           <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 tracking-tight">
             Ready to grow?
           </h2>
           <p className="text-zinc-600 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
             Join the dozens of local business owners who have upgraded their digital presence with us.
           </p>
           <Link href="/contact" className="px-10 py-5 bg-black text-white font-bold rounded-full hover:bg-zinc-800 transition-all inline-block">
             Let's Chat
           </Link>
        </div>
      </section>

      <Footer />

    </div>
  );
}
