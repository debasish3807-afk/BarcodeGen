import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "EAN Barcode Guide",
  description: "Complete guide to EAN-13 and EAN-8 barcodes. Learn structure, encoding, check digits, and best practices for international retail product identification.",
};

export default function EANGuidePage() {
  return (
    <Section variant="default" spacing="lg" className="pt-28">
      <Container size="sm">
        <SectionHeader title="EAN Barcode Guide" subtitle="International Article Number — the global standard for product identification." badge="Guide" />
        <div className="space-y-6 text-surface-600 dark:text-surface-400 leading-relaxed">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">EAN-13 Structure</h2>
          <p>EAN-13 consists of 13 digits: 2-3 digit country code, manufacturer code, product code, and a check digit. It is the most widely used barcode standard globally, required for all retail products sold internationally.</p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">EAN-8</h2>
          <p>EAN-8 is a compact 8-digit version for small products where space is limited. It encodes a country code, product identifier, and check digit.</p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Check Digit Calculation</h2>
          <p>The check digit is calculated using a weighted sum algorithm: odd positions multiplied by 1, even positions by 3. The check digit is (10 - (sum mod 10)) mod 10.</p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">Country Prefixes</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>00-13</strong> — USA and Canada</li>
            <li><strong>30-37</strong> — France</li>
            <li><strong>40-44</strong> — Germany</li>
            <li><strong>45, 49</strong> — Japan</li>
            <li><strong>50</strong> — United Kingdom</li>
            <li><strong>54</strong> — Belgium and Luxembourg</li>
            <li><strong>57</strong> — Denmark</li>
            <li><strong>69</strong> — China</li>
            <li><strong>87</strong> — Netherlands</li>
            <li><strong>880</strong> — South Korea</li>
            <li><strong>890</strong> — India</li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
