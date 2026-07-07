"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Search, X, Star, ChevronDown,
  Factory, ShoppingCart, Sticker, QrCode, Mail,
  Sparkles, Zap, Shield,
} from "lucide-react";
import type { BarcodeFormat } from "../_types";
import { BARCODE_FORMATS } from "../_lib/barcode-formats";
import { cn } from "@/lib/utils";

interface FormatSelectorProps {
  selectedFormat: BarcodeFormat;
  onFormatChange: (format: BarcodeFormat) => void;
}

interface FormatItem {
  id: string;
  label: string;
  description: string;
  supported: boolean;
  badge?: "popular" | "new" | "gs1" | "iso" | "soon";
}

interface FormatCategory {
  name: string;
  icon: React.ElementType;
  formats: FormatItem[];
}

const CATEGORIES: FormatCategory[] = [
  {
    name: "Linear Codes",
    icon: Factory,
    formats: [
      ...BARCODE_FORMATS.filter((f) => f.category === "Industrial").map((f) => ({
        id: f.id, label: f.label, description: f.description, supported: true,
        badge: (f.id === "CODE128" ? "popular" : f.id === "GS1-128" ? "gs1" : undefined) as FormatItem["badge"],
      })),
      { id: "CODE11", label: "Code 11", description: "Telephone equipment ID", supported: false, badge: "soon" },
      { id: "LOGMARS", label: "LOGMARS", description: "US DoD logistics", supported: false, badge: "soon" },
    ],
  },
  {
    name: "Product Codes",
    icon: ShoppingCart,
    formats: [
      ...BARCODE_FORMATS.filter((f) => f.category === "Product").map((f) => ({
        id: f.id, label: f.label, description: f.description, supported: true,
        badge: (f.id === "EAN13" ? "popular" : f.id === "UPC" ? "iso" : undefined) as FormatItem["badge"],
      })),
      { id: "ISBN", label: "ISBN", description: "Book identification", supported: false, badge: "soon" },
      { id: "ISSN", label: "ISSN", description: "Serial publication ID", supported: false, badge: "soon" },
    ],
  },
  {
    name: "Specialty",
    icon: Sticker,
    formats: [
      ...BARCODE_FORMATS.filter((f) => f.category === "Specialty").map((f) => ({
        id: f.id, label: f.label, description: f.description, supported: true,
      })),
      { id: "PLESSEY", label: "Plessey", description: "UK retail labeling", supported: false, badge: "soon" },
      { id: "PHARMA", label: "Pharmacode", description: "Pharmaceutical", supported: false, badge: "soon" },
    ],
  },
  {
    name: "2D Codes",
    icon: QrCode,
    formats: [
      { id: "QRCODE", label: "QR Code", description: "2D matrix code", supported: false, badge: "new" },
      { id: "DATAMATRIX", label: "Data Matrix", description: "High-density 2D", supported: false, badge: "soon" },
      { id: "PDF417", label: "PDF417", description: "Stacked linear", supported: false, badge: "soon" },
      { id: "AZTEC", label: "Aztec Code", description: "Transport tickets", supported: false, badge: "soon" },
    ],
  },
  {
    name: "Postal Codes",
    icon: Mail,
    formats: [
      { id: "ROYALMAIL", label: "Royal Mail", description: "UK postal barcode", supported: false, badge: "soon" },
      { id: "POSTNET", label: "PostNet", description: "US delivery point", supported: false, badge: "soon" },
      { id: "IMB", label: "Intelligent Mail", description: "USPS routing", supported: false, badge: "soon" },
    ],
  },
];

type QuickFilter = "all" | "linear" | "2d" | "postal" | "popular" | "favorites" | "recent";

const BADGE_STYLES: Record<string, { bg: string; text: string; icon?: React.ElementType }> = {
  popular: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", icon: Zap },
  new: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", icon: Sparkles },
  gs1: { bg: "bg-primary-100 dark:bg-primary-900/30", text: "text-primary-700 dark:text-primary-400" },
  iso: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", icon: Shield },
  soon: { bg: "bg-surface-100 dark:bg-surface-800", text: "text-surface-500 dark:text-surface-400" },
};

