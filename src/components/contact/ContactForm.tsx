// src/components/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import { Phone, MapPin, Mails } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CONTACT } from '@/config/constants';
import { contactSchema } from '@/validations/contact-validation';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  companyWebsite: string;
  budget: string;
  exactBudget: string;
  timeline: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  companyName: '',
  companyWebsite: '',
  budget: '',
  exactBudget: '',
  timeline: '',
  message: '',
};

const budgetOptions = [
  '₵10k – 25k',
  '₵25k – 50k',
  '₵50k – 75k',
  '₵75k – 100k',
  '₵100k+',
];

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as the user corrects it.
    setErrors((prev) => (prev[name as keyof ContactFormData] ? { ...prev, [name]: undefined } : prev));
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate on the client with the same schema the API uses.
    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const next: FieldErrors = {};
      (Object.keys(fieldErrors) as (keyof ContactFormData)[]).forEach((k) => {
        const msg = fieldErrors[k]?.[0];
        if (msg) next[k] = msg;
      });
      setErrors(next);
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setErrors({});

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(result?.message ?? 'Could not send your message.');
      }
      toast.success(
        result?.message ?? "Thanks for reaching out! I'll be in touch.",
      );
      setFormData(initialFormData);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Could not send your message.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:px-12 md:py-20">
      <div className="flex justify-between flex-wrap gap-5 lg:flex-nowrap lg:gap-20 font-urbanist w-full">
        {/* Left Column */}
        <div className="space-y-6">
          <h2 className="text-3xl font-light mb-4">
            Schedule a call
            <br />
            with me to see
            <br />
            if I can help
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Whether you&apos;re looking to start a new project or want to update
            an existing one, feel free to reach out to me!
          </p>
          <div className="flex flex-col justify-center gap-4 text-sm md:text-lg font-normal sm:border sm:border-border sm:bg-card sm:rounded-3xl sm:px-8 sm:py-6">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-2 hover:text-muted-foreground transition-colors"
            >
              <Phone strokeWidth={1} className="h-5 w-5 shrink-0" />
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 hover:text-muted-foreground transition-colors"
            >
              <Mails strokeWidth={1} className="h-5 w-5 shrink-0" />
              <span className="break-all">{CONTACT.email}</span>
            </a>

            <span className="flex items-center gap-2">
              <MapPin strokeWidth={1} className="h-5 w-5 shrink-0" />
              {CONTACT.location}
            </span>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="p-6 md:p-8 lg:p-10 rounded-3xl border border-border bg-card">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                aria-invalid={!!errors.name}
                className={cn(
                  'w-full border-b py-2 focus:outline-none',
                  errors.name
                    ? 'border-destructive'
                    : 'border-input focus:border-foreground',
                )}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                aria-invalid={!!errors.email}
                className={cn(
                  'w-full border-b py-2 focus:outline-none',
                  errors.email
                    ? 'border-destructive'
                    : 'border-input focus:border-foreground',
                )}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <input
              type="url"
              name="companyWebsite"
              placeholder="Company Website"
              value={formData.companyWebsite}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <div className="space-y-2">
              <p className="text-muted-foreground">My budget is:</p>
              <div className="flex flex-wrap gap-4">
                {budgetOptions.map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, budget }))}
                    className={cn(
                      'px-4 py-2 rounded-full border',
                      formData.budget === budget
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-input hover:border-foreground'
                    )}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              name="exactBudget"
              placeholder="Do you have an exact budget?"
              value={formData.exactBudget}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <input
              type="text"
              name="timeline"
              placeholder="What is your timeline?"
              value={formData.timeline}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <div>
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                value={formData.message}
                aria-invalid={!!errors.message}
                className={cn(
                  'w-full border-b py-2 focus:outline-none',
                  errors.message
                    ? 'border-destructive'
                    : 'border-input focus:border-foreground',
                )}
                onChange={handleChange}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-foreground mx-auto md:mx-0 text-background border border-foreground px-8 py-4 text-base font-medium rounded-full flex items-center space-x-2 hover:bg-background hover:text-foreground transition-colors duration-500 ease-in-out disabled:opacity-60"
            >
              <span>{submitting ? 'Sending…' : 'Submit Message'}</span>
              <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
