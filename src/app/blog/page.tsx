import type { Metadata } from "next";
import { BlogClient } from "./_components/blog-client";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Blog",
  description: "Barcode and QR code articles, guides, and best practices for business, retail, inventory, healthcare, and education.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-surface-200/60 dark:border-surface-800/60 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-950/20 dark:via-surface-950 dark:to-accent-950/10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <Container className="relative z-10 py-12 md:py-16 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-5 text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50/80 dark:bg-primary-950/40 dark:text-primary-400 rounded-full border border-primary-200/60 dark:border-primary-800/40">
            Blog
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-white">
            Articles & Guides
          </h1>
          <p className="mt-4 text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
            Expert insights on barcodes, QR codes, and their applications across industries.
          </p>
        </Container>
      </div>

      {/* Content */}
      <div className="py-10 md:py-14">
        <BlogClient />
      </div>
    </div>
  );
}
