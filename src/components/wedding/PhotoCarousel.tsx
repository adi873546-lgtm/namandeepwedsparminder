import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { EyebrowLabel, GoldDivider } from "./Ornaments";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/event-ring.jpg";
import gallery4 from "@/assets/gallery-1.jpg";
import gallery5 from "@/assets/gallery-2.jpg";
import gallery6 from "@/assets/event-haldi.jpg";

/**
 * Replaceable placeholder imagery — the families' own photographs can be
 * dropped into src/assets and listed here once supplied.
 */
const PHOTOS = [
  { src: gallery1, caption: "Forever begins with a promise" },
  { src: gallery2, caption: "Mehandi, drawn with love" },
  { src: gallery3, caption: "Two rings, one journey" },
  { src: gallery4, caption: "Blossoms of celebration" },
  { src: gallery5, caption: "Adorned with blessings" },
  { src: gallery6, caption: "Golden hours of joy" },
];

/** Section 8 — premium photo carousel with lightbox. */
export function PhotoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });
  const [selected, setSelected] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(true);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const openLightbox = (index: number) => setSelected(index);

  const closeLightbox = useCallback(() => setSelected(null), []);

  const stepLightbox = useCallback(
    (dir: 1 | -1) => {
      setSelected((s) => (s === null ? s : (s + dir + PHOTOS.length) % PHOTOS.length));
    },
    [],
  );

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, closeLightbox, stepLightbox]);

  const activePhoto = selected === null ? undefined : PHOTOS[selected];

  return (
    <section id="gallery" className="relative overflow-hidden bg-ivory px-0 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <EyebrowLabel>Our Gallery</EyebrowLabel>
        <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-[0.12em] text-burgundy sm:text-5xl">
          A Journey of Two Hearts
        </h2>
        <p className="mt-4 font-display text-xl italic text-burgundy/75">
          Moments, memories, and the beginning of forever.
        </p>
        <GoldDivider className="mt-6" />
      </div>

      <div className="relative mt-14">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="min-w-0 flex-[0_0_78%] px-3 sm:flex-[0_0_46%] lg:flex-[0_0_34%]"
              >
                <button
                  type="button"
                  onClick={() => openLightbox(i)}
                  className="group block w-full overflow-hidden rounded-[var(--radius-2xl)] border border-gold/40 shadow-[0_22px_55px_-28px_color-mix(in_oklab,var(--color-burgundy)_45%,transparent)] focus-visible:outline-2 focus-visible:outline-dusty-rose"
                  aria-label={`Open photo ${i + 1}: ${photo.caption}`}
                >
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      width={1200}
                      height={1200}
                      className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-108"
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-ivory/90 text-burgundy shadow-md transition-colors hover:bg-gold/25 disabled:opacity-40 sm:left-6"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-ivory/90 text-burgundy shadow-md transition-colors hover:bg-gold/25 disabled:opacity-40 sm:right-6"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="mt-8 flex justify-center gap-2">
        {PHOTOS.map((_, i) => (
          <DotButton key={i} index={i} emblaApi={emblaApi} />
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${selected + 1} of ${PHOTOS.length}: ${activePhoto?.caption ?? ""}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-burgundy/90 p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-ivory/10 text-ivory transition-colors hover:bg-ivory/25"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              stepLightbox(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-ivory/10 text-ivory transition-colors hover:bg-ivory/25 sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              stepLightbox(1);
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-ivory/10 text-ivory transition-colors hover:bg-ivory/25 sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <figure
            className="max-h-full max-w-3xl animate-in fade-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={PHOTOS[selected].src}
              alt={PHOTOS[selected].caption}
              width={1200}
              height={1200}
              className="max-h-[82vh] w-auto rounded-[var(--radius-2xl)] border border-gold/50 object-contain"
            />
            <figcaption className="mt-4 text-center font-display text-lg italic text-ivory">
              {PHOTOS[selected].caption}
              <span className="ml-3 font-body text-xs uppercase tracking-[0.3em] text-blush">
                {selected + 1} / {PHOTOS.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

function DotButton({
  index,
  emblaApi,
}: {
  index: number;
  emblaApi: ReturnType<typeof useEmblaCarousel>[1];
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap() === index);
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, index]);

  return (
    <button
      type="button"
      onClick={() => emblaApi?.scrollTo(index)}
      aria-label={`Go to photo ${index + 1}`}
      aria-current={active}
      className={`h-2.5 rounded-full border border-gold-deep/50 transition-all ${
        active ? "w-7 bg-dusty-rose" : "w-2.5 bg-transparent hover:bg-gold/40"
      }`}
    />
  );
}
