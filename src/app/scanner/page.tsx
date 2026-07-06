import type { Metadata } from "next";
import { ScannerClient } from "./_components/scanner-client";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "QR & Barcode Scanner",
  description: "Scan QR codes and barcodes using your camera or by uploading an image. Free online scanner with instant decoding.",
};

export default function ScannerPage() {
  return (
    <>
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader badge="Scanner" title="QR & Barcode Scanner" subtitle="Scan QR codes and barcodes instantly using your camera or by uploading an image." />
        </Container>
      </Section>
      <Section variant="default" spacing="md">
        <ScannerClient />
      </Section>
    </>
  );
}
