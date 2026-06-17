// src/app/dashboard/testimonials/[id]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Pencil, UserRound, ArrowUpRight } from 'lucide-react';
import { requireSession } from '@/lib/session';
import { getTestimonialById } from '@/lib/testimonials/testimonial-service';
import { Button } from '@/components/ui/button';
import { FormPageHeader } from '@/components/dashboard/FormPageHeader';

export const metadata: Metadata = { title: 'Testimonial' };

function formatDate(value: string | Date) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function TestimonialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  const t = await getTestimonialById(id).catch(() => null);
  if (!t) notFound();

  return (
    <div className="space-y-6 max-w-2xl">
      <FormPageHeader title={t.author} backHref="/dashboard/testimonials" />

      <div className="flex flex-wrap items-center gap-3">
        <span
          className={
            t.isPublished
              ? 'rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background'
              : 'rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground'
          }
        >
          {t.isPublished ? 'Published' : 'Draft'}
        </span>
        <span className="text-sm text-muted-foreground">order {t.displayOrder}</span>
        <Button asChild variant="outline" size="sm" className="ml-auto gap-2">
          <Link href={`/dashboard/testimonials/${t.id}/edit`}>
            <Pencil className="h-4 w-4" /> Edit
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <blockquote className="text-lg leading-relaxed">
          “{t.quote}”
        </blockquote>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
            {t.image ? (
              <Image
                src={t.image}
                alt={t.author}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound className="h-6 w-6 text-muted-foreground" aria-hidden />
            )}
          </div>
          <div>
            <p className="font-medium">{t.author}</p>
            <p className="text-sm text-muted-foreground">{t.role}</p>
          </div>
        </div>

        {t.socials.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {t.socials.map((s) => (
              <a
                key={`${s.platform}-${s.url}`}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {s.platform} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Created {formatDate(t.createdAt)} · Updated {formatDate(t.updatedAt)}
      </p>
    </div>
  );
}
