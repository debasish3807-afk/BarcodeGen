import type { Metadata } from "next";
import { PricingClient } from "./_components/pricing-client";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Pricing",
  description: "BarcodeGen pricing plans. Free, Starter, Professional, Business, and Enterprise plans with API access, batch generation, and more.",
};

export default function PricingPage() {
  return (
    <>
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader badge="Pricing" title="Simple, Transparent Pricing" subtitle="Choose the plan that fits your needs. Upgrade or downgrade anytime. All plans include free updates." />
        </Container>
      </Section>
      <Section variant="default" spacing="md">
        <PricingClient />
      </Section>
    </>
  );
}
