// src/components/dashboard/testimonials/TestimonialsManageClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ManageListSkeleton } from '@/components/dashboard/Skeletons';
import {
  useGetAllTestimonialsQuery,
  useToggleTestimonialPublishMutation,
  useDeleteTestimonialMutation,
} from '@/redux/testimonial-api';
import type { ITestimonial } from '@/types/testimonial.types';

function TestimonialRow({ testimonial }: { testimonial: ITestimonial }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [togglePublish, { isLoading: toggling }] =
    useToggleTestimonialPublishMutation();
  const [deleteTestimonial, { isLoading: deleting }] =
    useDeleteTestimonialMutation();

  const handleToggle = async () => {
    try {
      await togglePublish(testimonial.id).unwrap();
      toast.success(testimonial.isPublished ? 'Unpublished.' : 'Published.');
    } catch {
      toast.error('Could not update visibility.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTestimonial(testimonial.id).unwrap();
      toast.success('Testimonial removed.');
      setConfirmOpen(false);
    } catch {
      toast.error('Could not remove testimonial.');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 px-5 py-4">
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
        {testimonial.image ? (
          <Image
            src={testimonial.image}
            alt=""
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <UserRound className="h-6 w-6 text-muted-foreground" aria-hidden />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-medium truncate">{testimonial.author}</p>
        <p className="text-xs text-muted-foreground truncate">
          {testimonial.role}
        </p>
      </div>

      <span
        className={
          testimonial.isPublished
            ? 'rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background'
            : 'rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground'
        }
      >
        {testimonial.isPublished ? 'Published' : 'Draft'}
      </span>

      <div className="flex items-center gap-1.5">
        <button
          onClick={handleToggle}
          disabled={toggling}
          title={testimonial.isPublished ? 'Unpublish' : 'Publish'}
          className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
        >
          {testimonial.isPublished ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
        <Link
          href={`/dashboard/testimonials/${testimonial.id}/edit`}
          title="Edit"
          className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Pencil className="h-4 w-4" />
        </Link>
        <button
          onClick={() => setConfirmOpen(true)}
          disabled={deleting}
          title="Remove"
          className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Remove testimonial?"
        description={`This archives the testimonial from "${testimonial.author}" (soft delete).`}
        confirmText="Remove"
        isDestructive
        loading={deleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export function TestimonialsManageClient() {
  const { data, isLoading, isError } = useGetAllTestimonialsQuery();
  const testimonials = data?.data ?? [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Testimonials</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the testimonials shown on your site.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/testimonials/new">
            <Plus className="h-4 w-4" />
            New testimonial
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <ManageListSkeleton />
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-8 text-center text-sm text-destructive">
          Failed to load testimonials.
        </div>
      ) : testimonials.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">No testimonials yet.</p>
          <Button asChild className="mt-4 gap-2">
            <Link href="/dashboard/testimonials/new">
              <Plus className="h-4 w-4" />
              Add your first testimonial
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
          {testimonials.map((testimonial) => (
            <TestimonialRow key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
}
