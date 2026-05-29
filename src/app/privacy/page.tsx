import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Rovult',
  description: 'How Rovult LLC handles and protects your personal data.',
};

export default function PrivacyPage() {
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
            <span className="eyebrow mb-4">Legal Framework</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: 'var(--display)', letterSpacing: '-0.04em' }}>
              Privacy <br /><span className="italic font-light text-zinc-400" style={{ fontWeight: 300, letterSpacing: '-0.045em' }}>policy.</span>
            </h1>
            <p className="text-neutral-400 text-sm">Last updated: May 28, 2026</p>
          </div>

          {/* Legal Text */}
          <div className="bg-[#0b0c10]/40 border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl relative z-10 space-y-8 text-neutral-300 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>1. Overview</h2>
              <p>
                Rovult LLC ("we", "us", or "our") operates the website located at rovult.com (the "Service"). This Privacy Policy describes how we collect, use, and share personal information about you when you interact with our website, submit project inquiry forms, or engage us to design and develop your website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>2. Information We Collect</h2>
              <p className="mb-4">
                We collect personal information directly from you when you interact with our Service, specifically when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Submit a contact inquiry form (name, email address, phone number, company name, project details).</li>
                <li>Fill out our project intake questionnaire (business area, service list, company backstory, target competitors).</li>
                <li>Communicate with us via email or phone.</li>
              </ul>
              <p className="mt-4">
                We also automatically collect standard traffic data, IP addresses, browser types, page interaction logs, and referral parameters using third-party analytics tools (such as Google Analytics and Vercel Analytics) to monitor and improve our website's user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>3. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to operate, maintain, and provide the features of our Service. Specifically, we use your data to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your project inquiries, phone calls, and email messages.</li>
                <li>Process your intake forms to construct your website designs and custom SEO plans.</li>
                <li>Perform internal analytics to refine our design workflows, speed performance, and interface conversion rates.</li>
                <li>Send you project-related updates, invoices, or marketing communications (which you can opt-out of at any time).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>4. Sharing of Information</h2>
              <p>
                We do not sell, rent, trade, or distribute your personal information to third parties. We may share your information with trusted third-party service providers (such as hosting partners, email delivery platforms like Resend, and database services like Supabase) only to the extent necessary to deliver our services. We may also disclose your information if required to do so by law or in response to valid requests by public authorities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>5. Data Security</h2>
              <p>
                We implement robust security measures to protect the integrity and safety of your personal data. We compile our website static assets using secure headless architectures to eliminate database breach surfaces. However, please be aware that no method of transmission over the internet, or method of electronic storage, is 100% secure, and we cannot guarantee absolute data security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>6. Your Rights &amp; Choices</h2>
              <p>
                Depending on your location, you may have rights under local privacy regulations (such as the GDPR or CCPA) to access, correct, delete, or limit the use of your personal data. You can exercise these rights at any time by contacting us directly at <a href="mailto:hello@rovult.com" className="text-[#38bdf8] hover:underline">hello@rovult.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--display)' }}>7. Contact Us</h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy, please contact us:
              </p>
              <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-2xl space-y-1 text-sm">
                <div className="font-bold text-white">Rovult LLC</div>
                <div>Email: hello@rovult.com</div>
                <div>Phone: (859) 312-8778</div>
                <div>Location: Lexington, KY</div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
