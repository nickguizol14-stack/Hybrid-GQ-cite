// src/lib/contact.ts
import { z } from 'zod/v4';
import { supabase } from './supabase';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Please enter a valid email address'),
  phone: z.string().optional().default(''),
  matterType: z.string().min(1, 'Please select a matter type'),
  description: z.string().optional().default(''),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type SubmitResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContactForm(
  data: ContactFormData
): Promise<SubmitResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid form data';
    return { success: false, error: firstError };
  }

  if (!supabase) {
    return { success: false, error: 'Contact form is not configured yet. Please call us directly.' };
  }

  const { error } = await supabase.from('contact_submissions').insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    matter_type: parsed.data.matterType,
    description: parsed.data.description || null,
  });

  if (error) {
    console.error('Contact form submission error:', error);
    return { success: false, error: 'Something went wrong. Please try calling us directly.' };
  }

  return { success: true };
}
