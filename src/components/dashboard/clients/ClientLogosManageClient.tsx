// src/components/dashboard/clients/ClientLogosManageClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ManageListSkeleton } from '@/components/dashboard/Skeletons';
import { ListFilters } from '@/components/dashboard/ListFilters';
import { ListPager } from '@/components/dashboard/ListPager';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import {
  useGetAllClientLogosQuery,
  useToggleClientLogoPublishMutation,
  useDeleteClientLogoMutation,
} from '@/redux/client-logo-api';
import type { IClientLogo } from '@/types/client-logo.types';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
];

function ClientLogoRow({
  clientLogo,
  canDelete,
}: {
  clientLogo: IClientLogo;
  canDelete: boolean;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [togglePublish, { isLoading: toggling }] =
    useToggleClientLogoPublishMutation();
  const [deleteClientLogo, { isLoading: deleting }] =
    useDeleteClientLogoMutation();

  const handleToggle = async () => {
    try {
      await togglePublish(clientLogo.id).unwrap();
      toast.success(clientLogo.isPublished ? 'Unpublished.' : 'Published.');
    } catch {
      toast.error('Could not update visibility.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteClientLogo(clientLogo.id).unwrap();
      toast.success('Client logo removed.');
      setConfirmOpen(false);
    } catch {
      toast.error('Could not remove client logo.');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 sm:gap-4 sm:px-5">
      <div className="flex w-full min-w-0 items-center gap-3 sm:w-auto sm:flex-1">
        <div className="relative flex h-12 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
          <Image
            src={clientLogo.logo}
            alt=""
            fill
            className="object-contain p-1.5"
            sizes="80px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{clientLogo.name}</p>
          {clientLogo.websiteUrl ? (
            <a
              href={clientLogo.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 truncate text-xs text-muted-foreground hover:text-foreground"
            >
              {clientLogo.websiteUrl}
              <ExternalLink aria-hidden className="h-3 w-3 shrink-0" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <p className="text-xs text-muted-foreground">No website link</p>
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
        <span className="text-xs tabular-nums text-muted-foreground">
          #{clientLogo.displayOrder}
        </span>
        <span
          className={
            clientLogo.isPublished
              ? 'rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background'
              : 'rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground'
          }
        >
          {clientLogo.isPublished ? 'Published' : 'Draft'}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToggle}
            disabled={toggling}
            title={clientLogo.isPublished ? 'Unpublish' : 'Publish'}
            aria-label={
              clientLogo.isPublished
                ? `Unpublish ${clientLogo.name}`
                : `Publish ${clientLogo.name}`
            }
            className="inline-flex items-center justify-center h-7 w-7 md:h-8 md:w-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
          >
            {clientLogo.isPublished ? (
              <EyeOff aria-hidden className="h-4 w-4" />
            ) : (
              <Eye aria-hidden className="h-4 w-4" />
            )}
          </button>
          <Link
            href={`/dashboard/clients/${clientLogo.id}/edit`}
            title="Edit"
            aria-label={`Edit ${clientLogo.name}`}
            className="inline-flex items-center justify-center h-7 w-7 md:h-8 md:w-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Pencil aria-hidden className="h-4 w-4" />
          </Link>
          {canDelete && (
            <button
              onClick={() => setConfirmOpen(true)}
              disabled={deleting}
              title="Remove"
              aria-label={`Remove ${clientLogo.name}`}
              className="inline-flex items-center justify-center h-7 w-7 md:h-8 md:w-8 rounded-full border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors disabled:opacity-50"
            >
              <Trash2 aria-hidden className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Remove client logo?"
        description={`This archives "${clientLogo.name}" (soft delete) and takes it out of the Trusted by strip.`}
        confirmText="Remove"
        isDestructive
        loading={deleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export function ClientLogosManageClient({
  canDelete = true,
}: {
  canDelete?: boolean;
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search);

  const { data, isLoading, isError, isFetching } = useGetAllClientLogosQuery({
    search: debouncedSearch.trim() || undefined,
    isPublished: status === 'all' ? undefined : status === 'published',
    page,
    limit: 10,
  });
  const clientLogos = data?.data ?? [];
  const pagination = data?.pagination;
  const filtering = !!debouncedSearch.trim() || status !== 'all';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Clients</h1>
          <p className="mt-1 text-muted-foreground">
            Logos for the &ldquo;Trusted by&rdquo; strip on the home page.
          </p>
        </div>
        <Button asChild className="gap-2 self-start">
          <Link href="/dashboard/clients/new">
            <Plus aria-hidden className="h-4 w-4" />
            New client
          </Link>
        </Button>
      </div>

      <ListFilters
        search={search}
        onSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
        status={status}
        onStatus={(v) => {
          setStatus(v);
          setPage(1);
        }}
        statusOptions={STATUS_OPTIONS}
        placeholder="Search clients…"
      />

      {isLoading ? (
        <ManageListSkeleton />
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-8 text-center text-sm text-destructive">
          Failed to load client logos.
        </div>
      ) : clientLogos.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">
            {filtering
              ? 'No clients match your filters.'
              : 'No client logos yet.'}
          </p>
          {!filtering && (
            <Button asChild className="mt-4 gap-2">
              <Link href="/dashboard/clients/new">
                <Plus aria-hidden className="h-4 w-4" />
                Add your first client
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <>
          <div
            className={`divide-y divide-border sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border sm:bg-card ${
              isFetching ? 'opacity-60' : ''
            }`}
          >
            {clientLogos.map((clientLogo) => (
              <ClientLogoRow
                key={clientLogo.id}
                clientLogo={clientLogo}
                canDelete={canDelete}
              />
            ))}
          </div>
          {pagination && (
            <ListPager
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
