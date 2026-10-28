/**
 * Single source of truth for every wedding detail.
 * Names, dates, times, venues and family titles must never be invented —
 * only edit values that the families confirm.
 */

export const wedding = {
  groom: "Ramandeep",
  bride: "Parminder",
  coupleNames: "Ramandeep Weds Parminder",
  weddingDateLabel: "Saturday, 21 November 2026",

  /** Live countdown target — the start of the wedding day in IST. */
  countdownTargetISO: "2026-11-21T00:00:00+05:30",
  timezone: "Asia/Kolkata",

  tagline: "Two hearts, one beautiful journey, and a lifetime of love.",
  inviteMessage:
    "With the blessings of our families, we invite you to celebrate the beginning of our forever.",

  countdownMessage: "A new chapter, woven with two hearts and the blessings of family.",

  blessings: {
    heavenly: "With the Heavenly blessings of Gurupurab",
    grandparents: "Sdn. Satik Kaur & Late Sdr. Hari Singh Jawa",
    honouredLine:
      "We feel privileged and honoured to have your gracious presence on the auspicious occasion of",
    parents: "Sdn. Gurmeet Kaur & Sdr. Jagjit Singh Jawa",
    sonLine: "The Wedding Ceremony of their beloved son",
    brideParents: "(D/o Sdn. Rani Kaur & Late Sdr. Shivram Singh)",
  },

  festivities: {
    heading: "Wedding Festivities",
    dateLabel: "Friday, 20 November 2026",
    events: [
      { name: "Haldi Carnival", time: "11:00 AM" },
      { name: "Mehandi Ceremony", time: "4:00 PM" },
      { name: "Ring Ceremony & Sagan", time: "6:00 PM" },
    ],
    note: "Followed by Lunch & Dinner",
  },

  ceremony: {
    heading: "The Wedding Ceremony",
    coupleLabel: "Ramandeep & Parminder",
    dateLabel: "Saturday, 21 November 2026",
    baraat: {
      name: "Procession of Barat",
      time: "6:00 PM",
      note: "Followed by Dinner",
    },
    residence: {
      label: "From Our Residence",
      name: "21, Shankar Nagar",
      address: "Near Gurudwara, Ramna, Muzaffarpur",
    },
  },

  anandKaraj: {
    heading: "Anand Karaj",
    dateLabel: "Sunday, 22 November 2026",
    schedule: [
      { name: "Anand Karaj", time: "9:00 AM" },
      { name: "Breakfast", time: "10:00 AM" },
      { name: "Lunch", time: "1:00 PM" },
      { name: "Doli", time: "3:00 PM" },
    ],
  },

  venues: {
    resort: {
      name: "Mayur Mahal Resort",
      address:
        "Shivhar Kothi, Road, Near Pristine School, Kanhauli, Muzaffarpur, Bihar 842001",
      events: [
        "Haldi Carnival",
        "Mehandi Ceremony",
        "Ring Ceremony & Sagan",
        "Wedding Baraat and Dinner",
      ],
      directions:
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("Mayur Mahal Resort, Kanhauli, Muzaffarpur, Bihar 842001"),
    },
    residence: {
      name: "Residence",
      address: "21, Shankar Nagar, Near Gurudwara, Ramna, Muzaffarpur",
      events: ["Procession of Barat (starting point)"],
      directions:
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("Shankar Nagar, Ramna, Muzaffarpur, Bihar"),
    },
    gurudwara: {
      name: "Gurudwara Sri Guru Singh Sabha",
      address: "Ramna, Muzaffarpur",
      events: ["Anand Karaj, Breakfast, Lunch & Doli"],
      directions:
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("Gurudwara Sri Guru Singh Sabha, Ramna, Muzaffarpur, Bihar"),
    },
  },

  rsvpContacts: [
    "Sdr. Manohar Singh Jawa",
    "Sdr. Harbans Singh Jawa",
    "Sdr. Jagjit Singh Jawa",
    "Shri Arun Kumar Thakur",
    "Sdr. Harjot Singh Bhalla",
    "Sdr. Harnyal Singh Jawa",
    "Dr. Kuldip Kaur",
    "Sdn. Amarjeet Kaur Bhalla",
  ],

  closing: {
    compliments: "All Relatives & Friends",
    message: "Your love, blessings, and presence will make these moments unforgettable.",
  },
} as const;

export type WeddingConfig = typeof wedding;
