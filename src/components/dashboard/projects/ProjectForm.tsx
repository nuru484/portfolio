// src/components/dashboard/projects/ProjectForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { ImagePlus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from '@/redux/project-api';
import {
  createProjectSchema,
  updateProjectSchema,
} from '@/validations/project-validation';
import type { IProject } from '@/types/project.types';

type FieldErrors = Record<string, string>;

interface ProjectFormProps {
  mode: 'create' | 'edit';
  initial?: IProject;
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

function ImageField({
  id,
  label,
  current,
  error,
}: {
  id: string;
  label: string;
  current?: string;
  error?: string;
}) {
  const [preview, setPreview] = useState<string | null>(current ?? null);

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
          {preview ? (
            <Image src={preview} alt="" fill className="object-cover" sizes="128px" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImagePlus className="h-5 w-5" />
            </span>
          )}
        </div>
        <Input
          id={id}
          name={id}
          type="file"
          accept="image/*"
          aria-invalid={!!error}
          className="cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function ProjectForm({ mode, initial }: ProjectFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [createProject, createState] = useCreateProjectMutation();
  const [updateProject, updateState] = useUpdateProjectMutation();
  const pending = createState.isLoading || updateState.isLoading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Normalise the checkboxes to boolean strings the API expects.
    formData.set('isPublished', formData.get('isPublished') ? 'true' : 'false');
    formData.set('isRepoPublic', formData.get('isRepoPublic') ? 'true' : 'false');

    // Drop the empty file input on edit so the existing image is kept.
    const file = formData.get('image');
    if (file instanceof File && file.size === 0) formData.delete('image');

    // Client-side validation with the same schema the API uses.
    const technologies = String(formData.get('technologies') ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const input = {
      title: String(formData.get('title') ?? '').trim(),
      description: String(formData.get('description') ?? '').trim(),
      technologies,
      githubUrl: String(formData.get('githubUrl') ?? '').trim() || undefined,
      liveUrl: String(formData.get('liveUrl') ?? '').trim() || undefined,
      projectType: String(formData.get('projectType') ?? 'SIDE'),
      isRepoPublic: formData.get('isRepoPublic') === 'true',
      displayOrder: Number(formData.get('displayOrder') ?? 0),
      isPublished: formData.get('isPublished') === 'true',
    };
    const schema = mode === 'create' ? createProjectSchema : updateProjectSchema;
    const parsed = schema.safeParse(input);
    const nextErrors: FieldErrors = {};
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors as Record<string, string[]>;
      for (const [k, v] of Object.entries(fe)) if (v?.[0]) nextErrors[k] = v[0];
    }
    if (mode === 'create' && !(formData.get('image') instanceof File)) {
      nextErrors.image = 'A project image is required.';
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setErrors({});

    try {
      if (mode === 'create') {
        await createProject(formData).unwrap();
        toast.success('Project created.');
      } else if (initial) {
        await updateProject({ id: initial.id, formData }).unwrap();
        toast.success('Project updated.');
      }
      router.push('/dashboard/projects');
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
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          maxLength={80}
          defaultValue={initial?.title}
          aria-invalid={!!errors.title}
        />
        {errors.title ? (
          <p className="text-xs text-destructive">{errors.title}</p>
        ) : (
          <p className="text-xs text-muted-foreground">At most 80 characters.</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          maxLength={200}
          defaultValue={initial?.description}
          aria-invalid={!!errors.description}
        />
        {errors.description ? (
          <p className="text-xs text-destructive">{errors.description}</p>
        ) : (
          <p className="text-xs text-muted-foreground">At most 200 characters.</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="technologies">Technologies</Label>
        <Input
          id="technologies"
          name="technologies"
          placeholder="React, Node.js, Prisma"
          defaultValue={initial?.technologies.join(', ')}
          aria-invalid={!!errors.technologies}
        />
        {errors.technologies ? (
          <p className="text-xs text-destructive">{errors.technologies}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Comma-separated. Up to 8.
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
          <Input
            id="githubUrl"
            name="githubUrl"
            type="url"
            defaultValue={initial?.githubUrl ?? ''}
            aria-invalid={!!errors.githubUrl}
          />
          {errors.githubUrl ? (
            <p className="text-xs text-destructive">{errors.githubUrl}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Include https:// (e.g. https://github.com/you/repo).
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="liveUrl">Live URL (optional)</Label>
          <Input
            id="liveUrl"
            name="liveUrl"
            type="url"
            defaultValue={initial?.liveUrl ?? ''}
            aria-invalid={!!errors.liveUrl}
          />
          {errors.liveUrl ? (
            <p className="text-xs text-destructive">{errors.liveUrl}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Include https:// (e.g. https://chosenfintech.org).
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <fieldset className="space-y-1.5">
          <legend className="text-sm font-medium leading-none">
            Project type
          </legend>
          <div className="flex flex-col gap-2 pt-1.5 text-sm text-muted-foreground">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="projectType"
                value="CLIENT"
                defaultChecked={initial?.projectType === 'CLIENT'}
                className="h-4 w-4 border-border accent-foreground"
              />
              Client project
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="projectType"
                value="SIDE"
                defaultChecked={(initial?.projectType ?? 'SIDE') === 'SIDE'}
                className="h-4 w-4 border-border accent-foreground"
              />
              Side project
            </label>
          </div>
          <p className="text-xs text-muted-foreground">
            Groups the project under its own heading on the site.
          </p>
        </fieldset>

        <div className="space-y-1.5">
          <span className="text-sm font-medium leading-none">Repository</span>
          <label className="flex items-center gap-2 pt-1.5 text-sm text-muted-foreground">
            <input
              type="checkbox"
              name="isRepoPublic"
              defaultChecked={initial?.isRepoPublic ?? true}
              className="h-4 w-4 rounded border-border accent-foreground"
            />
            Repository is public
          </label>
          <p className="text-xs text-muted-foreground">
            When unchecked, the site hides the &ldquo;View Code&rdquo; link
            even if a GitHub URL is set.
          </p>
        </div>
      </div>

      <ImageField
        id="image"
        label="Project image"
        current={initial?.image}
        error={errors.image}
      />

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
              ? 'Create project'
              : 'Save changes'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/dashboard/projects')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
