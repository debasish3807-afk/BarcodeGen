"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Heart,
  Sun,
  Moon,
  ScanBarcode,
  ChevronDown,
  Zap,
  QrCode,
  Layers,
  ScanLine,
  LayoutTemplate,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/site";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

// ======================
// Navbar Component - Premium v5.0 (i18n)
// ======================

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const { isDark, toggleTheme, mounted } = useThemeToggle();
  const { t } = useTranslation();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setIsMegaOpen(false);
  }, [pathname]);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleMegaEnter = useCallback(() => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setIsMegaOpen(true);
  }, []);

  const handleMegaLeave = useCallback(() => {
    megaTimeoutRef.current = setTimeout(() => setIsMegaOpen(false), 150);
  }, []);

  // Translated nav items
  const MAIN_NAV = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.features, href: "/features" },
    { label: t.nav.tools, href: "#", hasMegaMenu: true },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.faq, href: "/faq" },
    { label: t.nav.contact, href: "/contact" },
  ];

  // Translated tools menu
  const TOOLS_MENU = [
    { label: t.nav.barcodeGenerator, href: "/barcode-generator", icon: ScanBarcode, description: t.megaMenu.barcodeDesc, color: "text-primary-600 dark:text-primary-400", bg: "bg-primary-50 dark:bg-primary-950/50" },
    { label: t.nav.qrGenerator, href: "/qr-generator", icon: QrCode, description: t.megaMenu.qrDesc, color: "text-secondary-600 dark:text-secondary-400", bg: "bg-secondary-50 dark:bg-secondary-950/50" },
    { label: t.nav.batchGenerator, href: "/batch-generator", icon: Layers, description: t.megaMenu.batchDesc, color: "text-accent-600 dark:text-accent-400", bg: "bg-accent-50 dark:bg-accent-950/50" },
    { label: t.nav.scanner, href: "/scanner", icon: ScanLine, description: t.megaMenu.scannerDesc, color: "text-primary-600 dark:text-primary-400", bg: "bg-primary-50 dark:bg-primary-950/50" },
    { label: t.nav.templates, href: "/templates", icon: LayoutTemplate, description: t.megaMenu.templatesDesc, color: "text-secondary-600 dark:text-secondary-400", bg: "bg-secondary-50 dark:bg-secondary-950/50" },
    { label: t.nav.aiGenerator, href: "/ai-generator", icon: Sparkles, description: t.megaMenu.aiDesc, color: "text-accent-600 dark:text-accent-400", bg: "bg-accent-50 dark:bg-accent-950/50" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/75 dark:bg-surface-950/75 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] border-b border-surface-200/50 dark:border-surface-800/50"
          : "bg-transparent"
      )}
    >
      <Container size="xl">
        <nav className="flex items-center justify-between h-16 lg:h-[72px]" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group relative" aria-label={`${SITE_CONFIG.name} - ${t.nav.home}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center shadow-lg shadow-primary-600/20 group-hover:shadow-primary-600/40 group-hover:scale-105 transition-all duration-300">
                <ScanBarcode className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="hidden sm:inline text-xl font-bold tracking-tight text-surface-900 dark:text-white">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {MAIN_NAV.map((item) => (
              <div
                key={item.href + item.label}
                className="relative"
                onMouseEnter={item.hasMegaMenu ? handleMegaEnter : undefined}
                onMouseLeave={item.hasMegaMenu ? handleMegaLeave : undefined}
              >
                {item.hasMegaMenu ? (
                  <button
                    className={cn(
                      "relative px-4 py-2.5 text-[14px] font-medium rounded-lg transition-all duration-200 flex items-center gap-1",
                      isMegaOpen
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50/60 dark:bg-primary-950/30"
                        : "text-surface-600 hover:text-surface-900 hover:bg-surface-100/60 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/40"
                    )}
                    aria-expanded={isMegaOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isMegaOpen && "rotate-180")} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2.5 text-[14px] font-medium rounded-lg transition-all duration-200",
                      pathname === item.href
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50/60 dark:bg-primary-950/30"
                        : "text-surface-600 hover:text-surface-900 hover:bg-surface-100/60 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/40"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
                {/* Mega Menu */}
                {item.hasMegaMenu && (
                  <AnimatePresence>
                    {isMegaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] max-w-[calc(100vw-2rem)]"
                        onMouseLeave={() => setIsMegaOpen(false)}
                      >
                        <div className="bg-white/95 dark:bg-surface-900/95 backdrop-blur-2xl rounded-3xl border border-surface-200/60 dark:border-surface-700/50 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.4)] p-3">
                          <div className="grid grid-cols-2 gap-1">
                            {TOOLS_MENU.map((tool) => {
                              const Icon = tool.icon;
                              return (
                                <Link key={tool.href} href={tool.href} onClick={() => setIsMegaOpen(false)} className="group flex items-start gap-3.5 p-3.5 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/60 transition-all duration-200">
                                  <div className={cn("flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110", tool.bg)}>
                                    <Icon className={cn("h-5 w-5", tool.color)} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-sm font-semibold text-surface-900 dark:text-white">{tool.label}</span>
                                      <ArrowRight className="h-3 w-3 text-surface-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                    </div>
                                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5 leading-relaxed">{tool.description}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          {/* CTA */}
                          <div className="mt-2 pt-3 border-t border-surface-100 dark:border-surface-800 px-3.5">
                            <Link href="/barcode-generator" onClick={() => setIsMegaOpen(false)} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950/40 dark:to-secondary-950/40 border border-primary-100 dark:border-primary-900/40 group hover:shadow-sm transition-all duration-200">
                              <div className="flex items-center gap-2.5">
                                <Zap className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                                <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">{t.megaMenu.startFree}</span>
                              </div>
                              <ArrowRight className="h-4 w-4 text-primary-500 group-hover:translate-x-0.5 transition-transform duration-200" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-lg text-surface-500 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200"
                aria-label={t.nav.search}
                aria-expanded={isSearchOpen}
              >
                <Search className="h-[18px] w-[18px]" />
              </button>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-72 sm:w-80"
                  >
                    <div className="bg-white/95 dark:bg-surface-900/95 backdrop-blur-2xl rounded-xl border border-surface-200/60 dark:border-surface-700/60 shadow-2xl p-2.5">
                      <input
                        type="search"
                        placeholder={t.nav.searchPlaceholder}
                        className="w-full px-4 py-3 rounded-lg border border-surface-200/60 dark:border-surface-700/60 bg-surface-50/80 dark:bg-surface-800/80 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 text-sm"
                        autoFocus
                        aria-label={t.nav.search}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Favorites */}
            <Link href="/favorites" className="p-2.5 rounded-lg text-surface-500 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200 hidden sm:flex" aria-label={t.nav.favorites}>
              <Heart className="h-[18px] w-[18px]" />
            </Link>

            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg text-surface-500 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200"
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              >
                {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
              </button>
            )}

            {/* Divider */}
            <div className="hidden lg:block w-px h-6 bg-surface-200 dark:bg-surface-700 mx-1.5" />

            {/* Sign In CTA */}
            <Link href="/sign-in" className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group">
              <span>{t.nav.getStarted}</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg text-surface-600 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200 lg:hidden"
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
            className="lg:hidden overflow-hidden border-t border-surface-200/30 dark:border-surface-800/30 bg-white/95 dark:bg-surface-950/95 backdrop-blur-2xl"
          >
            <Container>
              <div className="py-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200",
                      pathname === item.href
                        ? "text-primary-600 bg-primary-50/80 dark:text-primary-400 dark:bg-primary-950/50"
                        : "text-surface-700 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-300 dark:hover:text-white dark:hover:bg-surface-800/60"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile extras */}
                <div className="pt-4 mt-4 border-t border-surface-200/40 dark:border-surface-800/40">
                  <Link href="/favorites" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium text-surface-700 hover:text-surface-900 hover:bg-surface-100/80 dark:text-surface-300 dark:hover:text-white dark:hover:bg-surface-800/60 transition-all duration-200">
                    <Heart className="h-5 w-5" />
                    {t.nav.favorites}
                  </Link>

                  {/* Mobile Language Selector */}
                  <div className="px-4 py-3">
                    <LanguageSwitcher variant="select" />
                  </div>

                  {/* Mobile CTA */}
                  <div className="px-4 py-3">
                    <Link href="/sign-in" className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-semibold shadow-lg shadow-primary-600/20">
                      {t.nav.getStarted}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
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
