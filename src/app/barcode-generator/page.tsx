import type { Metadata } from "next";
import { BarcodeGeneratorClient } from "./_components/barcode-generator-client";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Barcode Generator",
  description:
    "Generate professional barcodes online for free. Support for Code 128, Code 39, EAN-13, EAN-8, UPC-A, UPC-E, ITF, Codabar, MSI, GS1-128 and more. Download in PNG, SVG, PDF, JPG, WebP.",
  keywords: [
    "barcode generator",
    "free barcode maker",
    "Code 128 generator",
    "EAN-13 generator",
    "UPC barcode creator",
    "online barcode tool",
    "barcode download PNG SVG PDF",
  ],
};

export default function BarcodeGeneratorPage() {
  return (
    <>
      {/* Header */}
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader
            badge="Generator"
            title="Barcode Generator"
            subtitle="Create professional barcodes in 11 formats. Customize, preview in real-time, and download in multiple formats — completely free."
          />
        </Container>
      </Section>

      {/* Generator */}
      <Section variant="default" spacing="md">
        <BarcodeGeneratorClient />
      </Section>
    </>
  );
}
