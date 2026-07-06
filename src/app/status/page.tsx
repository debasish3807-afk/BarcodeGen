import type { Metadata } from "next";
import { StatusClient } from "./_components/status-client";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "System Status",
  description: "BarcodeGen system status. Check the current operational status of all services including API, database, CDN, and email.",
};

export default function StatusPage() {
  return (
    <>
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader badge="Status" title="System Status" subtitle="Real-time operational status of all BarcodeGen services." />
        </Container>
      </Section>
      <Section variant="default" spacing="md">
        <StatusClient />
      </Section>
    </>
  );
}