export function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
  const [search, setSearch] = useState("");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORIES.map((c) => [c.name, true]))
  );
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentFormats, setRecentFormats] = useState<string[]>([]);

  // Load favorites and recent from localStorage
  useEffect(() => {
    try {
      setFavorites(JSON.parse(localStorage.getItem("barcodegen_fav_formats") || "[]"));
      setRecentFormats(JSON.parse(localStorage.getItem("barcodegen_recent_formats") || "[]").slice(0, 10));
    } catch { /* silent */ }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [id, ...prev];
      localStorage.setItem("barcodegen_fav_formats", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleSelect = useCallback((id: string, supported: boolean) => {
    if (!supported) return;
    onFormatChange(id as BarcodeFormat);
    setRecentFormats((prev) => {
      const updated = [id, ...prev.filter((r) => r !== id)].slice(0, 10);
      localStorage.setItem("barcodegen_recent_formats", JSON.stringify(updated));
      return updated;
    });
  }, [onFormatChange]);

  const toggleCategory = useCallback((name: string) => {
    setExpandedCats((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  // Filtered categories based on search and quick filter
  const filteredCategories = useMemo(() => {
    let cats = CATEGORIES;

    if (quickFilter === "linear") cats = cats.filter((c) => c.name === "Linear Codes");
    else if (quickFilter === "2d") cats = cats.filter((c) => c.name === "2D Codes");
    else if (quickFilter === "postal") cats = cats.filter((c) => c.name === "Postal Codes");

    return cats.map((cat) => ({
      ...cat,
      formats: cat.formats.filter((f) => {
        if (quickFilter === "popular") return f.badge === "popular";
        if (quickFilter === "favorites") return favorites.includes(f.id);
        if (quickFilter === "recent") return recentFormats.includes(f.id);
        if (!search) return true;
        return f.label.toLowerCase().includes(search.toLowerCase()) || f.description.toLowerCase().includes(search.toLowerCase());
      }),
    })).filter((cat) => cat.formats.length > 0);
  }, [search, quickFilter, favorites, recentFormats]);

  return (
    <div className="flex flex-col h-full">
      {/* ===== STICKY SEARCH ===== */}
      <div className="sticky top-0 z-10 pb-3 bg-white dark:bg-surface-900">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setQuickFilter("all"); }}
            placeholder="Search barcode formats..."
            className="w-full h-[48px] pl-11 pr-20 text-sm rounded-2xl border border-surface-200/80 dark:border-surface-700/60 bg-surface-50/80 dark:bg-surface-800/40 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 focus:bg-white dark:focus:bg-surface-800 transition-all duration-200"
            aria-label="Search barcode formats"
          />
          {/* Clear + Keyboard hint */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {search && (
              <button onClick={() => setSearch("")} className="p-1 rounded-md hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors" aria-label="Clear search">
                <X className="h-3.5 w-3.5 text-surface-400" />
              </button>
            )}
            {!search && (
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-surface-400 bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-md">
                ⌘K
              </kbd>
            )}
          </div>
        </div>
      </div>

      {/* ===== QUICK FILTERS ===== */}
      <div className="flex gap-1.5 flex-wrap pb-4">
        {([
          { key: "all" as QuickFilter, label: "All" },
          { key: "popular" as QuickFilter, label: "Popular" },
          { key: "favorites" as QuickFilter, label: "★" },
          { key: "recent" as QuickFilter, label: "Recent" },
          { key: "linear" as QuickFilter, label: "Linear" },
          { key: "2d" as QuickFilter, label: "2D" },
          { key: "postal" as QuickFilter, label: "Postal" },
        ]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { setQuickFilter(key); setSearch(""); }}
            className={cn(
              "px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150",
              quickFilter === key
                ? "bg-primary-600 text-white shadow-sm shadow-primary-600/20"
                : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700"
            )}
            aria-pressed={quickFilter === key}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ===== CATEGORIES + FORMATS ===== */}
      <div className="flex-1 overflow-y-auto space-y-2 -mx-1 px-1 scrollbar-thin">
        {filteredCategories.map((category) => {
          const CatIcon = category.icon;
          const isExpanded = expandedCats[category.name] !== false;

          return (
            <div key={category.name} className="rounded-2xl border border-surface-200/60 dark:border-surface-700/40 overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors"
                aria-expanded={isExpanded}
              >
                <span className="flex items-center gap-2.5">
                  <CatIcon className="h-4 w-4 text-primary-500 dark:text-primary-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-surface-700 dark:text-surface-300">{category.name}</span>
                  <span className="text-[10px] font-medium text-surface-400 bg-surface-100 dark:bg-surface-800 px-1.5 py-0.5 rounded-md">{category.formats.length}</span>
                </span>
                <ChevronDown className={cn("h-4 w-4 text-surface-400 transition-transform duration-200", isExpanded && "rotate-180")} />
              </button>

              {/* Format List */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 pb-2 space-y-1">
                      {category.formats.map((format) => {
                        const isActive = selectedFormat === format.id;
                        const isFav = favorites.includes(format.id);
                        const badgeStyle = format.badge ? BADGE_STYLES[format.badge] : null;

                        return (
                          <motion.div
                            key={format.id}
                            whileTap={format.supported ? { scale: 0.97 } : undefined}
                            className={cn(
                              "group relative flex items-center gap-3 px-3.5 py-3 rounded-[14px] cursor-pointer transition-all duration-200",
                              isActive
                                ? "bg-gradient-to-r from-primary-600 to-accent-600 shadow-lg shadow-primary-600/20"
                                : format.supported
                                ? "hover:bg-surface-100/80 dark:hover:bg-surface-800/50 hover:shadow-sm"
                                : "opacity-50 cursor-not-allowed"
                            )}
                            onClick={() => handleSelect(format.id, format.supported)}
                            role="button"
                            aria-pressed={isActive}
                            aria-label={format.supported ? `Select ${format.label}` : `${format.label} (coming soon)`}
                          >
                            {/* Active left indicator */}
                            {isActive && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-white/60" />
                            )}

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className={cn(
                                  "text-[13px] font-semibold truncate",
                                  isActive ? "text-white" : "text-surface-800 dark:text-surface-200"
                                )}>
                                  {format.label}
                                </p>
                                {isActive && <Check className="h-3.5 w-3.5 text-white/90 flex-shrink-0" />}
                                {/* Badge */}
                                {badgeStyle && !isActive && (
                                  <span className={cn("inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide", badgeStyle.bg, badgeStyle.text)}>
                                    {badgeStyle.icon && <badgeStyle.icon className="h-2.5 w-2.5" />}
                                    {format.badge}
                                  </span>
                                )}
                              </div>
                              <p className={cn(
                                "text-[11px] truncate mt-0.5",
                                isActive ? "text-white/70" : "text-surface-400 dark:text-surface-500"
                              )}>
                                {format.description}
                              </p>
                            </div>

                            {/* Favorite star */}
                            {format.supported && (
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(format.id); }}
                                className={cn(
                                  "p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
                                  isActive ? "hover:bg-white/20" : "hover:bg-surface-200 dark:hover:bg-surface-700",
                                  isFav && "!opacity-100"
                                )}
                                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                              >
                                <Star className={cn(
                                  "h-3.5 w-3.5 transition-colors",
                                  isFav
                                    ? "text-amber-400 fill-amber-400"
                                    : isActive ? "text-white/50" : "text-surface-300 dark:text-surface-600"
                                )} />
                              </button>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="text-center py-10">
            <Search className="h-8 w-8 mx-auto text-surface-300 dark:text-surface-600 mb-3" />
            <p className="text-sm text-surface-400">No formats match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
