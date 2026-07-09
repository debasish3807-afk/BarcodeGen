"use client";

// ======================
// Language Switcher - Premium Animated Dropdown with Flags
// ======================

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Globe } from "lucide-react";
import { useTranslation, SUPPORTED_LANGUAGES, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  /** Compact mode for mobile (shows only flag) */
  compact?: boolean;
  /** Custom className */
  className?: string;
  /** Variant: 'dropdown' or 'select' (native mobile select) */
  variant?: "dropdown" | "select";
}

export function LanguageSwitcher({
  compact = false,
  className,
  variant = "dropdown",
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === locale) || SUPPORTED_LANGUAGES[0];

  // Native select for mobile
  if (variant === "select") {
    return (
      <div className={cn("w-full", className)}>
        <label className="block text-xs font-semibold text-surface-500 dark:text-surface-400 mb-2 uppercase tracking-wider">
          {t.nav.language}
        </label>
        <div className="relative">
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="w-full px-4 py-2.5 rounded-lg border border-surface-200/60 dark:border-surface-700/60 bg-surface-50/80 dark:bg-surface-800/80 text-surface-900 dark:text-surface-100 text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50"
            aria-label={t.nav.language}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400 pointer-events-none" />
        </div>
      </div>
    );
  }

  // Animated dropdown for desktop
  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg transition-all duration-200",
          "text-surface-500 hover:text-surface-900 hover:bg-surface-100/80",
          "dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60",
          compact ? "p-2" : "px-2.5 py-2"
        )}
        aria-label={t.nav.language}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base leading-none" aria-hidden="true">
          {currentLang.flag}
        </span>
        {!compact && (
          <>
            <span className="text-xs font-semibold uppercase hidden sm:inline">
              {locale}
            </span>
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-56 max-h-[320px] overflow-y-auto scrollbar-thin z-50"
            role="listbox"
            aria-label={t.nav.language}
          >
            <div className="bg-white/95 dark:bg-surface-900/95 backdrop-blur-2xl rounded-xl border border-surface-200/60 dark:border-surface-700/50 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.4)] p-1.5">
              {/* Header */}
              <div className="px-3 py-2 mb-1 flex items-center gap-2 border-b border-surface-100 dark:border-surface-800">
                <Globe className="h-3.5 w-3.5 text-surface-400" />
                <span className="text-[11px] font-semibold text-surface-400 uppercase tracking-wider">
                  {t.nav.language}
                </span>
              </div>

              {/* Language Options */}
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isActive = locale === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocale(lang.code);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150",
                      isActive
                        ? "bg-primary-50 dark:bg-primary-950/40"
                        : "hover:bg-surface-50 dark:hover:bg-surface-800/60"
                    )}
                    role="option"
                    aria-selected={isActive}
                  >
                    {/* Flag */}
                    <span className="text-lg leading-none flex-shrink-0" aria-hidden="true">
                      {lang.flag}
                    </span>

                    {/* Language Name */}
                    <div className="flex-1 min-w-0">
                      <span
                        className={cn(
                          "block text-sm font-medium truncate",
                          isActive
                            ? "text-primary-700 dark:text-primary-300"
                            : "text-surface-800 dark:text-surface-200"
                        )}
                      >
                        {lang.nativeName}
                      </span>
                      <span className="block text-[11px] text-surface-400 dark:text-surface-500 truncate">
                        {lang.name}
                      </span>
                    </div>

                    {/* Active Check */}
                    {isActive && (
                      <Check className="h-4 w-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
