// src/components/dashboard/StatsCard.tsx
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconClassName?: string;
  metadata?: { label: string; value: number }[];
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  metadata,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full',
            iconClassName ?? 'bg-muted text-foreground',
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>

      <p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p>

      {metadata && metadata.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          {metadata.map((m) => (
            <span key={m.label} className="text-xs text-muted-foreground">
              {m.label}:{' '}
              <span className="font-semibold text-foreground">{m.value}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
