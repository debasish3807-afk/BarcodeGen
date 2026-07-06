import type { Metadata } from "next";
import { BookOpen, ScanBarcode } from "lucide-react";
import { BARCODE_TYPES } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Barcode Guide",
  description:
    "Complete guide to barcode formats. Learn about EAN, UPC, Code 128, Code 39, ITF, ISBN, and more barcode standards.",
};

export default function BarcodeGuidePage() {
  return (
    <>
      <Section variant="muted" spacing="lg" className="pt-28">
        <Container>
          <SectionHeader
            badge="Guide"
            title="Complete Barcode Guide"
            subtitle="Learn about different barcode formats, their structure, and best use cases."
          />
        </Container>
      </Section>

      <Section variant="default" spacing="md">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BARCODE_TYPES.map((barcode) => (
              <Card key={barcode.id} hover padding="lg" className="flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center flex-shrink-0">
                    <ScanBarcode className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-surface-900 dark:text-white">
                      {barcode.name}
                    </h3>
                    <Badge variant="primary" size="sm" className="mt-1">
                      {barcode.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed flex-1">
                  {barcode.description}. Comprehensive guide and usage information coming soon.
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
