'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { leadSchema, type LeadFormState } from '@/lib/lead';
import { sendEmail } from '@/lib/email';
import { checkRateLimit } from '@/lib/rate-limit';
import { site } from '@/config/site';

/** Strip control characters so free text is safe in notification emails. */
function sanitize(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, 1000).trim();
}

async function verifyTurnstile(token: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not configured yet — honeypot still applies.
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch {
    return false;
  }
}

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  // Honeypot: real visitors never fill this hidden field.
  if (typeof formData.get('company') === 'string' && (formData.get('company') as string).length > 0) {
    // Pretend success so bots learn nothing.
    redirect('/thank-you');
  }

  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return {
      status: 'error',
      message: 'Too many requests from this connection. Please wait a few minutes and try again, or call Connor directly.',
    };
  }

  const turnstileOk = await verifyTurnstile(formData.get('cf-turnstile-response') as string | null);
  if (!turnstileOk) {
    return { status: 'error', message: 'Spam check failed. Please try again.' };
  }

  const parsed = leadSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName') ?? '',
    email: formData.get('email'),
    phone: formData.get('phone'),
    preferredContact: formData.get('preferredContact'),
    mainGoal: formData.get('mainGoal'),
    preferredDaysTimes: formData.get('preferredDaysTimes') ?? '',
    trainingExperience: formData.get('trainingExperience') ?? '',
    ageRange: formData.get('ageRange') ?? '',
    barrier: formData.get('barrier') ?? '',
    referralSource: formData.get('referralSource') ?? '',
    pricingMode: formData.get('pricingMode') ?? '',
    selectedPlanSummary: formData.get('selectedPlanSummary') ?? '',
    smsConsent: formData.get('smsConsent') === 'on',
    privacyAccepted: formData.get('privacyAccepted') === 'on',
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please review the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const lead = parsed.data;
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL ?? site.email;

  const notification = [
    `New consultation request — ${site.brandName}`,
    '',
    `Name: ${sanitize(lead.firstName)} ${sanitize(lead.lastName ?? '')}`.trim(),
    `Email: ${sanitize(lead.email)}`,
    `Phone: ${sanitize(lead.phone)}`,
    `Preferred contact: ${lead.preferredContact}`,
    `SMS consent: ${lead.smsConsent ? 'yes' : 'no'}`,
    `Main goal: ${sanitize(lead.mainGoal)}`,
    lead.preferredDaysTimes ? `Preferred days/times: ${sanitize(lead.preferredDaysTimes)}` : '',
    lead.trainingExperience ? `Training experience: ${lead.trainingExperience}` : '',
    lead.ageRange ? `Age range: ${lead.ageRange}` : '',
    lead.barrier ? `What has made starting difficult: ${sanitize(lead.barrier)}` : '',
    lead.referralSource ? `Heard about Connor via: ${sanitize(lead.referralSource)}` : '',
    lead.pricingMode ? `Pricing mode: ${lead.pricingMode}` : '',
    lead.selectedPlanSummary ? `Selected plan: ${sanitize(lead.selectedPlanSummary)}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const notifyResult = await sendEmail({
    to: notifyTo,
    subject: `New lead: ${sanitize(lead.firstName)} — ${lead.pricingMode || 'general inquiry'}`,
    text: notification,
    replyTo: lead.email,
  });

  if (!notifyResult.ok) {
    return {
      status: 'error',
      message:
        'Something went wrong sending your request. Please try again, or reach Connor directly through the contact options on this page.',
    };
  }

  // Prospect confirmation (approved wording).
  await sendEmail({
    to: lead.email,
    subject: `Thanks for reaching out to ${site.brandName}`,
    text: `Thanks for reaching out. Connor will contact you personally to learn more about your goals, answer your questions, and review the services you selected. Submitting this form does not enroll you or charge you.\n\n— ${site.brandName}\n${site.url}`,
  });

  redirect('/thank-you');
}
