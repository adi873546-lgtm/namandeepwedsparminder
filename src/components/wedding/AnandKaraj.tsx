import { wedding } from "@/config/wedding";
import gurudwaraImg from "@/assets/event-anandkaraj.jpg";
import { EyebrowLabel, FloatingPetals, GoldDivider } from "./Ornaments";

/** Section 7 — Anand Karaj and Doli: peaceful, respectful, elegant. */
export function AnandKaraj() {
  const a = wedding.anandKaraj;
  const gurudwara = wedding.venues.gurudwara;

  return (
    <section id="anand-karaj" className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={gurudwaraImg}
          alt=""
          loading="lazy"
          width={1920}
          height={1088}
          className="ken-burns h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/85 via-ivory/60 to-cream/90" />
      </div>
      <FloatingPetals count={5} className="z-10 opacity-40" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
        <EyebrowLabel>{a.dateLabel}</EyebrowLabel>
        <h2 className="mt-4 font-display text-5xl font-semibold uppercase tracking-[0.16em] text-burgundy sm:text-6xl">
          {a.heading}
        </h2>
        <p className="mt-5 font-display text-xl italic text-burgundy/75">
          A sacred union, blessed in prayer and love.
        </p>
        <GoldDivider className="mt-8" />

        {/* Gentle timeline */}
        <ol className="mx-auto mt-14 max-w-md space-y-0">
          {a.schedule.map((item, i) => (
            <li key={item.name} className="relative flex flex-col items-center">
              <div className="flex w-full items-center justify-between border-b border-gold/30 py-5">
                <span className="font-display text-xl font-medium text-burgundy sm:text-2xl">
                  {item.name}
                </span>
                <span className="font-body text-sm font-bold uppercase tracking-[0.2em] text-dusty-rose">
                  {item.time}
                </span>
              </div>
              {i < a.schedule.length - 1 && (
                <span className="h-px w-px flex-1 bg-gold/40" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-14 max-w-xl rounded-[var(--radius-2xl)] border border-gold/50 bg-ivory/80 px-8 py-8">
          <EyebrowLabel>Venue</EyebrowLabel>
          <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide text-burgundy sm:text-3xl">
            {gurudwara.name}
          </h3>
          <p className="mt-3 font-body text-sm text-foreground/80">{gurudwara.address}</p>
          <a
            href={gurudwara.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full border border-gold-deep/60 px-6 py-2.5 font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-burgundy transition-colors hover:bg-gold/20"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
