import type { Metadata } from "next";
import { FavoritesClient } from "./_components/favorites-client";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your saved barcode and QR code configurations. Quickly access, manage, and reuse your favorite settings.",
};

export default function FavoritesPage() {
  return (
    <>
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader badge="Favorites" title="Your Favorites" subtitle="Saved configurations for quick access. Add, rename, duplicate, search, and export your favorites." />
        </Container>
      </Section>
      <Section variant="default" spacing="md">
        <FavoritesClient />
      </Section>
    </>
  );
}
