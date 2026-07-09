"use client";

import { motion } from "framer-motion";
import { ScanBarcode, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BARCODE_TYPES } from "@/constants/content";
import { useTranslation } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";


// ======================
// Barcode Types Section - Premium v5.0
// ======================

const categoryColors: Record<string, string> = {
  Product: "bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300 border-primary-200/50 dark:border-primary-800/30",
  Industrial: "bg-secondary-50 text-secondary-700 dark:bg-secondary-950/50 dark:text-secondary-300 border-secondary-200/50 dark:border-secondary-800/30",
  Logistics: "bg-accent-50 text-accent-700 dark:bg-accent-950/50 dark:text-accent-300 border-accent-200/50 dark:border-accent-800/30",
  Publishing: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/30",
  "2D": "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/30",
  Specialty: "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/30",
};

const categoryIconGradients: Record<string, string> = {
  Product: "from-primary-500 to-primary-600",
  Industrial: "from-secondary-500 to-secondary-600",
  Logistics: "from-accent-500 to-accent-600",
  Publishing: "from-amber-500 to-amber-600",
  "2D": "from-emerald-500 to-emerald-600",
  Specialty: "from-rose-500 to-rose-600",
};

export function BarcodeTypesSection() {
  const { t } = useTranslation();

  const categoryTranslations: Record<string, string> = {
    Product: t.barcodeTypes.categoryProduct,
    Industrial: t.barcodeTypes.categoryIndustrial,
    Logistics: t.barcodeTypes.categoryLogistics,
    Publishing: t.barcodeTypes.categoryPublishing,
    "2D": t.barcodeTypes.category2D,
    Specialty: t.barcodeTypes.categorySpecialty,
  };

  return (
    <Section variant="muted" spacing="xl" className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-mesh opacity-30 dark:opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-300/50 dark:via-surface-700/50 to-transparent" />

      <Container size="xl" className="relative">
        <SectionHeader
          badge={t.barcodeTypes.badge}
          title={t.barcodeTypes.title}
          subtitle={t.barcodeTypes.subtitle}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {BARCODE_TYPES.map((barcode, index) => (
            <motion.div
              key={barcode.id}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.025, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-start gap-3.5 p-4 rounded-2xl border border-surface-200/60 dark:border-surface-700/30 bg-white/80 dark:bg-surface-800/40 backdrop-blur-sm hover:border-primary-200/70 dark:hover:border-primary-800/50 hover:shadow-lg hover:shadow-primary-500/[0.05] hover:-translate-y-1 transition-all duration-400"
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${categoryIconGradients[barcode.category] || "from-primary-500 to-primary-600"} flex items-center justify-center group-hover:scale-110 transition-transform duration-400 shadow-sm`}>
                <ScanBarcode className="h-4.5 w-4.5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-surface-900 dark:text-white tracking-tight">{barcode.name}</h3>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5 leading-relaxed line-clamp-2">{barcode.description}</p>
                <span className={`inline-flex mt-2.5 px-2 py-0.5 text-[10px] font-semibold rounded-lg border ${categoryColors[barcode.category] || categoryColors.Product}`}>
                  {categoryTranslations[barcode.category] || barcode.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/barcode-generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 bg-primary-50/60 dark:bg-primary-950/30 hover:bg-primary-50 dark:hover:bg-primary-950/50 rounded-2xl border border-primary-200/50 dark:border-primary-800/30 transition-all duration-300 group"
          >
            {t.barcodeTypes.viewAll}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
