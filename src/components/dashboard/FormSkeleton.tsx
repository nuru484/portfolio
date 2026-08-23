// src/components/dashboard/FormSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

/**
 * The shapes an admin form is built from. Each edit screen passes the rows
 * its own form renders, so the placeholder occupies the same height and the
 * layout does not jump when the record arrives.
 *
 * Heights track the ui primitives: Input and Button are h-8, Textarea is
 * min-h-16, and every field group is a label, a control and a hint line.
 */
export type FormFieldShape =
  /** Label, single-line control, hint. */
  | 'input'
  /** Label and single-line control, no hint under it. */
  | 'field'
  /** Label, multi-line control, hint. */
  | 'textarea'
  /** Two single-line controls side by side from sm up. */
  | 'pair'
  /** Label, thumbnail and a file picker beside it. */
  | 'image'
  /** A captioned rule opening a group of fields. */
  | 'section'
  /** A label with its own button beside it, e.g. "Social links" and Add. */
  | 'action'
  /** The rich-text editor: a tall fixed block, not a textarea. */
  | 'editor'
  /** A row of bare checkboxes, e.g. Published and Featured. */
  | 'toggles'
  /** The display-order box and the published checkbox on one row. */
  | 'settings';

function Field({
  control,
  hint = true,
}: {
  control: 'input' | 'textarea';
  hint?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Skeleton className="h-4 w-24" />
      <Skeleton className={control === 'textarea' ? 'h-16 w-full' : 'h-8 w-full'} />
      {hint && <Skeleton className="h-3 w-48" />}
    </div>
  );
}

function Row({ shape }: { shape: FormFieldShape }) {
  switch (shape) {
    case 'input':
      return <Field control="input" />;

    case 'field':
      return <Field control="input" hint={false} />;

    case 'textarea':
      return <Field control="textarea" />;

    case 'pair':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field control="input" />
          <Field control="input" />
        </div>
      );

    case 'image':
      return (
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-28" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-32 shrink-0 rounded-lg" />
            <div className="w-full max-w-xs space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        </div>
      );

    case 'editor':
      return (
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-20" />
          {/* RichTextEditor is initialised at height 560. */}
          <Skeleton className="h-[560px] w-full" />
        </div>
      );

    case 'toggles':
      return (
        <div className="flex items-center gap-6">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
      );

    case 'action':
      return (
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
      );

    case 'section':
      return (
        <div className="pt-2">
          <Skeleton className="h-4 w-40" />
          <div className="mt-2 h-px w-full bg-border" />
        </div>
      );

    case 'settings':
      return (
        <div className="flex flex-wrap items-center gap-6">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-5 w-28" />
        </div>
      );
  }
}

/**
 * Stands in for an admin form while its record loads. Announced as a status
 * so a screen reader is told something is coming rather than meeting an
 * empty region; the blocks themselves are aria-hidden by Skeleton.
 */
export function FormSkeleton({ fields }: { fields: FormFieldShape[] }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="space-y-6 sm:rounded-2xl sm:border sm:border-border sm:bg-card sm:p-6"
    >
      <span className="sr-only">Loading the form…</span>

      {fields.map((shape, i) => (
        <Row key={i} shape={shape} />
      ))}

      {/* Submit and cancel. */}
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}
