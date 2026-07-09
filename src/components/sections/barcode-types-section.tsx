"use client";

import { motion } from "framer-motion";
import { ScanBarcode, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BARCODE_TYPES } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

// ======================
// Barcode Types Section - Premium Grid with Categories
// ======================

const categoryColors: Record<string, string> = {
  Product: "bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300",
  Industrial: "bg-secondary-50 text-secondary-700 dark:bg-secondary-950/50 dark:text-secondary-300",
  Logistics: "bg-accent-50 text-accent-700 dark:bg-accent-950/50 dark:text-accent-300",
  Publishing: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  "2D": "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  Specialty: "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
};

export function BarcodeTypesSection() {
  return (
    <Section variant="muted" spacing="xl" className="relative">
      <div className="absolute inset-0 gradient-mesh opacity-30 dark:opacity-15 pointer-events-none" />

      <Container size="xl" className="relative">
        <SectionHeader
          badge="Barcode Formats"
          title="30+ Barcode Formats Supported"
          subtitle="From retail products to industrial logistics, we support every major barcode standard."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {BARCODE_TYPES.map((barcode, index) => (
            <motion.div
              key={barcode.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="group flex items-start gap-3 p-4 rounded-xl border border-surface-200/60 dark:border-surface-700/30 bg-white/80 dark:bg-surface-800/40 backdrop-blur-sm hover:border-primary-200 dark:hover:border-primary-800/50 hover:shadow-md hover:shadow-primary-500/[0.04] transition-all duration-300"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <ScanBarcode className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                  {barcode.name}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5 leading-relaxed">
                  {barcode.description}
                </p>
                <span className={`inline-flex mt-2 px-2 py-0.5 text-[10px] font-semibold rounded-full ${categoryColors[barcode.category] || categoryColors.Product}`}>
                  {barcode.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/barcode-generator"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
          >
            View all supported formats
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
