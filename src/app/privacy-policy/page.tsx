import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "BarcodeGen Privacy Policy. Learn how we handle your data and protect your privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <Section variant="default" spacing="lg" className="pt-28">
      <Container size="sm">
        <SectionHeader title="Privacy Policy" subtitle="Last updated: January 1, 2025" />
        <div className="prose prose-surface dark:prose-invert max-w-none">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            BarcodeGen is committed to protecting your privacy. We collect minimal data necessary to provide our services. We do not require registration, and barcode generation happens directly in your browser.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">2. How We Use Information</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            Any information we collect is used solely to improve our services, provide analytics, and enhance user experience. We never sell personal data to third parties.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">3. Cookies</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            We use essential cookies to maintain theme preferences and language settings. Analytics cookies help us understand how users interact with our service.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">4. Third-Party Services</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            We may use Google Analytics and similar services to understand usage patterns. These services have their own privacy policies.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">5. Contact</h2>
          <p className="text-surface-600 dark:text-surface-400">
            For privacy-related inquiries, please contact us at privacy@barcodegen.com.
          </p>
        </div>
      </Container>
    </Section>
  );
}
