import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { STUDIO_GALLERY_IMAGES } from "@/lib/studioGallery";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const StudioGallery = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isLightboxOpen = activeIndex !== null;

  const goTo = useCallback(
    (delta: number) => {
      setActiveIndex((current) => {
        if (current === null) return null;
        const next =
          (current + delta + STUDIO_GALLERY_IMAGES.length) %
          STUDIO_GALLERY_IMAGES.length;
        return next;
      });
    },
    [],
  );

  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goTo(-1);
      if (event.key === "ArrowRight") goTo(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isLightboxOpen, goTo]);

  const activeImage =
    activeIndex !== null ? STUDIO_GALLERY_IMAGES[activeIndex] : null;

  return (
    <section aria-labelledby="studio-gallery-heading">
      <h2
        id="studio-gallery-heading"
        className="text-2xl font-bold text-white mb-2"
      >
        See the studio
      </h2>
      <p className="text-gray-300 leading-relaxed">
        Wondering what the space looks like? View photos of our rooms, gear, and
        vibe before you book.
      </p>

      {!expanded ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => setExpanded(true)}
          className="mt-5 rounded-full border-white/30 text-white hover:bg-white/10 font-semibold"
          aria-expanded={false}
          aria-controls="studio-gallery-grid"
        >
          <Images className="h-4 w-4 mr-2" aria-hidden />
          View photos
        </Button>
      ) : (
        <div id="studio-gallery-grid" className="mt-5">
          <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
            {STUDIO_GALLERY_IMAGES.map((image, index) => (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group relative w-full overflow-hidden rounded-xl border border-white/15",
                    "bg-white/5 aspect-[3/4] focus:outline-none focus-visible:ring-2",
                    "focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]",
                    "hover:border-teal-400/50 transition-colors",
                  )}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="sr-only">
                    View photo {index + 1} of {STUDIO_GALLERY_IMAGES.length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setExpanded(false);
              setActiveIndex(null);
            }}
            className="mt-4 text-gray-400 hover:text-white hover:bg-white/10"
            aria-expanded={true}
            aria-controls="studio-gallery-grid"
          >
            Hide photos
          </Button>
        </div>
      )}

      <Dialog
        open={isLightboxOpen}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
      >
        <DialogContent
          className={cn(
            "max-w-[min(96vw,56rem)] border-white/20 bg-[#0a0f14]/95 p-3 sm:p-4",
            "text-white [&>button]:text-white [&>button]:hover:text-teal-200",
          )}
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">Studio photo gallery</DialogTitle>
          <DialogDescription className="sr-only">
            Enlarged studio photos. Use the previous and next buttons or arrow
            keys to browse.
          </DialogDescription>

          {activeImage && activeIndex !== null && (
            <div className="flex flex-col gap-3">
              <div className="relative flex min-h-[50vh] items-center justify-center rounded-xl bg-black/40">
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="max-h-[min(78vh,720px)] w-auto max-w-full rounded-lg object-contain"
                />
              </div>

              <div className="flex items-center justify-between gap-3 px-1">
                <button
                  type="button"
                  onClick={() => goTo(-1)}
                  className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <p className="text-sm text-gray-300 tabular-nums">
                  {activeIndex + 1} / {STUDIO_GALLERY_IMAGES.length}
                </p>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                  aria-label="Next photo"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default StudioGallery;
