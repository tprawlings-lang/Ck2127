import { z } from 'zod';

/**
 * Public consultation form model. Deliberately excludes medical details:
 * no diagnoses, medication lists, or injury history in the public lead form.
 */
export const leadSchema = z.object({
  firstName: z.string().trim().min(1, 'Please tell us your first name.').max(80),
  lastName: z.string().trim().max(80).optional().or(z.literal('')),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a phone number for call or text follow-up.')
    .max(25)
    .regex(/^[0-9+()\-.\s]+$/, 'Please enter a valid phone number.'),
  preferredContact: z.enum(['call', 'text', 'email'], {
    message: 'Please choose how Connor should reach you.',
  }),
  mainGoal: z.string().trim().min(1, 'A short sentence about your goal helps Connor prepare.').max(500),
  preferredDaysTimes: z.string().trim().max(300).optional().or(z.literal('')),
  trainingExperience: z.enum(['none', 'beginner', 'some', 'experienced']).optional().or(z.literal('')),
  ageRange: z.enum(['18-39', '40-49', '50-59', '60-69', '70+']).optional().or(z.literal('')),
  barrier: z.string().trim().max(500).optional().or(z.literal('')),
  referralSource: z.string().trim().max(200).optional().or(z.literal('')),
  pricingMode: z.enum(['monthly', 'build-your-own']).optional().or(z.literal('')),
  selectedPlanSummary: z.string().trim().max(600).optional().or(z.literal('')),
  smsConsent: z.boolean(),
  privacyAccepted: z.literal(true, {
    message: 'Please accept the privacy policy so Connor can respond to you.',
  }),
});

export type LeadRequest = z.infer<typeof leadSchema>;

export type LeadFormState = {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string[]>;
};
