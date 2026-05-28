'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const BUDGETS = [
  { v: 'under-2k', label: 'Under $2k' },
  { v: '2-5k', label: '$2k – $5k' },
  { v: '5-10k', label: '$5k – $10k' },
  { v: '10k+', label: '$10k+' },
  { v: 'unsure', label: 'Not sure yet' },
];

const FAQS = [
  {
    q: 'How much does a website cost?',
    a: 'Most local-business sites land between $2,400 and $4,800 — a one-time build with no surprise fees. Hosting and ongoing care plans start at $79/mo. We send you a fixed quote before any work begins.',
  },
  {
    q: 'How long does it take?',
    a: "Four weeks from kickoff to launch is our standard timeline. We've shipped in two when needed. The biggest factor is how quickly you can get us photos, copy notes, and feedback.",
  },
  {
    q: 'Will I be able to update it myself?',
    a: 'Yes. We build on a simple CMS so you can swap photos, add services, and edit copy without touching code. Or — most clients just text us and we handle it.',
  },
  {
    q: 'Do you help with Google rankings?',
    a: 'Every site we build has technical SEO, location pages, and a Google Business Profile setup included. For ongoing rank-building, our Growth plan adds monthly content, citations, and review collection.',
  },
  {
    q: 'What if I already have a website?',
    a: "If it works, we don't replace it. We'll audit it for free and tell you exactly what's holding it back. Sometimes the right answer is a few targeted upgrades, not a rebuild.",
  },
];

