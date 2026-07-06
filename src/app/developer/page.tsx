import type { Metadata } from "next";
import { DeveloperClient } from "./_components/developer-client";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Developer Console",
  description: "BarcodeGen Developer Console. Manage API keys, view usage analytics, test endpoints live, and download SDKs.",
};

export default function DeveloperPage() {
  return (
    <>
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader badge="Developers" title="Developer Console" subtitle="Manage API keys, monitor usage, test endpoints, and integrate BarcodeGen into your applications." />
        </Container>
      </Section>
      <Section variant="default" spacing="md">
        <DeveloperClient />
      </Section>
    </>
  );
}
