'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { submitLead } from '@/app/contact/actions';
import type { LeadFormState } from '@/lib/lead';

const initialState: LeadFormState = { status: 'idle' };

const inputClass =
  'w-full rounded-lg border border-line bg-soft-white px-4 py-3 text-body focus:border-sage';

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p role="alert" className="mt-1 text-sm font-semibold text-terracotta-dark">
      {errors[0]}
    </p>
  );
}

/**
 * Public consultation form. Carries the selected plan from the pricing
 * calculator, uses a honeypot + optional Turnstile, and never asks for
 * medical details.
 */
export function ConsultationForm({
  pricingMode,
  selectedPlanSummary,
}: {
  pricingMode: string;
  selectedPlanSummary: string;
}) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5" noValidate data-analytics="contact_form_started">
      {selectedPlanSummary && (
        <div className="rounded-lg border border-success/40 bg-success/10 p-4">
          <p className="font-heading font-bold text-slate-deep">Your selected plan</p>
          <p className="mt-1 text-sm">{selectedPlanSummary}</p>
          <p className="mt-1 text-xs text-muted">
            This is a starting point for your conversation. Nothing is booked or charged yet.
          </p>
        </div>
      )}
      <input type="hidden" name="pricingMode" value={pricingMode} />
      <input type="hidden" name="selectedPlanSummary" value={selectedPlanSummary} />

      {/* Honeypot — hidden from real visitors */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1 block font-semibold">
            First name <span aria-hidden="true">*</span>
          </label>
          <input id="firstName" name="firstName" required maxLength={80} className={inputClass} autoComplete="given-name" />
          <FieldError errors={errors.firstName} />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1 block font-semibold">
            Last name <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="lastName" name="lastName" maxLength={80} className={inputClass} autoComplete="family-name" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1 block font-semibold">
            Email <span aria-hidden="true">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} autoComplete="email" />
          <FieldError errors={errors.email} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block font-semibold">
            Phone <span aria-hidden="true">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} autoComplete="tel" />
          <FieldError errors={errors.phone} />
        </div>
      </div>

      <fieldset>
        <legend className="mb-1 font-semibold">
          How should Connor reach you? <span aria-hidden="true">*</span>
        </legend>
        <div className="flex flex-wrap gap-4">
          {(['call', 'text', 'email'] as const).map((method) => (
            <label key={method} className="flex min-h-11 items-center gap-2 font-medium capitalize">
              <input type="radio" name="preferredContact" value={method} className="h-5 w-5 accent-terracotta" required />
              {method}
            </label>
          ))}
        </div>
        <FieldError errors={errors.preferredContact} />
      </fieldset>

      <div>
        <label htmlFor="mainGoal" className="mb-1 block font-semibold">
          What would you like to change? <span aria-hidden="true">*</span>
        </label>
        <textarea id="mainGoal" name="mainGoal" required rows={3} maxLength={500} className={inputClass}
          placeholder="A sentence or two is plenty. No medical history needed." />
        <FieldError errors={errors.mainGoal} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ageRange" className="mb-1 block font-semibold">
            Age range <span className="font-normal text-muted">(optional)</span>
          </label>
          <select id="ageRange" name="ageRange" className={inputClass} defaultValue="">
            <option value="">Prefer not to say</option>
            <option value="18-39">18–39</option>
            <option value="40-49">40–49</option>
            <option value="50-59">50–59</option>
            <option value="60-69">60–69</option>
            <option value="70+">70+</option>
          </select>
        </div>
        <div>
          <label htmlFor="trainingExperience" className="mb-1 block font-semibold">
            Training experience <span className="font-normal text-muted">(optional)</span>
          </label>
          <select id="trainingExperience" name="trainingExperience" className={inputClass} defaultValue="">
            <option value="">Select one</option>
            <option value="none">None yet</option>
            <option value="beginner">Beginner</option>
            <option value="some">Some experience</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="preferredDaysTimes" className="mb-1 block font-semibold">
          Preferred days or times <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="preferredDaysTimes" name="preferredDaysTimes" maxLength={300} className={inputClass}
          placeholder="For example: weekday mornings, or after 5 pm" />
      </div>

      <div>
        <label htmlFor="barrier" className="mb-1 block font-semibold">
          What has made starting difficult? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id="barrier" name="barrier" rows={2} maxLength={500} className={inputClass} />
      </div>

      <div>
        <label htmlFor="referralSource" className="mb-1 block font-semibold">
          How did you hear about Connor? <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="referralSource" name="referralSource" maxLength={200} className={inputClass} />
      </div>

      <div className="space-y-3 rounded-lg border border-line bg-sand p-4 text-sm">
        <label className="flex items-start gap-3">
          <input type="checkbox" name="smsConsent" className="mt-1 h-5 w-5 accent-terracotta" />
          <span>
            I agree to receive text messages from Connor about my inquiry and scheduling. Message and data rates may
            apply. Reply STOP to opt out. See <Link href="/sms-terms">SMS Terms</Link>.
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="privacyAccepted" required className="mt-1 h-5 w-5 accent-terracotta" />
          <span>
            I accept the <Link href="/privacy">Privacy Policy</Link>. <span aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError errors={errors.privacyAccepted} />
      </div>

      {state.status === 'error' && state.message && (
        <p role="alert" className="rounded-lg border border-terracotta bg-terracotta/10 p-4 font-semibold text-terracotta-dark">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60" data-analytics="contact_form_submitted">
        {pending ? 'Sending…' : 'Send My Request to Connor'}
      </button>
      <p className="text-center text-sm text-muted">
        Submitting this form does not enroll you or charge you. Connor typically replies within one business day.
      </p>
    </form>
  );
}
