// src/components/dashboard/FormPageHeader.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/** Title row for create/edit pages with a compact back link beside it. */
export function FormPageHeader({
  title,
  backHref,
}: {
  title: string;
  backHref: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h1>
      <Link
        href={backHref}
        className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
    </div>
  );
}
