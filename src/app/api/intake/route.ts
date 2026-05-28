import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createServiceClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

type IntakePayload = {
  contact: { fullName: string; businessName: string; phone: string; email: string; preferredContact: string; businessAddress: string; serviceAreas: string };
  business: { description: string; services: string; priorityServices: string; differentiator: string; yearsInBusiness: string; employees: string; hours: string; emergencyServices: string; licensedInsured: string; certifications: string };
  goals: { mainGoals: string[]; primaryAction: string; successDefinition: string };
  branding: { brandColors: string; fonts: string; tagline: string; styles: string[]; websitesLiked: string; websitesDisliked: string; avoid: string };
  content: { headline: string; subheadline: string; companyDescription: string; ctaText: string; companyStory: string; mission: string; team: string; ownerBio: string };
  seo: { mainCity: string; additionalAreas: string; keywords: string; competitors: string; gbpLink: string; existingUrl: string; existingDomain: string; hostingProvider: string };
  social: { facebook: string; instagram: string; tiktok: string; youtube: string; linkedin: string };
  features: string[];
  project: { launchDate: string; specialRequests: string; mustInclude: string; avoid: string; decisionMaker: string };
  fileUrls: string[];
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function row(label: string, value: unknown): string {
  let text: string;
  if (Array.isArray(value)) text = value.length ? value.join(', ') : '—';
  else text = isNonEmptyString(value as string) ? String(value) : '—';
  return `${label}: ${text}`;
}

function buildSummary(p: IntakePayload): string {
  const lines: string[] = [];

  lines.push('=== CONTACT ===');
  lines.push(row('Full Name', p.contact?.fullName));
  lines.push(row('Business Name', p.contact?.businessName));
  lines.push(row('Phone', p.contact?.phone));
  lines.push(row('Email', p.contact?.email));
  lines.push(row('Preferred Contact', p.contact?.preferredContact));
  lines.push(row('Business Address', p.contact?.businessAddress));
  lines.push(row('Service Areas', p.contact?.serviceAreas));

  lines.push('\n=== BUSINESS ===');
  lines.push(row('Description', p.business?.description));
  lines.push(row('Services', p.business?.services));
  lines.push(row('Priority Services', p.business?.priorityServices));
  lines.push(row('Differentiator', p.business?.differentiator));
  lines.push(row('Years In Business', p.business?.yearsInBusiness));
  lines.push(row('Employees', p.business?.employees));
  lines.push(row('Hours', p.business?.hours));
  lines.push(row('Emergency Services', p.business?.emergencyServices));
  lines.push(row('Licensed/Insured', p.business?.licensedInsured));
  lines.push(row('Certifications', p.business?.certifications));

  lines.push('\n=== GOALS ===');
  lines.push(row('Main Goals', p.goals?.mainGoals));
  lines.push(row('Primary Action', p.goals?.primaryAction));
  lines.push(row('Success Definition', p.goals?.successDefinition));

  lines.push('\n=== BRANDING ===');
  lines.push(row('Brand Colors', p.branding?.brandColors));
  lines.push(row('Fonts', p.branding?.fonts));
  lines.push(row('Tagline', p.branding?.tagline));
  lines.push(row('Styles', p.branding?.styles));
  lines.push(row('Websites Liked', p.branding?.websitesLiked));
  lines.push(row('Websites Disliked', p.branding?.websitesDisliked));
  lines.push(row('Avoid', p.branding?.avoid));

  lines.push('\n=== CONTENT ===');
  lines.push(row('Headline', p.content?.headline));
  lines.push(row('Subheadline', p.content?.subheadline));
  lines.push(row('Company Description', p.content?.companyDescription));
  lines.push(row('CTA Text', p.content?.ctaText));
  lines.push(row('Company Story', p.content?.companyStory));
  lines.push(row('Mission', p.content?.mission));
  lines.push(row('Team', p.content?.team));
  lines.push(row('Owner Bio', p.content?.ownerBio));

  lines.push('\n=== SEO ===');
  lines.push(row('Main City', p.seo?.mainCity));
  lines.push(row('Additional Areas', p.seo?.additionalAreas));
  lines.push(row('Keywords', p.seo?.keywords));
  lines.push(row('Competitors', p.seo?.competitors));
  lines.push(row('GBP Link', p.seo?.gbpLink));
  lines.push(row('Existing URL', p.seo?.existingUrl));
  lines.push(row('Existing Domain', p.seo?.existingDomain));
  lines.push(row('Hosting Provider', p.seo?.hostingProvider));

  lines.push('\n=== SOCIAL ===');
  lines.push(row('Facebook', p.social?.facebook));
  lines.push(row('Instagram', p.social?.instagram));
  lines.push(row('TikTok', p.social?.tiktok));
  lines.push(row('YouTube', p.social?.youtube));
  lines.push(row('LinkedIn', p.social?.linkedin));

  lines.push('\n=== FEATURES ===');
  lines.push(row('Requested Features', p.features));

  lines.push('\n=== PROJECT ===');
  lines.push(row('Launch Date', p.project?.launchDate));
  lines.push(row('Special Requests', p.project?.specialRequests));
  lines.push(row('Must Include', p.project?.mustInclude));
  lines.push(row('Avoid', p.project?.avoid));
  lines.push(row('Decision Maker', p.project?.decisionMaker));

  lines.push('\n=== UPLOADED FILES ===');
  const files = Array.isArray(p.fileUrls) ? p.fileUrls : [];
  lines.push(files.length ? files.join('\n') : '—');

  return lines.join('\n');
}

function buildHtml(p: IntakePayload): string {
  const summary = buildSummary(p);
  const files = Array.isArray(p.fileUrls) ? p.fileUrls : [];
  const fileLinks = files.length
    ? files.map((u) => `<li><a href="${u}">${u}</a></li>`).join('')
    : '<li>—</li>';
  return `<pre style="font-family:ui-monospace,monospace;font-size:13px;white-space:pre-wrap">${summary.replace(/</g, '&lt;')}</pre><h3>Uploaded Files</h3><ul>${fileLinks}</ul>`;
}

export async function POST(request: Request) {
  let payload: IntakePayload;
  try {
    payload = (await request.json()) as IntakePayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Boundary validation — trust nothing from the client.
  const contact = payload?.contact;
  if (
    !contact ||
    !isNonEmptyString(contact.fullName) ||
    !isNonEmptyString(contact.businessName) ||
    !isNonEmptyString(contact.email)
  ) {
    return NextResponse.json(
      { error: 'Missing required fields: fullName, businessName, email' },
      { status: 400 }
    );
  }

  const fileUrls = Array.isArray(payload.fileUrls)
    ? payload.fileUrls.filter((u): u is string => typeof u === 'string')
    : [];

  // Insert (source of truth) via service-role client — bypasses RLS.
  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from('intake_submissions').insert({
      full_name: contact.fullName,
      business_name: contact.businessName,
      email: contact.email,
      phone: typeof contact.phone === 'string' ? contact.phone : null,
      data: payload,
      file_urls: fileUrls,
    });

    if (error) {
      console.error('Intake insert error:', error);
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
    }
  } catch (err) {
    console.error('Intake insert exception:', err);
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
  }

  // Notify the agency owner. Email failure must not fail the request.
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_dummy') {
    try {
      await resend.emails.send({
        from: 'Rovult Intake <leads@rovult.com>',
        to: [process.env.ADMIN_EMAIL || contact.email],
        subject: `New Intake: ${contact.businessName} (${contact.fullName})`,
        text: buildSummary(payload),
        html: buildHtml(payload),
      });
    } catch (err) {
      console.error('Intake email error (submission saved):', err);
    }
  } else {
    console.log('No Resend key. Intake saved for:', contact.businessName, contact.fullName);
  }

  return NextResponse.json({ success: true });
}
