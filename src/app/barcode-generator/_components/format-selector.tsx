"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScanBarcode, Check, Search, ShoppingCart, Factory, Sticker } from "lucide-react";
import type { BarcodeFormat } from "../_types";
import { getFormatsByCategory } from "../_lib/barcode-formats";
import { cn } from "@/lib/utils";

interface FormatSelectorProps {
  selectedFormat: BarcodeFormat;
  onFormatChange: (format: BarcodeFormat) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  Industrial: Factory,
  Product: ShoppingCart,
  Specialty: Sticker,
};

const categoryColors: Record<string, { text: string; active: string; activeBg: string }> = {
  Industrial: {
    text: "text-primary-600 dark:text-primary-400",
    active: "border-primary-400 dark:border-primary-500",
    activeBg: "bg-primary-50 dark:bg-primary-950/40",
  },
  Product: {
    text: "text-secondary-600 dark:text-secondary-400",
    active: "border-secondary-400 dark:border-secondary-500",
    activeBg: "bg-secondary-50 dark:bg-secondary-950/40",
  },
  Specialty: {
    text: "text-accent-600 dark:text-accent-400",
    active: "border-accent-400 dark:border-accent-500",
    activeBg: "bg-accent-50 dark:bg-accent-950/40",
  },
};

export function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
  const [search, setSearch] = useState("");
  const categories = getFormatsByCategory();

  const filteredCategories = Object.entries(categories).reduce<Record<string, typeof categories[string]>>((acc, [cat, formats]) => {
    const filtered = formats.filter((f) =>
      f.label.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase())
    );
    if (filtered.length > 0) acc[cat] = filtered;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search formats..."
          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-800/30 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
          aria-label="Search barcode formats"
        />
      </div>

      {/* Format List */}
      <div className="space-y-5">
        {Object.entries(filteredCategories).map(([category, formats]) => {
          const CatIcon = categoryIcons[category] || ScanBarcode;
          const colors = categoryColors[category] || categoryColors.Industrial;
          return (
            <div key={category}>
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-2 px-1">
                <CatIcon className={cn("h-3.5 w-3.5", colors.text)} />
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                  {category}
                </h4>
                <span className="text-[10px] text-surface-400 dark:text-surface-500">({formats.length})</span>
              </div>

              {/* Format Items */}
              <div className="space-y-1">
                {formats.map((format) => {
                  const isActive = selectedFormat === format.id;
                  return (
                    <motion.button
                      key={format.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onFormatChange(format.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150",
                        isActive
                          ? cn("border-l-[3px]", colors.active, colors.activeBg)
                          : "border-l-[3px] border-transparent hover:bg-surface-100/80 dark:hover:bg-surface-800/40"
                      )}
                      aria-pressed={isActive}
                      aria-label={`Select ${format.label}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            "text-sm font-semibold truncate",
                            isActive ? "text-surface-900 dark:text-white" : "text-surface-700 dark:text-surface-300"
                          )}>
                            {format.label}
                          </p>
                          {isActive && <Check className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400 flex-shrink-0" />}
                        </div>
                        <p className="text-[11px] text-surface-400 dark:text-surface-500 truncate mt-0.5">
                          {format.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCategories && Object.keys(filteredCategories).length === 0 && (
        <p className="text-sm text-surface-400 text-center py-6">No formats match your search.</p>
      )}
    </div>
  );
}
