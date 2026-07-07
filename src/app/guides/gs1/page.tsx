import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "GS1 Barcode Guide",
  description: "Complete guide to GS1 barcodes including GS1-128, GS1 DataBar, and Application Identifiers. Learn how to implement GS1 standards for supply chain and retail.",
};

export default function GS1GuidePage() {
  return (
    <Section variant="default" spacing="lg" className="pt-28">
      <Container size="sm">
        <SectionHeader title="GS1 Barcode Guide" subtitle="Understanding GS1 standards for global trade and supply chain management." badge="Guide" />
        <div className="space-y-6 text-surface-600 dark:text-surface-400 leading-relaxed">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">What is GS1?</h2>
          <p>GS1 is a global organization that develops and maintains standards for business communication, including barcode symbologies used in supply chain, retail, and healthcare. GS1 standards ensure products are uniquely identified worldwide.</p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">GS1-128 (formerly EAN-128)</h2>
          <p>GS1-128 uses Code 128 symbology with Application Identifiers (AIs) to encode supplementary data such as batch numbers, expiry dates, serial numbers, and quantities. It is widely used in logistics, shipping, and healthcare.</p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Application Identifiers</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>(01)</strong> — Global Trade Item Number (GTIN)</li>
            <li><strong>(10)</strong> — Batch/Lot Number</li>
            <li><strong>(17)</strong> — Expiration Date</li>
            <li><strong>(21)</strong> — Serial Number</li>
            <li><strong>(37)</strong> — Quantity</li>
            <li><strong>(400)</strong> — Customer Purchase Order Number</li>
          </ul>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">GS1 DataBar</h2>
          <p>GS1 DataBar (formerly RSS) is a family of linear barcodes designed for small items. Variants include Omnidirectional, Stacked, Limited, and Expanded formats used in fresh food, coupons, and healthcare.</p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Best Practices</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Always verify barcodes with a GS1-certified verifier before production</li>
            <li>Ensure adequate quiet zones around the barcode</li>
            <li>Use minimum X-dimension of 0.264mm for retail POS scanning</li>
            <li>Register your company prefix with your local GS1 Member Organization</li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
