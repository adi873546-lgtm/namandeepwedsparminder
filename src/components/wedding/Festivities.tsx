import { wedding } from "@/config/wedding";
import eventHaldi from "@/assets/event-haldi.jpg";
import eventMehandi from "@/assets/event-mehandi.jpg";
import eventRing from "@/assets/event-ring.jpg";
import { EyebrowLabel, FloatingPetals, GoldDivider } from "./Ornaments";

const IMAGES = [eventHaldi, eventMehandi, eventRing];

/** Section 5 — Friday festivities as a connected editorial timeline. */
export function Festivities() {
  const f = wedding.festivities;
  const resort = wedding.venues.resort;

  return (
    <section id="festivities" className="relative overflow-hidden bg-cream px-6 py-24 sm:py-32">
      <FloatingPetals count={6} className="opacity-40" />
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <EyebrowLabel>{f.dateLabel}</EyebrowLabel>
        <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-[0.12em] text-burgundy sm:text-5xl">
          {f.heading}
        </h2>
        <GoldDivider className="mt-6" />

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          {f.events.map((event, i) => (
            <article
              key={event.name}
              className="group relative flex flex-col items-center"
            >
              {/* Timeline connector */}
              <div className="relative flex w-full items-center justify-center md:absolute md:-top-4 md:z-20" aria-hidden="true">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/70 bg-ivory font-display text-lg font-semibold text-gold-deep shadow-md group-hover:scale-105 transition-transform">
                  {i + 1}
                </span>
                {i < f.events.length - 1 && (
                  <span className="absolute left-[calc(50%+2.2rem)] hidden h-px w-[calc(100%-4.4rem)] gold-line md:block" />
                )}
              </div>

              <div className="relative mt-8 aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-2xl)] border border-gold/40 shadow-[0_22px_55px_-28px_color-mix(in_oklab,var(--color-burgundy)_45%,transparent)]">
                <img
                  src={IMAGES[i]}
                  alt={`${event.name} celebration setting`}
                  loading="lazy"
                  width={1920}
                  height={1088}
                  className="h-full w-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/75 via-burgundy/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                  <h3 className="font-display text-2xl font-semibold tracking-wide text-ivory">
                    {event.name}
                  </h3>
                  <p className="mt-1 font-body text-xs font-bold uppercase tracking-[0.3em] text-blush">
                    {event.time}
                  </p>
                </div>
              </div>

              {i === f.events.length - 1 && (
                <p className="mt-5 font-display text-lg italic text-gold-deep">{f.note}</p>
              )}
              {i !== f.events.length - 1 && <span className="mt-5 h-5" aria-hidden="true" />}
            </article>
          ))}
        </div>

        {/* Venue */}
        <div className="mx-auto mt-16 max-w-xl rounded-[var(--radius-2xl)] border border-gold/50 bg-ivory/80 px-8 py-8">
          <EyebrowLabel>Venue</EyebrowLabel>
          <h3 className="mt-3 font-display text-2xl font-semibold text-burgundy sm:text-3xl">
            {resort.name}
          </h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-foreground/80">{resort.address}</p>
          <a
            href={resort.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-deep/60 px-6 py-2.5 font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-burgundy transition-colors hover:bg-gold/20"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
