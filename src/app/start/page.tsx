import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { IntakeForm } from '@/components/IntakeForm';

export const metadata: Metadata = {
  title: 'Start Your Project',
};

export default function StartPage() {
  return (
    <div className="aurora-page min-h-screen flex flex-col bg-[#050505] text-[#f4f4f5] font-sans selection:bg-white selection:text-black">
      <div className="aurora">
        <div className="aurora-grain" />
        <div className="aurora-vignette" />
      </div>

      <Navigation />

      <main className="flex-1 pt-40 pb-24 relative z-10 narrow w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: 'var(--display)' }}>
            Let&apos;s build your website
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Tell us about your business. It takes about 10 minutes, and you can
            skip anything you&apos;re unsure about — we&apos;ll fill in the rest
            together.
          </p>
        </div>

        <IntakeForm />
      </main>

      <Footer />
    </div>
  );
}
