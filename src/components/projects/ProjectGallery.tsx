// src/components/projects/ProjectGallery.tsx
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import Image from 'next/image';
import { Dialog } from 'radix-ui';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { stepIndex, swipeDirection } from '@/utils/gallery';

export interface IGalleryImage {
  url: string;
  alt: string;
}

interface GalleryContextValue {
  images: IGalleryImage[];
  open: (index: number) => void;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

function useGallery(component: string): GalleryContextValue {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error(`${component} must be rendered inside <ProjectGallery>.`);
  }
  return context;
}

/**
 * Owns the image set and the full-view viewer for a project case study.
 * Wrap the part of the page that shows images, then place `GalleryTile`
 * anywhere inside: every tile opens the same viewer, which pages through
 * the whole set with previous/next, arrow keys and swipe.
 *
 * The cover is index 0 and the screenshots follow it, so the viewer walks
 * the case study in the order the page reads.
 */
export function ProjectGallery({
  images,
  title,
  children,
}: {
  images: IGalleryImage[];
  /** What the images are of, for the viewer's accessible name. */
  title: string;
  children: ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const value = useMemo(() => ({ images, open }), [images, open]);

  return (
    <GalleryContext.Provider value={value}>
      {children}
      <Lightbox
        images={images}
        title={title}
        index={index}
        onIndexChange={setIndex}
      />
    </GalleryContext.Provider>
  );
}

/** A clickable image, plus a quiet expand hint on hover/focus. */
export function GalleryTile({
  index,
  className,
  sizes,
  priority = false,
}: {
  index: number;
  /** Sizes the tile: pass the aspect ratio and framing classes. */
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const { images, open } = useGallery('GalleryTile');
  const image = images[index];
  if (!image) return null;

  return (
    <button
      type="button"
      onClick={() => open(index)}
      aria-label={`View image ${index + 1} of ${images.length} full size: ${image.alt}`}
      className={cn(
        'group relative block w-full cursor-zoom-in overflow-hidden outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <span
        aria-hidden
        className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <Expand aria-hidden className="h-4 w-4" />
      </span>
    </button>
  );
}

const navButton =
  'grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/50 text-white transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none';

/**
 * Full-view viewer: the image contained (never cropped) on a dark stage,
 * with previous/next, a counter and close. Arrow keys page, Escape closes
 * (radix), and a horizontal swipe pages on touch.
 */
function Lightbox({
  images,
  title,
  index,
  onIndexChange,
}: {
  images: IGalleryImage[];
  title: string;
  index: number | null;
  onIndexChange: (index: number | null) => void;
}) {
  const count = images.length;
  const isOpen = index !== null && count > 0;
  const current = isOpen ? images[Math.min(index, count - 1)] : null;
  const canPage = count > 1;

  const step = useCallback(
    (delta: number) => {
      if (index === null || !canPage) return;
      onIndexChange(stepIndex(index, delta, count));
    },
    [index, canPage, count, onIndexChange],
  );

  // Swipe: remember where the pointer went down, page on a clear
  // horizontal release. Mouse drags qualify too, which is harmless.
  const startX = useRef<number | null>(null);
  const onPointerDown = (event: ReactPointerEvent) => {
    startX.current = event.clientX;
  };
  const onPointerUp = (event: ReactPointerEvent) => {
    if (startX.current === null) return;
    const direction = swipeDirection(event.clientX - startX.current);
    startX.current = null;
    if (direction !== 0) step(direction);
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(next) => {
        if (!next) onIndexChange(null);
      }}
    >
      <Dialog.Portal>
        {/* Opaque, not a translucent scrim: these are dense UI captures, and
            page text showing through the letterboxed margins competes with
            the detail the viewer exists to show. */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              step(1);
            } else if (event.key === 'ArrowLeft') {
              event.preventDefault();
              step(-1);
            }
          }}
          className="fixed inset-0 z-50 flex flex-col font-urbanist text-white outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        >
          <Dialog.Title className="sr-only">{title} images</Dialog.Title>
          <Dialog.Description className="sr-only">
            Image viewer. Use the previous and next buttons or the arrow keys
            to move between images, and Escape to close.
          </Dialog.Description>

          {/* Top bar: counter left, close right. */}
          <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2 sm:px-6">
            {/* Paging is otherwise silent: the image swaps with nothing to
                announce it. One atomic status carries the position and the
                caption, so a page reads as "Image 3 of 9: ...". */}
            <p
              role="status"
              aria-atomic="true"
              className="text-sm font-medium tabular-nums text-white/80"
            >
              <span aria-hidden>{isOpen ? `${index + 1} / ${count}` : ''}</span>
              <span className="sr-only">
                {isOpen ? `Image ${index + 1} of ${count}: ${current?.alt}` : ''}
              </span>
            </p>
            <Dialog.Close
              className={cn(navButton, 'h-10 w-10')}
              aria-label="Close image viewer"
            >
              <X aria-hidden className="h-5 w-5" />
            </Dialog.Close>
          </div>

          {/* Stage: the image, contained. Keyed on the url so each change
              fades in rather than snapping. */}
          <div
            className="relative min-h-0 flex-1 touch-pan-y select-none pb-[max(1rem,env(safe-area-inset-bottom))]"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              startX.current = null;
            }}
          >
            {current && (
              <Image
                key={current.url}
                src={current.url}
                alt={current.alt}
                fill
                sizes="100vw"
                priority
                draggable={false}
                className="object-contain animate-in fade-in-0 duration-300"
              />
            )}

            {canPage && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className={cn(
                    navButton,
                    'absolute left-3 top-1/2 -translate-y-1/2 sm:left-6',
                  )}
                >
                  <ChevronLeft aria-hidden className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className={cn(
                    navButton,
                    'absolute right-3 top-1/2 -translate-y-1/2 sm:right-6',
                  )}
                >
                  <ChevronRight aria-hidden className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
