import type { Metadata } from "next";
import { AIGeneratorClient } from "./_components/ai-generator-client";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "AI Generator",
  description: "Describe what you need and our AI assistant prepares the barcode or QR code configuration for you. No external API — instant, private, client-side.",
};

export default function AIGeneratorPage() {
  return (
    <>
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader badge="AI Assistant" title="AI Barcode & QR Generator" subtitle="Just describe what you need. Our AI prepares all required fields instantly — no signup, no external API." />
        </Container>
      </Section>
      <Section variant="default" spacing="md">
        <AIGeneratorClient />
      </Section>
    </>
  );
}
