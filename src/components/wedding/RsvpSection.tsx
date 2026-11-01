import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitRsvp, type RsvpResult } from "@/lib/rsvp.functions";
import { ATTENDANCE_OPTIONS } from "@/lib/rsvp-schema";
import { wedding } from "@/config/wedding";
import { EyebrowLabel, FloatingPetals, GoldDivider } from "./Ornaments";

const SUBMITTED_KEY = "rsvp-submitted-ramandeep-parminder";

type Status = "idle" | "submitting" | "success";

/** Section 10 — RSVP form, saved to the backend when submitted. */
export function RsvpSection() {
  const submitFn = useServerFn(submitRsvp);

  const [guestName, setGuestName] = useState("");
  const [attendeeCount, setAttendeeCount] = useState("1");
  const [attendance, setAttendance] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<"guestName" | "attendeeCount" | "attendance" | "message", string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    setAlreadySubmitted(window.localStorage.getItem(SUBMITTED_KEY) === "1");
  }, []);

  const validate = () => {
    const next: Partial<Record<"guestName" | "attendeeCount" | "attendance" | "message", string>> = {};
    if (!guestName.trim()) next.guestName = "Please enter your full name.";
    else if (guestName.trim().length > 100) next.guestName = "Name must be under 100 characters.";
    const count = Number(attendeeCount);
    if (!Number.isInteger(count) || count < 1 || count > 20)
      next.attendeeCount = "Please choose between 1 and 20 guests.";
    if (attendance !== "joyfully_accepts" && attendance !== "regretfully_declines")
      next.attendance = "Please choose an option.";
    if (message.trim().length > 500) next.message = "Message must be under 500 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting" || alreadySubmitted) return;
    if (!validate()) return;

    setStatus("submitting");
    setServerError(null);

    const result: RsvpResult = await submitFn({
      data: {
        guestName: guestName.trim(),
        attendeeCount: Number(attendeeCount),
        attendance,
        message: message.trim(),
      },
    });

    if (result.ok) {
      window.localStorage.setItem(SUBMITTED_KEY, "1");
      setAlreadySubmitted(true);
      setStatus("success");
    } else {
      setStatus("idle");
      setServerError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="rsvp" className="relative overflow-hidden bg-gradient-to-b from-blush/50 via-background to-ivory px-6 py-24 sm:py-32">
      <FloatingPetals count={6} className="opacity-40" />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <EyebrowLabel>R.S.V.P.</EyebrowLabel>
        <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-[0.1em] text-burgundy sm:text-5xl">
          Your Presence Is Our Present
        </h2>
        <p className="mt-4 font-display text-xl italic text-burgundy/75">
          Your blessings and presence will make our celebration even more special.
        </p>
        <GoldDivider className="mt-6" />

        {status === "success" || alreadySubmitted ? (
          <div className="mt-12 rounded-[var(--radius-2xl)] border border-gold/60 bg-ivory/90 px-8 py-14">
            <p className="font-script text-5xl text-dusty-rose">Thank You</p>
            <p className="mx-auto mt-6 max-w-md font-display text-xl italic leading-relaxed text-burgundy">
              Your response has been received with love. We cannot wait to celebrate with you.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-12 rounded-[var(--radius-2xl)] border border-gold/50 bg-ivory/90 px-6 py-10 text-left sm:px-10"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="guestName" className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-burgundy">
                  Guest Full Name
                </label>
                <input
                  id="guestName"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  maxLength={120}
                  aria-invalid={!!errors.guestName}
                  aria-describedby={errors.guestName ? "guestName-error" : undefined}
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-input bg-background px-4 py-3 font-body text-sm text-foreground shadow-sm outline-none transition-colors focus:border-dusty-rose focus:ring-2 focus:ring-ring/40"
                  placeholder="Your name"
                />
                {errors.guestName && (
                  <p id="guestName-error" className="mt-1.5 font-body text-xs text-destructive">
                    {errors.guestName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="attendeeCount" className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-burgundy">
                  Number of Attendees
                </label>
                <select
                  id="attendeeCount"
                  value={attendeeCount}
                  onChange={(e) => setAttendeeCount(e.target.value)}
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-input bg-background px-4 py-3 font-body text-sm text-foreground shadow-sm outline-none transition-colors focus:border-dusty-rose focus:ring-2 focus:ring-ring/40"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
                {errors.attendeeCount && (
                  <p className="mt-1.5 font-body text-xs text-destructive">{errors.attendeeCount}</p>
                )}
              </div>

              <fieldset>
                <legend className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-burgundy">
                  Will you join us?
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {ATTENDANCE_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-center justify-center rounded-[var(--radius-md)] border px-4 py-3 font-body text-sm transition-colors ${
                        attendance === opt.value
                          ? "border-dusty-rose bg-blush/60 text-burgundy"
                          : "border-input bg-background text-foreground/80 hover:border-gold"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={opt.value}
                        checked={attendance === opt.value}
                        onChange={() => setAttendance(opt.value)}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                {errors.attendance && (
                  <p className="mt-1.5 font-body text-xs text-destructive">{errors.attendance}</p>
                )}
              </fieldset>

              <div>
                <label htmlFor="message" className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-burgundy">
                  A Message for the Couple <span className="normal-case text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  maxLength={600}
                  className="mt-2 w-full resize-none rounded-[var(--radius-md)] border border-input bg-background px-4 py-3 font-body text-sm text-foreground shadow-sm outline-none transition-colors focus:border-dusty-rose focus:ring-2 focus:ring-ring/40"
                  placeholder="Share your wishes and blessings…"
                />
                {errors.message && (
                  <p className="mt-1.5 font-body text-xs text-destructive">{errors.message}</p>
                )}
              </div>

              {serverError && (
                <p role="alert" className="rounded-[var(--radius-md)] border border-destructive/30 bg-destructive/5 px-4 py-3 font-body text-sm text-destructive">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-full bg-burgundy px-8 py-4 font-body text-xs font-bold uppercase tracking-[0.35em] text-ivory shadow-lg transition-all hover:bg-dusty-rose hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending Your Response…" : "Send RSVP"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
