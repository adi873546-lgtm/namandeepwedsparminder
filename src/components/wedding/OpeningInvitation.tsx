import { wedding } from "@/config/wedding";
import heroFloral from "@/assets/hero-floral.jpg";
import { FloatingPetals, GoldDivider } from "./Ornaments";

/**
 * Section 1 — full-screen opening invitation. No interaction is required
 * to continue; a tasteful scroll cue invites guests onward.
 */
export function OpeningInvitation() {
  return (
    <section
      id="invitation"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-cover bg-center px-6 py-20"
      style={{ backgroundImage: `url(${heroFloral})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-ivory/20 to-ivory/60" />
      <FloatingPetals count={12} />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="animate-in fade-in slide-in-from-top-4 duration-1000 font-body text-[0.7rem] font-bold uppercase tracking-[0.45em] text-burgundy/80">
          Together With Our Families
        </p>

        <GoldDivider className="mt-8 animate-in fade-in duration-1000 delay-150" />

        <h1 className="mt-10 animate-in fade-in zoom-in duration-1000 delay-300 font-script text-6xl leading-[1.15] text-burgundy sm:text-8xl">
          Ramandeep
          <span className="mx-3 inline-block align-middle font-display text-2xl italic text-dusty-rose sm:text-4xl">
            weds
          </span>
          Parminder
        </h1>

        <GoldDivider className="mt-8 animate-in fade-in duration-1000 delay-500" />

        <p className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700 font-display text-3xl font-medium tracking-[0.14em] text-gold-deep sm:text-4xl">
          21 November 2026
        </p>

        <p className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000 font-display text-xl italic text-burgundy/90 sm:text-2xl">
          {wedding.tagline}
        </p>

        <p className="mx-auto mt-5 max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1200 font-body text-sm leading-relaxed text-foreground/80 sm:text-base">
          {wedding.inviteMessage}
        </p>

        <a
          href="#scratch-card"
          className="mt-14 inline-flex animate-in fade-in duration-1000 delay-1500 flex-col items-center gap-2 text-burgundy transition-colors hover:text-dusty-rose"
          aria-label="Scroll to reveal our wedding date"
        >
          <span className="font-body text-[0.65rem] font-bold uppercase tracking-[0.4em]">
            Scroll to Continue
          </span>
          <span className="animate-soft-pulse block h-9 w-px bg-gold-deep" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
