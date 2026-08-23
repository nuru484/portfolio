// src/components/dashboard/clients/ClientLogoForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { ImagePlus, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useCreateClientLogoMutation,
  useUpdateClientLogoMutation,
} from '@/redux/client-logo-api';
import {
  createClientLogoSchema,
  updateClientLogoSchema,
} from '@/validations/client-logo-validation';
import type { IClientLogo } from '@/types/client-logo.types';

interface ClientLogoFormProps {
  mode: 'create' | 'edit';
  initial?: IClientLogo;
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

export function ClientLogoForm({ mode, initial }: ClientLogoFormProps) {
  const router = useRouter();
  const [createClientLogo, createState] = useCreateClientLogoMutation();
  const [updateClientLogo, updateState] = useUpdateClientLogoMutation();
  const pending = createState.isLoading || updateState.isLoading;

  const [preview, setPreview] = useState<string | null>(initial?.logo ?? null);
  const [hasFile, setHasFile] = useState(false);
  // Bumping the key remounts the file input, which clears its selection.
  const [fileKey, setFileKey] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const removeImage = () => {
    setPreview(initial?.logo ?? null);
    setHasFile(false);
    setFileKey((k) => k + 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.set('isPublished', formData.get('isPublished') ? 'true' : 'false');

    // Drop the empty file input on edit so the existing logo is kept.
    const file = formData.get('logo');
    const hasNewFile = file instanceof File && file.size > 0;
    if (!hasNewFile) formData.delete('logo');

    if (mode === 'create' && !hasNewFile) {
      setErrors({ logo: 'A logo image is required.' });
      toast.error('Please choose a logo image.');
      return;
    }

    const input = {
      name: String(formData.get('name') ?? '').trim(),
      websiteUrl: String(formData.get('websiteUrl') ?? '').trim(),
      displayOrder: Number(formData.get('displayOrder') ?? 0),
      isPublished: formData.get('isPublished') === 'true',
    };
    const schema =
      mode === 'create' ? createClientLogoSchema : updateClientLogoSchema;
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
        await createClientLogo(formData).unwrap();
        toast.success('Client logo added.');
      } else if (initial) {
        await updateClientLogo({ id: initial.id, formData }).unwrap();
        toast.success('Client logo updated.');
      }
      router.push('/dashboard/clients');
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 sm:rounded-2xl sm:border sm:border-border sm:bg-card sm:p-6"
    >
      <div className="space-y-1.5">
        <Label htmlFor="name">Client name</Label>
        <Input
          id="name"
          name="name"
          maxLength={150}
          placeholder="e.g. DB Plus Trading Ltd"
          defaultValue={initial?.name}
          aria-invalid={!!errors.name}
        />
        {errors.name ? (
          <p className="text-xs text-destructive">{errors.name}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Used as the logo&apos;s alt text, so write it as the client would.
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="logo">Logo</Label>
        <div className="flex items-center gap-4">
          <div className="relative flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
            {preview ? (
              <Image
                src={preview}
                alt=""
                fill
                className="object-contain p-2"
                sizes="128px"
              />
            ) : (
              <ImagePlus aria-hidden className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div className="space-y-2">
            <Input
              key={fileKey}
              id="logo"
              name="logo"
              type="file"
              accept="image/*"
              aria-invalid={!!errors.logo}
              className="cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  setHasFile(true);
                }
              }}
            />
            {hasFile && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeImage}
                className="gap-1.5"
              >
                <X aria-hidden className="h-3.5 w-3.5" />
                Undo
              </Button>
            )}
            {errors.logo ? (
              <p className="text-xs text-destructive">{errors.logo}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                A transparent PNG or SVG reads best against both themes.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="websiteUrl">Website (optional)</Label>
        <Input
          id="websiteUrl"
          name="websiteUrl"
          type="url"
          inputMode="url"
          spellCheck={false}
          placeholder="https://example.com"
          defaultValue={initial?.websiteUrl ?? ''}
          aria-invalid={!!errors.websiteUrl}
        />
        {errors.websiteUrl ? (
          <p className="text-xs text-destructive">{errors.websiteUrl}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            When set, the logo links out to the client in a new tab.
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="displayOrder">Display order</Label>
          <Input
            id="displayOrder"
            name="displayOrder"
            type="number"
            min={0}
            className="w-28"
            defaultValue={initial?.displayOrder ?? 0}
          />
          <p className="text-xs text-muted-foreground">Lowest rolls first.</p>
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={initial?.isPublished ?? false}
            className="h-4 w-4 rounded border-border accent-foreground"
          />
          Published
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={pending} className="gap-2">
          <Save aria-hidden className="h-4 w-4" />
          {pending
            ? 'Saving…'
            : mode === 'create'
              ? 'Add client'
              : 'Save changes'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/dashboard/clients')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
