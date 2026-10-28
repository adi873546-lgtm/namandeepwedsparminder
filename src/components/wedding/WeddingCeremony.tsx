import { wedding } from "@/config/wedding";
import baraatImg from "@/assets/event-baraat.jpg";
import { EyebrowLabel, FloatingPetals, GoldDivider } from "./Ornaments";

/** Section 6 — the main ceremony: immersive Baraat celebration. */
export function WeddingCeremony() {
  const c = wedding.ceremony;
  const resort = wedding.venues.resort;

  return (
    <section id="ceremony" className="relative overflow-hidden">
      {/* Immersive background */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={baraatImg}
          alt=""
          loading="lazy"
          width={1920}
          height={1088}
          className="ken-burns h-full w-full object-cover"
        />
        <div className="warm-overlay absolute inset-0" />
      </div>
      <FloatingPetals count={10} className="z-10 opacity-70" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center sm:py-36">
        <EyebrowLabel className="text-blush">{c.dateLabel}</EyebrowLabel>
        <h2 className="mt-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.5em] text-ivory/90">
          {c.heading}
        </h2>
        <p className="mt-6 font-script text-6xl leading-tight text-ivory drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-8xl">
          Ramandeep &amp; Parminder
        </p>
        <GoldDivider className="mt-8" />

        {/* Baraat */}
        <div className="mt-12 rounded-[var(--radius-2xl)] border border-gold/50 bg-burgundy/25 px-8 py-10 backdrop-blur-[3px]">
          <h3 className="font-display text-3xl font-semibold uppercase tracking-[0.18em] text-ivory sm:text-4xl">
            {c.baraat.name}
          </h3>
          <p className="mt-4 font-display text-4xl font-medium text-gold sm:text-5xl">
            {c.baraat.time}
          </p>
          <p className="mt-4 font-display text-lg italic text-ivory/90">{c.baraat.note}</p>
        </div>

        {/* Two distinct locations */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[var(--radius-2xl)] border border-gold/40 bg-burgundy/30 px-7 py-8 backdrop-blur-[3px]">
            <EyebrowLabel className="text-blush">{c.residence.label}</EyebrowLabel>
            <h4 className="mt-3 font-display text-2xl font-semibold text-ivory">
              {c.residence.name}
            </h4>
            <p className="mt-2 font-body text-sm leading-relaxed text-ivory/85">
              {c.residence.address}
            </p>
            <a
              href={wedding.venues.residence.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full border border-gold/60 px-5 py-2 font-body text-[0.62rem] font-bold uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-gold/25"
            >
              Get Directions
            </a>
          </div>
          <div className="rounded-[var(--radius-2xl)] border border-gold/40 bg-burgundy/30 px-7 py-8 backdrop-blur-[3px]">
            <EyebrowLabel className="text-blush">Wedding Venue</EyebrowLabel>
            <h4 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide text-ivory">
              {resort.name}
            </h4>
            <p className="mt-2 font-body text-sm leading-relaxed text-ivory/85">{resort.address}</p>
            <a
              href={resort.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full border border-gold/60 px-5 py-2 font-body text-[0.62rem] font-bold uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-gold/25"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
