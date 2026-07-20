// src/components/dashboard/projects/ProjectForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { ImagePlus, Save, X } from 'lucide-react';
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
  const [hasFile, setHasFile] = useState(false);
  // Bumping the key remounts the file input, which clears its selection.
  const [fileKey, setFileKey] = useState(0);

  const remove = () => {
    setPreview(current ?? null);
    setHasFile(false);
    setFileKey((k) => k + 1);
  };

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
        <div className="space-y-2">
          <Input
            key={fileKey}
            id={id}
            name={id}
            type="file"
            accept="image/*"
            aria-invalid={!!error}
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
              onClick={remove}
              className="h-auto gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-destructive"
            >
              <X className="h-3.5 w-3.5" />
              Remove
            </Button>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function ProjectForm({ mode, initial }: ProjectFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors>({});
  // Existing screenshots toggled for removal (edit mode).
  const [removedScreenshots, setRemovedScreenshots] = useState<Set<string>>(
    new Set(),
  );
  // Newly-picked screenshot files (with local preview URLs) awaiting upload.
  const [newScreenshots, setNewScreenshots] = useState<
    { file: File; url: string }[]
  >([]);
  // Bumping the key remounts the file input so the same file can be re-picked.
  const [screenshotsKey, setScreenshotsKey] = useState(0);

  const addScreenshots = (files: File[]) => {
    if (files.length === 0) return;
    setNewScreenshots((prev) => [
      ...prev,
      ...files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    ]);
  };
  const removeNewScreenshot = (index: number) =>
    setNewScreenshots((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });

  const toggleScreenshot = (url: string) =>
    setRemovedScreenshots((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
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

    // Screenshots are tracked in React state (with previews), so ignore
    // whatever the raw input submitted and append the picked files instead.
    formData.delete('screenshots');
    for (const { file } of newScreenshots) formData.append('screenshots', file);

    // Existing screenshots the admin chose to keep (edit mode).
    const keptScreenshots = (initial?.screenshots ?? []).filter(
      (url) => !removedScreenshots.has(url),
    );
    if (mode === 'edit') {
      formData.set('keepScreenshots', JSON.stringify(keptScreenshots));
    }

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
      overview: String(formData.get('overview') ?? ''),
      problem: String(formData.get('problem') ?? ''),
      solution: String(formData.get('solution') ?? ''),
      outcome: String(formData.get('outcome') ?? ''),
      youtubeUrl: String(formData.get('youtubeUrl') ?? '').trim() || undefined,
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
    if (keptScreenshots.length + newScreenshots.length > 8) {
      nextErrors.screenshots = 'At most 8 screenshots per project.';
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
          placeholder="e.g. TravelTrek — Travel & Tour Booking Platform"
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
          placeholder="One or two sentences on what it is, who it's for, and what makes it notable."
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
            placeholder="https://github.com/you/repo"
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
            placeholder="https://yourproject.com"
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

      {/* Case study — all optional; the public detail page adapts. */}
      <fieldset className="space-y-4 rounded-2xl border border-border p-4">
        <legend className="px-1 text-sm font-medium">
          Case study (optional)
        </legend>

        {(
          [
            [
              'overview',
              'Overview',
              'What was built, at a glance.',
              'A short paragraph on what the project is and the scope you delivered.',
            ],
            [
              'problem',
              'The problem',
              'What the client/user struggled with.',
              'The situation or pain point before this project existed.',
            ],
            [
              'solution',
              'The solution',
              'What you built and key decisions.',
              'What you built, the approach, and the key technical decisions you made.',
            ],
            [
              'outcome',
              'Outcome',
              'Results — numbers if you have them.',
              'The results and impact. Add concrete numbers where you have them.',
            ],
          ] as const
        ).map(([name, label, hint, placeholder]) => (
          <div key={name} className="space-y-1.5">
            <Label htmlFor={name}>{label}</Label>
            <Textarea
              id={name}
              name={name}
              rows={3}
              maxLength={5000}
              placeholder={placeholder}
              defaultValue={initial?.[name] ?? ''}
              aria-invalid={!!errors[name]}
            />
            {errors[name] ? (
              <p className="text-xs text-destructive">{errors[name]}</p>
            ) : (
              <p className="text-xs text-muted-foreground">{hint}</p>
            )}
          </div>
        ))}

        <div className="space-y-1.5">
          <Label htmlFor="youtubeUrl">YouTube video (optional)</Label>
          <Input
            id="youtubeUrl"
            name="youtubeUrl"
            type="url"
            placeholder="https://www.youtube.com/watch?v=…"
            defaultValue={initial?.youtubeUrl ?? ''}
            aria-invalid={!!errors.youtubeUrl}
          />
          {errors.youtubeUrl ? (
            <p className="text-xs text-destructive">{errors.youtubeUrl}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              A walkthrough/demo video embedded on the project page.
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="screenshots">Screenshots (optional, up to 8)</Label>
          {mode === 'edit' && (initial?.screenshots?.length ?? 0) > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {initial!.screenshots.map((url) => {
                const removed = removedScreenshots.has(url);
                return (
                  <div key={url} className="space-y-1">
                    <div
                      className={
                        'relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted' +
                        (removed ? ' opacity-40' : '')
                      }
                    >
                      <Image src={url} alt="" fill className="object-cover" sizes="200px" />
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleScreenshot(url)}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      {removed ? 'Undo remove' : 'Remove'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {newScreenshots.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {newScreenshots.map(({ url }, index) => (
                <div key={url} className="space-y-1">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted">
                    <Image src={url} alt="" fill className="object-cover" sizes="200px" />
                    <button
                      type="button"
                      onClick={() => removeNewScreenshot(index)}
                      title="Remove screenshot"
                      className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur hover:text-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Input
            key={screenshotsKey}
            id="screenshots"
            name="screenshots"
            type="file"
            accept="image/*"
            multiple
            aria-invalid={!!errors.screenshots}
            className="cursor-pointer"
            onChange={(e) => {
              addScreenshots(Array.from(e.target.files ?? []));
              setScreenshotsKey((k) => k + 1);
            }}
          />
          {errors.screenshots ? (
            <p className="text-xs text-destructive">{errors.screenshots}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              JPEG/PNG/WebP, max 5MB each. Shown as a gallery on the project
              page.
            </p>
          )}
        </div>
      </fieldset>

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
