// src/components/dashboard/blog/CategoriesManageClient.tsx
'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '@/redux/category-api';
import type { ICategory } from '@/types/category.types';

interface ApiError {
  data?: { message?: string };
}
const errMsg = (e: unknown) =>
  (e as ApiError)?.data?.message ?? 'Something went wrong.';

function CategoryRow({ category }: { category: ICategory }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [updateCategory, { isLoading: saving }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  const save = async () => {
    if (!name.trim()) return;
    try {
      await updateCategory({ id: category.id, body: { name: name.trim() } }).unwrap();
      toast.success('Category updated.');
      setEditing(false);
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  const remove = async () => {
    if (!confirm(`Delete "${category.name}"? Its posts become uncategorized.`)) return;
    try {
      await deleteCategory(category.id).unwrap();
      toast.success('Category removed.');
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  return (
    <div className="flex items-center gap-3 px-5 py-3">
      {editing ? (
        <>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-8 max-w-xs"
            autoFocus
          />
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-50"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setName(category.name);
            }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </>
      ) : (
        <>
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate">{category.name}</p>
            <p className="text-xs text-muted-foreground">
              {category.postsCount ?? 0} published post
              {(category.postsCount ?? 0) === 1 ? '' : 's'} · /{category.slug}
            </p>
          </div>
          <button
            onClick={() => setEditing(true)}
            title="Rename"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={remove}
            disabled={deleting}
            title="Delete"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}

export function CategoriesManageClient() {
  const { data, isLoading } = useGetAllCategoriesQuery();
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);

  const categories = data?.data ?? [];

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setNameError('Category name is required.');
      return;
    }
    setNameError(null);
    try {
      await createCategory({ name: newName.trim() }).unwrap();
      toast.success('Category created.');
      setNewName('');
    } catch (err) {
      toast.error(errMsg(err));
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Categories</h1>
        <p className="mt-1 text-muted-foreground">Organize your posts by topic.</p>
      </div>

      <form onSubmit={create} noValidate className="space-y-1.5">
        <div className="flex gap-2">
          <Input
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
              if (nameError) setNameError(null);
            }}
            placeholder="New category name"
            aria-invalid={!!nameError}
            className="max-w-xs"
          />
          <Button type="submit" disabled={creating} className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        {nameError && <p className="text-xs text-destructive">{nameError}</p>}
      </form>

      {isLoading ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Loading…
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          No categories yet.
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
          {categories.map((c) => (
            <CategoryRow key={c.id} category={c} />
          ))}
        </div>
      )}
    </div>
  );
}
