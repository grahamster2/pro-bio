'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  UploadCloud,
  X,
  PartyPopper,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

/* ---------------------------------------------------------------- types --- */

type FormData = {
  contact: {
    fullName: string;
    businessName: string;
    phone: string;
    email: string;
    preferredContact: string;
    businessAddress: string;
    serviceAreas: string;
  };
  business: {
    description: string;
    services: string;
    priorityServices: string;
    differentiator: string;
    yearsInBusiness: string;
    employees: string;
    hours: string;
    emergencyServices: string;
    licensedInsured: string;
    certifications: string;
  };
  goals: {
    mainGoals: string[];
    primaryAction: string;
    successDefinition: string;
  };
  branding: {
    brandColors: string;
    fonts: string;
    tagline: string;
    styles: string[];
    websitesLiked: string;
    websitesDisliked: string;
    avoid: string;
  };
  content: {
    headline: string;
    subheadline: string;
    companyDescription: string;
    ctaText: string;
    companyStory: string;
    mission: string;
    team: string;
    ownerBio: string;
  };
  seo: {
    mainCity: string;
    additionalAreas: string;
    keywords: string;
    competitors: string;
    gbpLink: string;
    existingUrl: string;
    existingDomain: string;
    hostingProvider: string;
  };
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    linkedin: string;
  };
  features: string[];
  project: {
    launchDate: string;
    specialRequests: string;
    mustInclude: string;
    avoid: string;
    decisionMaker: string;
  };
  fileUrls: string[];
};

type Section = Exclude<keyof FormData, 'features' | 'fileUrls'>;

/* ------------------------------------------------------------ constants --- */

const MAIN_GOALS = [
  'Generate leads',
  'Phone calls',
  'Quote requests',
  'Bookings',
  'Brand awareness',
  'Portfolio showcase',
  'Hiring employees',
  'Online payments',
];

const PRIMARY_ACTIONS = [
  'Call',
  'Fill out form',
  'Book estimate',
  'Text',
  'Purchase',
];

const STYLE_OPTIONS = [
  'Modern',
  'Luxury',
  'Minimal',
  'Bold',
  'Rugged',
  'Corporate',
  'High-end',
  'Clean',
];

const FEATURE_OPTIONS = [
  'Contact form',
  'Quote request form',
  'Booking calendar',
  'Financing form',
  'Live chat',
  'Online payments',
  'Customer portal',
  'Careers page',
  'Blog',
  'Newsletter signup',
  'Social media feed',
  'Google reviews section',
  'Photo gallery',
  'Video gallery',
  'FAQ section',
];

const YES_NO = ['Yes', 'No'];

const STEP_TITLES = [
  'Your contact info',
  'About your business',
  'Your goals',
  'Look & feel',
  'Words for your site',
  'Getting found on Google',
  'Social media',
  'Features you want',
  'Files & final details',
];

const TOTAL_STEPS = STEP_TITLES.length;

const initialData: FormData = {
  contact: {
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    preferredContact: '',
    businessAddress: '',
    serviceAreas: '',
  },
  business: {
    description: '',
    services: '',
    priorityServices: '',
    differentiator: '',
    yearsInBusiness: '',
    employees: '',
    hours: '',
    emergencyServices: '',
    licensedInsured: '',
    certifications: '',
  },
  goals: { mainGoals: [], primaryAction: '', successDefinition: '' },
  branding: {
    brandColors: '',
    fonts: '',
    tagline: '',
    styles: [],
    websitesLiked: '',
    websitesDisliked: '',
    avoid: '',
  },
  content: {
    headline: '',
    subheadline: '',
    companyDescription: '',
    ctaText: '',
    companyStory: '',
    mission: '',
    team: '',
    ownerBio: '',
  },
  seo: {
    mainCity: '',
    additionalAreas: '',
    keywords: '',
    competitors: '',
    gbpLink: '',
    existingUrl: '',
    existingDomain: '',
    hostingProvider: '',
  },
  social: { facebook: '', instagram: '', tiktok: '', youtube: '', linkedin: '' },
  features: [],
  project: {
    launchDate: '',
    specialRequests: '',
    mustInclude: '',
    avoid: '',
    decisionMaker: '',
  },
  fileUrls: [],
};

