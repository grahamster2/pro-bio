'use client';

import { useState } from 'react';
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

const inputClass =
  'w-full bg-[#121212] border border-[#27272a] rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:border-[#38bdf8] transition-colors';
const labelClass = 'text-sm font-medium text-neutral-400';

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className={labelClass}>
        {label}
        {required && <span className="text-[#38bdf8]"> *</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-zinc-500 leading-relaxed">{hint}</p>}
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
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------ progress -- */
  const progressPct = (step / TOTAL_STEPS) * 100;

  return (
    <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8] rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <div className="relative z-10">
        {/* progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[#38bdf8]">
              Step {step} of {TOTAL_STEPS}
            </span>
            <span className="text-sm text-zinc-500">{STEP_TITLES[step - 1]}</span>
          </div>
          <div className="w-full h-2 bg-[#121212] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#38bdf8] rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* steps */}
        <div className="space-y-6">
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
              className="inline-flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 text-white rounded-full px-8 py-4 hover:bg-zinc-800 transition-colors"
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
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || uploading}
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold rounded-full px-8 py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`flex items-center gap-3 text-left rounded-lg border px-4 py-3 transition-colors ${
              active
                ? 'bg-[#38bdf8]/10 border-[#38bdf8] text-white'
                : 'bg-[#121212] border-[#27272a] text-zinc-300 hover:border-zinc-600'
            }`}
          >
            <span
              className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                active ? 'bg-[#38bdf8] border-[#38bdf8]' : 'border-zinc-600'
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const active = selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={`flex items-center gap-3 text-left rounded-lg border px-4 py-3 transition-colors ${
              active
                ? 'bg-[#38bdf8]/10 border-[#38bdf8] text-white'
                : 'bg-[#121212] border-[#27272a] text-zinc-300 hover:border-zinc-600'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                active ? 'border-[#38bdf8]' : 'border-zinc-600'
              }`}
            >
              {active && <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Your full name" required>
          <input
            className={inputClass}
            value={c.fullName}
            onChange={(e) => setField('contact', 'fullName', e.target.value)}
            placeholder="John Smith"
          />
        </Field>
        <Field label="Business name" required>
          <input
            className={inputClass}
            value={c.businessName}
            onChange={(e) => setField('contact', 'businessName', e.target.value)}
            placeholder="Smith Plumbing"
          />
        </Field>
        <Field label="Phone number" hint="So we can call or text if that's easier.">
          <input
            className={inputClass}
            value={c.phone}
            onChange={(e) => setField('contact', 'phone', e.target.value)}
            placeholder="(555) 123-4567"
            type="tel"
          />
        </Field>
        <Field label="Email" required>
          <input
            className={inputClass}
            value={c.email}
            onChange={(e) => setField('contact', 'email', e.target.value)}
            placeholder="john@smithplumbing.com"
            type="email"
          />
          {showRequiredError && c.email && !emailValid && (
            <p className="text-xs text-red-400">That email looks off — mind double-checking it?</p>
          )}
        </Field>
      </div>
      <Field label="Best way to reach you">
        <select
          className={inputClass}
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
          className={inputClass}
          value={c.businessAddress}
          onChange={(e) => setField('contact', 'businessAddress', e.target.value)}
          placeholder="123 Main St, Springfield"
        />
      </Field>
      <Field label="Areas you serve" hint="Towns, cities, or how far you'll travel for a job.">
        <input
          className={inputClass}
          value={c.serviceAreas}
          onChange={(e) => setField('contact', 'serviceAreas', e.target.value)}
          placeholder="Springfield and within 30 miles"
        />
      </Field>
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
      <Field label="What does your business do?" hint="In plain words, like you'd tell a neighbor.">
        <textarea
          rows={3}
          className={inputClass}
          value={b.description}
          onChange={(e) => setField('business', 'description', e.target.value)}
          placeholder="We do residential plumbing — repairs, installs, and emergencies."
        />
      </Field>
      <Field label="Services you offer" hint="List them out — one per line is fine.">
        <textarea
          rows={3}
          className={inputClass}
          value={b.services}
          onChange={(e) => setField('business', 'services', e.target.value)}
          placeholder="Drain cleaning, water heater installs, leak repair..."
        />
      </Field>
      <Field label="Which services make you the most money?" hint="The ones you'd love more calls for.">
        <input
          className={inputClass}
          value={b.priorityServices}
          onChange={(e) => setField('business', 'priorityServices', e.target.value)}
          placeholder="Water heater installs, repipes"
        />
      </Field>
      <Field label="What makes you different from the competition?">
        <textarea
          rows={2}
          className={inputClass}
          value={b.differentiator}
          onChange={(e) => setField('business', 'differentiator', e.target.value)}
          placeholder="Family-owned, upfront pricing, we show up on time."
        />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Years in business">
          <input
            className={inputClass}
            value={b.yearsInBusiness}
            onChange={(e) => setField('business', 'yearsInBusiness', e.target.value)}
            placeholder="12"
          />
        </Field>
        <Field label="How many people on the team?">
          <input
            className={inputClass}
            value={b.employees}
            onChange={(e) => setField('business', 'employees', e.target.value)}
            placeholder="4"
          />
        </Field>
      </div>
      <Field label="Business hours">
        <input
          className={inputClass}
          value={b.hours}
          onChange={(e) => setField('business', 'hours', e.target.value)}
          placeholder="Mon–Fri 8am–6pm, Sat by appointment"
        />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Do you offer emergency / 24-7 service?">
          <select
            className={inputClass}
            value={b.emergencyServices}
            onChange={(e) => setField('business', 'emergencyServices', e.target.value)}
          >
            <option value="">Pick one</option>
            {YES_NO.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Licensed & insured?">
          <select
            className={inputClass}
            value={b.licensedInsured}
            onChange={(e) => setField('business', 'licensedInsured', e.target.value)}
          >
            <option value="">Pick one</option>
            {YES_NO.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Certifications or awards" hint="Anything that builds trust — licenses, BBB, manufacturer certs.">
        <input
          className={inputClass}
          value={b.certifications}
          onChange={(e) => setField('business', 'certifications', e.target.value)}
          placeholder="Master Plumber License #12345, BBB A+"
        />
      </Field>
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
      <Field label="Main goals" hint="Check all that apply.">
        <CheckGrid
          options={MAIN_GOALS}
          selected={data.goals.mainGoals}
          onToggle={(v) => toggleInArray('goals', 'mainGoals', v)}
        />
      </Field>
      <Field label="When someone lands on your site, what's the #1 thing you want them to do?">
        <RadioGroup
          options={PRIMARY_ACTIONS}
          selected={data.goals.primaryAction}
          onSelect={(v) => setField('goals', 'primaryAction', v)}
        />
      </Field>
      <Field label="What would make this website a win for you?" hint="6 months from now, what does success look like?">
        <textarea
          rows={3}
          className={inputClass}
          value={data.goals.successDefinition}
          onChange={(e) => setField('goals', 'successDefinition', e.target.value)}
          placeholder="More phone calls and a few new jobs a month from the site."
        />
      </Field>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Brand colors" hint="If you have them — otherwise we'll suggest some.">
          <input
            className={inputClass}
            value={br.brandColors}
            onChange={(e) => setField('branding', 'brandColors', e.target.value)}
            placeholder="Navy blue and orange"
          />
        </Field>
        <Field label="Fonts you like">
          <input
            className={inputClass}
            value={br.fonts}
            onChange={(e) => setField('branding', 'fonts', e.target.value)}
            placeholder="Clean and bold — nothing fancy"
          />
        </Field>
      </div>
      <Field label="Tagline or slogan" hint="A short line that sums you up, if you have one.">
        <input
          className={inputClass}
          value={br.tagline}
          onChange={(e) => setField('branding', 'tagline', e.target.value)}
          placeholder="Done right, the first time."
        />
      </Field>
      <Field label="Styles that feel like you" hint="Check all that apply.">
        <CheckGrid
          options={STYLE_OPTIONS}
          selected={br.styles}
          onToggle={(v) => toggleInArray('branding', 'styles', v)}
        />
      </Field>
      <Field label="Websites you like" hint="Paste a few links — competitors or any site you think looks great.">
        <textarea
          rows={2}
          className={inputClass}
          value={br.websitesLiked}
          onChange={(e) => setField('branding', 'websitesLiked', e.target.value)}
          placeholder="example.com — love how clean it is"
        />
      </Field>
      <Field label="Websites you don't like">
        <textarea
          rows={2}
          className={inputClass}
          value={br.websitesDisliked}
          onChange={(e) => setField('branding', 'websitesDisliked', e.target.value)}
          placeholder="example.com — too cluttered"
        />
      </Field>
      <Field label="Anything to avoid?" hint="Colors, styles, or anything that's a hard no.">
        <textarea
          rows={2}
          className={inputClass}
          value={br.avoid}
          onChange={(e) => setField('branding', 'avoid', e.target.value)}
          placeholder="No bright pink, nothing too corporate."
        />
      </Field>
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
      <Field label="Main headline" hint="The big line people see first. We can write this for you.">
        <input
          className={inputClass}
          value={ct.headline}
          onChange={(e) => setField('content', 'headline', e.target.value)}
          placeholder="Reliable plumbing you can count on"
        />
      </Field>
      <Field label="Subheadline" hint="A supporting line under the headline.">
        <input
          className={inputClass}
          value={ct.subheadline}
          onChange={(e) => setField('content', 'subheadline', e.target.value)}
          placeholder="Serving Springfield families for over 12 years"
        />
      </Field>
      <Field label="A short description of your company">
        <textarea
          rows={3}
          className={inputClass}
          value={ct.companyDescription}
          onChange={(e) => setField('content', 'companyDescription', e.target.value)}
          placeholder="A couple sentences about who you are and what you do."
        />
      </Field>
      <Field label="Button text" hint="What the main button should say.">
        <input
          className={inputClass}
          value={ct.ctaText}
          onChange={(e) => setField('content', 'ctaText', e.target.value)}
          placeholder="Get a free quote"
        />
      </Field>
      <Field label="Your story" hint="How did you get started? People love a good backstory.">
        <textarea
          rows={3}
          className={inputClass}
          value={ct.companyStory}
          onChange={(e) => setField('content', 'companyStory', e.target.value)}
          placeholder="Started in 2012 out of a single truck..."
        />
      </Field>
      <Field label="Your mission" hint="What you're all about.">
        <textarea
          rows={2}
          className={inputClass}
          value={ct.mission}
          onChange={(e) => setField('content', 'mission', e.target.value)}
          placeholder="Honest work, fair prices, no surprises."
        />
      </Field>
      <Field label="Team members" hint="Names and roles, if you'd like them on the site.">
        <input
          className={inputClass}
          value={ct.team}
          onChange={(e) => setField('content', 'team', e.target.value)}
          placeholder="John (owner), Mike (lead tech)"
        />
      </Field>
      <Field label="A bit about you, the owner" hint="Optional, but a personal touch builds trust.">
        <textarea
          rows={2}
          className={inputClass}
          value={ct.ownerBio}
          onChange={(e) => setField('content', 'ownerBio', e.target.value)}
          placeholder="John has been a licensed plumber for 20 years..."
        />
      </Field>
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
      <Field label="Main city or town you want to rank in">
        <input
          className={inputClass}
          value={s.mainCity}
          onChange={(e) => setField('seo', 'mainCity', e.target.value)}
          placeholder="Springfield"
        />
      </Field>
      <Field label="Other areas you'd like to show up in">
        <input
          className={inputClass}
          value={s.additionalAreas}
          onChange={(e) => setField('seo', 'additionalAreas', e.target.value)}
          placeholder="Shelbyville, Capital City"
        />
      </Field>
      <Field label="Words customers search to find you" hint="What would you type into Google to find your business?">
        <input
          className={inputClass}
          value={s.keywords}
          onChange={(e) => setField('seo', 'keywords', e.target.value)}
          placeholder="emergency plumber near me, water heater repair"
        />
      </Field>
      <Field label="Competitors" hint="Who shows up when you search for your services?">
        <input
          className={inputClass}
          value={s.competitors}
          onChange={(e) => setField('seo', 'competitors', e.target.value)}
          placeholder="Names or website links"
        />
      </Field>
      <Field label="Google Business Profile link" hint="Your Google Maps / business listing, if you have one.">
        <input
          className={inputClass}
          value={s.gbpLink}
          onChange={(e) => setField('seo', 'gbpLink', e.target.value)}
          placeholder="https://g.page/your-business"
        />
      </Field>
      <Field label="Current website" hint="If you already have one.">
        <input
          className={inputClass}
          value={s.existingUrl}
          onChange={(e) => setField('seo', 'existingUrl', e.target.value)}
          placeholder="https://yourbusiness.com"
        />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Domain name" hint="The web address you own or want.">
          <input
            className={inputClass}
            value={s.existingDomain}
            onChange={(e) => setField('seo', 'existingDomain', e.target.value)}
            placeholder="yourbusiness.com"
          />
        </Field>
        <Field label="Who hosts your site?" hint="If you know — totally fine if you don't.">
          <input
            className={inputClass}
            value={s.hostingProvider}
            onChange={(e) => setField('seo', 'hostingProvider', e.target.value)}
            placeholder="GoDaddy, Wix, not sure..."
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
      <Field label="Facebook">
        <input
          className={inputClass}
          value={so.facebook}
          onChange={(e) => setField('social', 'facebook', e.target.value)}
          placeholder="facebook.com/yourbusiness"
        />
      </Field>
      <Field label="Instagram">
        <input
          className={inputClass}
          value={so.instagram}
          onChange={(e) => setField('social', 'instagram', e.target.value)}
          placeholder="instagram.com/yourbusiness"
        />
      </Field>
      <Field label="TikTok">
        <input
          className={inputClass}
          value={so.tiktok}
          onChange={(e) => setField('social', 'tiktok', e.target.value)}
          placeholder="tiktok.com/@yourbusiness"
        />
      </Field>
      <Field label="YouTube">
        <input
          className={inputClass}
          value={so.youtube}
          onChange={(e) => setField('social', 'youtube', e.target.value)}
          placeholder="youtube.com/@yourbusiness"
        />
      </Field>
      <Field label="LinkedIn">
        <input
          className={inputClass}
          value={so.linkedin}
          onChange={(e) => setField('social', 'linkedin', e.target.value)}
          placeholder="linkedin.com/company/yourbusiness"
        />
      </Field>
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
      <CheckGrid
        options={FEATURE_OPTIONS}
        selected={data.features}
        onToggle={(v) => toggleInArray(null, 'features', v)}
      />
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

      {/* uploads */}
      <Field label="Upload files" hint="Logo, job photos, your old site's images — anything. You can add several.">
        <label className="flex flex-col items-center justify-center gap-3 w-full bg-[#121212] border border-dashed border-[#27272a] rounded-lg px-4 py-10 text-center cursor-pointer hover:border-[#38bdf8] transition-colors">
          {uploading ? (
            <Loader2 className="w-8 h-8 text-[#38bdf8] animate-spin" />
          ) : (
            <UploadCloud className="w-8 h-8 text-zinc-500" />
          )}
          <span className="text-sm text-zinc-300 font-medium">
            {uploading ? 'Uploading…' : 'Tap to choose files'}
          </span>
          <span className="text-xs text-zinc-500">
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
      </Field>

      {uploadError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">
          {uploadError}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <ul className="space-y-2">
          {uploadedFiles.map((f) => (
            <li
              key={f.url}
              className="flex items-center justify-between gap-3 bg-[#121212] border border-[#27272a] rounded-lg px-4 py-3"
            >
              <span className="text-sm text-zinc-200 truncate flex items-center gap-2">
                <Check className="w-4 h-4 text-[#38bdf8] shrink-0" />
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
      )}

      {/* project fields */}
      <Field label="When would you like to launch?" hint="A target date is fine — no pressure.">
        <input
          type="date"
          className={inputClass}
          value={p.launchDate}
          onChange={(e) => setField('project', 'launchDate', e.target.value)}
        />
      </Field>
      <Field label="Any special requests?">
        <textarea
          rows={2}
          className={inputClass}
          value={p.specialRequests}
          onChange={(e) => setField('project', 'specialRequests', e.target.value)}
          placeholder="Anything else on your wishlist."
        />
      </Field>
      <Field label="Must-haves" hint="Anything the site absolutely needs to have.">
        <textarea
          rows={2}
          className={inputClass}
          value={p.mustInclude}
          onChange={(e) => setField('project', 'mustInclude', e.target.value)}
          placeholder="My phone number front and center on every page."
        />
      </Field>
      <Field label="Anything to avoid?">
        <textarea
          rows={2}
          className={inputClass}
          value={p.avoid}
          onChange={(e) => setField('project', 'avoid', e.target.value)}
          placeholder="No pop-ups, please."
        />
      </Field>
      <Field label="Who makes the final call on the project?" hint="So we know who to check in with.">
        <input
          className={inputClass}
          value={p.decisionMaker}
          onChange={(e) => setField('project', 'decisionMaker', e.target.value)}
          placeholder="Me — John Smith"
        />
      </Field>
    </>
  );
}
