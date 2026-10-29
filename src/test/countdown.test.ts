import { describe, expect, it } from "vitest";
import { getTimeRemaining } from "@/lib/countdown";
import { wedding } from "@/config/wedding";

// 21 November 2026, midnight IST == 2026-11-20T18:30:00Z
const WEDDING_MS = new Date(wedding.countdownTargetISO).getTime();

describe("wedding countdown", () => {
  it("counts down to 21 November 2026 midnight IST", () => {
    expect(WEDDING_MS).toBe(new Date("2026-11-20T18:30:00Z").getTime());
  });

  it("computes days, hours, minutes and seconds correctly", () => {
    // One week minus 5h30m before the target
    const now = new Date("2026-11-13T00:00:00Z").getTime();
    const t = getTimeRemaining(wedding.countdownTargetISO, now);
    expect(t.passed).toBe(false);
    expect(t.days).toBe(7);
    expect(t.hours).toBe(18);
    expect(t.minutes).toBe(30);
    expect(t.seconds).toBe(0);
  });

  it("reports the exact second remaining", () => {
    // Target minus 1 hour 2 minutes 3 seconds
    const now = WEDDING_MS - (3600 + 120 + 3) * 1000;
    const t = getTimeRemaining(wedding.countdownTargetISO, now);
    expect(t.days).toBe(0);
    expect(t.hours).toBe(1);
    expect(t.minutes).toBe(2);
    expect(t.seconds).toBe(3);
  });

  it("never shows a negative countdown after the wedding day", () => {
    const now = WEDDING_MS + 1000;
    const t = getTimeRemaining(wedding.countdownTargetISO, now);
    expect(t.passed).toBe(true);
    expect(t.days).toBe(0);
    expect(t.hours).toBe(0);
    expect(t.minutes).toBe(0);
    expect(t.seconds).toBe(0);
  });
});
