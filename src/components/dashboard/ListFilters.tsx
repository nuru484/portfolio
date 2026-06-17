// src/components/dashboard/ListFilters.tsx
'use client';

import type { ReactNode } from 'react';
import { Search } from 'lucide-react';

interface StatusOption {
  value: string;
  label: string;
}

export function ListFilters({
  search,
  onSearch,
  status,
  onStatus,
  statusOptions,
  extra,
  placeholder = 'Search…',
}: {
  search: string;
  onSearch: (value: string) => void;
  status?: string;
  onStatus?: (value: string) => void;
  statusOptions?: StatusOption[];
  extra?: ReactNode;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-2 rounded-full border border-border px-4 py-2.5 transition-colors focus-within:border-foreground sm:max-w-xs">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholder}
          aria-label="Search"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {statusOptions && onStatus && (
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value)}
          aria-label="Filter by status"
          className="h-10 rounded-full border border-border bg-transparent px-4 text-sm"
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}

      {extra}
    </div>
  );
}
