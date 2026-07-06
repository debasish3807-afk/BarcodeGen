import type { Metadata } from "next";
import { TemplatesClient } from "./_components/templates-client";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Templates",
  description: "Professional barcode and QR code templates. Business cards, product labels, shipping labels, event tickets, WiFi QR, payment QR and more.",
};

export default function TemplatesPage() {
  return (
    <>
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader badge="Templates" title="Ready-to-Use Templates" subtitle="Instantly load professional templates for barcodes and QR codes. Click any template to start generating." />
        </Container>
      </Section>
      <Section variant="default" spacing="md">
        <TemplatesClient />
      </Section>
    </>
  );
}
