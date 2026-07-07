import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "UPC Barcode Guide",
  description: "Complete guide to UPC-A and UPC-E barcodes. Learn about the Universal Product Code standard used in North American retail.",
};

export default function UPCGuidePage() {
  return (
    <Section variant="default" spacing="lg" className="pt-28">
      <Container size="sm">
        <SectionHeader title="UPC Barcode Guide" subtitle="Universal Product Code — the standard for North American retail products." badge="Guide" />
        <div className="space-y-6 text-surface-600 dark:text-surface-400 leading-relaxed">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">UPC-A</h2>
          <p>UPC-A is a 12-digit barcode used to identify products at point-of-sale in the United States and Canada. The first digit is the number system, followed by a 5-digit manufacturer code, 5-digit product code, and check digit.</p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">UPC-E</h2>
          <p>UPC-E is a compressed 8-digit version of UPC-A designed for small packages. It eliminates zeros from the UPC-A code using a specific compression algorithm.</p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Getting a UPC Code</h2>
          <p>To obtain UPC codes, register with GS1 US to receive a company prefix. This prefix is unique to your company and allows you to assign product numbers to your items.</p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Number System Digits</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>0</strong> — Regular UPC codes</li>
            <li><strong>1</strong> — Reserved</li>
            <li><strong>2</strong> — Random weight items (meat, produce)</li>
            <li><strong>3</strong> — Pharmaceuticals (NDC)</li>
            <li><strong>4</strong> — In-store use</li>
            <li><strong>5</strong> — Coupons</li>
            <li><strong>6-9</strong> — Regular UPC codes</li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
