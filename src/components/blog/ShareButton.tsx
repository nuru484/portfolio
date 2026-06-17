// src/components/blog/ShareButton.tsx
'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Shares the current post via the native share sheet when available, falling
 * back to copying the link to the clipboard.
 */
export function ShareButton({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch {
        // User dismissed the share sheet — nothing to do.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy the link.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? 'Copied' : 'Share'}
    </button>
  );
}
