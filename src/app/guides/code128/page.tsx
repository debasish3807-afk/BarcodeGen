import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Code 128 Barcode Guide",
  description: "Complete guide to Code 128 barcodes. Learn about character sets A, B, C, encoding efficiency, and applications in logistics and shipping.",
};

export default function Code128GuidePage() {
  return (
    <Section variant="default" spacing="lg" className="pt-28">
      <Container size="sm">
        <SectionHeader title="Code 128 Guide" subtitle="High-density alphanumeric barcode for logistics, shipping, and industrial applications." badge="Guide" />
        <div className="space-y-6 text-surface-600 dark:text-surface-400 leading-relaxed">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Overview</h2>
          <p>Code 128 is a high-density linear barcode capable of encoding all 128 ASCII characters. It is widely used in logistics, shipping, packaging, and industrial environments due to its compact size and data capacity.</p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Character Sets</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Code 128A</strong> — Uppercase letters, digits, control characters, and special characters</li>
            <li><strong>Code 128B</strong> — Upper and lowercase letters, digits, and special characters</li>
            <li><strong>Code 128C</strong> — Numeric pairs only (00-99) — most compact for pure numeric data</li>
          </ul>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Auto-switching</h2>
          <p>Modern Code 128 encoders automatically switch between character sets within a single barcode to achieve optimal density. This means you can encode mixed content efficiently.</p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Applications</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Shipping labels and tracking numbers</li>
            <li>Inventory management</li>
            <li>Product identification in warehouses</li>
            <li>Library systems</li>
            <li>Blood bank labeling</li>
            <li>Industrial part marking</li>
          </ul>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Specifications</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Data capacity: Up to 80 characters (practical limit)</li>
            <li>Character set: Full ASCII (128 characters)</li>
            <li>Check digit: Modulo 103 (mandatory)</li>
            <li>Quiet zone: 10x minimum module width on each side</li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
