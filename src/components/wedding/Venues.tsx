import { wedding } from "@/config/wedding";
import { EyebrowLabel, GoldDivider } from "./Ornaments";

/** Section 9 — all three locations with directions. */
export function Venues() {
  const { resort, residence, gurudwara } = wedding.venues;

  const cards = [
    { ...resort, eyebrow: "Celebrations & Baraat", highlighted: true },
    { ...residence, eyebrow: "Baraat Starting Point", highlighted: false },
    { ...gurudwara, eyebrow: "Anand Karaj & Sunday Schedule", highlighted: false },
  ];

  return (
    <section id="venues" className="relative overflow-hidden bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <EyebrowLabel>Find Your Way</EyebrowLabel>
        <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-[0.12em] text-burgundy sm:text-5xl">
          Wedding Venues
        </h2>
        <p className="mt-4 font-display text-xl italic text-burgundy/75">
          Three cherished places, one beautiful celebration.
        </p>
        <GoldDivider className="mt-6" />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((v) => (
            <div
              key={v.name + v.address}
              className={`flex flex-col rounded-[var(--radius-2xl)] border px-7 py-9 text-center transition-shadow hover:shadow-[0_22px_55px_-30px_color-mix(in_oklab,var(--color-burgundy)_40%,transparent)] ${
                v.highlighted
                  ? "border-gold-deep/50 bg-gradient-to-b from-ivory to-blush/40"
                  : "border-gold/40 bg-ivory/80"
              }`}
            >
              <EyebrowLabel>{v.eyebrow}</EyebrowLabel>
              <h3 className="mt-4 font-display text-2xl font-semibold text-burgundy">{v.name}</h3>
              <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-foreground/80">
                {v.address}
              </p>
              <ul className="mt-4 space-y-1.5">
                {v.events.map((e) => (
                  <li key={e} className="font-body text-xs uppercase tracking-[0.18em] text-dusty-rose">
                    {e}
                  </li>
                ))}
              </ul>
              <a
                href={v.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center rounded-full bg-burgundy px-6 py-2.5 font-body text-[0.62rem] font-bold uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-dusty-rose"
              >
                Get Directions
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
