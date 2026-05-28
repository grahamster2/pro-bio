import { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Check, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Subscription Plans',
  description: 'Simple, transparent hosting and care plans for local business websites. Get peace of mind while we handle the tech.',
};

const PLANS = [
  {
    name: 'Launch Care',
    price: '$79',
    period: '/mo',
    desc: 'Perfect for small businesses needing reliable, lightning-fast hosting and basic support.',
    features: [
      'Premium, ultra-fast hosting & SSL',
      'Daily automated backups',
      'Continuous security monitoring',
      '1 hour of content edits per month',
      'Email & text-based support support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth Care',
    price: '$149',
    period: '/mo',
    desc: 'Designed for active contractors looking to dominate search results and win more local jobs.',
    features: [
      'All Launch Care features',
      'Local SEO & Map Pack optimization',
      'Google Business Profile posting support',
      '3 hours of custom design & dev updates',
      'Review generation & collection setup',
      'Priority 12-hour support response',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise Care',
    price: 'Custom',
    period: '',
    desc: 'Custom care plans for multi-location teams and companies requiring deep custom integration.',
    features: [
      'All Growth Care features',
      'Dedicated Slack / phone channel',
      'CRM, scheduling & API integrations',
      'Unlimited design & dev edits',
      'Custom sub-pages & location landing pages',
      'SLA-guaranteed uptime & support',
    ],
    cta: 'Contact Us',
    popular: false,
  },
];

export default function PlansPage() {
  return (
    <div className="aurora-page min-h-screen flex flex-col bg-[#050505] text-[#f4f4f5] font-sans selection:bg-white selection:text-black">
      <div className="aurora">
        <div className="aurora-grain" />
        <div className="aurora-vignette" />
      </div>

      <Navigation />

      <main className="flex-1 pt-40 pb-24 relative z-10 container w-full">
        <div className="text-center mb-16 relative z-10 flex flex-col items-center">
          <span className="eyebrow mb-4">
            Subscription Plans
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Simple pricing. <span className="italic font-normal text-zinc-400">No surprise bills.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Hosting, maintenance, and updates taken care of. You run your business, we keep your website in top shape.
          </p>
        </div>

        {/* Bookmark Notice Alert */}
        <div className="max-w-3xl mx-auto mb-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex items-start gap-4 relative z-10">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-300 text-sm mb-1">Plans being finalized</h4>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              We are currently fine-tuning our care package details and setup options. 
              Official pricing details will go live tonight. In the meantime, you can reach out below to request info or reserve early-bird spots.
            </p>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-3xl p-8 bg-[#0a0a0c] border transition-all ${
                plan.popular
                  ? 'border-[var(--blue-500)] shadow-[0_0_32px_var(--blue-glow)] scale-[1.02] lg:translate-y-[-8px] bg-white/[0.02]'
                  : 'border-white/10 hover:border-white/20 bg-white/[0.01]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  {plan.popular && (
                    <span className="text-xs font-bold text-[var(--blue-300)] bg-[var(--blue-500)]/15 border border-[var(--blue-500)]/20 px-2.5 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl md:text-5xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm font-medium text-zinc-500">{plan.period}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-8">{plan.desc}</p>
                <div className="h-px bg-zinc-900 mb-8" />
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-[var(--blue-300)] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/start"
                className={`w-full py-4 text-center font-bold rounded-full transition-all ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-transparent text-white border border-white/10 hover:bg-white/5'
                }`}
                style={plan.popular ? { color: '#000000', backgroundColor: '#ffffff' } : undefined}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
