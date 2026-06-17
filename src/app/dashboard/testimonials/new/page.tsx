// src/app/dashboard/testimonials/new/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { requireSession } from '@/lib/session';
import { TestimonialForm } from '@/components/dashboard/testimonials/TestimonialForm';

export const metadata: Metadata = { title: 'New testimonial' };

export default async function NewTestimonialPage() {
  const { isAdmin } = await requireSession();
  if (!isAdmin) redirect('/dashboard');

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/testimonials"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to testimonials
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">New testimonial</h1>
      <TestimonialForm mode="create" />
    </div>
  );
}
