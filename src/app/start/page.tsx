import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { IntakeForm } from '@/components/IntakeForm';

export const metadata: Metadata = {
  title: 'Start Your Project',
};

export default function StartPage() {
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
          <div className="text-center mb-16 relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: 'var(--display)', letterSpacing: '-0.04em' }}>
              Let&apos;s build your <span className="italic font-light text-zinc-400" style={{ fontWeight: 300, letterSpacing: '-0.045em' }}>website.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
              Tell us about your business. It only takes a minute to get started,
              and we&apos;ll design the rest together.
            </p>
          </div>

          <div className="relative z-10">
            <IntakeForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
