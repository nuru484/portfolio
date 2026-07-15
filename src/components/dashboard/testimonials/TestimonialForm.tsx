// src/components/dashboard/testimonials/TestimonialForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { ImagePlus, Save, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
} from '@/redux/testimonial-api';
import {
  createTestimonialSchema,
  updateTestimonialSchema,
} from '@/validations/testimonial-validation';
import type {
  ITestimonial,
  ITestimonialSocial,
} from '@/types/testimonial.types';

interface TestimonialFormProps {
  mode: 'create' | 'edit';
  initial?: ITestimonial;
}

interface ApiError {
  data?: { message?: string; errors?: Record<string, string[]> };
}

function getErrorMessage(err: unknown): string {
  const e = err as ApiError;
  if (e?.data?.errors) {
    const first = Object.values(e.data.errors)[0];
    if (first?.[0]) return first[0];
  }
  return e?.data?.message ?? 'Something went wrong. Please try again.';
}

export function TestimonialForm({ mode, initial }: TestimonialFormProps) {
  const router = useRouter();
  const [createTestimonial, createState] = useCreateTestimonialMutation();
  const [updateTestimonial, updateState] = useUpdateTestimonialMutation();
  const pending = createState.isLoading || updateState.isLoading;

  const [preview, setPreview] = useState<string | null>(initial?.image ?? null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [socials, setSocials] = useState<ITestimonialSocial[]>(
    initial?.socials ?? [],
  );

  const addSocial = () =>
    setSocials((prev) => [...prev, { platform: '', url: '' }]);
  const removeSocial = (index: number) =>
    setSocials((prev) => prev.filter((_, i) => i !== index));
  const updateSocial = (
    index: number,
    key: keyof ITestimonialSocial,
    value: string,
  ) =>
    setSocials((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [key]: value } : s)),
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Normalise the checkbox to a boolean string the API expects.
    formData.set('isPublished', formData.get('isPublished') ? 'true' : 'false');

    // Serialise socials, dropping fully-empty rows.
    const cleanedSocials = socials
      .map((s) => ({ platform: s.platform.trim(), url: s.url.trim() }))
      .filter((s) => s.platform !== '' || s.url !== '');
    formData.set('socials', JSON.stringify(cleanedSocials));

    // Drop the empty file input on edit so the existing image is kept.
    const file = formData.get('image');
    if (file instanceof File && file.size === 0) formData.delete('image');

    // Client-side validation with the same schema the API uses.
    const input = {
      author: String(formData.get('author') ?? '').trim(),
      role: String(formData.get('role') ?? '').trim(),
      quote: String(formData.get('quote') ?? '').trim(),
      socials: cleanedSocials,
      displayOrder: Number(formData.get('displayOrder') ?? 0),
      isPublished: formData.get('isPublished') === 'true',
    };
    const schema =
      mode === 'create' ? createTestimonialSchema : updateTestimonialSchema;
    const parsed = schema.safeParse(input);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors as Record<string, string[]>;
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(fe)) if (v?.[0]) next[k] = v[0];
      setErrors(next);
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setErrors({});

    try {
      if (mode === 'create') {
        await createTestimonial(formData).unwrap();
        toast.success('Testimonial created.');
      } else if (initial) {
        await updateTestimonial({ id: initial.id, formData }).unwrap();
        toast.success('Testimonial updated.');
      }
      router.push('/dashboard/testimonials');
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 max-w-2xl sm:rounded-2xl sm:border sm:border-border sm:bg-card sm:p-6"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            name="author"
            defaultValue={initial?.author}
            aria-invalid={!!errors.author}
          />
          {errors.author && (
            <p className="text-xs text-destructive">{errors.author}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            name="role"
            placeholder="CEO, Acme Inc."
            defaultValue={initial?.role}
            aria-invalid={!!errors.role}
          />
          {errors.role && (
            <p className="text-xs text-destructive">{errors.role}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="quote">Quote</Label>
        <Textarea
          id="quote"
          name="quote"
          rows={5}
          maxLength={500}
          defaultValue={initial?.quote}
          aria-invalid={!!errors.quote}
        />
        {errors.quote ? (
          <p className="text-xs text-destructive">{errors.quote}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            At most 500 characters — shown in full on the site.
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="image">Photo (optional)</Label>
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
            {preview ? (
              <Image src={preview} alt="" fill className="object-cover" sizes="80px" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-muted-foreground">
                <ImagePlus className="h-5 w-5" />
              </span>
            )}
          </div>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Falls back to a default avatar when no photo is set.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Social links (optional)</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSocial}
            className="gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Add link
          </Button>
        </div>

        {socials.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No social links added.
          </p>
        ) : (
          <div className="space-y-2">
            {socials.map((social, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  aria-label="Platform"
                  placeholder="LinkedIn"
                  value={social.platform}
                  onChange={(e) => updateSocial(index, 'platform', e.target.value)}
                  className="sm:max-w-[10rem]"
                />
                <Input
                  aria-label="URL"
                  type="url"
                  placeholder="https://linkedin.com/in/…"
                  value={social.url}
                  onChange={(e) => updateSocial(index, 'url', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeSocial(index)}
                  title="Remove link"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="displayOrder">Display order</Label>
          <Input
            id="displayOrder"
            name="displayOrder"
            type="number"
            min={0}
            defaultValue={initial?.displayOrder ?? 0}
            className="w-28"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground mt-6">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={initial?.isPublished ?? false}
            className="h-4 w-4 rounded border-border accent-foreground"
          />
          Published (visible on the site)
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={pending} className="gap-2">
          <Save className="h-4 w-4" />
          {pending
            ? 'Saving…'
            : mode === 'create'
              ? 'Create testimonial'
              : 'Save changes'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/dashboard/testimonials')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
