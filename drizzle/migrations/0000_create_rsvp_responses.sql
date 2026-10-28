CREATE TABLE public.rsvp_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  attendee_count INTEGER NOT NULL DEFAULT 1 CHECK (attendee_count >= 1 AND attendee_count <= 20),
  attendance TEXT NOT NULL CHECK (attendance IN ('joyfully_accepts', 'regretfully_declines')),
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.rsvp_responses TO anon;
GRANT ALL ON public.rsvp_responses TO service_role;

ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Guests can submit RSVP responses"
  ON public.rsvp_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);