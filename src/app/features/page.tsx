import type { Metadata } from "next";
import { FeaturesSection } from "@/components/sections/features-section";
import { WhyChooseSection } from "@/components/sections/why-choose-section";
import { CTASection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore all features of BarcodeGen - 30+ barcode formats, QR code generation, bulk processing, high-resolution downloads, API access, and more.",
};

export default function FeaturesPage() {
  return (
    <>
      {/* Page Header */}
      <Section variant="muted" spacing="lg" className="pt-28">
        <Container>
          <SectionHeader
            badge="Features"
            title="Powerful Features for Every Need"
            subtitle="Everything you need to create, customize, and manage professional barcodes and QR codes."
          />
        </Container>
      </Section>

      <FeaturesSection />
      <WhyChooseSection />
      <CTASection />
    </>
  );
}
