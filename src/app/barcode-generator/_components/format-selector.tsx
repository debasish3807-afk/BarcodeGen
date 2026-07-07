"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Search, Factory, ShoppingCart, Sticker, QrCode, Mail, Clock } from "lucide-react";
import type { BarcodeFormat } from "../_types";
import { BARCODE_FORMATS } from "../_lib/barcode-formats";
import { cn } from "@/lib/utils";

interface FormatSelectorProps {
  selectedFormat: BarcodeFormat;
  onFormatChange: (format: BarcodeFormat) => void;
}

// Extended format list with categories (includes coming-soon formats)
interface FormatItem {
  id: string;
  label: string;
  description: string;
  supported: boolean;
}

interface FormatCategory {
  name: string;
  icon: React.ElementType;
  color: string;
  formats: FormatItem[];
}

const CATEGORIES: FormatCategory[] = [
  {
    name: "Linear Codes",
    icon: Factory,
    color: "text-primary-600 dark:text-primary-400",
    formats: [
      ...BARCODE_FORMATS.filter((f) => f.category === "Industrial").map((f) => ({ id: f.id, label: f.label, description: f.description, supported: true })),
      { id: "CODE11", label: "Code 11", description: "Telephone equipment identification", supported: false },
      { id: "LOGMARS", label: "LOGMARS", description: "US DoD logistics marking", supported: false },
    ],
  },
  {
    name: "Product Codes",
    icon: ShoppingCart,
    color: "text-secondary-600 dark:text-secondary-400",
    formats: [
      ...BARCODE_FORMATS.filter((f) => f.category === "Product").map((f) => ({ id: f.id, label: f.label, description: f.description, supported: true })),
      { id: "ISBN", label: "ISBN", description: "Book identification numbers", supported: false },
      { id: "ISSN", label: "ISSN", description: "Serial publication identification", supported: false },
    ],
  },
  {
    name: "Specialty",
    icon: Sticker,
    color: "text-accent-600 dark:text-accent-400",
    formats: [
      ...BARCODE_FORMATS.filter((f) => f.category === "Specialty").map((f) => ({ id: f.id, label: f.label, description: f.description, supported: true })),
      { id: "PLESSEY", label: "Plessey", description: "UK retail shelf labeling", supported: false },
      { id: "PHARMA", label: "Pharmacode", description: "Pharmaceutical packaging", supported: false },
    ],
  },
  {
    name: "2D Codes",
    icon: QrCode,
    color: "text-primary-600 dark:text-primary-400",
    formats: [
      { id: "QRCODE", label: "QR Code", description: "2D matrix code for URLs and data", supported: false },
      { id: "DATAMATRIX", label: "Data Matrix", description: "High-density 2D symbol", supported: false },
      { id: "PDF417", label: "PDF417", description: "Stacked linear barcode", supported: false },
      { id: "AZTEC", label: "Aztec Code", description: "Compact 2D for transport tickets", supported: false },
    ],
  },
  {
    name: "Postal Codes",
    icon: Mail,
    color: "text-secondary-600 dark:text-secondary-400",
    formats: [
      { id: "ROYALMAIL", label: "Royal Mail", description: "UK postal service barcode", supported: false },
      { id: "POSTNET", label: "PostNet", description: "US postal delivery point", supported: false },
      { id: "IMB", label: "Intelligent Mail", description: "USPS mail routing", supported: false },
    ],
  },
];

export function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
  const [search, setSearch] = useState("");
  const [recentFormats] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("barcodegen_recent_formats") || "[]").slice(0, 3);
    } catch { return []; }
  });

  const handleSelect = (id: string, supported: boolean) => {
    if (!supported) return;
    onFormatChange(id as BarcodeFormat);
    // Save to recent
    try {
      const recent = JSON.parse(localStorage.getItem("barcodegen_recent_formats") || "[]");
      const updated = [id, ...recent.filter((r: string) => r !== id)].slice(0, 5);
      localStorage.setItem("barcodegen_recent_formats", JSON.stringify(updated));
    } catch { /* silent */ }
  };

  const filteredCategories = CATEGORIES.map((cat) => ({
    ...cat,
    formats: cat.formats.filter((f) =>
      f.label.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.formats.length > 0);

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

      {/* Recently Used */}
      {!search && recentFormats.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <Clock className="h-3.5 w-3.5 text-surface-400" />
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-surface-400">Recent</h4>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {recentFormats.map((id) => {
              const fmt = BARCODE_FORMATS.find((f) => f.id === id);
              if (!fmt) return null;
              return (
                <button key={id} onClick={() => handleSelect(id, true)} className={cn("px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all", selectedFormat === id ? "bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300" : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700")}>
                  {fmt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Format List */}
      <div className="space-y-5">
        {filteredCategories.map((category) => {
          const CatIcon = category.icon;
          return (
            <div key={category.name}>
              <div className="flex items-center gap-2 mb-2 px-1">
                <CatIcon className={cn("h-3.5 w-3.5", category.color)} />
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                  {category.name}
                </h4>
                <span className="text-[10px] text-surface-400">({category.formats.length})</span>
              </div>

              <div className="space-y-0.5">
                {category.formats.map((format) => {
                  const isActive = selectedFormat === format.id;
                  return (
                    <motion.button
                      key={format.id}
                      whileTap={format.supported ? { scale: 0.98 } : undefined}
                      onClick={() => handleSelect(format.id, format.supported)}
                      disabled={!format.supported}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150",
                        isActive
                          ? "bg-primary-50 dark:bg-primary-950/40 border-l-[3px] border-primary-500"
                          : format.supported
                          ? "border-l-[3px] border-transparent hover:bg-surface-100/80 dark:hover:bg-surface-800/40"
                          : "border-l-[3px] border-transparent opacity-50 cursor-not-allowed"
                      )}
                      aria-pressed={isActive}
                      aria-label={format.supported ? `Select ${format.label}` : `${format.label} (coming soon)`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            "text-sm font-semibold truncate",
                            isActive ? "text-primary-700 dark:text-primary-300" : "text-surface-700 dark:text-surface-300"
                          )}>
                            {format.label}
                          </p>
                          {isActive && <Check className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400 flex-shrink-0" />}
                          {!format.supported && (
                            <span className="text-[9px] font-bold uppercase tracking-wide text-surface-400 bg-surface-100 dark:bg-surface-800 px-1.5 py-0.5 rounded flex-shrink-0">Soon</span>
                          )}
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

      {filteredCategories.length === 0 && (
        <p className="text-sm text-surface-400 text-center py-6">No formats match your search.</p>
      )}
    </div>
  );
}