export default function AuroraHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [budget, setBudget] = useState('2-5k');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    business: '',
    industry: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.15 }
    );
    rootRef.current?.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const next: Record<string, boolean> = {};
    if (!form.firstName.trim()) next.firstName = true;
    if (!form.lastName.trim()) next.lastName = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = true;
    if (!form.business.trim()) next.business = true;
    if (!form.message.trim()) next.message = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    const budgetLabel = BUDGETS.find((b) => b.v === budget)?.label ?? budget;
    const projectDetails = [
      `Business: ${form.business}`,
      `Industry: ${form.industry || '—'}`,
      `Budget: ${budgetLabel}`,
      `Phone: ${form.phone || '—'}`,
      '',
      form.message,
    ].join('\n');

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          projectDetails,
        }),
      });
      if (!res.ok) throw new Error('Something went wrong. Please try again or email us directly.');
      setSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="aurora-page" ref={rootRef}>
      {/* NAV */}
      <div className="nav-wrap">
        <nav className="nav">
          <a className="nav-logo" href="#top">rovult<span className="dot">.</span></a>
          <div className="nav-links">
            <a className="nav-link" href="#work" onClick={scrollTo('work')}>Work</a>
            <a className="nav-link" href="#services" onClick={scrollTo('services')}>Services</a>
            <Link className="nav-link" href="/plans">Plans</Link>
            <a className="nav-link" href="#process" onClick={scrollTo('process')}>Process</a>
            <a className="nav-link" href="#contact" onClick={scrollTo('contact')}>Contact</a>
          </div>
          <button className="nav-cta" onClick={scrollTo('contact')}>
            Start Project
            <Arrow />
          </button>
        </nav>
      </div>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="aurora">
          <div className="aurora-grain" />
          <div className="aurora-vignette" />
        </div>
        <div className="hero-inner">
          <span className="eyebrow">Websites for local business</span>
          <h1>
            A website that <span className="italic">actually</span>
            <br />
            brings in customers.
          </h1>
          <p>
            You&apos;re great at your job — but if people can&apos;t find you online, you&apos;re losing
            business to someone who isn&apos;t. We handle the website so you don&apos;t have to.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={scrollTo('contact')}>
              Get a free quote
              <Arrow />
            </button>
            <a className="btn btn-ghost" href="#work" onClick={scrollTo('work')}>See our work</a>
          </div>
          <div className="hero-meta">
            <div className="avatars"><span /><span /><span /></div>
            <div>
              <span className="stars">★★★★★</span> &nbsp;Trusted by{' '}
              <strong style={{ color: 'var(--text)' }}>40+</strong> local businesses
            </div>
          </div>
        </div>
      </header>

      {/* LOGOS */}
      <section className="logos">
        <div className="container">
          <div className="logos-label">Helping owner-operators across the country</div>
          <div className="logos-track">
            <span className="logo-mark">Cedar &amp; Pine</span>
            <span className="logo-mark caps">North Bay HVAC</span>
            <span className="logo-mark sans">Atlas<span className="accent">&amp;</span>Co</span>
            <span className="logo-mark mono">// kestrel.law</span>
            <span className="logo-mark">Maison Bleu</span>
            <span className="logo-mark caps">Ironside</span>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" id="process">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">How we work</span>
            <h2>A simple process,<br /><span className="italic">no fluff.</span></h2>
            <p>Four weeks from kickoff to launch. You stay in your lane — running your business — while we handle every detail.</p>
          </div>

          <div className="process-grid reveal">
            <div className="process-step">
              <div>
                <div className="step-num">STEP 01 — WEEK 1</div>
                <div className="step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></svg>
                </div>
                <h3>Discovery <span className="italic">&amp;</span> strategy</h3>
                <p>A 45-minute call. We learn your business, your customers, and what makes you different. You&apos;ll get a written plan before we write a line of code.</p>
              </div>
            </div>

            <div className="process-step">
              <div>
                <div className="step-num">STEP 02 — WEEK 2</div>
                <div className="step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 21h8M12 18v3" /></svg>
                </div>
                <h3>Design <span className="italic">that fits</span></h3>
                <p>You see the design before development starts. Two rounds of revisions included. We don&apos;t move forward until you love what you see.</p>
              </div>
            </div>

            <div className="process-step">
              <div>
                <div className="step-num">STEP 03 — WEEK 3</div>
                <div className="step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
                </div>
                <h3>Build <span className="italic">&amp;</span> tune</h3>
                <p>Fast, accessible, hand-coded — not a bloated theme. Built for Google to find and customers to convert. SEO and analytics baked in.</p>
              </div>
            </div>

            <div className="process-step">
              <div>
                <div className="step-num">STEP 04 — WEEK 4</div>
                <div className="step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M5 12l5 5L20 7" /></svg>
                </div>
                <h3>Launch <span className="italic">&amp; grow</span></h3>
                <p>We push it live, hand over the keys, and stick around. Monthly check-ins, updates, and edits as your business evolves.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" id="work" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">What clients say</span>
            <h2>Real results from<br /><span className="italic">real businesses.</span></h2>
          </div>

          <div className="testimonials-grid reveal">
            <div className="testimonial featured">
              <div className="stars">★★★★★</div>
              <blockquote className="quote">
                “Rovult handled <span className="italic">everything.</span> Within two months our phone was ringing with new jobs every week. They understood exactly what we needed to grow our local business.”
              </blockquote>
              <div className="testimonial-author">
                <div className="author-avatar" />
                <div>
                  <div className="author-name">Marcus Hale</div>
                  <div className="author-role">Owner · Hale &amp; Sons Roofing · Asheville, NC</div>
                </div>
              </div>
            </div>

            <div className="testimonial">
              <div className="stars">★★★★★</div>
              <blockquote className="quote">“We went from page four of Google to the top of the map pack in our city. <span className="italic">Worth every penny.</span>”</blockquote>
              <div className="testimonial-author">
                <div className="author-avatar" />
                <div>
                  <div className="author-name">Priya Anand</div>
                  <div className="author-role">Founder · North Bay HVAC</div>
                </div>
              </div>
            </div>

            <div className="testimonial">
              <div className="stars">★★★★★</div>
              <blockquote className="quote">“They actually <span className="italic">listened.</span> The site sounds like us and books appointments while we sleep.”</blockquote>
              <div className="testimonial-author">
                <div className="author-avatar" />
                <div>
                  <div className="author-name">Daniel Okafor</div>
                  <div className="author-role">Partner · Kestrel Law Group</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="services" style={{ paddingTop: 0 }}>
        <div className="narrow">
          <div className="section-head reveal" style={{ textAlign: 'left', maxWidth: 'none' }}>
            <span className="eyebrow">Frequently asked</span>
            <h2 style={{ textAlign: 'left' }}>Questions, <span className="italic">answered.</span></h2>
          </div>

          <div className="faq-list reveal">
            {FAQS.map((item, i) => (
              <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  {item.q}
                  <span className="faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width="14" height="14"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                <div className="faq-a"><p>{item.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-glow" />
        <div className="container">
          <div className="contact-grid">
            <div className="contact-intro reveal">
              <span className="eyebrow">Start a project</span>
              <h2>Let&apos;s <span className="italic">talk shop.</span></h2>
              <p>Tell us a bit about your business and we&apos;ll send back a free audit of where you stand and what we&apos;d do — usually within 24 hours.</p>

              <div className="contact-info">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 4h16v16H4z M4 7l8 6 8-6" /></svg>
                  </div>
                  <div>
                    <div className="contact-info-label">Email</div>
                    <div className="contact-info-value">hello@rovult.com</div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>
                  </div>
                  <div>
                    <div className="contact-info-label">Phone</div>
                    <div className="contact-info-value">(828) 555-0142</div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 018 8c0 6-8 12-8 12s-8-6-8-12a8 8 0 018-8z" /></svg>
                  </div>
                  <div>
                    <div className="contact-info-label">Based in</div>
                    <div className="contact-info-value">Asheville, NC · serving everywhere</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="form-card reveal" onSubmit={handleSubmit} noValidate>
              <div className="form-card-head">
                <h3>Project <span className="italic">brief</span></h3>
                <div className="form-card-meta">24-hour response</div>
              </div>

              {!success ? (
                <div className="form-grid">
                  <div className={`field half${errors.firstName ? ' error' : ''}`}>
                    <input type="text" id="firstName" placeholder=" " value={form.firstName} onChange={set('firstName')} />
                    <label htmlFor="firstName">First name</label>
                    <div className="error-msg">Required</div>
                  </div>
                  <div className={`field half${errors.lastName ? ' error' : ''}`}>
                    <input type="text" id="lastName" placeholder=" " value={form.lastName} onChange={set('lastName')} />
                    <label htmlFor="lastName">Last name</label>
                    <div className="error-msg">Required</div>
                  </div>
                  <div className={`field half${errors.email ? ' error' : ''}`}>
                    <input type="email" id="email" placeholder=" " value={form.email} onChange={set('email')} />
                    <label htmlFor="email">Email address</label>
                    <div className="error-msg">Enter a valid email</div>
                  </div>
                  <div className="field half">
                    <input type="tel" id="phone" placeholder=" " value={form.phone} onChange={set('phone')} />
                    <label htmlFor="phone">Phone (optional)</label>
                  </div>
                  <div className={`field${errors.business ? ' error' : ''}`}>
                    <input type="text" id="business" placeholder=" " value={form.business} onChange={set('business')} />
                    <label htmlFor="business">Business name</label>
                    <div className="error-msg">Required</div>
                  </div>
                  <div className="field">
                    <select id="industry" className={form.industry ? 'has-value' : ''} value={form.industry} onChange={set('industry')}>
                      <option value=""></option>
                      <option>Home services (HVAC, plumbing, roofing)</option>
                      <option>Health &amp; wellness</option>
                      <option>Legal / professional services</option>
                      <option>Restaurant / hospitality</option>
                      <option>Retail / e-commerce</option>
                      <option>Other</option>
                    </select>
                    <label htmlFor="industry">Industry</label>
                  </div>
                  <div className={`field${errors.message ? ' error' : ''}`}>
                    <textarea id="message" placeholder=" " value={form.message} onChange={set('message')} />
                    <label htmlFor="message">Tell us about your business and what you need</label>
                    <div className="error-msg">Tell us a little about the project</div>
                  </div>

                  <div className="budget-options">
                    <div className="budget-options-label">Project budget</div>
                    <div className="budget-pills">
                      {BUDGETS.map((b) => (
                        <button
                          type="button"
                          key={b.v}
                          className={`budget-pill${budget === b.v ? ' active' : ''}`}
                          onClick={() => setBudget(b.v)}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-submit">
                    <small>
                      {submitError ? (
                        <span style={{ color: '#fca5a5' }}>{submitError}</span>
                      ) : (
                        <>By submitting, you agree to our <span className="blue">terms</span>. We never share your info.</>
                      )}
                    </small>
                    <button type="submit" className="submit-btn" disabled={submitting}>
                      {submitting ? 'Sending…' : 'Send brief'}
                      {!submitting && <Arrow />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="form-success show">
                  <div className="form-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width="28" height="28"><path d="M5 12l5 5L20 7" /></svg>
                  </div>
                  <h4>Brief <span className="italic">received.</span></h4>
                  <p>Thanks — we&apos;ll review and reply within 24 hours. Keep an eye on your inbox.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand-name">rovult<span className="dot">.</span></div>
              <div className="footer-brand-tag">Websites that bring in customers for the people who built the business.</div>
            </div>
            <div className="footer-col">
              <h5>Services</h5>
              <a href="#services" onClick={scrollTo('services')}>Websites</a>
              <a href="#services" onClick={scrollTo('services')}>Local SEO</a>
              <a href="#services" onClick={scrollTo('services')}>Care plans</a>
              <a href="#services" onClick={scrollTo('services')}>Audits</a>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <a href="#work" onClick={scrollTo('work')}>Work</a>
              <a href="#process" onClick={scrollTo('process')}>Process</a>
              <Link href="/plans">Plans</Link>
              <Link href="/start">Start a project</Link>
              <a href="#contact" onClick={scrollTo('contact')}>Contact</a>
            </div>
            <div className="footer-col">
              <h5>Get in touch</h5>
              <a href="mailto:hello@rovult.com">hello@rovult.com</a>
              <a href="#contact" onClick={scrollTo('contact')}>Book a call</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© {new Date().getFullYear()} Rovult LLC</div>
            <div>Made in Asheville, NC</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
