import { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const Check = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={className}>
    <path d="M5 12l5 5L20 7" />
  </svg>
);

export const metadata: Metadata = {
  title: 'Subscription Plans',
  description: 'Simple hosting and care plans for local business websites. Pricing tailored to your needs.',
};

const PLANS = [
  {
    name: 'Basic',
    price: '$30',
    period: '/mo',
    tagline: 'Your site, kept running and up to date.',
    features: [
      'Hosting & SSL included',
      'Domain fees covered',
      'Daily backups',
      'Up to 20 changes per month',
      'Monthly analytics report',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Standard',
    price: '$45',
    period: '/mo',
    tagline: 'Everything in Basic, plus tools to grow.',
    features: [
      'All Basic plan features',
      '1 team member seat',
      'Analytics dashboard',
      'Basic SEO setup',
      'Email support',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Premium',
    price: '$65',
    period: '/mo',
    tagline: 'Built for agencies and multi-client teams.',
    features: [
      'All Standard plan features',
      '15 active client seats',
      '5 team member seats',
      'Weekly reporting',
      'Full SEO management',
      'Performance tracking',
      'Custom analytics',
      'Full API access',
      'Priority support',
      'Custom integrations',
    ],
    cta: 'Get Started',
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

      <main className="flex-1 pt-56 pb-24 relative z-10 container w-full">
        <div className="text-center mb-16 relative z-10 flex flex-col items-center">
          <span className="eyebrow mb-4">
            Subscription Plans
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            We keep your site <span className="italic font-normal text-zinc-400">running and growing.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Hosting, maintenance, and updates taken care of. Pricing is tailored to your business — reach out and we&apos;ll find the right fit.
          </p>
        </div>

        {/* Plan Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 mb-16">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-3xl p-8 bg-[#0a0a0c] border transition-all ${
                plan.popular
                  ? 'border-white/20 lg:translate-y-[-8px] bg-white/[0.03]'
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
                  <span className="text-4xl md:text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-sm font-medium text-zinc-500">{plan.period}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-8">{plan.tagline}</p>
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

        {/* No-plan note */}
        <div className="max-w-2xl mx-auto mb-12 relative z-10">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-7">
            <h4 className="text-white font-bold text-base mb-2">Prefer no subscription?</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              That&apos;s fine — we&apos;ll build your site and hand it over. Just know that
              without a plan, you&apos;re on your own for hosting, your domain, backups, security,
              and updates. We&apos;ll give you a quick walkthrough of how to set it up, but after
              that the upkeep is yours to manage.
            </p>
          </div>
        </div>

        {/* Pricing note */}
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-zinc-500 text-sm leading-relaxed">
            All plans require a one-time site build. Fill out our{' '}
            <Link href="/start" className="text-[var(--blue-300)] hover:underline">
              project form
            </Link>{' '}
            and we&apos;ll get you a build quote before anything starts.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
