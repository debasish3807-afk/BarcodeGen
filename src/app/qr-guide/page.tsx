import type { Metadata } from "next";
import { BookOpen, QrCode } from "lucide-react";
import { QR_TYPES } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "QR Code Guide",
  description:
    "Complete guide to QR codes. Learn about different QR code types, best practices, and how to use QR codes effectively.",
};

export default function QRGuidePage() {
  return (
    <>
      <Section variant="muted" spacing="lg" className="pt-28">
        <Container>
          <SectionHeader
            badge="Guide"
            title="Complete QR Code Guide"
            subtitle="Everything you need to know about QR codes, their types, and effective usage."
          />
        </Container>
      </Section>

      <Section variant="default" spacing="md">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {QR_TYPES.map((qrType) => (
              <Card key={qrType.id} hover padding="lg" className="flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-50 dark:bg-accent-950/50 flex items-center justify-center flex-shrink-0">
                    <QrCode className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-surface-900 dark:text-white">
                      {qrType.name} QR Code
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed flex-1">
                  {qrType.description}. Learn how to create and use {qrType.name} QR codes effectively.
                </p>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-surface-100 dark:border-surface-800 text-xs text-surface-500">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Full guide coming soon</span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
