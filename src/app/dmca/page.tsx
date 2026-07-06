import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "DMCA Policy",
  description: "BarcodeGen DMCA Policy. Information about copyright infringement claims and procedures.",
};

export default function DMCAPage() {
  return (
    <Section variant="default" spacing="lg" className="pt-28">
      <Container size="sm">
        <SectionHeader title="DMCA Policy" subtitle="Last updated: January 1, 2025" />
        <div className="prose prose-surface dark:prose-invert max-w-none">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">Copyright Infringement</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            BarcodeGen respects intellectual property rights. If you believe content on our site infringes your copyright, please submit a DMCA takedown notice.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">Filing a Notice</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            Your DMCA notice should include: identification of the copyrighted work, identification of the infringing material, your contact information, a statement of good faith, and your signature.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">Contact for DMCA</h2>
          <p className="text-surface-600 dark:text-surface-400">
            Send DMCA notices to: dmca@barcodegen.com
          </p>
        </div>
      </Container>
    </Section>
  );
}
