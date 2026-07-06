import type { Metadata } from "next";
import { HistoryClient } from "./_components/history-client";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "History",
  description: "View your recently generated barcodes and QR codes. Search, filter, delete, and export your generation history.",
};

export default function HistoryPage() {
  return (
    <>
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader badge="History" title="Generation History" subtitle="Your recently generated barcodes and QR codes. Stored locally on your device." />
        </Container>
      </Section>
      <Section variant="default" spacing="md">
        <HistoryClient />
      </Section>
    </>
  );
}
