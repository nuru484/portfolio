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

const LABEL_CLASS =
  'block text-xs uppercase tracking-wider text-muted-foreground';

interface FieldProps {
  name: keyof ContactFormData;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: 'text' | 'email' | 'tel' | 'url';
  autoComplete?: string;
  inputMode?: 'email' | 'tel' | 'url';
  spellCheck?: boolean;
  required?: boolean;
  multiline?: boolean;
}

/**
 * One labelled field. The label is visible (a placeholder disappears the
 * moment someone types, taking the only description of the field with it),
 * and any error is tied to the control through aria-describedby so it is
 * read out rather than just shown.
 */
function Field({
  name,
  label,
  placeholder,
  value,
  error,
  onChange,
  type = 'text',
  autoComplete,
  inputMode,
  spellCheck,
  required = false,
  multiline = false,
}: FieldProps) {
  const errorId = `${name}-error`;
  const control = cn(
    'w-full border-b bg-transparent py-2 outline-none transition-colors',
    'focus-visible:border-foreground',
    error ? 'border-destructive' : 'border-input',
  );

  return (
    <div>
      <label htmlFor={name} className={LABEL_CLASS}>
        {label}
        {required && (
          <span className="text-destructive">
            {' '}
            *<span className="sr-only"> required</span>
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          placeholder={placeholder}
          value={value}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(control, 'mt-1')}
          onChange={onChange}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          spellCheck={spellCheck}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(control, 'mt-1')}
          onChange={onChange}
        />
      )}
      {error && (
        <p id={errorId} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

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
  const [honeypot, setHoneypot] = useState('');

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
      // Put the caret on the first problem rather than leaving a keyboard or
      // screen-reader user to hunt for it.
      const first = Object.keys(next)[0];
      if (first) {
        document.getElementById(first)?.focus();
      }
      return;
    }
    setErrors({});

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, honeypot }),
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
      {/* 2/5 info + 3/5 form from lg - the form gets the wider column. */}
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-14 font-urbanist w-full">
        {/* Left Column - contact info */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl md:text-5xl font-medium leading-tight">
            Schedule a call with me
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Whether you&apos;re looking to start a new project or want to update
            an existing one, feel free to reach out to me!
          </p>

          <div className="mt-8 flex flex-col divide-y divide-border">
            {[
              {
                icon: Phone,
                label: 'Phone',
                value: CONTACT.phone,
                href: `tel:${CONTACT.phone}`,
              },
              {
                icon: Mails,
                label: 'Email',
                value: CONTACT.email,
                href: `mailto:${CONTACT.email}`,
              },
              {
                icon: MapPin,
                label: 'Location',
                value: CONTACT.location,
              },
            ].map(({ icon: Icon, label, value, href }) => {
              const row = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors group-hover:text-foreground">
                    <Icon aria-hidden strokeWidth={1.5} className="h-5 w-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      {label}
                    </span>
                    <span className="min-w-0 text-base font-medium [overflow-wrap:anywhere]">
                      {value}
                    </span>
                  </span>
                </>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-4 py-4 transition-colors hover:text-foreground"
                >
                  {row}
                </a>
              ) : (
                <span key={label} className="flex items-center gap-4 py-4">
                  {row}
                </span>
              );
            })}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-3 p-6 md:p-8 lg:p-10 rounded-3xl border border-border bg-card">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Honeypot - hidden from real users; bots that fill it are dropped. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company-extra">Company (leave blank)</label>
              <input
                id="company-extra"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <Field
              name="name"
              label="Name"
              placeholder="e.g. Ama Mensah"
              autoComplete="name"
              required
              value={formData.name}
              error={errors.name}
              onChange={handleChange}
            />

            <Field
              name="email"
              type="email"
              label="Email address"
              placeholder="e.g. ama@company.com"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              required
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
            />

            <Field
              name="phone"
              type="tel"
              label="Phone"
              placeholder="e.g. 024 123 4567"
              autoComplete="tel"
              inputMode="tel"
              value={formData.phone}
              error={errors.phone}
              onChange={handleChange}
            />

            <Field
              name="companyName"
              label="Company name"
              placeholder="e.g. Northern Foods Ltd"
              autoComplete="organization"
              value={formData.companyName}
              error={errors.companyName}
              onChange={handleChange}
            />

            <Field
              name="companyWebsite"
              type="url"
              label="Company website"
              placeholder="e.g. https://company.com"
              autoComplete="url"
              inputMode="url"
              spellCheck={false}
              value={formData.companyWebsite}
              error={errors.companyWebsite}
              onChange={handleChange}
            />

            {/* A single-select set, so it is a real radiogroup: arrow keys move
                between options and the chosen one is announced as checked. */}
            <fieldset className="space-y-2">
              <legend className={LABEL_CLASS}>My budget is</legend>
              <div className="flex flex-wrap gap-4">
                {budgetOptions.map((budget) => (
                  <label
                    key={budget}
                    className={cn(
                      'cursor-pointer rounded-full border px-4 py-2 transition-colors',
                      'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background',
                      formData.budget === budget
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-input hover:border-foreground',
                    )}
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={budget}
                      checked={formData.budget === budget}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {budget}
                  </label>
                ))}
              </div>
            </fieldset>

            <Field
              name="exactBudget"
              label="Do you have an exact budget?"
              placeholder="e.g. around ₵40,000"
              value={formData.exactBudget}
              error={errors.exactBudget}
              onChange={handleChange}
            />

            <Field
              name="timeline"
              label="What is your timeline?"
              placeholder="e.g. start in June, live by September"
              value={formData.timeline}
              error={errors.timeline}
              onChange={handleChange}
            />

            <Field
              name="message"
              label="Message"
              placeholder="e.g. we need a booking site for our guest house…"
              multiline
              required
              value={formData.message}
              error={errors.message}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={submitting}
              className="bg-foreground mx-auto md:mx-0 text-background border border-foreground px-8 py-4 text-base font-medium rounded-full flex items-center space-x-2 hover:bg-background hover:text-foreground transition-colors duration-500 ease-in-out disabled:opacity-60"
            >
              <span>{submitting ? 'Sending…' : 'Submit Message'}</span>
              <span aria-hidden>→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