/* ----------------------------------------------------------- ui helpers --- */

const inputClass = '';
const labelClass = 'text-sm font-medium text-neutral-400';

function Field({
  label,
  hint,
  required,
  errorMsg,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  required?: boolean;
  errorMsg?: string;
  children: React.ReactNode;
  className?: string;
}) {
  let styledChild = children;
  if (React.isValidElement(styledChild)) {
    const props = styledChild.props as any;
    const isSelect = styledChild.type === 'select';
    
    styledChild = React.cloneElement(styledChild as React.ReactElement<any>, {
      placeholder: " ",
      className: `${props.className || ''} ${isSelect && props.value ? 'has-value' : ''}`.trim()
    } as any);
  }

  const hasError = className.includes('error');

  return (
    <div className={`field ${className}`}>
      {styledChild}
      <label>
        {label}
        {required && <span className="text-[#38bdf8]"> *</span>}
      </label>
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
      {hint && !hasError && <p className="text-[11px] text-zinc-500 font-mono tracking-wide mt-2 pl-2 uppercase">{hint}</p>}
    </div>
  );
}

/* ------------------------------------------------------------- component --- */

export function IntakeForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showRequiredError, setShowRequiredError] = useState(false);

  const [stage, setStage] = useState<'lead' | 'choice' | 'intake'>('lead');
  const [leadMessage, setLeadMessage] = useState('');
  const [leadErrors, setLeadErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('rovult_lead_data');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setData((prev) => ({
            ...prev,
            contact: {
              ...prev.contact,
              fullName: parsed.fullName || '',
              email: parsed.email || '',
              phone: parsed.phone || '',
              businessName: parsed.businessName || '',
            },
            business: {
              ...prev.business,
              description: parsed.description || '',
            }
          }));

          const params = new URLSearchParams(window.location.search);
          if (params.get('from') === 'home') {
            setStage('intake');
            setStep(2);
          }
        } catch (e) {
          console.error('Error parsing stored lead data:', e);
        }
      }
    }
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const nextErrors: Record<string, boolean> = {};
    if (!data.contact.fullName.trim()) nextErrors.fullName = true;
    if (!data.contact.businessName.trim()) nextErrors.businessName = true;
    if (!data.contact.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.email)) {
      nextErrors.email = true;
    }
    if (!leadMessage.trim()) nextErrors.message = true;
    setLeadErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.contact.fullName,
          lastName: '',
          email: data.contact.email,
          projectDetails: `Business: ${data.contact.businessName}\nPhone: ${data.contact.phone || '—'}\n\nWhat they are looking for:\n${leadMessage}`,
        }),
      });
      if (!res.ok) throw new Error('Failed to send details. Please check your connection and try again.');
      
      // Pre-populate description of business so they don't have to retype it in the full form
      setData((prev) => ({
        ...prev,
        business: { ...prev.business, description: leadMessage }
      }));
      setStage('choice');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ---- generic setters ---- */
  function setField<S extends Section>(
    section: S,
    key: keyof FormData[S],
    value: string,
  ) {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  }

  function toggleInArray(
    section: 'goals' | 'branding' | null,
    key: 'mainGoals' | 'styles' | 'features',
    value: string,
  ) {
    setData((prev) => {
      if (key === 'features') {
        const list = prev.features;
        const next = list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value];
        return { ...prev, features: next };
      }
      const sec = section as 'goals' | 'branding';
      const list = (prev[sec] as unknown as Record<string, string[]>)[key];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...prev, [sec]: { ...prev[sec], [key]: next } };
    });
  }

  /* ---- validation ---- */
  const { fullName, businessName, email } = data.contact;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const requiredOk = !!fullName.trim() && !!businessName.trim() && emailValid;

  /* ---- file uploads ---- */
  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError('');
    const supabase = createClient();

    try {
      for (const file of Array.from(files)) {
        const sanitized = file.name
          .toLowerCase()
          .replace(/[^a-z0-9.]+/g, '-')
          .replace(/^-+|-+$/g, '');
        const path = `${Date.now()}-${sanitized}`;
        const { error } = await supabase.storage
          .from('intake-uploads')
          .upload(path, file);
        if (error) throw error;
        const { data: pub } = supabase.storage
          .from('intake-uploads')
          .getPublicUrl(path);
        const url = pub.publicUrl;
        setUploadedFiles((prev) => [...prev, { name: file.name, url }]);
        setData((prev) => ({ ...prev, fileUrls: [...prev.fileUrls, url] }));
      }
    } catch (err) {
      setUploadError(
        "Something went wrong uploading that file. Please try again, or skip it for now — we can grab it later.",
      );
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function removeFile(url: string) {
    setUploadedFiles((prev) => prev.filter((f) => f.url !== url));
    setData((prev) => ({
      ...prev,
      fileUrls: prev.fileUrls.filter((u) => u !== url),
    }));
  }

  /* ---- navigation ---- */
  function next() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---- submit ---- */
  async function handleSubmit() {
    if (!requiredOk) {
      setShowRequiredError(true);
      setStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Submission failed');
      }
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(
        "We couldn't send that just now. Give it another try in a moment — if it keeps happening, email us and we'll sort it out.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ------------------------------------------------------------- success -- */
  if (success) {
    return (
      <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8] rounded-full blur-[120px] opacity-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center mb-6">
            <PartyPopper className="w-8 h-8 text-[#38bdf8]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Thanks — we got everything.
          </h2>
          <p className="text-zinc-400 text-lg max-w-md mb-8 leading-relaxed">
            We&apos;ll be in touch within 1 business day to talk through your
            new website. Sit tight — you&apos;re in good hands.
          </p>
          <Link
            href="/"
            className="bg-white text-black font-bold rounded-full px-8 py-4 hover:bg-neutral-200 transition-colors"
            style={{ color: '#000000', backgroundColor: '#ffffff' }}
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------ progress -- */
  const progressPct = (step / TOTAL_STEPS) * 100;

  if (stage === 'lead') {
    return (
      <div className="form-card relative overflow-hidden">
        <form onSubmit={handleLeadSubmit} className="relative z-10 space-y-8">
          <div className="mb-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Tell us about your project</h2>
            <p className="text-zinc-400 leading-relaxed">
              Just a few basic details to get the conversation started. You can choose to provide more details afterward.
            </p>
          </div>

          <div className="form-grid">
            <Field
              label="Your name"
              required
              errorMsg="Name is required"
              className={`half ${leadErrors.fullName ? 'error' : ''}`}
            >
              <input
                value={data.contact.fullName}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, fullName: e.target.value },
                  }));
                  setLeadErrors((errs) => ({ ...errs, fullName: false }));
                }}
                required
              />
            </Field>

            <Field
              label="Business name"
              required
              errorMsg="Business name is required"
              className={`half ${leadErrors.businessName ? 'error' : ''}`}
            >
              <input
                value={data.contact.businessName}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, businessName: e.target.value },
                  }));
                  setLeadErrors((errs) => ({ ...errs, businessName: false }));
                }}
                required
              />
            </Field>

            <Field
              label="Email address"
              required
              errorMsg="Valid email is required"
              className={`half ${leadErrors.email ? 'error' : ''}`}
            >
              <input
                type="email"
                value={data.contact.email}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, email: e.target.value },
                  }));
                  setLeadErrors((errs) => ({ ...errs, email: false }));
                }}
                required
              />
            </Field>

            <Field
              label="Phone number (optional)"
              className="half"
            >
              <input
                type="tel"
                value={data.contact.phone}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, phone: e.target.value },
                  }))
                }
              />
            </Field>

            <Field
              label="What are you looking for in a website?"
              required
              errorMsg="Please describe what you need"
              className={leadErrors.message ? 'error' : ''}
            >
              <textarea
                rows={4}
                value={leadMessage}
                onChange={(e) => {
                  setLeadMessage(e.target.value);
                  setLeadErrors((errs) => ({ ...errs, message: false }));
                }}
                required
              />
            </Field>
          </div>

          {submitError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">
              {submitError}
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <small className="text-zinc-500">
              By submitting, you agree we can contact you. We never spam.
            </small>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold rounded-full px-8 py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50"
              style={{ color: '#000000', backgroundColor: '#ffffff' }}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Request <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (stage === 'choice') {
    return (
      <div className="form-card relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto py-6">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6" style={{ boxShadow: '0 0 16px rgba(255,255,255,0.05)' }}>
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Request received!
          </h2>
          <p className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed">
            We&apos;ve received your initial info.
            To help us give you a more accurate quote, would you like to customize your site features and design preferences now?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button
              type="button"
              onClick={() => {
                setStage('intake');
                setStep(2); // Skip contact info step as we already have it
              }}
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold rounded-full px-8 py-4 hover:bg-neutral-200 transition-all"
              style={{ color: '#000000', backgroundColor: '#ffffff' }}
            >
              Customize my site now <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setSuccess(true)}
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/10 text-white rounded-full px-8 py-4 hover:bg-white/5 transition-all"
            >
              No thanks, just email me
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card relative overflow-hidden">
      <div className="relative z-10">
        {/* progress */}
        <div className="form-card-head mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-white/5 pb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Project <span className="italic font-light text-zinc-400">intake</span></h3>
            <span className="text-xs font-mono text-zinc-500 tracking-wider uppercase mt-1 block">{STEP_TITLES[step - 1]}</span>
          </div>
          <div className="w-full sm:w-48">
            <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] text-zinc-400">
              <span>Step {step} of {TOTAL_STEPS}</span>
              <span>{Math.round(progressPct)}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${progressPct}%`, boxShadow: '0 0 8px #ffffff' }}
              />
            </div>
          </div>
        </div>

        {/* steps */}
        <div className="space-y-8">
          {step === 1 && (
            <Step1 data={data} setField={setField} showRequiredError={showRequiredError} emailValid={emailValid} />
          )}
          {step === 2 && <Step2 data={data} setField={setField} />}
          {step === 3 && (
            <Step3 data={data} setField={setField} toggleInArray={toggleInArray} />
          )}
          {step === 4 && (
            <Step4 data={data} setField={setField} toggleInArray={toggleInArray} />
          )}
          {step === 5 && <Step5 data={data} setField={setField} />}
          {step === 6 && <Step6 data={data} setField={setField} />}
          {step === 7 && <Step7 data={data} setField={setField} />}
          {step === 8 && <Step8 data={data} toggleInArray={toggleInArray} />}
          {step === 9 && (
            <Step9
              data={data}
              setField={setField}
              uploading={uploading}
              uploadError={uploadError}
              uploadedFiles={uploadedFiles}
              handleFiles={handleFiles}
              removeFile={removeFile}
            />
          )}
        </div>

        {/* submit error */}
        {submitError && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">
            {submitError}
          </div>
        )}

        {/* nav buttons */}
        <div className="mt-10 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/10 text-white rounded-full px-8 py-4 hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold rounded-full px-8 py-4 hover:bg-neutral-200 transition-colors"
              style={{ color: '#000000', backgroundColor: '#ffffff' }}
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || uploading}
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold rounded-full px-8 py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ color: '#000000', backgroundColor: '#ffffff' }}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </>
              ) : (
                'Submit'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------- shared sub-pieces --- */

type SetField = <S extends Section>(
  section: S,
  key: keyof FormData[S],
  value: string,
) => void;

type Toggle = (
  section: 'goals' | 'branding' | null,
  key: 'mainGoals' | 'styles' | 'features',
  value: string,
) => void;

function CheckGrid({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`flex items-center gap-3 text-left rounded-2xl border px-4 py-3.5 transition-all duration-200 ${
              active
                ? 'bg-white/10 border-white text-white shadow-[0_0_16px_rgba(255,255,255,0.05)]'
                : 'bg-white/[0.02] border-white/10 text-zinc-300 hover:border-white/20 hover:text-white'
            }`}
          >
            <span
              className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all ${
                active ? 'bg-white border-white' : 'border-white/20'
              }`}
            >
              {active && <Check className="w-3.5 h-3.5 text-black" />}
            </span>
            <span className="text-sm font-medium">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function RadioGroup({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
      {options.map((opt) => {
        const active = selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={`flex items-center gap-3 text-left rounded-2xl border px-4 py-3.5 transition-all duration-200 ${
              active
                ? 'bg-white/10 border-white text-white shadow-[0_0_16px_rgba(255,255,255,0.05)]'
                : 'bg-white/[0.02] border-white/10 text-zinc-300 hover:border-white/20 hover:text-white'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                active ? 'border-white bg-white' : 'border-white/20'
              }`}
            >
              {active && <span className="w-2 h-2 rounded-full bg-black" />}
            </span>
            <span className="text-sm font-medium">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-2">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
      <p className="text-zinc-400 leading-relaxed">{subtitle}</p>
    </div>
  );
}

/* -------------------------------------------------------------- step 1 ----- */
function Step1({
  data,
  setField,
  showRequiredError,
  emailValid,
}: {
  data: FormData;
  setField: SetField;
  showRequiredError: boolean;
  emailValid: boolean;
}) {
  const c = data.contact;
  return (
    <>
      <StepHeader
        title="First, how do we reach you?"
        subtitle="Just the basics so we know who you are and how to get in touch."
      />
      {showRequiredError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">
          Please fill in your name, business name, and a valid email so we can
          reach you.
        </div>
      )}
      <div className="form-grid">
        <Field
          label="Your full name"
          required
          className={`half ${showRequiredError && !c.fullName.trim() ? 'error' : ''}`}
          errorMsg="Name is required"
        >
          <input
            value={c.fullName}
            onChange={(e) => setField('contact', 'fullName', e.target.value)}
          />
        </Field>
        <Field
          label="Business name"
          required
          className={`half ${showRequiredError && !c.businessName.trim() ? 'error' : ''}`}
          errorMsg="Business name is required"
        >
          <input
            value={c.businessName}
            onChange={(e) => setField('contact', 'businessName', e.target.value)}
          />
        </Field>
        <Field label="Phone number" hint="So we can call or text if that's easier." className="half">
          <input
            value={c.phone}
            onChange={(e) => setField('contact', 'phone', e.target.value)}
            type="tel"
          />
        </Field>
        <Field
          label="Email"
          required
          className={`half ${showRequiredError && (!c.email.trim() || !emailValid) ? 'error' : ''}`}
          errorMsg="Valid email is required"
        >
          <input
            value={c.email}
            onChange={(e) => setField('contact', 'email', e.target.value)}
            type="email"
          />
        </Field>
        <Field label="Best way to reach you">
          <select
            value={c.preferredContact}
            onChange={(e) => setField('contact', 'preferredContact', e.target.value)}
          >
            <option value="">Pick one</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Email">Email</option>
          </select>
        </Field>
        <Field label="Business address" hint="Where you're based. Leave blank if you work out of your truck.">
          <input
            value={c.businessAddress}
            onChange={(e) => setField('contact', 'businessAddress', e.target.value)}
          />
        </Field>
        <Field label="Areas you serve" hint="Towns, cities, or how far you'll travel for a job.">
          <input
            value={c.serviceAreas}
            onChange={(e) => setField('contact', 'serviceAreas', e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- step 2 ----- */
function Step2({ data, setField }: { data: FormData; setField: SetField }) {
  const b = data.business;
  return (
    <>
      <StepHeader
        title="Tell us about your business"
        subtitle="The more we know, the better your site will fit you. Skip anything you're not sure about."
      />
      <div className="form-grid">
        <Field label="What does your business do?" hint="In plain words, like you'd tell a neighbor.">
          <textarea
            rows={3}
            value={b.description}
            onChange={(e) => setField('business', 'description', e.target.value)}
          />
        </Field>
        <Field label="Services you offer" hint="List them out — one per line is fine.">
          <textarea
            rows={3}
            value={b.services}
            onChange={(e) => setField('business', 'services', e.target.value)}
          />
        </Field>
        <Field label="Which services make you the most money?" hint="The ones you'd love more calls for.">
          <input
            value={b.priorityServices}
            onChange={(e) => setField('business', 'priorityServices', e.target.value)}
          />
        </Field>
        <Field label="What makes you different from the competition?">
          <textarea
            rows={2}
            value={b.differentiator}
            onChange={(e) => setField('business', 'differentiator', e.target.value)}
          />
        </Field>
        <Field label="Years in business" className="half">
          <input
            value={b.yearsInBusiness}
            onChange={(e) => setField('business', 'yearsInBusiness', e.target.value)}
          />
        </Field>
        <Field label="How many people on the team?" className="half">
          <input
            value={b.employees}
            onChange={(e) => setField('business', 'employees', e.target.value)}
          />
        </Field>
        <Field label="Business hours">
          <input
            value={b.hours}
            onChange={(e) => setField('business', 'hours', e.target.value)}
          />
        </Field>
        <Field label="Do you offer emergency / 24-7 service?" className="half">
          <select
            value={b.emergencyServices}
            onChange={(e) => setField('business', 'emergencyServices', e.target.value)}
          >
            <option value="">Pick one</option>
            {YES_NO.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Licensed & insured?" className="half">
          <select
            value={b.licensedInsured}
            onChange={(e) => setField('business', 'licensedInsured', e.target.value)}
          >
            <option value="">Pick one</option>
            {YES_NO.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Certifications or awards" hint="Anything that builds trust — licenses, BBB, manufacturer certs.">
          <input
            value={b.certifications}
            onChange={(e) => setField('business', 'certifications', e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- step 3 ----- */
function Step3({
  data,
  setField,
  toggleInArray,
}: {
  data: FormData;
  setField: SetField;
  toggleInArray: Toggle;
}) {
  return (
    <>
      <StepHeader
        title="What do you want this website to do?"
        subtitle="There's no wrong answer here — pick whatever matters most to you."
      />
      <div className="form-grid">
        <div className="budget-options">
          <div className="budget-options-label">Main goals (check all that apply)</div>
          <CheckGrid
            options={MAIN_GOALS}
            selected={data.goals.mainGoals}
            onToggle={(v) => toggleInArray('goals', 'mainGoals', v)}
          />
        </div>
        <div className="budget-options mt-6">
          <div className="budget-options-label">When someone lands on your site, what's the #1 thing you want them to do?</div>
          <RadioGroup
            options={PRIMARY_ACTIONS}
            selected={data.goals.primaryAction}
            onSelect={(v) => setField('goals', 'primaryAction', v)}
          />
        </div>
        <Field label="What would make this website a win for you?" hint="6 months from now, what does success look like?">
          <textarea
            rows={3}
            value={data.goals.successDefinition}
            onChange={(e) => setField('goals', 'successDefinition', e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- step 4 ----- */
function Step4({
  data,
  setField,
  toggleInArray,
}: {
  data: FormData;
  setField: SetField;
  toggleInArray: Toggle;
}) {
  const br = data.branding;
  return (
    <>
      <StepHeader
        title="How should it look and feel?"
        subtitle="Don't overthink it — just tell us what you like. We'll handle the design."
      />
      <div className="form-grid">
        <Field label="Brand colors" hint="If you have them — otherwise we'll suggest some." className="half">
          <input
            value={br.brandColors}
            onChange={(e) => setField('branding', 'brandColors', e.target.value)}
          />
        </Field>
        <Field label="Fonts you like" className="half">
          <input
            value={br.fonts}
            onChange={(e) => setField('branding', 'fonts', e.target.value)}
          />
        </Field>
        <Field label="Tagline or slogan" hint="A short line that sums you up, if you have one.">
          <input
            value={br.tagline}
            onChange={(e) => setField('branding', 'tagline', e.target.value)}
          />
        </Field>
        <div className="budget-options">
          <div className="budget-options-label">Styles that feel like you (check all that apply)</div>
          <CheckGrid
            options={STYLE_OPTIONS}
            selected={br.styles}
            onToggle={(v) => toggleInArray('branding', 'styles', v)}
          />
        </div>
        <Field label="Websites you like" hint="Paste a few links — competitors or any site you think looks great.">
          <textarea
            rows={2}
            value={br.websitesLiked}
            onChange={(e) => setField('branding', 'websitesLiked', e.target.value)}
          />
        </Field>
        <Field label="Websites you don't like">
          <textarea
            rows={2}
            value={br.websitesDisliked}
            onChange={(e) => setField('branding', 'websitesDisliked', e.target.value)}
          />
        </Field>
        <Field label="Anything to avoid?" hint="Colors, styles, or anything that's a hard no.">
          <textarea
            rows={2}
            value={br.avoid}
            onChange={(e) => setField('branding', 'avoid', e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- step 5 ----- */
function Step5({ data, setField }: { data: FormData; setField: SetField }) {
  const ct = data.content;
  return (
    <>
      <StepHeader
        title="Words for your site"
        subtitle="Don't worry about making it perfect — we'll polish everything. Just give us the gist."
      />
      <div className="form-grid">
        <Field label="Main headline" hint="The big line people see first. We can write this for you.">
          <input
            value={ct.headline}
            onChange={(e) => setField('content', 'headline', e.target.value)}
          />
        </Field>
        <Field label="Subheadline" hint="A supporting line under the headline.">
          <input
            value={ct.subheadline}
            onChange={(e) => setField('content', 'subheadline', e.target.value)}
          />
        </Field>
        <Field label="A short description of your company">
          <textarea
            rows={3}
            value={ct.companyDescription}
            onChange={(e) => setField('content', 'companyDescription', e.target.value)}
          />
        </Field>
        <Field label="Button text" hint="What the main button should say.">
          <input
            value={ct.ctaText}
            onChange={(e) => setField('content', 'ctaText', e.target.value)}
          />
        </Field>
        <Field label="Your story" hint="How did you get started? People love a good backstory.">
          <textarea
            rows={3}
            value={ct.companyStory}
            onChange={(e) => setField('content', 'companyStory', e.target.value)}
          />
        </Field>
        <Field label="Your mission" hint="What you're all about.">
          <textarea
            rows={2}
            value={ct.mission}
            onChange={(e) => setField('content', 'mission', e.target.value)}
          />
        </Field>
        <Field label="Team members" hint="Names and roles, if you'd like them on the site.">
          <input
            value={ct.team}
            onChange={(e) => setField('content', 'team', e.target.value)}
          />
        </Field>
        <Field label="A bit about you, the owner" hint="Optional, but a personal touch builds trust.">
          <textarea
            rows={2}
            value={ct.ownerBio}
            onChange={(e) => setField('content', 'ownerBio', e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- step 6 ----- */
function Step6({ data, setField }: { data: FormData; setField: SetField }) {
  const s = data.seo;
  return (
    <>
      <StepHeader
        title="Getting found on Google"
        subtitle="This helps the right local customers find you. Skip what you don't know."
      />
      <div className="form-grid">
        <Field label="Main city or town you want to rank in">
          <input
            value={s.mainCity}
            onChange={(e) => setField('seo', 'mainCity', e.target.value)}
          />
        </Field>
        <Field label="Other areas you'd like to show up in">
          <input
            value={s.additionalAreas}
            onChange={(e) => setField('seo', 'additionalAreas', e.target.value)}
          />
        </Field>
        <Field label="Words customers search to find you" hint="What would you type into Google to find your business?">
          <input
            value={s.keywords}
            onChange={(e) => setField('seo', 'keywords', e.target.value)}
          />
        </Field>
        <Field label="Competitors" hint="Who shows up when you search for your services?">
          <input
            value={s.competitors}
            onChange={(e) => setField('seo', 'competitors', e.target.value)}
          />
        </Field>
        <Field label="Google Business Profile link" hint="Your Google Maps / business listing, if you have one.">
          <input
            value={s.gbpLink}
            onChange={(e) => setField('seo', 'gbpLink', e.target.value)}
          />
        </Field>
        <Field label="Current website" hint="If you already have one.">
          <input
            value={s.existingUrl}
            onChange={(e) => setField('seo', 'existingUrl', e.target.value)}
          />
        </Field>
        <Field label="Domain name" hint="The web address you own or want." className="half">
          <input
            value={s.existingDomain}
            onChange={(e) => setField('seo', 'existingDomain', e.target.value)}
          />
        </Field>
        <Field label="Who hosts your site?" hint="If you know — totally fine if you don't." className="half">
          <input
            value={s.hostingProvider}
            onChange={(e) => setField('seo', 'hostingProvider', e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- step 7 ----- */
function Step7({ data, setField }: { data: FormData; setField: SetField }) {
  const so = data.social;
  return (
    <>
      <StepHeader
        title="Social media"
        subtitle="Drop in any profiles you'd like linked on your site. Skip the ones you don't use."
      />
      <div className="form-grid">
        <Field label="Facebook">
          <input
            value={so.facebook}
            onChange={(e) => setField('social', 'facebook', e.target.value)}
          />
        </Field>
        <Field label="Instagram">
          <input
            value={so.instagram}
            onChange={(e) => setField('social', 'instagram', e.target.value)}
          />
        </Field>
        <Field label="TikTok">
          <input
            value={so.tiktok}
            onChange={(e) => setField('social', 'tiktok', e.target.value)}
          />
        </Field>
        <Field label="YouTube">
          <input
            value={so.youtube}
            onChange={(e) => setField('social', 'youtube', e.target.value)}
          />
        </Field>
        <Field label="LinkedIn">
          <input
            value={so.linkedin}
            onChange={(e) => setField('social', 'linkedin', e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- step 8 ----- */
function Step8({ data, toggleInArray }: { data: FormData; toggleInArray: Toggle }) {
  return (
    <>
      <StepHeader
        title="What should your site have?"
        subtitle="Pick the features you'd like. Not sure? Check it anyway — we'll talk it through."
      />
      <div className="form-grid">
        <div className="budget-options">
          <div className="budget-options-label">Pick the features you'd like (check all that apply)</div>
          <CheckGrid
            options={FEATURE_OPTIONS}
            selected={data.features}
            onToggle={(v) => toggleInArray(null, 'features', v)}
          />
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- step 9 ----- */
function Step9({
  data,
  setField,
  uploading,
  uploadError,
  uploadedFiles,
  handleFiles,
  removeFile,
}: {
  data: FormData;
  setField: SetField;
  uploading: boolean;
  uploadError: string;
  uploadedFiles: { name: string; url: string }[];
  handleFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (url: string) => void;
}) {
  const p = data.project;
  return (
    <>
      <StepHeader
        title="Last bit — files & details"
        subtitle="Upload your logo, photos of your work, anything helpful. Then a few final questions."
      />

      <div className="form-grid">
        <div className="budget-options">
          <div className="budget-options-label">Upload files</div>
          <label className="flex flex-col items-center justify-center gap-3 w-full bg-white/5 border border-dashed border-white/10 rounded-2xl px-4 py-10 text-center cursor-pointer hover:border-white/20 transition-colors mt-2">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : (
              <UploadCloud className="w-8 h-8 text-zinc-400" />
            )}
            <span className="text-sm text-zinc-300 font-medium font-sans">
              {uploading ? 'Uploading…' : 'Tap to choose files'}
            </span>
            <span className="text-xs text-zinc-500 font-sans">
              Photos, logo, PDFs — whatever you&apos;ve got.
            </span>
            <input
              type="file"
              multiple
              onChange={handleFiles}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <div className="text-[10px] text-zinc-500 font-mono tracking-wide mt-2 pl-2 uppercase">
            Logo, job photos, your old site's images — anything. You can add several.
          </div>
        </div>

        {uploadError && (
          <div className="col-span-2 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">
            {uploadError}
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="col-span-2 mt-2">
            <ul className="space-y-2">
              {uploadedFiles.map((f) => (
                <li
                  key={f.url}
                  className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <span className="text-sm text-zinc-200 truncate flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">{f.name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(f.url)}
                    className="text-zinc-500 hover:text-red-400 transition-colors shrink-0"
                    aria-label={`Remove ${f.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Field label="When would you like to launch?" hint="A target date is fine — no pressure.">
          <input
            type="date"
            value={p.launchDate}
            onChange={(e) => setField('project', 'launchDate', e.target.value)}
          />
        </Field>
        <Field label="Any special requests?">
          <textarea
            rows={2}
            value={p.specialRequests}
            onChange={(e) => setField('project', 'specialRequests', e.target.value)}
          />
        </Field>
        <Field label="Must-haves" hint="Anything the site absolutely needs to have.">
          <textarea
            rows={2}
            value={p.mustInclude}
            onChange={(e) => setField('project', 'mustInclude', e.target.value)}
          />
        </Field>
        <Field label="Anything to avoid?">
          <textarea
            rows={2}
            value={p.avoid}
            onChange={(e) => setField('project', 'avoid', e.target.value)}
          />
        </Field>
        <Field label="Who makes the final call on the project?" hint="So we know who to check in with.">
          <input
            value={p.decisionMaker}
            onChange={(e) => setField('project', 'decisionMaker', e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}
