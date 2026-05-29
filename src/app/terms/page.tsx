import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Rovult',
  description: 'Terms and conditions governing website design, development, and care plan services provided by Rovult LLC.',
};

export default function TermsPage() {
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
          
          {/* Header */}
          <div className="mb-16 relative z-10">
            <span className="eyebrow mb-4">Agreement Conditions</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: 'var(--display)', letterSpacing: '-0.04em' }}>
              Terms of <br /><span className="italic font-light text-zinc-400" style={{ fontWeight: 300, letterSpacing: '-0.045em' }}>service.</span>
            </h1>
            <p className="text-neutral-400 text-sm">Last updated: May 28, 2026</p>
          </div>

          {/* Legal Text */}
          <div className="bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl relative z-10 space-y-8 text-neutral-300 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>1. Acceptance of Terms</h2>
              <p>
                By accessing our website or engaging Rovult LLC ("we", "us", or "our") to perform web design, local SEO, website auditing, or hosting care plan services, you ("Client", "User") agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, you must not access our website or utilize our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>2. Scope of Services</h2>
              <p className="mb-4">
                We provide custom digital solutions including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>**Custom Web Design &amp; Development**: Design and coding of static/headless websites using React &amp; Next.js.</li>
                <li>**Local SEO Campaigns**: Optimization of Google Business Profiles, citation mapping, and localized landing pages.</li>
                <li>**Technical Site Audits**: Diagnostics on page load speed, UX blockers, and search visibility.</li>
                <li>**Hosting &amp; Care Plans**: Continuous domain management, hosting, security updates, and design modifications as specified in your subscription.</li>
              </ul>
              <p className="mt-4">
                The exact scope, timelines, deliverables, and fees for any specific custom project will be detailed in a separate written project proposal signed by both parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>3. Client Responsibilities</h2>
              <p>
                To complete projects within estimated timeframes, the Client agrees to collaborate constructively by providing necessary content assets (copy, branding guidelines, specific imagery, access details) and providing prompt design and prototype review feedback. We are not liable for project launch delays resulting from Client inaction or missing assets.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>4. Fees, Payments &amp; Care Plans</h2>
              <p className="mb-4">
                * **Bespoke Projects**: Typically require a 50% upfront deposit before design work begins, with the remaining 50% due immediately upon project completion and before the final website goes live.
                * **Care Plans**: Hosting and maintenance services are billed on a recurring monthly or annual subscription. Subscriptions are billed in advance on an automatic cycle.
                * **Cancellations**: You can cancel your monthly care plan subscription at any time with a 30-day written notice. We do not offer partial refunds for mid-cycle cancellations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>5. Intellectual Property &amp; Ownership</h2>
              <p>
                Upon receipt of full final payment for a custom web build, we transfer all ownership rights of the final frontend visual design, customized codebase, and website layout to the Client. We retain the intellectual property rights to any underlying frameworks, starter templates, pre-existing code modules, or proprietary tools utilized during construction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>6. Warranties &amp; Limitation of Liability</h2>
              <p>
                We build all custom websites to perform with sub-millisecond edge load speeds and comply with modern web security practices. However, we do not warrant that your website will operate without temporary interruptions or errors, or that Google search engine rankings will increase by specific margins. In no event shall Rovult LLC be liable for any indirect, incidental, or consequential damages (including loss of business profits or data) arising from your website operation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>7. Governing Law</h2>
              <p>
                These Terms of Service and any project agreements entered into with us shall be governed by, and construed in accordance with, the laws of the **State of Kentucky, USA**, without regard to its conflict of law principles. Any legal action arising hereunder shall be brought exclusively in courts located in Lexington, KY.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
