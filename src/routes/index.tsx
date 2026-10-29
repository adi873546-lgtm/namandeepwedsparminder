import { createFileRoute } from "@tanstack/react-router";
import { OpeningInvitation } from "@/components/wedding/OpeningInvitation";
import { ScratchDateCard } from "@/components/wedding/ScratchDateCard";
import { CountdownSection } from "@/components/wedding/CountdownSection";
import { FamilyBlessings } from "@/components/wedding/FamilyBlessings";
import { Festivities } from "@/components/wedding/Festivities";
import { WeddingCeremony } from "@/components/wedding/WeddingCeremony";
import { AnandKaraj } from "@/components/wedding/AnandKaraj";
import { PhotoCarousel } from "@/components/wedding/PhotoCarousel";
import { Venues } from "@/components/wedding/Venues";
import { RsvpSection } from "@/components/wedding/RsvpSection";
import { ClosingSection } from "@/components/wedding/ClosingSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ramandeep Weds Parminder — Wedding Invitation | 21 November 2026" },
      {
        name: "description",
        content:
          "Join us for the wedding of Ramandeep and Parminder — festivities on 20 November, ceremony and Baraat on 21 November, and Anand Karaj on 22 November 2026 in Muzaffarpur, Bihar.",
      },
      { property: "og:title", content: "Ramandeep Weds Parminder — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Together with our families, we invite you to celebrate the wedding of Ramandeep and Parminder — 21 November 2026, Muzaffarpur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingInvitationPage,
});

function WeddingInvitationPage() {
  return (
    <main className="min-h-screen bg-background">
      <OpeningInvitation />
      <ScratchDateCard />
      <CountdownSection />
      <FamilyBlessings />
      <Festivities />
      <WeddingCeremony />
      <AnandKaraj />
      <PhotoCarousel />
      <Venues />
      <RsvpSection />
      <ClosingSection />
    </main>
  );
}
