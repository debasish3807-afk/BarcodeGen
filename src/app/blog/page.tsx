import type { Metadata } from "next";
import { BlogClient } from "./_components/blog-client";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Blog",
  description: "Barcode and QR code articles, guides, and best practices for business, retail, inventory, healthcare, and education.",
};

export default function BlogPage() {
  return (
    <>
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader badge="Blog" title="Articles & Guides" subtitle="Expert insights on barcodes, QR codes, and their applications across industries." />
        </Container>
      </Section>
      <Section variant="default" spacing="md">
        <BlogClient />
      </Section>
    </>
  );
}
