import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { rsvpSchema } from "./rsvp-schema";

export interface RsvpResult {
  ok: boolean;
  error?: string;
}

/**
 * Public RSVP submission. Validates input server-side, then inserts one row
 * through the publishable client — the anon INSERT policy on
 * rsvp_responses is the only write path, and no reads are exposed to guests.
 */
export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => rsvpSchema.parse(input))
  .handler(async ({ data }): Promise<RsvpResult> => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    const url = process.env["SUPABASE_URL"];
    if (!key || !url) {
      return { ok: false, error: "The RSVP service is not configured yet. Please try again later." };
    }

    const supabasePublic = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabasePublic.from("rsvp_responses").insert({
      guest_name: data.guestName,
      attendee_count: data.attendeeCount,
      attendance: data.attendance,
      message: data.message ? data.message : null,
    });

    if (error) {
      console.error("RSVP insert failed:", error.message);
      return {
        ok: false,
        error: "We couldn't save your RSVP right now. Please try again in a moment.",
      };
    }

    return { ok: true };
  });
