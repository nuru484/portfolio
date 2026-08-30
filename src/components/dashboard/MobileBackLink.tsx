// src/components/dashboard/MobileBackLink.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Icon-only back control for dashboard pages, shown only on phones: from `sm`
 * up the header nav is visible and carries navigation instead.
 */
export function MobileBackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      // The negative margins seat the 40px target on the heading's first line
      // and pull its icon back to the content edge.
      className="-ml-2 -mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:hidden"
    >
      <ArrowLeft aria-hidden className="h-5 w-5" />
    </Link>
  );
}
