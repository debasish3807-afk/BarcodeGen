"use client";

import { motion } from "framer-motion";
import { ScanBarcode, Check } from "lucide-react";
import type { BarcodeFormat } from "../_types";
import { getFormatsByCategory } from "../_lib/barcode-formats";
import { cn } from "@/lib/utils";

interface FormatSelectorProps {
  selectedFormat: BarcodeFormat;
  onFormatChange: (format: BarcodeFormat) => void;
}

const categoryColors: Record<string, { badge: string; active: string }> = {
  Industrial: {
    badge: "bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-400",
    active: "border-primary-500 bg-primary-50/50 dark:bg-primary-950/30",
  },
  Product: {
    badge: "bg-secondary-50 text-secondary-700 dark:bg-secondary-950/50 dark:text-secondary-400",
    active: "border-secondary-500 bg-secondary-50/50 dark:bg-secondary-950/30",
  },
  Specialty: {
    badge: "bg-accent-50 text-accent-700 dark:bg-accent-950/50 dark:text-accent-400",
    active: "border-accent-500 bg-accent-50/50 dark:bg-accent-950/30",
  },
};

export function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
  const categories = getFormatsByCategory();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <ScanBarcode className="h-4 w-4 text-primary-600 dark:text-primary-400" />
        <h3 className="text-sm font-bold text-surface-900 dark:text-white">
          Barcode Format
        </h3>
      </div>

      {Object.entries(categories).map(([category, formats]) => (
        <div key={category}>
          <span className={cn(
            "inline-block text-xs font-semibold px-2 py-0.5 rounded-md mb-2",
            categoryColors[category]?.badge || "bg-surface-100 text-surface-600"
          )}>
            {category}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {formats.map((format) => {
              const isActive = selectedFormat === format.id;
              const colors = categoryColors[category];
              return (
                <motion.button
                  key={format.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onFormatChange(format.id)}
                  className={cn(
                    "relative flex items-start gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-200",
                    isActive
                      ? cn("border-2", colors?.active || "border-primary-500 bg-primary-50/50")
                      : "border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600 hover:bg-surface-50 dark:hover:bg-surface-800/50"
                  )}
                  aria-pressed={isActive}
                  aria-label={`Select ${format.label} barcode format`}
                >
                  {isActive && (
                    <div className="absolute top-2 right-2">
                      <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className={cn(
                      "text-sm font-semibold",
                      isActive
                        ? "text-primary-700 dark:text-primary-300"
                        : "text-surface-900 dark:text-white"
                    )}>
                      {format.label}
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-400 line-clamp-1 mt-0.5">
                      {format.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
