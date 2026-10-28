import { z } from "zod";

export const rsvpSchema = z.object({
  guestName: z
    .string()
    .trim()
    .min(1, "Please enter your full name.")
    .max(100, "Name must be under 100 characters."),
  attendeeCount: z
    .number()
    .int("Attendees must be a whole number.")
    .min(1, "At least one guest is required.")
    .max(20, "Please contact the family for parties larger than 20."),
  attendance: z.enum(["joyfully_accepts", "regretfully_declines"], {
    message: "Please choose Joyfully Accepts or Regretfully Declines.",
  }),
  message: z
    .string()
    .trim()
    .max(500, "Message must be under 500 characters.")
    .optional()
    .or(z.literal("")),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

export const ATTENDANCE_OPTIONS = [
  { value: "joyfully_accepts", label: "Joyfully Accepts" },
  { value: "regretfully_declines", label: "Regretfully Declines" },
] as const;
