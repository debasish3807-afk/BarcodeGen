import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ScanBarcode, QrCode, Download, Layers, Shield, Mail, HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Help Center",
  description: "BarcodeGen Help Center. Find guides, tutorials, and answers to common questions about barcode and QR code generation.",
};

const helpTopics = [
  { title: "Getting Started", description: "Learn how to generate your first barcode or QR code", icon: BookOpen, href: "/barcode-generator", color: "text-primary-600 dark:text-primary-400" },
  { title: "Barcode Formats", description: "Understand different barcode standards and their uses", icon: ScanBarcode, href: "/barcode-guide", color: "text-secondary-600 dark:text-secondary-400" },
  { title: "QR Code Types", description: "Create QR codes for URLs, WiFi, contacts, and more", icon: QrCode, href: "/qr-guide", color: "text-accent-600 dark:text-accent-400" },
  { title: "Download & Export", description: "Export barcodes in PNG, SVG, PDF, JPG, or WebP", icon: Download, href: "/barcode-generator", color: "text-primary-600 dark:text-primary-400" },
  { title: "Batch Generation", description: "Generate thousands of barcodes from CSV or Excel files", icon: Layers, href: "/batch-generator", color: "text-secondary-600 dark:text-secondary-400" },
  { title: "Privacy & Security", description: "How we protect your data and ensure privacy", icon: Shield, href: "/privacy-policy", color: "text-accent-600 dark:text-accent-400" },
  { title: "Contact Support", description: "Get in touch with our team for help", icon: Mail, href: "/contact", color: "text-primary-600 dark:text-primary-400" },
  { title: "FAQ", description: "Answers to frequently asked questions", icon: HelpCircle, href: "/faq", color: "text-secondary-600 dark:text-secondary-400" },
];

export default function HelpPage() {
  return (
    <>
      <Section variant="muted" spacing="sm" className="pt-24 pb-6">
        <Container>
          <SectionHeader badge="Help" title="Help Center" subtitle="Find guides, tutorials, and answers to help you get the most out of BarcodeGen." />
        </Container>
      </Section>
      <Section variant="default" spacing="md">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {helpTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link key={topic.title} href={topic.href}>
                  <Card hover padding="lg" className="h-full">
                    <Icon className={`h-6 w-6 mb-3 ${topic.color}`} />
                    <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-1">{topic.title}</h3>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{topic.description}</p>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Guide Links */}
          <div className="mt-12">
            <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-4">Barcode Guides</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "GS1 Guide", href: "/guides/gs1" },
                { title: "EAN Guide", href: "/guides/ean" },
                { title: "UPC Guide", href: "/guides/upc" },
                { title: "Code 128 Guide", href: "/guides/code128" },
              ].map((guide) => (
                <Link key={guide.title} href={guide.href} className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/50 dark:hover:bg-primary-950/20 transition-all">
                  <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400 mb-2" />
                  <p className="text-sm font-semibold text-surface-900 dark:text-white">{guide.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
