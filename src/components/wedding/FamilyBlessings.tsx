import { wedding } from "@/config/wedding";
import { EyebrowLabel, FloatingPetals, GoldDivider, InvitationFrame } from "./Ornaments";

/** Section 4 — family blessings and the formal invitation. */
export function FamilyBlessings() {
  const b = wedding.blessings;
  return (
    <section id="blessings" className="relative overflow-hidden bg-ivory px-6 py-24 sm:py-32">
      <FloatingPetals count={8} className="opacity-50" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <InvitationFrame className="bg-cream/70">
          <div className="px-6 py-14 text-center sm:px-14 sm:py-20">
            <EyebrowLabel>Family Blessings</EyebrowLabel>

            <p className="mt-8 font-display text-lg italic text-burgundy/85 sm:text-xl">
              {b.heavenly}
            </p>
            <p className="mt-4 font-display text-2xl font-semibold text-burgundy sm:text-3xl">
              {b.grandparents}
            </p>

            <GoldDivider className="mt-10" />

            <p className="mx-auto mt-10 max-w-xl font-body text-sm leading-relaxed text-foreground/85 sm:text-base">
              {b.honouredLine}
            </p>

            <p className="mt-8 font-display text-2xl font-semibold text-burgundy sm:text-3xl">
              {b.parents}
            </p>
            <p className="mt-4 font-body text-[0.68rem] font-bold uppercase tracking-[0.4em] text-dusty-rose">
              {b.sonLine}
            </p>

            <h2 className="mt-8 font-script text-6xl leading-tight text-burgundy sm:text-8xl">
              Namandeep
            </h2>
            <p className="my-2 font-display text-xl italic text-dusty-rose sm:text-2xl">with</p>
            <h2 className="font-script text-6xl leading-tight text-burgundy sm:text-8xl">
              Parminder
            </h2>

            <p className="mt-8 font-display text-lg italic text-burgundy/85 sm:text-xl">
              {b.brideParents}
            </p>

            <GoldDivider className="mt-10" />
          </div>
        </InvitationFrame>
      </div>
    </section>
  );
}
