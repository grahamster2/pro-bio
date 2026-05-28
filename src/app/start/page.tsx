import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { IntakeForm } from '@/components/IntakeForm';

export const metadata: Metadata = {
  title: 'Start Your Project',
};

export default function StartPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-white selection:text-black">
      <Navigation />

      <main className="flex-1 pt-32 px-6 max-w-3xl mx-auto w-full pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
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
