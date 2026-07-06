"use client";

import { motion } from "framer-motion";
import { ScanBarcode } from "lucide-react";
import { BARCODE_TYPES } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

// ======================
// Barcode Types Section
// ======================

export function BarcodeTypesSection() {
  return (
    <Section variant="default" spacing="lg">
      <Container>
        <SectionHeader
          badge="Barcode Formats"
          title="30+ Barcode Formats Supported"
          subtitle="From retail products to industrial logistics, we support every major barcode standard."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {BARCODE_TYPES.map((barcode, index) => (
            <motion.div
              key={barcode.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="group flex items-start gap-3 p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                <ScanBarcode className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                  {barcode.name}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
                  {barcode.description}
                </p>
                <Badge variant="default" size="sm" className="mt-2">
                  {barcode.category}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
