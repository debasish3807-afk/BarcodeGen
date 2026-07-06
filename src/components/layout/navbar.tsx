"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Heart,
  Globe,
  Sun,
  Moon,
  ScanBarcode,
  ChevronDown,
} from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import { LANGUAGES } from "@/constants/languages";
import { SITE_CONFIG } from "@/constants/site";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

// ======================
// Navbar Component - Premium v2.0
// ======================

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const { isDark, toggleTheme, mounted } = useThemeToggle();
  const pathname = usePathname();
  const langRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setIsLangOpen(false);
  }, [pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/70 dark:bg-surface-950/70 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_24px_rgba(0,0,0,0.02)] border-b border-surface-200/30 dark:border-surface-800/30"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav
          className="flex items-center justify-between h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label={`${SITE_CONFIG.name} - Home`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <ScanBarcode className="relative h-8 w-8 text-primary-600 dark:text-primary-400 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="hidden sm:inline text-xl font-bold tracking-tight text-surface-900 dark:text-white">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2.5 text-[15px] font-medium rounded-xl transition-all duration-200",
                  pathname === item.href
                    ? "text-primary-600 bg-primary-50/80 dark:text-primary-400 dark:bg-primary-950/50"
                    : "text-surface-600 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-xl text-surface-600 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200"
                aria-label="Toggle search"
                aria-expanded={isSearchOpen}
              >
                <Search className="h-[18px] w-[18px]" />
              </button>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-72 sm:w-80"
                  >
                    <div className="bg-white/90 dark:bg-surface-900/90 backdrop-blur-2xl rounded-2xl border border-surface-200/60 dark:border-surface-700/60 shadow-2xl p-3">
                      <input
                        type="search"
                        placeholder="Search barcodes, guides..."
                        className="w-full px-4 py-3 rounded-xl border border-surface-200/60 dark:border-surface-700/60 bg-surface-50/80 dark:bg-surface-800/80 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 text-sm"
                        autoFocus
                        aria-label="Search"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Favorites */}
            <Link
              href="/favorites"
              className="p-2.5 rounded-xl text-surface-600 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200 hidden sm:flex"
              aria-label="Favorites"
            >
              <Heart className="h-[18px] w-[18px]" />
            </Link>

            {/* Language Selector */}
            <div ref={langRef} className="relative hidden sm:block">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 p-2.5 rounded-xl text-surface-600 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200"
                aria-label="Select language"
                aria-expanded={isLangOpen}
                aria-haspopup="listbox"
              >
                <Globe className="h-[18px] w-[18px]" />
                <span className="text-xs font-semibold uppercase">{currentLang}</span>
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isLangOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-56 max-h-64 overflow-y-auto"
                    role="listbox"
                    aria-label="Language selection"
                  >
                    <div className="bg-white/90 dark:bg-surface-900/90 backdrop-blur-2xl rounded-2xl border border-surface-200/60 dark:border-surface-700/60 shadow-2xl p-2">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={cn(
                            "w-full px-3.5 py-2.5 text-left text-sm rounded-xl transition-all duration-200",
                            currentLang === lang.code
                              ? "bg-primary-50/80 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400 font-medium"
                              : "text-surface-700 hover:bg-surface-100/80 dark:text-surface-300 dark:hover:bg-surface-800/60"
                          )}
                          role="option"
                          aria-selected={currentLang === lang.code}
                        >
                          <span className="font-medium">{lang.nativeName}</span>
                          <span className="text-surface-400 ml-2 text-xs">({lang.name})</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-surface-600 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200"
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              >
                {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-surface-600 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200 lg:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-surface-200/30 dark:border-surface-800/30 bg-white/90 dark:bg-surface-950/90 backdrop-blur-2xl"
          >
            <Container>
              <div className="py-6 space-y-1.5">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-5 py-3.5 rounded-2xl text-[16px] font-medium transition-all duration-200",
                      pathname === item.href
                        ? "text-primary-600 bg-primary-50/80 dark:text-primary-400 dark:bg-primary-950/50"
                        : "text-surface-700 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-300 dark:hover:text-white dark:hover:bg-surface-800/60"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile-only items */}
                <div className="pt-5 mt-5 border-t border-surface-200/40 dark:border-surface-800/40">
                  <Link
                    href="/favorites"
                    className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[16px] font-medium text-surface-700 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-300 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200"
                  >
                    <Heart className="h-5 w-5" />
                    Favorites
                  </Link>

                  {/* Mobile Language Selector */}
                  <div className="px-5 py-3.5">
                    <label className="block text-sm font-semibold text-surface-500 dark:text-surface-400 mb-2.5">
                      Language
                    </label>
                    <select
                      value={currentLang}
                      onChange={(e) => setCurrentLang(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200/60 dark:border-surface-700/60 bg-surface-50/80 dark:bg-surface-800/80 text-surface-900 dark:text-surface-100 text-[15px] font-medium"
                      aria-label="Select language"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.nativeName} ({lang.name})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
