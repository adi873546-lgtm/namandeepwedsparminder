import { describe, expect, it } from "vitest";
import { rsvpSchema, ATTENDANCE_OPTIONS } from "@/lib/rsvp-schema";

describe("rsvp validation", () => {
  it("accepts a valid RSVP", () => {
    const parsed = rsvpSchema.parse({
      guestName: "  Harleen Kaur  ",
      attendeeCount: 3,
      attendance: "joyfully_accepts",
      message: "So happy for you both!",
    });
    expect(parsed.guestName).toBe("Harleen Kaur");
    expect(parsed.attendeeCount).toBe(3);
  });

  it("only allows the two supplied attendance options", () => {
    expect(ATTENDANCE_OPTIONS.map((o) => o.value)).toEqual([
      "joyfully_accepts",
      "regretfully_declines",
    ]);
    expect(
      rsvpSchema.safeParse({
        guestName: "A",
        attendeeCount: 1,
        attendance: "maybe",
      }).success,
    ).toBe(false);
  });

  it("requires a name and rejects empty input", () => {
    expect(
      rsvpSchema.safeParse({ guestName: "   ", attendeeCount: 1, attendance: "joyfully_accepts" })
        .success,
    ).toBe(false);
  });

  it("rejects attendee counts below 1 and above 20", () => {
    expect(
      rsvpSchema.safeParse({ guestName: "A", attendeeCount: 0, attendance: "joyfully_accepts" })
        .success,
    ).toBe(false);
    expect(
      rsvpSchema.safeParse({ guestName: "A", attendeeCount: 21, attendance: "joyfully_accepts" })
        .success,
    ).toBe(false);
  });

  it("caps the optional message at 500 characters", () => {
    expect(
      rsvpSchema.safeParse({
        guestName: "A",
        attendeeCount: 1,
        attendance: "regretfully_declines",
        message: "x".repeat(501),
      }).success,
    ).toBe(false);
  });
});
