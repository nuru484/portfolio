// src/components/dashboard/FormPageHeader.tsx
import { MobileBackLink } from '@/components/dashboard/MobileBackLink';

/** Title row for create/edit pages with a phone-only back control beside it. */
export function FormPageHeader({
  title,
  backHref,
  backLabel,
}: {
  title: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-1">
      <MobileBackLink href={backHref} label={backLabel} />
      <h1 className="min-w-0 text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h1>
    </div>
  );
}
