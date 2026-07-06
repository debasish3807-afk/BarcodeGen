import type { Metadata } from "next";
import { BatchGeneratorClient } from "./_components/batch-generator-client";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Batch Generator",
  description:
    "Generate thousands of barcodes and QR codes at once. Upload CSV, Excel, TXT, or JSON files. Download as ZIP with PNG, SVG, PDF, JPG, or WebP.",
  keywords: [
    "batch barcode generator",
    "bulk qr code generator",
    "csv barcode maker",
    "mass barcode generation",
    "bulk barcode download",
  ],
};

export default function BatchGeneratorPage() {
  return (
    <>
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader
            badge="Batch"
            title="Batch Generator"
            subtitle="Generate thousands of barcodes or QR codes at once. Upload CSV, Excel, TXT, or JSON — download everything as a ZIP."
          />
        </Container>
      </Section>
      <Section variant="default" spacing="md">
        <BatchGeneratorClient />
      </Section>
    </>
  );
}
