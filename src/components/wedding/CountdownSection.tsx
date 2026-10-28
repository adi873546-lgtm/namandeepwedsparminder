import { useEffect, useState } from "react";
import { getTimeRemaining, type TimeRemaining } from "@/lib/countdown";
import { wedding } from "@/config/wedding";
import { EyebrowLabel, GoldDivider } from "./Ornaments";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        key={value}
        className="animate-in fade-in zoom-in-95 duration-500 font-display text-5xl font-semibold tabular-nums text-burgundy sm:text-7xl"
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-3 font-body text-[0.6rem] font-bold uppercase tracking-[0.35em] text-dusty-rose sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function ThinGoldSeparator() {
  return (
    <span
      aria-hidden="true"
      className="mt-1 hidden font-display text-4xl font-light text-gold/70 sm:block sm:text-6xl"
    >
      ·
    </span>
  );
}

/** Section 3 — the romantic message and live countdown to the wedding day. */
export function CountdownSection() {
  const [time, setTime] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const compute = () => setTime(getTimeRemaining(wedding.countdownTargetISO, Date.now()));
    compute();
    const id = window.setInterval(compute, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="relative overflow-hidden bg-gradient-to-b from-blush/60 via-background to-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mx-auto max-w-2xl font-display text-xl italic leading-relaxed text-burgundy/85 sm:text-2xl">
          {wedding.countdownMessage}
        </p>

        <GoldDivider className="mt-10" />

        <h2 className="mt-10 font-body text-[0.72rem] font-bold uppercase tracking-[0.5em] text-dusty-rose">
          The Wedding Day
        </h2>
        <p className="mt-4 font-display text-3xl font-semibold tracking-[0.08em] text-burgundy sm:text-5xl">
          {wedding.weddingDateLabel}
        </p>

        {time && !time.passed ? (
          <div className="mt-14 flex items-start justify-center gap-3 sm:gap-6" role="timer" aria-live="off">
            {UNITS.map((u, i) => (
              <div key={u.key} className="flex items-start gap-3 sm:gap-6">
                <Unit value={time[u.key]} label={u.label} />
                {i < UNITS.length - 1 && <ThinGoldSeparator />}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-14 font-display text-2xl italic text-gold-deep">
            Celebrating a beautiful beginning.
          </p>
        )}

        <EyebrowLabel className="mt-14 block">Muzaffarpur, Bihar</EyebrowLabel>
      </div>
    </section>
  );
}
