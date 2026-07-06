import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "BarcodeGen Cookie Policy. Learn about the cookies we use and how to manage them.",
};

export default function CookiePolicyPage() {
  return (
    <Section variant="default" spacing="lg" className="pt-28">
      <Container size="sm">
        <SectionHeader title="Cookie Policy" subtitle="Last updated: January 1, 2025" />
        <div className="prose prose-surface dark:prose-invert max-w-none">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">What Are Cookies</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            Cookies are small text files stored on your device when you visit a website. They help us provide a better user experience by remembering your preferences.
          </p>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">Cookies We Use</h2>
          <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400 space-y-2 mb-4">
            <li><strong>Essential Cookies:</strong> Required for theme preferences and language settings.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site.</li>
            <li><strong>Preference Cookies:</strong> Remember your settings for future visits.</li>
          </ul>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mt-8 mb-4">Managing Cookies</h2>
          <p className="text-surface-600 dark:text-surface-400">
            You can control cookies through your browser settings. Disabling certain cookies may affect site functionality.
          </p>
        </div>
      </Container>
    </Section>
  );
}
