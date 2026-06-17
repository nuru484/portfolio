// src/components/dashboard/blog/PostForm.tsx
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
import { RichTextEditor } from './RichTextEditor';
import { useGetAllCategoriesQuery } from '@/redux/category-api';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '@/redux/post-api';
import type { IPost } from '@/types/post.types';

interface PostFormProps {
  mode: 'create' | 'edit';
  initial?: IPost;
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

export function PostForm({ mode, initial }: PostFormProps) {
  const router = useRouter();
  const { data: categoriesRes } = useGetAllCategoriesQuery();
  const [createPost, createState] = useCreatePostMutation();
  const [updatePost, updateState] = useUpdatePostMutation();
  const pending = createState.isLoading || updateState.isLoading;

  const [content, setContent] = useState(initial?.content ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initial?.coverImage ?? null,
  );
  const [removeCover, setRemoveCover] = useState(false);

  const categories = categoriesRes?.data ?? [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const val = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement)?.value ?? '';
    const checked = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement)?.checked ?? false;

    const title = val('title').trim();
    const excerpt = val('excerpt').trim();
    const next: Record<string, string> = {};
    if (!title) next.title = 'Title is required';
    else if (title.length > 255) next.title = 'Title can be at most 255 characters';
    if (!excerpt) next.excerpt = 'Excerpt is required';
    else if (excerpt.length > 500)
      next.excerpt = 'Excerpt can be at most 500 characters';
    if (content.replace(/<[^>]*>/g, '').trim().length === 0) {
      next.content = 'Post content cannot be empty.';
    }
    if (Object.keys(next).length > 0) {
      setErrors(next);
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setErrors({});

    const fd = new FormData();
    fd.set('title', val('title'));
    fd.set('excerpt', val('excerpt'));
    fd.set('categoryId', val('categoryId'));
    fd.set('content', content);
    fd.set('isPublished', checked('isPublished') ? 'true' : 'false');
    fd.set('isFeatured', checked('isFeatured') ? 'true' : 'false');
    if (coverFile) fd.set('coverImage', coverFile);
    else if (mode === 'edit' && removeCover) fd.set('coverImage', 'null');

    try {
      if (mode === 'create') {
        await createPost(fd).unwrap();
        toast.success('Post created.');
      } else if (initial) {
        await updatePost({ id: initial.id, formData: fd }).unwrap();
        toast.success('Post updated.');
      }
      router.push('/dashboard/blog');
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 max-w-3xl sm:rounded-2xl sm:border sm:border-border sm:bg-card sm:p-6"
    >
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={initial?.title}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={initial?.excerpt}
          aria-invalid={!!errors.excerpt}
        />
        {errors.excerpt ? (
          <p className="text-xs text-destructive">{errors.excerpt}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            A short summary shown on the blog list and in search/social previews.
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="categoryId">Category</Label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={initial?.category?.id ?? ''}
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">— None —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label>Cover image (optional)</Label>
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
            {coverPreview && !removeCover ? (
              <Image src={coverPreview} alt="" fill className="object-cover" sizes="128px" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-muted-foreground">
                <ImagePlus className="h-5 w-5" />
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*"
              className="cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setCoverFile(file);
                setRemoveCover(false);
                if (file) setCoverPreview(URL.createObjectURL(file));
              }}
            />
            {mode === 'edit' && initial?.coverImage && (
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={removeCover}
                  onChange={(e) => {
                    setRemoveCover(e.target.checked);
                    if (e.target.checked) setCoverFile(null);
                  }}
                  className="h-3.5 w-3.5 rounded border-border accent-foreground"
                />
                Remove current cover
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Content</Label>
        <RichTextEditor value={content} onChange={setContent} />
        {errors.content && (
          <p className="text-xs text-destructive">{errors.content}</p>
        )}
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={initial?.isPublished ?? false}
            className="h-4 w-4 rounded border-border accent-foreground"
          />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={initial?.isFeatured ?? false}
            className="h-4 w-4 rounded border-border accent-foreground"
          />
          Featured
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={pending} className="gap-2">
          <Save className="h-4 w-4" />
          {pending ? 'Saving…' : mode === 'create' ? 'Create post' : 'Save changes'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/dashboard/blog')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
