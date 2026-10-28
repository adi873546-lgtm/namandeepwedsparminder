import { cn } from "@/lib/utils";

/** Ornamental gold divider with a small floral flourish. */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden="true"
    >
      <span className="gold-line h-px w-16 sm:w-24" />
      <svg width="34" height="18" viewBox="0 0 34 18" fill="none" className="text-gold-deep">
        <path
          d="M17 2c-2.4 0-4.3 1.6-4.6 3.6C10.5 4.4 8 4.6 6.6 6.2c-1.5 1.7-1.2 4.3.7 5.6 1.9 1.3 4.5.9 5.8-.9.5-.7.8-1.5.8-2.3M17 2c2.4 0 4.3 1.6 4.6 3.6 1.9-1.2 4.4-1 5.8.6 1.5 1.7 1.2 4.3-.7 5.6-1.9 1.3-4.5.9-5.8-.9-.5-.7-.8-1.5-.8-2.3M17 2v14"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="4" cy="9" r="1.1" fill="currentColor" />
        <circle cx="30" cy="9" r="1.1" fill="currentColor" />
      </svg>
      <span className="gold-line h-px w-16 sm:w-24" />
    </div>
  );
}

/** Delicate floating petals drifting down a section. */
export function FloatingPetals({
  count = 10,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const petals = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 97) % 100}%`,
    delay: `${(i * 1.7) % 14}s`,
    duration: `${11 + ((i * 2.3) % 7)}s`,
    size: 10 + ((i * 5) % 9),
    color: i % 3 === 0 ? "var(--color-gold)" : i % 3 === 1 ? "var(--color-blush)" : "var(--color-rose)",
  }));

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 animate-petal-fall rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.35,
            background: p.color,
            opacity: 0.55,
            animationDelay: p.delay,
            animationDuration: p.duration,
            borderRadius: "60% 60% 60% 60% / 80% 80% 40% 40%",
          }}
        />
      ))}
    </div>
  );
}

/** Thin double border frame used on invitation panels. */
export function InvitationFrame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-[var(--radius-3xl)] border border-gold/50 p-[10px] shadow-[0_18px_50px_-24px_color-mix(in_oklab,var(--color-burgundy)_35%,transparent)]",
        className,
      )}
    >
      <div className="rounded-[calc(var(--radius-3xl)-6px)] border border-gold/30 h-full">
        {children}
      </div>
    </div>
  );
}

/** Section eyebrow label — spaced small caps with gold rules. */
export function EyebrowLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-body text-[0.7rem] font-bold uppercase tracking-[0.42em] text-dusty-rose",
        className,
      )}
    >
      {children}
    </p>
  );
}
