"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Eye, ChevronDown, ScanBarcode, Sparkles, Globe, Shield, CheckCircle2, Zap } from "lucide-react";
import { useState } from "react";
import { useBarcodeGenerator } from "../_hooks/useBarcodeGenerator";
import { BarcodePreview } from "./barcode-preview";
import { FormatSelector } from "./format-selector";
import { CustomizationPanel } from "./customization-panel";
import { ActionsToolbar } from "./actions-toolbar";
import { ValueInput } from "./value-input";
import { cn } from "@/lib/utils";

export function BarcodeGeneratorClient() {
  const { options, validation, svgRef, updateOption, setFormat, reset, generate } = useBarcodeGenerator();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="min-h-screen pt-20">
      {/* ===== TOP TOOLBAR ===== */}
      <div className="border-b border-surface-200/60 dark:border-surface-800/60 bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-surface-900 dark:text-white">
                Barcode Generator
              </h1>
              <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                Generate professional print-ready barcodes instantly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border border-green-200/60 dark:border-green-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-400 border border-primary-200/60 dark:border-primary-800/40">
                <Sparkles className="h-3 w-3" />
                30+ Formats
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 border border-surface-200/60 dark:border-surface-700/40">
                <Globe className="h-3 w-3" />
                Commercial Use
              </span>
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 border border-surface-200/60 dark:border-surface-700/40">
                <Shield className="h-3 w-3" />
                No Registration
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 3-PANEL LAYOUT ===== */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ===== LEFT: Barcode Types (340px) ===== */}
          <aside className="w-full lg:w-[340px] flex-shrink-0">
            {/* Mobile toggle */}
            <button
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
              className="w-full lg:hidden flex items-center justify-between p-4 mb-4 bg-white dark:bg-surface-900 rounded-[20px] border border-surface-200/80 dark:border-surface-800/80 shadow-sm"
              aria-expanded={showMobileSidebar}
              aria-label="Toggle barcode types"
            >
              <span className="flex items-center gap-2.5 text-sm font-semibold text-surface-900 dark:text-white">
                <div className="w-8 h-8 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center">
                  <ScanBarcode className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                </div>
                Barcode Types
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50 px-2.5 py-1 rounded-lg">{options.format}</span>
              </span>
              <ChevronDown className={cn("h-4 w-4 text-surface-400 transition-transform duration-200", showMobileSidebar && "rotate-180")} />
            </button>

            {/* Sidebar card */}
            <div className={cn(
              "lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto",
              "bg-white dark:bg-surface-900 rounded-[20px] border border-surface-200/80 dark:border-surface-800/80 p-5 shadow-sm",
              showMobileSidebar ? "block mb-6" : "hidden"
            )}>
              <FormatSelector
                selectedFormat={options.format}
                onFormatChange={(f) => { setFormat(f); setShowMobileSidebar(false); }}
              />
            </div>
          </aside>

          {/* ===== CENTER: Input + Advanced (Flexible) ===== */}
          <main className="flex-1 min-w-0 space-y-5">
            {/* Input Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-surface-900 rounded-[20px] border border-surface-200/80 dark:border-surface-800/80 p-6 shadow-sm"
            >
              <ValueInput
                value={options.value}
                format={options.format}
                validation={validation}
                onChange={(v) => updateOption("value", v)}
              />
            </motion.div>

            {/* Advanced Options Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-white dark:bg-surface-900 rounded-[20px] border border-surface-200/80 dark:border-surface-800/80 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-surface-50/50 dark:hover:bg-surface-800/30 transition-colors"
                aria-expanded={showAdvanced}
                aria-label="Toggle advanced options"
              >
                <span className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center">
                    <Settings2 className="h-4.5 w-4.5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-semibold text-surface-900 dark:text-white">Advanced Options</span>
                    <span className="block text-xs text-surface-500 dark:text-surface-400">Size, colors, text, rotation, DPI, export quality</span>
                  </div>
                </span>
                <ChevronDown className={cn("h-5 w-5 text-surface-400 transition-transform duration-300", showAdvanced && "rotate-180")} />
              </button>
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-surface-200/80 dark:border-surface-800/80 p-5 sm:p-6">
                      <CustomizationPanel options={options} onOptionChange={updateOption} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Mobile/Tablet: Preview + Actions */}
            <div className="lg:hidden space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white dark:bg-surface-900 rounded-[20px] border border-surface-200/80 dark:border-surface-800/80 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-semibold text-surface-900 dark:text-white">Live Preview</span>
                  </div>
                  {validation.valid && options.value && (
                    <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Live
                    </span>
                  )}
                </div>
                <BarcodePreview options={options} validation={validation} svgRef={svgRef} />
              </motion.div>
              <div className="bg-white dark:bg-surface-900 rounded-[20px] border border-surface-200/80 dark:border-surface-800/80 p-5 shadow-sm">
                <ActionsToolbar options={options} validation={validation} svgRef={svgRef} onGenerate={generate} onReset={reset} />
              </div>
            </div>

            {/* Bottom Features Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2"
            >
              {[
                { icon: CheckCircle2, label: "100% Free", color: "text-green-600 dark:text-green-400" },
                { icon: Shield, label: "Privacy First", color: "text-primary-600 dark:text-primary-400" },
                { icon: Zap, label: "High Resolution", color: "text-accent-600 dark:text-accent-400" },
                { icon: Globe, label: "Commercial Use", color: "text-secondary-600 dark:text-secondary-400" },
                { icon: ScanBarcode, label: "Print Ready", color: "text-primary-600 dark:text-primary-400" },
                { icon: Sparkles, label: "Offline Ready", color: "text-accent-600 dark:text-accent-400" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 p-3 rounded-xl bg-surface-50/80 dark:bg-surface-800/40 border border-surface-200/50 dark:border-surface-700/30">
                  <Icon className={cn("h-4 w-4 flex-shrink-0", color)} />
                  <span className="text-xs font-medium text-surface-600 dark:text-surface-400">{label}</span>
                </div>
              ))}
            </motion.div>
          </main>

          {/* ===== RIGHT: Live Preview + Download (380px) ===== */}
          <aside className="hidden lg:block w-[380px] flex-shrink-0">
            <div className="sticky top-24 space-y-5">
              {/* Preview Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white dark:bg-surface-900 rounded-[20px] border border-surface-200/80 dark:border-surface-800/80 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-semibold text-surface-900 dark:text-white">Live Preview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50 rounded-lg">{options.format}</span>
                    {validation.valid && options.value && (
                      <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                </div>
                <BarcodePreview options={options} validation={validation} svgRef={svgRef} />
              </motion.div>

              {/* Download & Actions Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="bg-white dark:bg-surface-900 rounded-[20px] border border-surface-200/80 dark:border-surface-800/80 p-5 shadow-sm"
              >
                <ActionsToolbar options={options} validation={validation} svgRef={svgRef} onGenerate={generate} onReset={reset} />
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
