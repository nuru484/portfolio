// src/app/dashboard/testimonials/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireSession } from '@/lib/session';
import { TestimonialsManageClient } from '@/components/dashboard/testimonials/TestimonialsManageClient';

export const metadata: Metadata = { title: 'Testimonials' };

export default async function TestimonialsDashboardPage() {
  const { isAdmin } = await requireSession();
  if (!isAdmin) redirect('/dashboard');

  return <TestimonialsManageClient />;
}
