import type { Metadata } from "next";
import { QRGeneratorClient } from "./_components/qr-generator-client";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description:
    "Create custom QR codes for URLs, WiFi, vCards, email, phone, SMS, WhatsApp, location, and UPI payments. Free online QR code generator with styling options. Download PNG, SVG, PDF.",
  keywords: [
    "qr code generator",
    "free qr code maker",
    "custom qr code",
    "wifi qr code",
    "vcard qr code",
    "whatsapp qr code",
    "upi qr code",
  ],
};

export default function QRGeneratorPage() {
  return (
    <>
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader
            badge="Generator"
            title="QR Code Generator"
            subtitle="Create beautiful, customizable QR codes for URLs, WiFi, contacts, payments and more. Free, instant, and fully customizable."
          />
        </Container>
      </Section>
      <Section variant="default" spacing="md">
        <QRGeneratorClient />
      </Section>
    </>
  );
}
