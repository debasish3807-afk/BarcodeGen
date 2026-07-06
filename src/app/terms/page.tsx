import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "BarcodeGen Terms of Service. Read our terms and conditions for using our barcode generation service.",
};

export default function TermsPage() {
  return (
    <Section variant="default" spacing="lg" className="pt-28">
      <Container size="sm">
        <SectionHeader title="Terms of Service" subtitle="Last updated: January 1, 2025" />
        <div className="prose prose-surface dark:prose-invert max-w-none">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            By accessing and using BarcodeGen, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of our service.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">2. Service Description</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            BarcodeGen provides free online barcode and QR code generation tools. We reserve the right to modify or discontinue any feature without prior notice.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">3. Acceptable Use</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            You agree to use our services only for lawful purposes. You may not use generated barcodes for fraudulent, misleading, or illegal activities.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">4. Intellectual Property</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            Barcodes you generate are yours to use freely. The BarcodeGen platform, design, and code remain our intellectual property.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">5. Limitation of Liability</h2>
          <p className="text-surface-600 dark:text-surface-400">
            BarcodeGen is provided &ldquo;as is&rdquo; without warranties. We are not liable for any damages arising from use of our service.
          </p>
        </div>
      </Container>
    </Section>
  );
}
