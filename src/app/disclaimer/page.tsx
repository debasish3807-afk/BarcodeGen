import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "BarcodeGen Disclaimer. Important information about our barcode generation service.",
};

export default function DisclaimerPage() {
  return (
    <Section variant="default" spacing="lg" className="pt-28">
      <Container size="sm">
        <SectionHeader title="Disclaimer" subtitle="Last updated: January 1, 2025" />
        <div className="prose prose-surface dark:prose-invert max-w-none">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">General Disclaimer</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            The information and tools provided by BarcodeGen are for general informational and utility purposes only. While we strive for accuracy, we make no guarantees about the completeness or reliability of generated barcodes for specific commercial use cases.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">Accuracy</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            We recommend verifying generated barcodes with appropriate scanning equipment before production use. Users are responsible for ensuring barcodes meet their specific industry requirements.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">External Links</h2>
          <p className="text-surface-600 dark:text-surface-400">
            Our website may contain links to external resources. We are not responsible for the content or practices of external websites.
          </p>
        </div>
      </Container>
    </Section>
  );
}
